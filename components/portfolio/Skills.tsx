"use client";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Skill } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

const defaultSkills: Skill[] = [
  // Languages
  { id: "1", name: "Java", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Language", order_index: 1, created_at: "" },
  { id: "2", name: "JavaScript", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language", order_index: 2, created_at: "" },
  { id: "3", name: "TypeScript", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language", order_index: 3, created_at: "" },
  { id: "4", name: "Python", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language", order_index: 4, created_at: "" },
  { id: "5", name: "C", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", category: "Language", order_index: 5, created_at: "" },
  { id: "6", name: "C++", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Language", order_index: 6, created_at: "" },
  { id: "7", name: "C#", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", category: "Language", order_index: 7, created_at: "" },
  { id: "8", name: "Golang", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Language", order_index: 8, created_at: "" },
  { id: "9", name: "PHP", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language", order_index: 9, created_at: "" },

  // Frameworks & Backend
  { id: "10", name: "React", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Framework", order_index: 10, created_at: "" },
  { id: "11", name: "React Native", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Framework", order_index: 11, created_at: "" },
  { id: "12", name: "Expo", icon_url: "https://cdn.simpleicons.org/expo/white", category: "Framework", order_index: 12, created_at: "" },
  { id: "13", name: "Next.js", icon_url: "https://cdn.simpleicons.org/nextdotjs/white", category: "Framework", order_index: 13, created_at: "" },
  { id: "14", name: "Vue.js", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Framework", order_index: 14, created_at: "" },
  { id: "15", name: "Laravel", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", category: "Framework", order_index: 15, created_at: "" },
  { id: "16", name: "Tailwind CSS", icon_url: "https://cdn.simpleicons.org/tailwindcss", category: "Framework", order_index: 16, created_at: "" },
  { id: "17", name: "Node.js", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend", order_index: 17, created_at: "" },
  { id: "18", name: "Express", icon_url: "https://cdn.simpleicons.org/express/white", category: "Backend", order_index: 18, created_at: "" },
  { id: "19", name: "Flask", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend", order_index: 19, created_at: "" },
  { id: "20", name: "WordPress", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", category: "Framework", order_index: 20, created_at: "" },

  // Databases & BaaS
  { id: "21", name: "PostgreSQL", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database", order_index: 21, created_at: "" },
  { id: "22", name: "MySQL", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database", order_index: 22, created_at: "" },
  { id: "23", name: "MongoDB", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database", order_index: 23, created_at: "" },
  { id: "24", name: "Firebase", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Backend", order_index: 24, created_at: "" },
  { id: "25", name: "Supabase", icon_url: "https://cdn.simpleicons.org/supabase", category: "Backend", order_index: 25, created_at: "" },

  // Tools & Others
  { id: "26", name: "Git", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "Tools", order_index: 26, created_at: "" },
  { id: "27", name: "GitHub", icon_url: "https://cdn.simpleicons.org/github/white", category: "Tools", order_index: 27, created_at: "" },
  { id: "28", name: "Docker", icon_url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools", order_index: 28, created_at: "" },
  { id: "29", name: "Postman", icon_url: "https://cdn.simpleicons.org/postman", category: "Tools", order_index: 29, created_at: "" },
  { id: "30", name: "Prisma", icon_url: "https://cdn.simpleicons.org/prisma/white", category: "Tools", order_index: 30, created_at: "" },
  { id: "31", name: "RabbitMQ", icon_url: "https://cdn.simpleicons.org/rabbitmq", category: "Backend", order_index: 31, created_at: "" },
  { id: "32", name: "Elementor", icon_url: "https://cdn.simpleicons.org/elementor", category: "Tools", order_index: 32, created_at: "" },
  { id: "33", name: "Midtrans", icon_url: "", category: "Tools", order_index: 33, created_at: "" },
  { id: "34", name: "Whalesync", icon_url: "", category: "Tools", order_index: 34, created_at: "" },
  { id: "35", name: "Hostinger", icon_url: "https://cdn.simpleicons.org/hostinger", category: "Tools", order_index: 35, created_at: "" },
  { id: "36", name: "Microsoft 365", icon_url: "", category: "Tools", order_index: 36, created_at: "" },
  { id: "37", name: "Gather", icon_url: "", category: "Tools", order_index: 37, created_at: "" },
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
  const { t } = useLanguage();
  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const categories = [...new Set(displaySkills.map((s) => s.category).filter(Boolean))] as string[];

  return (
    <section id="skills" className="w-full py-16 sm:py-24 lg:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex justify-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl relative">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">{t("skills.subtitle")}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-2">
            {t("skills.title1")}<span className="gradient-text">{t("skills.title2")}</span>
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
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 stagger-children animated w-full max-w-5xl">
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
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full max-w-5xl">
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
    <div className="glass-card w-[115px] sm:w-[130px] p-5 sm:p-6 flex flex-col items-center justify-center gap-4 group cursor-default">
      <div className="w-10 h-10 relative">
        {skill.icon_url ? (
          <Image
            src={skill.icon_url}
            alt={skill.name}
            fill
            unoptimized
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
