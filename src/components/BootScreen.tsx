"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSteps = [
  { text: "Initializing Security Engine...", delay: 400 },
  { text: "Loading Threat Intelligence...", delay: 500 },
  { text: "Connecting Secure Database...", delay: 400 },
  { text: "Authenticating Visitor...", delay: 500 },
  { text: "Access Granted", delay: 300 },
  { text: "Launching Dashboard...", delay: 300 },
] as const;

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const skip = useCallback(() => {
    setCurrentStep(bootSteps.length);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentStep >= bootSteps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(
      () => setCurrentStep((prev) => prev + 1),
      bootSteps[currentStep].delay
    );
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <AnimatePresence>
      {currentStep <= bootSteps.length && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* Terminal window frame */}
          <div className="w-full max-w-md mx-auto px-6">
            <div className="border border-[rgba(0,229,255,0.2)] rounded-lg overflow-hidden bg-[#0F172A]/80 backdrop-blur-sm">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[rgba(0,229,255,0.1)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF4D6D]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFC857]" />
                  <div className="w-3 h-3 rounded-full bg-[#00FF88]" />
                </div>
                <span className="text-xs text-[#94A3B8] ml-2 font-mono">
                  cyberSentinel.exe
                </span>
              </div>

              {/* Boot log */}
              <div className="p-4 font-mono text-sm space-y-3 min-h-[200px]">
                {bootSteps.slice(0, currentStep + 1).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-start gap-2 ${
                      step.text === "Access Granted"
                        ? "text-[#00FF88]"
                        : step.text === "Launching Dashboard..."
                        ? "text-[#00E5FF]"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    <span className="text-[#00E5FF] shrink-0">[</span>
                    <span className="flex-1">{step.text}</span>
                    <span className="text-[#00E5FF] shrink-0">]</span>
                    {index === currentStep && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-[#00E5FF]"
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}

                {currentStep >= bootSteps.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#00FF88]"
                  >
                    <span className="text-[#00E5FF]">[</span>
                    System Ready. Welcome, Visitor.
                    <span className="text-[#00E5FF]">]</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Loading bar */}
            <div className="mt-4 h-1 bg-[#0F172A] rounded-full overflow-hidden border border-[rgba(0,229,255,0.1)]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${Math.min(
                    (currentStep / bootSteps.length) * 100,
                    100
                  )}%`,
                }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00FF88] rounded-full"
              />
            </div>
          </div>

          {/* Skip button */}
          {showSkip && currentStep < bootSteps.length && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={skip}
              className="mt-8 text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors font-mono"
            >
              Press <span className="text-[#00E5FF]">Esc</span> to skip...
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
