"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Project } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function Projects({ projects }: { projects: Project[] }) {
  const { t } = useLanguage();
  const categories = [t("projects.all"), ...new Set(projects.map((p) => p.category).filter(Boolean))] as string[];
  const [activeCategory, setActiveCategory] = useState(t("projects.all"));

  const filtered =
    activeCategory === t("projects.all")
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="w-full py-32 lg:py-40 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">{t("projects.subtitle")}</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            {t("projects.title1")}<span className="gradient-text">{t("projects.title2")}</span>
          </h2>
          <div className="section-divider mx-auto" />
        </AnimatedSection>

        {/* Featured projects */}
        {featured.length > 0 && (
          <AnimatedSection className="mb-12">
            <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> {t("projects.featured")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featured.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* Category filter */}
        {categories.length > 1 && (
          <AnimatedSection className="flex flex-wrap gap-4 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white shadow-glow"
                    : "glass-card !transform-none text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>
        )}

        {/* All projects grid */}
        <AnimatedSection stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-3 text-center py-16">
                <div className="text-5xl mb-4">◈</div>
                <p className="text-slate-500">{t("projects.noProjects")}</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t } = useLanguage();
  return (
    <Link href={`/projects/${project.id}`} className={`glass-card overflow-hidden group block ${featured ? "md:col-span-1" : ""}`}>
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${featured ? "aspect-video" : "aspect-video"}`}>
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-dark-300 flex items-center justify-center">
            <span className="text-purple-500/40 text-6xl">◈</span>
          </div>
        )}
        {featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-semibold">
            ★ Featured
          </span>
        )}
        {project.category && (
          <span className="absolute top-3 right-3 tag">
            {project.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <span key={tech} className="tag text-[11px]">
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="tag text-[11px]">+{project.tech_stack.length - 4}</span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow px-4 py-2 text-xs flex-1 text-center"
            >
              <span>{t("projects.liveDemo")}</span>
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-4 py-2 text-xs flex-1 text-center"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
