"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { About } from "@/lib/supabase";

const roles = [
  "Software Engineer",
  "Fullstack Developer",
  "Founder of GokilTech",
  "Information Systems @ Telkom University",
];

export default function Hero({ about }: { about: About | null }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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
  }, [displayed, deleting, roleIndex]);

  const banners = about?.banner_photos?.filter(Boolean) ?? [];
  const profilePhoto = about?.profile_photo_url;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background banner image */}
      {banners.length > 0 && (
        <div className="absolute inset-0">
          <Image
            src={banners[0]}
            alt="Banner"
            fill
            sizes="100vw"
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,1) 100%)" }} />
        </div>
      )}

      {/* Floating orbs */}
      <div className="orb w-96 h-96 bg-purple-700 top-10 -left-20" style={{ animationDelay: "0ms" }} />
      <div className="orb w-80 h-80 bg-violet-600 bottom-20 -right-16" style={{ animationDelay: "3s" }} />
      <div className="orb w-64 h-64 bg-purple-900 top-1/2 left-1/3" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="animate-on-scroll animated" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for Work
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 leading-tight animate-on-scroll animated" style={{ animationDelay: "100ms" }}>
            Akhdan
            <br />
            <span className="gradient-text">Anargya</span>
          </h1>

          <div className="h-12 flex items-center justify-center lg:justify-start mb-6 animate-on-scroll animated" style={{ animationDelay: "200ms" }}>
            <span className="text-xl lg:text-2xl text-slate-300 font-medium">
              {displayed}
              <span className="animate-pulse text-purple-400">|</span>
            </span>
          </div>

          <p className="text-slate-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed mb-10 animate-on-scroll animated" style={{ animationDelay: "300ms" }}>
            {about?.tagline || "Building impactful digital solutions. Founder of GokilTech, Information Systems at Telkom University."}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-on-scroll animated" style={{ animationDelay: "400ms" }}>
            <a href="#projects" className="btn-glow text-sm shrink-0">
              <span>View Projects →</span>
            </a>
            <a href="https://github.com/akhdanrgya" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm shrink-0 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a href="https://gokiltech.com" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm shrink-0">
              GokilTech ↗
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 justify-center lg:justify-start mt-10 animate-on-scroll animated" style={{ animationDelay: "500ms" }}>
            {[
              { label: "Projects", value: "10+" },
              { label: "Technologies", value: "15+" },
              { label: "Years Coding", value: "3+" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-black gradient-text leading-tight">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
                {i < 2 && <div className="w-px h-8 bg-purple-500/20" />}
              </div>
            ))}
          </div>
        </div>

        {/* Profile photo */}
        <div className="flex-shrink-0 animate-on-scroll-right animated" style={{ animationDelay: "200ms" }}>
          <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-violet-500 blur-2xl opacity-30 animate-pulse" />
            <div className="absolute inset-2 rounded-full border-2 border-purple-500/40" />
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-purple-600/50 shadow-purple-lg">
              {profilePhoto ? (
                <Image src={profilePhoto} alt="Akhdan Anargya" fill sizes="(max-width: 1024px) 288px, 384px" className="object-cover" priority />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-dark-300 flex items-center justify-center">
                  <span className="text-6xl font-black gradient-text">AA</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-500 text-xs">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent" />
      </div>
    </section>
  );
}
