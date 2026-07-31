"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import NetworkBackground from "@/components/NetworkBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SecurityStatus from "@/components/SecurityStatus";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CyberLab from "@/components/CyberLab";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTop from "@/components/BackToTop";
import Achievements from "@/components/Achievements";
import SectionReveal from "@/components/SectionReveal";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [konamiActivated, setKonamiActivated] = useState(false);

  // Konami Code detection
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Open GitHub with 'G'
      if (e.key === "g" || e.key === "G") {
        window.open("https://github.com/prashantaguragain", "_blank");
        return;
      }

      // Konami Code check
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setKonamiActivated(true);
          konamiIndex = 0;
          // Reset after 3 seconds
          setTimeout(() => setKonamiActivated(false), 3000);
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <>
      {/* Boot Screen */}
      {!bootComplete && <BootScreen onComplete={handleBootComplete} />}

      {/* Main Content */}
      <AnimatePresence>
        {bootComplete && (
          <>
            {/* Network Background */}
            <NetworkBackground />

            {/* Navigation */}
            <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

            {/* Reading Progress Bar */}
            <ReadingProgressBar />

            {/* Security Status Widget */}
            <SecurityStatus />

            {/* Main Sections */}
            <main className="relative z-10">
              <Hero />
              <SectionReveal>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
                  <About />
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <Skills />
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/[0.02] to-transparent pointer-events-none" />
                  <Projects />
                </div>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <CyberLab />
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <Certifications />
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <Achievements />
              </SectionReveal>
              <SectionReveal delay={0.3}>
                <Blog />
              </SectionReveal>
              <SectionReveal delay={0.3}>
                <Contact />
              </SectionReveal>
            </main>

            {/* Back to Top */}
            <BackToTop />

            {/* Footer */}
            <Footer />

            {/* Terminal */}
            <Terminal
              isOpen={terminalOpen}
              onClose={() => setTerminalOpen(false)}
            />

            {/* Konami Code Easter Egg */}
            {konamiActivated && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none">
                <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-[#FFC857]/30 rounded-lg px-8 py-6 text-center">
                  <p className="text-[#FFC857] font-mono text-lg font-bold mb-2">
                    🔓 ADMIN MODE ACTIVATED
                  </p>
                  <p className="text-[#94A3B8] font-mono text-sm">
                    Welcome, Administrator.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
