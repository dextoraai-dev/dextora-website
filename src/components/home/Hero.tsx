"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/shared/Badge";
import { VideoModal } from "@/components/shared/VideoModal";
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
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 bg-[var(--bg-base)] transition-colors duration-300 pointer-events-none">
        <Image
          src="/images/generated/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[82%_center] sm:object-[78%_center] md:object-[72%_center] lg:object-right select-none pointer-events-none transition-opacity duration-300 opacity-100 dark:opacity-85"
        />

        {/* Ambient Warm Pedagogical Light Glow on Illustration (Light Mode) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_45%,rgba(217,83,47,0.06),transparent_70%)] dark:hidden pointer-events-none" />

        {/* Horizontal Smooth Feathering Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-base)]/95 via-30% sm:via-[var(--bg-base)]/75 sm:via-45% to-transparent to-75% transition-colors duration-300 pointer-events-none" />

        {/* Bottom smooth edge blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/60 to-transparent transition-colors duration-300 pointer-events-none" />

        {/* Mobile & Tablet vertical gradient protection for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/50 to-transparent lg:hidden transition-colors duration-300 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 lg:py-32 w-full pointer-events-auto">
        {/* Left-aligned Text Column over clean empty left area */}
        <div className="max-w-2xl space-y-6 text-left relative z-20">
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2 relative z-30 pointer-events-auto">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer relative z-30"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-[#E05A38]" />
            </Link>

            <VideoModal
              srcName="dextora-explainer"
              title="The Dextora Ecosystem & AI Architecture"
              poster="/videos/dextora-explainer-poster.jpg"
              captionSrc="/videos/dextora-explainer.vtt"
              triggerText={t.brand.tagline.includes("भारत") ? "वीडियो देखें (35s)" : "Watch the Story (35s)"}
            />

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all duration-200 hover:shadow-sm cursor-pointer relative z-30"
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

