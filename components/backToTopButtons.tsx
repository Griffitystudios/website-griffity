"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const MusicBackToTopButtons = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/home";
  const [isMuted, setIsMuted] = useState(true);
  const [show, setShow] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // client mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // show on scroll (plain window.scroll listener — avoids useScroll)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // prime audio muted (optional improvement; safe-guarded)
  useEffect(() => {
    if (!isClient) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.3;
    audio.muted = true;

    // try priming muted playback (non-blocking)
    const p = audio.play();
    if (p && typeof p.then === "function") {
      p.catch(() => {
        // Priming may fail in some browsers; that's OK.
        // We only attempt to get the decoding ready.
      });
    }
  }, [isClient]);

  // Listen only for pointer/click/touch to start audio on first interaction (no keyboard)
  useEffect(() => {
    if (!isClient || !isHome) return;

    const handleFirstInteraction = (e: Event) => {
      const audio = audioRef.current;
      setHasUserInteracted(true);

      if (!audio) return;

      try {
        audio.muted = false; // unmute
        setIsMuted(false);
        const playPromise = audio.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch((err) => {});
        }
      } catch (err) {
        console.warn("Error starting audio after interaction:", err);
      }
    };

    const events: Array<keyof WindowEventMap> = [
      "pointerdown",
      "click",
      "touchstart",
    ];
    for (const ev of events) {
      window.addEventListener(ev, handleFirstInteraction as EventListener, {
        once: true,
        capture: true,
      });
    }

    return () => {
      for (const ev of events) {
        window.removeEventListener(
          ev,
          handleFirstInteraction as EventListener,
          { capture: true } as EventListenerOptions
        );
      }
    };
  }, [isClient, isHome]);

  // Pause/mute on non-home pages
  useEffect(() => {
    if (!isClient) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;

    if (!isHome) {
      setHasUserInteracted(false);
      setIsMuted(true);
      audio.muted = true;
      audio.pause();
    } else {
      if (!hasUserInteracted) {
        audio.muted = true;
      }
    }
  }, [isHome, isClient, hasUserInteracted]);

  // Keep audio element in sync with mute toggle
  useEffect(() => {
    if (!isClient) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    if (!isMuted) {
      const p = audio.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } else {
      audio.pause();
    }
  }, [isMuted, isClient]);

  const toggleMute = () => {
    // toggling counts as an interaction on home page
    if (isHome && !hasUserInteracted) {
      setHasUserInteracted(true);
    }
    setIsMuted((v) => !v);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" style={{ display: "none" }}>
        <source src="/bgm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <AnimatePresence>
        {show && (
          <div className="fixed bottom-8 right-6 flex flex-col gap-3 z-50">
            <motion.button
              onClick={toggleMute}
              className={`p-4 rounded-full shadow-lg transition-all duration-300 ${
                isMuted
                  ? "bg-slate-600 text-slate-300 hover:bg-slate-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                isMuted ? "Unmute background music" : "Mute background music"
              }
              title={
                isMuted ? "Unmute background music" : "Mute background music"
              }
            >
              {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            </motion.button>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              title="Back to top"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M10 15V5M10 5L5 10M10 5l5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {isClient && isHome && !hasUserInteracted && show && (
        <motion.div
          className="fixed bottom-32 right-20 bg-blue-600 text-white p-3 rounded-lg shadow-lg text-sm z-40 max-w-48"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          Tap or click to enable music
        </motion.div>
      )}
    </>
  );
};

export default MusicBackToTopButtons;
