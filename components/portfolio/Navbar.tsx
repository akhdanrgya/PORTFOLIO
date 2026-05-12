"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <nav
        className={`w-full pointer-events-auto transition-all duration-300 flex justify-center ${scrolled
            ? "bg-[#0f0f1a]/85 backdrop-blur-xl border-b border-purple-500/15 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        {/* Wrapper */}
        <div className="relative h-20 px-6 sm:px-12 flex items-center justify-between w-full max-w-6xl">

          {/* ── Logo (left) ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
              AA
            </div>
            <span className="font-bold text-white text-sm hidden sm:block tracking-tight">
              Akhdan<span className="text-purple-400">.</span>
            </span>
          </Link>

          {/* ── Nav links — absolutely centered relative to the pill ── */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shrink-0 border ${active === link.href
                    ? "text-purple-300 bg-purple-500/10 border-purple-500/20"
                    : "text-slate-400 hover:text-slate-100 border-transparent hover:bg-white/5"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Right side (CTA + hamburger) ── */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            {/* Hire Me — desktop only */}
            <a
              href="mailto:akhdan.anargya@gmail.com"
              className="hidden lg:inline-flex btn-glow text-sm rounded-xl shrink-0"
            >
              <span>Hire Me</span>
            </a>

            {/* Hamburger — mobile/tablet */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-xl hover:bg-white/5 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-slate-300 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
              <span className={`block w-5 h-0.5 bg-slate-300 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-slate-300 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile / tablet dropdown ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out rounded-b-2xl ${menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div
            className="px-4 pt-2 pb-4 space-y-1 border-t border-purple-500/15"
            style={{ background: "rgba(15,15,26,0.97)", backdropFilter: "blur(20px)" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => { setMenuOpen(false); setActive(link.href); }}
                className={`flex items-center px-6 py-4 rounded-xl text-sm font-medium transition-all duration-200 ${active === link.href
                    ? "text-purple-300 bg-purple-500/10 border border-purple-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <a
                href="mailto:akhdan.anargya@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="btn-glow w-full text-sm rounded-xl shrink-0"
              >
                <span>Hire Me ✉</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
