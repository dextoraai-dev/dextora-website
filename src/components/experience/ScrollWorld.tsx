"use client";

/**
 * ScrollWorld — Seamless Continuous Looping Video World
 *
 * 100% Pure Video · Zero Static Images · Unbroken Flight Loop
 *
 * Merged Video Flow (70s Continuous Unbroken Flight Loop):
 *   Dextora Hub (0-6s, hold @ 3s)
 *   → Campus Connector (6-16s)
 *   → Dextora Learn (16-22s, hold @ 19s)
 *   → Classroom Connector (22-32s)
 *   → Dhyeya IAS (32-38s, hold @ 35s)
 *   → Library Connector (38-48s)
 *   → AI Tutor / Chatbot (48-54s, hold @ 51s)
 *   → School Desk Connector (54-64s)
 *   → Convergence / Finale (64-70s, hold @ 67s)
 *   → Seamless Sky Loop back to Dextora Hub (70s -> 0s)
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
import { experienceData } from "@/data/experience";
import {
  ArrowRight,
  ChevronRight,
  Compass,
} from "lucide-react";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => { };
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
  const activeSectionIdxRef = useRef(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlayingContinuous, setIsPlayingContinuous] = useState(false);
  const isPlayingContinuousRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  // isVideoReady tracks whether the video has loaded enough to scrub;
  // stored as a ref to avoid re-renders on every canplaythrough event.
  const isVideoReadyRef = useRef(false);

  const sections = experienceData.sections;
  const TOTAL_DURATION = experienceData.totalDuration || 70;

  // Track user click timestamps to ignore trackpad deflection noise
  const lastClickTimeRef = useRef(0);

  // Scrub targets for rAF interpolation
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  // Scroll progress [0..1] — kept as a ref since only rAF reads it; no re-render needed
  const scrollProgressRef = useRef(0);

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

  // Jump to specific chapter hold time
  const jumpToChapter = useCallback(
    (index: number) => {
      const sec = sections[index];
      if (!sec) return;
      const t = sec.holdTime;

      targetTimeRef.current = t;
      currentTimeRef.current = t;
      setCurrentTime(t);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const top = rect.top + (window.scrollY || window.pageYOffset);
        const totalH = containerRef.current.clientHeight - window.innerHeight;
        const scrollY = top + (t / TOTAL_DURATION) * Math.max(1, totalH);
        window.scrollTo({ top: scrollY, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }

      if (videoRef.current) {
        videoRef.current.currentTime = t;
      }

      activeSectionIdxRef.current = index;
      setActiveSectionIdx(index);
    },
    [sections, TOTAL_DURATION, prefersReducedMotion]
  );

  // Toggle continuous auto-play vs scroll scrubbing
  const togglePlayContinuous = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    lastClickTimeRef.current = Date.now();

    if (isPlayingContinuousRef.current) {
      // ── PAUSE ────────────────────────────────────────────────────────────
      isPlayingContinuousRef.current = false;
      setIsPlayingContinuous(false);
      video.pause();

      targetTimeRef.current = video.currentTime;
      currentTimeRef.current = video.currentTime;
      setCurrentTime(video.currentTime);

      // Sync window scrollbar to current video position
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const top = rect.top + (window.scrollY || window.pageYOffset);
        const totalH = containerRef.current.clientHeight - window.innerHeight;
        const scrollY = top + (video.currentTime / TOTAL_DURATION) * Math.max(1, totalH);
        window.scrollTo({ top: scrollY, behavior: "auto" });
      }
    } else {
      // ── PLAY ─────────────────────────────────────────────────────────────
      // Set ref synchronously BEFORE calling video.play() so rAF tick() sees
      // the playing state immediately and never issues a manual seek while the
      // browser is in the middle of starting playback.
      isPlayingContinuousRef.current = true;
      setIsPlayingContinuous(true);

      // Ensure muted so all browsers grant instant autoplay on click
      video.muted = true;
      // Ensure loop is enabled at the element level as a belt-and-suspenders
      // guard (the JSX `loop` prop sets the attribute at mount, but reinforce
      // it here so a seek-to-end → browser-removes-loop scenario can't happen)
      video.loop = true;

      // If near or past the end of the video, reset to frame 0 before playing
      if (video.currentTime >= TOTAL_DURATION - 0.5) {
        video.currentTime = 0;
        targetTimeRef.current = 0;
        currentTimeRef.current = 0;
        setCurrentTime(0);
        activeSectionIdxRef.current = 0;
        setActiveSectionIdx(0);
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // AbortError is thrown when play() is interrupted by a currentTime
          // assignment. Since we never seek while isPlayingContinuousRef is
          // true, this should not happen — but if it does, retry once.
          console.warn("Video play() rejected:", err?.name, err?.message);
          if (isPlayingContinuousRef.current) {
            video.muted = true;
            video.play().catch((retryErr) => {
              console.error("Video play retry failed:", retryErr?.message);
              isPlayingContinuousRef.current = false;
              setIsPlayingContinuous(false);
            });
          }
        });
      }
    }
  }, [TOTAL_DURATION]);

  // Click anywhere on screen to play/pause the scrolling animation
  const handleStageClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Do not trigger play/pause if user clicked on buttons, links, or inputs
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role='button']")) {
        return;
      }

      togglePlayContinuous();
    },
    [togglePlayContinuous]
  );

  // Sync video HTML5 element events directly with React state.
  // NOTE: We intentionally do NOT listen to the "pause" DOM event here.
  // The browser fires "pause" for internal seeks, buffer stalls, and decoder
  // housekeeping — listening to it would prematurely flip isPlayingContinuous
  // to false every time a seek occurs while continuous play is active.
  // Pause state is managed exclusively by togglePlayContinuous() and the
  // wheel/touch gesture handlers below.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    // When the browser confirms playback started, ensure our ref agrees.
    const handlePlay = () => {
      if (!isPlayingContinuousRef.current) return; // we didn't trigger this
      setIsPlayingContinuous(true);
    };

    // When the video reaches its natural end (loop attr may not fire on some
    // browsers in all edge cases), manually restart from 0 so the world keeps
    // flying without a black frame.
    const handleEnded = () => {
      if (!isPlayingContinuousRef.current) return;
      video.currentTime = 0;
      targetTimeRef.current = 0;
      currentTimeRef.current = 0;
      setCurrentTime(0);
      activeSectionIdxRef.current = 0;
      setActiveSectionIdx(0);
      video.play().catch(() => {});
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Main scroll listener: maps window scroll to continuous video time
  useEffect(() => {
    const handleScroll = () => {
      // While playing continuously, do not let window scroll events hijack video currentTime
      if (isPlayingContinuousRef.current) return;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowY = window.scrollY || window.pageYOffset;
      const containerTop = rect.top + windowY;
      const y = Math.max(0, windowY - containerTop);
      const totalH = container.clientHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, y / Math.max(1, totalH)));

      scrollProgressRef.current = p;
      targetTimeRef.current = p * TOTAL_DURATION;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [TOTAL_DURATION]);

  // User gesture listener: pausing on real intentional wheel scroll or touch swipe
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isPlayingContinuousRef.current) return;

      // Ignore trackpad clicks or resting finger noise within 400ms of click
      if (Date.now() - lastClickTimeRef.current < 400) return;
      if (Math.abs(e.deltaY) < 6 && Math.abs(e.deltaX) < 6) return;

      // User intentionally scrolled -> pause continuous mode and yield to manual scrub
      const video = videoRef.current;
      if (video) {
        video.pause();
        targetTimeRef.current = video.currentTime;
        currentTimeRef.current = video.currentTime;
        setCurrentTime(video.currentTime);
      }
      isPlayingContinuousRef.current = false;
      setIsPlayingContinuous(false);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY || 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPlayingContinuousRef.current) return;
      if (Date.now() - lastClickTimeRef.current < 400) return;

      const currentY = e.touches[0]?.clientY || 0;
      if (Math.abs(currentY - touchStartY) < 15) return; // Ignore tap jitter

      const video = videoRef.current;
      if (video) {
        video.pause();
        targetTimeRef.current = video.currentTime;
        currentTimeRef.current = video.currentTime;
        setCurrentTime(video.currentTime);
      }
      isPlayingContinuousRef.current = false;
      setIsPlayingContinuous(false);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // High-performance rAF loop: smoothly updates or interpolates video currentTime
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (isPlayingContinuousRef.current) {
        // Continuous playback mode: read currentTime directly from native video playback.
        // If the video somehow paused mid-flight (buffer stall, decoder hiccup), nudge
        // it back to playing — but only if we are still in continuous mode.
        if (video.paused && isPlayingContinuousRef.current) {
          video.play().catch(() => {});
        }

        const t = video.currentTime;
        setCurrentTime(t);
        currentTimeRef.current = t;
        targetTimeRef.current = t;
        scrollProgressRef.current = t / TOTAL_DURATION;

        // Compute active chapter from time
        const activeIdx = sections.findIndex(
          (s) => t >= s.startTime && t <= s.endTime
        );
        if (activeIdx !== -1 && activeIdx !== activeSectionIdxRef.current) {
          activeSectionIdxRef.current = activeIdx;
          setActiveSectionIdx(activeIdx);
        }
      } else {
        // Scroll scrub mode: lerp video.currentTime toward targetTime
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
          if (bestIdx !== activeSectionIdxRef.current) {
            activeSectionIdxRef.current = bestIdx;
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
  }, [sections, TOTAL_DURATION]);

  // Video source selector
  const videoSrc = isMobile
    ? experienceData.continuousLoopVideoMobile
    : experienceData.continuousLoopVideo;

  const currentSection = sections[activeSectionIdx] || sections[0];

  return (
    <div
      ref={containerRef}
      className="sw-root relative w-full bg-[#080A0F] text-white selection:bg-[var(--brand-terracotta)]"
      style={{
        height: `${sections.length * 125}vh`,
        ["--sw-accent" as string]: currentSection.accent,
      }}
    >
      {/* ── Sticky 100vw x 100dvh Pure Video Stage (Click anywhere to play/pause) ───────────────────────────── */}
      <div
        onClick={handleStageClick}
        className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black cursor-pointer select-none"
      >
        {/* Layer 1: Continuous HTML5 Video Player (Zero Still Images) */}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none will-change-transform"
          playsInline
          muted
          loop
          autoPlay={false}
          preload="auto"
          onLoadedData={() => {
            isVideoReadyRef.current = true;
            if (videoRef.current && currentTimeRef.current > 0) {
              videoRef.current.currentTime = currentTimeRef.current;
            }
          }}
          onCanPlayThrough={() => { isVideoReadyRef.current = true; }}
        />

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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${isActive
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

          {/* Symmetrical spacer to keep chapters perfectly centered */}
          <div className="w-28 hidden sm:block pointer-events-none" />
        </header>

        {/* Layer 5: Dynamic HUD Typography Overlays */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center max-md:items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 max-md:pb-16">
            <div className="max-w-xl md:max-w-2xl transition-all duration-500 ease-out">
              {sections.map((sec, idx) => {
                const isSelected = idx === activeSectionIdx;
                let opacity = 0;

                if (isSelected) {
                  if (idx === 0) {
                    // 01 · Hub: fully visible at top of page (0 to holdTime), fades out as camera flies away
                    if (currentTime <= sec.holdTime) {
                      opacity = 1;
                    } else {
                      const diff = currentTime - sec.holdTime;
                      opacity = Math.max(0, 1 - diff / 2.2);
                    }
                  } else if (idx === sections.length - 1) {
                    // 05 · Convergence (Finale): fades in as camera enters scene, and remains
                    // 100% visible on manual scroll so the user can easily read and click the CTAs!
                    if (currentTime < sec.holdTime) {
                      const diff = sec.holdTime - currentTime;
                      opacity = Math.max(0, 1 - diff / 2.2);
                    } else {
                      if (isPlayingContinuous) {
                        // Soft dissolve right before 70s continuous loop reset
                        opacity =
                          currentTime > sec.endTime - 0.8
                            ? Math.max(0, 1 - (currentTime - (sec.endTime - 0.8)) / 0.7)
                            : 1;
                      } else {
                        // Keep fully visible when scrolled to Convergence / bottom of section
                        opacity = 1;
                      }
                    }
                  } else {
                    // Intermediate chapters: bell curve centered at holdTime
                    const timeDiff = Math.abs(currentTime - sec.holdTime);
                    opacity = timeDiff < 2.5 ? Math.max(0, 1 - timeDiff / 2.2) : 0;
                  }
                }

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

        {/* Layer 6: Subtle Play / Pause Status Indicator Pill */}
        <div className="absolute bottom-6 right-6 z-30 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/80 shadow-xl transition-all">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isPlayingContinuous
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"
                : "bg-white/40"
            }`}
          />
          <span>{isPlayingContinuous ? "Playing · Click to pause" : "Click anywhere to fly"}</span>
        </div>
      </div>

      {/* Invisible scroll spacer track: gives page real scroll depth */}
      <div ref={trackRef} className="relative z-0 w-full pointer-events-none" />
    </div>
  );
}
