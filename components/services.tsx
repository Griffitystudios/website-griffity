"use client";

import {
    SERVICE_IMAGES,
    SERVICE_TABS,
    type ServiceImageKey,
} from "@/app/data/services-data";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Services() {
    const [activeTab, setActiveTab] = useState(SERVICE_TABS[0].id);
    const [activeItemImg, setActiveItemImg] = useState<ServiceImageKey>(
        SERVICE_TABS[0].items[0].img
    );
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });

    const activeService =
        SERVICE_TABS.find((tab) => tab.id === activeTab) ?? SERVICE_TABS[0];

    useEffect(() => {
        setActiveItemImg(activeService.items[0].img);
    }, [activeService]);

    const activeImageSrc = SERVICE_IMAGES[activeItemImg];
    const activeItem = activeService.items.find(
        (item) => item.img === activeItemImg
    );

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 20 },
        animate: inView ? { opacity: 1, y: 0 } : {},
        transition: { duration: 0.6, delay },
    });

    return (
        <section
            id="services"
            aria-labelledby="services-heading"
            className="text-white"
        >
            <div
                ref={ref}
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 xl:py-32 max-w-screen-3xl"
            >
                <motion.p
                    className="text-primary text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase mb-6 sm:mb-8"
                    {...fadeUp(0)}
                >
                    [02-OUR SERVICES]
                </motion.p>

                <motion.h2
                    id="services-heading"
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem] font-bold leading-[1.05] mb-8 sm:mb-10"
                    {...fadeUp(0.1)}
                >
                    <span className="text-white">Bringing vision to </span>
                    <span className="text-primary">Life,</span>
                </motion.h2>

                <motion.div {...fadeUp(0.2)}>
                    <div
                        className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-4"
                        role="tablist"
                        aria-label="Service categories"
                    >
                        {SERVICE_TABS.map((tab) => {
                            const isActive = tab.id === activeTab;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`shrink-0 text-[0.6rem] xs:text-[0.65rem] sm:text-xs md:text-sm font-medium tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-300 pb-3 border-b-2 ${isActive
                                            ? "text-primary border-primary"
                                            : "text-muted/50 border-transparent hover:text-muted/80"
                                        }`}
                                    aria-selected={isActive}
                                    role="tab"
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="border-b border-primary/30 -mt-[2px]" />
                </motion.div>

                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 mt-10 sm:mt-12 lg:mt-14 items-start"
                    role="tabpanel"
                >
                    <motion.div
                        key={activeService.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase mb-2">
                            {activeService.title}
                        </h3>
                        <p className="text-primary text-xs sm:text-sm font-medium tracking-[0.15em] uppercase mb-8 sm:mb-10">
                            {activeService.subtitle}
                        </p>

                        <ul className="divide-y divide-white/10">
                            {activeService.items.map((item) => {
                                const isSelected = item.img === activeItemImg;
                                return (
                                    <li key={item.img}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveItemImg(item.img)
                                            }
                                            aria-pressed={isSelected}
                                            className={`group flex w-full items-center justify-between gap-4 py-4 sm:py-5 text-left text-xs sm:text-sm md:text-base font-light tracking-[0.08em] uppercase transition-colors ${isSelected
                                                    ? "text-primary"
                                                    : "text-white/90 hover:text-white"
                                                }`}
                                        >
                                            <span>{item.name}</span>
                                            <span
                                                className="text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                                aria-hidden="true"
                                            >
                                                ↗
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>

                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[520px] xl:min-h-[580px] bg-white/10 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeItemImg}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.35 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeImageSrc}
                                    alt={activeItem?.name ?? "Service preview"}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority={activeItemImg === SERVICE_TABS[0].items[0].img}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
