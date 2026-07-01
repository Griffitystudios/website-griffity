"use client";

import { useEffect, useMemo, useState } from "react";
import { montserrat } from "@/fonts";
import { motion } from "framer-motion";

const BRAND_TEXT = "GRIFFITYSTUDIOS".split("");
const BOLD_CHAR_COUNT = 8;

// Single source of truth for the timeline (previously duplicated
// as a separate, hand-synced setTimeout(3800) value).
const REVEAL_DELAY = 2;
const REVEAL_DURATION = 1.2;
const FADE_DELAY = REVEAL_DELAY + REVEAL_DURATION; // 3.2s
const FADE_DURATION = 0.5;

export default function Loader() {
  const [mounted, setMounted] = useState(true);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) setMounted(false);
  }, [prefersReducedMotion]);

  if (!mounted) return null;

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex h-full w-full items-center justify-center ${montserrat.className} bg-[#020608]`}
      style={{ willChange: "opacity" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: FADE_DELAY, duration: FADE_DURATION, ease: "easeInOut" }}
      onAnimationComplete={() => setMounted(false)}
    >
      <div className="relative">
        {/* Clear text, revealed as the wipe overlays pass over it */}
        <motion.div
          className="heading-h4 md:heading-h4 lg:heading-h5 relative z-10 flex font-semibold text-white"
          style={{ willChange: "transform" }}
          initial={{ scale: 1 }}
          animate={{ scale: 25 }}
          transition={{
            scale: {
              duration: REVEAL_DURATION,
              delay: REVEAL_DELAY,
              ease: "easeOut",
            },
          }}
        >
          {BRAND_TEXT.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                i < BOLD_CHAR_COUNT ? "font-semibold" : "font-light"
              } inline-block`}
              transition={{
                delay: 0.5 + (BRAND_TEXT.length - 1 - i) * 0.08,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/*
          Wipe overlays: a gradient with a baked-in soft alpha edge,
          animated with `transform` only — instead of a live
          `backdrop-filter: blur()` that re-samples the pixels
          behind it on every frame it moves. This is the main fix:
          two moving backdrop-blurs were the biggest GPU/RAM cost
          in the original. The gradient stops approximate the same
          "soft blurred edge" look at a fraction of the cost.
        */}
        <motion.div
          className="absolute inset-0 z-20 h-full w-[30%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,6,8,0) 0%, rgba(2,6,8,0.8) 40%, rgba(2,6,8,0.8) 100%)",
            willChange: "transform, opacity",
          }}
          initial={{ x: "250%" }}
          animate={{ x: "-50%", opacity: 0 }}
          transition={{ delay: 0.7, duration: 1.3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 z-20 h-full w-[10%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,6,8,0) 0%, rgba(2,6,8,0.6) 40%, rgba(2,6,8,0.6) 100%)",
            willChange: "transform, opacity",
          }}
          initial={{ x: "1200%" }}
          animate={{ x: "-50%", opacity: 0 }}
          transition={{ delay: 0.7, duration: 1.3, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}