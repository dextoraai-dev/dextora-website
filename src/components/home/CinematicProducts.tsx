"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { FrameSequenceCanvas } from "./FrameSequenceCanvas";
import {
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  RotateCw,
} from "lucide-react";

// Safe client-side reduced-motion listener
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const CHAPTER_SLUGS = ["dextora-learn", "dhyeya-ias", "dextora-campus"];

const CHAPTER_EYEBROWS: Record<string, { en: string; hi: string }> = {
  "dextora-learn": {
    en: "01 · LEARN EVERY CHAPTER",
    hi: "01 · हर अध्याय सीखें",
  },
  "dhyeya-ias": {
    en: "02 · SYNTHESIZE CURRENT AFFAIRS",
    hi: "02 · समसामयिकी विश्लेषण",
  },
  "dextora-campus": {
    en: "03 · OPERATE THE CAMPUS",
    hi: "03 · संस्थागत संचालन",
  },
};

interface CloudBlob {
  x: string;
  y: string;
  w: string;
  h: string;
  colorLight: string;
  colorDark: string;
  speed: number;
}

const CLOUD_BLOBS: CloudBlob[] = [
  {
    x: "10%",
    y: "15%",
    w: "420px",
    h: "420px",
    colorLight: "rgba(235, 215, 195, 0.45)",
    colorDark: "rgba(30, 45, 40, 0.3)",
    speed: 0.08,
  },
  {
    x: "70%",
    y: "20%",
    w: "500px",
    h: "500px",
    colorLight: "rgba(240, 220, 210, 0.4)",
    colorDark: "rgba(45, 30, 40, 0.25)",
    speed: -0.12,
  },
  {
    x: "40%",
    y: "65%",
    w: "460px",
    h: "460px",
    colorLight: "rgba(225, 235, 225, 0.35)",
    colorDark: "rgba(25, 35, 45, 0.3)",
    speed: 0.15,
  },
  {
    x: "85%",
    y: "75%",
    w: "380px",
    h: "380px",
    colorLight: "rgba(245, 225, 205, 0.35)",
    colorDark: "rgba(35, 25, 30, 0.2)",
    speed: -0.09,
  },
];

interface BubbleConfig {
  x: string;
  y: string;
  size: number;
  speed: number;
  opacity: number;
}

const GLASS_BUBBLES: BubbleConfig[] = [
  { x: "18%", y: "22%", size: 68, speed: 65, opacity: 0.75 },
  { x: "82%", y: "28%", size: 52, speed: -75, opacity: 0.8 },
  { x: "28%", y: "78%", size: 84, speed: 55, opacity: 0.7 },
  { x: "76%", y: "72%", size: 60, speed: -50, opacity: 0.75 },
  { x: "55%", y: "15%", size: 40, speed: 90, opacity: 0.65 },
  { x: "88%", y: "50%", size: 46, speed: -60, opacity: 0.7 },
  { x: "12%", y: "55%", size: 58, speed: 80, opacity: 0.65 },
];

export function CinematicProducts() {
  const { locale, t } = useI18n();
  const isHi = locale === "hi";
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const chapters: Product[] = CHAPTER_SLUGS.map(
    (slug) => products.find((p) => p.slug === slug)!
  ).filter(Boolean);

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const rafId = useRef<number | null>(null);

  // IntersectionObserver to pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Update raw scroll target from viewport offset
  const handleScroll = useCallback(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollable = rect.height - windowHeight;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    targetProgressRef.current = progress;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, prefersReducedMotion]);

  // Unified single-lerp RAF loop driving smoothedProgress
  useEffect(() => {
    if (prefersReducedMotion || !isIntersecting) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    const LERP_FACTOR = 0.14; // Smooth, jitter-free progression

    const animateLoop = () => {
      const targetP = targetProgressRef.current;
      const currentP = smoothedProgressRef.current;
      const diffP = targetP - currentP;

      if (Math.abs(diffP) > 0.0001) {
        const nextP = currentP + diffP * LERP_FACTOR;
        smoothedProgressRef.current = nextP;
        setSmoothedProgress(nextP);

        // Update active chapter index
        const numChapters = chapters.length;
        const chapterSpan = 1 / numChapters;
        const rawIdx = Math.floor(nextP / chapterSpan);
        const activeIdx = Math.max(0, Math.min(numChapters - 1, rawIdx));
        setActiveChapterIdx(activeIdx);
      }

      rafId.current = requestAnimationFrame(animateLoop);
    };

    rafId.current = requestAnimationFrame(animateLoop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [chapters.length, isIntersecting, prefersReducedMotion]);

  // Smooth scroll to chapter
  const scrollToChapter = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const chapterSpan = 1 / chapters.length;

    const targetProgress = idx * chapterSpan + 0.005;
    const targetScrollY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Chapter state math for Chapter idx
  const getChapterState = (idx: number) => {
    const chapterSpan = 1 / chapters.length;
    const chapterStart = idx * chapterSpan;
    const p = Math.max(0, Math.min(1, (smoothedProgress - chapterStart) / chapterSpan));

    // Visibility window
    const distFromCenter = Math.abs(smoothedProgress - (chapterStart + chapterSpan / 2));
    const isVisible = distFromCenter < chapterSpan * 0.65;

    // Flow:
    // p 0.00-0.15: Hold frame 1 (the diorama) with left text visible
    // p 0.15-0.80: Play frame sequence 0 -> 1 (the dive)
    // p 0.80-0.92: Hold final frame with copy fading in
    // p 0.92-1.00: Crossfade to next chapter
    let sequenceProgress = 0;
    let canvasOpacity = 1.0;
    let textOpacity = 0;
    let textTranslateY = 0;

    if (p <= 0.15) {
      sequenceProgress = 0;
      canvasOpacity = 1.0;
      textOpacity = 1.0;
      textTranslateY = 0;
    } else if (p <= 0.8) {
      sequenceProgress = (p - 0.15) / 0.65;
      canvasOpacity = 1.0;
      // Text fades out during the dive
      const diveProgress = (p - 0.15) / 0.65;
      textOpacity = Math.max(0, 1.0 - diveProgress * 2.5);
      textTranslateY = -diveProgress * 15;
    } else if (p <= 0.92) {
      sequenceProgress = 1.0;
      canvasOpacity = 1.0;
      // Text fades back in with final resolution
      const holdProgress = (p - 0.8) / 0.12;
      textOpacity = Math.min(1, holdProgress * 2.0);
      textTranslateY = (1 - Math.min(1, holdProgress * 2.0)) * 18;
    } else {
      // Crossfade to next chapter
      sequenceProgress = 1.0;
      const crossfade = (p - 0.92) / 0.08;
      canvasOpacity = Math.max(0, 1.0 - crossfade);
      textOpacity = Math.max(0, 1.0 - crossfade * 2.0);
      textTranslateY = -crossfade * 12;
    }

    return {
      p,
      isVisible,
      sequenceProgress,
      canvasOpacity,
      textOpacity,
      textTranslateY,
    };
  };

  // -------------------------------------------------------------
  // ACCESSIBLE FALLBACK FOR PREFERS-REDUCED-MOTION (Stacked Cards)
  // -------------------------------------------------------------
  if (prefersReducedMotion) {
    return (
      <section
        className="py-20 bg-[var(--bg-base)] transition-colors relative"
        aria-label="Dextora Product Journey"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--brand-terracotta)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHi ? "सिनेमैटिक उत्पाद यात्रा" : "The Product Journey"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)]">
              {isHi
                ? "प्रत्येक शैक्षणिक पड़ाव के लिए समर्पित AI समाधान"
                : "Engineered for Every Stage of Learning"}
            </h2>
          </div>

          <div className="space-y-14">
            {chapters.map((product, idx) => {
              const name = (isHi && product.nameHi) || product.name;
              const tagline = (isHi && product.taglineHi) || product.tagline;
              const oneLiner = (isHi && product.oneLinerHi) || product.oneLiner;
              const featuresList =
                (isHi && product.featuresHi) || product.features.slice(0, 3);
              const dioramaSrc = `/cinematic/${product.slug}/diorama.png`;
              const sceneSrc = `/cinematic/${product.slug}/scene.png`;
              const eyebrow =
                CHAPTER_EYEBROWS[product.slug]?.[isHi ? "hi" : "en"] ||
                `0${idx + 1} · ${product.shortName.toUpperCase()}`;

              return (
                <div
                  key={product.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-xl"
                >
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                        style={{ backgroundColor: product.accentColor }}
                      >
                        {eyebrow}
                      </span>
                      <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">
                        {product.statusBadge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                      {name}
                    </h3>

                    <p className="text-sm sm:text-base font-medium text-[var(--text-secondary)]">
                      {tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      {oneLiner}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {featuresList.map((feat: string, fIdx: number) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 shrink-0"
                            style={{ color: product.accentColor }}
                          />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {product.status === "live" ? (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
                        >
                          <span>{t.products.launchProduct}</span>
                          <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                        </a>
                      ) : (
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
                        >
                          <span>{t.products.exploreDetails}</span>
                          <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                        </Link>
                      )}

                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm font-semibold text-[var(--text-primary)] transition-colors"
                      >
                        <span>Deep Dive</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm bg-[var(--bg-subtle)]">
                      <Image
                        src={dioramaSrc}
                        alt={`${name} isometric diorama`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm bg-[var(--bg-subtle)]">
                      <Image
                        src={sceneSrc}
                        alt={`${name} photoreal scene`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------
  // FULL-BLEED RETINA CANVAS PINNED STAGE (400vh per chapter)
  // -------------------------------------------------------------
  const activeProduct = chapters[activeChapterIdx] || chapters[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--bg-base)] transition-colors"
      style={{ height: `${chapters.length * 400}vh` }}
      aria-label="Cinematic Product Journey"
    >
      {/* Sticky Full-Viewport Stage: 100vw x 100dvh, z-10 beneath Navbar z-40 */}
      <div className="sticky top-0 w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0C0E12]">
        {/* Layer 1: Ambient Background Color Gradient */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F0] via-[#F6ECE2] to-[#ECE1D5] dark:from-[#0C0E12] dark:via-[#11141B] dark:to-[#171B24] transition-colors duration-500" />

          {/* Parallax Cloud Blobs */}
          {CLOUD_BLOBS.map((blob, cIdx) => {
            const parallaxX = (smoothedProgress - 0.5) * blob.speed * 400;
            const parallaxY = (smoothedProgress - 0.5) * blob.speed * 250;
            return (
              <div
                key={cIdx}
                className="absolute rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
                style={{
                  left: blob.x,
                  top: blob.y,
                  width: blob.w,
                  height: blob.h,
                  backgroundColor: blob.colorLight,
                  transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                }}
              />
            );
          })}
        </div>

        {/* Layer 2: FULL-BLEED RETINA WEBP IMAGE SEQUENCE CANVAS */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden select-none pointer-events-none">
          {chapters.map((product, idx) => {
            const state = getChapterState(idx);
            const isActive = idx === activeChapterIdx;
            const isNext = idx === activeChapterIdx + 1;
            const priority = isActive ? "high" : isNext ? "normal" : "low";

            if (!state.isVisible && !isActive && !isNext) return null;

            return (
              <div
                key={product.slug}
                className="absolute inset-0 w-full h-full transition-opacity duration-200 ease-out"
                style={{
                  opacity: state.canvasOpacity,
                  zIndex: isActive ? 5 : 2,
                }}
                aria-hidden="true"
              >
                <FrameSequenceCanvas
                  slug={product.slug}
                  progress={state.sequenceProgress}
                  active={state.isVisible || isActive}
                  preloadPriority={priority}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Soft Gradient Scrim behind text for WCAG AA contrast */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[var(--bg-base)] via-[var(--bg-base)]/95 via-35% sm:via-[var(--bg-base)]/85 sm:via-45% to-transparent to-75% dark:from-[#0C0E12] dark:via-[#0C0E12]/95 dark:via-35% dark:sm:via-[#0C0E12]/85 dark:sm:via-50% dark:to-transparent dark:to-80% pointer-events-none transition-colors duration-300" />

        {/* Top/bottom soft feathering gradients */}
        <div className="absolute inset-x-0 top-0 h-28 z-[3] bg-gradient-to-b from-[var(--bg-base)]/90 dark:from-[#0C0E12]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 z-[3] bg-gradient-to-t from-[var(--bg-base)]/90 dark:from-[#0C0E12]/90 to-transparent pointer-events-none" />

        {/* Layer 4: Parallax Glass Bubbles */}
        <div className="absolute inset-0 z-[4] pointer-events-none select-none overflow-hidden">
          {GLASS_BUBBLES.map((b, bIdx) => {
            const parallaxY = (smoothedProgress - 0.5) * b.speed * 3.5;
            return (
              <div
                key={bIdx}
                className="absolute rounded-full border border-white/60 dark:border-white/15 shadow-md backdrop-blur-md transition-transform duration-300 ease-out"
                style={{
                  left: b.x,
                  top: b.y,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  transform: `translateY(${parallaxY}px)`,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.75), rgba(255,255,255,0.18) 65%, rgba(255,255,255,0.06))",
                  opacity: b.opacity,
                }}
              >
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-white/85 blur-[0.5px]" />
              </div>
            );
          })}
        </div>

        {/* Layer 5: Left Third Copy & Right Chapter Index */}
        <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-between pointer-events-none">
          {/* Left Third: Active Chapter Story Copy */}
          <div className="max-w-xl w-full py-12 pointer-events-auto text-left">
            {chapters.map((product, idx) => {
              const state = getChapterState(idx);
              if (!state.isVisible || state.textOpacity <= 0.01) return null;

              const name = (isHi && product.nameHi) || product.name;
              const tagline = (isHi && product.taglineHi) || product.tagline;
              const oneLiner = (isHi && product.oneLinerHi) || product.oneLiner;
              const featuresList =
                (isHi && product.featuresHi) || product.features.slice(0, 3);
              const eyebrow =
                CHAPTER_EYEBROWS[product.slug]?.[isHi ? "hi" : "en"] ||
                `0${idx + 1} · ${product.shortName.toUpperCase()}`;

              return (
                <div
                  key={product.slug}
                  className="space-y-6 transition-all duration-200 ease-out"
                  style={{
                    opacity: state.textOpacity,
                    transform: `translateY(${state.textTranslateY}px)`,
                  }}
                >
                  {/* Eyebrow: "01 · LEARN EVERY CHAPTER" */}
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                      style={{ backgroundColor: product.accentColor }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{eyebrow}</span>
                    </span>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--bg-surface)] dark:bg-[#1A1F2C] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {product.status === "live"
                        ? isHi
                          ? "लाइव"
                          : "Live"
                        : isHi
                        ? "शीघ्र"
                        : "Coming Soon"}
                    </span>
                  </div>

                  {/* Serif Headline */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
                    {name}
                  </h2>

                  {/* 2-Line Description */}
                  <p className="text-base sm:text-lg text-[var(--text-secondary)] font-medium leading-snug">
                    {tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {oneLiner}
                  </p>

                  {/* 3 Tag Chips as Small Rounded Outline Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {featuresList.map((feature: string, fIdx: number) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium border border-[var(--border-strong)]/60 bg-[var(--bg-surface)]/80 dark:bg-[#141720]/80 backdrop-blur-sm text-[var(--text-secondary)] shadow-xs"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: product.accentColor }}
                        />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>

                  {/* Dark Pill CTA with Arrow + Deep Dive Secondary Link */}
                  <div className="pt-3 flex flex-wrap items-center gap-3.5">
                    {product.status === "live" ? (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{t.products.launchProduct}</span>
                        <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                      </a>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{t.products.exploreDetails}</span>
                        <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                      </Link>
                    )}

                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all duration-200 hover:shadow-sm cursor-pointer"
                    >
                      <span>Deep Dive</span>
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Edge: Vertical Numbered Chapter Index */}
          <div className="hidden md:flex flex-col items-end gap-5 pointer-events-auto select-none pl-6">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)]/90 dark:bg-[#141720]/90 backdrop-blur-md border border-[var(--border-subtle)] shadow-xl space-y-3.5">
              <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider block px-1">
                Chapters
              </span>

              <div className="flex flex-col gap-2">
                {chapters.map((product, idx) => {
                  const isCurrent = idx === activeChapterIdx;

                  return (
                    <button
                      key={product.slug}
                      type="button"
                      onClick={() => scrollToChapter(idx)}
                      aria-label={`Scroll to Chapter 0${idx + 1}: ${product.name}`}
                      className={`group flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 text-left ${
                        isCurrent
                          ? "bg-[var(--bg-subtle)] text-[var(--text-primary)] opacity-100 shadow-sm font-bold"
                          : "text-[var(--text-secondary)] opacity-40 hover:opacity-80 hover:bg-[var(--bg-subtle)]/50"
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      <span
                        className={`w-1.5 h-4 rounded-full transition-all duration-300 shrink-0 ${
                          isCurrent ? "scale-100" : "opacity-0 scale-50"
                        }`}
                        style={{
                          backgroundColor: product.accentColor,
                          boxShadow: isCurrent
                            ? `0 0 8px ${product.accentColor}99`
                            : undefined,
                        }}
                      />

                      <span className="font-mono text-[11px]">0{idx + 1}</span>
                      <span className="truncate max-w-[135px]">{product.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Scroll prompt */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] px-1">
                <span>Scroll story</span>
                <RotateCw className="w-3 h-3 animate-spin text-[var(--brand-terracotta)] duration-1000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
