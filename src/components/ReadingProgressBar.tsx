"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      scaleX.set(Math.min(scrollPercent, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00E5FF, #00FF88, #00E5FF)",
        backgroundSize: "200% 100%",
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.4), transparent)",
          filter: "blur(4px)",
        }}
      />
    </motion.div>
  );
}
