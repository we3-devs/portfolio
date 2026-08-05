"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Download,
  ArrowUpRight,
  Shield,
  Terminal as TerminalIcon,
  Bug,
  Radar,
  Activity,
  Code2,
  Database,
  ShieldAlert,
  Fingerprint,
  FolderGit2,
  FlaskConical,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import { useProfile, useContent } from "@/lib/use-content";
import { getProjects, getLabs, getCertifications } from "@/lib/content";

const typingPhrases = [
  "Learning Cybersecurity...",
  "Building Secure Systems...",
  "Protecting Digital Infrastructure...",
  "Exploring AI Security...",
  "Hunting Threats...",
  "Securing Networks...",
];

const techBadges = [
  { label: "Linux", icon: TerminalIcon, className: "top-[4%] left-[2%]", delay: 0 },
  { label: "Burp Suite", icon: Bug, className: "top-[14%] right-[0%]", delay: 0.6 },
  { label: "Nmap", icon: Radar, className: "top-[46%] left-[-6%]", delay: 1.2 },
  { label: "Wireshark", icon: Activity, className: "bottom-[65%] right-[-4%]", delay: 1.8 },
  { label: "Next.js", icon: Code2, className: "bottom-[20%] left-[5%]", delay: 0.3 },
  { label: "PostgreSQL", icon: Database, className: "bottom-[-4%] right-[18%]", delay: 0.9 },
  { label: "SOC", icon: ShieldAlert, className: "top-[2%] left-[38%]", delay: 1.5 },
  { label: "Kali Linux", icon: Fingerprint, className: "top-[66%] right-[-6%]", delay: 2.1 },
];

function AnimatedCounter({ value, suffix = "+" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || value <= 0) return;
    const duration = 1200;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface StatCardProps {
  icon: typeof FolderGit2;
  value: number;
  label: string;
  delay: number;
}

function StatCard({ icon: Icon, value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3, borderColor: "rgba(0,229,255,0.4)" }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-3 transition-colors"
    >
      <div className="shrink-0 w-9 h-9 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
        <Icon size={16} className="text-[#00E5FF]" />
      </div>
      <div>
        <div className="text-xl font-bold text-white leading-none font-mono">
          <AnimatedCounter value={value} />
        </div>
        <div className="text-xs text-[#94A3B8] mt-1">{label}</div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { profile } = useProfile();
  const { data: projects } = useContent(getProjects);
  const { data: labs } = useContent(getLabs);
  const { data: certifications } = useContent(getCertifications);

  const name = profile?.name || "prashantaa Guragain";
  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "";
  const subtitleLines = profile?.title
    ? profile.title
        .split(/[&|]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : ["Cybersecurity Student", "Secure Software Developer", "SOC Enthusiast"];
  const badgeRole = subtitleLines[0] || "Cybersecurity Student";
  const description =
    profile?.bio ||
    "I design and build secure, modern web applications while sharpening my skills as a security researcher — bridging development and defense in every project I ship.";
  const avatarUrl = profile?.avatar_url || "/profile-photo.jpg";
  const resumeUrl = profile?.resume_url || "#";

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentPhrase.length) {
      timeout = setTimeout(() => setCharIndex((prev) => prev + 1), 50);
    } else if (!isDeleting && charIndex === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((prev) => prev - 1), 25);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const stats = [
    { icon: FolderGit2, value: projects.length || 15, label: "Projects" },
    { icon: FlaskConical, value: labs.length || 10, label: "Security Labs" },
    { icon: BadgeCheck, value: certifications.length || 8, label: "Certifications" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 229, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="false"
      />

      {/* Radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00E5FF]/20 blur-[140px]"
        />
        <motion.div
          animate={{ opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-[#00FF88]/15 blur-[140px]"
        />
        {/* Floating particles */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#00E5FF]/50"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -14, 0] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* ===== Left column ===== */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/25 bg-[#00E5FF]/5 px-4 py-1.5 mb-6 backdrop-blur-md"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_rgba(0,255,136,0.8)]"
              />
              <Shield size={13} className="text-[#00E5FF]" />
              <span className="text-xs font-mono text-[#94A3B8]">
                {badgeRole} &amp; Full-Stack Developer
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
            >
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="block"
              >
                Building{" "}
                <span className="text-[#FFC857]">
                  Secure
                </span>{" "}
                Digital
              </motion.span>
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="block"
              >
                Experiences.
              </motion.span>
              <motion.span
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="block text-[#94A3B8] text-2xl sm:text-3xl lg:text-4xl mt-2 font-semibold"
              >
                Protecting Systems, {""}
                <span className="text-white">Developing Modern Apps.</span>
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6"
            >
              {description}
            </motion.p>

            {/* Typing terminal line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-mono text-sm mb-8 inline-flex items-center rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
            >
              <span className="text-[#00E5FF]">$</span>
              <span className="text-[#94A3B8] ml-2">
                {typingPhrases[phraseIndex].slice(0, charIndex)}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-[#00E5FF] ml-0.5"
              >
                _
              </motion.span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("projects")}
                className="group relative px-7 py-3 rounded-lg font-semibold text-sm text-[#050816] bg-[#FFC857] shadow-[0_0_25px_rgba(255,200,87,0.3)] hover:shadow-[0_0_35px_rgba(255,200,87,0.45)] transition-shadow flex items-center gap-2"
              >
                Explore Projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={resumeUrl}
                target={resumeUrl !== "#" ? "_blank" : undefined}
                rel={resumeUrl !== "#" ? "noopener noreferrer" : undefined}
                className="group px-7 py-3 rounded-lg font-mono text-sm text-white border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 backdrop-blur-md transition-colors flex items-center gap-2"
              >
                <Download size={16} className="text-[#00E5FF]" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                  delay={0.7 + i * 0.1}
                />
              ))}
            </div>
          </div>

          {/* ===== Right column — illustration ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 400"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M60 60 L200 200 L340 80"
                  stroke="rgba(0,229,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.path
                  d="M340 320 L200 200 L40 300"
                  stroke="rgba(0,255,136,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                />
              </svg>

              {/* Central terminal / dashboard card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 rounded-xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFC857]/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88]/70" />
                  <span className="ml-2 text-[10px] font-mono text-[#94A3B8]">
                    security-dashboard.sh
                  </span>
                </div>
                <div className="p-4 font-mono text-[11px] leading-relaxed space-y-1">
                  <p className="text-[#94A3B8]">
                    <span className="text-[#00E5FF]">$</span> whoami
                  </p>
                  <p className="text-white">{firstName.toLowerCase()} Guragain</p>
                  <p className="text-[#94A3B8] mt-2">
                    <span className="text-[#00E5FF]">$</span> status --check
                  </p>
                  <p className="text-[#00FF88]">[OK] Firewall Active</p>
                  <p className="text-[#00FF88]">[OK] IDS Monitoring</p>
                  <p className="text-[#00FF88]">[OK] Threat Level: Low</p>
                </div>
              </motion.div>

              {/* Floating profile card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute bottom-[6%] left-[2%] flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl px-3 py-2.5 shadow-xl"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#00E5FF]/30 shrink-0">
                  <Image src={avatarUrl} alt={name} fill className="object-cover" />
                  <motion.span
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00FF88] border border-[#0F172A]"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-none">{firstName}</p>
                  <p className="text-[10px] text-[#94A3B8] mt-1">Available for work</p>
                </div>
              </motion.div>

              {/* Floating tech badges */}
              {techBadges.map(({ label, icon: Icon, className, delay }) => (
                <motion.div
                  key={label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3.5 + (delay % 2),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                  whileHover={{ scale: 1.08, borderColor: "rgba(0,229,255,0.5)" }}
                  className={`absolute ${className} flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-md px-2.5 py-1.5 shadow-lg transition-colors`}
                >
                  <Icon size={12} className="text-[#00E5FF]" />
                  <span className="text-[10px] font-mono text-white whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile illustration (simplified) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:hidden flex flex-col items-center gap-4"
          >
            <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0F172A]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC857]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88]/70" />
                <span className="ml-2 text-[10px] font-mono text-[#94A3B8]">
                  security-dashboard.sh
                </span>
              </div>
              <div className="p-4 font-mono text-[11px] leading-relaxed space-y-1">
                <p className="text-[#94A3B8]">
                  <span className="text-[#00E5FF]">$</span> status --check
                </p>
                <p className="text-[#00FF88]">[OK] Firewall Active</p>
                <p className="text-[#00FF88]">[OK] IDS Monitoring</p>
                <p className="text-[#00FF88]">[OK] Threat Level: Low</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {techBadges.slice(0, 6).map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-md px-2.5 py-1.5"
                >
                  <Icon size={12} className="text-[#00E5FF]" />
                  <span className="text-[10px] font-mono text-white">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
        aria-label="Scroll to about section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
