"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const MAX_FILE_SIZE_MB = 5; // adjust limit as needed
const ACCEPTED_TYPES = ".pdf,.doc,.docx";

const JoinUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const applyFile = (file: File | null) => {
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`File too large. Max ${MAX_FILE_SIZE_MB}MB allowed.`);
      setStatus("error");
      return;
    }
    setFileName(file.name);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] ?? null;
    if (file && fileInputRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInputRef.current.files = dt.files;
    }
    applyFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(formRef.current!);

      const file = formData.get("attachment") as File | null;
      if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage(`File too large. Max ${MAX_FILE_SIZE_MB}MB allowed.`);
        setStatus("error");
        return;
      }

      formData.append("recaptchaToken", token || "");

      const res = await fetch("/api/message", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("sent");
        setSuccessMessage("Your message has been sent! We will get back to you soon.");
        formRef.current?.reset();
        setToken(null);
        setFileName(null);
      } else {
        let errorText = "Failed to send. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) errorText = data.error;
        } catch {
          // fallback if response is not JSON
        }
        setErrorMessage(errorText);
        setStatus("error");
      }
    } catch (err: any) {
      console.error("Network error:", err);
      setErrorMessage("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <section
      id="career"
      className="relative max-w-screen-3xl mx-auto bg-cover mt-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 bg-center bg-no-repeat join-us "
    >
      <div className="absolute inset-0" />

      <motion.h3 className="p-base w-fit font-semibold text-primary z-10 flex-shrink-0 tracking-wide">
        [ 06-GET IN TOUCH ]
      </motion.h3>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16">
        {/* LEFT: heading + contact details */}
        <div className="flex flex-col">
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold leading-tight text-white">
            Book a free
          </p>
          <p className="text-5xl sm:text-6xl md:text-7xl lg:text-[4.25rem] xl:text-[4.75rem] font-extrabold leading-tight text-primary">
            consultation.
          </p>

          <div className="mt-10 space-y-8">
            <div>
              <p className="text-primary text-sm sm:text-2xl font-medium tracking-wide">
                VISIT US
              </p>
              <p className="text-white text-xl sm:text-2xl mt-1">
                Mahalaxmisthan, Lalitpur
              </p>
            </div>

            <div>
              <p className="text-primary text-sm sm:text-2xl font-medium tracking-wide">
                CALL US
              </p>
              <p className="text-white text-xl sm:text-2xl mt-1">
                +977 9861292675
              </p>
            </div>

            <div>
              <p className="text-primary text-sm sm:text-2xl font-medium tracking-wide">
                EMAIL
              </p>
              <p className="text-white text-xl sm:text-2xl mt-1">
                info@griffitystudios.com
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="text-white font-light"
        >
          <label htmlFor="fullName" className="block text-sm sm:text-2xl mb-4 text-white/90">
            I'M
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="mb-6 pb-3 border-b-2 text-sm sm:text-2xl border-primary focus:border-primary outline-none transition-colors w-full bg-transparent text-white placeholder-white/40"
            placeholder="JOHN SMITH" 
          />

          <div className="flex flex-col md:flex-row md:gap-12">
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm sm:text-2xl mb-2 text-white/90">
                HERE IS MY EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mb-6 pb-2 border-b-2 text-sm sm:text-2xl border-primary focus:border-primary outline-none transition-colors w-full bg-transparent text-white placeholder-white/40"
                placeholder="JOHN@EMAIL.COM"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="contact" className="block text-sm sm:text-2xl mb-2 text-white/90">
                HERE IS MY PHONE NUMBER
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                required
                className="mb-6 pb-2 border-b-2 border-primary text-sm sm:text-2xl focus:border-primary outline-none transition-colors w-full bg-transparent text-white placeholder-white/40"
                placeholder="+977 (980) 123 4567"
              />
            </div>
          </div>

          <label htmlFor="coverLetter" className="block text-sm sm:text-2xl mb-2 text-white/90">
           Your Message
          </label>
          <textarea
            id="Message"
            name="Message"
            rows={5}
            className="mb-6 pb-2 border-b-2 border-primary text-sm sm:text-2xl focus:border-primary outline-none transition-colors w-full bg-transparent text-white resize-none placeholder-white/40"
            placeholder="Tell Us About Your Needs............."
          />

          {/* Drag & drop upload */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`cursor-pointer  border md:border-2 border-dashed transition-colors px-6 py-8 text-center mb-6 ${
              isDragging ? "border-primary bg-white/hover:bg-white/5" : "border-primary/60 hover:bg-white/5"
            }`}
          >
            <p className="text-sm sm:text-2xl font-medium text-white">
              {fileName ? fileName : "DRAG & DROP OR CLICK TO UPLOAD"}
            </p>
            <p className="text-sm sm:text-2xl text-white/60 mt-2 tracking-wide">
              ACCEPTED FILE TYPE <span className="text-primary">.PDF, .DOCS</span>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              id="attachment"
              name="attachment"
              accept={ACCEPTED_TYPES}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

       

          {/* Submit button — glass style */}
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="w-full  px-10 py-4 rounded-xl font-medium text-white
              bg-primary/30 backdrop-blur-md border border-primary/35
              shadow-[0_4px_24px_rgba(0,0,0,0.25)]
              hover:bg-primary/20 active:bg-primary/25
              transition-colors duration-200
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "SEND MESSAGE"}
          </button>
   {/* reCAPTCHA */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            onChange={(t) => setToken(t)}
            className="py-4"
          />
          {/* Feedback messages */}
          {successMessage && <p className="text-green-400 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default JoinUs;