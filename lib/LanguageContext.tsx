"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Locale, TranslationKey } from "@/lib/translations";
import { translations } from "@/lib/translations";

type LanguageContextType = {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  toggleLocale: () => {},
  t: (key: TranslationKey) => translations[key].en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  // Persist preference in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Locale | null;
    if (saved === "en" || saved === "id") {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "id" : "en";
      localStorage.setItem("portfolio-lang", next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[key][locale],
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
