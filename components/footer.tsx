"use client";

import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaPaperPlane,
  FaEnvelope,
  FaUser,
  FaXmark,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSuccessMessage("");
          setIsContactOpen(false);
        }, 2000);
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full max-w-screen-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 "
      id="contact-us"
    >
      {/* Floating Contact Button */}
      {/* Floating Contact Button */}
      {/* <motion.button
        onClick={() => setIsContactOpen(true)}
        className="fixed bottom-6 left-6 bg-primary text-white p-4 rounded-full shadow-lg z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaEnvelope className="text-xl" />
      </motion.button> */}

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="backtotop"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-32 right-6 bg-slate-800 text-white p-4 rounded-full shadow-lg z-10"
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

      {/* Contact Form Modal */}
      {/* <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
              onClick={() => setIsContactOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-40 px-4"
            >
              <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-md shadow-lg relative">
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-black"
                >
                  <FaXmark className="text-xl" />
                </button>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Get In Touch
                  </h3>
                  <p className="text-gray-500">
                    Let's create something amazing together
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition"
                      required
                    />
                  </div>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition"
                      required
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary transition resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-body text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                  >
                    <FaPaperPlane className="text-[1.2rem]" />
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>

                  {successMessage && (
                    <p className="text-green-600 text-center mt-2">
                      {successMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}

      {/* Footer Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-16 text-white">
        <div className="text-center lg:text-left">
          <p className="text-4xl font-semibold">
            GRIFFITY<span className="font-light">STUDIOS</span>
          </p>
          <p className="text-[1.2rem]">Mahalaxmisthan, Lalitpur</p>
          <a
            href="https://wa.me/9779861292675"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.2rem] hover:text-primary transition"
          >
            +977 9861292675
          </a>
          <p className="text-[1.2rem]">griffitystudios@gmail.com</p>
        </div>
        
        <div
          className={`
            w-full text-center text-white text-[1.2rem] hidden
            ${/* On large screens, absolutely position at bottom */ ""}
            ${"lg:absolute lg:bottom-0 lg:left-0 lg:w-full lg:block"}
            ${""}
          `}
          style={{ zIndex: 1 }}
        >
          © 2025 Griffity Studio Pvt. Ltd.
        </div>
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
        <div
          className={`
            w-full text-center text-white text-[1.2rem] block
            ${/* On large screens, absolutely position at bottom */ ""}
            ${"lg:absolute lg:bottom-0 lg:left-0 lg:w-full lg:hidden"}
          
          `}
          style={{ zIndex: 1 }}
        >
          © 2025 Griffity Studio Pvt. Ltd.
        </div>
      </div>
    </div>
  );
};

export default Footer;
