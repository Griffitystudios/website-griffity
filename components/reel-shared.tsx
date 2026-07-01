"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export type ScreenSize = "mobile" | "tablet" | "desktop";

export const BREAKPOINTS = { mobile: 640, tablet: 1024 } as const;

// ---------------------------------------------------------------
// Shared video-blob cache (module-level, shared by every Reels
// strip that imports this file). Each unique video src is fetched
// exactly ONCE for the whole app lifetime; every <video> tag that
// repeats that src — whether in the same strip or a different
// strip — reuses the same object URL, so the browser only ever
// downloads the bytes a single time.
// ---------------------------------------------------------------
const videoBlobCache = new Map<string, Promise<string>>();

function getVideoBlobUrl(src: string): Promise<string> {
  let cached = videoBlobCache.get(src);
  if (!cached) {
    cached = fetch(src)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob))
      .catch(() => src); // fall back to direct src on failure
    videoBlobCache.set(src, cached);
  }
  return cached;
}

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");

  useEffect(() => {
    let frame: number | null = null;

    const computeSize = (): ScreenSize => {
      const w = window.innerWidth;
      if (w < BREAKPOINTS.mobile) return "mobile";
      if (w < BREAKPOINTS.tablet) return "tablet";
      return "desktop";
    };

    const update = () => setScreenSize(computeSize());

    const onResize = () => {
      // throttle to one update per animation frame instead of
      // firing a state update on every resize tick
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        update();
      });
    };

    update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return screenSize;
}

export function useViewportWidth(): number {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// Lazily-decoded, dedup-sourced video card. Pauses itself when
// scrolled out of the viewport via IntersectionObserver so off-
// screen duplicates aren't burning CPU/GPU on decode.
export const VideoCard: React.FC<{ src: string; style: React.CSSProperties }> =
  React.memo(({ src, style }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);

    useEffect(() => {
      let cancelled = false;
      getVideoBlobUrl(src).then((url) => {
        if (!cancelled) setResolvedSrc(url);
      });
      return () => {
        cancelled = true;
      };
    }, [src]);

    useEffect(() => {
      const el = videoRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [resolvedSrc]);

    return (
      <div
        className="bg-white shrink-0 rounded shadow overflow-hidden flex items-center justify-center"
        style={style}
        aria-hidden="true"
      >
        {resolvedSrc && (
          <video
            ref={videoRef}
            src={resolvedSrc}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="none"
          />
        )}
      </div>
    );
  });
VideoCard.displayName = "VideoCard";

export const ImageCard: React.FC<{ src: string; style: React.CSSProperties }> =
  React.memo(({ src, style }) => (
    <div
      className="bg-white shrink-0 rounded shadow overflow-hidden flex items-center justify-center"
      style={style}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
    </div>
  ));
ImageCard.displayName = "ImageCard";

export function useReelsHoles(holesCount: number, holeSize: number, gapSize: number) {
  return useMemo(
    () =>
      Array.from({ length: 4 * holesCount }, (_, i) => (
        <span
          key={i}
          className="bg-body rounded-sm shrink-0"
          style={{ width: holeSize, height: holeSize, marginRight: gapSize }}
        />
      )),
    [holesCount, holeSize, gapSize]
  );
}

export function useReelsCards(
  cardContents: MediaItem[],
  cardRepeatCount: number,
  cardStyle: React.CSSProperties
) {
  return useMemo(() => {
    const result: React.ReactNode[] = [];
    for (let r = 0; r < cardRepeatCount; r++) {
      for (let i = 0; i < cardContents.length; i++) {
        const content = cardContents[i];
        const key = `${r}-${i}`;
        result.push(
          content.type === "video" ? (
            <VideoCard key={key} src={content.src} style={cardStyle} />
          ) : (
            <ImageCard key={key} src={content.src} style={cardStyle} />
          )
        );
      }
    }
    return result;
  }, [cardContents, cardRepeatCount, cardStyle]);
}