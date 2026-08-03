// Seed script: migrates the portfolio content into Supabase.
// Usage: node scripts/seed.mjs
// Requires env vars: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or .env.local in project root)
// The script clears and re-inserts the content tables. Contact messages are NOT touched.

import { readFileSync, existsSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// ---- Load env (process.env first, then .env.local) ----
function loadEnv() {
  const env = { ...process.env };
  for (const file of [".env.local", ".env"]) {
    if (existsSync(file)) {
      const lines = readFileSync(file, "utf8").split("\n");
      for (const line of lines) {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
        if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  }
  return env;
}

const env = loadEnv();
const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local and retry."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

// ---- Content data (previously hardcoded in src/data/*) ----
const certifications = [
  {
    title: "Introduction to Critical Infrastructure Protection",
    issuer: "OPSWAT Academy",
    issue_date: "2026-01-27",
    verification_url: "https://learn.opswatacademy.com/certificate/b4AzMtP07g",
    status: "Verified",
  },
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    issue_date: "2026-01-29",
    verification_url:
      "https://www.credly.com/badges/35fe3f7a-414f-4a93-8c99-bddd780973fe/public_url",
    status: "In Progress",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issue_date: "2026-02-05",
    verification_url:
      "https://www.credly.com/badges/35fe3f7a-414f-4a93-8c99-bddd780973fe/public_url",
    status: "Verified",
  },
  {
    title: "Linux for Hackers",
    issuer: "Network Chunk",
    issue_date: "2024-10-05",
    verification_url:
      "https://youtube.com/playlist?list=PLIhvC56v63IJIujb5cyE13oLuyORZpdkL&si=FEsBUoosVmSrolP7",
    status: "Verified",
  },
];

const blogs = [
  {
    title: "Setting Up a Home SOC Lab",
    slug: "home-soc-lab-setup",
    excerpt:
      "A comprehensive guide to building your own Security Operations Center lab at home using open-source tools and virtual machines.",
    category: "Cybersecurity",
    tags: ["SOC", "Lab Setup", "SIEM", "ELK"],
    status: "published",
    published_at: "2025-06-15",
    reading_time: "12 min read",
  },
  {
    title: "Understanding RAG Systems for Security Applications",
    slug: "rag-systems-security",
    excerpt:
      "Exploring Retrieval-Augmented Generation and how it can be applied to security threat intelligence and incident response.",
    category: "AI",
    tags: ["RAG", "AI Security", "LLM", "pgvector"],
    status: "published",
    published_at: "2025-05-28",
    reading_time: "8 min read",
  },
  {
    title: "SQL Injection: From Discovery to Mitigation",
    slug: "sql-injection-guide",
    excerpt:
      "A step-by-step walkthrough of SQL injection attacks and the defensive measures every developer should implement.",
    category: "Cybersecurity",
    tags: ["SQL Injection", "Web Security", "Penetration Testing"],
    status: "published",
    published_at: "2025-04-10",
    reading_time: "10 min read",
  },
  {
    title: "Building Secure REST APIs with Node.js",
    slug: "secure-rest-apis-nodejs",
    excerpt:
      "Best practices for building production-ready REST APIs with security-first design patterns in Node.js and Express.",
    category: "Programming",
    tags: ["Node.js", "API Security", "Express", "JWT"],
    status: "published",
    published_at: "2025-03-22",
    reading_time: "7 min read",
  },
  {
    title: "Network Enumeration Techniques for Beginners",
    slug: "network-enumeration-beginners",
    excerpt:
      "Learn the fundamentals of network enumeration using Nmap and other tools to understand your network's attack surface.",
    category: "Networking",
    tags: ["Nmap", "Enumeration", "Network Security", "Recon"],
    status: "published",
    published_at: "2025-02-14",
    reading_time: "9 min read",
  },
  {
    title: "The Art of Writing Secure Code",
    slug: "art-of-secure-code",
    excerpt:
      "Principles and practices for writing code that is secure by design, from input validation to secure session management.",
    category: "Programming",
    tags: ["Secure Coding", "Best Practices", "OWASP"],
    status: "published",
    published_at: "2025-01-30",
    reading_time: "6 min read",
  },
  {
    title: "Incident Response Playbook: A Step-by-Step Guide",
    slug: "incident-response-playbook",
    excerpt:
      "A comprehensive incident response framework covering preparation, detection, containment, eradication, recovery, and lessons learned for security teams.",
    category: "Cybersecurity",
    tags: ["Incident Response", "IR", "Playbook", "Forensics"],
    status: "published",
    published_at: "2025-07-10",
    reading_time: "15 min read",
  },
  {
    title: "Zero Trust Architecture: Beyond the Hype",
    slug: "zero-trust-architecture",
    excerpt:
      "Understanding Zero Trust principles and how to implement them in modern cloud-native environments with micro-segmentation and continuous verification.",
    category: "Cybersecurity",
    tags: ["Zero Trust", "Architecture", "Cloud Security", "IAM"],
    status: "published",
    published_at: "2025-06-28",
    reading_time: "11 min read",
  },
  {
    title: "Phishing Simulation: Building a Cybersecurity Awareness Program",
    slug: "phishing-simulation-program",
    excerpt:
      "How to design, execute, and measure phishing simulations to strengthen your organization's human firewall and build a security-first culture.",
    category: "Cybersecurity",
    tags: ["Phishing", "Awareness", "Social Engineering", "Training"],
    status: "published",
    published_at: "2025-05-15",
    reading_time: "9 min read",
  },
  {
    title: "Container Security: Securing Docker and Kubernetes Deployments",
    slug: "container-security-guide",
    excerpt:
      "Best practices for securing containerized applications from image scanning and runtime protection to network policies and secrets management.",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "Container Security", "DevSecOps"],
    status: "published",
    published_at: "2025-04-20",
    reading_time: "13 min read",
  },
  {
    title: "Wireless Security: Attacking and Defending Wi-Fi Networks",
    slug: "wireless-security-guide",
    excerpt:
      "An exploration of common Wi-Fi attacks like WPA2 cracking, Evil Twin, and deauthentication attacks, plus defensive measures for enterprise networks.",
    category: "Networking",
    tags: ["Wi-Fi", "Wireless Security", "WPA3", "Network Defense"],
    status: "published",
    published_at: "2025-03-01",
    reading_time: "10 min read",
  },
];

const skills = [
  { name: "Network Security", icon: "Shield", description: "Network scanning, enumeration, and defensive strategies", level: 85, category: "Security", display_order: 0 },
  { name: "Linux", icon: "Terminal", description: "System administration, scripting, and security hardening", level: 88, category: "Systems", display_order: 1 },
  { name: "Python", icon: "Code2", description: "Automation, security tooling, and data analysis", level: 90, category: "Programming", display_order: 2 },
  { name: "JavaScript", icon: "FileJson", description: "Full-stack development and secure coding practices", level: 92, category: "Programming", display_order: 3 },
  { name: "TypeScript", icon: "FileType", description: "Type-safe application development with security focus", level: 88, category: "Programming", display_order: 4 },
  { name: "Next.js", icon: "Globe", description: "Modern full-stack React framework with SSR", level: 85, category: "Development", display_order: 5 },
  { name: "Node.js", icon: "Server", description: "Secure backend API development and microservices", level: 82, category: "Development", display_order: 6 },
  { name: "Express", icon: "Layout", description: "RESTful API design with security middleware", level: 80, category: "Development", display_order: 7 },
  { name: "PostgreSQL", icon: "Database", description: "Database design, optimization, and pgvector for AI", level: 78, category: "Databases", display_order: 8 },
  { name: "Docker", icon: "Container", description: "Containerization and secure deployment pipelines", level: 75, category: "DevOps", display_order: 9 },
  { name: "Git", icon: "GitBranch", description: "Version control and collaborative development", level: 85, category: "Development", display_order: 10 },
  { name: "Burp Suite", icon: "Bug", description: "Web application security testing and vulnerability assessment", level: 72, category: "Security", display_order: 11 },
  { name: "Nmap", icon: "Scan", description: "Network discovery and security auditing", level: 78, category: "Security", display_order: 12 },
  { name: "Wireshark", icon: "Activity", description: "Packet analysis and network protocol inspection", level: 70, category: "Security", display_order: 13 },
  { name: "VirtualBox", icon: "Monitor", description: "Virtual lab environments for security testing", level: 80, category: "Systems", display_order: 14 },
];

const projects = [
  {
    title: "harmoNagar",
    slug: "harmonagar",
    tagline: "Restaurant AI Analytics Platform",
    description:
      "An intelligent restaurant analytics platform leveraging AI for customer insights, inventory management, and predictive analytics. Built with RAG-based recommendation systems and real-time data processing.",
    tech_stack: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Python", "FastAPI", "Docker", "Redis"],
    github_url: "https://github.com/prashantguragain/harmonagar",
    live_url: "https://harmonagar.vercel.app",
    featured: true,
    display_order: 0,
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
    security_features: [
      "JWT-based authentication",
      "Input sanitization and validation",
      "Rate limiting on API endpoints",
      "Encrypted data at rest and in transit",
    ],
  },
  {
    title: "Cyber Security Lab",
    slug: "cyber-lab",
    tagline: "Virtual Security Operations Center",
    description:
      "A comprehensive virtual lab environment for security testing, network analysis, and penetration testing. Features automated scanning, vulnerability assessment, and detailed reporting.",
    tech_stack: ["Python", "Bash", "Docker", "Nmap", "Wireshark", "Metasploit", "Burp Suite"],
    github_url: "https://github.com/prashantguragain/cyber-lab",
    live_url: "",
    featured: false,
    display_order: 1,
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
    security_features: [
      "Isolated lab network environment",
      "Controlled attack surfaces",
      "Monitoring and logging all activities",
    ],
  },
  {
    title: "CyberSentinel Portfolio",
    slug: "portfolio",
    tagline: "SOC-Inspired Developer Portfolio",
    description:
      "An immersive cybersecurity-themed portfolio designed as a Security Operations Center dashboard. Demonstrates modern frontend engineering and security expertise.",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide React"],
    github_url: "https://github.com/prashantguragain/portfolio",
    live_url: "https://prashantguragain.vercel.app",
    featured: true,
    display_order: 2,
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
    security_features: [
      "No external data fetching vulnerabilities",
      "Content Security Policy headers",
      "Accessible and semantic HTML structure",
    ],
  },
  {
    title: "harmoNagar (Hackathon Project)",
    slug: "harmonagar-hackathon",
    tagline: "Municipality Transparency Platform",
    description:
      "A municipality transparency platform with complaint management, public project tracking, RTI support, and AI-powered analysis built during a hackathon.",
    tech_stack: ["Next.js", "Node.js", "PostgreSQL", "Flutter", "Django", "JWT", "Argon2id"],
    github_url: "https://github.com/prashantguragain/harmonagar",
    live_url: "",
    featured: false,
    display_order: 3,
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
    security_features: [
      "JWT-based authentication",
      "Argon2id password hashing",
      "Input validation and sanitization",
      "Secure API endpoints",
    ],
  },
  {
    title: "Smart Health AI Platform",
    slug: "smart-health-ai",
    tagline: "Youth & Rural Healthcare Hackathon",
    description:
      "Built for youth and rural healthcare access. Features AI integration, token-based privacy (no user login required), connecting patients with hospitals, NGOs, and government services.",
    tech_stack: ["Next.js", "Supabase", "AI Integration", "Token-based Privacy"],
    github_url: "https://github.com/prashantguragain/smart-health",
    live_url: "",
    featured: false,
    display_order: 4,
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
    security_features: [
      "Token-based privacy system",
      "No personal data storage",
      "Secure AI integration",
    ],
  },
  {
    title: "Cybersecurity Learning Labs",
    slug: "cyber-learning-labs",
    tagline: "Practical Security Projects Collection",
    description:
      "A collection of practical cybersecurity projects including Kali Linux lab setup, Metasploitable 2 exploitation practice, Nmap network scanning, DNS TXT-record exfiltration exercises, and Cisco Packet Tracer networking labs with VLAN and DHCP configurations.",
    tech_stack: ["Kali Linux", "Metasploitable", "Nmap", "Cisco Packet Tracer", "DNS", "Wireshark"],
    github_url: "https://github.com/prashantguragain/cyber-labs",
    live_url: "",
    featured: false,
    display_order: 5,
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
    security_features: [
      "Isolated lab environments",
      "Ethical hacking guidelines",
      "Controlled testing scenarios",
    ],
  },
];

const achievements = [
  {
    title: "First Hackathon Victory",
    description:
      "Won first hackathon with a cybersecurity-themed project, showcasing threat detection and incident response capabilities.",
    date: "2024-03-15",
    icon: "Trophy",
    category: "Hackathon",
  },
  {
    title: "Google Cybersecurity Certified",
    description:
      "Completed Google Cybersecurity Professional Certification, covering network security, incident response, and security operations.",
    date: "2024-12-01",
    icon: "Shield",
    category: "Certification",
  },
  {
    title: "Meta Frontend Developer",
    description:
      "Earned Meta Frontend Developer certification, demonstrating proficiency in React, UI/UX, and responsive design.",
    date: "2024-08-01",
    icon: "Code2",
    category: "Certification",
  },
  {
    title: "CCNA Networking Basics",
    description:
      "Completed Cisco CCNA networking fundamentals, covering routing, switching, and network security concepts.",
    date: "2024-10-01",
    icon: "Network",
    category: "Certification",
  },
  {
    title: "Built harmoNagar Platform",
    description:
      "Developed an AI-powered restaurant analytics platform using RAG, pgvector, and modern full-stack technologies.",
    date: "2025-01-01",
    icon: "Building2",
    category: "Project",
  },
];

const labs = [
  {
    title: "Nmap Network Enumeration",
    objective:
      "Perform comprehensive network discovery and service enumeration on a target network to identify open ports, running services, and potential vulnerabilities.",
    environment: "VirtualBox lab with Kali Linux attacker machine and Metasploitable 2 target",
    tools: ["Nmap", "Zenmap", "Metasploitable 2"],
    steps: [
      "Initial ping sweep to discover live hosts on the network",
      "SYN scan on all 65535 ports of the target",
      "Service version detection using -sV flag",
      "OS fingerprinting with -O flag",
      "NSE script scan for vulnerability detection",
      "UDP scan for open UDP ports",
    ],
    findings: [
      "Found 23 open TCP ports including HTTP (80), SSH (22), FTP (21)",
      "Discovered vsftpd 2.3.4 vulnerable to backdoor exploit",
      "Identified Apache 2.2.8 with multiple CVEs",
      "MySQL 5.0.51a running with default credentials",
    ],
    mitigation: [
      "Update all services to latest patched versions",
      "Disable unnecessary services and ports",
      "Implement firewall rules to restrict access",
      "Use strong authentication mechanisms",
    ],
    lessons: [
      "Comprehensive scanning reveals attack surface",
      "Version detection is critical for vulnerability assessment",
      "Default credentials remain a major security risk",
    ],
    difficulty: "Intermediate",
    display_order: 0,
  },
  {
    title: "SQL Injection Attack & Defense",
    objective:
      "Exploit SQL injection vulnerabilities in a web application and implement proper defensive measures.",
    environment: "DVWA (Damn Vulnerable Web Application) on localhost",
    tools: ["Burp Suite", "SQLMap", "Browser DevTools"],
    steps: [
      "Identify injectable parameters through manual testing",
      "Determine database fingerprint using error-based injection",
      "Extract table names using UNION-based injection",
      "Automate exploitation with SQLMap",
      "Implement parameterized queries as defense",
    ],
    findings: [
      "User ID parameter vulnerable to blind SQL injection",
      "Extracted 5 database tables including users and credit_cards",
      "Retrieved password hashes for 3 admin accounts",
      "SQLMap confirmed time-based blind injection",
    ],
    mitigation: [
      "Use parameterized queries / prepared statements",
      "Implement input validation and sanitization",
      "Apply principle of least privilege on database accounts",
      "Use WAF for additional protection layer",
    ],
    lessons: [
      "Never trust user input—validate and sanitize everything",
      "Parameterized queries are the most effective defense",
      "Error messages can leak sensitive information",
    ],
    difficulty: "Advanced",
    display_order: 1,
  },
  {
    title: "Web App Testing with Burp Suite",
    objective:
      "Perform comprehensive web application security testing using Burp Suite Professional tools.",
    environment: "Burp Suite Community Edition with vulnerable web application test lab",
    tools: ["Burp Suite", "Firefox", "FoxyProxy"],
    steps: [
      "Configure proxy settings and install Burp CA certificate",
      "Spider the target application to map attack surface",
      "Perform active scan for common vulnerabilities",
      "Use Repeater to manually test parameter manipulation",
      "Intruder for brute force attacks on login form",
    ],
    findings: [
      "XSS vulnerability in search parameter",
      "Weak session tokens predictable through pattern analysis",
      "Directory traversal in file download endpoint",
      "CSRF token validation missing on password change",
    ],
    mitigation: [
      "Implement Content Security Policy headers",
      "Use cryptographically secure random session tokens",
      "Validate file paths and restrict directory access",
      "Implement CSRF tokens on all state-changing operations",
    ],
    lessons: [
      "Burp Suite provides comprehensive web testing capabilities",
      "Automated scanning catches low-hanging fruit",
      "Manual testing essential for business logic flaws",
    ],
    difficulty: "Intermediate",
    display_order: 2,
  },
  {
    title: "Packet Capture & Network Analysis",
    objective:
      "Capture and analyze network traffic to identify protocols, detect anomalies, and understand communication patterns.",
    environment: "VirtualBox lab with Wireshark on Ubuntu and simulated network traffic",
    tools: ["Wireshark", "tcpdump", "Python Scapy"],
    steps: [
      "Configure Wireshark for packet capture on network interface",
      "Apply display filters to isolate specific protocols",
      "Follow TCP streams to reconstruct application data",
      "Analyze DNS queries and responses",
      "Detect ARP spoofing attacks",
    ],
    findings: [
      "Identified unencrypted HTTP traffic containing login credentials",
      "Detected DNS tunneling exfiltration attempts",
      "ARP cache poisoning attempt detected via gratuitous ARP",
      "TLS 1.2 negotiation observed with weak cipher suite",
    ],
    mitigation: [
      "Enforce HTTPS across all services",
      "Implement DNSSEC and DNS monitoring",
      "Use dynamic ARP inspection on switches",
      "Disable weak cipher suites on servers",
    ],
    lessons: [
      "Packet analysis reveals what actually happens on the network",
      "Encryption is essential; plaintext protocols are dangerous",
      "Wireshark filters are powerful for focused analysis",
    ],
    difficulty: "Advanced",
    display_order: 3,
  },
  {
    title: "Linux Privilege Escalation",
    objective:
      "Escalate privileges from a low-privilege user to root on a Linux system through vulnerability exploitation.",
    environment: "HackTheBox machine with Kali Linux attack box",
    tools: ["LinPEAS", "GTFOBins", "Netcat", "Python"],
    steps: [
      "Initial enumeration with LinPEAS script",
      "Identify SUID binary misconfigurations",
      "Exploit writable scripts in cron jobs",
      "Check kernel version for known exploits",
      "Extract password hashes from /etc/shadow",
    ],
    findings: [
      "/usr/bin/python3 has SUID bit set",
      "Cron job running script in world-writable directory",
      "Kernel 4.4.0 vulnerable to CVE-2017-16995",
      "User password hash crackable with John the Ripper",
    ],
    mitigation: [
      "Remove SUID bits from unnecessary binaries",
      "Ensure cron scripts are not writable by non-root users",
      "Keep kernel updated with security patches",
      "Enforce strong password policies",
    ],
    lessons: [
      "Enumeration is the most critical phase of privilege escalation",
      "SUID binaries are common escalation vectors",
      "Automated tools speed up initial reconnaissance",
    ],
    difficulty: "Advanced",
    display_order: 4,
  },
];

const timeline = [
  {
    year: 2022,
    title: "Started Programming Journey",
    description:
      "Began learning Python and web development fundamentals. Built first CLI applications and simple web pages.",
    icon: "Code2",
    display_order: 0,
  },
  {
    year: 2023,
    title: "Started Networking Fundamentals",
    description:
      "Discovered networking and cybersecurity. Began studying TCP/IP, routing, and network protocols. Set up first home lab.",
    icon: "Network",
    display_order: 1,
  },
  {
    year: 2023,
    title: "Joined BSc CSIT Program",
    description:
      "Enrolled in Bachelor of Science in Computer Science and Information Technology. Focused on security and networking courses.",
    icon: "GraduationCap",
    display_order: 2,
  },
  {
    year: 2024,
    title: "First Hackathon Win",
    description:
      "Participated in and won first hackathon with a cybersecurity-themed project. Discovered passion for competitive building.",
    icon: "Trophy",
    display_order: 3,
  },
  {
    year: 2024,
    title: "Cybersecurity Certifications",
    description:
      "Completed Google Cybersecurity Professional Certification. Started CompTIA Security+ preparation and CCNA studies.",
    icon: "Shield",
    display_order: 4,
  },
  {
    year: 2025,
    title: "Built harmoNagar",
    description:
      "Developed harmoNagar, an AI-powered restaurant analytics platform using RAG, pgvector, and modern full-stack technologies.",
    icon: "Building2",
    display_order: 5,
  },
  {
    year: 2025,
    title: "Learning AI Security",
    description:
      "Exploring intersection of AI and cybersecurity. Building RAG systems, studying AI security threats and defensive techniques.",
    icon: "Brain",
    display_order: 6,
  },
  {
    year: 2025,
    title: "Current Goal: SOC Internship",
    description:
      "Actively seeking SOC Analyst internship to apply security knowledge in real-world environments and grow as a security professional.",
    icon: "Target",
    display_order: 7,
  },
];

// ---- Seed helper ----
async function seedTable(table, rows) {
  if (!rows.length) {
    console.log(`- ${table}: nothing to seed`);
    return;
  }
  const { error: delError } = await supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  if (delError) {
    console.error(`- ${table}: delete failed -> ${delError.message}`);
    return;
  }
  const { error } = await supabase.from(table).insert(rows);
  if (error) {
    console.error(`- ${table}: insert failed -> ${error.message}`);
    return;
  }
  console.log(`- ${table}: seeded ${rows.length} rows`);
}

console.log("Seeding content into Supabase...");
await seedTable("certifications", certifications);
await seedTable("blogs", blogs);
await seedTable("skills", skills);
await seedTable("projects", projects);
await seedTable("achievements", achievements);
await seedTable("labs", labs);
await seedTable("timeline", timeline);

// Ensure a default profile exists
const { data: existingProfile } = await supabase
  .from("profiles")
  .select("id")
  .limit(1)
  .maybeSingle();
if (!existingProfile) {
  const { error } = await supabase.from("profiles").insert([
    {
      email: "admin@cybersentinel.com",
      name: "Prashant Guragain",
      title: "Cybersecurity Student & Developer",
      bio: "SOC Enthusiast | Secure Software Developer",
      location: "Nepal",
    },
  ]);
  if (error) console.error(`- profiles: insert failed -> ${error.message}`);
  else console.log("- profiles: default profile created");
} else {
  console.log("- profiles: already exists, skipped");
}

console.log("Done.");
