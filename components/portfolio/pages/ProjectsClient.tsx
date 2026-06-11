"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/lib/supabase";

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();

  const featured = projects.find((p) => p.featured) || projects[0];
  const others = projects.filter((p) => p.id !== featured?.id);

  return (
    <main className="flex-grow pt-[104px] pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <section className="mb-16 pt-16">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-3">
          {t("projects.portfolio")}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          {t("projects.desc")}
        </p>
      </section>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-[1.5rem]">
        
        {/* Featured Project (12 cols) */}
        {featured && (
          <div className="md:col-span-12 bg-charcoal-surface border border-border-default rounded-lg overflow-hidden group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              {featured.thumbnail_url ? (
                <Image
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-charcoal-deep flex items-center justify-center">
                  <span className="text-emerald-accent/20 text-6xl">◈</span>
                </div>
              )}
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline-md text-headline-md text-off-white">{featured.title}</h2>
                  {featured.live_url && (
                    <a href={featured.live_url} target="_blank" rel="noopener noreferrer" className="text-emerald-accent hover:text-emerald-400 transition-colors">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="font-body-base text-body-base text-on-surface-variant mb-6">
                  {featured.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tech_stack?.map((tech) => (
                    <span key={tech} className="bg-emerald-accent/10 text-emerald-accent font-mono-code text-mono-code px-3 py-1 rounded-full border border-emerald-accent/20 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${featured.id}`} className="inline-flex items-center gap-2 text-emerald-accent font-mono-label text-mono-label hover:text-emerald-400 transition-colors uppercase tracking-wider text-sm">
                  {t("projects.viewCaseStudy")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects (6 cols each) */}
        {others.map((project) => (
          <div key={project.id} className="md:col-span-6 bg-charcoal-surface border border-border-default rounded-lg overflow-hidden group hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden border-b border-border-default relative">
              {project.thumbnail_url ? (
                <Image
                  src={project.thumbnail_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-charcoal-deep flex items-center justify-center">
                  <span className="text-emerald-accent/20 text-6xl">◈</span>
                </div>
              )}
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-off-white mb-2">{project.title}</h3>
                <p className="font-body-base text-body-base text-on-surface-variant mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech_stack?.slice(0, 4).map((tech) => (
                    <span key={tech} className="bg-emerald-accent/10 text-emerald-accent font-mono-code text-mono-code px-2 py-1 rounded-full border border-emerald-accent/20 text-[11px]">
                      {tech}
                    </span>
                  ))}
                  {project.tech_stack && project.tech_stack.length > 4 && (
                    <span className="bg-emerald-accent/10 text-emerald-accent font-mono-code text-mono-code px-2 py-1 rounded-full border border-emerald-accent/20 text-[11px]">
                      +{project.tech_stack.length - 4}
                    </span>
                  )}
                </div>
                <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-2 text-emerald-accent font-mono-label text-mono-label hover:text-emerald-400 transition-colors uppercase tracking-wider text-xs">
                  {t("projects.viewCaseStudy")}
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
