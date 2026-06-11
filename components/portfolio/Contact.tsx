"use client";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useLanguage } from "@/lib/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  const contacts = [
    {
      label: "Email",
      value: "akhdan.anargya@gmail.com",
      href: "mailto:akhdan.anargya@gmail.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/akhdanrgya",
      href: "https://github.com/akhdanrgya",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/akhdan-anargya...",
      href: "https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "GokilTech",
      value: "gokiltech.com",
      href: "https://gokiltech.com",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-8 border-t border-border-default mt-16 py-32">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedSection className="mb-12">
          <h2 className="section-label mb-4">{t("contact.subtitle")}</h2>
          <p className="text-headline-md text-on-surface mb-6">
            {t("contact.title1")}<span className="text-emerald-accent">{t("contact.title2")}</span>
          </p>
          <p className="text-body-base text-on-surface-variant">
            {t("contact.description")}
          </p>
        </AnimatedSection>

        <AnimatedSection stagger className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.75rem]">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="bento-card flex items-center justify-between group hover:-translate-y-1 backdrop-blur-md bg-charcoal-surface/80 border-white/5 p-8 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-accent/10 flex items-center justify-center text-emerald-accent">
                    {c.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-mono-code text-[11px] text-on-surface-variant uppercase">{c.label}</p>
                    <p className="text-body-base text-sm text-on-surface font-medium truncate w-32 sm:w-auto">{c.value}</p>
                  </div>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-on-surface-variant group-hover:text-emerald-accent transition-colors">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <a href="mailto:akhdan.anargya@gmail.com" className="btn-primary px-8 py-4 inline-flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="m22 2-11 11" />
            </svg>
            {t("contact.sendMessage")}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
