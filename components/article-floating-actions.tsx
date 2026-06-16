"use client";

import React, { useState } from "react";
import { FaArrowUp, FaBookmark } from "react-icons/fa";

export default function ArticleFloatingActions() {
  const [bookmarked, setBookmarked] = useState(false);

  const handleScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    try {
      localStorage.setItem("griffity_bookmarked", JSON.stringify(next));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-col gap-3">
      <button
        onClick={handleScrollTop}
        className="group flex items-center justify-center w-12 h-12 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-amber-500/20"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={toggleBookmark}
        className="group flex items-center justify-center w-12 h-12 bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-amber-400 rounded-full border border-slate-700/30 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm shadow-lg"
        aria-label="Bookmark article"
      >
        <FaBookmark className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}
