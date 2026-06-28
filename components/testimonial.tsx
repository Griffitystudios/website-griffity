"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateLiquidGlassMap } from "@/utils/liquidGlassFilter";
import Image from "next/image";

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarSrc: string;       // client photo
  logoName: string;        // maps to /logos/{logoName}.svg
  logoFileType?: "svg" | "png";
}

const testimonials: TestimonialData[] = [
  {
    quote: "Collaborating with Griffity Studios on our campaign was a seamless experience. Their digital branding and creative strategy elevated our reach significantly across all targets.",
    author: "Prabin Shrestha",
    role: "Marketing Lead",
    company: "Ncell Axiata",
    avatarSrc: "/images/avatars/ncell.jpeg",   // replace with actual paths
    logoName: "ncell",
  },
  {
    quote: "Griffity's web development and design team brought our vision to life with precision and modern aesthetics. Highly responsive, professional, and uncompromising quality.",
    author: "Elena Shakya",
    role: "Product Owner",
    company: "Veda Studios",
    avatarSrc: "/images/avatars/veda.jpeg",
    logoName: "veda",
  },
  {
    quote: "The branding and visual identity designed by Griffity captures the exact essence of our brand. Outstanding attention to detail and creative concepts that speak volumes.",
    author: "Rohan Chaudhary",
    role: "Founder",
    company: "Cafe Boh",
    avatarSrc: "/images/avatars/cafeboh.jpeg",
    logoName: "cafe",
  },
  {
    quote: "Professional, creative, and highly responsive. Their digital branding strategy was executed flawlessly, making our regional events stand out remarkably.",
    author: "Samyak Bajracharya",
    role: "Program Coordinator",
    company: "Hult Prize Nepal",
    avatarSrc: "/images/avatars/samrat.jpeg",
    logoName: "hult",
  },
];

const glassButtonStyle: React.CSSProperties = {
  position: "relative",
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

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const [cardMapUrl, setCardMapUrl] = useState<string>("");
  const filterId = "lg-testimonial-card";

  useEffect(() => {
    const generate = () => {
      if (!cardRef.current) return;
      const { width, height } = cardRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      const url = generateLiquidGlassMap(Math.round(width), Math.round(height), 16, 60, 1);
      setCardMapUrl(url);
    };
    generate();
    const ro = new ResizeObserver(generate);
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const selectSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered, currentIndex]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.95 }),
    center: {
      zIndex: 1, x: 0, opacity: 1, scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0, x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const t = testimonials[currentIndex];
  const logoSrc = `/images/clientLogo/${t.logoName}.${t.logoFileType ?? "svg"}`;

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="relative w-full mt-24 sm:mt-32 md:mt-52 z-10 text-white"
    >
      <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={filterId} x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
            {cardMapUrl && (
              <feImage href={cardMapUrl} x="0" y="0" width="100%" height="100%"
                result="dispMap" preserveAspectRatio="none" />
            )}
            <feDisplacementMap in="SourceGraphic" in2="dispMap"
              scale="50" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-screen-3xl w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-12 sm:py-16 md:py-24">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 sm:mb-24 gap-6">
          <div className="flex flex-col">
            <span className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase block mb-3">
              [ 05-TESTIMONIALS ]
            </span>
            <h2 className="heading-h2 font-bold text-white leading-tight">
              Words from our <br className="hidden md:inline" />
              <span className="text-primary">Clients.</span>
            </h2>
          </div>

          <div className="hidden md:flex gap-4">
            <button onClick={prevSlide} aria-label="Previous Testimonial"
              style={glassButtonStyle}
              className="p-4 rounded-full text-white hover:brightness-125 transition-all duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextSlide} aria-label="Next Testimonial"
              style={glassButtonStyle}
              className="p-4 rounded-full text-white hover:brightness-125 transition-all duration-300 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative min-h-[350px] sm:min-h-[320px] md:min-h-[280px] w-full flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative quote mark */}
          <div className="absolute top-0 left-0 text-primary/10 select-none pointer-events-none translate-y-[-40px] md:translate-y-[-80px]">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor"
              className="w-24 h-24 sm:w-36 sm:h-36 md:w-[180px] md:h-[180px]">
              <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.944 2c-3.077 1.183-4.944 3.309-4.944 5.725h4v9h-10v-5zm-13 0c0-5.141 3.892-10.519 10-11.725l.944 2c-3.077 1.183-4.944 3.309-4.944 5.725h4v9h-10v-5z" />
            </svg>
          </div>

          <div className="w-full overflow-hidden py-4 px-1">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) nextSlide();
                  else if (swipe > swipeConfidenceThreshold) prevSlide();
                }}
                className="relative w-full flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-16 rounded-2xl p-8 sm:p-12 md:p-16 select-none overflow-hidden"
                ref={cardRef}
              >
                {/* Layer 1: Liquid glass */}
                <div aria-hidden="true" style={{
                  position: "absolute", inset: 0, zIndex: 0,
                  filter: cardMapUrl ? `url(#${filterId})` : undefined,
                  backdropFilter: "blur(1px)", WebkitBackdropFilter: "blur(2px)",
                  background: "rgba(5, 16, 22, 0.18)",
                  borderRadius: "inherit", overflow: "hidden", pointerEvents: "none",
                }} />

                {/* Layer 2: Inner glow border */}
                <div aria-hidden="true" style={{
                  position: "absolute", inset: 0, zIndex: 1,
                  borderRadius: "inherit", pointerEvents: "none",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: `
                    inset 0 1px 0 0 rgba(255, 255, 255, 0.25),
                    inset 0 -1px 0 0 rgba(255, 255, 255, 0.06),
                    inset 1px 0 0 0 rgba(255, 255, 255, 0.15),
                    inset -1px 0 0 0 rgba(255, 255, 255, 0.08),
                    inset 0 2px 12px 0 rgba(255, 255, 255, 0.06)
                  `,
                }} />

                {/* Layer 3: Content */}
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12 flex-1">

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: `
                          inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
                          0 0 0 1px rgba(255, 255, 255, 0.05),
                          0 8px 32px rgba(0, 0, 0, 0.4)
                        `,
                      }}>
                      <Image
                        src={t.avatarSrc}
                        alt={t.author}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                      />
                    </div>
                  </div>

                  {/* Quote + author */}
                  <div className="flex flex-col flex-1">
                    <p className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed md:leading-loose">
                      "{t.quote}"
                    </p>
                    <div className="mt-6 flex flex-col">
                      <span className="text-white font-semibold text-base sm:text-lg">
                        {t.author}
                      </span>
                      <span className="text-primary/80 font-light text-sm sm:text-base mt-1">
                        {t.role}, {t.company}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Company logo */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center min-w-[120px] md:min-w-[160px] h-[80px] md:h-[120px] border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={logoSrc}
                      alt={t.company}
                      fill
                      className="object-contain opacity-60 brightness-0 invert"
                      sizes="160px"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators & Mobile Nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-12 gap-6">
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => selectSlide(index)}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus:outline-none cursor-pointer"
                style={{
                  width: index === currentIndex ? "32px" : "8px",
                  backgroundColor: index === currentIndex ? "#DBA039" : "rgba(255, 255, 255, 0.2)",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex md:hidden gap-3">
            <button onClick={prevSlide} aria-label="Previous Testimonial"
              style={glassButtonStyle}
              className="p-3 rounded-full text-white active:brightness-75 transition-all duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextSlide} aria-label="Next Testimonial"
              style={glassButtonStyle}
              className="p-3 rounded-full text-white active:brightness-75 transition-all duration-150 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}