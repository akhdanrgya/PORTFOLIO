"use client";
import { useLanguage } from "@/lib/LanguageContext";
import type { Skill } from "@/lib/supabase";

export default function SkillsClient({ skills }: { skills: Skill[] }) {
  const { t } = useLanguage();

  const languages = skills.filter((s) => s.category === "Language");
  const tools = skills.filter((s) => s.category === "Tools" || s.category === "Design");
  const frameworks = skills.filter((s) => s.category === "Framework");
  const backend = skills.filter((s) => s.category === "Backend");
  const database = skills.filter((s) => s.category === "Database");

  return (
    <main className="flex-grow pt-[104px] pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <header className="mb-16 md:mb-24 pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-surface border border-border-default mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-accent">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="font-mono-label text-mono-label text-muted-gray uppercase tracking-wider text-[11px]">{t("skills.technicalArsenal")}</span>
        </div>
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-3">
          {t("skills.title1")}<br />{t("skills.title2")}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          {t("skills.desc")}
        </p>
      </header>

      {/* Bento Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1.5rem]">

        {/* Core Languages (Spans 8 cols) */}
        <section className="bento-card md:col-span-8 bg-charcoal-surface border border-border-default rounded-lg p-8 flex flex-col h-full relative overflow-hidden group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" x2="20" y1="19" y2="19" />
            </svg>
          </div>
          <h2 className="font-headline-md text-headline-md text-off-white mb-8 flex items-center gap-3 relative z-10">
            <span className="text-emerald-accent text-2xl">{"{ }"}</span>
            {t("skills.languages")}
          </h2>
          <div className="flex flex-wrap gap-3 mt-auto relative z-10">
            {languages.length > 0 ? (
              languages.map((skill) => (
                <span key={skill.id} className="skill-tag">{skill.name}</span>
              ))
            ) : (
              <>
                <span className="skill-tag">JavaScript (ES6+)</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">HTML5/CSS3</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Go</span>
              </>
            )}
          </div>
        </section>

        {/* Tools & Workflow (Spans 4 cols) */}
        <section className="bento-card md:col-span-4 bg-charcoal-surface border border-border-default rounded-lg p-8 flex flex-col h-full relative group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300">
          <h2 className="font-headline-sm text-headline-sm text-off-white mb-6 flex items-center gap-2">
            <span className="text-muted-gray text-xl">⚙</span>
            {t("skills.tools")}
          </h2>
          <ul className="space-y-4 font-body-base text-body-base text-on-surface-variant">
            {tools.length > 0 ? (
              tools.map((skill) => (
                <li key={skill.id} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> {skill.name}
                </li>
              ))
            ) : (
              <>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> Git & GitHub</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> Docker</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> Webpack / Vite</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> Figma</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-emerald-accent rounded-full"></span> VS Code</li>
              </>
            )}
          </ul>
        </section>

        {/* Frontend Frameworks (Spans 6 cols) */}
        <section className="bento-card md:col-span-6 bg-charcoal-surface border border-border-default rounded-lg p-8 flex flex-col hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between mb-8 border-b border-border-default pb-4">
            <h2 className="font-headline-md text-headline-md text-off-white flex items-center gap-3">
              <span className="text-blue-400 text-2xl">◇</span>
              {t("skills.frontend")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono-label text-mono-label text-muted-gray mb-3 uppercase tracking-wider text-xs">{t("skills.frameworks")}</h3>
              <div className="flex flex-col gap-2">
                {frameworks.length > 0 ? (
                  frameworks.slice(0, Math.ceil(frameworks.length / 2) + 1).map((skill) => (
                    <span key={skill.id} className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">{skill.name}</span>
                  ))
                ) : (
                  <>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">React.js</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Next.js</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Vue.js</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-mono-label text-mono-label text-muted-gray mb-3 uppercase tracking-wider text-xs">{t("skills.styling")}</h3>
              <div className="flex flex-col gap-2">
                {frameworks.length > 0 ? (
                  frameworks.slice(Math.ceil(frameworks.length / 2) + 1).map((skill) => (
                    <span key={skill.id} className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">{skill.name}</span>
                  ))
                ) : (
                  <>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Tailwind CSS</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Sass/SCSS</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Styled Components</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Backend & Databases (Spans 6 cols) */}
        <section className="bento-card md:col-span-6 bg-charcoal-surface border border-border-default rounded-lg p-8 flex flex-col hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300">
          <div className="flex items-center justify-between mb-8 border-b border-border-default pb-4">
            <h2 className="font-headline-md text-headline-md text-off-white flex items-center gap-3">
              <span className="text-emerald-accent text-2xl">⬡</span>
              {t("skills.backendDb")}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-mono-label text-mono-label text-muted-gray mb-3 uppercase tracking-wider text-xs">{t("skills.backend")}</h3>
              <div className="flex flex-col gap-2">
                {backend.length > 0 ? (
                  backend.map((skill) => (
                    <span key={skill.id} className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">{skill.name}</span>
                  ))
                ) : (
                  <>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Node.js</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Express</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Django</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">REST APIs</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-mono-label text-mono-label text-muted-gray mb-3 uppercase tracking-wider text-xs">{t("skills.database")}</h3>
              <div className="flex flex-col gap-2">
                {database.length > 0 ? (
                  database.map((skill) => (
                    <span key={skill.id} className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">{skill.name}</span>
                  ))
                ) : (
                  <>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">PostgreSQL</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">MongoDB</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Redis</span>
                    <span className="font-body-base text-body-base text-on-surface hover:text-emerald-accent transition-colors cursor-default">Supabase</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
