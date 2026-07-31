"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { Save, ArrowLeft, Eye } from "lucide-react";

export default function BlogEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    cover_image: "",
    seo_title: "",
    meta_description: "",
    status: "draft" as "draft" | "published",
  });
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (!isNew) {
      loadBlog();
    }
  }, []);

  async function loadBlog() {
    const { data } = await (supabase as any).from("blogs").select("*").eq("id", params.id).single();
    if (data) {
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || "",
        content: data.content || "",
        category: data.category || "",
        tags: (data.tags || []).join(", "),
        cover_image: data.cover_image || "",
        seo_title: data.seo_title || "",
        meta_description: data.meta_description || "",
        status: data.status || "draft",
      });
    }
  }

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: autoSlug ? slugify(title) : f.slug }));
  }

  async function handleSave(status: "draft" | "published") {
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      status,
      reading_time: `${Math.max(1, Math.ceil((form.content.length || 0) / 1000))} min read`,
      published_at: status === "published" ? new Date().toISOString() : null,
    };

    if (isNew) {
      await (supabase as any).from("blogs").insert([payload]);
    } else {
      await (supabase as any).from("blogs").update(payload).eq("id", params.id);
    }
    setSaving(false);
    router.push("/admin/blogs");
  }

  return (
    <div>
      <button onClick={() => router.push("/admin/blogs")} className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white mb-6 transition-colors font-mono">
        <ArrowLeft size={14} /> Back to Blogs
      </button>

      <h1 className="text-2xl font-bold text-white mb-6 font-mono">
        {isNew ? "New Blog Post" : "Edit Blog Post"}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="Blog title"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
              Slug <button onClick={() => setAutoSlug(!autoSlug)} className={`text-[10px] ml-2 ${autoSlug ? "text-[#00E5FF]" : "text-[#94A3B8]"}`}>[auto]</button>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => { setForm((f) => ({ ...f, slug: e.target.value })); setAutoSlug(false); }}
              className="w-full px-3 py-2 text-xs bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-[#94A3B8] focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="blog-slug"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono resize-none"
              placeholder="Brief summary..."
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Content (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              rows={16}
              className="w-full px-3 py-2.5 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono resize-y"
              placeholder="Write your blog content here... Supports markdown."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-4 space-y-3">
            <label className="block text-xs font-mono text-[#94A3B8] mb-1">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="Cybersecurity, AI, ..."
            />

            <label className="block text-xs font-mono text-[#94A3B8] mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="SOC, Security, Lab"
            />
          </div>

          <div className="bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg p-4 space-y-3">
            <label className="block text-xs font-mono text-[#94A3B8] mb-1">Cover Image URL</label>
            <input
              type="text"
              value={form.cover_image}
              onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
              className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="https://..."
            />

            <label className="block text-xs font-mono text-[#94A3B8] mb-1">SEO Title</label>
            <input
              type="text"
              value={form.seo_title}
              onChange={(e) => setForm((f) => ({ ...f, seo_title: e.target.value }))}
              className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono"
            />

            <label className="block text-xs font-mono text-[#94A3B8] mb-1">Meta Description</label>
            <textarea
              value={form.meta_description}
              onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-xs bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#00E5FF]/30 font-mono resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm font-mono hover:bg-white/10 transition-all disabled:opacity-50"
            >
              <Save size={14} /> Save Draft
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50"
            >
              <Eye size={14} /> Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
