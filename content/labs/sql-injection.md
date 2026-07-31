---
title: SQL Injection Attack & Defense
objective: Exploit SQL injection vulnerabilities in a web application and implement proper defensive measures.
environment: DVWA (Damn Vulnerable Web Application) on localhost
tools:
  - Burp Suite
  - SQLMap
  - Browser DevTools
steps:
  - Identify injectable parameters through manual testing
  - Determine database fingerprint using error-based injection
  - Extract table names using UNION-based injection
  - Automate exploitation with SQLMap
  - Implement parameterized queries as defense
findings:
  - User ID parameter vulnerable to blind SQL injection
  - Extracted 5 database tables including users and credit_cards
  - Retrieved password hashes for 3 admin accounts
  - SQLMap confirmed time-based blind injection
mitigation:
  - Use parameterized queries / prepared statements
  - Implement input validation and sanitization
  - Apply principle of least privilege on database accounts
  - Use WAF for additional protection layer
lessons:
  - Never trust user input—validate and sanitize everything
  - Parameterized queries are the most effective defense
  - Error messages can leak sensitive information
difficulty: Advanced
---
