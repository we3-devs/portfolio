"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, CheckCircle, Clock, Loader2, AlertCircle } from "lucide-react";
import { getCertifications } from "@/lib/content";
import { useContent } from "@/lib/use-content";

export default function Certifications() {
  const { data: certifications, loading, error } = useContent(getCertifications);

  return (
    <section id="certifications" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF">[</span>
            {" "}Certifications{" "}
            <span className="text-[#00E5FF">]</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Verified security credentials
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#94A3B8]">
            <Loader2 size={16} className="animate-spin text-[#00E5FF]" />
            Loading certifications...
          </div>
        )}

        {error && !loading && (
          <div className="flex items-center justify-center gap-2 py-12 text-sm font-mono text-[#FF4D6D]">
            <AlertCircle size={16} />
            Failed to load certifications.
          </div>
        )}

        {!loading && !error && (
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative bg-[#111827]/60 backdrop-blur-sm border border-[rgba(0,229,255,0.06)] rounded-lg p-6 hover:border-[#00E5FF]/20 transition-all duration-300"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00E5FF]/0 via-transparent to-[#00FF88]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Logo placeholder */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00E5FF]/10 to-[#00FF88]/10 border border-[rgba(0,229,255,0.1)] flex items-center justify-center mb-4">
                  <Award size={22} className="text-[#00E5FF]" />
                </div>

                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#00E5FF] transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mb-3">{cert.issuer}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {cert.status === "Verified" ? (
                      <>
                        <CheckCircle size={12} className="text-[#00FF88]" />
                        <span className="text-[10px] font-mono text-[#00FF88]">
                          {cert.status}
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock size={12} className="text-[#FFC857]" />
                        <span className="text-[10px] font-mono text-[#FFC857]">
                          {cert.status}
                        </span>
                      </>
                    )}
                  </div>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00E5FF] hover:text-[#00FF88] transition-colors"
                  >
                    Verify
                    <ExternalLink size={10} />
                  </a>
                </div>

                {/* Date */}
                <p className="text-[10px] font-mono text-[#94A3B8] mt-2">
                  {cert.date
                    ? new Date(cert.date + "-01").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "—"}
                </p>
              </div>              </motion.div>
            ))}
        </div>
        )}
      </div>
    </section>
  );
}
