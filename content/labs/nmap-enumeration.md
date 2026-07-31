---
title: Nmap Network Enumeration
objective: Perform comprehensive network discovery and service enumeration on a target network to identify open ports, running services, and potential vulnerabilities.
environment: VirtualBox lab with Kali Linux attacker machine and Metasploitable 2 target
tools:
  - Nmap
  - Zenmap
  - Metasploitable 2
steps:
  - Initial ping sweep to discover live hosts on the network
  - SYN scan on all 65535 ports of the target
  - Service version detection using -sV flag
  - OS fingerprinting with -O flag
  - NSE script scan for vulnerability detection
  - UDP scan for open UDP ports
findings:
  - Found 23 open TCP ports including HTTP (80), SSH (22), FTP (21)
  - Discovered vsftpd 2.3.4 vulnerable to backdoor exploit
  - Identified Apache 2.2.8 with multiple CVEs
  - MySQL 5.0.51a running with default credentials
mitigation:
  - Update all services to latest patched versions
  - Disable unnecessary services and ports
  - Implement firewall rules to restrict access
  - Use strong authentication mechanisms
lessons:
  - Comprehensive scanning reveals attack surface
  - Version detection is critical for vulnerability assessment
  - Default credentials remain a major security risk
difficulty: Intermediate
---
