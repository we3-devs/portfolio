"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";
import { navigationItems } from "@/data/navigation";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navigationItems.map((item) => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050816]/80 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleClick("#home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center group-hover:bg-[#00E5FF]/20 transition-all">
                <span className="text-[#00E5FF] text-sm font-mono font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-white font-semibold text-sm hidden sm:block">
                CyberSentinel
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`relative px-3 py-2 text-sm rounded-lg transition-colors duration-200 font-mono ${
                      isActive ? "text-white" : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-liquid-glass"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,229,255,0.2)]"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Terminal preview button */}
              <motion.button
                onClick={onOpenTerminal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                title="Open Terminal"
                className="group relative hidden sm:flex items-center gap-2 rounded-full border border-[#00E5FF]/20 bg-white/[0.03] backdrop-blur-md pl-2 pr-4 py-1.5 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/5 transition-colors overflow-hidden"
              >
                <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#00E5FF]/10 shrink-0">
                  <TerminalIcon size={13} className="text-[#00E5FF]" />
                  <motion.span
                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border border-[#00E5FF]/60"
                  />
                </span>
                <span className="font-mono text-xs text-[#94A3B8] group-hover:text-white transition-colors whitespace-nowrap">
                  <span className="text-[#00E5FF]">$</span> terminal
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-[#00E5FF] ml-0.5"
                  >
                    _
                  </motion.span>
                </span>
                {/* animated preview underline */}
                <motion.span
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 left-2 right-4 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
                />
              </motion.button>

              {/* Terminal icon (mobile) */}
              <button
                onClick={onOpenTerminal}
                className="sm:hidden p-2 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all"
                title="Open Terminal"
              >
                <TerminalIcon size={18} />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-xl border-b border-[rgba(0,229,255,0.08)] md:hidden"
          >
            <div className="p-4 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm transition-all font-mono ${
                    activeSection === item.href.slice(1)
                      ? "text-white bg-white/10 backdrop-blur-xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(0,229,255,0.2)]"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
