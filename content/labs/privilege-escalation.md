---
title: Linux Privilege Escalation
objective: Escalate privileges from a low-privilege user to root on a Linux system through vulnerability exploitation.
environment: HackTheBox machine with Kali Linux attack box
tools:
  - LinPEAS
  - GTFOBins
  - Netcat
  - Python
steps:
  - Initial enumeration with LinPEAS script
  - Identify SUID binary misconfigurations
  - Exploit writable scripts in cron jobs
  - Check kernel version for known exploits
  - Extract password hashes from /etc/shadow
findings:
  - /usr/bin/python3 has SUID bit set
  - Cron job running script in world-writable directory
  - Kernel 4.4.0 vulnerable to CVE-2017-16995
  - User password hash crackable with John the Ripper
mitigation:
  - Remove SUID bits from unnecessary binaries
  - Ensure cron scripts are not writable by non-root users
  - Keep kernel updated with security patches
  - Enforce strong password policies
lessons:
  - Enumeration is the most critical phase of privilege escalation
  - SUID binaries are common escalation vectors
  - Automated tools speed up initial reconnaissance
difficulty: Advanced
---
