"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cardContents = [
  { type: "image", src: "/reelsmedia/11.png" },
  { type: "video", src: "/reelsmedia/cos.mp4" },
  { type: "image", src: "/reelsmedia/2.jpg" },
  { type: "video", src: "/reelsmedia/hi.mp4" },
  { type: "image", src: "/reelsmedia/4.jpg" },
  { type: "video", src: "/reelsmedia/2.mp4" },
  { type: "image", src: "/reelsmedia/10.png" },
  { type: "image", src: "/reelsmedia/9.jpg" },
];

const Reels2 = () => {
  const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [holesCount, setHolesCount] = useState(0);
  const [cardRepeatCount, setCardRepeatCount] = useState(1);

  // Responsive sizes
  const [holeSize, setHoleSize] = useState(16);
  const [cardSize, setCardSize] = useState(288);
  const [gapSize, setGapSize] = useState(20);

  // Scroll tracking
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [2000, -2000]); // Opposite scroll

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = window.innerWidth;

      let currentScreenSize: "mobile" | "tablet" | "desktop";
      if (screenWidth < 640) {
        currentScreenSize = "mobile";
      } else if (screenWidth < 1024) {
        currentScreenSize = "tablet";
      } else {
        currentScreenSize = "desktop";
      }
      setScreenSize(currentScreenSize);

      let _holeSize, _cardSize, _gapSize;
      if (currentScreenSize === "mobile") {
        _holeSize = 12; // w-3
        _cardSize = 180; // ~w-44
        _gapSize = 10;
      } else if (currentScreenSize === "tablet") {
        _holeSize = 16; // w-4
        _cardSize = 224; // ~w-56
        _gapSize = 16;
      } else {
        _holeSize = 20; // w-5
        _cardSize = 288; // w-72
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
                  ? 100
                  : screenSize === "tablet"
                  ? 140
                  : 160,
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
      className="bg-primary flex flex-col items-center justify-evenly px-2 sm:px-5 z-10"
      style={{
        x,
        rotate: 3.7,
        scale: 0.9,
        height:
          screenSize === "mobile" ? 140 : screenSize === "tablet" ? 180 : 220,
      }}
    >
      <div className="flex gap-0 justify-center">{renderHoles()}</div>
      <div className="flex gap-0">{renderCards()}</div>
      <div className="flex gap-0 justify-center">{renderHoles()}</div>
    </motion.div>
  );
};

export default Reels2;
