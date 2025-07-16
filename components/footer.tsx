"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="contact-us"
      className="relative w-full max-w-screen-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 mt-16 text-white"
      aria-label="Footer with contact information and social links"
    >
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="backtotop"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-6 bg-slate-800 text-white p-4 rounded-full shadow-lg z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M10 15V5M10 5L5 10M10 5l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Footer Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Company Info */}
        <address className="not-italic text-center lg:text-left">
          <p className="text-4xl font-semibold">
            GRIFFITY<span className="font-light">STUDIOS</span>
          </p>
          <Link className="text-[1.2rem]" href={'https://maps.app.goo.gl/y2VDy6SmsppxK8ve8'}>Mahalaxmisthan, Lalitpur</Link>
          <a
            href="tel:+9779861292675"
            className="text-[1.2rem] hover:text-primary transition block"
          >
            +977 9861292675
          </a>
          <a
            href="mailto:griffitystudios@gmail.com"
            className="text-[1.2rem] hover:text-primary transition block"
          >
            info@griffitystudios.com
          </a>
        </address>

        {/* Social Links */}
        <nav aria-label="Social media links">
          <div className="flex gap-5 text-[1.7rem]">
            {[
              {
                Icon: FaFacebookF,
                href: "https://facebook.com/griffitystudios",
                label: "Facebook",
              },
              {
                Icon: FaInstagram,
                href: "https://instagram.com/griffitystudios",
                label: "Instagram",
              },
              {
                Icon: FaTiktok,
                href: "https://tiktok.com/@griffitystudios",
                label: "TikTok",
              },
              {
                Icon: FaYoutube,
                href: "https://youtube.com/@griffitystudios",
                label: "YouTube",
              },
              {
                Icon: FaXTwitter,
                href: "https://twitter.com/griffitystudios",
                label: "Twitter",
              },
              {
                Icon: FaLinkedinIn,
                href: "https://linkedin.com/company/griffitystudios",
                label: "LinkedIn",
              },
              {
                Icon: FaWhatsapp,
                href: "https://wa.me/9779861292675",
                label: "WhatsApp",
              },
            ].map(({ Icon, href, label }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 5 : -5 }}
                whileTap={{ scale: 0.9 }}
                className="inline-block"
              >
                <Icon className="cursor-pointer hover:text-primary transition" />
              </motion.a>
            ))}
          </div>
        </nav>
      </div>

      {/* Copyright */}
      <div className="w-full text-center text-white text-[1.2rem] mt-6 lg:mt-0">
        © 2025 Griffity Studio Pvt. Ltd.
      </div>
    </footer>
  );
};

export default Footer;
