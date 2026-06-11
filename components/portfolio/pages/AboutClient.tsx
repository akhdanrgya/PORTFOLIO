"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import type { About } from "@/lib/supabase";

export default function AboutClient({ about }: { about: About | null }) {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col min-h-screen overflow-hidden pt-[100px] bg-background">
      {/* Hero Intro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-32 w-full">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-3">
          {t("about.title1")}<span className="text-emerald-accent">{t("about.title2")}</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          {about?.tagline || "I engineer scalable systems and craft precise user interfaces. My approach merges architectural rigor with modern web technologies to build solutions that endure."}
        </p>
      </section>

      {/* Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[1.5rem] auto-rows-min">
          
          {/* Main Bio Block */}
          <div className="col-span-1 md:col-span-8 bg-charcoal-surface border border-border-default p-8 rounded-lg group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-shadow duration-500">
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-emerald-accent">
                <path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10s10-4.477 10-10A10 10 0 0 0 12 2Z" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h2 className="font-headline-md text-headline-md text-on-surface">{t("about.philosophy")}</h2>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant leading-relaxed whitespace-pre-line">
              {about?.bio || `As a developer, I don't just write code; I construct digital environments. My methodology is deeply rooted in structural integrity—ensuring every component, from the backend database schema to the client-side rendering pipeline, serves a distinct, optimized purpose without unnecessary bloat.\n\nI thrive on untangling complexity. By breaking down convoluted business logic into elegant, performant micro-services and modular UI components, I prioritize clear signals over digital noise. Design is how it works, and I build it to work flawlessly.`}
            </p>
          </div>

          {/* Abstract Visual Block */}
          <div className="col-span-1 md:col-span-4 bg-charcoal-surface border border-border-default rounded-lg overflow-hidden relative min-h-[320px]">
            {about?.profile_photo_url ? (
              <Image
                src={about.profile_photo_url}
                alt="Akhdan Anargya"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-charcoal-deep" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-charcoal-elevated/80 backdrop-blur-md border border-border-default p-4 rounded inline-block">
                <span className="font-mono-code text-mono-code text-emerald-accent">System.initialize()</span>
              </div>
            </div>
          </div>

          {/* Role Block */}
          <div className="col-span-1 md:col-span-4 bg-charcoal-surface border border-border-default p-8 rounded-lg group hover:border-[#3c4a42] transition-colors duration-300 flex flex-col justify-between h-full min-h-[250px]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-gray">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" x2="20" y1="19" y2="19" />
                </svg>
                <h3 className="font-mono-label text-mono-label text-muted-gray uppercase tracking-widest">{t("about.currentRole")}</h3>
              </div>
              <div className="font-display-lg-mobile text-display-lg-mobile text-on-surface leading-tight mb-2">Fullstack</div>
              <div className="font-headline-sm text-headline-sm text-emerald-accent">Developer</div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="bg-emerald-accent/10 text-emerald-accent px-3 py-1 rounded-full font-mono-code text-mono-code border border-emerald-accent/20">React</span>
              <span className="bg-emerald-accent/10 text-emerald-accent px-3 py-1 rounded-full font-mono-code text-mono-code border border-emerald-accent/20">Node.js</span>
              <span className="bg-emerald-accent/10 text-emerald-accent px-3 py-1 rounded-full font-mono-code text-mono-code border border-emerald-accent/20">TypeScript</span>
            </div>
          </div>

          {/* Education Block */}
          <div className="col-span-1 md:col-span-4 bg-charcoal-surface border border-border-default p-8 rounded-lg group hover:border-[#3c4a42] transition-colors duration-300 flex flex-col justify-between h-full min-h-[250px]">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-gray">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <h3 className="font-mono-label text-mono-label text-muted-gray uppercase tracking-widest">{t("about.education")}</h3>
              </div>
              <h4 className="font-headline-md text-headline-md text-on-surface leading-tight">Telkom</h4>
              <h4 className="font-headline-md text-headline-md text-on-surface mb-4">University</h4>
            </div>
            <p className="font-body-base text-body-base text-on-surface-variant mt-4 border-t border-border-default pt-4">
              Solidified my foundation in computer science, algorithmic thinking, and rigorous software engineering principles.
            </p>
          </div>

          {/* Founder Block */}
          <div className="col-span-1 md:col-span-4 bg-emerald-accent text-charcoal-deep border border-emerald-accent p-8 rounded-lg relative overflow-hidden flex flex-col justify-center min-h-[250px] group">
            <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none transition-transform group-hover:scale-110 duration-700">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[160px] h-[160px]">
                <path d="M13.13 2.13 21.87 10.87A1 1 0 0 1 22 11.58V20a2 2 0 0 1-2 2h-8.42a1 1 0 0 1-.71-.29L2.13 13.13a1 1 0 0 1 0-1.42l9.58-9.58a1 1 0 0 1 1.42 0Z" />
                <path d="m8.5 13.5-2.5 2.5" />
                <path d="m11.5 10.5-2.5 2.5" />
                <path d="m14.5 7.5-2.5 2.5" />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="font-mono-label text-mono-label mb-3 opacity-80 uppercase tracking-widest text-charcoal-deep">{t("about.leadership")}</div>
              <h3 className="font-headline-md text-headline-md font-bold mb-4 text-charcoal-deep">Founder @ GokilTech</h3>
              <p className="font-body-base text-body-base font-medium opacity-90 max-w-[90%] text-charcoal-deep">
                Spearheading technical innovation and architecting scalable solutions from the ground up to solve complex market challenges.
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
