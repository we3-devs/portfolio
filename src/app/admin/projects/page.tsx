"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit2, Trash2, Star } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  display_order: number;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProjects(); }, []);

  async function loadProjects() {
    const { data } = await (supabase as any).from("projects").select("*").order("display_order", { ascending: true });
    if (data) setProjects(data);
    setLoading(false);
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    await (supabase as any).from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Projects</h1>
          <p className="text-sm text-[#94A3B8] font-mono mt-1">{projects.length} projects</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {loading ? (
        <p className="text-[#94A3B8] font-mono text-sm">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-[#94A3B8] font-mono text-sm">No projects yet.</p>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg px-4 py-3 hover:border-[#00E5FF]/20 transition-all">
              <div className="flex items-center gap-3">
                {p.featured && <Star size={14} className="text-[#FFC857]" />}
                <div>
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                  <p className="text-[10px] font-mono text-[#94A3B8]">/{p.slug} · Order: {p.display_order}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/admin/projects/${p.id}/edit`} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all">
                  <Edit2 size={14} />
                </Link>
                <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
