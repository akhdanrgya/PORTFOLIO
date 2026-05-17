"use client";
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

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/akhdanrgya",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:akhdan.anargya@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/akhdanrgya",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Top gradient divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-purple-700/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
        {/* Main footer content */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                AA
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Akhdan<span className="text-purple-400">.</span>
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t("footer.bio")}
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {t("footer.navigation")}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/30 group-hover:bg-purple-400 transition-colors duration-200" />
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="md:col-span-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-6">
              {t("footer.getInTouch")}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:akhdan.anargya@gmail.com"
                className="text-slate-400 text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/8 border border-purple-500/15 flex items-center justify-center text-purple-400/60 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-200 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                akhdan.anargya@gmail.com
              </a>

              <a
                href="https://gokiltech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/8 border border-purple-500/15 flex items-center justify-center text-purple-400/60 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-200 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                {t("footer.myStartup")}
              </a>

              <div className="text-slate-400 text-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/8 border border-purple-500/15 flex items-center justify-center text-purple-400/60 shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                Jakarta, Indonesia
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="mailto:akhdan.anargya@gmail.com"
                className="btn-glow text-xs px-5 py-2.5 rounded-xl"
              >
                <span>{t("footer.cta")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Akhdan Anargya Arisadi. {t("footer.rights")}
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            {t("footer.builtWithPrefix")}
            <span className="inline-flex items-center gap-1 text-slate-500">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-purple-500/60">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {t("footer.builtWith")}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
