"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { TranslationDictionary, Locale } from "@/data/translations";
import { ArrowRight, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";

interface JourneyTextProps {
  product: Product;
  index: number;
  phase: "rest" | "hold";
  locale: Locale;
  t: TranslationDictionary;
}

export function JourneyText({
  product,
  index,
  phase,
  locale,
  t,
}: JourneyTextProps) {
  const isHi = locale === "hi";
  const name = (isHi && product.nameHi) || product.name;
  const tagline = (isHi && product.taglineHi) || product.tagline;
  const oneLiner = (isHi && product.oneLinerHi) || product.oneLiner;
  const featuresList =
    (isHi && product.featuresHi) || product.features.slice(0, 3);

  const eyebrow =
    t.products.chapterEyebrows?.[
      product.slug as keyof typeof t.products.chapterEyebrows
    ] || `0${index + 1} · ${product.shortName.toUpperCase()}`;

  const isHold = phase === "hold";

  return (
    <div className="space-y-4 sm:space-y-5 text-left w-full select-text">
      {/* 1. Eyebrow & Status Badge */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm tracking-wider uppercase"
          style={{ backgroundColor: product.accentColor }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{eyebrow}</span>
        </span>

        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
            isHold
              ? "bg-black/40 border-white/20 text-white/90 backdrop-blur-sm"
              : "bg-[var(--bg-surface)] dark:bg-[#1A1F2C] border-[var(--border-subtle)] text-[var(--text-secondary)]"
          }`}
        >
          {product.status === "live" ? t.products.live : t.products.comingSoon}
        </span>
      </div>

      {/* 2. Serif Headline (Max 2 lines) */}
      <h2
        className={`text-2xl sm:text-4xl lg:text-[42px] font-serif font-bold tracking-tight leading-[1.12] line-clamp-2 ${
          isHold
            ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            : "text-[#0F172A] dark:text-[#F8FAFC]"
        }`}
      >
        {name}
      </h2>

      {/* 3. Description (Max 2 lines for tagline + 2 lines for oneLiner) */}
      <div className="space-y-1.5">
        <p
          className={`text-sm sm:text-base lg:text-lg font-medium leading-snug line-clamp-2 ${
            isHold
              ? "text-[#F1F5F9] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
              : "text-[#334155] dark:text-[#CBD5E1]"
          }`}
        >
          {tagline}
        </p>
        <p
          className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
            isHold
              ? "text-[#E2E8F0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
              : "text-[#64748B] dark:text-[#94A3B8]"
          }`}
        >
          {oneLiner}
        </p>
      </div>

      {/* 4. Exactly 3 Tag Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        {featuresList.slice(0, 3).map((feature: string, fIdx: number) => (
          <span
            key={fIdx}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shadow-xs ${
              isHold
                ? "bg-black/50 text-[#F8FAFC] border-white/20 backdrop-blur-md"
                : "bg-white/85 dark:bg-[#141720]/85 text-[#1E293B] dark:text-[#E2E8F0] border-black/10 dark:border-white/10 backdrop-blur-sm"
            }`}
          >
            <CheckCircle2
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: product.accentColor }}
            />
            <span className="truncate max-w-[240px] sm:max-w-[320px]">
              {feature}
            </span>
          </span>
        ))}
      </div>

      {/* 5. CTA Pill + Deep Dive Link */}
      <div className="pt-2 flex flex-wrap items-center gap-3">
        {product.status === "live" ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t.products.launchProduct}</span>
            <ArrowRight className="w-4 h-4 text-[#E05A38]" />
          </a>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs sm:text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
          >
            <span>{t.products.exploreDetails}</span>
            <ArrowRight className="w-4 h-4 text-[#E05A38]" />
          </Link>
        )}

        <Link
          href={`/products/${product.slug}`}
          className={`inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 border cursor-pointer ${
            isHold
              ? "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
              : "bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border-[var(--border-strong)] text-[var(--text-primary)] hover:shadow-sm"
          }`}
        >
          <span>{t.products.deepDive}</span>
          <ChevronRight className="w-4 h-4 opacity-70" />
        </Link>
      </div>
    </div>
  );
}
