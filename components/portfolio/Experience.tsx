import AnimatedSection from "@/components/ui/AnimatedSection";
import Image from "next/image";
import type { Experience } from "@/lib/supabase";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Present";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="w-full py-32 lg:py-40 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-4xl">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Career</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider mx-auto" />
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-purple-500/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <AnimatedSection key={exp.id} delay={i * 100}>
                <div className="flex gap-6 items-start">
                  {/* Timeline dot */}
                  <div className="hidden md:flex shrink-0 w-16 justify-center pt-5">
                    <div className="w-4 h-4 rounded-full bg-purple-600 border-2 border-purple-400 shadow-glow" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 glass-card p-6">
                    <div className="flex items-start gap-4">
                      {/* Company logo */}
                      <div className="shrink-0">
                        {exp.logo_url ? (
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-purple-500/20">
                            <Image src={exp.logo_url} alt={exp.company} fill className="object-contain p-1" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                            {exp.company.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                            <p className="text-purple-400 font-medium text-sm">{exp.company}</p>
                          </div>
                          <span className="tag text-[11px] whitespace-nowrap">
                            {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="text-slate-400 text-sm leading-relaxed mt-3">
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
      </div>
    </section>
  );
}
