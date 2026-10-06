"use client";

import React from "react";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();

  const handleToggle = () => {
    const next = locale === "en" ? "hi" : "en";
    trackEvent("language_toggled", { targetLocale: next });
    toggleLocale();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={`Switch language. Current: ${locale === "en" ? "English" : "Hindi"}`}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold tracking-wide transition-all focus-visible:ring-2 focus-visible:ring-[var(--brand-terracotta)]"
    >
      <Globe className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
      <span>{locale === "en" ? "EN" : "हिं"}</span>
      <span className="text-[10px] text-[var(--text-muted)] opacity-70">
        / {locale === "en" ? "हिं" : "EN"}
      </span>
    </button>
  );
}
