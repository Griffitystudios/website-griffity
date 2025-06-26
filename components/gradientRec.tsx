"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GradientRec = () => {
  const ref = useRef(null);

  // Track scroll progress relative to the viewport
  const { scrollYProgress } = useScroll({
    offset: ["start 100vh", "end -100vh"],
  });

  // Transform values for parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [100, 100]); // Move up as user scrolls down
  const rotate = useTransform(scrollYProgress, [0, 1], [37.5, 28]); // Subtle rotation change
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.3]); // Subtle scale change

  // Optional: Add subtle color shift
  const gradientStart = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(5,16,22,0.5)", "rgba(5,16,22,0.6)"]
  );

  return (
    <motion.div
      ref={ref}
      className="absolute top-[10%] -right-[30%] z-0 w-[100%] h-[550px]"
      style={{
        y,
        rotate,
        scale,
        clipPath: "polygon(5.2% 5.8%, 100% 0%, 100% 100%, 0% 100%)",
        background: useTransform(
          scrollYProgress,
          [0, 1],
          [
            "linear-gradient(143deg, rgba(5,16,22,0.5) 0%, rgba(206,151,55,1) 100%)",
            "linear-gradient(143deg, rgba(5,16,22,0.6) 0%, rgba(226,171,75,1) 100%)",
          ]
        ),
      }}
    />
  );
};

export default GradientRec;
