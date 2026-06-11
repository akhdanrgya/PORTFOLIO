"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { About } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function Hero({ about }: { about: About | null }) {
  const { t } = useLanguage();
  const roles = [t("hero.role.0"), t("hero.role.1"), t("hero.role.2"), t("hero.role.3")];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Reset typewriter when language changes
  useEffect(() => {
    setDisplayed("");
    setDeleting(false);
    setRoleIndex(0);
  }, [t]);

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, deleting, roleIndex, roles]);

  const profilePhoto = about?.profile_photo_url;

  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[80vh] py-32 pt-40">
        {/* Text content — left */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Available badge — mobile only */}
          <div className="inline-flex items-center gap-2 bg-charcoal-surface border border-border-default rounded-full px-4 py-2 w-max sm:hidden animate-on-scroll animated">
            <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
            <span className="font-mono-code text-on-surface-variant">Available for Work</span>
          </div>

          {/* Name */}
          <h1 className="text-display-lg-mobile md:text-display-lg text-on-surface tracking-tighter animate-on-scroll animated">
            Akhdan<br />
            <span className="text-emerald-accent">Anargya</span>
          </h1>

          {/* Typewriter */}
          <div className="h-8 flex items-center animate-on-scroll animated" style={{ animationDelay: "100ms" }}>
            <span className="text-body-lg text-muted-gray">
              {displayed}
              <span className="animate-pulse text-emerald-accent">|</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-body-lg text-on-surface-variant max-w-2xl border-l-2 border-emerald-accent pl-4 animate-on-scroll animated" style={{ animationDelay: "200ms" }}>
            {about?.tagline || t("hero.tagline")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-4 animate-on-scroll animated" style={{ animationDelay: "300ms" }}>
            <a href="#projects" className="btn-primary group">
              {t("hero.viewProjects")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://github.com/akhdanrgya"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border-default animate-on-scroll animated" style={{ animationDelay: "400ms" }}>
            {[
              { label: t("hero.projects"), value: "10+" },
              { label: t("hero.technologies"), value: "15+" },
              { label: t("hero.yearsCoding"), value: "4+" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-headline-md text-emerald-accent mb-1">{s.value}</p>
                <p className="font-mono-code text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile photo — right */}
        <div className="lg:col-span-5 relative hidden lg:block animate-on-scroll-right animated" style={{ animationDelay: "200ms" }}>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border-default relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep via-transparent to-transparent z-10" />
            {profilePhoto ? (
              <Image
                src={profilePhoto}
                alt="Akhdan Anargya"
                fill
                sizes="(max-width: 1024px) 0px, 40vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                priority
              />
            ) : (
              <div className="w-full h-full bg-charcoal-surface flex items-center justify-center">
                <span className="text-6xl font-bold text-emerald-accent/30 font-display">AA</span>
              </div>
            )}
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-mono-label text-emerald-accent mb-2">Jakarta, ID</p>
              <p className="font-mono-code text-off-white">Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
