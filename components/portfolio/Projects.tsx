"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
      <AnimatedSection className="text-center mb-16">
        <h2 className="section-label mb-4">Portfolio</h2>
        <p className="text-headline-md text-on-surface">
          Latest <span className="text-emerald-accent border-b-2 border-emerald-accent pb-1">Projects</span>
        </p>
      </AnimatedSection>

      {/* Featured projects */}
      {featured.length > 0 && (
        <AnimatedSection className="mb-12">
          <h3 className="font-mono-label text-on-surface-variant uppercase tracking-wider mb-4 flex items-center gap-2">
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
        <AnimatedSection className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono-code transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-emerald-accent text-charcoal-deep font-medium"
                  : "bg-charcoal-surface border border-border-default text-on-surface-variant hover:border-emerald-accent hover:text-emerald-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>
      )}

      {/* All projects grid */}
      <AnimatedSection stagger>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <div className="text-5xl mb-4 text-emerald-accent/30">◈</div>
              <p className="text-muted-gray">{t("projects.noProjects")}</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      className={`bento-card p-0 overflow-hidden flex flex-col group cursor-pointer backdrop-blur-md bg-charcoal-surface/80 border-white/5 ${featured ? "md:col-span-1" : ""}`}
    >
      {/* Thumbnail */}
      <div className="h-48 overflow-hidden bg-charcoal-deep border-b border-border-default relative ring-1 ring-inset ring-white/5">
        {project.thumbnail_url ? (
          <Image
            src={project.thumbnail_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-charcoal-surface flex items-center justify-center">
            <span className="text-emerald-accent/20 text-6xl">◈</span>
          </div>
        )}
        {project.category && (
          <div className="absolute top-4 right-4 bg-charcoal-surface border border-border-default px-2 py-1 rounded text-[10px] font-mono-code text-on-surface-variant uppercase">
            {project.category}
          </div>
        )}
        {featured && (
          <div className="absolute top-4 left-4 bg-yellow-500/20 border border-yellow-500/40 px-2 py-1 rounded text-[10px] text-yellow-300 font-medium">
            ★ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-8">
        <h3 className="text-headline-sm text-on-surface mb-2 group-hover:text-emerald-accent transition-colors">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-body-base text-on-surface-variant mb-6 flex-grow text-sm line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <span key={tech} className="skill-tag text-[11px] py-1">{tech}</span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="skill-tag text-[11px] py-1">+{project.tech_stack.length - 4}</span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2 mt-auto">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-primary px-4 py-2 text-xs flex-1 text-center"
            >
              {t("projects.liveDemo")}
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-secondary px-4 py-2 text-xs flex-1 text-center"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
