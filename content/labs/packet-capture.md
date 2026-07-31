---
title: Packet Capture & Network Analysis
objective: Capture and analyze network traffic to identify protocols, detect anomalies, and understand communication patterns.
environment: VirtualBox lab with Wireshark on Ubuntu and simulated network traffic
tools:
  - Wireshark
  - tcpdump
  - Python Scapy
steps:
  - Configure Wireshark for packet capture on network interface
  - Apply display filters to isolate specific protocols
  - Follow TCP streams to reconstruct application data
  - Analyze DNS queries and responses
  - Detect ARP spoofing attacks
findings:
  - Identified unencrypted HTTP traffic containing login credentials
  - Detected DNS tunneling exfiltration attempts
  - ARP cache poisoning attempt detected via gratuitous ARP
  - TLS 1.2 negotiation observed with weak cipher suite
mitigation:
  - Enforce HTTPS across all services
  - Implement DNSSEC and DNS monitoring
  - Use dynamic ARP inspection on switches
  - Disable weak cipher suites on servers
lessons:
  - Packet analysis reveals what actually happens on the network
  - Encryption is essential; plaintext protocols are dangerous
  - Wireshark filters are powerful for focused analysis
difficulty: Advanced
---
