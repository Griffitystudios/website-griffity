import GriffityBg from "@/components/bg-logo"; // ✅

import JobForm from "@/components/career-components/form";

import HeroSectionCareers from "@/components/career-components/hero-section";
import HeroText from "@/components/career-components/hero-section";
import { JobOpeningsSection } from "@/components/career-components/job-opening-section";
import { StorySection } from "@/components/career-components/story-section";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const page = () => {
  return (
    <section
      //   aria-labelledby="about-heading"
      className="min-h-screen text-white  "
      //   ref={containerRef}
    >
      <HeroSectionCareers />
      <StorySection />
      <JobOpeningsSection />
      <div className="relative overflow-hidden max-w-screen-3xl mx-auto">
        <GriffityBg />

        <JobForm />
        <Footer />
      </div>
    </section>
  );
};

export default page;
