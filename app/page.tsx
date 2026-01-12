import React from "react";
import { Metadata } from "next";
import Hero from "../components/hero";
import Loader from "../components/loader";
import Services from "@/components/services";
import Client from "@/components/clients";
import Footer from "@/components/footer";
import TrustedClient from "@/components/trustedClient";
import Reels from "@/components/reels";
import Reels2 from "@/components/reels2";
import About from "@/components/about";
import JoinUs from "@/components/join-us";
import GriffityBg from "@/components/bg-logo";

export const metadata: Metadata = {
  title: "Griffity Studios | Creative Branding & Web Development Nepal",
  description: "Creative agency in Nepal specializing in branding, web design, video production, and digital marketing. Award-winning solutions to transform your brand.",
  keywords: [
    "branding agency Nepal",
    "creative agency Nepal",
    "web design Nepal",
    "video production Nepal",
    "digital marketing Nepal",
    "logo design Nepal",
    "UI UX design Nepal",
    "Kathmandu creative agency",
    "branding consultation",
    "ecommerce Nepal",
  ],
  authors: [{ name: "Griffity Studios Team" }],
  creator: "Griffity Studios",
  publisher: "Griffity Studios",
  alternates: {
    canonical: "https://www.griffitystudios.com/",
  },
  openGraph: {
    title: "Griffity Studios | Creative Agency in Nepal",
    description: "From branding and design to development and marketing, Griffity Studios delivers full-scale creative solutions that connect your brand with your audience.",
    url: "https://www.griffitystudios.com/",
    siteName: "Griffity Studios",
    images: [
      {
        url: "https://www.griffitystudios.com/logos/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Griffity Studios - Creative Agency Nepal",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Griffity Studios | Creative Agency in Nepal",
    description: "Your go-to branding and digital agency in Nepal — from visual identity to web, media, marketing, and immersive events.",
    images: ["https://www.griffitystudios.com/logos/og-cover.jpg"],
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
  verification: {
    google: "2GQTx5-n9JcIS0caqD2mItbou8HvUryLzFeRe8Fj9kM",
  },
};

const Page = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.griffitystudios.com/#organization",
    name: "Griffity Studios",
    url: "https://www.griffitystudios.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.griffitystudios.com/logos/logo.png",
      width: 250,
      height: 60,
    },
    description: "Full-service creative agency in Nepal specializing in branding, web design, video production, and digital marketing.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
    sameAs: [
      "https://www.facebook.com/griffitystudios",
      "https://www.instagram.com/griffitystudios",
      "https://www.linkedin.com/company/griffitystudios",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "NP",
      availableLanguage: ["English", "Nepali"],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.griffitystudios.com/#website",
    url: "https://www.griffitystudios.com",
    name: "Griffity Studios",
    description: "Creative Agency in Nepal - Branding, Design & Development",
    publisher: {
      "@id": "https://www.griffitystudios.com/#organization",
    },
    inLanguage: "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main className="relative ">
        <Loader />
        <Hero />
        <div className="relative overflow-hidden">
          {/* <GradientRec /> */}
          <About />
          {/* <Clientnumber /> */}
          <Services />
        </div>
        <div className="h-screen flex flex-col justify-center items-center overflow-hidden mb-10 sm:mb-96">
          <Reels2 />
          <Reels />
        </div>
        <TrustedClient />

        <Client />
        <div className="relative overflow-hidden max-w-screen-3xl mx-auto">
          <GriffityBg />
          <JoinUs />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Page;
