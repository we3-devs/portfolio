"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Mobile background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 lg:hidden"
      >
        <Image
          src="/hero-bgformobilejpeg.jpeg"
          alt=""
          fill
          className="object-cover object-[center_15%] opacity-100"
          priority
        />
      </motion.div>

      {/* Desktop background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="hidden lg:block absolute inset-0"
      >
        <Image
          src="/hero-bg1.jpeg"
          alt=""
          fill
          className="object-cover object-[70%_20%] opacity-100"
          priority
        />
      </motion.div>
      {/* Theme tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#00FF88]/10" />
      {/* Legibility gradient — desktop: asymmetric, text sits in the left column */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#050816]/90 via-[#050816]/55 to-[#050816]/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/25 via-[#050816]/45 to-[#050816]/85" />
    </div>
  );
}
