"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { NavLink, NavContact, NavSocials } from "./Nav";

const BLACK_PAGES = [""];

interface NavOverlayProps {
    brandName: string;
    illustrationSrc?: string;
    sattyaLogoSrc?: string;
    sattyaLogoTopSrc?: string;
    spaceLogos: { src: string; alt: string }[];
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
    sattyaLogoSrc,
    sattyaLogoTopSrc,
    spaceLogos,
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
        <div className={`relative z-30 w-full`}>
            {/* Sticky nav bar — slides in after scroll */}
            {/* <div
                className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between pl-6 md:pl-12 pr-15 pb-5 pt-10 bg-white shadow-sm transition-all duration-300 ${
                    scrolled
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            >
                {sattyaLogoTopSrc && (
                    <Link href="/">
    <motion.img
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 3.8 }}
            src="/logos/griffity.png"
            alt="Griffity Studios logo"
            className="w-6 sm:w-7 md:w-8 h-auto ml-5 z-30"
          />                    </Link>
                )}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Open menu"
                    className="flex flex-col gap-1.5 h-4 w-fit"
                >
                    <span className="block w-8 h-0.75 bg-black shadow-2xl shadow-black" />
                    <span className="block w-8 h-0.75 bg-black shadow-2xl shadow-black" />
                </button>
            </div> */}

            {/* Top Left Logo */}
            {sattyaLogoTopSrc && (
                <Link
                    href="/"
                    className={` md:top-10 md:left-12  transition-opacity duration-300 ${
                        scrolled && !open ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
    <motion.img
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 3.8 }}
            src="/logos/griffity.png"
            alt="Griffity Studios logo"
            className="w-6 sm:w-7 md:w-10 h-auto ml-5 "
          />                </Link>
            )}

            {/* Hamburger */}
            <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="nav-overlay"
                className={` top-16 z-50 right-10 w-fit flex flex-col gap-1.5 h-10 transition-opacity duration-300 ${open ? "fixed" : "absolute"} ${
                    scrolled && !open ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <span
                    className={`block w-8 h-1 bg-${logoColor} shadow-2xl shadow-black transition-all duration-300 origin-center bg-white`}
                />
                <span
                    className={`block w-8 h-1 bg-${logoColor} shadow-2xl shadow-black transition-all duration-300 bg-white`}
                />
            </button>

            {/* Fullscreen overlay */}
            <AnimatePresence>
                {open && (
                    <div
                        id="nav-overlay"
                        className="fixed inset-0 z-50"
                    >
                        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 h-full">
                            {/* LEFT */}
                            <motion.div
                                variants={panelVariants.left}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="hidden md:flex flex-col h-full bg-white overflow-hidden p-6"
                            >
                                <p className="p-bold uppercase tracking-widest text-black shrink-0">
                                    {brandName}
                                </p>

                                <motion.div
                                    variants={illustrationVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex-1 min-h-0 flex items-center justify-center py-4 overflow-hidden"
                                >
                                    {illustrationSrc && (
                                        <Image
                                            src={illustrationSrc}
                                            alt="Sattya illustration"
                                            width={900}
                                            height={500}
                                            className="w-full h-full object-contain"
                                        />
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* RIGHT */}
                            <motion.div
                                variants={panelVariants.right}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="flex flex-col h-full bg-black overflow-y-auto p-8 md:p-10 pt-20 md:pt-25"
                            >
                                <motion.nav
                                    aria-label="Menu navigation"
                                    className="flex flex-col gap-8 flex-1 mt-4"
                                    variants={linkContainerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {links.map((link) => (
                                        <motion.div
                                            key={link.label}
                                            variants={linkItemVariants}
                                        >
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
                                                        <h2 className="h2 text-white group-hover:text-white/80 transition-colors">
                                                            {link.label}
                                                        </h2>
                                                        <span className="font-display text-display-hm text-white group-hover:text-white/80 mt-1 relative z-10 bg-black">
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
                                                    <h2 className="h2 text-white group-hover:text-white/80 transition-colors relative z-10">
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
                                            <p className="caption text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">
                                                Hours
                                            </p>
                                            <div className="flex min-w-0 flex-col gap-1">
                                                {contact.hours.office && (
                                                    <p className="p-bold text-white">Office: {contact.hours.office}</p>
                                                )}
                                                {contact.hours.cowork && (
                                                    <p className="p-bold text-white">CoWork: {contact.hours.cowork}</p>
                                                )}
                                                {contact.hours.cafe && (
                                                    <p className="p-bold text-white">Cafe: {contact.hours.cafe}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {contact && (contact.email || contact.phones || contact.address) && (
                                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-5">
                                            <p className="caption text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">
                                                Contact
                                            </p>
                                            <div className="flex min-w-0 flex-col gap-1">
                                                {contact.email && (
                                                    <a href={`mailto:${contact.email}`} className="p-bold break-words text-white hover:text-white/80 transition-colors">
                                                        {contact.email}
                                                    </a>
                                                )}
                                                {contact.phones?.map((phone, i) => (
                                                    <a key={i} href={`tel:${phone}`} className="p-bold break-words text-white hover:text-white/80 transition-colors">
                                                        {phone}
                                                    </a>
                                                ))}
                                                {contact.address && (
                                                    <p className="p-bold whitespace-pre-line text-white mt-1">{contact.address}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {socials && (
                                        <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-5">
                                            <p className="caption text-white/40 uppercase tracking-widest sm:w-1/3 lg:w-2/5 shrink-0">
                                                Socials
                                            </p>
                                            <div className="flex min-w-0 flex-col gap-1">
                                                {socials.instagram && (
                                                    <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">Instagram</a>
                                                )}
                                                {socials.tiktok && (
                                                    <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">TikTok</a>
                                                )}
                                                {socials.youtube && (
                                                    <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">YouTube</a>
                                                )}
                                                {socials.x && (
                                                    <a href={socials.x} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">X</a>
                                                )}
                                                {socials.pinterest && (
                                                    <a href={socials.pinterest} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">Pinterest</a>
                                                )}
                                                {socials.whatsapp && (
                                                    <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">WhatsApp</a>
                                                )}
                                                {socials.spotted && (
                                                    <a href={socials.spotted} target="_blank" rel="noopener noreferrer" className="p-bold text-white hover:text-white/80 transition-colors">Spotted</a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
