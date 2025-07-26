"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="text-white py-16 md:py-24 px-6 md:px-10 mt-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="max-w-screen-3xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          className="flex flex-col justify-center col-span-3"
          variants={itemVariants}
        >
          <motion.p
            className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-5"
            variants={itemVariants}
          >
            [ OUR STORY ]
          </motion.p>
          <motion.h2
            className="text-white text-6xl xl:text-7xl font-bold leading-tight mb-2"
            variants={itemVariants}
          >
            together with
          </motion.h2>
          <motion.h2
            className="text-[#F59E0B] text-6xl xl:text-7xl font-bold leading-tight mb-8"
            variants={itemVariants}
          >
            heart & soul
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl leading-relaxed"
            variants={itemVariants}
          >
            At Griffity, we believe great things happen when passionate minds
            come together. We're more than colleagues — we're a family that
            dreams, creates, and grows side by side. Every idea we share, every
            laugh we exchange, and every challenge we overcome is part of our
            story — a story we're proud to write, together.
          </motion.p>
        </motion.div>

        {/* Right Column: Image */}
        <motion.div
          className="flex flex-1 justify-center lg:ml-0 w-full sm:w-5/6 md:w-3/5 lg:w-full md:justify-end md:col-span-2"
          variants={itemVariants}
        >
          <Image
            src="/images/careers/gardens.png"
            alt="Group of team members collaborating at a table"
            width={700}
            height={1200}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
