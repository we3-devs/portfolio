"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save } from "lucide-react";

export default function AdminProfile() {
  const [form, setForm] = useState({
    name: "", title: "", bio: "", about: "",
    avatar_url: "", resume_url: "",
    github_url: "", linkedin_url: "", twitter_url: "", website_url: "",
    location: "", email: "",
  });
  const [saving, setSaving] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await (supabase as any).from("profiles").select("*").limit(1).single();
    if (data) {
      setForm({
        name: data.name || "", title: data.title || "", bio: data.bio || "", about: data.about || "",
        avatar_url: data.avatar_url || "", resume_url: data.resume_url || "",
        github_url: data.github_url || "", linkedin_url: data.linkedin_url || "",
        twitter_url: data.twitter_url || "", website_url: data.website_url || "",
        location: data.location || "", email: data.email || "",
      });
      setProfileId(data.id);
    }
  }

  async function handleSave() {
    setSaving(true);
    if (profileId) {
      await (supabase as any).from("profiles").update(form).eq("id", profileId);
    } else {
      const { data } = await (supabase as any).from("profiles").insert([form]).select();
      if (data) setProfileId(data[0].id);
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white font-mono">Profile</h1>
        <p className="text-sm text-[#94A3B8] font-mono mt-1">Edit your public profile information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Title</label><input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Bio</label><textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30 resize-none" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">About</label><textarea value={form.about} onChange={(e) => setForm((f) => ({ ...f, about: e.target.value }))} rows={6} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30 resize-none" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Location</label><input type="text" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
        </div>
        <div className="space-y-4">
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Avatar URL</label><input type="text" value={form.avatar_url} onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">Resume URL</label><input type="text" value={form.resume_url} onChange={(e) => setForm((f) => ({ ...f, resume_url: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">GitHub</label><input type="text" value={form.github_url} onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
            <div><label className="block text-xs font-mono text-[#94A3B8] mb-1">LinkedIn</label><input type="text" value={form.linkedin_url} onChange={(e) => setForm((f) => ({ ...f, linkedin_url: e.target.value }))} className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white font-mono focus:outline-none focus:border-[#00E5FF]/30" /></div>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50">
            <Save size={14} /> {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
