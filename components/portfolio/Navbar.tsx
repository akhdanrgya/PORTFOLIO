"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

import { usePathname } from "next/navigation";

const navLinks: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/about", labelKey: "nav.about" },
  { href: "/skills", labelKey: "nav.skills" },
  { href: "/projects", labelKey: "nav.projects" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b ${
        scrolled
          ? "bg-[#111317]/40 backdrop-blur-md border-border-default"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-4 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="text-headline-sm font-bold text-on-surface tracking-tight">
          Akhdan Anargya
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden lg:flex items-center gap-[0.75rem]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-mono-label uppercase tracking-widest px-2 transition-colors duration-200 ${
                  isActive
                    ? "text-emerald-accent font-bold border-b-2 border-emerald-accent pb-1"
                    : "text-on-surface-variant hover:text-emerald-accent"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language toggle */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 bg-charcoal-surface border border-border-default rounded-full px-3 py-1.5 transition-all hover:border-emerald-accent group cursor-pointer"
              aria-label="Change language"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-accent">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <div className="flex items-center gap-1 font-mono-code">
                <span className={locale === "en" ? "text-emerald-accent" : "text-on-surface-variant hover:text-emerald-accent transition-colors"}>{locale === "en" ? "EN" : "EN"}</span>
                <span className="text-muted-gray">|</span>
                <span className={locale === "id" ? "text-emerald-accent" : "text-on-surface-variant hover:text-emerald-accent transition-colors"}>{locale === "id" ? "ID" : "ID"}</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={`w-3 h-3 text-muted-gray group-hover:text-emerald-accent transition-all duration-200 ${langOpen ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Language dropdown */}
            <div
              className={`absolute right-0 top-full mt-2 w-40 rounded-xl border border-border-default overflow-hidden transition-all duration-200 origin-top-right ${
                langOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
              }`}
              style={{ background: "rgba(22,25,30,0.95)", backdropFilter: "blur(20px)" }}
            >
              <div className="p-1.5">
                <button
                  onClick={() => { if (locale !== "en") toggleLocale(); setLangOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    locale === "en"
                      ? "text-emerald-accent bg-emerald-accent/10"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">🇺🇸</span>
                  <span>English</span>
                  {locale === "en" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-accent ml-auto">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => { if (locale !== "id") toggleLocale(); setLangOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    locale === "id"
                      ? "text-emerald-accent bg-emerald-accent/10"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                  }`}
                >
                  <span className="text-base">🇮🇩</span>
                  <span>Indonesia</span>
                  {locale === "id" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-accent ml-auto">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Available for Work pill */}
          <div className="hidden sm:flex items-center gap-2 bg-charcoal-surface border border-border-default rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
            <span className="font-mono-code text-on-surface-variant">Available for Work</span>
          </div>

          {/* Resume CTA — desktop */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex btn-primary px-8 py-3"
          >
            Resume
          </Link>

          {/* Hamburger — mobile/tablet */}
          <button
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-xl hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-on-surface-variant rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`block w-5 h-0.5 bg-on-surface-variant rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-on-surface-variant rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet dropdown */}
      <div
        className={`lg:hidden absolute right-4 top-full mt-2 w-64 rounded-xl border border-border-default overflow-hidden transition-all duration-200 origin-top-right z-50 ${
          menuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ background: "rgba(22,25,30,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="p-2 space-y-1">
          {/* Available for Work — mobile only */}
          <div className="sm:hidden flex items-center gap-2 px-4 py-3 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
            <span className="font-mono-code text-on-surface-variant text-xs">Available for Work</span>
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg font-mono-label uppercase tracking-widest transition-all duration-200 ${
                  isActive
                    ? "text-emerald-accent bg-emerald-accent/10"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
          <div className="pt-1 pb-0.5 px-1">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
