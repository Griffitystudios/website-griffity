"use client";

import { PORTFOLIO_ITEMS } from "@/app/data/portfolio-data";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

function getProjectAt(index: number) {
    const length = PORTFOLIO_ITEMS.length;
    return PORTFOLIO_ITEMS[((index % length) + length) % length];
}

function PortfolioCard({
    index,
    isActive,
    onSelect,
}: {
    index: number;
    isActive: boolean;
    onSelect: () => void;
}) {
    const project = getProjectAt(index);

    return (
        <button
            type="button"
            onClick={onSelect}
            className={`group relative w-full overflow-hidden text-left transition-all duration-500 aspect-[3/4] sm:aspect-[4/5] ${isActive ? "scale-100" : "scale-[0.98] opacity-80 hover:opacity-100"
                }`}
            aria-current={isActive}
        >
            <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div
                className={`absolute inset-0 bg-gradient-to-t from-body/95 via-body/35 to-transparent transition-opacity duration-500 ${isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                    }`}
            />

            <div
                className={`absolute bottom-5 left-5 sm:bottom-6 sm:left-6 transition-opacity duration-500 ${isActive
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                    }`}
            >
                <p className="text-primary text-[0.65rem] sm:text-xs font-semibold tracking-[0.15em] uppercase mb-1">
                    {project.category}
                </p>
                <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
                    {project.title}
                </p>
            </div>
        </button>
    );
}

export default function Portfolio() {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay },
    });

    const goPrev = () =>
        setActiveIndex(
            (prev) =>
                (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length
        );
    const goNext = () =>
        setActiveIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);

    return (
        <section
            id="portfolio"
            aria-labelledby="portfolio-heading"
            className="text-white"
        >
            <div
                ref={ref}
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 xl:py-32 max-w-screen-3xl"
            >
                <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-12 lg:mb-14">
                    <div>
                        <motion.p
                            className="text-primary text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase mb-6 sm:mb-8"
                            {...fadeUp(0)}
                        >
                            [03-PORTFOLIO]
                        </motion.p>

                        <motion.h2
                            id="portfolio-heading"
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-bold leading-[1.1]"
                            {...fadeUp(0.1)}
                        >
                            <span className="text-white">Built by </span>
                            <span className="text-primary">Griffity,</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        className="flex items-center gap-3 sm:gap-4 self-start lg:self-auto"
                        {...fadeUp(0.15)}
                    >
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous project"
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-primary/10"
                        >
                            ←
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next project"
                            className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-primary text-primary transition-colors hover:bg-primary/10"
                        >
                            →
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
                >
                    <div className="hidden md:block">
                        <PortfolioCard
                            index={activeIndex - 1}
                            isActive={false}
                            onSelect={goPrev}
                        />
                    </div>

                    <PortfolioCard
                        index={activeIndex}
                        isActive
                        onSelect={() => undefined}
                    />

                    <div className="hidden md:block">
                        <PortfolioCard
                            index={activeIndex + 1}
                            isActive={false}
                            onSelect={goNext}
                        />
                    </div>
                </motion.div>

                <motion.div className=" flex flex-col items-center justify-center mt-10 sm:mt-12 lg:mt-14" {...fadeUp(0.25)}>
                    <Link
                        href="#clients"
                        className="flex w-1/4 items-center justify-center rounded-xl bg-primary px-6 py-4 sm:py-5 text-sm sm:text-base font-bold tracking-[0.12em] uppercase text-body transition-colors hover:bg-primary/90"
                    >
                        Explore Works
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
