"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { About } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutSection({ about }: { about: About | null }) {
  const { t } = useLanguage();

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
      {/* Section header */}
      <AnimatedSection className="text-center mb-16">
        <h2 className="section-label mb-4">About Me</h2>
        <p className="text-headline-md text-on-surface">
          Who <span className="text-emerald-accent border-b-2 border-emerald-accent pb-1">Am I?</span>
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Bio card — left */}
        <AnimatedSection direction="left" className="md:col-span-7">
          <div className="bento-card backdrop-blur-md bg-charcoal-surface/80 border-white/5 p-8 flex flex-col justify-center">
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {about?.bio || t("about.bio")}
            </p>
            <div className="flex gap-4 mt-8">
              <a
                href="https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 text-xs flex items-center gap-2"
              >
                LinkedIn
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                </svg>
              </a>
              <a
                href="https://github.com/akhdanrgya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-4 py-2 text-xs"
              >
                GitHub
              </a>
            </div>
          </div>
        </AnimatedSection>

        {/* Info cards — right 2×2 */}
        <AnimatedSection direction="right" className="md:col-span-5">
          <div className="grid grid-cols-2 gap-[1.5rem]">
            {[
              { label: t("about.university"), value: "Telkom University", icon: "🎓" },
              { label: t("about.major"), value: t("about.majorValue"), icon: "📚" },
              { label: t("about.role"), value: "Fullstack Dev", icon: "💻" },
              { label: t("about.startup"), value: "GokilTech", icon: "🚀" },
            ].map((item) => (
              <div key={item.label} className="bento-card backdrop-blur-md bg-charcoal-surface/80 border-white/5 p-8 flex flex-col gap-2 items-start">
                <span className="text-2xl mb-2">{item.icon}</span>
                <p className="font-mono-code text-on-surface-variant uppercase">{item.label}</p>
                <p className="text-body-base text-on-surface font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Gallery (No Title) */}
      {about?.banner_photos && about.banner_photos.length > 0 && (
        <AnimatedSection direction="up" className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {about.banner_photos.map((photo, i) => (
              <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 group">
                <img 
                  src={photo} 
                  alt={`Gallery photo ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}
