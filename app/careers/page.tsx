import GriffityBg from "@/components/bg-logo";
import JobForm from "@/components/career-components/form";
import HeroSectionCareers from "@/components/career-components/hero-section";
import { JobOpeningsSection } from "@/components/career-components/job-opening-section";
import { StorySection } from "@/components/career-components/story-section";
import Footer from "@/components/footer";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Griffity Studios | Join Our Team",
  description:
    "Explore exciting career opportunities at Griffity Studios. Join our innovative team and grow your career in design, development, and technology.",
  alternates: {
    canonical: "https://www.griffitystudios.com/careers",
  },
};

const Page = () => {
  return (
    <section className="min-h-screen text-white">
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

export default Page;
