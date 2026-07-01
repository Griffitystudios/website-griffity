"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MediaItem, useReelsCards, useReelsHoles, useScreenSize, useViewportWidth } from "./reel-shared";


const cardContents: MediaItem[] = [
  { type: "image", src: "/reelsmedia/1.jpg" },
  { type: "image", src: "/reelsmedia/8.jpg" },
  { type: "image", src: "/reelsmedia/3.jpg" },
  { type: "video", src: "/reelsmedia/5.mp4" },
  { type: "image", src: "/reelsmedia/5.jpg" },
  { type: "image", src: "/reelsmedia/6.jpg" },
  { type: "image", src: "/reelsmedia/7.jpg" },
  { type: "video", src: "/reelsmedia/3d.mp4" },
];

const LAYOUT = {
  mobile: { hole: 12, card: 200, gap: 12, height: 180, cardHeight: 120 },
  tablet: { hole: 16, card: 256, gap: 16, height: 220, cardHeight: 160 },
  desktop: { hole: 20, card: 320, gap: 20, height: 256, cardHeight: 176 },
} as const;

const STRIP_ROTATION = -6;
const STRIP_Y_OFFSET = 60;
const SCROLL_RANGE_DESKTOP = 2500;

const Reels = () => {
  const screenSize = useScreenSize();
  const { hole: holeSize, card: cardSize, gap: gapSize, height, cardHeight } =
    LAYOUT[screenSize];

  const { scrollYProgress } = useScroll();
  const scrollRange =
    screenSize === "mobile" ? 800 : screenSize === "tablet" ? 1500 : SCROLL_RANGE_DESKTOP;
  const x = useTransform(scrollYProgress, [0, 1], [-scrollRange, scrollRange]);

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
      className="bg-primary flex flex-col justify-evenly items-center px-2 sm:px-5 shadow-[-16px_-19px_9px_-8px_rgba(0,0,0,0.1)] z-10"
      style={{ x, rotate: STRIP_ROTATION, y: STRIP_Y_OFFSET, height }}
      aria-hidden="true"
    >
      <div className="flex gap-0 translate-x-80">{holes}</div>
      <div className="flex gap-0">{cards}</div>
      <div className="flex gap-0 translate-x-80">{holes}</div>
    </motion.div>
  );
};

export default Reels;