import JobForm from "@/components/career-components/form";

import HeroSectionCareers from "@/components/career-components/hero-section";
import HeroText from "@/components/career-components/hero-section";
import { JobOpeningsSection } from "@/components/career-components/job-opening-section";
import { StorySection } from "@/components/career-components/story-section";
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
      <JobForm />
    </section>
  );
};

export default page;
