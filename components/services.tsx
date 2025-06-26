"use client";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

const Services = () => {
  const containerRef = useRef(null);
  const brandingRef = useRef(null);
  const marketingRef = useRef(null);
  const productionRef = useRef(null);
  const webappRef = useRef(null);
  const modelingRef = useRef(null);
  const eventsRef = useRef(null);
  const moreRef = useRef(null);

  // Scroll-based animations
  // Add 30% buffer to the scroll range by adjusting the offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "end 0.5"],
  });

  const containerInView = useInView(containerRef, {
    once: true,
    margin: "-36% 0px",
  });

  // Create a staggered animation effect for each service section
  const brandingScale = useTransform(scrollYProgress, [0, 0.15], [1.2, 1]);
  const marketingScale = useTransform(scrollYProgress, [0.15, 0.3], [1.2, 1]);
  const productionScale = useTransform(scrollYProgress, [0.3, 0.45], [1.2, 1]);
  const webappScale = useTransform(scrollYProgress, [0.45, 0.6], [1.2, 1]);
  const modelingScale = useTransform(scrollYProgress, [0.6, 0.75], [1.2, 1]);
  const eventsScale = useTransform(scrollYProgress, [0.75, 0.9], [1.2, 1]);
  const moreScale = useTransform(scrollYProgress, [0.9, 1], [1.2, 1]);

  const brandingInView = useInView(brandingRef, {
    once: true,
    margin: " -20% 0px",
  });

  // useEffect(() => {
  //   if (containerInView) {
  //     document.body.classList.remove("bg-body", "text-white");
  //     document.body.classList.add("bg-white", "text-[#1a2e38]");
  //   } else {
  //     document.body.classList.remove("bg-white", "text-[#1a2e38]");
  //     document.body.classList.add("bg-body", "text-white");
  //   }
  //   return () => {
  //     document.body.classList.remove("bg-white", "text-[#1a2e38]");
  //     document.body.classList.add("bg-body", "text-white");
  //   };
  // }, [containerInView]);

  const marketingInView = useInView(marketingRef, {
    once: true,
    margin: " -20% 0px",
  });
  const productionInView = useInView(productionRef, {
    once: true,
    margin: " -20% 0px",
  });
  const webappInView = useInView(webappRef, {
    once: true,
    margin: " -20% 0px",
  });
  const modelingInView = useInView(modelingRef, {
    once: true,
    margin: " -20% 0px",
  });
  const eventsInView = useInView(eventsRef, {
    once: true,
    margin: " -20% 0px",
  });
  const moreInView = useInView(moreRef, { once: true, margin: " -20% 0px" });

  return (
    <div
      id="services"
      className=" max-w-screen-3xl mt-20  px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 mx-auto w-full justify-center items-center z-"
    >
      <div className="flex md:justify-between leading-tight items-start  mt-2">
        <div className="flex flex-col mt-5 ">
          <motion.span className="heading-h4 z-10 font-semibold ">
            WE BRING YOUR VISION{" "}
          </motion.span>
          <motion.span className="heading-h4 z-10 font-semibold ">
            TO LIFE WITH DYNAMIC DESIGN SOLUTIONS
          </motion.span>
        </div>
        <motion.h1 className="p-base w-fit font-semibold text-primary z-10 flex-shrink-0">
          [OUR SERVICES ]
        </motion.h1>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col   heading-h2  gap-10 mt-32  "
      >
        <motion.div
          ref={brandingRef}
          initial={{ opacity: 0, x: 30 }}
          animate={
            brandingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b  border-primary w-full  origin-center flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary  branding ">
            BRANDING
          </p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              brandingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6 "
          >
            <li className="font-medium">&#8594;VISUAL IDENTITY</li>
            <li>LOGO DESIGN</li>
            <li>BRAND GUIDELINES</li>
            <li>BRANDING CONSULTATIONS</li>
            <li>REBRANDING STRATEGY </li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={marketingRef}
          initial={{ opacity: 0, x: 30 }}
          animate={
            marketingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">MARKETING</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              marketingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;CONTENT STRATEGY</li>
            <li>MARKETING CAMPAIGNS</li>
            <li>SOCIAL MEDIA MANAGEMENT</li>
            <li>INFLUENCER MARKETING</li>
            <li>CONTENT CREATION</li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={productionRef}
          initial={{ opacity: 0, x: 30 }}
          animate={
            productionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">PRODUCTION</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              productionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;STORYTELLING & MEDIA</li>
            <li>PHOTOGRAPHY</li>
            <li>VIDEO PRODUCTION & EDITING</li>
            <li>SCRIPTWRITING & STORYBOARDING</li>
            <li>POST PRODUCTION SERVICES</li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={webappRef}
          initial={{ opacity: 0, x: 30 }}
          animate={webappInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">WEB & APP</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              webappInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;DIGITAL EXPERIENCE</li>
            <li>UI/UX DESIGN</li>
            <li>ECOMMERCE PLATFORMS & CMS SOLUTIONS</li>
            <li>SEO & PERFORMANCE OPTIMIZATION</li>
            <li>MAINTENANCE & UPDATES</li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={modelingRef}
          initial={{ opacity: 0, x: 30 }}
          animate={
            modelingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
          }
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">3D MODELING</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              modelingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;VISUALIZATION & ARCHITECTURE</li>
            <li className="uppercase">Product Prototyping</li>
            <li className="uppercase">AR/VR Ready Models</li>
            <li className="uppercase">Brand Guidelines</li>
            <li className="uppercase">Architectural Visualization</li>
            <li className="uppercase">Conceptual Design Models </li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={eventsRef}
          initial={{ opacity: 0, x: 30 }}
          animate={eventsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">EVENTS</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={
              eventsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;IMMERSIVE BRAND EXPERIENCES</li>
            <li>Event Planning & Execution</li>
            <li>SPONSORSHIP MANAGEMENT</li>
            <li>BRANDING & MARKETING</li>
            <li>LOGISTICS & MORE</li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={moreRef}
          initial={{ opacity: 0, x: 30 }}
          animate={moreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="border-b border-primary w-full flex items-center "
        >
          <p className=" z-10 font-semibold w-2/3 text-primary">MORE</p>
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            animate={moreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.6 }}
            className="p-base w-1/3 font-extralight mb-6"
          >
            <li className="font-medium">&#8594;SPECIALIZED SERVICES</li>
            <li>TAILORED SERVICE</li>
            <li>WORKSHOP & TRAINING</li>
            <li>TREND FORECASTING </li>
            <li>R&D FOR NEW MEDIA</li>
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
