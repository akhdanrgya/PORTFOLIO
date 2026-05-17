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
          <div className="w-24 h-24 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">◈</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-3">{t("projects.notFound")}</h1>
          <p className="text-slate-400 mb-8">{t("projects.notFoundDesc")}</p>
          <Link href="/#projects" className="btn-glow text-sm">
            <span>{t("projects.backHome")}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 text-sm font-medium transition-colors duration-200 mb-8 group"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          {t("projects.backToProjects")}
        </Link>

        {/* Hero image */}
        {project.thumbnail_url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card mb-10">
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />

            {/* Category badge on image */}
            {project.category && (
              <span className="absolute top-4 right-4 tag">
                {project.category}
              </span>
            )}
            {project.featured && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold backdrop-blur-sm">
                ★ {t("projects.featured")}
              </span>
            )}
          </div>
        )}

        {/* Title & category (if no image) */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {!project.thumbnail_url && project.category && (
              <span className="tag">{project.category}</span>
            )}
            {!project.thumbnail_url && project.featured && (
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold">
                ★ {t("projects.featured")}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {project.title}
          </h1>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content — description */}
          <div className="lg:col-span-2">
            {project.description && (
              <div className="glass-card p-8 lg:p-10">
                <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-400">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  {t("projects.aboutProject")}
                </h2>
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Tech stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="glass-card p-6 lg:p-8">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-400">
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                  </svg>
                  {t("projects.techStack")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium hover:bg-purple-500/20 hover:border-purple-500/30 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {(project.live_url || project.github_url) && (
              <div className="glass-card p-6 lg:p-8">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-400">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  {t("projects.links")}
                </h3>
                <div className="flex flex-col gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow text-sm w-full rounded-xl"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <path d="M15 3h6v6" />
                        <path d="M10 14 21 3" />
                      </svg>
                      <span>{t("projects.viewLive")}</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-sm w-full rounded-xl"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      {t("projects.viewSource")}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
