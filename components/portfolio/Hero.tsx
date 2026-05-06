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
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" style={{ background: "linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,1) 100%)" }} />
        </div>
      )}

      {/* Floating orbs */}
      <div className="orb w-96 h-96 bg-purple-700 top-10 -left-20 animation-delay-0" />
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

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-on-scroll animated" style={{ animationDelay: "400ms" }}>
            <a href="#projects" className="btn-glow px-6 py-3 text-sm">
              <span>View Projects →</span>
            </a>
            <a href="https://github.com/akhdanrgya" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-3 text-sm">
              GitHub
            </a>
            <a href="https://gokiltech.com" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-3 text-sm">
              GokilTech ↗
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center lg:justify-start mt-12 animate-on-scroll animated" style={{ animationDelay: "500ms" }}>
            {[
              { label: "Projects", value: "10+" },
              { label: "Technologies", value: "15+" },
              { label: "Years of Coding", value: "3+" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-black gradient-text">{s.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
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
                <Image src={profilePhoto} alt="Akhdan Anargya" fill className="object-cover" priority />
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
