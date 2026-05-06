import AnimatedSection from "@/components/ui/AnimatedSection";

const contacts = [
  {
    label: "Email",
    value: "akhdan.anargya@gmail.com",
    href: "mailto:akhdan.anargya@gmail.com",
    icon: "✉",
    desc: "Send an email",
  },
  {
    label: "GitHub",
    value: "github.com/akhdanrgya",
    href: "https://github.com/akhdanrgya",
    icon: "◈",
    desc: "View my code",
  },
  {
    label: "LinkedIn",
    value: "Akhdan Anargya Arisadi",
    href: "https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/",
    icon: "◇",
    desc: "Connect with me",
  },
  {
    label: "GokilTech",
    value: "gokiltech.com",
    href: "https://gokiltech.com",
    icon: "🚀",
    desc: "My startup",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-700/8 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-slate-400 text-lg max-w-xl mx-auto mt-4">
            Interested in collaborating or have a cool project? Let&apos;s get in touch!
          </p>
        </AnimatedSection>

        <AnimatedSection stagger>
          <div className="grid sm:grid-cols-2 gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="glass-card p-6 flex items-center gap-5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300 shrink-0">
                  {c.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">{c.label}</p>
                  <p className="text-white font-semibold group-hover:text-purple-300 transition-colors">{c.value}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{c.desc}</p>
                </div>
                <span className="ml-auto text-slate-600 group-hover:text-purple-400 transition-colors text-lg">↗</span>
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="text-center mt-12">
          <a
            href="mailto:akhdan.anargya@gmail.com"
            className="btn-glow px-8 py-4 text-base inline-block"
          >
            <span>Send a Message ✉</span>
          </a>
        </AnimatedSection>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-20 pt-8 border-t border-purple-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-sm">
          © 2025 Akhdan Anargya Arisadi. Built with Next.js + Supabase.
        </p>
        <p className="text-slate-600 text-sm">
          Founder of{" "}
          <a href="https://gokiltech.com" className="text-purple-500 hover:text-purple-400 transition-colors">
            GokilTech
          </a>
        </p>
      </div>
    </section>
  );
}
