"use client";

import type React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated counter component for statistics
const AnimatedCounter = ({
  end,
  label,
  accent,
}: {
  end: number;
  label: string;
  accent: string;
}) => {
  const counterRef = useRef(null);
  const isVisible = useInView(counterRef, { once: true, amount: 0.3 });
  const [count, setCount] = useState(0);
  const formatNumberNoDecimal = (num: number): string => {
    if (num >= 1000000) return Math.floor(num / 1000000) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "k";
    return num.toString();
  };

  useEffect(() => {
    if (isVisible && count === 0) {
      let start = 0;
      const duration = 1000;
      const increment = Math.ceil(end / 60);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, duration / (end / increment));
    }
  }, [isVisible, end, count]);

  return (
    <div className="text-center" ref={counterRef}>
      <motion.div
        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-1 sm:mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        +{formatNumberNoDecimal(count)}
      </motion.div>
      <motion.div
        className="text-sm sm:text-xl lg:text-2xl text-center font-extralight"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {label.split(" ").map((word, i, arr) => (
          <span key={i}>
            {i > 0 && " "}
            {word === accent ? (
              <span className="text-primary">{word}</span>
            ) : (
              word
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-40% 0px",
  });

  // Scroll progress for the about section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.4"],
  });

  // Helper to animate each word's color based on scroll
  const HIGHLIGHTED_WORDS = [
    "warmth",
    "strength",
    "people",
    "feelings",
    "stories",
    "bold",
    "precise",
    "trust",
    "journey",
    "hope",
    "resilience",
    "uncompromising",
    "visionary",
  ];

  const AnimatedWord = ({ word, index }: { word: string; index: number }) => {
    const totalWords =
      aboutText1.split(" ").length + aboutText2.split(" ").length;

    const maxDelay = 0.5;
    const normalizedIndex = index / totalWords;

    const start = normalizedIndex * maxDelay;
    const end = start + 0.08;

    const isHighlighted = HIGHLIGHTED_WORDS.includes(
      word.replace(/[^\w]/g, "")
    );

    const color = useTransform(
      scrollYProgress,
      [start, end],
      isHighlighted ? ["#051016", "#ffffff"] : ["#051016", "#b9bec9"]
    );

    // On-scroll glow effect for highlighted words
    // const glowEffect = useTransform(
    //   scrollYProgress,
    //   [start, end],
    //   isHighlighted
    //     ? [
    //         "0 0 0px #00e5ff",
    //         "0 0 6px #00e5ff, 0 0 12px #00c2ff, 0 0 18px #00a3ff, 0 0 24px #0088ff",
    //       ]
    //     : ["0 0 0px #4a5568", "0 0 4px #4a5568, 0 0 6px #2d3748"]
    // );
    return (
      <motion.span
        style={{ color }}
        className="sm:text-xl lg:text-3xl font-extralight inline-block mr-[10px]"
      >
        {isHighlighted ? (
          <motion.span
            className="font-light"
            // style={{
            //   textShadow: glowEffect,
            // }}
          >
            {word}
          </motion.span>
        ) : (
          word
        )}
      </motion.span>
    );
  };

  // Example paragraph text
  const aboutText1 =
    "At Griffity, we carry the warmth in everything we create. With the strength of the mountains and the soul of the valleys, we believe design is not just about visuals—it's about people, feelings, and stories that live in every heart.";
  const aboutText2 =
    "We craft with bold intention and precise care, honoring the trust you place in us. Every brand we touch becomes a part of our journey—your story becomes ours. Together, we create designs that reflect hope, resilience, and uncompromising beauty rooted in visionary storytelling.";

  return (
    <section
      id="about-us"
      aria-labelledby="about-heading"
      className="min-h-screen text-white"
      ref={containerRef}
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 max-w-screen-3xl"
        ref={ref}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.p
            className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            [ ABOUT US ]
          </motion.p>
          <motion.h3
            id="about-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            about <span className="text-primary">griffity!</span>
          </motion.h3>
          <motion.p
            className="sm:text-xl lg:text-2xl text-muted font-extralight mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every{" "}
            <motion.span
              initial={{ color: "#6b7280" }}
              animate={inView ? { color: "#ffffff" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="font-light"
            >
              dream
            </motion.span>{" "}
            needs a{" "}
            <motion.span
              initial={{ color: "#6b7280" }}
              animate={inView ? { color: "#ffffff" } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-light"
            >
              team!
            </motion.span>
          </motion.p>
        </div>
        {/* Main Content */}
        <motion.div className="text-justify mb-12 sm:mb-16 lg:mb-20 leading-relaxed lg:max-w-7xl  mx-auto text-gray-300">
          <p className="mb-3 sm:mb-16 sm:text-xl lg:text-3xl font-extralight">
            {aboutText1.split(" ").map((word, i) => (
              <AnimatedWord word={word} index={i} key={i} />
            ))}
          </p>
          <p className="mb-3 sm:mb-4 font-extralight sm:text-xl lg:text-3xl">
            {aboutText2.split(" ").map((word, i) => (
              <AnimatedWord
                word={word}
                index={i + aboutText1.split(" ").length}
                key={`p2-${i}`}
              />
            ))}
          </p>
        </motion.div>
        {/* Statistics Grid */}
        <dl className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mb-12 sm:mb-16 lg:mb-20">
          <div>
            <dt className="sr-only">Years of experience</dt>
            <dd>
              <AnimatedCounter
                end={4}
                label="years of experience"
                accent="experience"
              />
            </dd>
          </div>

          <div>
            <dt className="sr-only">Brands collaborated</dt>
            <dd>
              <AnimatedCounter
                end={21}
                label="brands collaborated"
                accent="collaborated"
              />
            </dd>
          </div>

          <div>
            <dt className="sr-only">Projects completed</dt>
            <dd>
              <AnimatedCounter
                end={31}
                label="projects completed"
                accent="completed"
              />
            </dd>
          </div>

          <div>
            <dt className="sr-only">Industry awards</dt>
            <dd>
              <AnimatedCounter
                end={7}
                label="industry awards"
                accent="awards"
              />
            </dd>
          </div>

          <div>
            <dt className="sr-only">Events managed</dt>
            <dd>
              <AnimatedCounter
                end={11}
                label="events managed"
                accent="managed"
              />
            </dd>
          </div>

          <div>
            <dt className="sr-only">Regulated hours of operation</dt>
            <dd>
              <AnimatedCounter
                end={20000}
                label="regulated hours of operation"
                accent="operation"
              />
            </dd>
          </div>
        </dl>
        {/* Bottom Action Words */}
        <motion.div
          className="flex w-full md:mt-36 justify-between md:px-16 mx-auto font-extralight xl:heading-h5 text-[0.8rem]  xs:text-lg md:text-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            inspire
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            endure
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            create
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            engage
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
