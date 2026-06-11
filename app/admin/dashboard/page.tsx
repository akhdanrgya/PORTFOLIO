import { supabaseServer } from "@/lib/supabaseServer";
import Link from "next/link";

async function getStats() {
  const [projects, skills, experiences, certifications] = await Promise.all([
    supabaseServer.from("projects").select("id, featured"),
    supabaseServer.from("skills").select("id"),
    supabaseServer.from("experience").select("id"),
    supabaseServer.from("certifications").select("id"),
  ]);

  return {
    totalProjects: projects.data?.length ?? 0,
    featuredProjects: projects.data?.filter((p) => p.featured).length ?? 0,
    totalSkills: skills.data?.length ?? 0,
    totalExperiences: experiences.data?.length ?? 0,
    totalCertifications: certifications.data?.length ?? 0,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      label: "Total Projects",
      value: stats.totalProjects,
      color: "from-purple-500/15 to-purple-700/5",
      border: "border-purple-500/25",
      valueColor: "text-purple-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: "Featured",
      value: stats.featuredProjects,
      color: "from-yellow-500/15 to-yellow-700/5",
      border: "border-yellow-500/25",
      valueColor: "text-yellow-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      label: "Skills",
      value: stats.totalSkills,
      color: "from-blue-500/15 to-blue-700/5",
      border: "border-blue-500/25",
      valueColor: "text-blue-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      label: "Experience",
      value: stats.totalExperiences,
      color: "from-green-500/15 to-green-700/5",
      border: "border-green-500/25",
      valueColor: "text-green-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
      ),
    },
    {
      label: "Certificates",
      value: stats.totalCertifications,
      color: "from-pink-500/15 to-pink-700/5",
      border: "border-pink-500/25",
      valueColor: "text-pink-300",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      ),
    },
  ];

  const quickLinks = [
    { href: "/admin/about", label: "Edit About & Banner", desc: "Update bio, profile photo, banner", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    )},
    { href: "/admin/projects", label: "Manage Projects", desc: "Add, edit, or delete projects", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    )},
    { href: "/admin/skills", label: "Manage Skills", desc: "Add or remove skills", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    )},
    { href: "/admin/experience", label: "Manage Experience", desc: "Add work experience entries", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    )},
    { href: "/admin/certifications", label: "Manage Certifications", desc: "Add certificates & achievements", icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    )},
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, Akhdan! 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card) => (
          <div key={card.label} className={`p-5 sm:p-6 rounded-2xl bg-gradient-to-br border shadow-sm ${card.color} ${card.border}`}>
            <div className={`mb-4 ${card.valueColor}`}>{card.icon}</div>
            <div className={`text-3xl font-black ${card.valueColor}`}>{card.value}</div>
            <div className="text-sm text-slate-500 mt-1.5 font-medium leading-tight">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group list-item flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-emerald-accent group-hover:bg-emerald-accent/20 group-hover:border-emerald-accent/40 transition-all duration-300 shrink-0">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-200 font-semibold text-sm sm:text-base group-hover:text-white transition-colors leading-tight">{link.label}</p>
                <p className="text-slate-500 text-xs mt-1 truncate">{link.desc}</p>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-700 group-hover:text-emerald-accent transition-colors shrink-0">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* View portfolio banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-2xl border border-emerald-accent/20" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.06), rgba(5,150,105,0.03))" }}>
        <div>
          <p className="text-white font-bold text-lg">View Live Portfolio</p>
          <p className="text-slate-500 text-sm mt-1">Open your portfolio in a new tab to see your changes</p>
        </div>
        <a href="/" target="_blank" className="btn-glow px-6 py-3 text-sm shrink-0 w-full sm:w-auto text-center">
          <span className="flex items-center justify-center gap-2">
            Open Portfolio
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
