"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/akhdanrgya", icon: "{ }" },
  { label: "LinkedIn", href: "https://linkedin.com/in/akhdan-anargya-arisadi-b67100270/", icon: "🔗" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "Email", href: "mailto:akhdan.anargya@gmail.com", icon: "✉" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full py-12 bg-charcoal-deep border-t border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="text-headline-sm text-on-surface font-bold inline-block mb-2">
              Akhdan.
            </Link>
            <p className="font-mono-code text-on-surface-variant max-w-sm">
              {t("footer.bio")}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") || social.href === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-emerald-accent transition-colors flex items-center gap-2 font-mono-label uppercase tracking-wider"
              >
                <span className="text-lg">{social.icon}</span> {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="text-center mt-12 pt-8 border-t border-border-default">
          <p className="font-mono-code text-on-surface-variant">
            © {new Date().getFullYear()} Akhdan Anargya Arisadi. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
