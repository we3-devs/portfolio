"use client";

import { motion } from "framer-motion";
import { useProfile } from "@/lib/use-content";

export default function Footer() {
  const { profile } = useProfile();
  const name = profile?.name || "Prashant Guragain";

  const techStack = [
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "Lucide React",
  ];

  return (
    <footer className="relative border-t border-[rgba(0,229,255,0.06)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tech stack */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#94A3B8]">
              Built with
            </span>
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] font-mono bg-[#0F172A] text-[#94A3B8] border border-[rgba(0,229,255,0.06)] rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono text-[#94A3B8]"
          >
            <span className="text-[#00E5FF]">©</span>{" "}
            {new Date().getFullYear()} {name}.{" "}
            <span className="text-[#94A3B8]/60">
              All systems secure.
            </span>
          </motion.p>
        </div>

        {/* Deployed on badge */}
        <div className="mt-4 text-center">
          <span className="text-[9px] font-mono text-[#94A3B8]/40">
            Deployed on{" "}
            <span className="text-[#00E5FF]/60">Vercel</span>{" "}
            · Uptime Monitoring Active
          </span>
        </div>
      </div>
    </footer>
  );
}
