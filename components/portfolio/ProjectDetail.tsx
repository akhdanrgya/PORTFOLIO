"use client";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetail({ project }: { project: Project | null }) {
  const { t } = useLanguage();

  // Not found state
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl text-emerald-accent/40">◈</span>
          </div>
          <h1 className="text-headline-md text-on-surface mb-3">{t("projects.notFound")}</h1>
          <p className="text-muted-gray mb-8">{t("projects.notFoundDesc")}</p>
          <Link href="/#projects" className="btn-primary">
            {t("projects.backHome")}
          </Link>
        </div>
      </div>
    );
  }

  const hasDetailSections = project.challenge || project.solution || (project.key_features && project.key_features.length > 0);

  return (
    <main className="min-h-screen flex-grow pt-[104px]">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 flex flex-col gap-[0.75rem] justify-center">
            {/* Category badge */}
            {project.category && (
              <div className="flex items-center gap-3 mb-4">
                <span className="skill-tag">{project.category}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-display-lg-mobile md:text-display-lg text-off-white">
              {project.title}
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-body-lg text-muted-gray max-w-2xl mt-4">
                {project.description}
              </p>
            )}

            {/* Tech stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {project.tech_stack.map((tech) => (
                  <span key={tech} className="skill-tag">{tech}</span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex gap-4 mt-8">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Repository
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                  </svg>
                  {t("projects.viewLive")}
                </a>
              )}
              <Link href="/#projects" className="btn-secondary flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                {t("projects.backToProjects")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      {project.thumbnail_url && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-32">
          <div className="bg-charcoal-surface border border-border-default rounded-xl overflow-hidden shadow-sm">
            <div className="relative w-full aspect-video">
              <Image
                src={project.thumbnail_url}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Detail Sections — conditional */}
      {hasDetailSections && (
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-32 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenge */}
          {project.challenge && (
            <div className="bento-card bg-charcoal-surface border-border-default p-8 flex flex-col gap-[0.75rem] hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300">
              <h2 className="text-headline-md text-off-white flex items-center gap-3">
                <span className="text-emerald-accent">🚩</span>
                Challenge
              </h2>
              <p className="text-body-base text-muted-gray whitespace-pre-line">
                {project.challenge}
              </p>
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="bento-card bg-charcoal-surface border-border-default p-8 flex flex-col gap-[0.75rem] hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300">
              <h2 className="text-headline-md text-off-white flex items-center gap-3">
                <span className="text-emerald-accent">💡</span>
                Solution
              </h2>
              <p className="text-body-base text-muted-gray whitespace-pre-line">
                {project.solution}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="md:col-span-2 bento-card bg-charcoal-surface border-border-default p-8 flex flex-col gap-[0.75rem] hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300 mt-2">
              <h2 className="text-headline-md text-off-white flex items-center gap-3">
                <span className="text-emerald-accent">⭐</span>
                Key Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {project.key_features.map((feature, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <h3 className="text-headline-sm text-on-surface">{feature.title}</h3>
                    <p className="text-body-base text-muted-gray">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
