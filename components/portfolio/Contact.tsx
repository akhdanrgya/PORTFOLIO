import AnimatedSection from "@/components/ui/AnimatedSection";

const contacts = [
  {
    label: "Email",
    value: "akhdan.anargya@gmail.com",
    href: "mailto:akhdan.anargya@gmail.com",
    desc: "Send an email",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: "from-blue-500/15 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10 group-hover:bg-blue-500/20",
  },
  {
    label: "GitHub",
    value: "github.com/akhdanrgya",
    href: "https://github.com/akhdanrgya",
    desc: "View my repositories",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "from-slate-500/10 to-slate-600/5 border-slate-500/20 hover:border-slate-500/40",
    iconColor: "text-slate-300",
    iconBg: "bg-slate-500/10 group-hover:bg-slate-500/20",
  },
  {
    label: "LinkedIn",
    value: "Akhdan Anargya Arisadi",
    href: "https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/",
    desc: "Connect with me",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "from-blue-600/15 to-blue-700/5 border-blue-600/20 hover:border-blue-500/40",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-600/10 group-hover:bg-blue-600/20",
  },
  {
    label: "GokilTech",
    value: "gokiltech.com",
    href: "https://gokiltech.com",
    desc: "My startup",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    color: "from-purple-500/15 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40",
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10 group-hover:bg-purple-500/20",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full py-20 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Spacer to push section down */}
      <div className="w-full h-32 lg:h-48" aria-hidden="true" />
      
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-purple-700/6 blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative">
        <AnimatedSection className="flex flex-col items-center text-center mb-20 w-full">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="section-divider my-8" />
          <p className="text-slate-400 text-lg max-w-lg leading-relaxed text-center">
            Interested in collaborating or have a cool project in mind? Let&apos;s make something great together!
          </p>
        </AnimatedSection>

        <AnimatedSection stagger className="my-12 lg:my-16">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-6 p-6 lg:p-8 rounded-2xl bg-gradient-to-br border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10 ${c.color}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${c.iconColor} ${c.iconBg}`}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">{c.label}</p>
                  <p className="text-slate-100 font-semibold text-base mt-1.5 truncate group-hover:text-white transition-colors">{c.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{c.desc}</p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-all duration-300 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 ml-2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mt-16">
          <a
            href="mailto:akhdan.anargya@gmail.com"
            className="btn-glow px-8 py-4 text-base inline-flex items-center gap-3"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Send a Message</span>
          </a>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <div className="w-full max-w-6xl px-6 mt-32 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Akhdan Anargya Arisadi. Built with Next.js + Supabase.
        </p>
        <p className="text-slate-600 text-sm">
          Founder of{" "}
          <a href="https://gokiltech.com" className="text-purple-500/80 hover:text-purple-400 transition-colors">
            GokilTech
          </a>
        </p>
      </div>
    </section>
  );
}
