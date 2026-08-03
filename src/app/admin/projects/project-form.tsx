"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  onSave: () => void;
}

export default function ProjectForm({ onSave }: Props) {
  const params = useParams();
  const isNew = !params?.id || params.id === "new";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    image_url: "",
    featured: false,
    category: "",
    display_order: 0,
    challenges: "",
    lessons: "",
    architecture: "",
    security_features: "",
  });
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew && params?.id) {
      (supabase as any).from("projects").select("*").eq("id", params.id).single().then(({ data }: any) => {
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            tagline: data.tagline || "",
            description: data.description || "",
            tech_stack: (data.tech_stack || []).join(", "),
            github_url: data.github_url || "",
            live_url: data.live_url || "",
            image_url: data.image_url || "",
            featured: data.featured || false,
            category: data.category || "",
            display_order: data.display_order || 0,
            challenges: (data.challenges || []).join("\n"),
            lessons: (data.lessons || []).join("\n"),
            architecture: data.architecture || "",
            security_features: (data.security_features || []).join("\n"),
          });
        }
      });
    }
  }, []);

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: autoSlug ? slugify(title) : f.slug }));
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      tech_stack: form.tech_stack.split(",").map((t) => t.trim()).filter(Boolean),
      challenges: form.challenges.split("\n").filter(Boolean),
      lessons: form.lessons.split("\n").filter(Boolean),
      architecture: form.architecture,
      security_features: form.security_features.split("\n").filter(Boolean),
    };

    if (isNew) {
      await (supabase as any).from("projects").insert([payload]);
    } else {
      await (supabase as any).from("projects").update(payload).eq("id", params!.id);
    }
    setSaving(false);
    onSave();
  }

  return (
    <div>
      <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white mb-6 transition-colors font-mono">
        <ArrowLeft size={14} /> Back to Projects
      </Link>
      <h1 className="text-2xl font-bold text-white mb-6 font-mono">{isNew ? "New Project" : "Edit Project"}</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Title</label>
            <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Slug</label>
            <input type="text" value={form.slug} onChange={(e) => { setForm((f) => ({ ...f, slug: e.target.value })); setAutoSlug(false); }} className="w-full px-3 py-2 text-xs bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-[#94A3B8] focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={5} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono resize-none" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Tech Stack (comma separated)</label>
            <input type="text" value={form.tech_stack} onChange={(e) => setForm((f) => ({ ...f, tech_stack: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
          </div>
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Architecture</label>
            <textarea value={form.architecture} onChange={(e) => setForm((f) => ({ ...f, architecture: e.target.value }))} rows={3} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono resize-none" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-4 space-y-3">
            <label className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
              Featured Project
            </label>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Display Order</label>
              <input type="number" value={form.display_order} onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">GitHub URL</label>
              <input type="text" value={form.github_url} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Live URL</label>
              <input type="text" value={form.live_url} onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))} className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1">Image URL</label>
              <input type="text" value={form.image_url} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono" />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
