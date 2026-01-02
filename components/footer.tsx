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
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Footer = () => {
  


 



  return (
    <footer
      id="contact-us"
      className="relative w-full max-w-screen-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 mt-16 text-white"
      aria-label="Footer with contact information and social links"
    >

      {/* Main Footer Content */}
      <div className="flex  flex-col-reverse lg:flex-row items-center justify-between gap-10">
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
        <div className="flex flex-col gap-5 ">
          <Link href={"https://techbehemoths.com/company/griffity-studios"} target="_blank" rel="noopener noreferrer">
            <Image src="/images/TB-trusted-on-transparent-dark-bg.svg" alt="Trusted by TechBehemoth" width={120} height={40} className=" mb-4 lg:mb-0 mx-auto lg:mx-0" />
          </Link>
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
      </div>

      {/* Copyright */}
    <div className="w-full text-center text-white text-[1.2rem] mt-6 lg:mt-0">
  © {new Date().getFullYear()} Griffity Studio Pvt. Ltd.
</div>

    </footer>
  );
};

export default Footer;
