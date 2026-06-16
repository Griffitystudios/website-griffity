"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navItems = [
    "about us",
    "services",
    "clients",
    "contact us",
    "careers",
    "blogs",
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button - Visible on all screen sizes */}
      <motion.button
        onClick={toggleMobileMenu}
        className="fixed top-6 right-8 z-50 w-8 h-8 flex flex-col justify-center items-center"
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

      <div className="flex justify-between items-center mx-8 z-30">
        <Image
          src={"/logos/griffity.png"}
          width={32}
          height={32}
          alt={"Griffity Studios logo"}
          className="w-6 sm:w-7 md:w-8 h-auto ml-5"
        />
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
            className="fixed top-0 right-0 w-full sm:w-80 h-full bg-black bg-opacity-95 backdrop-blur-sm z-40"
          >
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

      {/* Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
