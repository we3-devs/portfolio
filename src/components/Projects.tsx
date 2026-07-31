"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  GitBranch,
  BookOpen,
  X,
  ChevronRight,
  Shield,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const INITIAL_COUNT = 3;

  // Collect unique tech stacks from all projects
  const allTechs = Array.from(new Set(projects.flatMap((p) => p.techStack))).sort();

  // Filter projects by active tech, then apply show/hide
  const filtered = activeTech
    ? projects.filter((p) => p.techStack.includes(activeTech))
    : projects;
  const visibleProjects = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

  const project = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF]">(</span>
            {" "}Projects{" "}
            <span className="text-[#00E5FF]">)</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Security-focused engineering work
          </p>
        </motion.div>

        {/* Tech filter bar */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveTech(null); setShowAll(false); }}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                !activeTech
                  ? "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30"
                  : "bg-[#0F172A] text-[#94A3B8] border-[rgba(0,229,255,0.06)] hover:text-white hover:border-white/20"
              }`}
            >
              All
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => { setActiveTech(activeTech === tech ? null : tech); setShowAll(false); }}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all duration-200 ${
                  activeTech === tech
                    ? "bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/30"
                    : "bg-[#0F172A] text-[#94A3B8] border-[rgba(0,229,255,0.06)] hover:text-white hover:border-white/20"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
          {activeTech && (
            <p className="mt-2 text-[10px] font-mono text-[#94A3B8]">
              Filtering by: <span className="text-[#00E5FF]">{activeTech}</span>
              {" · "}{filtered.length} project{filtered.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        <div className="space-y-8">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg overflow-hidden hover:border-[#00E5FF]/20 transition-all duration-300">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Project image placeholder */}
                    <div className="lg:w-80 shrink-0">
                      <div className="aspect-video lg:aspect-[4/3] rounded-lg bg-gradient-to-br from-[#00E5FF]/5 to-[#00FF88]/5 border border-[rgba(0,229,255,0.08)] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center mb-3">
                            <span className="text-2xl font-bold text-[#00E5FF] font-mono">
                              {project.title.charAt(0)}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-[#94A3B8]">
                            {project.techStack.slice(0, 4).join(" · ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-[#00E5FF] font-mono">
                            {project.tagline}
                          </p>
                        </div>
                        {project.featured && (
                          <span className="shrink-0 px-2.5 py-1 text-[10px] font-mono bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/20 rounded-full">
                            FEATURED
                          </span>
                        )}
                      </div>

                      <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-[11px] font-mono bg-[#0F172A] text-[#94A3B8] border border-[rgba(0,229,255,0.06)] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all"
                          >
                            <GitBranch size={14} />
                            Source
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-[#00FF88]/10 border border-[#00FF88]/20 rounded-lg text-[#00FF88] hover:bg-[#00FF88]/20 transition-all"
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-lg text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-all"
                        >
                          <BookOpen size={14} />
                          Case Study
                          <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See More / Show Less */}
        {filtered.length > INITIAL_COUNT && (
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
                  Show Less Projects
                  <ChevronRight size={14} className="rotate-90 transition-transform" />
                </>
              ) : (
                <>
                  See More Projects
                  <span className="text-xs opacity-60">({filtered.length - INITIAL_COUNT} more)</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-[#0F172A] border-b border-[rgba(0,229,255,0.08)] px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <p className="text-xs font-mono text-[#00E5FF]">{project.tagline}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Architecture */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield size={14} className="text-[#00E5FF]" />
                    Architecture
                  </h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {project.architecture}
                  </p>
                </div>

                {/* Challenges */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle size={14} className="text-[#FFC857]" />
                    Challenges
                  </h4>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <span className="text-[#FFC857] mt-1 shrink-0">◆</span>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lessons Learned */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Lightbulb size={14} className="text-[#00FF88]" />
                    Lessons Learned
                  </h4>
                  <ul className="space-y-2">
                    {project.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#94A3B8]">
                        <span className="text-[#00FF88] mt-1 shrink-0">◆</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Features */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield size={14} className="text-[#00E5FF]" />
                    Security Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.security.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-xs font-mono bg-[#00FF88]/5 text-[#00FF88] border border-[#00FF88]/10 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
