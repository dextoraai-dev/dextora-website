"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { MASTER_CHAPTERS, MasterChapter } from "@/data/master-world";
import { useI18n } from "@/lib/i18n";
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Compass,
  Layers,
} from "lucide-react";

// Safe client-side reduced motion listener
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

function getReducedMotionServerSnapshot() {
  return false;
}

// Global cross-mount image cache for instant frame retrieval
const globalMasterImageCache = new Map<string, (HTMLImageElement | null)[]>();
const globalMasterLoadedIndices = new Map<string, Set<number>>();
const globalMasterPosters = new Map<string, HTMLImageElement>();

export function MasterCinematicWorld() {
  const { locale } = useI18n();
  const isHi = locale === "hi";
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [variant, setVariant] = useState<"desktop" | "mobile">("desktop");

  // Animation and progress refs
  const targetProgressRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Detect desktop vs mobile variant
  useEffect(() => {
    const handleResize = () => {
      setVariant(window.innerWidth <= 768 ? "mobile" : "desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload poster image for a chapter
  const loadPoster = useCallback((ch: MasterChapter, isMob: boolean) => {
    const posterSrc = isMob ? ch.posterMobile : ch.posterDesktop;
    if (globalMasterPosters.has(posterSrc)) {
      return globalMasterPosters.get(posterSrc)!;
    }
    const img = new window.Image();
    img.src = posterSrc;
    globalMasterPosters.set(posterSrc, img);
    return img;
  }, []);

  // Preload a single frame
  const loadFrame = useCallback(
    async (
      chIndex: number,
      frameNum: number,
      curVariant: "desktop" | "mobile"
    ): Promise<HTMLImageElement | null> => {
      const ch = MASTER_CHAPTERS[chIndex];
      if (!ch) return null;

      const cacheKey = `${ch.id}-${curVariant}`;
      let cachedArray = globalMasterImageCache.get(cacheKey);
      if (!cachedArray) {
        cachedArray = new Array(ch.totalFrames).fill(null);
        globalMasterImageCache.set(cacheKey, cachedArray);
      }
      let loadedSet = globalMasterLoadedIndices.get(cacheKey);
      if (!loadedSet) {
        loadedSet = new Set<number>();
        globalMasterLoadedIndices.set(cacheKey, loadedSet);
      }

      const idx = frameNum - 1;
      if (cachedArray[idx]) return cachedArray[idx];

      const pad = String(frameNum).padStart(4, "0");
      const src = `${ch.frameBasePath}/${curVariant}/${pad}.webp`;
      const img = new window.Image();
      img.src = src;

      try {
        if (typeof img.decode === "function") {
          await img.decode();
        } else {
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Image load failed"));
          });
        }
        if (isMountedRef.current) {
          cachedArray[idx] = img;
          loadedSet.add(idx);
          if (chIndex === 0 && idx === 0) setIsReady(true);
        }
        return img;
      } catch {
        return null;
      }
    },
    []
  );

  // Progressive preloader: loads current + next 2 chapters ahead
  useEffect(() => {
    isMountedRef.current = true;
    const curVariant = variant;

    // Load poster images for all chapters immediately
    MASTER_CHAPTERS.forEach((ch) => {
      loadPoster(ch, curVariant === "mobile");
    });

    // Priority load: First frame of scene 0
    loadFrame(0, 1, curVariant).then(() => {
      if (isMountedRef.current) setIsReady(true);
    });

    const preloadChapter = async (cIdx: number) => {
      if (cIdx < 0 || cIdx >= MASTER_CHAPTERS.length) return;
      const ch = MASTER_CHAPTERS[cIdx];
      const cacheKey = `${ch.id}-${curVariant}`;
      let loadedSet = globalMasterLoadedIndices.get(cacheKey);
      if (!loadedSet) {
        loadedSet = new Set<number>();
        globalMasterLoadedIndices.set(cacheKey, loadedSet);
      }

      // 1. Keyframes first (every 6th frame) for rapid seek coverage
      for (let f = 1; f <= ch.totalFrames; f += 6) {
        if (!isMountedRef.current) return;
        if (!loadedSet.has(f - 1)) {
          await loadFrame(cIdx, f, curVariant);
        }
      }

      // 2. Load remaining frames sequentially
      for (let f = 1; f <= ch.totalFrames; f++) {
        if (!isMountedRef.current) return;
        if (!loadedSet.has(f - 1)) {
          await loadFrame(cIdx, f, curVariant);
        }
      }
    };

    // Preload window: [active, active + 1, active + 2]
    const active = activeChapterIndex;
    preloadChapter(active);
    preloadChapter(active + 1);
    preloadChapter(active + 2);
    if (active > 0) preloadChapter(active - 1);

    return () => {
      isMountedRef.current = false;
    };
  }, [activeChapterIndex, variant, loadFrame, loadPoster]);

  // Find nearest loaded frame index
  const getNearestLoadedIndex = useCallback(
    (chIndex: number, targetIdx: number, curVariant: "desktop" | "mobile"): number => {
      const ch = MASTER_CHAPTERS[chIndex];
      if (!ch) return 0;
      const cacheKey = `${ch.id}-${curVariant}`;
      const loadedSet = globalMasterLoadedIndices.get(cacheKey);
      if (!loadedSet || loadedSet.size === 0) return 0;
      if (loadedSet.has(targetIdx)) return targetIdx;

      let minDiff = Infinity;
      let bestIdx = 0;
      for (const idx of loadedSet) {
        const diff = Math.abs(idx - targetIdx);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = idx;
        }
      }
      return bestIdx;
    },
    []
  );

  // High-performance canvas drawing with sub-frame crossfade and seamless handoff
  const drawStage = useCallback(
    (canvas: HTMLCanvasElement, progress: number) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const totalChapters = MASTER_CHAPTERS.length;
      const chapterSpan = 1 / totalChapters;
      const clampedP = Math.max(0, Math.min(0.999999, progress));

      const cIndex = Math.min(
        totalChapters - 1,
        Math.max(0, Math.floor(clampedP / chapterSpan))
      );
      const cProg = (clampedP - cIndex * chapterSpan) / chapterSpan;

      const curChapter = MASTER_CHAPTERS[cIndex];
      const nextChapter = cIndex < totalChapters - 1 ? MASTER_CHAPTERS[cIndex + 1] : null;

      // Draw helper: cover math with optional scale and opacity
      const drawImageCover = (
        img: HTMLImageElement,
        opacity: number,
        scaleMultiplier = 1.0
      ) => {
        if (!img || !img.width || !img.height) return;
        const iw = img.naturalWidth || img.width;
        const ih = img.naturalHeight || img.height;

        const baseScale = Math.max(cw / iw, ch / ih);
        const finalScale = baseScale * scaleMultiplier;
        const dw = iw * finalScale;
        const dh = ih * finalScale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, dx, dy, dw, dh);
      };

      // Get frame or fallback poster for a chapter at float progress 0..1
      const getFrameForChapter = (
        chapterIdx: number,
        localProg: number
      ): { img1: HTMLImageElement | null; img2: HTMLImageElement | null; subAlpha: number } => {
        const chapter = MASTER_CHAPTERS[chapterIdx];
        if (!chapter) return { img1: null, img2: null, subAlpha: 0 };

        const cacheKey = `${chapter.id}-${variant}`;
        const cached = globalMasterImageCache.get(cacheKey);

        const totalF = chapter.totalFrames;
        const floatIdx = Math.max(0, Math.min(totalF - 1, localProg * (totalF - 1)));
        const f1 = Math.floor(floatIdx);
        const f2 = Math.min(totalF - 1, Math.ceil(floatIdx));
        const subAlpha = floatIdx - f1;

        if (cached) {
          const idx1 = getNearestLoadedIndex(chapterIdx, f1, variant);
          const idx2 = getNearestLoadedIndex(chapterIdx, f2, variant);
          const img1 = cached[idx1];
          const img2 = cached[idx2];
          if (img1) return { img1, img2: img2 !== img1 ? img2 : null, subAlpha };
        }

        // Fallback to preloaded poster still
        const poster = loadPoster(chapter, variant === "mobile");
        return { img1: poster, img2: null, subAlpha: 0 };
      };

      // Handoff calculation: last 14% of chapter (0.86 to 1.0)
      const HANDOFF_START = 0.86;
      const isHandoff = nextChapter !== null && cProg >= HANDOFF_START;

      // Clear with stage base color
      ctx.fillStyle = "#0C0E12";
      ctx.fillRect(0, 0, cw, ch);

      if (!isHandoff) {
        // Normal single-scene playback with sub-frame interpolation
        const { img1, img2, subAlpha } = getFrameForChapter(cIndex, cProg);
        if (img1) {
          drawImageCover(img1, 1.0, 1.0);
          if (img2 && subAlpha > 0.002) {
            drawImageCover(img2, subAlpha, 1.0);
          }
        }
      } else {
        // Seamless handoff: 10-frame crossfade + push-in zoom + focus transition
        const t = (cProg - HANDOFF_START) / (1.0 - HANDOFF_START);
        // Smooth cubic ease
        const ease = t * t * (3 - 2 * t);

        // 1. Outgoing scene: gentle push-in zoom (1.0 -> 1.06) and fade out
        const { img1: out1, img2: out2, subAlpha: outSub } = getFrameForChapter(
          cIndex,
          Math.min(0.999, cProg)
        );
        const outScale = 1.0 + ease * 0.06;
        const outOpacity = Math.max(0, 1.0 - ease);

        if (out1) {
          drawImageCover(out1, outOpacity, outScale);
          if (out2 && outSub > 0.002) {
            drawImageCover(out2, outOpacity * outSub, outScale);
          }
        }

        // 2. Incoming scene: slight scale settle (0.94 -> 1.00) and fade in
        const { img1: in1, img2: in2, subAlpha: inSub } = getFrameForChapter(
          cIndex + 1,
          ease * 0.12 // incoming clip enters already moving smoothly
        );
        const inScale = 0.94 + ease * 0.06;
        const inOpacity = Math.min(1.0, ease);

        if (in1) {
          drawImageCover(in1, inOpacity, inScale);
          if (in2 && inSub > 0.002) {
            drawImageCover(in2, inOpacity * inSub, inScale);
          }
        }
      }
    },
    [variant, getNearestLoadedIndex, loadPoster]
  );

  // Single window scroll listener: tracks target progress without fighting browser
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const raw = -rect.top / totalScrollable;
      targetProgressRef.current = Math.max(0, Math.min(0.999999, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Single requestAnimationFrame loop: smooth lerp ~0.10 per frame
  useEffect(() => {
    if (prefersReducedMotion) return;

    const LERP_FACTOR = 0.10;

    const animateLoop = () => {
      const target = targetProgressRef.current;
      const current = smoothedProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.00005) {
        const next = current + diff * LERP_FACTOR;
        smoothedProgressRef.current = next;
        setGlobalProgress(next);

        const totalChapters = MASTER_CHAPTERS.length;
        const chapterSpan = 1 / totalChapters;
        const activeIdx = Math.min(
          totalChapters - 1,
          Math.max(0, Math.floor(next / chapterSpan))
        );
        setActiveChapterIndex(activeIdx);

        if (canvasRef.current) {
          drawStage(canvasRef.current, next);
        }
      }

      rafId.current = requestAnimationFrame(animateLoop);
    };

    rafId.current = requestAnimationFrame(animateLoop);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [prefersReducedMotion, drawStage]);

  // Canvas resize with capped devicePixelRatio (max 2)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawStage(canvas, smoothedProgressRef.current);
      }
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);
    handleResize();

    return () => ro.disconnect();
  }, [drawStage]);

  // Smooth scroll to chapter
  const scrollToChapter = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = rect.height - window.innerHeight;
    const chapterSpan = 1 / MASTER_CHAPTERS.length;

    const targetProgress = index * chapterSpan + 0.01;
    const targetY = scrollTop + rect.top + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const activeChapter = MASTER_CHAPTERS[activeChapterIndex] || MASTER_CHAPTERS[0];

  // ───────────────────────────────────────────────────────────────────────────
  // ACCESSIBLE STATIC STACKED FALLBACK (Prefers-reduced-motion)
  // ───────────────────────────────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <section
        className="py-16 sm:py-24 bg-[var(--bg-base)] text-[var(--text-primary)]"
        aria-label="Dextora Master World"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--brand-terracotta)]/10 text-[var(--brand-terracotta)] border border-[var(--brand-terracotta)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isHi ? "डेक्सटोरा संपूर्ण यात्रा" : "The Dextora Ecosystem Journey"}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">
              {isHi
                ? "शैक्षणिक साथी से लेकर संस्थागत AI समाधान तक"
                : "From Private Tutor to Institutional AI Engine"}
            </h1>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              {isHi
                ? "कक्षा १–१२, जेईई, नीट व यूपीएससी की व्यक्तिगत तैयारी और संस्थागत स्वचालन।"
                : "Instant photo doubt resolution, adaptive tests, smart notes, bilingual UPSC prep, and WhatsApp CRM."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MASTER_CHAPTERS.map((ch) => (
              <div
                key={ch.id}
                className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full bg-[var(--bg-subtle)]">
                  <Image
                    src={ch.posterDesktop}
                    alt={ch.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-mono text-xs font-semibold backdrop-blur-sm">
                    {ch.number} / 09
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
  // CONTINUOUS MASTER SCROLL-SCRUBBED FLIGHT (Single Tall Container + Pinned Stage)
  // ───────────────────────────────────────────────────────────────────────────
  const totalChapters = MASTER_CHAPTERS.length;
  const chapterSpan = 1 / totalChapters;
  const localProg = (globalProgress - activeChapterIndex * chapterSpan) / chapterSpan;

  // Seamless text opacity and transform calculation:
  // Fades in 0..0.15, stays solid 0.15..0.85, fades out 0.85..1.0
  let textOpacity = 1.0;
  let textTranslateY = 0;
  if (localProg < 0.15 && activeChapterIndex > 0) {
    const t = localProg / 0.15;
    textOpacity = t;
    textTranslateY = (1 - t) * 14;
  } else if (localProg > 0.85 && activeChapterIndex < totalChapters - 1) {
    const t = (localProg - 0.85) / 0.15;
    textOpacity = Math.max(0, 1 - t);
    textTranslateY = -t * 14;
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#0C0E12] text-white"
      style={{ height: `${totalChapters * 115}vh` }}
      aria-label="Dextora Continuous Flight Experience"
    >
      {/* Sticky 100vw x 100dvh Canvas Stage: Fixed throughout the entire experience */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center will-change-transform">
        {/* Layer 1: Unified Full-Bleed Retina Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-cover select-none pointer-events-none"
          style={{ width: "100%", height: "100%" }}
          aria-hidden="true"
        />

        {/* Intro Loader: visible only while scene 0 frame 1 decodes */}
        {!isReady && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0C0E12] transition-opacity duration-500">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[var(--brand-terracotta)] animate-spin" />
              <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
                {isHi ? "सिनेमैटिक अनुभव लोड हो रहा है..." : "Initializing Flight Canvas..."}
              </span>
            </div>
          </div>
        )}

        {/* Layer 2: Continuous Atmospheric Scrim Gradient for Ultra-Legible Typography */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 14, 20, 0.94) 0%, rgba(10, 14, 20, 0.76) 38%, rgba(10, 14, 20, 0.22) 64%, transparent 84%)",
          }}
        />

        {/* Mobile Edge Gradient Protection */}
        <div
          className="md:hidden absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(8, 11, 16, 0.96) 0%, rgba(8, 11, 16, 0.86) 55%, transparent 88%)",
          }}
        />

        {/* Top/Bottom Seamless Section Blends (Hero into Flight, Flight into ProductShowcase) */}
        <div className="absolute inset-x-0 top-0 h-32 z-10 bg-gradient-to-b from-[var(--bg-base)] via-[#0C0E12]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 z-10 bg-gradient-to-t from-[var(--bg-base)] via-[#0C0E12]/80 to-transparent pointer-events-none" />

        {/* Layer 3: Pinned Master Progress Timeline */}
        <div className="absolute top-0 inset-x-0 z-30 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--brand-terracotta)] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(224,90,56,0.8)]"
            style={{ width: `${globalProgress * 100}%` }}
          />
        </div>

        {/* Layer 4: Master Waypoint Pill Navigation */}
        <div className="absolute top-5 inset-x-0 z-30 flex justify-center px-4 pointer-events-auto">
          <nav
            aria-label="Master Flight Chapters"
            className="flex items-center gap-1 p-1.5 rounded-full backdrop-blur-xl bg-black/45 border border-white/15 shadow-2xl max-w-full overflow-x-auto scrollbar-none"
          >
            {MASTER_CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(idx)}
                  className={`relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "text-white shadow-md font-semibold scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: isActive ? ch.accent : "transparent",
                  }}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className="font-mono text-[10px] opacity-75">{ch.number}</span>
                  <span className="hidden sm:inline">
                    {isHi ? ch.shortLabelHi : ch.shortLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Layer 5: Counter Badge Pinned Top-Right */}
        <div className="hidden sm:flex absolute top-6 right-8 z-20 items-center gap-2 font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-black/40 border border-white/15 text-white/90 backdrop-blur-md shadow-lg pointer-events-none">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: activeChapter.accent }}
          />
          <span>{activeChapter.number} / 09</span>
        </div>

        {/* Layer 6: Narrative HUD Text Block (Continuous Master Progress Transition) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-md:pb-12">
            <div
              className="max-w-[560px] w-full pointer-events-auto space-y-4 sm:space-y-6 text-left transition-transform duration-150 ease-out"
              style={{
                opacity: textOpacity,
                transform: `translate3d(0, ${textTranslateY}px, 0)`,
              }}
            >
              {/* Category & Beat Badges */}
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
                  <span>
                    {isHi
                      ? `पड़ाव ${activeChapter.number} / ०९`
                      : `BEAT ${activeChapter.number} OF 09`}
                  </span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-white/70 border border-white/10">
                  <Layers className="w-3 h-3 opacity-60" />
                  <span>{isHi ? activeChapter.categoryHi : activeChapter.category}</span>
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
                    <CheckCircle2
                      className="w-3 h-3"
                      style={{ color: activeChapter.accent }}
                    />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* CTA Action Buttons */}
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
                    {isHi
                      ? activeChapter.secondaryCTA.labelHi
                      : activeChapter.secondaryCTA.label}
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
