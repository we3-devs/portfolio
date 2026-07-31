"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  FileText,
  FolderKanban,
  Award,
  BadgeCheck as CertificateIcon,
  Code2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface Stats {
  blogs: number;
  projects: number;
  achievements: number;
  certifications: number;
  skills: number;
  messages: number;
  unreadMessages: number;
}

const statCards = [
  { label: "Blogs", key: "blogs" as const, icon: FileText, href: "/admin/blogs", color: "text-[#00E5FF]" },
  { label: "Projects", key: "projects" as const, icon: FolderKanban, href: "/admin/projects", color: "text-[#00FF88]" },
  { label: "Achievements", key: "achievements" as const, icon: Award, href: "/admin/achievements", color: "text-[#FFC857]" },    { label: "Certifications", key: "certifications" as const, icon: CertificateIcon, href: "/admin/certifications", color: "text-[#8B5CF6]" },
  { label: "Skills", key: "skills" as const, icon: Code2, href: "/admin/skills", color: "text-[#FF4D6D]" },
  { label: "Messages", key: "messages" as const, icon: MessageSquare, href: "/admin/messages", color: "text-[#F59E0B]" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    blogs: 0, projects: 0, achievements: 0,
    certifications: 0, skills: 0, messages: 0, unreadMessages: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [
        { count: blogs },
        { count: projects },
        { count: achievements },
        { count: certifications },
        { count: skills },
        { count: messages },
        { count: unreadMessages },
      ] = await Promise.all([
        (supabase as any).from("blogs").select("*", { count: "exact", head: true }),
        (supabase as any).from("projects").select("*", { count: "exact", head: true }),
        (supabase as any).from("achievements").select("*", { count: "exact", head: true }),
        (supabase as any).from("certifications").select("*", { count: "exact", head: true }),
        (supabase as any).from("skills").select("*", { count: "exact", head: true }),
        (supabase as any).from("contact_messages").select("*", { count: "exact", head: true }),
        (supabase as any).from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        blogs: blogs ?? 0,
        projects: projects ?? 0,
        achievements: achievements ?? 0,
        certifications: certifications ?? 0,
        skills: skills ?? 0,
        messages: messages ?? 0,
        unreadMessages: unreadMessages ?? 0,
      });
    }
    loadStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white font-mono">Dashboard</h1>
        <p className="text-sm text-[#94A3B8] font-mono mt-1">Overview of your portfolio content</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const count = stats[card.key];
          const isUnread = card.key === "messages";

          return (
            <Link
              key={card.key}
              href={card.href}
              className="group bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-lg bg-[#00E5FF]/5 border border-[rgba(0,229,255,0.06)]">
                  <Icon size={18} className={card.color} />
                </div>
                {isUnread && stats.unreadMessages > 0 && (
                  <span className="px-2 py-0.5 text-[9px] font-mono bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/20 rounded-full">
                    {stats.unreadMessages} new
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-white font-mono">{count}</p>
              <p className="text-xs font-mono text-[#94A3B8] mt-1 flex items-center gap-1">
                {card.label}
                <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
