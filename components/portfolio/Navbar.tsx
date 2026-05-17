"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "#about", labelKey: "nav.about" },
  { href: "#skills", labelKey: "nav.skills" },
  { href: "#projects", labelKey: "nav.projects" },
  { href: "#experience", labelKey: "nav.experience" },
  { href: "#certifications", labelKey: "nav.certifications" },
  { href: "#contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState("");
  const { locale, toggleLocale, t } = useLanguage();
  const langRef = useRef<HTMLDivElement>(null);

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

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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
            <span className="font-bold text-white text-sm hidden sm:block tracking-tight">
              Akhdan Anargya Arisadi<span className="text-purple-400">.</span>
            </span>
          </Link>

          {/* ── Nav links — absolutely centered ── */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 shrink-0 border ${active === link.href
                    ? "text-purple-300 bg-purple-500/10 border-purple-500/20"
                    : "text-slate-400 hover:text-slate-100 border-transparent hover:bg-white/5"
                  }`}
              >
                {t(link.labelKey)}
              </a>
            ))}
          </div>

          {/* ── Right side (Lang dropdown + CTA + hamburger) ── */}
          <div className="flex items-center gap-3 shrink-0 z-10">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 h-9 px-3 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  langOpen
                    ? "border-purple-500/30 bg-purple-500/10 text-purple-300"
                    : "border-purple-500/20 bg-white/[0.03] text-slate-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
                }`}
                aria-label="Change language"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{locale.toUpperCase()}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 top-full mt-2 w-40 rounded-xl border border-purple-500/15 overflow-hidden transition-all duration-200 origin-top-right ${
                  langOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`}
                style={{ background: "rgba(15,15,26,0.95)", backdropFilter: "blur(20px)" }}
              >
                <div className="p-1.5">
                  <button
                    onClick={() => { if (locale !== "en") toggleLocale(); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      locale === "en"
                        ? "text-purple-300 bg-purple-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">🇺🇸</span>
                    <span>English</span>
                    {locale === "en" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-purple-400 ml-auto">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => { if (locale !== "id") toggleLocale(); setLangOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      locale === "id"
                        ? "text-purple-300 bg-purple-500/10"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-base">🇮🇩</span>
                    <span>Indonesia</span>
                    {locale === "id" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-purple-400 ml-auto">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Hire Me — desktop only */}
            <a
              href="mailto:akhdan.anargya@gmail.com"
              className="hidden lg:inline-flex btn-glow text-sm rounded-xl shrink-0"
            >
              <span>{t("nav.hireMe")}</span>
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
                {t(link.labelKey)}
              </a>
            ))}
            <div className="pt-2 pb-1">
              <a
                href="mailto:akhdan.anargya@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="btn-glow w-full text-sm rounded-xl shrink-0"
              >
                <span>{t("nav.hireMe")} ✉</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
