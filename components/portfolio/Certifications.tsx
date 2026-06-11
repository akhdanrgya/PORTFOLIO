"use client";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Certification } from "@/lib/supabase";
import { useLanguage } from "@/lib/LanguageContext";

export default function Certifications({ certifications }: { certifications: Certification[] }) {
  const { locale, t } = useLanguage();

  function formatDate(dateStr: string | null) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "long", year: "numeric" });
  }

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="max-w-7xl mx-auto px-4 sm:px-8 py-32">
      <AnimatedSection className="text-center mb-16">
        <h2 className="section-label mb-4">{t("certifications.subtitle")}</h2>
        <p className="text-headline-md text-on-surface">
          {t("certifications.title1")}<span className="text-emerald-accent">{t("certifications.title2")}</span>
        </p>
      </AnimatedSection>

      <AnimatedSection stagger>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.cert_url ?? undefined}
              target={cert.cert_url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`bento-card p-6 lg:p-8 flex gap-5 items-start ${cert.cert_url ? "cursor-pointer" : "cursor-default"}`}
            >
              {/* Image/badge */}
              <div className="shrink-0">
                {cert.image_url ? (
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border-default">
                    <Image src={cert.image_url} alt={cert.title} fill className="object-contain p-1" />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-emerald-accent/10 border border-emerald-accent/20 flex items-center justify-center text-2xl text-emerald-accent">
                    ◉
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-on-surface font-semibold text-sm leading-tight truncate">{cert.title}</h3>
                <p className="text-emerald-accent text-xs font-medium mt-0.5">{cert.issuer}</p>
                {cert.issue_date && (
                  <p className="text-muted-gray text-xs mt-1">{formatDate(cert.issue_date)}</p>
                )}
                {cert.cert_url && (
                  <span className="text-xs text-emerald-accent mt-2 inline-block hover:text-emerald-hover transition-colors">
                    {t("certifications.view")}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
