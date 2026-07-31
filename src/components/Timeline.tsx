"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Network,
  GraduationCap,
  Trophy,
  Shield,
  Building2,
  Brain,
  Target,
} from "lucide-react";
import { timelineEvents } from "@/data/timeline";
import { type ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  Code2,
  Network,
  GraduationCap,
  Trophy,
  Shield,
  Building2,
  Brain,
  Target,
};

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF">|</span>
            {" "}Timeline{" "}
            <span className="text-[#00E5FF]">|</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Journey through cybersecurity
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00E5FF] via-[#00FF88] to-transparent" />

          <div className="space-y-8">
            {timelineEvents.map((event, index) => {
              const Icon = iconMap[event.icon] || Code2;

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-1 -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] border-2 border-[#00E5FF]/30 flex items-center justify-center group-hover:border-[#00E5FF] transition-colors">
                      <Icon size={14} className="text-[#00E5FF]" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-all duration-300 group">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-white font-semibold text-sm group-hover:text-[#00E5FF] transition-colors">
                        {event.title}
                      </h3>
                      <span className="shrink-0 text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/5 px-2 py-0.5 rounded border border-[#00E5FF]/10">
                        {event.year}
                      </span>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
