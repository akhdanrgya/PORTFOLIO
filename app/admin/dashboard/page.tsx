import { supabaseServer } from "@/lib/supabaseServer";

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

const statCards = (stats: Awaited<ReturnType<typeof getStats>>) => [
  { label: "Total Projects", value: stats.totalProjects, icon: "◈", color: "from-purple-500/20 to-purple-600/10 border-purple-500/30" },
  { label: "Featured Projects", value: stats.featuredProjects, icon: "★", color: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30" },
  { label: "Skills", value: stats.totalSkills, icon: "⚡", color: "from-blue-500/20 to-blue-600/10 border-blue-500/30" },
  { label: "Experience", value: stats.totalExperiences, icon: "◇", color: "from-green-500/20 to-green-600/10 border-green-500/30" },
  { label: "Certifications", value: stats.totalCertifications, icon: "◉", color: "from-pink-500/20 to-pink-600/10 border-pink-500/30" },
];

const quickLinks = [
  { href: "/admin/about", label: "Edit About & Banner", icon: "👤", desc: "Update bio, profile photo, banner" },
  { href: "/admin/projects", label: "Manage Projects", icon: "◈", desc: "Add or edit projects" },
  { href: "/admin/skills", label: "Manage Skills", icon: "⚡", desc: "Add new skill" },
  { href: "/admin/experience", label: "Manage Experience", icon: "◇", desc: "Add work experience" },
  { href: "/admin/certifications", label: "Manage Certifications", icon: "◉", desc: "Add certificate" },
];

export default async function DashboardPage() {
  const stats = await getStats();
  const cards = statCards(stats);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, Akhdan! 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className={`p-5 rounded-2xl bg-gradient-to-br border ${card.color}`}>
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className="text-3xl font-black text-white">{card.value}</div>
            <div className="text-xs text-slate-400 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-bold text-slate-300 mb-4">Quick Actions</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="glass-card p-5 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl group-hover:bg-purple-500/20 transition-all duration-200 shrink-0">
              {link.icon}
            </div>
            <div>
              <p className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">{link.label}</p>
              <p className="text-slate-500 text-xs mt-0.5">{link.desc}</p>
            </div>
            <span className="ml-auto text-slate-600 group-hover:text-purple-400 transition-colors">→</span>
          </a>
        ))}
      </div>

      {/* View portfolio link */}
      <div className="mt-8 p-5 rounded-2xl bg-purple-500/5 border border-purple-500/20 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold">View Live Portfolio</p>
          <p className="text-slate-500 text-sm mt-0.5">Open portfolio in a new tab</p>
        </div>
        <a
          href="/"
          target="_blank"
          className="btn-glow px-5 py-2.5 text-sm"
        >
          <span>Open ↗</span>
        </a>
      </div>
    </div>
  );
}
