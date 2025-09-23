"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { fortune } from "@/fonts";
import Link from "next/link";

const HeroSectionCareers = () => {
  const navItems = [
    "about us",
    "services",
    "clients",
    "careers",
    "blogs",
    "contact us",
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Background video moved up by 20px */}
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover z-10 transform -translate-y-5 "
        src="/images/careers/gardens.png"
        layout="fill"
        objectFit="cover"
        title="Background video of Griffity brand elements"
        aria-hidden="true"
        alt={""}
      />

      {/* Animated gradient overlay at bottom */}
      {/* <motion.div
        initial={{ opacity: 0.4, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="pointer-events-none absolute bottom-0 left-0 w-full h-40 z-20 bg-gradient-to-t from-secondary to-transparent"
      /> */}
      <div className="absolute bottom-0 left-0 right-0 h-full z-10 bg-gradient-to-b to-body from-[#00000040]" />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 flex flex-col mx-auto h-full relative z-30">
        <div className="flex justify-between items-center w-full z-50 ">
          <Link href={"/"}>
            <motion.img
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              src="/logos/griffity.png"
              alt="Griffity Studios logo"
              className="w-6 sm:w-7 md:w-8 h-auto z-30 ml-5"
            />
          </Link>
          {/* Desktop Navigation Items - Hidden on mobile/tablet */}
          <nav className="hidden xl:flex  flex-row gap-8 z-50 mr-10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={
                  ["blogs", "careers"].includes(item.toLowerCase())
                    ? `/${item.toLowerCase()}`
                    : `/#${item.replace(/\s+/g, "-").toLowerCase()}`
                }
                className={`transition-all duration-300 ease-out transform cursor-pointer md:p-base ml-12 hover:text-[#dba039]  
                `}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Burger Menu Button - Only visible on mobile/tablet */}
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={toggleMobileMenu}
            className="xl:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 0 : -6,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 0 : 6,
              }}
              transition={{ duration: 0.3 }}
              className="w-6 h-0.5 bg-white block absolute"
            />
          </motion.button>
        </div>

        <div className="flex items-center gap-5 h-full max-w-screen-3xl mx-auto">
          <div className="flex flex-col items-center ">
            <motion.p className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-5">
              [ CAREERS ]
            </motion.p>
            <h2 className="text-4xl sm:text-5xl md:text-[4rem] xl:text-7xl 2xl:text-8xl font-medium leading-tight">
              one team.
            </h2>
            <h1
              className={`text-8xl sm:text-9xl md:text-[9rem] xl:text-[180px] 2xl:text-[212px] font-medium text-primary ${fortune.className}`}
            >
              endless stories.
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-extralight"
            >
              together, we create. together, we shine.
            </motion.p>
          </div>
        </div>
        <div className="flex flex-col items-center  text-white">
          <div className="w-px h-16 bg-white mb-4 " />
          <p className="text-lg">Scroll to explore</p>
          <BiChevronDown className="w-6 h-6 mt-2 animate-bounce" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            aria-label="Mobile Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full sm:w-80 h-full bg-black bg-opacity-95 backdrop-blur-sm z-40 xl:hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center z-50"
            >
              <span className="block w-6 h-0.5 bg-white rotate-45 absolute" />
              <span className="block w-6 h-0.5 bg-white -rotate-45 absolute" />
            </button>
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  href={
                    item.toLowerCase() === "blogs"
                      ? "/blogs"
                      : `#${item.replace(/\s+/g, "-").toLowerCase()}`
                  }
                  aria-label={item}
                  className="text-2xl sm:text-3xl font-light cursor-pointer hover:text-[#dba039] transition-colors duration-300 text-center"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeroSectionCareers;
