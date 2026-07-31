"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, GitBranch, Link, Download, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      setSubmitStatus("error");
      setStatusMessage(
        "Web3Forms access key not configured. Get a free key at web3forms.com"
      );
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setStatusMessage(
          "Message sent successfully. I'll get back to you soon!"
        );
        setFormState({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setStatusMessage(
          result.message || "Something went wrong. Please try again."
        );
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const links = [
    {
      label: "GitHub",
      href: "https://github.com/prashantguragain",
      icon: GitBranch,
      color: "hover:text-white",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/prashantguragain",
      icon: Link,
      color: "hover:text-[#0A66C2]",
    },
    {
      label: "Email",
      href: "mailto:prashantaguragain@gmail.com",
      icon: Mail,
      color: "hover:text-[#00E5FF]",
    },
    {
      label: "Resume",
      href: "#",
      icon: Download,
      color: "hover:text-[#00FF88]",
    },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-mono">
            <span className="text-[#00E5FF">@</span>
            {" "}Contact{" "}
            <span className="text-[#00E5FF]">@</span>
          </h2>
          <p className="text-[#94A3B8] font-mono text-sm">
            // Send a secure message
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="bg-[#111827]/80 backdrop-blur-sm border border-[rgba(0,229,255,0.08)] rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot for spam protection (hidden from humans) */}
                <input type="checkbox" name="botcheck" className="hidden" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-[#94A3B8] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg text-white text-sm font-mono placeholder-[#94A3B8]/50 focus:border-[#00E5FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-[#94A3B8] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg text-white text-sm font-mono placeholder-[#94A3B8]/50 focus:border-[#00E5FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-[#94A3B8] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg text-white text-sm font-mono placeholder-[#94A3B8]/50 focus:border-[#00E5FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/20 transition-all"
                    placeholder="Let's work together"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-[#94A3B8] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-[rgba(0,229,255,0.1)] rounded-lg text-white text-sm font-mono placeholder-[#94A3B8]/50 focus:border-[#00E5FF]/40 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/20 transition-all resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {/* Status messages */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-sm font-mono"
                  >
                    <CheckCircle size={16} />
                    {statusMessage}
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#FF4D6D]/10 border border-[#FF4D6D]/30 text-[#FF4D6D] text-sm font-mono"
                  >
                    <AlertCircle size={16} />
                    {statusMessage}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full px-6 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] font-mono text-sm hover:bg-[#00E5FF]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {submitStatus === "loading" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  )}
                  {submitStatus === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Direct links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#111827]/80 backdrop-blur-sm border border-[rgba(0,229,255,0.08)] rounded-lg p-6 h-full">
              <h3 className="text-white font-semibold text-sm mb-4 font-mono">
                Direct Links
              </h3>
              <div className="space-y-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg bg-[#0F172A] border border-[rgba(0,229,255,0.06)] text-[#94A3B8] ${link.color} transition-all hover:bg-white/5`}
                  >
                    <link.icon size={18} />
                    <span className="text-sm font-mono">{link.label}</span>
                  </a>
                ))}
              </div>

              {/* Availability */}
              <div className="mt-6 pt-4 border-t border-[rgba(0,229,255,0.08)]">
                <p className="text-[10px] font-mono text-[#94A3B8] mb-2">
                  Availability Status
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  <span className="text-xs font-mono text-[#00FF88]">
                    Open for opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
