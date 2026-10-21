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
import { useI18n } from "@/lib/i18n";
import { EDU_CHAPTERS, EduChapter } from "@/data/edu-world";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Compass,
  CheckCircle2,
  VolumeX,
} from "lucide-react";

// Safe listener for prefers-reduced-motion
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function DextoraEduHeroWorld() {
  const { locale } = useI18n();
  const isHi = locale === "hi";

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const blobUrlsRef = useRef<(string | null)[]>([]);
  const seekingRef = useRef<boolean[]>([]);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videosReady, setVideosReady] = useState<boolean[]>(
    new Array(EDU_CHAPTERS.length).fill(false)
  );

  const rafId = useRef<number | null>(null);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch seekable video blobs for smooth frame scrubbing
  useEffect(() => {
    let isCancelled = false;

    EDU_CHAPTERS.forEach((chapter, idx) => {
      const src = isMobile ? chapter.clipMobile : chapter.clip;

      fetch(src)
        .then((res) => (res.ok ? res.blob() : null))
        .then((blob) => {
          if (!isCancelled && blob) {
            const url = URL.createObjectURL(blob);
            blobUrlsRef.current[idx] = url;
            if (videoRefs.current[idx]) {
              videoRefs.current[idx]!.src = url;
            }
          }
        })
        .catch(() => {
          // Direct URL fallback if blob fetch fails
          if (!isCancelled && videoRefs.current[idx]) {
            videoRefs.current[idx]!.src = src;
          }
        });
    });

    return () => {
      isCancelled = true;
      blobUrlsRef.current.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [isMobile]);

  // Main scroll-scrub loop
  useEffect(() => {
    if (prefersReducedMotion) return;

    let targetScrollProgress = 0;
    let currentSmoothedProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const raw = -rect.top / totalScrollable;
      targetScrollProgress = Math.max(0, Math.min(0.999999, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const animateLoop = () => {
      // Smooth interpolation for inertia-free responsive tracking
      currentSmoothedProgress += (targetScrollProgress - currentSmoothedProgress) * 0.18;
      if (Math.abs(targetScrollProgress - currentSmoothedProgress) < 0.0001) {
        currentSmoothedProgress = targetScrollProgress;
      }

      setGlobalProgress(currentSmoothedProgress);

      const totalChapters = EDU_CHAPTERS.length;
      const chapterSpan = 1 / totalChapters;
      const cIndex = Math.min(
        totalChapters - 1,
        Math.max(0, Math.floor(currentSmoothedProgress / chapterSpan))
      );
      const cProg = (currentSmoothedProgress - cIndex * chapterSpan) / chapterSpan;

      setActiveChapterIndex(cIndex);
      setChapterProgress(cProg);

      // Scrub the active chapter video and pre-seek neighbors
      [cIndex, cIndex + 1, cIndex - 1].forEach((idx) => {
        if (idx >= 0 && idx < totalChapters) {
          const vid = videoRefs.current[idx];
          if (vid && vid.duration && !seekingRef.current[idx]) {
            let prog = 0;
            if (idx === cIndex) prog = cProg;
            else if (idx < cIndex) prog = 1.0;
            else if (idx > cIndex) prog = 0.0;

            const targetTime = prog * vid.duration;
            if (Math.abs(vid.currentTime - targetTime) > 0.04) {
              seekingRef.current[idx] = true;
              vid.currentTime = targetTime;
            }
          }
        }
      });

      rafId.current = requestAnimationFrame(animateLoop);
    };

    rafId.current = requestAnimationFrame(animateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion]);

  // Jump to specific chapter tab
  const scrollToChapter = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const chapterSpan = 1 / EDU_CHAPTERS.length;
    const targetProgress = index * chapterSpan + 0.01;
    const targetY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const activeChapter = EDU_CHAPTERS[activeChapterIndex] || EDU_CHAPTERS[0];

  // ───────────────────────────────────────────────────────────────────────────
  // ACCESSIBLE STATIC STACKED FALLBACK (Prefers-reduced-motion or lightweight)
  // ───────────────────────────────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <section
        className="py-16 sm:py-24 bg-[var(--bg-base)] text-[var(--text-primary)]"
        aria-label="Dextora Edu Platform Journey"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-terracotta)]/10 text-[var(--brand-terracotta)] border border-[var(--brand-terracotta)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHi ? "डेक्सटोरा एडु यात्रा" : "Dextora Edu Journey"}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              {isHi
                ? "कक्षा 1–12 और जेईई, नीट व यूपीएससी के लिए समर्पित AI अध्ययन साथी"
                : "Your Private Tutor, In Every Pocket"}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              {isHi
                ? "फोटो खींचकर ३ सेकंड में सवाल हल करें, अनुकूलित अभ्यास करें और मातृभाषा में समझें।"
                : "Instant photo doubt resolution under 3 seconds, adaptive practice tests, smart notes, and regional language support."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EDU_CHAPTERS.map((ch, idx) => (
              <div
                key={ch.id}
                className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-[var(--bg-subtle)]">
                  <Image
                    src={ch.still}
                    alt={ch.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-mono text-xs font-semibold backdrop-blur-sm">
                    {ch.number} / 06
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span
                      className="text-[11px] font-mono uppercase font-bold tracking-wider"
                      style={{ color: ch.accent }}
                    >
                      {isHi ? ch.eyebrowHi : ch.eyebrow}
                    </span>
                    <h2 className="text-xl font-serif font-bold leading-snug">
                      {isHi ? ch.titleHi : ch.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {isHi ? ch.subtextHi : ch.subtext}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <Link
                      href={ch.primaryCTA.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-terracotta)] hover:underline"
                    >
                      <span>{isHi ? ch.primaryCTA.labelHi : ch.primaryCTA.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // CONTINUOUS CINEMATIC SCROLL-SCRUBBED WORLD
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0C0E12] text-white"
      style={{ height: `${EDU_CHAPTERS.length * 140}vh` }}
      aria-label="Dextora Edu Continuous World Journey"
    >
      {/* Sticky 100vw x 100dvh Canvas / Video Stage */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">
        {/* Layer 1: Chained Full-Viewport Video Sequences with Push-In Blur Seams */}
        <div className="absolute inset-0 w-full h-full select-none pointer-events-none">
          {EDU_CHAPTERS.map((ch, idx) => {
            const isCurrent = idx === activeChapterIndex;
            const isNext = idx === activeChapterIndex + 1;

            // Seam transition calculation in last 18% of chapter
            const SEAM_START = 0.82;
            let opacity = 0;
            let blur = 0;
            let scale = 1.0;
            let zIndex = 1;

            if (isCurrent) {
              zIndex = 4;
              if (chapterProgress >= SEAM_START && idx < EDU_CHAPTERS.length - 1) {
                const t = (chapterProgress - SEAM_START) / (1 - SEAM_START);
                opacity = Math.max(0, 1 - t * t);
                blur = t * 6;
                scale = 1.0 + t * 0.08;
              } else {
                opacity = 1.0;
                scale = 1.0;
                blur = 0;
              }
            } else if (isNext && chapterProgress >= SEAM_START) {
              zIndex = 5;
              const t = (chapterProgress - SEAM_START) / (1 - SEAM_START);
              opacity = Math.min(1.0, t * t * (3 - 2 * t));
              blur = (1 - t) * 6;
              scale = 0.94 + t * 0.06;
            }

            return (
              <div
                key={ch.id}
                className="absolute inset-0 w-full h-full transition-opacity duration-150 ease-out"
                style={{
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : "none",
                  transform: `scale(${scale})`,
                  zIndex,
                }}
              >
                {/* Immediate Poster Frame Fallback */}
                <Image
                  src={isMobile ? ch.stillMobile : ch.still}
                  alt=""
                  fill
                  priority={idx <= 1}
                  className="object-cover pointer-events-none select-none transition-opacity duration-300"
                  style={{
                    opacity: videosReady[idx] ? 0 : 1,
                  }}
                  sizes="100vw"
                />

                {/* Scrubbed Seekable Video Clip */}
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  playsInline
                  muted
                  preload={idx <= 2 ? "auto" : "none"}
                  onSeeked={() => {
                    seekingRef.current[idx] = false;
                  }}
                  onLoadedData={() => {
                    setVideosReady((prev) => {
                      const next = [...prev];
                      next[idx] = true;
                      return next;
                    });
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Layer 2: Atmospheric Dark Gradient Behind Text for Maximum Legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 14, 20, 0.94) 0%, rgba(10, 14, 20, 0.76) 38%, rgba(10, 14, 20, 0.2) 62%, transparent 80%)",
          }}
        />

        {/* Mobile Edge Protection Gradient */}
        <div
          className="md:hidden absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(8, 11, 16, 0.97) 0%, rgba(8, 11, 16, 0.88) 55%, transparent 88%)",
          }}
        />

        {/* Top/Bottom Cinematic Vignette */}
        <div className="absolute inset-x-0 top-0 h-24 z-10 bg-gradient-to-b from-[#0C0E12]/90 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 bg-gradient-to-t from-[#0C0E12]/90 to-transparent pointer-events-none" />

        {/* Layer 3: Thin Scroll Progress Bar pinned at the very top */}
        <div className="absolute top-0 inset-x-0 z-30 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--brand-terracotta)] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(224,90,56,0.8)]"
            style={{ width: `${globalProgress * 100}%` }}
          />
        </div>

        {/* Layer 4: Floating Pill Nav with Chapter Tabs (Active Highlights) */}
        <div className="absolute top-6 inset-x-0 z-30 flex justify-center px-4 pointer-events-auto">
          <nav
            aria-label="Dextora Edu Chapter Navigation"
            className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full backdrop-blur-xl bg-black/40 border border-white/15 shadow-2xl max-w-full overflow-x-auto scrollbar-none"
          >
            {EDU_CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "text-white shadow-md font-semibold scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: isActive ? ch.accent : "transparent",
                  }}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="font-mono text-[10px] opacity-80">{ch.number}</span>
                  <span>{isHi ? ch.shortLabelHi : ch.shortLabel}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Layer 5: Chapter Counter ("01 / 06") Pinned Top-Right */}
        <div className="hidden sm:flex absolute top-7 right-8 z-20 items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-black/40 border border-white/15 text-white/90 backdrop-blur-md shadow-lg pointer-events-none">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activeChapter.accent }} />
          <span>{activeChapter.number} / 06</span>
        </div>

        {/* Layer 6: Narrative HUD Text Block over Dark Gradient */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:pb-12">
            <div className="max-w-[560px] w-full pointer-events-auto space-y-4 sm:space-y-6 text-left">
              {/* Eyebrow & Badges */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-white shadow-sm tracking-wider uppercase text-[11px]"
                  style={{ backgroundColor: activeChapter.accent }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{isHi ? activeChapter.eyebrowHi : activeChapter.eyebrow}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
                  <Compass className="w-3 h-3 text-[var(--brand-terracotta)] animate-spin-slow" />
                  <span>{isHi ? `पड़ाव ${activeChapter.number} / ०६` : `BEAT ${activeChapter.number} OF 06`}</span>
                </span>
              </div>

              {/* Serif Headline & Subtext */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold tracking-tight leading-[1.12] text-white drop-shadow-sm">
                  {isHi ? activeChapter.titleHi : activeChapter.title}
                </h1>
                <p className="text-sm sm:text-base font-medium text-white/85 leading-relaxed drop-shadow-sm max-w-xl">
                  {isHi ? activeChapter.subtextHi : activeChapter.subtext}
                </p>
              </div>

              {/* Product Feature Proof Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {(isHi ? activeChapter.tagsHi : activeChapter.tags).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-medium text-white/90"
                  >
                    <CheckCircle2 className="w-3 h-3" style={{ color: activeChapter.accent }} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Two CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={activeChapter.primaryCTA.href}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                  style={{ backgroundColor: activeChapter.accent }}
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10">
                    {isHi ? activeChapter.primaryCTA.labelHi : activeChapter.primaryCTA.label}
                  </span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href={activeChapter.secondaryCTA.href}
                  className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:shadow-sm cursor-pointer backdrop-blur-sm"
                >
                  <span>
                    {isHi ? activeChapter.secondaryCTA.labelHi : activeChapter.secondaryCTA.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
