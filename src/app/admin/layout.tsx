"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Award,
  BadgeCheck as CertificateIcon,
  Code2,
  UserCircle,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronRight,
  Beaker,
  History,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Labs", href: "/admin/labs", icon: Beaker },
  { label: "Achievements", href: "/admin/achievements", icon: Award },
  { label: "Certifications", href: "/admin/certifications", icon: CertificateIcon },
  { label: "Skills", href: "/admin/skills", icon: Code2 },
  { label: "Timeline", href: "/admin/timeline", icon: History },
  { label: "Profile", href: "/admin/profile", icon: UserCircle },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip auth check on login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && !isLoginPage) {
        router.push("/admin/login");
        return;
      }
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-[#00E5FF] animate-pulse" />
          <span className="text-[#94A3B8] font-mono text-sm">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#050816]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0F172A] border-r border-[rgba(0,229,255,0.06)] transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-[rgba(0,229,255,0.06)]">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
                <Shield size={16} className="text-[#00E5FF]" />
              </div>
              <span className="text-white font-semibold text-sm">Admin Panel</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#94A3B8] hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                }`}
              >
                <link.icon size={16} />
                <span className="font-mono text-xs">{link.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[rgba(0,229,255,0.06)]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-[#FF4D6D] hover:bg-[#FF4D6D]/5 transition-all"
          >
            <LogOut size={16} />
            <span className="font-mono text-xs">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#050816]/80 backdrop-blur-xl border-b border-[rgba(0,229,255,0.06)]">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <span className="text-[11px] font-mono text-[#94A3B8]">{user.email}</span>
              <div className="w-7 h-7 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
                <Shield size={12} className="text-[#00E5FF]" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
