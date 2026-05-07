import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Skill } from "@/lib/supabase";

const defaultSkills: Skill[] = [
  { id: "1", name: "TypeScript", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language", order_index: 1, created_at: "" },
  { id: "2", name: "Next.js", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Framework", order_index: 2, created_at: "" },
  { id: "3", name: "React", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Framework", order_index: 3, created_at: "" },
  { id: "4", name: "Node.js", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", order_index: 4, created_at: "" },
  { id: "5", name: "Python", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language", order_index: 5, created_at: "" },
  { id: "6", name: "PostgreSQL", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", order_index: 6, created_at: "" },
  { id: "7", name: "Git", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools", order_index: 7, created_at: "" },
  { id: "8", name: "Figma", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Design", order_index: 8, created_at: "" },
  { id: "9", name: "Tailwind CSS", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Framework", order_index: 9, created_at: "" },
  { id: "10", name: "JavaScript", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language", order_index: 10, created_at: "" },
  { id: "11", name: "HTML5", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Language", order_index: 11, created_at: "" },
  { id: "12", name: "CSS3", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Language", order_index: 12, created_at: "" },
];

const categoryColors: Record<string, string> = {
  Language: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300",
  Framework: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300",
  Backend: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-300",
  Database: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300",
  Tools: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300",
  Design: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300",
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const categories = [...new Set(displaySkills.map((s) => s.category).filter(Boolean))] as string[];

  return (
    <section id="skills" className="w-full py-32 lg:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl relative">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <div className="section-divider mx-auto" />
        </AnimatedSection>

        {/* By category */}
        {categories.length > 0 ? (
          <div className="flex flex-col gap-10 sm:gap-12">
            {categories.map((cat) => (
              <AnimatedSection key={cat} className="flex flex-col items-center gap-6">
                <div className="mb-8 sm:mb-10 flex items-center justify-center">
                  <span className={`tag bg-gradient-to-r ${categoryColors[cat] ?? "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300"}`}>
                    {cat}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 stagger-children animated w-full max-w-5xl">
                  {displaySkills
                    .filter((s) => s.category === cat)
                    .map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection stagger className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
              {displaySkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="glass-card w-[105px] sm:w-[120px] p-4 flex flex-col items-center justify-center gap-3 group cursor-default">
      <div className="w-10 h-10 relative">
        {skill.icon_url ? (
          <Image
            src={skill.icon_url}
            alt={skill.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-sm">
            {skill.name.slice(0, 2)}
          </div>
        )}
      </div>
      <span className="text-xs text-slate-400 text-center font-medium group-hover:text-slate-200 transition-colors">
        {skill.name}
      </span>
    </div>
  );
}
