"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  // Show button on scroll
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
          className="fixed bottom-20 right-6 bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50"
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
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
