"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import { Locale, translations, TranslationDictionary } from "@/data/translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "dextora_locale_preference";

let currentLocale: Locale = "en";
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribeLocale(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (saved === "en" || saved === "hi") {
      currentLocale = saved;
      return saved;
    }
  } catch {
    // Storage unavailable
  }
  return currentLocale;
}

function getLocaleServerSnapshot(): Locale {
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  const setLocale = useCallback((newLocale: Locale) => {
    currentLocale = newLocale;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore
    }
    notify();
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(currentLocale === "en" ? "hi" : "en");
  }, [setLocale]);

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
