"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface Command {
  command: string;
  output: string;
}

const commands: Record<string, string> = {
  help: `Available commands:
  about      - About me
  projects   - View projects
  skills     - Security modules
  labs       - Cyber lab reports
  certs      - Certifications
  timeline   - My journey
  resume     - Download resume
  github     - Open GitHub
  linkedin   - Open LinkedIn
  contact    - Contact info
  clear      - Clear terminal
  history    - Command history
  whoami     - Who are you?`,
  about: "> Cybersecurity student. Secure software developer. SOC enthusiast.\n> Currently learning offensive & defensive security, AI security, and building secure systems.",
  whoami: "> prashanta Guragain — CyberSentinel Operator\n> Role: Cybersecurity Student & Secure Software Developer\n> Mission: Become a Security Analyst protecting digital infrastructure.",
  projects: "> Featured projects:\n  • harmoNagar - Restaurant AI Analytics Platform\n  • Cyber Security Lab - Virtual SOC Environment\n  • CyberSentinel Portfolio - SOC-Inspired Portfolio\n> Type 'help' for more commands.",
  skills: "> Security Modules Loaded:\n  • Network Security (85%)\n  • Linux (88%)\n  • Python (90%)\n  • TypeScript (88%)\n  • Next.js (85%)\n  • Node.js (82%)\n  • Burp Suite (72%)\n  • Nmap (78%)\n> Type 'help' for more commands.",
  labs: "> Cyber Lab Reports:\n  • Nmap Enumeration\n  • SQL Injection\n  • Burp Suite Testing\n  • Packet Capture Analysis\n  • Privilege Escalation\n> Type 'help' for more commands.",
  certs: "> Certifications:\n  ✓ Google Cybersecurity Professional\n  ○ CompTIA Security+ (In Progress)\n  ✓ Meta Frontend Developer\n  ✓ CCNA (Networking Basics)\n> Type 'help' for more commands.",
  timeline: "> Journey:\n  2022 - Started Programming\n  2023 - Networking & BSc CSIT\n  2024 - Hackathons & Certifications\n  2025 - Building & Learning AI Security\n> Type 'help' for more commands.",
  resume: "> Opening resume download... (coming soon)",
  github: "> Opening GitHub profile... https://github.com/prashantaguragain",
  linkedin: "> Opening LinkedIn profile... https://linkedin.com/in/prashantaguragain",
  contact: "> Contact channels:\n  • Email: prashanta@example.com\n  • GitHub: github.com/prashantaguragain\n  • LinkedIn: linkedin.com/in/prashantaguragain",
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Command[]>([
    { command: "", output: 'Welcome to CyberSentinel Terminal. Type "help" for available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[trimmed] || `Unknown command: ${trimmed}. Type "help" for available commands.`;
    setHistory((prev) => [...prev, { command: trimmed, output }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setSuggestions([]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Autocomplete suggestions
    if (value.length > 0) {
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(value.toLowerCase())
      );
      setSuggestions(matches.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-[70] ${
            isMinimized ? "bottom-4 right-4" : "bottom-4 right-4 w-[500px]"
          }`}
        >
          <div
            className={`bg-[#0A0E1A] border border-[rgba(0,229,255,0.15)] rounded-lg overflow-hidden shadow-2xl shadow-[#00E5FF]/5 ${
              isMinimized ? "w-64" : "h-[400px]"
            }`}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-[rgba(0,229,255,0.1)]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-3 h-3 rounded-full bg-[#FFC857] hover:bg-[#FFD700] transition-colors"
                  />
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#FF4D6D] hover:bg-[#FF6B81] transition-colors"
                  />
                </div>
                <span className="text-xs text-[#94A3B8] font-mono ml-2">
                  CyberSentinel Terminal
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {!isMinimized && (
              <>
                {/* Terminal output */}
                <div
                  ref={terminalRef}
                  className="p-4 h-[300px] overflow-y-auto font-mono text-xs space-y-1.5 custom-scrollbar"
                >
                  {history.map((entry, index) => (
                    <div key={index}>
                      {entry.command && (
                        <div className="flex items-start gap-2">
                          <span className="text-[#00E5FF] shrink-0">$</span>
                          <span className="text-white">{entry.command}</span>
                        </div>
                      )}
                      <div className="text-[#94A3B8] whitespace-pre-line pl-4">
                        {entry.output}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input area */}
                <div className="px-4 py-2 border-t border-[rgba(0,229,255,0.1)] bg-[#0F172A]/50">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00E5FF] font-mono text-sm">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent text-white font-mono text-sm outline-none placeholder-[#94A3B8]/30"
                      placeholder="Type a command..."
                      aria-label="Terminal input"
                    />
                  </div>
                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setInput(s);
                            setSuggestions([]);
                            inputRef.current?.focus();
                          }}
                          className="text-[10px] font-mono px-1.5 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 rounded hover:bg-[#00E5FF]/20 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
