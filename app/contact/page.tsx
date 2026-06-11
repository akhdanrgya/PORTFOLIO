"use client";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { useLanguage } from "@/lib/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-charcoal-deep text-on-surface min-h-screen flex flex-col font-body-base selection:bg-emerald-accent selection:text-charcoal-deep">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-[104px] pb-32 px-4 sm:px-8 max-w-7xl mx-auto w-full">

        {/* Let's Connect Section Header */}
        <div className="mb-16 max-w-2xl pt-16">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-3">
            {t("contact.title1")}<br className="md:hidden" />{t("contact.title2")}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {t("contact.desc")}
          </p>
        </div>

        {/* Bento Grid Layout for Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[1.5rem]">

          {/* Direct Contact Info (Left Column) */}
          <div className="md:col-span-5 flex flex-col gap-[1.5rem]">

            {/* Email Card */}
            <div className="bg-charcoal-surface border border-border-default rounded p-8 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-accent/10 rounded text-emerald-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-mono-label text-mono-label text-muted-gray mb-1 uppercase tracking-wider text-xs">{t("contact.email")}</h3>
                  <a className="font-headline-sm text-headline-sm text-off-white hover:text-emerald-accent transition-colors block break-all" href="mailto:akhdan.anargya@gmail.com">
                    akhdan.anargya<br />@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-charcoal-surface border border-border-default rounded p-8 hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300">
              <h3 className="font-mono-label text-mono-label text-muted-gray mb-6 uppercase tracking-wider text-xs">{t("contact.social")}</h3>
              <div className="flex flex-col gap-4">
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-emerald-accent transition-colors group" href="https://github.com/akhdanrgya" rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="font-body-base text-body-base font-medium">GitHub</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <div className="h-px bg-border-default w-full"></div>
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-emerald-accent transition-colors group" href="https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/" rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-body-base text-body-base font-medium">LinkedIn</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <div className="h-px bg-border-default w-full"></div>
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-emerald-accent transition-colors group" href="https://instagram.com/akhdananargya" rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  <span className="font-body-base text-body-base font-medium">Instagram</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <div className="h-px bg-border-default w-full"></div>
                <a className="flex items-center gap-3 text-on-surface-variant hover:text-emerald-accent transition-colors group" href="https://gokiltech.com" rel="noopener noreferrer" target="_blank">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" x2="22" y1="12" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="font-body-base text-body-base font-medium">GokilTech</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="md:col-span-7">
            <div className="bg-charcoal-surface border border-border-default rounded p-8 h-full hover:shadow-[0_0_20px_rgba(16,185,129,0.05)] transition-shadow duration-300">
              <h2 className="font-headline-md text-headline-md text-off-white mb-6">{t("contact.sendMessage")}</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="name">{t("contact.formName")}</label>
                    <input className="w-full bg-charcoal-deep border border-border-default rounded px-4 py-3 font-body-base text-body-base text-on-surface focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent focus:outline-none transition-colors placeholder:text-muted-gray" id="name" name="name" placeholder="John Doe" required type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="email">{t("contact.formEmail")}</label>
                    <input className="w-full bg-charcoal-deep border border-border-default rounded px-4 py-3 font-body-base text-body-base text-on-surface focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent focus:outline-none transition-colors placeholder:text-muted-gray" id="email" name="email" placeholder="john@example.com" required type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="subject">{t("contact.formSubject")}</label>
                  <input className="w-full bg-charcoal-deep border border-border-default rounded px-4 py-3 font-body-base text-body-base text-on-surface focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent focus:outline-none transition-colors placeholder:text-muted-gray" id="subject" name="subject" placeholder="Project Inquiry" required type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono-label text-mono-label text-on-surface-variant uppercase tracking-wider text-[11px]" htmlFor="message">{t("contact.formMessage")}</label>
                  <textarea className="w-full bg-charcoal-deep border border-border-default rounded px-4 py-3 font-body-base text-body-base text-on-surface focus:border-emerald-accent focus:ring-1 focus:ring-emerald-accent focus:outline-none transition-colors resize-y placeholder:text-muted-gray" id="message" name="message" placeholder="..." required rows={5}></textarea>
                </div>
                <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-accent text-charcoal-deep font-body-base text-body-base font-semibold rounded hover:bg-emerald-400 transition-colors duration-200" type="submit">
                  <span>{t("contact.sendMessage")}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="m22 2-11 11" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
