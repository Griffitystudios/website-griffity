"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cardContents = [
  { type: "image", src: "/reelsmedia/1.jpg" },
  { type: "image", src: "/reelsmedia/8.jpg" },
  { type: "image", src: "/reelsmedia/3.jpg" },
  { type: "video", src: "/reelsmedia/5.mp4" },
  { type: "image", src: "/reelsmedia/5.jpg" },
  { type: "image", src: "/reelsmedia/6.jpg" },
  { type: "image", src: "/reelsmedia/7.jpg" },
  { type: "video", src: "/reelsmedia/3d.mp4" },

  // { type: "image", src: "/reelsmedia/10.png" },
];

const Reels = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [holesCount, setHolesCount] = useState(0);
  const [cardRepeatCount, setCardRepeatCount] = useState(1);

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [-2500, 2500]);

  // Responsive sizes
  const [holeSize, setHoleSize] = useState(20);
  const [cardSize, setCardSize] = useState(320);
  const [gapSize, setGapSize] = useState(20);

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;

      // Determine screen size category
      let currentScreenSize: "mobile" | "tablet" | "desktop";
      if (screenWidth < 640) {
        currentScreenSize = "mobile";
      } else if (screenWidth < 1024) {
        currentScreenSize = "tablet";
      } else {
        currentScreenSize = "desktop";
      }
      setScreenSize(currentScreenSize);

      // Responsive hole and card sizing
      let _holeSize, _cardSize, _gapSize;

      if (currentScreenSize === "mobile") {
        _holeSize = 12; // w-3
        _cardSize = 200; // w-48
        _gapSize = 12;
      } else if (currentScreenSize === "tablet") {
        _holeSize = 16; // w-4
        _cardSize = 256; // w-64
        _gapSize = 16;
      } else {
        _holeSize = 20; // w-5
        _cardSize = 320; // w-80
        _gapSize = 20;
      }

      setHoleSize(_holeSize);
      setCardSize(_cardSize);
      setGapSize(_gapSize);

      setHolesCount(Math.ceil(screenWidth / (_holeSize + _gapSize)));
      setCardRepeatCount(Math.ceil(screenWidth / (_cardSize + _gapSize)));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const renderHoles = () =>
    Array.from({ length: 4 * holesCount }, (_, i) => (
      <span
        key={i}
        className="bg-body rounded-sm shrink-0"
        style={{
          width: holeSize,
          height: holeSize,
          marginRight: gapSize,
        }}
      ></span>
    ));

  const renderCards = () => {
    const cards = [];
    for (let r = 0; r < cardRepeatCount; r++) {
      for (let i = 0; i < cardContents.length; i++) {
        const content = cardContents[i];
        cards.push(
          <div
            key={`${r}-${i}`}
            className="bg-white shrink-0 rounded shadow overflow-hidden flex items-center justify-center"
            style={{
              width: cardSize,
              height:
                screenSize === "mobile"
                  ? 120
                  : screenSize === "tablet"
                  ? 160
                  : 176,
              marginRight: gapSize,
            }}
          >
            {content.type === "image" ? (
              <img
                src={content.src}
                alt="Media"
                className="object-cover w-full h-full"
              />
            ) : content.type === "video" ? (
              <video
                src={content.src}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : null}
          </div>
        );
      }
    }
    return cards;
  };

  return (
    <motion.div
      className="bg-primary flex flex-col justify-evenly items-center px-2 sm:px-5 shadow-[-16px_-19px_9px_-8px_rgba(0,0,0,0.1)] z-10"
      style={{
        x,
        rotate: -6,
        y: 60,
        height:
          screenSize === "mobile" ? 180 : screenSize === "tablet" ? 220 : 256, // desktop
      }}
    >
      <div className="flex gap-0 translate-x-80">{renderHoles()}</div>
      <div className="flex gap-0">{renderCards()}</div>
      <div className="flex gap-0 translate-x-80">{renderHoles()}</div>
    </motion.div>
  );
};

export default Reels;
