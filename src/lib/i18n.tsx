"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations, TranslationDictionary } from "@/data/translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "dextora_locale_preference";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      if (saved === "en" || saved === "hi") {
        setLocaleState(saved);
      }
    } catch {
      // Storage unavailable or SSR
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore
    }
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "hi" : "en");
  };

  const t = translations[locale] || translations.en;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: translations.en,
      toggleLocale: () => {},
    };
  }
  return context;
}
