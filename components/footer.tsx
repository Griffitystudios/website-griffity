"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { montserrat } from "@/fonts";
import Link from "next/link";

const quickLinks = [
  { label: "Career", href: "/career" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
];

const connectLinks = [
  { label: "Instagram", href: "https://instagram.com/griffitystudios" },
  { label: "Linkedin", href: "https://linkedin.com/company/griffitystudios" },
  { label: "Tiktok", href: "https://tiktok.com/@griffitystudios" },
  { label: "Facebook", href: "https://facebook.com/griffitystudios" },
];

const legalLinks = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const socialIcons = [
  { Icon: FaFacebookF, href: "https://facebook.com/griffitystudios", label: "Facebook" },
  { Icon: FaInstagram, href: "https://instagram.com/griffitystudios", label: "Instagram" },
  { Icon: FaTiktok, href: "https://tiktok.com/@griffitystudios", label: "TikTok" },
  { Icon: FaYoutube, href: "https://youtube.com/@griffitystudios", label: "YouTube" },
  { Icon: FaXTwitter, href: "https://twitter.com/griffitystudios", label: "Twitter" },
  { Icon: FaLinkedinIn, href: "https://linkedin.com/company/griffitystudios", label: "LinkedIn" },
  { Icon: FaWhatsapp, href: "https://wa.me/9779861292675", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer
      id="contact-us"
      className="relative w-full max-w-screen-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 mt-16 pt-12 pb-8 text-white "
      aria-label="Footer with contact information and social links"
    >
      <div className="flex flex-col  lg:flex-row lg:justify-between gap-12 lg:gap-8">
        {/* Brand + registration + badge */}
        <div className="flex flex-col gap-4 max-w-sm">
          <p className={`text-3xl sm:text-4xl font-semibold ${montserrat.className}`}>
            GRIFFITY<span className="font-light">STUDIOS</span>
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Registered with the Office of the Company Registrar (OCR), Nepal
            <br />
            Reg. No. 351010/81/82
          </p>

         
        </div>

        {/* Link columns */}
        <div className="flex flex-wrap gap-x-6 xsm:gap-x-10 sm:gap-x-20 md:gap-x-40  lg:gap-x-30 xl:gap-x-40 gap-y-10">
          <nav aria-label="Quick links">
            <p className="text-primary text-sm xs:text-base font-semibold tracking-wide mb-5">
              QUICK LINKS
            </p>
            <ul className="space-y-5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm xs:text-base text-white/90 hover:text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Connect">
            <p className="text-primary text-sm xs:text-base font-semibold tracking-wide mb-5">
              CONNECT
            </p>
            <ul className="space-y-5">
              {connectLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm xs:text-base text-white/90 hover:text-primary transition"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <p className="text-primary text-sm xs:text-base font-semibold tracking-wide mb-5">
              LEGAL
            </p>
            <ul className="space-y-5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm xs:text-base text-white/90 hover:text-primary transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Contact details + social icons row */}
    
      {/* Copyright */}
      <div className="flex w-full text-center justify-between items-center text-white/70 text-sm sm:text-base mt-8">
        <p>© {new Date().getFullYear()} Griffity Studios Pvt. Ltd. All Rights Reserved.</p>
         <Link
            href="https://techbehemoths.com/company/griffity-studios"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Image
              src="/images/TB-trusted-on-transparent-dark-bg.svg"
              alt="Trusted by TechBehemoth"
              width={120}
              height={40}
            />
          </Link>
      </div>
    </footer>
  );
};

export default Footer;