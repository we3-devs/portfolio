"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Shield,
  Code2,
  Network,
  Building2,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getAchievements } from "@/lib/content";
import { useContent } from "@/lib/use-content";
import type { ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  Trophy,
  Shield,
  Code2,
  Network,
  Building2,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Hackathon: {
    bg: "bg-[#FFC857]/5",
    text: "text-[#FFC857]",
    border: "border-[#FFC857]/20",
  },
  Certification: {
    bg: "bg-[#00E5FF]/5",
    text: "text-[#00E5FF]",
    border: "border-[#00E5FF]/20",
  },
  Project: {
    bg: "bg-[#00FF88]/5",
    text: "text-[#00FF88]",
    border: "border-[#00FF88]/20",
  },
};

export default function Achievements() {
  const { data: achievements, loading, error } = useContent(getAchievements);

  return (
    <section id="achievements" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#FFC857]">[</span>
            {" "}Achievements{" "}
            <span className="text-[#FFC857]">]</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Key milestones and accomplishments
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#94A3B8]">
            <Loader2 size={16} className="animate-spin text-[#00E5FF]" />
            Loading achievements...
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#FF4D6D]">
            <AlertCircle size={16} />
            Failed to load achievements.
          </div>
        )}

        {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Trophy;
            const colors = categoryColors[achievement.category] || categoryColors.Project;

            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-all duration-300"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-2.5 rounded-lg ${colors.bg} border ${colors.border} mb-3`}>
                    <Icon size={16} className={colors.text} />
                  </div>

                  {/* Category badge */}
                  <span className={`inline-block px-2 py-0.5 text-[9px] font-mono ${colors.bg} ${colors.text} border ${colors.border} rounded mb-2`}>
                    {achievement.category}
                  </span>

                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#FFC857] transition-colors">
                    {achievement.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                    {achievement.description}
                  </p>

                  {/* Year */}
                  <div className="mt-3 pt-3 border-t border-[rgba(0,229,255,0.06)] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#94A3B8]/60">
                      {achievement.date.split("-")[0]}
                    </span>
                    <Sparkles size={12} className="text-[#FFC857]/40 group-hover:text-[#FFC857]/70 transition-colors" />
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#FFC857]/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
