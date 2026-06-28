"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
    { value: "3", label: "YEARS" },
    { value: "50", label: "BRANDS" },
    { value: "120", label: "PROJECTS" },
    { value: "7", label: "AWARDS" },
    { value: "10", label: "COUNTRIES" },
    { value: "30k", label: "HOURS" },
];

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: "-15% 0px",
    });

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 24 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.7, delay },
    });

    return (
        <section
            id="about-us"
            aria-labelledby="about-heading"
            className="text-white"
        >
            <div
                className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-14 lg:pb-16 max-w-screen-3xl"
                ref={ref}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-center">
                    {/* Left column */}
                    <div className="w-full">
                        <motion.p
                            className="text-primary text-sm sm:text-base md:text-lg font-semibold tracking-[0.12em] uppercase mb-6 sm:mb-8"
                            {...fadeUp(0)}
                        >
                            [01-ABOUT US]
                        </motion.p>

                        <motion.h2
                            id="about-heading"
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold leading-[1.05] mb-8 sm:mb-10"
                            {...fadeUp(0.1)}
                        >
                            <span className="block text-white">Every Dream</span>
                            <span className="block text-primary">needs a Team,</span>
                        </motion.h2>

                        <motion.div
                            className="space-y-5 sm:space-y-6 text-muted/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl"
                            {...fadeUp(0.2)}
                        >
                            <p>
                                We&apos;re a tech studio from Nepal, creating digital
                                products that mean something, not just to us, but to
                                the people who dreamt it.
                            </p>
                            <p>
                                When you trust us with your idea, it becomes ours too.
                                And we don&apos;t stop until it&apos;s something
                                we&apos;re both proud of.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right column — stats grid */}
                    <div className="flex w-full items-center justify-center lg:justify-center">
                        <motion.dl
                            className="grid grid-cols-3 gap-x-6 sm:gap-x-8 md:gap-x-10 gap-y-8 sm:gap-y-10 lg:gap-y-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
                            {...fadeUp(0.3)}
                        >
                            {STATS.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd className="m-0 flex flex-col items-center gap-2 sm:gap-3">
                                        <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-none">
                                            {stat.value}
                                        </p>
                                        <p className="text-primary text-xs sm:text-sm md:text-base font-medium tracking-[0.15em] uppercase">
                                            {stat.label} +
                                        </p>
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
