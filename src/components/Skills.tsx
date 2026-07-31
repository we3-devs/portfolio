"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Terminal,
  Code2,
  FileJson,
  FileType,
  Globe,
  Server,
  Database,
  GitBranch,
  Bug,
  Monitor,
  Activity,
  Layout,
  Container,
  Scan,
} from "lucide-react";
import { skills } from "@/data/skills";
import type { Skill } from "@/types";
import { type ElementType } from "react";

const iconMap: Record<string, ElementType> = {
  Shield,
  Terminal,
  Code2,
  FileJson,
  FileType,
  Globe,
  Server,
  Database,
  GitBranch,
  Bug,
  Monitor,
  Activity,
  Layout,
  Container,
  Scan,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF]">[</span>
            {" "}Security Modules{" "}
            <span className="text-[#00E5FF]">]</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Loaded {skills.length} capabilities
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill: Skill, index: number) => {
            const Icon = iconMap[skill.icon] || Code2;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00E5FF]/0 via-transparent to-[#00FF88]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10 group-hover:bg-[#00E5FF]/10 transition-all">
                      <Icon size={18} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-xs font-mono text-[#94A3B8] bg-[#0F172A] px-2 py-1 rounded border border-[rgba(0,229,255,0.06)]">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00E5FF] transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-[#94A3B8] text-xs mb-4 line-clamp-2">
                    {skill.description}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#94A3B8] font-mono">Proficiency</span>
                      <span className="text-[#00E5FF] font-mono font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#0F172A] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00FF88]"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
