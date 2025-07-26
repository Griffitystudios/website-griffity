import React from "react";
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

const Page = () => {
  return (
    <>
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
