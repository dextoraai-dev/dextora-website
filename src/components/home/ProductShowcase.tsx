"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInDepth } from "@/components/shared/ScrollAnimation";
import { Tilt3DCard } from "@/components/shared/Tilt3DCard";
import {
  GraduationCap,
  ShieldAlert,
  Kanban,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Users,
  Play,
  Pause,
  BrainCircuit,
  MessageSquareCode,
  TrendingUp,
  Languages,
  Tags,
  FileCheck,
  Globe,
  Target,
  MessageSquareQuote,
  MessagesSquare,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductShowcase() {
  const { t, locale } = useI18n();
  const isHi = locale === "hi";

  const sectionRef = useRef<HTMLElement>(null);

  // Tab state: 0 = Product 1, 1 = Product 2, 2 = Product 3, 3 = All 3 Together
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [autoProgress, setAutoProgress] = useState<number>(0);
  const hasAutoPlayedOnceRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isAllTogether = activeTab === 3;
  const currentProduct: Product = products[Math.min(activeTab, products.length - 1)] || products[0];

  // Helper to get product icon
  const getProductIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className={className} />;
      case "ShieldAlert":
        return <ShieldAlert className={className} />;
      case "Kanban":
        return <Kanban className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Helper to map deep feature icon
  const getFeatureIcon = (iconName: string) => {
    const props = { className: "w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand-terracotta)]" };
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit {...props} />;
      case "MessageSquareCode":
        return <MessageSquareCode {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "Languages":
        return <Languages {...props} />;
      case "Tags":
        return <Tags {...props} />;
      case "FileCheck":
        return <FileCheck {...props} />;
      case "Globe":
        return <Globe {...props} />;
      case "CheckCircle2":
        return <CheckCircle2 {...props} />;
      case "Target":
        return <Target {...props} />;
      case "MessageSquareQuote":
        return <MessageSquareQuote {...props} />;
      case "Kanban":
        return <Kanban {...props} />;
      case "MessagesSquare":
        return <MessagesSquare {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  // Helper to get product indicator color
  const getIndicatorColor = (idx: number) => {
    switch (idx) {
      case 0:
        return "#059669"; // Academic Emerald
      case 1:
        return "#D97706"; // Civil Services Amber
      case 2:
        return "#1E5E4B"; // Forest Pine
      default:
        return "var(--brand-terracotta)";
    }
  };

  // Auto-play stepper logic: plays 1 full cycle through all 3 products and stops at tab 3 ("All 3 Together")
  const advanceStep = useCallback(() => {
    setActiveTab((prev) => {
      if (prev >= 3) {
        setIsAutoPlaying(false);
        hasAutoPlayedOnceRef.current = true;
        return 3;
      }
      const next = prev + 1;
      if (next === 3) {
        setIsAutoPlaying(false);
        hasAutoPlayedOnceRef.current = true;
      }
      return next;
    });
    setAutoProgress(0);
  }, []);

  const prevStep = useCallback(() => {
    setActiveTab((prev) => Math.max(0, prev - 1));
    setAutoProgress(0);
  }, []);

  // Trigger 1-time auto-play when the section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !hasAutoPlayedOnceRef.current && activeTab === 0) {
          setIsAutoPlaying(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const STEP_DURATION = 5000; // 5 seconds per product step
    const INTERVAL = 50;

    progressIntervalRef.current = setInterval(() => {
      setAutoProgress((p) => {
        if (p >= 100) return 0;
        return p + (INTERVAL / STEP_DURATION) * 100;
      });
    }, INTERVAL);

    timerRef.current = setInterval(() => {
      advanceStep();
    }, STEP_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, advanceStep]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying((prev) => {
      const next = !prev;
      if (next && activeTab === 3) {
        // If restarting auto-play from the end, restart from the first product
        setActiveTab(0);
      }
      setAutoProgress(0);
      return next;
    });
  };

  // Tab select handler: manual interaction pauses auto-play
  const handleTabClick = (idx: number) => {
    setIsAutoPlaying(false);
    setActiveTab(idx);
    setAutoProgress(0);
  };

  return (
    <section
      ref={sectionRef}
      id="products-showcase"
      className="py-14 sm:py-20 bg-[var(--bg-base)] transition-colors overflow-hidden relative"
      style={{ perspective: "1400px" }}
    >
      {/* Grounded Brand Glow Background (Matches hero-glow in globals.css) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(217, 83, 47, 0.22) 0%, rgba(14, 41, 34, 0.12) 50%, transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <FadeInDepth>
          <SectionHeading
            badge={t.products.sectionBadge}
            badgeVariant="terracotta"
            title={t.products.title}
            subtitle={t.products.subtitle}
          />
        </FadeInDepth>

        {/* ── Tab Bar & Stepper Controls (Harmonized with Navbar & Site Theme) ────────────────────── */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between gap-3 p-1.5 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-sm">
          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {products.map((p, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => handleTabClick(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 relative ${
                    isActive
                      ? "bg-[#0E2922] dark:bg-[#18453A] text-[#F8F5EE] border border-[#235347] shadow-sm"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] dark:hover:bg-[#1F2533]"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getIndicatorColor(idx) }}
                  />
                  <span className="font-mono text-[11px] opacity-75">
                    0{idx + 1}
                  </span>
                  <span>{isHi ? p.nameHi || p.shortName : p.shortName}</span>
                </button>
              );
            })}

            {/* Tab 4: All 3 Together */}
            <button
              type="button"
              onClick={() => handleTabClick(3)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 relative ${
                isAllTogether
                  ? "bg-[var(--brand-terracotta)] text-white shadow-sm font-bold"
                  : "text-[var(--text-secondary)] hover:text-[var(--brand-terracotta)] hover:bg-[var(--bg-subtle)] dark:hover:bg-[#1F2533]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{isHi ? "तीनों उत्पाद एक साथ" : "All 3 Together"}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/20 text-white">
                3-in-1
              </span>
            </button>
          </div>

          {/* Stepper Controls: Prev / Next / Auto-Play */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={toggleAutoPlay}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isAutoPlaying
                  ? "bg-[var(--brand-terracotta)]/15 border-[var(--brand-terracotta)] text-[var(--brand-terracotta)]"
                  : "bg-[var(--bg-subtle)] dark:bg-[#1F2533] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
              title={isAutoPlaying ? "Pause Auto-Tour" : "Start Auto-Tour"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Auto-Tour</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1 border-l border-[var(--border-subtle)] pl-2">
              <button
                type="button"
                onClick={prevStep}
                disabled={activeTab === 0}
                aria-label="Previous product"
                className={`p-1.5 rounded-lg bg-[var(--bg-subtle)] dark:bg-[#1F2533] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors ${
                  activeTab === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] cursor-pointer"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={advanceStep}
                disabled={activeTab === 3}
                aria-label="Next product"
                className={`p-1.5 rounded-lg bg-[var(--bg-subtle)] dark:bg-[#1F2533] text-[var(--text-secondary)] border border-[var(--border-subtle)] transition-colors ${
                  activeTab === 3
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)] cursor-pointer"
                }`}
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Auto-Play Progress Bar */}
        {isAutoPlaying && (
          <div className="w-full h-1 bg-[var(--bg-subtle)] dark:bg-[#1F2533] rounded-full overflow-hidden mt-2">
            <motion.div
              className="h-full bg-[var(--brand-terracotta)]"
              style={{ width: `${autoProgress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        )}

        {/* ── Main Dynamic Stage (One-by-One vs All 3 Together) ─────────────── */}
        <div className="mt-5 sm:mt-6">
          <AnimatePresence mode="wait">
            {!isAllTogether ? (
              /* ── View A: ONE-BY-ONE FOCUSED PRODUCT DEEP DIVE ─────────────── */
              <motion.div
                key={currentProduct.slug}
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch"
              >
                {/* Left Column: Comprehensive Feature Breakdown */}
                <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-lg relative overflow-hidden">
                  {/* Subtle top-right decorative glow */}
                  <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[var(--brand-terracotta)]/8 blur-3xl pointer-events-none" />

                  <div className="space-y-4">
                    {/* Eyebrow & Status Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getIndicatorColor(activeTab) }}
                        />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--brand-terracotta)] font-bold">
                          {`Product 0${activeTab + 1} of 03 · Deep Feature Focus`}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {isHi ? currentProduct.statusBadgeHi || "लाइव" : currentProduct.statusBadge}
                        </span>
                        <span className="font-mono text-[11px] text-[var(--text-muted)] bg-[var(--bg-subtle)] dark:bg-[#1F2533] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                          Est. {currentProduct.launchYear}
                        </span>
                      </div>
                    </div>

                    {/* Headline & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                        {isHi ? currentProduct.nameHi || currentProduct.name : currentProduct.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[var(--brand-terracotta)] mt-1">
                        {isHi ? currentProduct.taglineHi || currentProduct.tagline : currentProduct.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mt-2 line-clamp-2">
                        {isHi ? currentProduct.oneLinerHi || currentProduct.description : currentProduct.description}
                      </p>
                    </div>

                    {/* Key Deep Features Grid (One by One Features) */}
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-[var(--brand-terracotta)]" />
                          <span>Detailed Capabilities</span>
                        </span>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">
                          {currentProduct.deepFeatures.length} Core Modules
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentProduct.deepFeatures.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="p-2.5 rounded-xl bg-[var(--bg-subtle)] dark:bg-[#191D28] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-all duration-200 group hover:shadow-xs"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="p-1.5 rounded-lg shrink-0 bg-[#0E2922]/8 dark:bg-[#14352D]/60 border border-[#0E2922]/15 dark:border-[#235347] group-hover:scale-105 transition-transform">
                                {getFeatureIcon(feat.iconName)}
                              </div>
                              <h4 className="font-bold text-xs text-[var(--text-primary)] leading-snug truncate">
                                {feat.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-0.5 line-clamp-2">
                              {feat.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact Stats Strip */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] dark:bg-[#10141D] border border-[var(--border-subtle)] text-center">
                        {currentProduct.stats.map((st, sIdx) => (
                          <div key={sIdx} className="space-y-0.5">
                            <span className="block font-mono font-bold text-sm sm:text-base text-[var(--text-primary)]">
                              {st.value}
                            </span>
                            <span className="block text-[10px] text-[var(--text-muted)] leading-tight truncate">
                              {st.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audience Pill */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-subtle)] dark:bg-[#191D28] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
                      <Users className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
                      <span className="truncate">
                        <strong className="text-[var(--text-primary)]">For: </strong>
                        {currentProduct.audience}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Next Step Stepper */}
                  <div className="pt-4 mt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2.5">
                      {/* Signature Forest Green CTA matching Navbar & CTASection */}
                      <a
                        href={currentProduct.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E2922] hover:bg-[#18453A] text-[#F8F5EE] border border-[#1A3F35] text-xs font-bold shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02] cursor-pointer"
                      >
                        <span>Launch Platform</span>
                        <ExternalLink className="w-3 h-3 text-[#E05A38]" />
                      </a>

                      <Link
                        href={`/products/${currentProduct.slug}`}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-semibold transition-colors"
                      >
                        <span>Specs & Architecture</span>
                        <ArrowRight className="w-3 h-3 text-[var(--brand-terracotta)]" />
                      </Link>
                    </div>

                    {/* Stepper button to next product or "All 3 Together" */}
                    <button
                      type="button"
                      onClick={() => handleTabClick(activeTab === 2 ? 3 : activeTab + 1)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--brand-terracotta)] hover:bg-[var(--brand-terracotta-hover)] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer ml-auto"
                    >
                      {activeTab === 2 ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          <span>See All 3 Products Together</span>
                        </>
                      ) : (
                        <>
                          <span>Next: {products[activeTab + 1]?.shortName}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Column: 3D Interactive Visual Stage */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <Tilt3DCard
                    className="h-full"
                    glowColor="rgba(224, 90, 56, 0.20)"
                    shimmer
                    maxTilt={10}
                    hoverScale={1.015}
                  >
                    <div
                      className="h-full rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-4 sm:p-5 flex flex-col justify-between shadow-xl relative overflow-hidden"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Product Preview Image */}
                      <div
                        className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[var(--bg-subtle)] dark:bg-[#191D28] border border-[var(--border-subtle)] shadow-inner"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {currentProduct.image ? (
                          <Image
                            src={currentProduct.image.src}
                            alt={currentProduct.image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover transition-transform duration-700 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center space-y-1.5">
                            <div className="p-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] shadow-md border border-[var(--border-subtle)]">
                              {getProductIcon(currentProduct.icon, "w-6 h-6 text-[var(--brand-terracotta)]")}
                            </div>
                            <span className="text-[11px] text-[var(--text-muted)]">Interface Preview</span>
                          </div>
                        )}

                        {/* Floating live tag (Signature Forest Green pill) */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0E2922]/90 text-[#F8F5EE] border border-[#235347] backdrop-blur-md shadow-sm">
                          {currentProduct.shortName} Live UI
                        </div>
                      </div>

                      {/* Highlights checklist */}
                      <div className="space-y-2 mt-4" style={{ transform: "translateZ(6px)" }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                          Architectural Safeguards
                        </span>
                        {currentProduct.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text-primary)] leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quick jump pills to jump between products */}
                      <div
                        className="pt-3.5 mt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between"
                        style={{ transform: "translateZ(4px)" }}
                      >
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          Quick Switch:
                        </span>
                        <div className="flex items-center gap-1.5">
                          {products.map((p, pIdx) => (
                            <button
                              key={p.slug}
                              type="button"
                              onClick={() => handleTabClick(pIdx)}
                              className={`w-5 h-5 rounded-full text-[9px] font-mono font-bold transition-all cursor-pointer ${
                                activeTab === pIdx
                                  ? "bg-[#0E2922] dark:bg-[#18453A] text-[#F8F5EE] ring-2 ring-[var(--brand-terracotta)] scale-110"
                                  : "bg-[var(--bg-subtle)] dark:bg-[#1F2533] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                              title={p.name}
                            >
                              0{pIdx + 1}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => handleTabClick(3)}
                            className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-[var(--brand-terracotta)] text-white hover:scale-105 transition-all cursor-pointer ml-1"
                            title="Compare All 3 Together"
                          >
                            All 3
                          </button>
                        </div>
                      </div>
                    </div>
                  </Tilt3DCard>
                </div>
              </motion.div>
            ) : (
              /* ── View B: ALL 3 PRODUCTS TOGETHER (UNIFIED 3D ECOSYSTEM) ──── */
              <motion.div
                key="all-three-together"
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-5"
              >
                {/* Intro Banner for All 3 Together (Forest Green Theme matching CTASection) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0E2922] text-[#F8F5EE] border border-[#1A3F35] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden">
                  {/* Pulsating background ambient glow */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 rounded-full bg-[#E05A38]/20 blur-3xl pointer-events-none" />

                  <div className="space-y-1 text-center md:text-left relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#18453A] text-[#E2DBD0] border border-[#235347]">
                      <Sparkles className="w-3 h-3 text-[#E05A38]" />
                      <span>Unified Architecture · All 3 Engines Side-by-Side</span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#F8F5EE]">
                      3 Specialized Engines Working in Synchrony
                    </h3>
                    <p className="text-xs text-[#A3B8B2] max-w-2xl line-clamp-1 sm:line-clamp-none">
                      From foundational K-12 academic mastery to Civil Services excellence and automated institutional workflows.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTabClick(0)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#F8F5EE] border border-[#235347] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0 relative z-10"
                  >
                    <ArrowLeft className="w-3 h-3 text-[#E05A38]" />
                    <span>Explore One-by-One</span>
                  </button>
                </div>

                {/* All 3 Product Cards in 3D Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                  {products.map((product) => (
                    <div key={product.slug} className="h-full">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Shared Cognitive Infrastructure Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex items-start gap-2.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">
                        Zero Generic Hallucination
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        Strict syllabus alignment and verified exam rubrics guarantee factually grounded answers.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex items-start gap-2.5 shadow-xs">
                    <Languages className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">
                        Native Bilingual Parity
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        Pure bilingual architecture engineered for Hindi and English mediums with equal precision.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex items-start gap-2.5 shadow-xs">
                    <BrainCircuit className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-[var(--text-primary)]">
                        Socratic Cognitive Pedagogy
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        First-principles guided hints stimulate critical reasoning instead of passive memorization.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Explorer Action Link */}
        <FadeInDepth delay={0.2} className="mt-14 text-center">
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:shadow-lg"
            >
              <span>Compare all products & technical specifications</span>
              <ArrowRight className="w-4 h-4 text-[var(--brand-terracotta)]" />
            </Link>
          </motion.div>
        </FadeInDepth>
      </div>
    </section>
  );
}
