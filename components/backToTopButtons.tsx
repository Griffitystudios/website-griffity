"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const glassButtonStyle: React.CSSProperties = {
  overflow: "hidden",
  background: "rgba(5, 16, 22, 0.18)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: `
    inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
    inset 0 -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 1px 0 0 0 rgba(255, 255, 255, 0.15),
    inset -1px 0 0 0 rgba(255, 255, 255, 0.08),
    inset 0 2px 12px 0 rgba(255, 255, 255, 0.06)
  `,
};
const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          title="Back to top"
          className="fixed bottom-20 right-6 z-10 p-4 rounded-full text-white hover:brightness-125 transition-all duration-300 cursor-pointer"
          style={glassButtonStyle}
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
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;