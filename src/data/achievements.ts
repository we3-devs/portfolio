export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
  category: string;
}

export const achievements: Achievement[] = [
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
    date: "2024-12",
    icon: "Shield",
    category: "Certification",
  },
  {
    title: "Meta Frontend Developer",
    description:
      "Earned Meta Frontend Developer certification, demonstrating proficiency in React, UI/UX, and responsive design.",
    date: "2024-08",
    icon: "Code2",
    category: "Certification",
  },
  {
    title: "CCNA Networking Basics",
    description:
      "Completed Cisco CCNA networking fundamentals, covering routing, switching, and network security concepts.",
    date: "2024-10",
    icon: "Network",
    category: "Certification",
  },
  {
    title: "Built harmoNagar Platform",
    description:
      "Developed an AI-powered restaurant analytics platform using RAG, pgvector, and modern full-stack technologies.",
    date: "2025-01",
    icon: "Building2",
    category: "Project",
  },
];
