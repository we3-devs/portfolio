"use client";

import { motion } from "framer-motion";
import { Terminal, MapPin, User, Target } from "lucide-react";
import { useProfile } from "@/lib/use-content";

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

        <div className="max-w-md mx-auto">
          {/* Metadata card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
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
        </div>
      </div>
    </section>
  );
}
