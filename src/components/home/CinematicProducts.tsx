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
import { JourneyText } from "./JourneyText";
import { Sparkles, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";

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

// ============================================================================
// SINGLE STATE MACHINE CONSTANTS & TYPES
// ============================================================================
export type JourneyPhase = "rest" | "dive" | "hold" | "exit";

export interface JourneyState {
  chapter: number; // 0 | 1 | 2
  phase: JourneyPhase;
  t: number; // 0..1 progress within current phase
  chapterProgress: number; // 0..1 within current chapter
  sequenceProgress: number; // 0..1 for FrameSequenceCanvas
  globalProgress: number; // 0..1
}

export const PHASE_BOUNDARIES = {
  rest: [0.0, 0.22] as const,
  dive: [0.22, 0.72] as const,
  hold: [0.72, 0.90] as const,
  exit: [0.90, 1.00] as const,
};

/**
 * Pure state machine function computing current chapter, phase, and sub-progress
 * from a single smoothed scroll progress value.
 */
export function computeJourneyState(
  globalProgress: number,
  totalChapters: number
): JourneyState {
  const clamped = Math.max(0, Math.min(0.999999, globalProgress));
  const chapterSpan = 1 / totalChapters;
  const chapter = Math.min(
    totalChapters - 1,
    Math.max(0, Math.floor(clamped / chapterSpan))
  );
  const chapterProgress = (clamped - chapter * chapterSpan) / chapterSpan;

  let phase: JourneyPhase = "rest";
  let t = 0;
  let sequenceProgress = 0;

  if (chapterProgress < PHASE_BOUNDARIES.dive[0]) {
    phase = "rest";
    const [start, end] = PHASE_BOUNDARIES.rest;
    t = Math.max(0, Math.min(1, (chapterProgress - start) / (end - start)));
    sequenceProgress = 0;
  } else if (chapterProgress < PHASE_BOUNDARIES.hold[0]) {
    phase = "dive";
    const [start, end] = PHASE_BOUNDARIES.dive;
    t = Math.max(0, Math.min(1, (chapterProgress - start) / (end - start)));
    sequenceProgress = t;
  } else if (chapterProgress < PHASE_BOUNDARIES.exit[0]) {
    phase = "hold";
    const [start, end] = PHASE_BOUNDARIES.hold;
    t = Math.max(0, Math.min(1, (chapterProgress - start) / (end - start)));
    sequenceProgress = 1;
  } else {
    phase = "exit";
    const [start, end] = PHASE_BOUNDARIES.exit;
    t = Math.max(0, Math.min(1, (chapterProgress - start) / (end - start)));
    sequenceProgress = 1;
  }

  return {
    chapter,
    phase,
    t,
    chapterProgress,
    sequenceProgress,
    globalProgress: clamped,
  };
}

/**
 * Computes exact text visibility, opacity, and non-continuous translateY.
 * Fade in over first 25% of the phase, hold in middle, fade out over last 25%.
 * Hidden in "dive" and "exit".
 */
export function computeTextAnimation(state: JourneyState) {
  const { phase, t } = state;
  if (phase === "rest" || phase === "hold") {
    let opacity = 0;
    let translateY = 0;
    if (t <= 0.25) {
      const p = t / 0.25;
      opacity = p;
      translateY = (1 - p) * 12;
    } else if (t >= 0.75) {
      const p = (t - 0.75) / 0.25;
      opacity = 1 - p;
      translateY = -p * 12;
    } else {
      opacity = 1;
      translateY = 0;
    }

    return {
      visible: opacity > 0.005,
      opacity,
      translateY,
      phase,
    };
  }

  return {
    visible: false,
    opacity: 0,
    translateY: 0,
    phase: null as "rest" | "hold" | null,
  };
}

// Background decorative elements
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
  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const rafId = useRef<number | null>(null);

  // IntersectionObserver to pause RAF when off-screen
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

    const LERP_FACTOR = 0.14;

    const animateLoop = () => {
      const targetP = targetProgressRef.current;
      const currentP = smoothedProgressRef.current;
      const diffP = targetP - currentP;

      if (Math.abs(diffP) > 0.0001) {
        const nextP = currentP + diffP * LERP_FACTOR;
        smoothedProgressRef.current = nextP;
        setSmoothedProgress(nextP);
      }

      rafId.current = requestAnimationFrame(animateLoop);
    };

    rafId.current = requestAnimationFrame(animateLoop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isIntersecting, prefersReducedMotion]);

  // Smooth scroll to chapter
  const scrollToChapter = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const chapterSpan = 1 / chapters.length;

    const targetProgress = idx * chapterSpan + 0.01;
    const targetScrollY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Derive Single Source of Truth JourneyState
  const journeyState = computeJourneyState(smoothedProgress, chapters.length);
  const textAnim = computeTextAnimation(journeyState);
  const activeProduct = chapters[journeyState.chapter];

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
                t.products.chapterEyebrows?.[
                  product.slug as keyof typeof t.products.chapterEyebrows
                ] || `0${idx + 1} · ${product.shortName.toUpperCase()}`;

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
                        {product.status === "live"
                          ? t.products.live
                          : t.products.comingSoon}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
                      {name}
                    </h2>

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
                        <span>{t.products.deepDive}</span>
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
  // FULL-BLEED RETINA CANVAS PINNED STAGE (350vh per chapter)
  // -------------------------------------------------------------
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--bg-base)] transition-colors"
      style={{ height: `${chapters.length * 350}vh` }}
      aria-label="Cinematic Product Journey"
    >
      {/* Sticky Full-Viewport Stage: 100vw x 100dvh, z-10 beneath Navbar z-40 */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0C0E12]">
        {/* Layer 1: Ambient Background Color Gradient & Cloud Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F0] via-[#F6ECE2] to-[#ECE1D5] dark:from-[#0C0E12] dark:via-[#11141B] dark:to-[#171B24] transition-colors duration-500" />

          {/* Parallax Cloud Blobs */}
          {CLOUD_BLOBS.map((blob, cIdx) => {
            const parallaxX = (smoothedProgress - 0.5) * blob.speed * 350;
            const parallaxY = (smoothedProgress - 0.5) * blob.speed * 200;
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
                  transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
                }}
              />
            );
          })}
        </div>

        {/* Layer 2: FULL-BLEED RETINA WEBP IMAGE SEQUENCE CANVASES */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden select-none pointer-events-none">
          {chapters.map((product, idx) => {
            const isCurrent = idx === journeyState.chapter;
            const isNext = idx === journeyState.chapter + 1;
            const isPrevious = idx === journeyState.chapter - 1;

            let canvasOpacity = 0;
            let sequenceProg = 0;
            let isActive = false;

            if (isCurrent) {
              isActive = true;
              if (journeyState.phase === "exit") {
                canvasOpacity = Math.max(0, 1.0 - journeyState.t);
                sequenceProg = 1.0;
              } else {
                canvasOpacity = 1.0;
                sequenceProg = journeyState.sequenceProgress;
              }
            } else if (isNext && journeyState.phase === "exit") {
              isActive = true;
              canvasOpacity = Math.min(1.0, journeyState.t);
              sequenceProg = 0;
            }

            if (!isActive && !isCurrent && !isNext && !isPrevious) return null;

            return (
              <div
                key={product.slug}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: canvasOpacity,
                  zIndex: isCurrent ? 5 : 2,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <FrameSequenceCanvas
                  slug={product.slug}
                  progress={sequenceProg}
                  active={isActive || isCurrent}
                  preloadPriority={isCurrent ? "high" : isNext ? "normal" : "low"}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Left-Edge Adaptive Contrast Scrims (No washed-out overlays) */}
        {/* Photoreal Scrim (For Hold and Dive phases) */}
        <div
          className={`absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300 ${
            journeyState.phase === "hold" || journeyState.phase === "dive"
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to right, rgba(14, 16, 20, 0.88) 0%, rgba(14, 16, 20, 0.65) 38%, rgba(14, 16, 20, 0.15) 55%, transparent 72%)",
          }}
        />

        {/* Diorama Scrim (For Rest phase) */}
        <div
          className={`absolute inset-0 z-[3] pointer-events-none transition-opacity duration-300 ${
            journeyState.phase === "rest" ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full dark:hidden"
            style={{
              background:
                "linear-gradient(to right, rgba(250, 247, 240, 0.94) 0%, rgba(250, 247, 240, 0.78) 38%, rgba(250, 247, 240, 0.20) 58%, transparent 72%)",
            }}
          />
          <div
            className="w-full h-full hidden dark:block"
            style={{
              background:
                "linear-gradient(to right, rgba(12, 14, 18, 0.92) 0%, rgba(12, 14, 18, 0.72) 38%, rgba(12, 14, 18, 0.20) 58%, transparent 72%)",
            }}
          />
        </div>

        {/* Mobile Bottom Scrim Protection */}
        <div className="md:hidden absolute inset-0 z-[3] pointer-events-none">
          {journeyState.phase === "hold" || journeyState.phase === "dive" ? (
            <div
              className="w-full h-full"
              style={{
                background:
                  "linear-gradient(to top, rgba(10, 12, 16, 0.95) 0%, rgba(10, 12, 16, 0.80) 45%, transparent 85%)",
              }}
            />
          ) : (
            <>
              <div
                className="w-full h-full dark:hidden"
                style={{
                  background:
                    "linear-gradient(to top, rgba(250, 247, 240, 0.96) 0%, rgba(250, 247, 240, 0.85) 45%, transparent 85%)",
                }}
              />
              <div
                className="w-full h-full hidden dark:block"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12, 14, 18, 0.95) 0%, rgba(12, 14, 18, 0.80) 45%, transparent 85%)",
                }}
              />
            </>
          )}
        </div>

        {/* Top/bottom edge feathering gradients */}
        <div className="absolute inset-x-0 top-0 h-24 z-[3] bg-gradient-to-b from-[var(--bg-base)]/80 dark:from-[#0C0E12]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 z-[3] bg-gradient-to-t from-[var(--bg-base)]/80 dark:from-[#0C0E12]/80 to-transparent pointer-events-none" />

        {/* Layer 4: Parallax Glass Bubbles */}
        <div className="absolute inset-0 z-[4] pointer-events-none select-none overflow-hidden">
          {GLASS_BUBBLES.map((b, bIdx) => {
            const parallaxY = (smoothedProgress - 0.5) * b.speed * 3;
            return (
              <div
                key={bIdx}
                className="absolute rounded-full border border-white/60 dark:border-white/15 shadow-md backdrop-blur-md transition-transform duration-300 ease-out"
                style={{
                  left: b.x,
                  top: b.y,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  transform: `translate3d(0, ${parallaxY}px, 0)`,
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

        {/* Layer 5: Fixed Position Single Text Block Wrapper */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:pb-12">
            <div className="max-w-[520px] w-full pointer-events-auto">
              {textAnim.visible && activeProduct && (
                <div
                  key={activeProduct.slug}
                  style={{
                    opacity: textAnim.opacity,
                    transform: `translate3d(0, ${textAnim.translateY}px, 0)`,
                  }}
                  className="transition-none pointer-events-auto"
                >
                  <JourneyText
                    product={activeProduct}
                    index={journeyState.chapter}
                    phase={textAnim.phase!}
                    locale={locale}
                    t={t}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Layer 6: Compact Right-Edge Chapter Dot Indicator */}
        <nav
          aria-label="Chapter navigation"
          className="hidden md:flex flex-col items-center gap-3.5 absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto select-none"
        >
          {chapters.map((product, idx) => {
            const isCurrent = idx === journeyState.chapter;
            const name = (isHi && product.nameHi) || product.name;

            return (
              <button
                key={product.slug}
                type="button"
                onClick={() => scrollToChapter(idx)}
                aria-label={`Jump to Chapter 0${idx + 1}: ${name}`}
                aria-current={isCurrent ? "step" : undefined}
                className="group relative flex items-center justify-center p-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-terracotta)] rounded-full transition-transform"
              >
                {/* Hover / Focus Tooltip on Left */}
                <div className="pointer-events-none absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#0E1014]/95 text-white text-xs font-medium tracking-wide whitespace-nowrap opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-200 shadow-xl border border-white/10 flex items-center gap-2 z-40">
                  <span className="font-mono text-[10px] text-[var(--brand-terracotta)] font-bold">
                    0{idx + 1}
                  </span>
                  <span>{name}</span>
                </div>

                {/* Dot / Pill Indicator */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "w-2.5 h-7 shadow-md"
                      : "w-2.5 h-2.5 bg-white/45 dark:bg-white/30 group-hover:bg-white/90 group-hover:scale-125"
                  }`}
                  style={{
                    backgroundColor: isCurrent ? product.accentColor : undefined,
                    boxShadow: isCurrent ? `0 0 10px ${product.accentColor}99` : undefined,
                  }}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
