import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Certification } from "@/lib/supabase";

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Achievements</span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mt-2">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <div className="section-divider mx-auto" />
        </AnimatedSection>

        <AnimatedSection stagger>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <a
                key={cert.id}
                href={cert.cert_url ?? undefined}
                target={cert.cert_url ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`glass-card p-5 flex gap-4 items-start ${cert.cert_url ? "cursor-pointer" : "cursor-default"}`}
              >
                {/* Image/badge */}
                <div className="shrink-0">
                  {cert.image_url ? (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-purple-500/20">
                      <Image src={cert.image_url} alt={cert.title} fill className="object-contain p-1" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
                      ◉
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm leading-tight truncate">{cert.title}</h3>
                  <p className="text-purple-400 text-xs font-medium mt-0.5">{cert.issuer}</p>
                  {cert.issue_date && (
                    <p className="text-slate-500 text-xs mt-1">{formatDate(cert.issue_date)}</p>
                  )}
                  {cert.cert_url && (
                    <span className="text-xs text-purple-400 mt-2 inline-block hover:text-purple-300">
                      View Certificate ↗
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
