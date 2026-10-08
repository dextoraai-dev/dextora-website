"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/shared/Badge";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Globe2,
} from "lucide-react";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden hero-glow">
      {/* Background Image with Responsive Object-Position */}
      <div className="absolute inset-0 z-0 bg-[var(--bg-base)]">
        <Image
          src="/images/generated/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_center] sm:object-[75%_center] md:object-[70%_center] lg:object-right select-none pointer-events-none"
        />

        {/* Subtle Gradient Overlays for Light & Dark themes guaranteeing WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F5EE]/95 via-[#F8F5EE]/85 to-[#F8F5EE]/25 dark:from-[#0C0E12]/95 dark:via-[#0C0E12]/85 dark:to-[#0C0E12]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent lg:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 lg:py-32 w-full">
        {/* Left-aligned Text Column over clean empty left area */}
        <div className="max-w-2xl space-y-6 text-left">
          <div className="inline-flex">
            <Badge variant="terracotta" size="md">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
              <span>{t.hero.badge}</span>
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
            {t.hero.titleLine1}{" "}
            <span className="text-[var(--brand-terracotta)] italic relative">
              {t.hero.titleHighlight}
            </span>{" "}
            {t.hero.titleLine2}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-[#E05A38]" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all duration-200"
            >
              <span>{t.hero.ctaSecondary}</span>
            </Link>
          </div>

          {/* Trust highlights */}
          <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-start gap-6 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>NCERT & UPSC Syllabus Aligned</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Bilingual (English & Hindi)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Zero Generic Hallucinations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

