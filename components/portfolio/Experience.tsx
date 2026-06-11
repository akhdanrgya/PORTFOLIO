"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import type { Experience } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  const { locale, t } = useLanguage();

  function formatDate(dateStr: string | null) {
    if (!dateStr) return t("experience.present");
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "short", year: "numeric" });
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="max-w-5xl mx-auto px-4 sm:px-8 py-32">
      <AnimatedSection className="text-center mb-16">
        <h2 className="section-label mb-4">{t("experience.subtitle")}</h2>
        <p className="text-headline-md text-on-surface">
          {t("experience.title1")}<span className="text-emerald-accent">{t("experience.title2")}</span>
        </p>
      </AnimatedSection>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-accent via-emerald-accent/50 to-transparent hidden md:block" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 100}>
              <div className="flex gap-6 items-start">
                {/* Timeline dot */}
                <div className="hidden md:flex shrink-0 w-16 justify-center pt-5">
                  <div className="w-4 h-4 rounded-full bg-emerald-accent border-2 border-emerald-accent/60 shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                </div>

                {/* Card */}
                <div className="flex-1 bento-card p-8 lg:p-10">
                  <div className="flex items-start gap-4">
                    {/* Company logo */}
                    <div className="shrink-0">
                      {exp.logo_url ? (
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border-default">
                          <Image src={exp.logo_url} alt={exp.company} fill className="object-contain p-1" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-emerald-accent font-bold text-sm font-display">
                          {exp.company.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-headline-sm text-on-surface">{exp.role}</h3>
                          <p className="text-emerald-accent font-medium text-sm">{exp.company}</p>
                        </div>
                        <span className="skill-tag text-[11px] whitespace-nowrap py-1">
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-muted-gray text-sm leading-relaxed mt-3">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
