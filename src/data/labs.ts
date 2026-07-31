import { Lab } from "@/types";

export const labs: Lab[] = [
  {
    id: "nmap-enumeration",
    title: "Nmap Network Enumeration",
    objective:
      "Perform comprehensive network discovery and service enumeration on a target network to identify open ports, running services, and potential vulnerabilities.",
    environment:
      "VirtualBox lab with Kali Linux attacker machine and Metasploitable 2 target",
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
  },
  {
    id: "sql-injection",
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
  },
  {
    id: "burp-suite",
    title: "Web App Testing with Burp Suite",
    objective:
      "Perform comprehensive web application security testing using Burp Suite Professional tools.",
    environment:
      "Burp Suite Community Edition with vulnerable web application test lab",
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
  },
  {
    id: "packet-capture",
    title: "Packet Capture & Network Analysis",
    objective:
      "Capture and analyze network traffic to identify protocols, detect anomalies, and understand communication patterns.",
    environment:
      "VirtualBox lab with Wireshark on Ubuntu and simulated network traffic",
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
  },
  {
    id: "privilege-escalation",
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
  },
];
