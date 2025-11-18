"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const MAX_FILE_SIZE_MB = 5; // adjust limit as needed

const JoinUs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(formRef.current!);

      // ✅ File size validation (optional attachment)
      const file = formData.get("attachment") as File | null;
      if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMessage(` File too large. Max ${MAX_FILE_SIZE_MB}MB allowed.`);
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
        setSuccessMessage(" Your message has been sent! We will get back to you soon.");
        formRef.current?.reset(); // clear form after success
        setToken(null); // reset captcha
      } else {
        let errorText = " Failed to send. Please try again.";
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
      setErrorMessage(" Network error. Please check your connection.");
      setStatus("error");
    }
  };

  return (
    <section
      id="career"
      className="relative max-w-screen-3xl mx-auto bg-cover mt-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 bg-center bg-no-repeat join-us"
    >
      {/* <section
      id="career"
      className="relative max-w-screen-3xl mx-auto bg-[#081C26] bg-[url('/images/img-join-us.jpg')] bg-cover bg-center bg-no-repeat join-us"
    > */}
      <motion.h1 className="p-base w-fit font-semibold text-primary z-10 flex-shrink-0">
        [CONTACT US ]
      </motion.h1>
      <div className="absolute inset-0 " />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative max-w-screen-3xl p-base mx-auto px-4 sm:px-6 md:px-8 py-16 text-white z-10 font-light /60"
        encType="multipart/form-data"
      >
        <p
          className={`text-3xl xs:text-4xl xsm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl 2xl:text-[8.4rem] 3xl:text-[8.7rem] font-extrabold leading-tight `}
        >
          book a free
        </p>
        <p
          className={`text-3xl xs:text-4xl xsm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl 2xl:text-[8.4rem] 3xl:text-[8.7rem] font-extrabold leading-tight text-primary `}
        >
          consultation,
        </p>

        {/* ...inputs as before... */}
        <label htmlFor="fullName" className=" mt-4 block">
          I'M
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="mt-1 mb-4 p-2 border-b border-white w-full bg-transparent text-white"
          placeholder="JOHN DOE"
        />
        <div className="flex flex-col md:flex-row md:gap-16">
          <div className="flex-1">
            <label htmlFor="email" className=" block">
              HERE IS MY EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 mb-4 p-2 border-b border-white w-full bg-transparent text-white"
              placeholder="JOHN@EMAIL.COM"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="contact" className=" block">
              HERE IS MY PHONE NUMBER
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              className="mt-1 mb-4 p-2 border-b border-white w-full bg-transparent text-white"
              placeholder="+977 (980) 123 4567"
            />
          </div>
        </div>
        <label htmlFor="coverLetter" className=" block">
          MESSAGE
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={2}
          className="mt-1 mb-4 p-2 border-b border-white w-full bg-transparent text-white resize-none"
          placeholder="HERE IS MY MESSAGE."
        />
        <div className="flex flex-col">
          <label htmlFor="attachment" className="my-2 lg:text-2xl text-xl">UPLOAD ATTACHMENTS</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            accept=".pdf,.doc,.docx"
            className="text-white file:bg-white file:text-black file:rounded-full mt-4 file:px-4 file:py-2 text-sm file:border-0"
          />
          <p className="text-[1rem] font-light text-white mt-4">
            Accepted Formats: <span className="text-primary">.pdf, .doc, .docx</span> (Max {MAX_FILE_SIZE_MB}MB)
          </p>
        </div>

        {/* reCAPTCHA */}
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          onChange={(t) => setToken(t)}
                    className="my-5"

        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="mt-5 px-6 py-3 bg-primary text-body font-normal rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Submit"}
        </button>

        {/* Feedback messages */}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    </section>
  );
};

export default JoinUs;
