"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Shield,
  Network,
  Brain,
  Code2,
  Search,
  X,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getBlogPosts } from "@/lib/content";
import { useContent } from "@/lib/use-content";
import { type ElementType } from "react";

const categoryIcons: Record<string, ElementType> = {
  Cybersecurity: Shield,
  AI: Brain,
  Networking: Network,
  Programming: Code2,
};

const INITIAL_COUNT = 6;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const { data: blogPosts, loading, error } = useContent(getBlogPosts);

  const filteredPosts = blogPosts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      post.category.toLowerCase().includes(q)
    );
  });

  // Reset showAll when search changes
  const visiblePosts = showAll ? filteredPosts : filteredPosts.slice(0, INITIAL_COUNT);
  const selectedPostData = blogPosts.find((p) => p.id === selectedPost);

  // Collapse when searching
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setShowAll(false);
  };

  return (
    <section id="blog" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF]">#</span>
            {" "}Blog{" "}
            <span className="text-[#00E5FF]">#</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm mb-6">
            // Security research and tutorials
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-8 py-2.5 text-sm font-mono bg-[#111827]/80 border border-[rgba(0,229,255,0.08)] rounded-lg text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00E5FF]/30 focus:bg-[#111827] transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-[10px] font-mono text-[#94A3B8] text-left">
                {filteredPosts.length === 0
                  ? "No articles found"
                  : `Found ${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""}`}
              </p>
            )}
          </div>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#94A3B8]">
            <Loader2 size={16} className="animate-spin text-[#00E5FF]" />
            Loading articles...
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#FF4D6D]">
            <AlertCircle size={16} />
            Failed to load articles.
          </div>
        )}

        {!loading && !error && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePosts.map((post, index) => {
            const CategoryIcon = categoryIcons[post.category] || BookOpen;

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedPost(post.id)}
                className="group relative bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-5 hover:border-[#00E5FF]/20 transition-all duration-300 cursor-pointer"
              >
                <div className="relative z-10">
                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded bg-[#00E5FF]/5 border border-[#00E5FF]/10">
                      <CategoryIcon size={12} className="text-[#00E5FF]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#00E5FF] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mb-3 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono bg-[#0F172A] text-[#94A3B8] border border-[rgba(0,229,255,0.06)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#94A3B8] pt-3 border-t border-[rgba(0,229,255,0.06)]">
                    <div className="flex items-center gap-1.5">
                      <Clock size={10} />
                      {post.readingTime}
                    </div>
                    <span className="group-hover:text-[#00E5FF] transition-colors flex items-center gap-1">
                      Read <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
        )}

        {/* See More / Show Less */}
        {!loading && !error && filteredPosts.length > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-mono bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-lg text-[#00E5FF] hover:bg-[#00E5FF]/15 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less Articles
                  <ChevronRight size={14} className="rotate-90 transition-transform" />
                </>
              ) : (
                <>
                  See More Articles
                  <span className="text-xs opacity-60">({filteredPosts.length - INITIAL_COUNT} more)</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedPostData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg w-full max-w-lg max-h-[85vh] sm:max-h-[70vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-[#0F172A] border-b border-[rgba(0,229,255,0.08)] px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-[#00E5FF]/5 border border-[#00E5FF]/10">
                    {(() => {
                      const Icon = categoryIcons[selectedPostData.category] || BookOpen;
                      return <Icon size={14} className="text-[#00E5FF]" />;
                    })()}
                  </div>
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    {selectedPostData.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {selectedPostData.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#94A3B8]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {selectedPostData.readingTime}
                    </span>
                    <span>{selectedPostData.date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedPostData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono bg-[#00E5FF]/5 text-[#00E5FF] border border-[#00E5FF]/10 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-[rgba(0,229,255,0.06)]" />

                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {selectedPostData.excerpt}
                </p>

                {selectedPostData.content && (
                  <div className="text-sm text-[#94A3B8]/80 leading-relaxed whitespace-pre-line border-l-2 border-[#00E5FF]/20 pl-4">
                    {selectedPostData.content}
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[10px] font-mono text-[#94A3B8]/60">
                    Published: {selectedPostData.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
