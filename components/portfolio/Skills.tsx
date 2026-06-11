"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Skill } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

const defaultSkills: Skill[] = [
  // Languages
  { id: "1", name: "Java", icon_url: null, category: "Language", order_index: 1, created_at: "" },
  { id: "2", name: "JavaScript", icon_url: null, category: "Language", order_index: 2, created_at: "" },
  { id: "3", name: "TypeScript", icon_url: null, category: "Language", order_index: 3, created_at: "" },
  { id: "4", name: "Python", icon_url: null, category: "Language", order_index: 4, created_at: "" },
  { id: "5", name: "C", icon_url: null, category: "Language", order_index: 5, created_at: "" },
  { id: "6", name: "C++", icon_url: null, category: "Language", order_index: 6, created_at: "" },
  { id: "7", name: "C#", icon_url: null, category: "Language", order_index: 7, created_at: "" },
  { id: "8", name: "Golang", icon_url: null, category: "Language", order_index: 8, created_at: "" },
  { id: "9", name: "PHP", icon_url: null, category: "Language", order_index: 9, created_at: "" },
  // Frameworks
  { id: "10", name: "React", icon_url: null, category: "Framework", order_index: 10, created_at: "" },
  { id: "11", name: "React Native", icon_url: null, category: "Framework", order_index: 11, created_at: "" },
  { id: "12", name: "Expo", icon_url: null, category: "Framework", order_index: 12, created_at: "" },
  { id: "13", name: "Next.js", icon_url: null, category: "Framework", order_index: 13, created_at: "" },
  { id: "14", name: "Vue.js", icon_url: null, category: "Framework", order_index: 14, created_at: "" },
  { id: "15", name: "Laravel", icon_url: null, category: "Framework", order_index: 15, created_at: "" },
  { id: "16", name: "Tailwind CSS", icon_url: null, category: "Framework", order_index: 16, created_at: "" },
  // Backend
  { id: "17", name: "Node.js", icon_url: null, category: "Backend", order_index: 17, created_at: "" },
  { id: "18", name: "Express", icon_url: null, category: "Backend", order_index: 18, created_at: "" },
  { id: "19", name: "Flask", icon_url: null, category: "Backend", order_index: 19, created_at: "" },
  { id: "24", name: "Firebase", icon_url: null, category: "Backend", order_index: 24, created_at: "" },
  { id: "25", name: "Supabase", icon_url: null, category: "Backend", order_index: 25, created_at: "" },
  // Databases
  { id: "21", name: "PostgreSQL", icon_url: null, category: "Database", order_index: 21, created_at: "" },
  { id: "22", name: "MySQL", icon_url: null, category: "Database", order_index: 22, created_at: "" },
  { id: "23", name: "MongoDB", icon_url: null, category: "Database", order_index: 23, created_at: "" },
];

const categoryIcons: Record<string, string> = {
  Language: "{ }",
  Framework: "◇",
  Backend: "⬡",
  Database: "◉",
  Tools: "⚙",
  Design: "◆",
};

export default function Skills({ skills }: { skills: Skill[] }) {
  const { t } = useLanguage();
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const categories = [...new Set(displaySkills.map((s) => s.category).filter(Boolean))] as string[];

  // Group categories for layout: full-width for first two, then 2-col grid
  const fullWidthCats = categories.slice(0, 2);
  const gridCats = categories.slice(2);

  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
      {/* Section header */}
      <AnimatedSection className="text-center mb-16">
        <h2 className="section-label mb-4">Tech Stack</h2>
        <p className="text-headline-md text-on-surface">
          Skills & <span className="text-emerald-accent">Technologies</span>
        </p>
      </AnimatedSection>

      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Full-width category cards */}
        {fullWidthCats.map((cat) => (
          <AnimatedSection key={cat}>
            <div className="bento-card backdrop-blur-md bg-charcoal-surface/80 border-white/5 p-8">
              <h3 className="font-mono-label text-on-surface-variant uppercase mb-6 flex items-center gap-2">
                <span className="text-sm text-emerald-accent">{categoryIcons[cat] || "◈"}</span>
                {cat}
              </h3>
              <div className="flex flex-wrap gap-3">
                {displaySkills
                  .filter((s) => s.category === cat)
                  .map((skill) => (
                    <span key={skill.id} className="skill-tag">{skill.name}</span>
                  ))}
              </div>
            </div>
          </AnimatedSection>
        ))}

        {/* 2-column grid for remaining categories */}
        {gridCats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gridCats.map((cat) => (
              <AnimatedSection key={cat}>
                <div className="bento-card backdrop-blur-md bg-charcoal-surface/80 border-white/5 p-8 h-full">
                  <h3 className="font-mono-label text-on-surface-variant uppercase mb-6 flex items-center gap-2">
                    <span className="text-sm text-emerald-accent">{categoryIcons[cat] || "◈"}</span>
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {displaySkills
                      .filter((s) => s.category === cat)
                      .map((skill) => (
                        <span key={skill.id} className="skill-tag">{skill.name}</span>
                      ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
