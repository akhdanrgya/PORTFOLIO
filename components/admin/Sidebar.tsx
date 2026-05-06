"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "@/components/ui/Toast";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/admin/about", label: "About & Banner", icon: "👤" },
  { href: "/admin/projects", label: "Projects", icon: "◈" },
  { href: "/admin/skills", label: "Skills", icon: "⚡" },
  { href: "/admin/experience", label: "Experience", icon: "◇" },
  { href: "/admin/certifications", label: "Certifications", icon: "◉" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast("Logged out successfully", "success");
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-dark-200 border-r border-purple-500/20 shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-purple-500/20">
        <Link href="/" target="_blank" className="block">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-glow">
              AA
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Akhdan</p>
              <p className="text-slate-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-purple-500/20">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200 mb-1"
        >
          <span>↗</span> View Portfolio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <span>⇠</span> Logout
        </button>
      </div>
    </aside>
  );
}
