"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaItem, useReelsCards, useReelsHoles, useScreenSize, useViewportWidth } from "./reel-shared";


const cardContents: MediaItem[] = [
  { type: "image", src: "/reelsmedia/11.png" },
  { type: "video", src: "/reelsmedia/cos.mp4" },
  { type: "image", src: "/reelsmedia/2.jpg" },
  { type: "video", src: "/reelsmedia/hi.mp4" },
  { type: "image", src: "/reelsmedia/4.jpg" },
  { type: "video", src: "/reelsmedia/2.mp4" },
  { type: "image", src: "/reelsmedia/10.png" },
  { type: "image", src: "/reelsmedia/9.jpg" },
];

const LAYOUT = {
  mobile: { hole: 12, card: 180, gap: 10, height: 140, cardHeight: 100 },
  tablet: { hole: 16, card: 224, gap: 16, height: 180, cardHeight: 140 },
  desktop: { hole: 20, card: 288, gap: 20, height: 220, cardHeight: 160 },
} as const;

const STRIP_ROTATION = 3.7;
const STRIP_SCALE = 0.9;
const SCROLL_RANGE_DESKTOP = 2000;

const Reels2 = () => {
  const screenSize = useScreenSize();
  const { hole: holeSize, card: cardSize, gap: gapSize, height, cardHeight } =
    LAYOUT[screenSize];

  // Scroll tracking — moves opposite direction from Reels
  const { scrollYProgress } = useScroll();
  const scrollRange =
    screenSize === "mobile" ? 700 : screenSize === "tablet" ? 1300 : SCROLL_RANGE_DESKTOP;
  const x = useTransform(scrollYProgress, [0, 1], [scrollRange, -scrollRange]);

  const viewportWidth = useViewportWidth();

  const holesCount = useMemo(
    () => Math.ceil(viewportWidth / (holeSize + gapSize)) || 0,
    [viewportWidth, holeSize, gapSize]
  );

  // x2 ensures a seamless-looking repeat rather than just
  // covering exactly one screen width
  const cardRepeatCount = useMemo(
    () => Math.max(2, Math.ceil(viewportWidth / (cardSize + gapSize)) * 2),
    [viewportWidth, cardSize, gapSize]
  );

  const cardStyle: React.CSSProperties = useMemo(
    () => ({ width: cardSize, height: cardHeight, marginRight: gapSize }),
    [cardSize, cardHeight, gapSize]
  );

  const holes = useReelsHoles(holesCount, holeSize, gapSize);
  const cards = useReelsCards(cardContents, cardRepeatCount, cardStyle);

  return (
    <motion.div
      className="bg-primary flex flex-col items-center justify-evenly px-2 sm:px-5 z-10"
      style={{ x, rotate: STRIP_ROTATION, scale: STRIP_SCALE, height }}
      aria-hidden="true"
    >
      <div className="flex gap-0 -translate-x-72">{holes}</div>
      <div className="flex gap-0">{cards}</div>
      <div className="flex gap-0 -translate-x-72">{holes}</div>
    </motion.div>
  );
};

export default Reels2;