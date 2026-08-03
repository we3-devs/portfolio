"use client";

import { motion } from "framer-motion";
import { Terminal, MapPin, User, Target, Globe, BookOpen } from "lucide-react";
import { useProfile } from "@/lib/use-content";

const focusAreas = [
  { icon: ShieldIcon, label: "SOC" },
  { icon: Globe, label: "Networking" },
  { icon: BrainIcon, label: "AI Security" },
  { icon: Globe, label: "Web Security" },
  { icon: BookOpen, label: "RAG Systems" },
  { icon: Terminal, label: "Linux" },
];

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V12a2 2 0 1 1-4 0v-.5A4 4 0 0 1 12 4z" />
      <path d="M12 12v8" />
      <path d="M8 16a4 4 0 1 0 0-8" />
      <path d="M16 8a4 4 0 1 0 0 8" />
    </svg>
  );
}

export default function About() {
  const { profile } = useProfile();

  const metadata = [
    { label: "Hostname", value: "prashant.local", icon: Terminal },
    { label: "Location", value: profile?.location || "Nepal", icon: MapPin },
    { label: "Role", value: profile?.title || "Cybersecurity Student", icon: User },
    { label: "Mission", value: profile?.bio || "Become Security Analyst", icon: Target },
  ];

  return (
    <section id="about" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF]">&lt;</span>
            {" "}System Info{" "}
            <span className="text-[#00E5FF]">/&gt;</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            $ cat /etc/personal-info
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Metadata card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#111827]/80 backdrop-blur-sm border border-[rgba(0,229,255,0.08)] rounded-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,229,255,0.08)] bg-[#0F172A]/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC857]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
                </div>
                <span className="text-xs text-[#94A3B8] font-mono ml-2">system_info.exe</span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {metadata.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10">
                      <item.icon size={16} className="text-[#00E5FF]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-[#94A3B8]">{item.label}</p>
                      <p className="text-sm font-mono text-white mt-0.5">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Focus areas card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#111827]/80 backdrop-blur-sm border border-[rgba(0,229,255,0.08)] rounded-lg overflow-hidden h-full">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,229,255,0.08)] bg-[#0F172A]/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFC857]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
                </div>
                <span className="text-xs text-[#94A3B8] font-mono ml-2">focus_areas.sh</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-mono text-[#94A3B8] mb-4">
                  $ Current Focus Areas
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {focusAreas.map((area, index) => (
                    <motion.div
                      key={area.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-lg bg-[#00E5FF]/5 border border-[#00E5FF]/10 hover:bg-[#00E5FF]/10 transition-all cursor-default group"
                    >
                      <area.icon size={14} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-mono text-[#94A3B8] group-hover:text-white transition-colors">
                        {area.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats line */}
                <div className="mt-6 pt-4 border-t border-[rgba(0,229,255,0.08)]">
                  <p className="text-xs font-mono text-[#94A3B8]">
                    <span className="text-[#00E5FF]">$</span> echo "Learning in progress..."
                  </p>
                  <div className="mt-2 h-1.5 bg-[#0F172A] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "73%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF88] rounded-full"
                    />
                  </div>
                  <p className="text-xs font-mono text-[#94A3B8] mt-1">73% complete</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
