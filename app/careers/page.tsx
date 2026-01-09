import GriffityBg from "@/components/bg-logo";
import JobForm from "@/components/career-components/form";
import HeroSectionCareers from "@/components/career-components/hero-section";
import { JobOpeningsSection } from "@/components/career-components/job-opening-section";
import { StorySection } from "@/components/career-components/story-section";
import Footer from "@/components/footer";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Griffity Studios | Join Our Creative Team in Nepal",
  description:
    "Explore exciting career opportunities at Griffity Studios Nepal. Join our innovative team and grow your career in branding, design, development, and digital marketing. We're hiring talented creatives in Kathmandu.",
  keywords: [
    "careers Nepal",
    "jobs at Griffity Studios",
    "creative jobs Nepal",
    "design jobs Kathmandu",
    "developer jobs Nepal",
    "marketing jobs Nepal",
    "UI UX designer jobs",
    "video production jobs",
    "branding jobs Nepal",
  ],
  authors: [{ name: "Griffity Studios Team" }],
  creator: "Griffity Studios",
  publisher: "Griffity Studios",
  alternates: {
    canonical: "https://www.griffitystudios.com/careers",
  },
  openGraph: {
    title: "Careers at Griffity Studios | Join Our Team",
    description:
      "Explore exciting career opportunities at Griffity Studios Nepal. Join our innovative team and grow your career in design, development, and technology.",
    url: "https://www.griffitystudios.com/careers",
    siteName: "Griffity Studios",
    images: [
      {
        url: "https://griffitystudios.com/logos/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Careers at Griffity Studios",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Griffity Studios | Join Our Team",
    description:
      "Explore exciting career opportunities at Griffity Studios Nepal. Join our innovative creative team.",
    images: ["https://griffitystudios.com/logos/og-cover.jpg"],
    creator: "@GriffityStudios",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
