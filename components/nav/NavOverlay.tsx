"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {  montserrat } from "@/fonts";

import type { NavLink, NavContact, NavSocials } from "./Nav";
import Image from "next/image";

const BLACK_PAGES = [""];

interface NavOverlayProps {
    brandName: string;
    illustrationSrc: string;
    griffityLogo?: string;
    awards: { src: string; alt: string }[];
    links: NavLink[];
    contact?: NavContact;
    socials?: NavSocials;
}

// Animation variants
const panelVariants = {
    left: {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        exit:   { x: "-100%", opacity: 0, transition: { duration: 0.45, ease: [0.55, 0, 0.84, 0] } },
    },
    right: {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: "0%", opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        exit:   { x: "100%", opacity: 0, transition: { duration: 0.45, ease: [0.55, 0, 0.84, 0] } },
    },
};

const illustrationVariants = {
    hidden:  { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 } },
    exit:    { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const linkContainerVariants = {
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.3 },
    },
    exit: {
        transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
};

const linkItemVariants = {
    hidden:  { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    exit:    { y: -16, opacity: 0, transition: { duration: 0.25, ease: [0.55, 0, 0.84, 0] } },
};

const bottomVariants = {
    hidden:  { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 } },
    exit:    { y: 12, opacity: 0, transition: { duration: 0.2, ease: [0.55, 0, 0.84, 0] } },
};

export default function NavOverlay({
    brandName,
    illustrationSrc,
     griffityLogo,
    awards,
    links,
    contact,
    socials,
}: NavOverlayProps) {
    const [open, setOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const logoColor = BLACK_PAGES.some((p) => pathname.startsWith(p)) ? "black" : "white";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`relative z-30`}>

            {/* ── Single hamburger instance — fixed, always on top ── */}
            <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="nav-overlay"
                className="fixed top-10 right-5 md:right-10 z-[60] w-8 h-8 flex flex-col items-center justify-center"
            >
                <motion.span
                    animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block h-[3px] bg-white shadow-2xl shadow-black origin-center absolute"
                    style={{ width: "32px" }}
                />
                <motion.span
                    animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 5 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block h-[3px] bg-white shadow-2xl shadow-black origin-center absolute"
                    style={{ width: "32px" }}
                />
            </button>

            {/* ── Sticky navbar — slides in after scroll ── */}
            <div
                className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between pl-6 md:pl-12 pr-15 pb-10 pt-10 transition-all duration-300 ${
                    scrolled && !open
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-full pointer-events-none"
                }`}
                style={{
                    background: "rgba(5, 16, 22, 0.2)",
                    backdropFilter: "blur(7px) saturate(100%)",
                    WebkitBackdropFilter: "blur(7px) saturate(100%)",
                    boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
                }}
            >
                {griffityLogo && (
                    <Link href="/">
                       <p className={`font-semibold text-3xl uppercase text-center text-white shrink-0 ${montserrat.className}`}>
                                    {brandName.split(" ")[0]}<span className="font-light">{brandName.split(" ")[1]}</span>
                                </p>
                    </Link>
                )}
                {/* spacer — hamburger is fixed so no button needed here */}
                <div className="w-8" />
            </div>

            {/* ── Top Left Logo ── */}
            {griffityLogo && (
                <Link
                    href="/"
                    className={`top-5 left-6 md:top-10 relative md:left-12 transition-opacity block duration-300 ${
                        scrolled && !open ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                    <motion.img
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 3.8 }}
                        src="/logos/griffity.png"
                        alt="Griffity Studios logo"
                        className="w-8 sm:w-7 md:w-9 h-auto ml-5"
                    />
                </Link>
            )}

            {/* ── Fullscreen overlay ── */}
            <AnimatePresence>
                {open && (
                    <div id="nav-overlay" className="fixed inset-0 z-30">
                        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[60%_40%] h-full">

                            {/* LEFT */}
                            <motion.div
                                variants={panelVariants.left}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="hidden md:flex flex-col h-full bg-white overflow-hidden p-6"
                            >
                                <p className={`font-semibold text-4xl uppercase text-center pt-20 text-black shrink-0 ${montserrat.className}`}>
                                    {brandName.split(" ")[0]}<span className="font-light">{brandName.split(" ")[1]}</span>
                                </p>

                                <motion.div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden">
                                    <div className="h-full w-full flex items-center justify-center">
                                        <Image
                                            src={illustrationSrc}
                                            alt="Griffity Studios illustration"
                                            width={1292}
                                            height={2314}
                                            quality={100}
                                            className="h-[85%] max-h-full w-auto object-contain"
                                        />
                                    </div>
                                </motion.div>

                                <div className="flex items-center w-full gap-2">
                                    {awards.map((logo, i) => (
                                        <div key={i} className="flex-1 min-w-0 justify-center flex items-center">
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                width={700}
                                                height={800}
                                                className="object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* RIGHT */}
                            <motion.div
                                variants={panelVariants.right}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col h-full overflow-y-auto p-8 md:p-10 pt-20 md:pt-25 relative"
                                style={{
                                    background: "rgba(5, 16, 22, 0.2)",
                                    backdropFilter: "blur(7px) saturate(100%)",
                                    WebkitBackdropFilter: "blur(7px) saturate(100%)",
                                    boxShadow:
                                        "0 8px 32px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
                                }}
                            >
                              
                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full">
                                    <motion.nav
                                        aria-label="Menu navigation"
                                        className="flex flex-col gap-8 flex-1 mt-4"
                                        variants={linkContainerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {links.map((link) => (
                                            <motion.div key={link.label} variants={linkItemVariants}>
                                                {link.children ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                setOpenDropdown(
                                                                    openDropdown === link.label ? null : link.label,
                                                                )
                                                            }
                                                            aria-expanded={openDropdown === link.label}
                                                            className="flex items-center gap-2 group w-fit relative"
                                                        >
                                                            <h2 className="heading-h2 text-white group-hover:text-white/80 transition-colors">
                                                                {link.label}
                                                            </h2>
                                                            <span
                                                                className="font-display text-display-hm text-white group-hover:text-white/80 mt-1 relative z-10"
                                                                style={{ background: "transparent" }}
                                                            >
                                                                {openDropdown === link.label ? "-" : "+"}
                                                            </span>
                                                        </button>
                                                        <AnimatePresence>
                                                            {openDropdown === link.label && (
                                                                <motion.div
                                                                    key="dropdown"
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                                                                    exit={{ height: 0, opacity: 0, transition: { duration: 0.2, ease: [0.55, 0, 0.84, 0] } }}
                                                                    className="flex flex-col gap-2 pl-4 mt-4 overflow-hidden"
                                                                >
                                                                    {link.children.map((child) => (
                                                                        <Link
                                                                            key={child.label}
                                                                            href={child.href}
                                                                            onClick={() => setOpen(false)}
                                                                            className="p-bold text-white hover:text-white/70 transition-colors"
                                                                        >
                                                                            {child.label}
                                                                        </Link>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </>
                                                ) : (
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setOpen(false)}
                                                        className="block group relative w-fit"
                                                    >
                                                        <h2 className="heading-h5 text-white group-hover:text-white/80 transition-colors relative z-10">
                                                            {link.label}
                                                        </h2>
                                                    </Link>
                                                )}
                                            </motion.div>
                                        ))}
                                    </motion.nav>

                                    {/* Bottom — hours + contact + socials */}
                                    <motion.div
                                        variants={bottomVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="mt-8 flex w-full shrink-0 flex-col gap-6 border-t border-white/10 pt-6"
                                    >
                                        {contact?.hours && (
                                            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-5">
                                                <p className="label text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">Hours</p>
                                                <div className="flex min-w-0 flex-col gap-1">
                                                    {contact.hours.office && <p className="p-base text-white">Office: {contact.hours.office}</p>}
                                                    {contact.hours.cowork && <p className="p-base text-white">CoWork: {contact.hours.cowork}</p>}
                                                    {contact.hours.cafe && <p className="p-base text-white">Cafe: {contact.hours.cafe}</p>}
                                                </div>
                                            </div>
                                        )}

                                        {contact && (contact.email || contact.phones || contact.address) && (
                                            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-5">
                                                <p className="label text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">Contact</p>
                                                <div className="flex min-w-0 flex-col gap-1">
                                                    {contact.email && (
                                                        <a href={`mailto:${contact.email}`} className="p-bold break-words text-white hover:text-white/80 transition-colors">{contact.email}</a>
                                                    )}
                                                    {contact.phones?.map((phone, i) => (
                                                        <a key={i} href={`tel:${phone}`} className="p-bold break-words text-white hover:text-white/80 transition-colors">{phone}</a>
                                                    ))}
                                                    {contact.address && (
                                                        <p className="p-bold whitespace-pre-line text-white mt-1">{contact.address}</p>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {socials && (
                                            <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-5">
                                                <p className="label text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">Socials</p>
                                                <div className="flex min-w-0 flex-col gap-1">
                                                    {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">Instagram</a>}
                                                    {socials.tiktok && <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">TikTok</a>}
                                                    {socials.youtube && <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">YouTube</a>}
                                                    {socials.x && <a href={socials.x} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">X</a>}
                                                    {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">LinkedIn</a>}
                                                    {socials.whatsapp && <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">WhatsApp</a>}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}