"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TrustedClients = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<
    "hidden" | "visible" | "exitingBottom"
  >("hidden");

  // Text to animate
  const TEXT = "TRUSTED CLIENTS";
  const TEXT_BLOCKS = ["COMPANIES WE HAVE", "WORKED WITH"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const aboutSection = document.querySelector(
        ".about"
      ) as HTMLElement | null;
      const joinUsSection = document.querySelector(
        ".join-us"
      ) as HTMLElement | null;
      const aboutHeight = aboutSection ? aboutSection.offsetHeight : 0;
      const joinUsHeight = joinUsSection ? joinUsSection.offsetHeight : 0;

      if (
        scrollTop + windowHeight >=
        fullHeight - (aboutHeight + joinUsHeight)
      ) {
        setAnimationState("exitingBottom");
        return;
      }

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        setAnimationState(isInView ? "visible" : "hidden");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exitingBottom: { opacity: 0, y: -20 },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(20px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    exitingBottom: { opacity: 0, y: -10, filter: "blur(20px)" },
  };

  return (
    <section
      ref={sectionRef}
      id="trusted-clients"
      aria-label="Trusted Clients Section"
      className="flex sticky top-[200px] flex-col mt-[100px] z-10"
    >
      <motion.p
        variants={textVariants}
        initial="hidden"
        animate={animationState}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
        className="text-primary font-medium p-base text-center"
      >
        &#91;{TEXT}&#93;
      </motion.p>

      <div className="w-fit mx-auto text-center text-primary text-[1.4rem] xs:text-[1.7rem] sm:text-[2.3rem] md:text-[2.8rem] lg:text-[4rem] xl:text-[6rem] leading-none">
        {TEXT_BLOCKS.map((line, lineIndex) => {
          const lineDelay = 0.5 + lineIndex * 0.7;
          return (
            <div key={lineIndex}>
              {line.split(" ").map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  variants={wordVariants}
                  initial="hidden"
                  animate={animationState}
                  transition={{
                    delay:
                      animationState === "visible"
                        ? lineDelay + wordIndex * 0.2
                        : 0,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className={`inline-block mx-1 ${
                    lineIndex === 0
                      ? "font-semibold tracking-widest"
                      : "font-semibold"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustedClients;
