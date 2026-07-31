"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 mb-4">
            <Shield size={32} className="text-[#00E5FF]" />
          </div>
          <h1 className="text-2xl font-bold text-white font-mono">Admin Access</h1>
          <p className="text-sm text-[#94A3B8] font-mono mt-1">CyberSentinel Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-[#0F172A] border border-[rgba(0,229,255,0.08)] rounded-lg p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-[#FF4D6D]/10 border border-[#FF4D6D]/20 rounded-lg text-sm text-[#FF4D6D] font-mono">
              <AlertTriangle size={14} />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00E5FF]/30 font-mono"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 pr-10 text-sm bg-[#050816] border border-[rgba(0,229,255,0.08)] rounded-lg text-white placeholder-[#94A3B8]/50 focus:outline-none focus:border-[#00E5FF]/30 font-mono"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#00E5FF]/10 border border-[#00E5FF]/30 rounded-lg text-[#00E5FF] font-mono text-sm hover:bg-[#00E5FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 text-[10px] font-mono text-[#94A3B8]/40">
          Secure Admin Access · CyberSentinel Portfolio
        </p>
      </div>
    </div>
  );
}
