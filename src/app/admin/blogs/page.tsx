"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink, Search } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  created_at: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    const { data } = await (supabase as any).from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  }

  async function deleteBlog(id: string) {
    if (!confirm("Delete this blog post?")) return;
    await (supabase as any).from("blogs").delete().eq("id", id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Blogs</h1>
          <p className="text-sm text-[#94A3B8] font-mono mt-1">{blogs.length} articles</p>
        </div>
        <Link
          href="/admin/blogs/new/edit"
          className="flex items-center gap-2 px-4 py-2 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] text-sm font-mono hover:bg-[#00E5FF]/20 transition-all"
        >
          <Plus size={16} />
          New Blog
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs..."
          className="w-full pl-9 pr-3 py-2 text-sm bg-[#111827] border border-[rgba(0,229,255,0.08)] rounded-lg text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00E5FF]/30 font-mono"
        />
      </div>

      {loading ? (
        <p className="text-[#94A3B8] font-mono text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#94A3B8] font-mono text-sm">No blogs found.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((blog) => (
            <div
              key={blog.id}
              className="flex items-center justify-between bg-[#111827]/60 border border-[rgba(0,229,255,0.06)] rounded-lg px-4 py-3 hover:border-[#00E5FF]/20 transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white truncate">{blog.title}</h3>
                  <span className={`px-2 py-0.5 text-[9px] font-mono rounded-full ${
                    blog.status === "published"
                      ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20"
                      : "bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/20"
                  }`}>
                    {blog.status || "draft"}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[#94A3B8] mt-0.5">
                  {blog.slug} · {blog.category}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="p-2 rounded-lg text-[#94A3B8] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all"
                >
                  <Edit2 size={14} />
                </Link>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="p-2 rounded-lg text-[#94A3B8] hover:text-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all"
                >
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
