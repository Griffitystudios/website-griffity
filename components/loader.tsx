"use client";

import { useState, useEffect } from "react";
import { montserrat } from "@/fonts";
import { motion } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const TEXT = "GRIFFITYSTUDIOS".split("");
  useEffect(() => {
    // Simulate loading time and then hide the loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3800);

    return () => clearTimeout(timer);
  }, []);

  // If loading is complete, don't render the loader
  if (!isLoading) return null;

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${
        montserrat.className
      } h-full w-full bg-[#020608] transition-z duration-500 ${
        isLoading ? "z-50" : "-z-10"
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 3.2, duration: 0.5, ease: "easeInOut" }}
    >
      <div className="relative ">
        {/* Clear text that will be revealed as blur overlay moves */}
        <motion.div
          className="relative z-10 flex heading-h4 md:heading-h4 lg:heading-h5 font-semibold text-white"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 25] }}
          transition={{
            scale: {
              times: [0, 0.7, 1],
              duration: 1.2,
              delay: 2,
              ease: "easeInOut",
            },
          }}
        >
          {TEXT.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              className={i < 8 ? "font-semibold" : "font-light"}
              transition={{
                delay: 0.5 + (TEXT.length - 1 - i) * 0.08,
                duration: 0.8,
                ease: "easeOut",
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Blur overlay that moves from right to left */}
        <motion.div
          className="absolute inset-0 z-20 h-[100%] w-[30%]  bg-[#020608]/80"
          initial={{ x: "250%", backdropFilter: "blur(15px)" }}
          animate={{
            x: "-50%",
            opacity: 0,
            transition: {
              delay: 0.7,
              duration: 1.3,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute inset-0 z-20 h-[100%] w-[10%]  bg-[#020608]/60"
          initial={{ x: "1200%", backdropFilter: "blur(15px)" }}
          animate={{
            x: "-50%",
            opacity: 0,
            transition: {
              duration: 1.3,
              delay: 0.7,
              ease: "easeInOut",
            },
          }}
        />
      </div>
    </motion.div>
  );
}
