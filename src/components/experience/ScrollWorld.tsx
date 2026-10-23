"use client";

/**
 * ScrollWorld — Seamless Continuous Looping Video World
 *
 * 100% Pure Video · Zero Static Images · Unbroken Flight Loop
 *
 * Merged Video Flow:
 *   Dextora Hub (0-6s)
 *   → Flight Connector (6-9s)
 *   → Dextora Learn (9-15s)
 *   → Flight Connector (15-18s)
 *   → Dhyeya IAS (18-24s)
 *   → Flight Connector (24-27s)
 *   → Dextora CRM (27-33s)
 *   → Flight Connector (33-36s)
 *   → Behind the Scenes / Convergence (36-40.5s)
 *   → Seamless Sky Crossfade back into Dextora Hub (40.5-42s, loop!)
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { experienceData, ExperienceSection } from "@/data/experience";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";

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

export function ScrollWorld() {
  const { locale } = useI18n();
  const isHi = locale === "hi";

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const sections = experienceData.sections;
  const TOTAL_DURATION = experienceData.totalDuration || 42;

  // Responsive device detection
  useEffect(() => {
    const checkMobile = () => {
      const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
      const small = window.innerWidth <= 860;
      setIsMobile(coarse || small);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scrub targets for rAF interpolation
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Jump to specific chapter hold time
  const jumpToChapter = useCallback(
    (index: number) => {
      const sec = sections[index];
      if (!sec) return;
      const t = sec.holdTime;
      targetTimeRef.current = t;

      // Also scroll window to matching position if container is present
      if (containerRef.current) {
        const top = containerRef.current.offsetTop;
        const totalH = containerRef.current.clientHeight - window.innerHeight;
        const scrollY = top + (t / TOTAL_DURATION) * Math.max(1, totalH);
        window.scrollTo({ top: scrollY, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }

      if (videoRef.current) {
        if (!isPlayingContinuous) {
          videoRef.current.currentTime = t;
        }
      }
      setActiveSectionIdx(index);
    },
    [sections, TOTAL_DURATION, isPlayingContinuous, prefersReducedMotion]
  );

  // Toggle continuous auto-play vs scroll scrubbing
  const togglePlayContinuous = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingContinuous) {
      video.pause();
      setIsPlayingContinuous(false);
    } else {
      video
        .play()
        .then(() => {
          setIsPlayingContinuous(true);
        })
        .catch(() => {
          // Fallback if browser requires interaction
          video.muted = true;
          video.play();
          setIsPlayingContinuous(true);
        });
    }
  }, [isPlayingContinuous]);

  // Main scroll listener: maps window scroll to continuous video time
  useEffect(() => {
    if (isPlayingContinuous) return;

    const handleScroll = () => {
      isUserScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
      }, 150);

      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.offsetTop;
      const windowY = window.scrollY || window.pageYOffset;
      const y = Math.max(0, windowY - containerTop);
      const totalH = container.clientHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, y / Math.max(1, totalH)));

      setScrollProgress(p);
      targetTimeRef.current = p * TOTAL_DURATION;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isPlayingContinuous, TOTAL_DURATION]);

  // High-performance rAF loop: smoothly interpolates video currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (isPlayingContinuous) {
        // In continuous playback mode, update current time from video playback
        const t = video.currentTime;
        setCurrentTime(t);
        currentTimeRef.current = t;

        // Compute active chapter from time
        const activeIdx = sections.findIndex(
          (s) => t >= s.startTime && t <= s.endTime
        );
        if (activeIdx !== -1 && activeIdx !== activeSectionIdx) {
          setActiveSectionIdx(activeIdx);
        }
      } else {
        // In scroll scrub mode, lerp video.currentTime toward targetTime
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.01) {
          currentTimeRef.current += diff * 0.22;
          const target = Math.max(0, Math.min(TOTAL_DURATION - 0.05, currentTimeRef.current));
          if (!video.seeking && Math.abs(video.currentTime - target) > 0.03) {
            try {
              video.currentTime = target;
            } catch {
              /* ignore seek interruption */
            }
          }
          setCurrentTime(currentTimeRef.current);

          // Find active chapter
          const t = currentTimeRef.current;
          let bestIdx = 0;
          for (let i = 0; i < sections.length; i++) {
            if (t >= sections[i].startTime) bestIdx = i;
          }
          if (bestIdx !== activeSectionIdx) {
            setActiveSectionIdx(bestIdx);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlayingContinuous, activeSectionIdx, sections, TOTAL_DURATION]);

  // Video source selector
  const videoSrc = isMobile
    ? experienceData.continuousLoopVideoMobile
    : experienceData.continuousLoopVideo;

  const currentSection = sections[activeSectionIdx] || sections[0];

  // Overlay opacity math: copy fades in when camera settles inside each diorama
  // and fades out during connector transitions
  const isInsideDiorama =
    currentTime >= currentSection.startTime + 0.3 &&
    currentTime <= currentSection.endTime - 0.3;

  return (
    <div
      ref={containerRef}
      className="sw-root relative w-full bg-[#080A0F] text-white selection:bg-[var(--brand-terracotta)]"
      style={{
        height: `${sections.length * 125}vh`,
        ["--sw-accent" as string]: currentSection.accent,
      }}
    >
      {/* ── Sticky 100vw x 100dvh Pure Video Stage ───────────────────────────── */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
        {/* Layer 1: Continuous HTML5 Video Player (Zero Still Images) */}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
          playsInline
          muted={isMuted}
          loop
          autoPlay={false}
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlayThrough={() => setIsVideoReady(true)}
        />

        {/* Loading Spinner until first video frame is ready */}
        {!isVideoReady && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#080A0F]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[var(--brand-terracotta)] animate-spin" />
              <span className="font-mono text-xs text-white/70 tracking-widest uppercase">
                {isHi ? "सिनेमैटिक वीडियो लोड हो रहा है..." : "Loading Continuous Video Flight..."}
              </span>
            </div>
          </div>
        )}

        {/* Layer 2: Subtle Cinematic Scrim for Text Legibility (No visual obstruction) */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(8, 10, 15, 0.92) 0%, rgba(8, 10, 15, 0.72) 36%, rgba(8, 10, 15, 0.15) 62%, transparent 85%)",
          }}
        />

        {/* Mobile Edge Gradient */}
        <div
          className="md:hidden absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(6, 8, 12, 0.96) 0%, rgba(6, 8, 12, 0.82) 48%, transparent 88%)",
          }}
        />

        {/* Top/Bottom Seamless Section Blends */}
        <div className="absolute inset-x-0 top-0 h-28 z-10 bg-gradient-to-b from-[#080A0F] via-[#080A0F]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 z-10 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/60 to-transparent pointer-events-none" />

        {/* Layer 3: Pinned Progress Timeline */}
        <div className="absolute top-0 inset-x-0 z-30 h-1 bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[var(--brand-terracotta)] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(224,90,56,0.9)]"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        {/* Layer 4: Interactive Chapter Waypoint Navigation Pills */}
        <header className="absolute top-5 inset-x-0 z-30 flex items-center justify-between px-4 sm:px-8 pointer-events-auto">
          {/* Brand Logo & Back to Home */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:border-white/30 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[var(--brand-terracotta)] animate-spin-slow" />
            <span className="font-semibold text-xs tracking-wider uppercase font-mono">
              Dextora World
            </span>
          </Link>

          {/* Chapters Bar */}
          <nav
            aria-label="Experience Chapters"
            className="flex items-center gap-1.5 p-1 rounded-full backdrop-blur-xl bg-black/45 border border-white/15 shadow-2xl max-w-full overflow-x-auto scrollbar-none"
          >
            {sections.map((sec, idx) => {
              const isActive = idx === activeSectionIdx;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => jumpToChapter(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? "text-white shadow-lg font-semibold scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: isActive ? sec.accent : "transparent",
                  }}
                >
                  <span className="font-mono text-[10px] opacity-75">
                    {`0${idx + 1}`}
                  </span>
                  <span className="hidden sm:inline">
                    {isHi ? sec.labelHi : sec.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Mode Controls: Auto-Loop Play/Pause + Mute */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlayContinuous}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all cursor-pointer font-mono text-xs font-semibold shadow-lg"
              title={isPlayingContinuous ? "Pause Continuous Flight" : "Play Continuous Flight Loop"}
            >
              {isPlayingContinuous ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
                  <span className="hidden md:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                  <span className="hidden md:inline">Continuous Loop</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </header>

        {/* Layer 5: Dynamic HUD Typography Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 max-md:pb-16">
            <div className="max-w-xl md:max-w-2xl transition-all duration-500 ease-out">
              {sections.map((sec, idx) => {
                const isSelected = idx === activeSectionIdx;
                // Calculate chapter opacity: fully visible when near holdTime, smoothly dissolves when flying away
                const timeDiff = Math.abs(currentTime - sec.holdTime);
                const opacity = isSelected && timeDiff < 2.5 ? Math.max(0, 1 - timeDiff / 2.2) : 0;

                if (opacity <= 0.01) return null;

                return (
                  <article
                    key={sec.id}
                    className="flex flex-col gap-4 text-left pointer-events-auto backdrop-blur-md p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 shadow-2xl transition-all duration-300"
                    style={{
                      opacity,
                      transform: `translateY(${(1 - opacity) * 12}px)`,
                    }}
                  >
                    {/* Eyebrow Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
                        style={{ backgroundColor: sec.accent }}
                      />
                      <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">
                        {isHi ? sec.eyebrowHi : sec.eyebrow}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                      {isHi ? sec.titleHi : sec.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal">
                      {isHi ? sec.bodyHi : sec.body}
                    </p>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {(isHi ? sec.tagsHi : sec.tags).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/10 border border-white/15 text-white/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    {sec.cta && (
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <Link
                          href={sec.cta.primary.href}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                          style={{ backgroundColor: sec.accent }}
                        >
                          <span>{isHi ? sec.cta.primary.labelHi : sec.cta.primary.label}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        {sec.cta.secondary && (
                          <Link
                            href={sec.cta.secondary.href}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
                          >
                            <span>{isHi ? sec.cta.secondary.labelHi : sec.cta.secondary.label}</span>
                            <ChevronRight className="w-4 h-4 opacity-75" />
                          </Link>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Layer 6: Floating Flight HUD Control Bar at Bottom */}
        <aside
          aria-label="Flight Time Scrubber"
          className="absolute bottom-6 inset-x-0 z-30 flex justify-center px-4 pointer-events-auto"
        >
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl text-xs font-mono">
            {/* Loop indicator */}
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <RotateCcw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Continuous Loop</span>
            </span>

            <span className="text-white/30">|</span>

            {/* Time display */}
            <span className="text-white/90 font-bold tracking-wider">
              {Math.floor(currentTime)}s / {TOTAL_DURATION}s
            </span>

            <span className="hidden sm:inline text-white/30">|</span>

            {/* Active section title */}
            <span
              className="hidden sm:inline font-sans font-semibold px-2 py-0.5 rounded-md"
              style={{ color: currentSection.accent }}
            >
              {isHi ? currentSection.labelHi : currentSection.label}
            </span>
          </div>
        </aside>
      </div>

      {/* Invisible scroll spacer track: gives page real scroll depth */}
      <div ref={trackRef} className="relative z-0 w-full pointer-events-none" />
    </div>
  );
}
