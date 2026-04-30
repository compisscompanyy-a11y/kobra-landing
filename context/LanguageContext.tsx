"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Lang, TranslationKeys } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationKeys;
}

const STORAGE_KEY = "kobra-lang";

const LanguageContext = createContext<LangCtx>({
  lang: "es",
  setLang: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Load saved language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable — ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
