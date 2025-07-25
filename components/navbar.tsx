"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
    <div className="flex justify-between items-center mx-8 z-30">
      <Image
        src={"/logos/griffity.png"}
        width={32}
        height={32}
        alt={"Griffity Studios logo"}
        className="w-6 sm:w-7 md:w-8 h-auto ml-5"
      />

      {/* Desktop Navigation Items - Hidden on mobile/tablet */}
      <nav className="hidden lg:flex  flex-row gap-8 text-white">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={
              ["blogs", "careers"].includes(item.toLowerCase())
                ? `/${item.toLowerCase()}`
                : `#${item.replace(/\s+/g, "-").toLowerCase()}`
            }
            className={`transition-all duration-300 ease-out transform cursor-pointer text-base ml- hover:text-[#dba039] hover:translate-x-2 hover:scale-110`}
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
