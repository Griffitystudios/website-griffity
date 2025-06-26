import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const GriffityBg = () => {
  return (
    <motion.div className="absolute right-28  translate-y-5 h-full bottom-0 overflow-hidden ">
      <Image
        width={800}
        height={800}
        src="/logos/bg-logo.svg"
        alt="Griffity Studios"
        className=" object-cover"
      />
    </motion.div>
  );
};

export default GriffityBg;
