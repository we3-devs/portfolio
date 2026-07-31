"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Activity, Wifi, Cpu, BookOpen } from "lucide-react";

interface StatusItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  pulse?: boolean;
}

export default function SecurityStatus() {
  const [securityScore, setSecurityScore] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setSecurityScore(98), 1500);
    return () => clearTimeout(timer);
  }, []);

  const items: StatusItem[] = [
    {
      label: "Threat Level",
      value: "LOW",
      icon: <Shield size={14} />,
      color: "#00FF88",
    },
    {
      label: "Security Score",
      value: `${securityScore}%`,
      icon: <Activity size={14} />,
      color: "#00E5FF",
    },
    {
      label: "Monitoring",
      value: "ACTIVE",
      icon: <Wifi size={14} />,
      color: "#00FF88",
      pulse: true,
    },
    {
      label: "System Status",
      value: "ONLINE",
      icon: <Cpu size={14} />,
      color: "#00FF88",
    },
    {
      label: "Learning",
      value: "IN PROGRESS",
      icon: <BookOpen size={14} />,
      color: "#FFC857",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="fixed top-20 right-4 z-40 hidden lg:block"
    >
      <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-[rgba(0,229,255,0.08)] rounded-lg p-3 w-48">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[rgba(0,229,255,0.08)]">
          <Shield size={12} className="text-[#00E5FF]" />
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
            Security Status
          </span>
        </div>

        <div className="space-y-2.5">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span style={{ color: item.color }}>{item.icon}</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.pulse && (
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <span
                  className="text-[10px] font-mono font-semibold"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
