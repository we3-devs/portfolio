"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beaker,
  ChevronDown,
  ChevronUp,
  Target,
  Wrench,
  ListChecks,
  AlertTriangle,
  Lightbulb,
  Shield,
} from "lucide-react";
import { labs } from "@/data/labs";

const difficultyColors = {
  Beginner: "#00FF88",
  Intermediate: "#FFC857",
  Advanced: "#FF4D6D",
};

export default function CyberLab() {
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  const toggleLab = (id: string) => {
    setExpandedLab(expandedLab === id ? null : id);
  };

  return (
    <section id="labs" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF]">{`{`}</span>
            {" "}Cyber Lab{" "}
            <span className="text-[#00E5FF]">{`}`}</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Security testing and analysis reports
          </p>
        </motion.div>

        <div className="space-y-4">
          {labs.map((lab, index) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg overflow-hidden hover:border-[#00E5FF]/20 transition-all duration-300"
            >
              {/* Header */}
              <button
                onClick={() => toggleLab(lab.id)}
                className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10 shrink-0">
                    <Beaker size={20} className="text-[#00E5FF]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {lab.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] line-clamp-1">
                      {lab.objective}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{
                          color: difficultyColors[lab.difficulty],
                          borderColor: `${difficultyColors[lab.difficulty]}20`,
                          backgroundColor: `${difficultyColors[lab.difficulty]}10`,
                        }}
                      >
                        {lab.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-[#94A3B8]">
                        {lab.tools.length} tools
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-[#94A3B8] mt-1 shrink-0">
                  {expandedLab === lab.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedLab === lab.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-[rgba(0,229,255,0.06)]">
                      <div className="pt-4 space-y-5">
                        {/* Objective */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00E5FF] mb-2 flex items-center gap-2">
                            <Target size={12} />
                            Objective
                          </h4>
                          <p className="text-sm text-[#94A3B8]">{lab.objective}</p>
                        </div>

                        {/* Environment */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00E5FF] mb-2">
                            Environment
                          </h4>
                          <p className="text-sm text-[#94A3B8]">{lab.environment}</p>
                        </div>

                        {/* Tools */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00E5FF] mb-2 flex items-center gap-2">
                            <Wrench size={12} />
                            Tools
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {lab.tools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-1 text-[11px] font-mono bg-[#0F172A] text-[#94A3B8] border border-[rgba(0,229,255,0.06)] rounded"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Steps */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00E5FF] mb-2 flex items-center gap-2">
                            <ListChecks size={12} />
                            Steps
                          </h4>
                          <ol className="space-y-1.5">
                            {lab.steps.map((step, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[#94A3B8]"
                              >
                                <span className="text-[#00E5FF] font-mono text-xs mt-0.5 shrink-0">
                                  [{i + 1}]
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Findings */}
                        <div>
                          <h4 className="text-xs font-mono text-[#FFC857] mb-2 flex items-center gap-2">
                            <AlertTriangle size={12} />
                            Findings
                          </h4>
                          <ul className="space-y-1.5">
                            {lab.findings.map((finding, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[#94A3B8]"
                              >
                                <span className="text-[#FFC857] mt-1 shrink-0">•</span>
                                {finding}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mitigation */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00FF88] mb-2 flex items-center gap-2">
                            <Shield size={12} />
                            Mitigation
                          </h4>
                          <ul className="space-y-1.5">
                            {lab.mitigation.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[#94A3B8]"
                              >
                                <span className="text-[#00FF88] mt-1 shrink-0">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Lessons Learned */}
                        <div>
                          <h4 className="text-xs font-mono text-[#00E5FF] mb-2 flex items-center gap-2">
                            <Lightbulb size={12} />
                            Lessons Learned
                          </h4>
                          <ul className="space-y-1.5">
                            {lab.lessons.map((lesson, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[#94A3B8]"
                              >
                                <span className="text-[#00E5FF] mt-1 shrink-0">•</span>
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
