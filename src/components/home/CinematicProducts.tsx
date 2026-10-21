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
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Compass,
  Plane,
  Radio,
} from "lucide-react";

// Safe client-side reduced-motion listener
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => { };
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

const CHAPTER_SLUGS = ["dextora-learn", "dhyeya-ias", "dextora-crm"];

/**
 * Continuous Monotone Ease function (lingerEase)
 * Slows down gently in the middle (where reading occurs) while maintaining
 * strictly positive velocity everywhere (derivative > 0). Zero frozen dead zones.
 */
export function lingerEase(x: number, L = 0.32): number {
  const clamped = Math.max(0, Math.min(1, x));
  const c = clamped - 0.5;
  return (1 - L) * clamped + L * (4 * c * c * c + 0.5);
}

export interface ContinuousFlightState {
  currentChapter: number;
  chapterProgress: number; // 0..1 in current chapter
  isTransitioning: boolean;
  transitionT: number; // 0..1 during aerial handoff
  nextChapter: number | null;
  globalProgress: number; // 0..1 overall
}

/**
 * Computes continuous flight state across the interconnected world.
 */
export function computeFlightState(
  globalProgress: number,
  totalChapters: number
): ContinuousFlightState {
  const clamped = Math.max(0, Math.min(0.999999, globalProgress));
  const chapterSpan = 1 / totalChapters;
  const currentChapter = Math.min(
    totalChapters - 1,
    Math.max(0, Math.floor(clamped / chapterSpan))
  );
  const chapterProgress = (clamped - currentChapter * chapterSpan) / chapterSpan;

  // Seamless aerial traverse handoff window: last 22% of chapter (0.78 to 1.0)
  const HANDOFF_START = 0.78;
  const hasNext = currentChapter < totalChapters - 1;
  const isTransitioning = hasNext && chapterProgress >= HANDOFF_START;

  let transitionT = 0;
  if (isTransitioning) {
    const rawT = (chapterProgress - HANDOFF_START) / (1.0 - HANDOFF_START);
    transitionT = Math.max(0, Math.min(1, rawT));
  }

  return {
    currentChapter,
    chapterProgress,
    isTransitioning,
    transitionT,
    nextChapter: hasNext ? currentChapter + 1 : null,
    globalProgress: clamped,
  };
}

// Background atmospheric depth elements
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
    x: "8%",
    y: "14%",
    w: "460px",
    h: "460px",
    colorLight: "rgba(235, 215, 195, 0.45)",
    colorDark: "rgba(30, 45, 40, 0.3)",
    speed: 0.10,
  },
  {
    x: "72%",
    y: "18%",
    w: "520px",
    h: "520px",
    colorLight: "rgba(240, 220, 210, 0.4)",
    colorDark: "rgba(45, 30, 40, 0.25)",
    speed: -0.14,
  },
  {
    x: "38%",
    y: "62%",
    w: "480px",
    h: "480px",
    colorLight: "rgba(225, 235, 225, 0.35)",
    colorDark: "rgba(25, 35, 45, 0.3)",
    speed: 0.16,
  },
  {
    x: "86%",
    y: "72%",
    w: "420px",
    h: "420px",
    colorLight: "rgba(245, 225, 205, 0.35)",
    colorDark: "rgba(35, 25, 30, 0.2)",
    speed: -0.11,
  },
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

  // Unified single-lerp RAF loop driving smoothedProgress (zero double-lerp lag)
  useEffect(() => {
    if (prefersReducedMotion || !isIntersecting) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    const LERP_FACTOR = 0.12;

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

    const targetProgress = idx * chapterSpan + 0.02;
    const targetScrollY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Derive Single Source of Truth Continuous Flight State
  const flightState = computeFlightState(smoothedProgress, chapters.length);
  const activeProduct = chapters[flightState.currentChapter];

  // Continuous Camera Depth for Scrim Contrast (0 = diorama exterior, 1 = deep interior)
  const continuousCameraDepth = lingerEase(
    Math.min(1.0, flightState.chapterProgress / 0.78),
    0.35
  );

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
  // CONTINUOUS CONNECTED FLIGHT STAGE (300vh per chapter)
  // -------------------------------------------------------------
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[var(--bg-base)] transition-colors"
      style={{ height: `${chapters.length * 300}vh` }}
      aria-label="Cinematic Product Journey"
    >
      {/* Sticky Full-Viewport Stage: 100vw x 100dvh */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-[#FAF7F0] dark:bg-[#0C0E12]">
        {/* Layer 1: Ambient Sky Gradient & Drifting Multi-Layer Clouds */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F0] via-[#F6ECE2] to-[#ECE1D5] dark:from-[#0C0E12] dark:via-[#11141B] dark:to-[#171B24] transition-colors duration-700" />

          {/* Parallax Cloud Layer with Traverse Speed Boost */}
          {CLOUD_BLOBS.map((blob, cIdx) => {
            const traverseBoost = flightState.isTransitioning
              ? Math.sin(flightState.transitionT * Math.PI) * 45
              : 0;
            const parallaxX =
              (smoothedProgress - 0.5) * blob.speed * 400 + traverseBoost;
            const parallaxY = (smoothedProgress - 0.5) * blob.speed * 220;

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
                  opacity: 0.65,
                }}
              />
            );
          })}
        </div>

        {/* Layer 2: PERMANENTLY MOUNTED FULL-BLEED RETINA CANVASES WITH AERIAL TRAVERSE */}
        <div className="absolute inset-0 z-[2] w-full h-full overflow-hidden select-none pointer-events-none">
          {chapters.map((product, idx) => {
            const isCurrent = idx === flightState.currentChapter;
            const isNext = idx === flightState.nextChapter;

            let canvasOpacity = 0;
            let sequenceProg = 0;
            let transform = "translate3d(0, 0, 0) scale(1)";
            let filter = "none";
            let zIndex = 2;

            if (isCurrent) {
              zIndex = 5;
              if (flightState.isTransitioning) {
                // Chapter i is ascending into the clouds (fly-out)
                const e = flightState.transitionT * flightState.transitionT * (3 - 2 * flightState.transitionT);
                canvasOpacity = Math.max(0, 1.0 - Math.pow(e, 1.3));
                transform = `translate3d(${-e * 35}px, ${-e * 45}px, 0) scale(${1.0 + e * 0.08})`;
                filter = `blur(${e * 4}px)`;
                sequenceProg = 1.0;
              } else {
                canvasOpacity = 1.0;
                transform = "translate3d(0, 0, 0) scale(1)";
                filter = "none";
                // Continuous monotonic scrub with lingerEase (never freezes)
                sequenceProg = lingerEase(
                  Math.min(1.0, flightState.chapterProgress / 0.78),
                  0.32
                );
              }
            } else if (isNext && flightState.isTransitioning) {
              zIndex = 6;
              // Chapter i+1 is descending from the clouds (fly-in)
              const e = flightState.transitionT * flightState.transitionT * (3 - 2 * flightState.transitionT);
              canvasOpacity = Math.min(1.0, Math.pow(e, 1.15));
              transform = `translate3d(${(1 - e) * 35}px, ${(1 - e) * 45}px, 0) scale(${0.92 + e * 0.08})`;
              filter = `blur(${(1 - e) * 4}px)`;
              // Enters already actively moving its camera!
              sequenceProg = e * 0.12;
            } else {
              canvasOpacity = 0;
              sequenceProg = 0;
            }

            return (
              <div
                key={product.slug}
                className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
                style={{
                  opacity: canvasOpacity,
                  transform,
                  filter,
                  zIndex,
                  pointerEvents: "none",
                }}
                aria-hidden={!isCurrent && !isNext}
              >
                <FrameSequenceCanvas
                  slug={product.slug}
                  progress={sequenceProg}
                  active={isCurrent || isNext}
                  preloadPriority={isCurrent ? "high" : isNext ? "normal" : "low"}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Left-Edge Dynamic Contrast Scrim (Smooth Continuous Depth Interpolation) */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none transition-opacity duration-500"
          style={{
            opacity: Math.max(0.2, Math.min(0.95, 0.2 + continuousCameraDepth * 0.75)),
            background:
              "linear-gradient(to right, rgba(10, 14, 20, 0.92) 0%, rgba(10, 14, 20, 0.72) 36%, rgba(10, 14, 20, 0.18) 55%, transparent 72%)",
          }}
        />

        {/* Mobile Edge Protection Scrim */}
        <div
          className="md:hidden absolute inset-0 z-[3] pointer-events-none transition-opacity duration-500"
          style={{
            opacity: Math.max(0.4, Math.min(1.0, 0.4 + continuousCameraDepth * 0.6)),
            background:
              "linear-gradient(to top, rgba(8, 11, 16, 0.96) 0%, rgba(8, 11, 16, 0.85) 50%, transparent 88%)",
          }}
        />

        {/* Top/Bottom Cinematic Vignette */}
        <div className="absolute inset-x-0 top-0 h-28 z-[3] bg-gradient-to-b from-[var(--bg-base)]/85 dark:from-[#0C0E12]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 z-[3] bg-gradient-to-t from-[var(--bg-base)]/85 dark:from-[#0C0E12]/85 to-transparent pointer-events-none" />

        {/* Layer 4: Narrative HUD (Fades During Scroll Transitions) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:pb-12">
            <div className="max-w-[540px] w-full pointer-events-none">
              {activeProduct && (
                <div
                  key={activeProduct.slug}
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    opacity: flightState.isTransitioning
                      ? 0
                      : 1,
                    visibility: flightState.isTransitioning
                      ? "hidden"
                      : "visible",
                    transform: flightState.isTransitioning
                      ? "translate3d(0, -12px, 0)"
                      : "translate3d(0, 0, 0)",
                    pointerEvents: flightState.isTransitioning
                      ? "none"
                      : "auto",
                  }}
                >
                  <JourneyText
                    product={activeProduct}
                    index={flightState.currentChapter}
                    chapterProgress={flightState.chapterProgress}
                    locale={locale}
                    t={t}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Layer 5: Connected World Flight Telemetry & Waypoint Ribbon */}
        <nav
          aria-label="Connected World Waypoint Navigation"
          className="hidden md:flex flex-col items-end gap-3 absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-auto select-none"
        >

          {/* Connected Waypoint Track */}
          <div className="relative flex flex-col gap-5 p-3">
            {/* Illuminated Flight Line connecting the waypoints */}
            <div className="absolute right-[21px] top-5 bottom-5 w-0.5 bg-black/20 dark:bg-white/20 rounded-full overflow-hidden">
              <div
                className="w-full bg-[var(--brand-terracotta)] rounded-full transition-all duration-150 ease-out"
                style={{
                  height: `${flightState.globalProgress * 100}%`,
                  boxShadow: "0 0 8px rgba(224, 90, 56, 0.8)",
                }}
              />
            </div>

            {chapters.map((product, idx) => {
              const isCurrent = idx === flightState.currentChapter;
              const name = (isHi && product.nameHi) || product.name;

              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  aria-label={`Fly to Waypoint 0${idx + 1}: ${name}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className="group relative flex items-center justify-end gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-terracotta)] rounded-full transition-all cursor-pointer"
                >
                  {/* Waypoint Label Pill */}
                  <span
                    className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${isCurrent
                      ? "text-white shadow-md border-transparent scale-105"
                      : "text-white/85 bg-black/25 dark:bg-black/35 backdrop-blur-sm border-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-hover:text-white group-hover:bg-black/45 group-hover:border-white/20 group-hover:scale-105"
                      }`}
                    style={{
                      backgroundColor: isCurrent ? product.accentColor : undefined,
                    }}
                  >
                    0{idx + 1} · {product.shortName}
                  </span>

                  {/* Waypoint Beacon Node */}
                  <div className="relative flex items-center justify-center w-5 h-5">
                    {isCurrent && (
                      <span
                        className="absolute w-5 h-5 rounded-full animate-ping opacity-75"
                        style={{ backgroundColor: product.accentColor }}
                      />
                    )}
                    <span
                      className={`relative block rounded-full transition-all duration-300 ${isCurrent
                        ? "w-3.5 h-3.5 shadow-md border-2 border-white"
                        : "w-2.5 h-2.5 bg-white/50 dark:bg-white/40 border border-black/25 dark:border-black/50 shadow-sm group-hover:scale-125 group-hover:bg-white"
                        }`}
                      style={{
                        backgroundColor: isCurrent ? product.accentColor : undefined,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
