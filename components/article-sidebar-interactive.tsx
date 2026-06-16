"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ArticleSidebarInteractive() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const pct = Math.min(100, Math.max(0, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Fixed top progress bar that scrolls with the viewport */}
      <div aria-hidden className="fixed left-0 top-0 w-full h-1 z-[9999] bg-transparent">
        <div
          className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 shadow-xl"
          style={{ width: `${progress}%`, transition: "width 150ms linear" }}
        />
      </div>
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Quick Navigation
        </h3>
        <div className="space-y-2">
          <button onClick={() => scrollToId("introduction")} className="w-full text-left text-sm text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/30">Introduction</button>
          <button onClick={() => scrollToId("main-content")} className="w-full text-left text-sm text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/30">Main Content</button>
          <button onClick={() => scrollToId("conclusion")} className="w-full text-left text-sm text-slate-300 hover:text-amber-400 transition-colors py-2 px-3 rounded-lg hover:bg-slate-700/30">Conclusion</button>
        </div>
      </div>

      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Reading Progress
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Progress</span>
            <span className="text-amber-400 font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-700/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-xs text-slate-500">Scroll to track your progress</p>
        </div>
      </div>
    </>
  );
}
