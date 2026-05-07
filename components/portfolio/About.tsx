import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { About } from "@/lib/supabase";

export default function AboutSection({ about }: { about: About | null }) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            Who <span className="gradient-text">Am I?</span>
          </h2>
          <div className="section-divider mx-auto" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Banner photos grid */}
          <AnimatedSection direction="left">
            <div className="grid grid-cols-2 gap-3">
              {(about?.banner_photos ?? [null, null, null, null]).slice(0, 4).map((photo, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl glass-card ${
                    i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                  }`}
                >
                  {photo ? (
                    <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-dark-300 flex items-center justify-center">
                      <span className="text-purple-500/40 text-4xl">◈</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Bio text */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <div className="glass-card p-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {about?.bio ||
                    "Hello! I'm Akhdan, a Software Engineer and Fullstack Developer passionate about building digital solutions. Currently pursuing an Information Systems degree at Telkom University."}
                </p>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "University", value: "Telkom University", icon: "🎓" },
                  { label: "Major", value: "Information Systems B.Sc", icon: "📚" },
                  { label: "Role", value: "Fullstack Developer", icon: "💻" },
                  { label: "Startup", value: "Founder of GokilTech", icon: "🚀" },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-4">
                    <span className="text-xl mb-2 block">{item.icon}</span>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-sm text-slate-200 font-medium mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow text-sm shrink-0"
                >
                  <span>LinkedIn ↗</span>
                </a>
                <a
                  href="https://github.com/akhdanrgya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm shrink-0"
                >
                  GitHub
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
