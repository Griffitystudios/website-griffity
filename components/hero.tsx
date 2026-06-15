"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const navItems = [
    "about us",
    "services",
    "clients",
    "contact us",
    "careers",
    "blogs",
  ];
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    navItems.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, 3800 + index * 200);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative h-screen w-full overflow-hidden">
      {/* Background video moved up by 20px */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-10 transform -translate-y-5"
        src="/reelsmedia/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        title="Background video of Griffity brand elements"
        aria-hidden="true"
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
      <div className="absolute bottom-0 left-0 right-0 h-80 z-10 bg-gradient-to-b to-body from-transparent" />

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 flex flex-col mx-auto h-full relative z-30">
        <div className="flex justify-between items-center w-full">
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 3.8 }}
            src="/logos/griffity.png"
            alt="Griffity Studios logo"
            className="w-6 sm:w-7 md:w-8 h-auto ml-5 z-30"
          />

          {/* Burger Menu Button - Only visible on mobile/tablet */}
          <motion.button
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 3.8 }}
            onClick={toggleMobileMenu}
            className="lg:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center"
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

        <div className="flex items-center gap-10 h-full max-w-screen-3xl mx-auto">
          
            <div className="flex z-30 flex-col items-center lg:translate-x-[-5%] lg:translate-y-[-25%]">
                <div className="flex mb-5 gap-2 sm:gap-3 md:gap-4 overflow-x-auto">  
                 
             <Link href={"https://techbehemoths.com/company/griffity-studios"} target="_blank" rel="noopener noreferrer">
               <Image src={'/images/awards/award-06.png'} alt="award" width={384} height={279} className="w-20 xs:w-28 xsm:w-40 sm:w-48 md:w-56 lg:w-56 xl:w-72 flex-shrink-0 object-cover"/>
             </Link>
              <Link href={"https://techbehemoths.com/company/griffity-studios"} target="_blank" rel="noopener noreferrer"> <Image src={'/images/awards/award-05.png'} alt="award" width={384} height={279} className="w-20 xs:w-28 xsm:w-40 sm:w-48 md:w-56 lg:w-56 xl:w-72 flex-shrink-0 object-cover"/></Link>
              <Link href={"https://techbehemoths.com/company/griffity-studios"} target="_blank" rel="noopener noreferrer"><Image src={'/images/awards/award-07.png'} alt="award" width={384} height={279} className="w-20 xs:w-28 xsm:w-40 sm:w-48 md:w-56 lg:w-56 xl:w-72 flex-shrink-0 object-cover"/></Link>
                </div>
                <div className="text-[1.7rem] xs:text-[2.236rem] xsm:text-[3.1823rem] sm:text-[3.8rem] md:text-[4.59rem] xl:text-8xl 2xl:text-h2 font-medium md:mb-2 lg:leading-tight">
                welcome to <span className="font-bold">griffity</span>
                </div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 4, ease: "easeOut" }}
                className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-left sm:text-right self-start sm:self-end mt-2 sm:mt-4 font-extralight"
              >
                your brand's loudest whisper!
              </motion.h1>
           
          </div>

          {/* Desktop Navigation Items - Hidden on mobile/tablet */}
          <nav className="hidden lg:flex lg:translate-y-8 flex-col gap-8 z-50">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={
                  ["blogs", "careers"].includes(item.toLowerCase())
                    ? `/${item.toLowerCase()}`
                    : `#${item.replace(/\s+/g, "-").toLowerCase()}`
                }
                className={`transition-all duration-300 ease-out transform cursor-pointer text-base hover:text-[#dba039] hover:translate-x-2 hover:scale-110 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
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
            className="fixed top-0 right-0 w-full sm:w-80 h-full bg-black bg-opacity-95 backdrop-blur-sm z-40 lg:hidden"
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
      ["blogs", "careers"].includes(item.toLowerCase())
        ? `/${item.toLowerCase()}`
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

export default Hero;
