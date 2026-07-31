export interface Skill {
  name: string;
  icon: string;
  description: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  github: string;
  live: string;
  caseStudy: string;
  featured: boolean;
  challenges: string[];
  lessons: string[];
  architecture: string;
  security: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  logo: string;
  status: "Verified" | "In Progress";
}

export interface Lab {
  id: string;
  title: string;
  objective: string;
  environment: string;
  tools: string[];
  steps: string[];
  findings: string[];
  mitigation: string[];
  lessons: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: string;
  slug: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
