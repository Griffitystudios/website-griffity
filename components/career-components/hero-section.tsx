"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { fortune } from "@/fonts";
import Link from "next/link";
import Nav from "../nav/Nav";
import { navConfig } from "@/config/nav";

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

     <Nav {...navConfig}/>
    </header>
  );
};

export default HeroSectionCareers;
