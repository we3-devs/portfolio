import { supabase } from "@/lib/supabase";
import type {
  Achievement,
  BlogPost,
  Certification,
  Lab,
  Project,
  Skill,
  TimelineEvent,
} from "@/types";

type Row = Record<string, any>;

export async function getCertifications(): Promise<Certification[]> {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    title: row.title,
    issuer: row.issuer ?? "",
    date: row.issue_date ? String(row.issue_date).slice(0, 7) : "",
    credentialUrl: row.verification_url ?? "",
    logo: row.image_url ?? "",
    status: row.status === "In Progress" ? "In Progress" : "Verified",
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    excerpt: row.excerpt ?? "",
    content: row.content ?? "",
    category: row.category ?? "",
    tags: row.tags ?? [],
    date: (row.published_at ?? row.created_at ?? "").slice(0, 10),
    readingTime: row.reading_time ?? "",
    slug: row.slug,
    coverImage: row.cover_image ?? "",
  }));
}

export async function getSkills(): Promise<Skill[]> {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    name: row.name,
    icon: row.icon ?? "Code2",
    description: row.description ?? "",
    level: row.level ?? 50,
    category: row.category ?? "",
  }));
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    image: row.image_url ?? "",
    techStack: row.tech_stack ?? [],
    github: row.github_url ?? "",
    live: row.live_url ?? "",
    caseStudy: "",
    featured: row.featured ?? false,
    challenges: row.challenges ?? [],
    lessons: row.lessons ?? [],
    architecture: row.architecture ?? "",
    security: row.security_features ?? [],
  }));
}

export async function getAchievements(): Promise<Achievement[]> {
  const { data, error } = await supabase
    .from("achievements")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    title: row.title,
    description: row.description ?? "",
    date: row.date ? String(row.date).slice(0, 10) : "",
    icon: row.icon ?? "Trophy",
    category: row.category ?? "",
  }));
}

export async function getLabs(): Promise<Lab[]> {
  const { data, error } = await supabase
    .from("labs")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    objective: row.objective ?? "",
    environment: row.environment ?? "",
    tools: row.tools ?? [],
    steps: row.steps ?? [],
    findings: row.findings ?? [],
    mitigation: row.mitigation ?? [],
    lessons: row.lessons ?? [],
    difficulty: row.difficulty ?? "Beginner",
  }));
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from("timeline")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) throw error;
  return ((data as Row[]) ?? []).map((row) => ({
    year: row.year ?? new Date().getFullYear(),
    title: row.title,
    description: row.description ?? "",
    icon: row.icon ?? "Code2",
  }));
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  about: string;
  avatar_url: string;
  resume_url: string;
  github_url: string;
  linkedin_url: string;
  location: string;
  email: string;
}

export async function getProfile(): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as Profile | null) ?? null;
}
