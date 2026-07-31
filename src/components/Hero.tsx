"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Eye, Send, ChevronDown } from "lucide-react";

const typingPhrases = [
  "Learning Cybersecurity...",
  "Building Secure Systems...",
  "Protecting Digital Infrastructure...",
  "Exploring AI Security...",
  "Hunting Threats...",
  "Securing Networks...",
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 50);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 25);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Photo background blend — subtle, blurred, low-opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-[600px]"
        >
          <div className="relative w-full h-full">
            <Image
              src="/profile-photo.jpg"
              alt=""
              fill
              className="object-cover blur-3xl"
              priority
              aria-hidden="true"
            />
          </div>
        </motion.div>
        {/* Vignette to darken edges over the blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-[#050816]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-[#050816]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Profile image — actual photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 relative inline-block"
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-[#00E5FF]/30 p-1 relative group">
            <div className="w-full h-full rounded-full bg-[#0F172A] relative overflow-hidden">
              <Image
                src="/profile-photo.jpg"
                alt="Prashant Guragain"
                fill
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                priority
              />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full ring-1 ring-[#00E5FF]/20 ring-offset-2 ring-offset-[#050816] group-hover:ring-[#00E5FF]/40 transition-all duration-300" />
          </div>
          {/* Animated status dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-2 right-2 w-4 h-4 bg-[#00FF88] rounded-full border-2 border-[#050816] shadow-lg shadow-[#00FF88]/30"
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          Prashanta{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00FF88]">
            Guragain
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-1 mb-6"
        >
          <p className="text-lg sm:text-xl text-[#94A3B8] font-mono">
            Cybersecurity Student
          </p>
          <p className="text-lg sm:text-xl text-[#94A3B8] font-mono">
            Secure Software Developer
          </p>
          <p className="text-lg sm:text-xl text-[#94A3B8] font-mono">
            SOC Enthusiast
          </p>
        </motion.div>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 font-mono text-sm"
        >
          <span className="text-[#00E5FF]">$ </span>
          <span className="text-[#94A3B8]">
            {typingPhrases[phraseIndex].slice(0, charIndex)}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-[#00E5FF]"
          >
            _
          </motion.span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group relative px-8 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] font-mono text-sm hover:bg-[#00E5FF]/20 transition-all duration-300 flex items-center gap-2"
          >
            <Eye size={16} />
            View Projects
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00E5FF]/0 via-[#00E5FF]/5 to-[#00E5FF]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="group relative px-8 py-3 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-lg text-[#00FF88] font-mono text-sm hover:bg-[#00FF88]/20 transition-all duration-300 flex items-center gap-2">
            <Download size={16} />
            Download Resume
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="group relative px-8 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-mono text-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
          >
            <Send size={16} />
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
