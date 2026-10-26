"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { TranslationDictionary, Locale } from "@/data/translations";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Compass,
  Radio,
  TrendingUp,
} from "lucide-react";

interface JourneyTextProps {
  product: Product;
  index: number;
  chapterProgress: number; // 0..1 continuous progress inside this chapter
  locale: Locale;
  t: TranslationDictionary;
}

export function JourneyText({
  product,
  index,
  chapterProgress,
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

  // Continuous narrative phases based on chapterProgress
  // Phase 1 (0.00 - 0.35): Aerial Approach & Vision
  // Phase 2 (0.35 - 0.75): Core Learning Architecture & Immersion
  // Phase 3 (0.75 - 1.00): Arrival, Performance Payoff & Launch Actions
  const isApproach = chapterProgress < 0.35;
  const isImmersion = chapterProgress >= 0.35 && chapterProgress < 0.75;
  const isArrival = chapterProgress >= 0.75;

  // Dynamic telemetry altitude label
  let altitudeLabel = isHi
    ? "ऊंचाई: 450 मी · हवाई दृश्य"
    : "ALTITUDE: 450M · AERIAL APPROACH";
  if (isImmersion) {
    altitudeLabel = isHi
      ? "ऊंचाई: 15 मी · गहन कार्यस्थल"
      : "ALTITUDE: 15M · DEEP IMMERSION";
  } else if (isArrival) {
    altitudeLabel = isHi
      ? "ऊंचाई: 0 मी · प्लेटफ़ॉर्म तैयार"
      : "ALTITUDE: 0M · PLATFORM READY";
  }

  // Key primary stat to highlight
  const primaryStat = product.stats?.[0] || {
    value: "94%",
    label: "Retention Rate",
  };

  return (
    <div className="relative w-full max-w-[540px] select-text">
      <div className="relative z-10 space-y-4 sm:space-y-5 text-left">
        {/* 1. Header Badges: Eyebrow + Altitude Telemetry + Live Status */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* Product Eyebrow */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-white shadow-sm tracking-wider uppercase text-[11px]"
            style={{ backgroundColor: product.accentColor }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{eyebrow}</span>
          </span>

          {/* Altitude Telemetry Pill */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
            <Compass className="w-3 h-3 text-[var(--brand-terracotta)] animate-spin-slow" />
            <span>{altitudeLabel}</span>
          </span>

          {/* Live Indicator */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/25">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>{product.status === "live" ? t.products.live : t.products.comingSoon}</span>
          </span>
        </div>

        {/* 2. Serif Headline & Tagline */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-serif font-bold tracking-tight leading-[1.14] text-white drop-shadow-sm">
            {name}
          </h2>
          <p className="text-sm sm:text-base font-medium text-white/85 leading-snug drop-shadow-sm">
            {tagline}
          </p>
        </div>

        {/* 3. Continuous Narrative Content (Seamlessly Adapts With Camera Dive) */}
        <div className="relative min-h-[96px] sm:min-h-[110px]">
          {/* Approach Vision Description (Smoothly eases out during deep dive) */}
          <div
            className={`transition-all duration-500 ease-out ${isApproach
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3 pointer-events-none absolute inset-0"
              }`}
          >
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed drop-shadow-sm">
              {oneLiner}
            </p>
            <div className="pt-3 flex items-center gap-2 text-xs font-medium text-white/80">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-white/90">
                {product.audience.split(",")[0]}
              </span>
              <span className="text-[11px] text-[var(--brand-terracotta)] font-semibold flex items-center gap-1">
                <span>{isHi ? "कैमरा नीचे उतर रहा है" : "Camera gliding inside"}</span>
                <span className="inline-block animate-bounce">↓</span>
              </span>
            </div>
          </div>

          {/* Core Learning Breakthroughs (Active during immersion & arrival) */}
          <div
            className={`transition-all duration-500 ease-out ${!isApproach
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none absolute inset-0"
              }`}
          >
            <div className="space-y-2">
              {featuresList.map((feat: string, fIdx: number) => (
                <div
                  key={fIdx}
                  className="flex items-start gap-2 text-xs sm:text-[13px] text-white/90 font-medium leading-snug drop-shadow-sm"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5 transition-colors"
                    style={{ color: product.accentColor }}
                  />
                  <span className="line-clamp-2">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Live Metric Highlight Bar */}
        <div className="pt-1 flex items-center justify-between border-t border-white/15 text-xs">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-bold text-white font-mono text-sm">
              {primaryStat.value}
            </span>
            <span className="text-white/70 text-[11px]">
              {primaryStat.label}
            </span>
          </div>

          <span className="font-mono text-[10px] text-white/60">
            {product.launchYear} · {product.languages.join("/")}
          </span>
        </div>

        {/* 5. Interactive Action CTAs (Always Accessible with High-Visibility Glow) */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {product.status === "live" ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden"
              style={{ backgroundColor: product.accentColor }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{t.products.launchProduct}</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden"
              style={{ backgroundColor: product.accentColor }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">{t.products.exploreDetails}</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:shadow-sm cursor-pointer backdrop-blur-sm"
          >
            <span>{t.products.deepDive}</span>
            <ChevronRight className="w-4 h-4 opacity-70" />
          </Link>
        </div>
      </div>
    </div>
  );
}
