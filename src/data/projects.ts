import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "harmonagar",
    title: "harmoNagar",
    tagline: "Restaurant AI Analytics Platform",
    description:
      "An intelligent restaurant analytics platform leveraging AI for customer insights, inventory management, and predictive analytics. Built with RAG-based recommendation systems and real-time data processing.",
    image: "/projects/harmonagar.jpg",
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Python",
      "FastAPI",
      "Docker",
      "Redis",
    ],
    github: "https://github.com/prashantguragain/harmonagar",
    live: "https://harmonagar.vercel.app",
    caseStudy: "/projects/harmonagar",
    featured: true,
    challenges: [
      "Implementing real-time analytics with sub-second latency",
      "Designing a RAG pipeline for restaurant recommendations",
      "Managing concurrent user sessions with data consistency",
    ],
    lessons: [
      "Optimizing vector search with pgvector for production workloads",
      "Implementing proper rate limiting and API security",
      "Building scalable microservices architecture",
    ],
    architecture:
      "Microservices architecture with Next.js frontend, FastAPI backend, PostgreSQL with pgvector for embeddings, Redis caching layer, and Docker containerization.",
    security: [
      "JWT-based authentication",
      "Input sanitization and validation",
      "Rate limiting on API endpoints",
      "Encrypted data at rest and in transit",
    ],
  },
  {
    id: "cyber-lab",
    title: "Cyber Security Lab",
    tagline: "Virtual Security Operations Center",
    description:
      "A comprehensive virtual lab environment for security testing, network analysis, and penetration testing. Features automated scanning, vulnerability assessment, and detailed reporting.",
    image: "/projects/cyberlab.jpg",
    techStack: [
      "Python",
      "Bash",
      "Docker",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Burp Suite",
    ],
    github: "https://github.com/prashantguragain/cyber-lab",
    live: "",
    caseStudy: "/projects/cyber-lab",
    featured: false,
    challenges: [
      "Creating realistic attack scenarios for learning",
      "Documenting step-by-step exploitation chains",
    ],
    lessons: [
      "Understanding attack vectors and defense mechanisms",
      "Implementing proper security controls",
    ],
    architecture:
      "Docker-based lab environment with multiple containers simulating target systems, attacker workstations, and monitoring tools.",
    security: [
      "Isolated lab network environment",
      "Controlled attack surfaces",
      "Monitoring and logging all activities",
    ],
  },
  {
    id: "portfolio",
    title: "CyberSentinel Portfolio",
    tagline: "SOC-Inspired Developer Portfolio",
    description:
      "An immersive cybersecurity-themed portfolio designed as a Security Operations Center dashboard. Demonstrates modern frontend engineering and security expertise.",
    image: "/projects/portfolio.jpg",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide React",
    ],
    github: "https://github.com/prashantguragain/portfolio",
    live: "https://prashantguragain.vercel.app",
    caseStudy: "/projects/portfolio",
    featured: true,
    challenges: [
      "Balancing immersive design with professional tone",
      "Creating a performant animated network background",
      "Implementing interactive terminal without external libraries",
    ],
    lessons: [
      "Advanced Framer Motion orchestration techniques",
      "Performance optimization for canvas-based animations",
      "Building accessible animated interfaces",
    ],
    architecture:
      "Single-page application with Next.js App Router, CSS-based animations for performance, Framer Motion for orchestrated transitions.",
    security: [
      "No external data fetching vulnerabilities",
      "Content Security Policy headers",
      "Accessible and semantic HTML structure",
    ],
  },
  {
    id: "harmonagar-hackathon",
    title: "harmoNagar (Hackathon Project)",
    tagline: "Municipality Transparency Platform",
    description:
      "A municipality transparency platform with complaint management, public project tracking, RTI support, and AI-powered analysis built during a hackathon.",
    image: "/projects/harmonagar-hackathon.jpg",
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Flutter",
      "Django",
      "JWT",
      "Argon2id",
    ],
    github: "https://github.com/prashantguragain/harmonagar",
    live: "",
    caseStudy: "/projects/harmonagar-hackathon",
    featured: false,
    challenges: [
      "Building cross-platform mobile and web interfaces for civic engagement",
      "Implementing secure JWT authentication with Argon2id password hashing",
      "Integrating interactive mapping for public project tracking",
    ],
    lessons: [
      "Full-stack development with multiple frontends (web + mobile)",
      "Secure authentication best practices for civic applications",
      "Building effective civic tech for government transparency",
    ],
    architecture:
      "Multi-platform architecture with Next.js web frontend, Flutter mobile app, Node.js backend API, Django AI service, and PostgreSQL database with JWT authentication and Argon2id password hashing.",
    security: [
      "JWT-based authentication",
      "Argon2id password hashing",
      "Input validation and sanitization",
      "Secure API endpoints",
    ],
  },
  {
    id: "smart-health-ai",
    title: "Smart Health AI Platform",
    tagline: "Youth & Rural Healthcare Hackathon",
    description:
      "Built for youth and rural healthcare access. Features AI integration, token-based privacy (no user login required), connecting patients with hospitals, NGOs, and government services.",
    image: "/projects/smart-health.jpg",
    techStack: [
      "Next.js",
      "Supabase",
      "AI Integration",
      "Token-based Privacy",
    ],
    github: "https://github.com/prashantguragain/smart-health",
    live: "",
    caseStudy: "",
    featured: false,
    challenges: [
      "Designing a privacy-first architecture without traditional user accounts",
      "Integrating AI for healthcare recommendations in underserved areas",
      "Connecting diverse stakeholders: patients, hospitals, NGOs, and government",
    ],
    lessons: [
      "Token-based privacy models for sensitive healthcare data",
      "Building accessible health technology for rural populations",
      "Rapid prototyping and delivery in hackathon environments",
    ],
    architecture:
      "Next.js frontend with Supabase backend, AI integration for healthcare recommendations, and token-based privacy system eliminating traditional user authentication for accessibility.",
    security: [
      "Token-based privacy system",
      "No personal data storage",
      "Secure AI integration",
    ],
  },
  {
    id: "cyber-learning-labs",
    title: "Cybersecurity Learning Labs",
    tagline: "Practical Security Projects Collection",
    description:
      "A collection of practical cybersecurity projects including Kali Linux lab setup, Metasploitable 2 exploitation practice, Nmap network scanning, DNS TXT-record exfiltration exercises, and Cisco Packet Tracer networking labs with VLAN and DHCP configurations.",
    image: "/projects/cyber-labs.jpg",
    techStack: [
      "Kali Linux",
      "Metasploitable",
      "Nmap",
      "Cisco Packet Tracer",
      "DNS",
      "Wireshark",
    ],
    github: "https://github.com/prashantguragain/cyber-labs",
    live: "",
    caseStudy: "",
    featured: false,
    challenges: [
      "Setting up reproducible and isolated lab environments",
      "Documenting exploitation techniques in an educational context",
      "Creating realistic networking scenarios with VLANs and DHCP",
    ],
    lessons: [
      "Hands-on penetration testing methodologies and workflows",
      "Network configuration, segmentation, and security best practices",
      "DNS security vulnerabilities and data exfiltration techniques",
    ],
    architecture:
      "Collection of virtual lab environments using Kali Linux, Metasploitable 2, Cisco Packet Tracer, and various security tools for hands-on cybersecurity and networking practice.",
    security: [
      "Isolated lab environments",
      "Ethical hacking guidelines",
      "Controlled testing scenarios",
    ],
  },
];
