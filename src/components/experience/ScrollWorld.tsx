"use client";

/**
 * ScrollWorld — Unified One-Track Cinematic Scroll Experience
 *
 * Single scroll listener · Single rAF loop · One sticky viewport
 *
 * Story order:
 *   Hub intro → [conn1] → Dextora Learn → [conn2] → Dhyeya IAS →
 *   [conn3] → Dextora CRM → [conn4] → Closing CTA
 *
 * Per product section (Learn / Dhyeya / CRM):
 *   • First ~40 % of scroll: exterior isometric clip (dive)
 *   • Middle ~40 %: interior photorealistic scrub clip (hold) + product text overlay
 *   • Last ~20 %: exit crossfade to connector
 *
 * Background: CSS custom property --sw-depth (0 → 1) drives a smooth
 * light-to-dark gradient that deepens as the user scrolls toward CRM.
 *
 * Glass bubbles: 3 subtle ones only on non-coarse devices.
 */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { experienceData, ExperienceSection } from "@/data/experience";
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Compass,
  Layers,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { products } from "@/data/products";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Segment {
  kind: "dive" | "conn";
  si: number;           // section index
  // Exterior clip + still
  clip: string;
  clipM?: string;
  still?: string;
  stillM?: string;
  // Interior clip (product sections only)
  interiorClip?: string;
  interiorClipM?: string;
  interiorStill?: string;
  accent: string;
  w: number;
  linger?: number;
  start: number;
  end: number;

  // Runtime DOM refs
  el?: HTMLDivElement;
  img?: HTMLImageElement;
  video?: HTMLVideoElement | null;
  interiorVideo?: HTMLVideoElement | null;
  interiorImg?: HTMLImageElement;

  // Scrub state
  hasClip: boolean;
  loadingClip: boolean;
  readyClip: boolean;
  hasInterior: boolean;
  loadingInterior: boolean;
  readyInterior: boolean;
  cur: number;
  target: number;
  interiorCur: number;
  interiorTarget: number;
  visible: boolean;
  objectUrl?: string;
  interiorObjectUrl?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

// 3 glass bubbles — sizes / positions carefully tuned to not distract
const BUBBLES = [
  { x: "16%",  y: "22%", size: 64  },
  { x: "80%",  y: "30%", size: 48  },
  { x: "52%",  y: "72%", size: 38  },
] as const;

// Interior phase boundaries within a product section (0..1 of that segment)
const INTERIOR_START = 0.38;  // dive → interior crossfade begins
const INTERIOR_FULL  = 0.52;  // exterior fully hidden, interior fully visible
const INTERIOR_END   = 0.82;  // interior begins to exit
const TEXT_IN_START  = 0.45;  // text fades in
const TEXT_IN_FULL   = 0.58;
const TEXT_OUT_START = 0.72;
const TEXT_OUT_FULL  = 0.82;

// ─── Component ───────────────────────────────────────────────────────────────

export function ScrollWorld() {
  const { locale } = useI18n();
  const isHi = locale === "hi";

  // DOM refs
  const containerRef   = useRef<HTMLDivElement>(null);
  const trackRef       = useRef<HTMLDivElement>(null);
  const stageRef       = useRef<HTMLDivElement>(null);
  const copyLayerRef   = useRef<HTMLDivElement>(null);
  const routeRef       = useRef<HTMLDivElement>(null);
  const scrollbarRef   = useRef<HTMLSpanElement>(null);
  const hintRef        = useRef<HTMLDivElement>(null);
  const bubblesRef     = useRef<HTMLDivElement>(null);
  const bgRef          = useRef<HTMLDivElement>(null);

  // State
  const [reducedMotion, setReducedMotion]       = useState(false);
  const [isOverviewMode, setIsOverviewMode]     = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [scrollProgress, setScrollProgress]     = useState(0);

  const sections   = experienceData.sections;
  const connectors = experienceData.connectors;
  const connectorsM = experienceData.connectorsMobile;
  const diveW      = experienceData.diveScroll || 1.4;
  const connW      = experienceData.connScroll  || 0.9;
  const crossfade  = experienceData.crossfade   || 0.12;
  const N          = sections.length;

  // Runtime stores
  const blobUrlsRef   = useRef<string[]>([]);
  const segmentsRef   = useRef<Segment[]>([]);
  const copiesRef     = useRef<HTMLElement[]>([]);
  const dotsRef       = useRef<HTMLButtonElement[]>([]);
  const rafIdRef      = useRef<number | null>(null);
  const tickingRef    = useRef(false);
  const userReadyRef  = useRef(false);

  // Reduced-motion detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Jump-to helper
  const jumpTo = useCallback(
    (index: number) => {
      const segs = segmentsRef.current;
      const tgt  = segs.find((s) => s.kind === "dive" && s.si === index);
      if (!tgt || !containerRef.current) return;
      const top  = containerRef.current.offsetTop;
      const y    = top + tgt.start + (tgt.end - tgt.start) * 0.5;
      window.scrollTo({ top: y, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [reducedMotion]
  );

  // ── Main scrub engine ────────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || isOverviewMode) return;

    const container   = containerRef.current;
    const track       = trackRef.current;
    const stage       = stageRef.current;
    const copyLayer   = copyLayerRef.current;
    const route       = routeRef.current;
    const scrollbar   = scrollbarRef.current;
    const hint        = hintRef.current;
    const bubblesEl   = bubblesRef.current;
    const bgEl        = bgRef.current;

    if (!container || !track || !stage || !copyLayer || !route || !scrollbar || !hint) return;

    const coarse   = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const smallMQ  = window.matchMedia("(max-width: 860px)");
    const isMobile = () => coarse || smallMQ.matches;

    // ── Build segment chain: dive0, conn0, dive1, conn1, … ──────────────
    const SEGMENTS: Segment[] = [];
    sections.forEach((s, i) => {
      SEGMENTS.push({
        kind: "dive",
        si: i,
        clip: s.clip,
        clipM: s.clipMobile,
        still: s.still,
        stillM: s.stillMobile,
        interiorClip: s.interiorClip,
        interiorClipM: s.interiorClipMobile,
        interiorStill: s.interiorStill,
        accent: s.accent,
        w: s.scroll || diveW,
        linger: s.linger || 0,
        start: 0, end: 0,
        hasClip: false, loadingClip: false, readyClip: false,
        hasInterior: false, loadingInterior: false, readyInterior: false,
        cur: 0, target: 0,
        interiorCur: 0, interiorTarget: 0,
        visible: false,
      });
      if (i < N - 1 && connectors[i]) {
        SEGMENTS.push({
          kind: "conn",
          si: i,
          clip: connectors[i],
          clipM: connectorsM[i],
          still: sections[i + 1]?.still,
          stillM: sections[i + 1]?.stillMobile,
          accent: sections[i + 1]?.accent ?? "#E05A38",
          w: connW,
          start: 0, end: 0,
          hasClip: false, loadingClip: false, readyClip: false,
          hasInterior: false, loadingInterior: false, readyInterior: false,
          cur: 0, target: 0,
          interiorCur: 0, interiorTarget: 0,
          visible: false,
        });
      }
    });

    segmentsRef.current = SEGMENTS;
    const NSEG = SEGMENTS.length;

    // ── Create DOM nodes ─────────────────────────────────────────────────
    stage.innerHTML = "";
    SEGMENTS.forEach((s) => {
      const scene = document.createElement("div");
      scene.className = "sw-scene";
      scene.style.setProperty("--sw-accent", s.accent ?? "");

      // Exterior still
      const img = document.createElement("img");
      img.className = "sw-scene__still";
      img.alt = "";
      img.decoding = "async";
      img.loading = "eager";
      const poster = isMobile() && s.stillM ? s.stillM : s.still;
      if (poster) img.src = poster;
      scene.appendChild(img);

      // Interior fallback still (hidden initially)
      if (s.interiorStill) {
        const iImg = document.createElement("img");
        iImg.className = "sw-scene__interior-still";
        iImg.alt = "";
        iImg.decoding = "async";
        iImg.loading = "lazy";
        iImg.src = s.interiorStill;
        scene.appendChild(iImg);
        s.interiorImg = iImg;
      }

      stage.appendChild(scene);
      s.el  = scene;
      s.img = img;
    });

    // Capture overlay articles and dot buttons
    copiesRef.current = Array.from(copyLayer.querySelectorAll<HTMLElement>(".sw-copy"));
    dotsRef.current   = Array.from(route.querySelectorAll<HTMLButtonElement>(".sw-route__dot"));

    // ── Geometry helpers ─────────────────────────────────────────────────
    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const smooth = (x: number) => { x = clamp(x); return x * x * (3 - 2 * x); };
    const fade01 = (x: number, a: number, b: number) => clamp((x - a) / (b - a));

    let vh = window.innerHeight;
    let laidOutW = window.innerWidth;
    let stageX = window.innerWidth > 860 ? 4 : 0;
    let totalW = 0;
    let activeIndex = -1;

    function layout() {
      vh = window.innerHeight;
      laidOutW = window.innerWidth;
      stageX = window.innerWidth > 860 ? 4 : 0;
      let off = 0;
      SEGMENTS.forEach((s) => {
        s.start = off * vh;
        off += s.w;
        s.end = off * vh;
      });
      totalW = off;
      if (track) track.style.height = `${totalW * vh + vh}px`;
      read();
    }

    // ── Clip loader ──────────────────────────────────────────────────────
    function loadClip(s: Segment) {
      if (s.loadingClip || !s.clip || !s.el) return;
      s.loadingClip = true;
      const url = isMobile() && s.clipM ? s.clipM : s.clip;

      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("404"))))
        .then((blob) => {
          const obj = URL.createObjectURL(blob);
          blobUrlsRef.current.push(obj);
          s.objectUrl = obj;

          const v = document.createElement("video");
          v.className   = "sw-scene__video";
          v.muted       = true;
          v.playsInline = true;
          v.preload     = "auto";
          v.setAttribute("muted", "");
          v.setAttribute("playsinline", "");
          v.src = obj;

          v.addEventListener("loadedmetadata", () => { s.readyClip = true; read(); });
          v.addEventListener("seeked", () => { if (s.el) s.el.classList.add("has-clip"); }, { once: true });
          v.addEventListener("loadeddata", () => {
            try { v.pause(); } catch { /* ignore */ }
            if (userReadyRef.current) primeVideo(v);
          });

          if (s.el) s.el.appendChild(v);
          s.video   = v;
          s.hasClip = true;
        })
        .catch(() => { s.loadingClip = false; });
    }

    function loadInterior(s: Segment) {
      if (!s.interiorClip || s.loadingInterior || s.hasInterior) return;
      s.loadingInterior = true;
      const url = isMobile() && s.interiorClipM ? s.interiorClipM : s.interiorClip;

      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error("404"))))
        .then((blob) => {
          const obj = URL.createObjectURL(blob);
          blobUrlsRef.current.push(obj);
          s.interiorObjectUrl = obj;

          const v = document.createElement("video");
          v.className   = "sw-scene__interior";
          v.muted       = true;
          v.playsInline = true;
          v.preload     = "auto";
          v.setAttribute("muted", "");
          v.setAttribute("playsinline", "");
          v.src = obj;

          v.addEventListener("loadedmetadata", () => { s.readyInterior = true; });
          v.addEventListener("loadeddata", () => {
            try { v.pause(); } catch { /* ignore */ }
            if (userReadyRef.current) primeVideo(v);
          });

          if (s.el) s.el.appendChild(v);
          s.interiorVideo = v;
          s.hasInterior   = true;
        })
        .catch(() => { s.loadingInterior = false; });
    }

    // ── Main read function (called via rAF after scroll) ─────────────────
    function read() {
      if (!container) return;
      const containerTop = container.offsetTop;
      const windowY      = window.scrollY || window.pageYOffset;
      const y            = Math.max(0, windowY - containerTop);
      const fade         = crossfade * vh;

      // Find current segment
      let ci = 0;
      for (let i = 0; i < NSEG; i++) if (y >= SEGMENTS[i].start) ci = i;

      // Compute per-segment state
      for (let i = 0; i < NSEG; i++) {
        const s     = SEGMENTS[i];
        const local = clamp((y - s.start) / Math.max(1, s.end - s.start));

        // Lazy-load clips as we approach
        if (y > s.start - 1.6 * vh && y < s.end + 1.6 * vh) {
          loadClip(s);
          if (s.kind === "dive" && s.interiorClip && local > 0.2) loadInterior(s);
        }

        // Exterior scrub target
        s.target = s.linger
          ? lingerEase(local, s.linger)
          : local;

        // Interior scrub target (only 0..1 within INTERIOR_START..INTERIOR_END)
        if (s.kind === "dive" && s.interiorClip) {
          const iLocal = clamp(
            (local - INTERIOR_START) / (INTERIOR_END - INTERIOR_START)
          );
          s.interiorTarget = iLocal;
        }

        // Segment opacity
        let outside = 0;
        if (y < s.start) outside = s.start - y;
        else if (y > s.end) outside = y - s.end;
        const op = smooth(1 - outside / fade);

        if (s.el) {
          s.el.style.opacity = String(op);
          s.visible = op > 0.001;
          s.el.style.zIndex = i === ci ? "120" : String(100 + Math.round(op * 10));
        }

        // Exterior still parallax (when clip not ready)
        if ((!s.hasClip || !s.readyClip) && s.img) {
          const sc = 1.03 + local * 0.12;
          s.img.style.transform = `translateX(${stageX - 2}vw) scale(${sc.toFixed(3)})`;
        }

        // Interior still / video opacity crossfade
        if (s.kind === "dive" && s.interiorClip) {
          const intOpacity = smooth(
            clamp((local - INTERIOR_START) / (INTERIOR_FULL - INTERIOR_START))
          );
          const exitOpacity = smooth(
            1 - clamp((local - INTERIOR_END) / (s.w * 0.1 + 0.05))
          );
          const finalIntOp = intOpacity * exitOpacity;

          if (s.interiorImg)   s.interiorImg.style.opacity   = String(finalIntOp);
          if (s.interiorVideo) s.interiorVideo.style.opacity  = String(s.readyInterior ? finalIntOp : 0);

          // Hide interior still when video is ready
          if (s.readyInterior && s.interiorImg) s.interiorImg.style.opacity = "0";
        }
      }

      // ── Copy/text overlay per product section ───────────────────────────
      let productCopyIdx = 0;
      for (let i = 0; i < N; i++) {
        const sec  = sections[i];
        if (!sec.productSlug) continue;           // Hub and Finale skip text overlay

        const dive = SEGMENTS.find((s) => s.kind === "dive" && s.si === i);
        if (!dive) { productCopyIdx++; continue; }

        const local = clamp((y - dive.start) / Math.max(1, dive.end - dive.start));

        // Text visible only during interior hold window
        let cop = 0;
        if (local >= TEXT_IN_START && local <= TEXT_OUT_FULL) {
          if (local < TEXT_IN_FULL) {
            cop = smooth(fade01(local, TEXT_IN_START, TEXT_IN_FULL));
          } else if (local > TEXT_OUT_START) {
            cop = smooth(1 - fade01(local, TEXT_OUT_START, TEXT_OUT_FULL));
          } else {
            cop = 1;
          }
        }

        const c = copiesRef.current[productCopyIdx];
        if (c) {
          c.style.opacity      = String(cop);
          c.style.transform    = `translateY(${(0.5 - clamp(local, 0.45, 0.78)) * 6}vh)`;
          c.style.pointerEvents = cop > 0.5 ? "auto" : "none";
        }
        productCopyIdx++;
      }

      // ── Active section → dot highlight ──────────────────────────────────
      const cur  = SEGMENTS[ci];
      const near = clamp(
        cur.kind === "dive"
          ? cur.si
          : (y - cur.start) / Math.max(1, cur.end - cur.start) > 0.5
            ? cur.si + 1
            : cur.si,
        0,
        N - 1
      );

      if (near !== activeIndex) {
        activeIndex = near;
        setActiveSectionIdx(near);
        dotsRef.current.forEach((d, k) => d.classList.toggle("is-active", k === near));
        container.style.setProperty("--sw-accent", sections[near].accent ?? "");
      }

      // ── Scroll progress ──────────────────────────────────────────────────
      const totalH  = totalW * vh;
      const progress = clamp(y / Math.max(1, totalH));
      setScrollProgress(progress);

      if (scrollbar) scrollbar.style.transform = `scaleX(${progress})`;
      if (hint)      hint.style.opacity        = String(clamp(1 - y / (0.45 * vh)));

      // ── Light-to-dark background depth gradient ──────────────────────────
      // Deepens smoothly as user scrolls from Hub → CRM scene
      // depth: 0 at Hub start, 1 at CRM mid-point, softens at Finale
      const crmDiveIdx = sections.findIndex((s) => s.id === "crm");
      const crmSeg     = crmDiveIdx >= 0
        ? SEGMENTS.find((s) => s.kind === "dive" && s.si === crmDiveIdx)
        : null;
      let depth = 0;
      if (crmSeg) {
        depth = smooth(clamp(y / Math.max(1, crmSeg.start + (crmSeg.end - crmSeg.start) * 0.6)));
      }
      if (bgEl) {
        bgEl.style.setProperty("--sw-depth", depth.toFixed(3));
      }

      // ── Bubble parallax ──────────────────────────────────────────────────
      if (bubblesEl && !coarse) {
        const bShift = (progress - 0.5) * 60;
        bubblesEl.style.transform = `translate3d(0, ${bShift}px, 0)`;
      }

      tickingRef.current = false;
    }

    function lingerEase(x: number, L: number) {
      L = clamp(L);
      const c = x - 0.5;
      return (1 - L) * x + L * (4 * c * c * c + 0.5);
    }

    // ── rAF loop: interpolates video.currentTime toward target ───────────
    function raf() {
      const eps = isMobile() ? 0.02 : 0.008;
      for (let i = 0; i < NSEG; i++) {
        const s = SEGMENTS[i];

        // Exterior clip scrub
        if (s.hasClip && s.readyClip && s.video && !s.video.seeking) {
          if (s.visible || Math.abs(s.cur - s.target) >= 0.002) {
            s.cur += (s.target - s.cur) * 0.18;
            const dur = s.video.duration || 1;
            const t   = clamp(s.cur, 0, 0.999) * dur;
            if (Math.abs(s.video.currentTime - t) > eps) {
              try { s.video.currentTime = t; } catch { /* ignore */ }
            }
          }
        }

        // Interior clip scrub
        if (s.hasInterior && s.readyInterior && s.interiorVideo && !s.interiorVideo.seeking) {
          if (s.visible || Math.abs(s.interiorCur - s.interiorTarget) >= 0.002) {
            s.interiorCur += (s.interiorTarget - s.interiorCur) * 0.18;
            const dur = s.interiorVideo.duration || 1;
            const t   = clamp(s.interiorCur, 0, 0.999) * dur;
            if (Math.abs(s.interiorVideo.currentTime - t) > eps) {
              try { s.interiorVideo.currentTime = t; } catch { /* ignore */ }
            }
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(raf);
    }

    function primeVideo(v: HTMLVideoElement | null) {
      if (!isMobile() || !v) return;
      try {
        const p = v.play();
        if (p?.then) p.then(() => { try { v.pause(); } catch { /* ignore */ } }).catch(() => { /* ignore */ });
      } catch { /* ignore */ }
    }

    function onFirstGesture() {
      if (userReadyRef.current) return;
      userReadyRef.current = true;
      SEGMENTS.forEach((s) => {
        primeVideo(s.video ?? null);
        primeVideo(s.interiorVideo ?? null);
      });
    }

    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(read);
      }
    }

    function onResize() {
      if (coarse && window.innerWidth === laidOutW) return;
      layout();
    }

    // Attach listeners
    window.addEventListener("pointerdown",       onFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart",        onFirstGesture, { once: true, passive: true });
    window.addEventListener("scroll",            onScroll,       { passive: true });
    window.addEventListener("resize",            onResize);
    window.addEventListener("orientationchange", layout);

    layout();
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("pointerdown",       onFirstGesture);
      window.removeEventListener("touchstart",        onFirstGesture);
      window.removeEventListener("scroll",            onScroll);
      window.removeEventListener("resize",            onResize);
      window.removeEventListener("orientationchange", layout);

      SEGMENTS.forEach((s) => {
        [s.video, s.interiorVideo].forEach((v) => {
          if (v) {
            try { v.pause(); v.src = ""; v.load(); v.remove(); } catch { /* ignore */ }
          }
        });
      });

      blobUrlsRef.current.forEach((u) => { try { URL.revokeObjectURL(u); } catch { /* ignore */ } });
      blobUrlsRef.current = [];
    };
  }, [reducedMotion, isOverviewMode, diveW, connW, crossfade, sections, connectors, connectorsM, N]);

  // ── Product sections that get a text overlay ─────────────────────────────
  const productSections = sections.filter((s) => !!s.productSlug);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="sw-root relative w-full"
      style={{
        ["--sw-bg"      as string]: "var(--bg-base)",
        ["--sw-ink"     as string]: "var(--text-primary)",
        ["--sw-ink-soft"as string]: "var(--text-secondary)",
        ["--sw-accent"  as string]: sections[activeSectionIdx]?.accent ?? "#E05A38",
      }}
    >
      {/* ── REDUCED MOTION / OVERVIEW FALLBACK ──────────────────────────── */}
      {reducedMotion || isOverviewMode ? (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[var(--border-subtle)]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-terracotta)]/10 text-[var(--brand-terracotta)] text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" />
                <span>{isHi ? "वास्तुकला एवं शैक्षणिक विहंगम दृश्य" : "Ecosystem & Architectural Overview"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
                {isHi ? "डेक्सटोरा इकोसिस्टम" : "The Dextora Cinematic World"}
              </h1>
              <p className="text-sm text-[var(--text-secondary)] max-w-xl">
                {isHi
                  ? "कम-गतिविधि मोड सक्रिय है। सभी शैक्षणिक परिसरों का स्थिर दृश्य देखें।"
                  : "Static overview mode active. Explore all learning hubs without heavy video decoding."}
              </p>
            </div>
            <button
              onClick={() => setIsOverviewMode(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand-forest)] text-[#F8F5EE] hover:bg-[#18453A] text-xs font-semibold shadow-sm transition-all cursor-pointer self-start sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
              <span>{isHi ? "फ्लाई-थ्रू मोड सक्रिय करें" : "Switch to 3D Fly-Through"}</span>
            </button>
          </div>

          {/* Stacked cards: exterior + interior for each section */}
          <div className="space-y-16">
            {sections.map((section, idx) => {
              const prod = section.productSlug
                ? products.find((p) => p.slug === section.productSlug)
                : null;
              const name    = isHi ? section.titleHi  : section.title;
              const eyebrow = isHi ? section.eyebrowHi : section.eyebrow;
              const body    = isHi ? section.bodyHi    : section.body;
              const tags    = isHi ? section.tagsHi    : section.tags;

              return (
                <article
                  key={section.id}
                  id={`scene-${section.id}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm hover:border-[var(--brand-terracotta)]/40 transition-all duration-300"
                >
                  {/* Visual */}
                  <div className="lg:col-span-7 grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1 relative aspect-video rounded-2xl overflow-hidden bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.still}
                        alt={`${name} exterior`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--bg-base)]/85 backdrop-blur-md text-[10px] font-mono font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)]">
                        {String(idx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                      </div>
                    </div>
                    {section.interiorStill && (
                      <div className="col-span-2 sm:col-span-1 relative aspect-video rounded-2xl overflow-hidden bg-[var(--bg-base)] border border-[var(--border-subtle)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={section.interiorStill}
                          alt={`${name} interior`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Copy */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-bold tracking-wider uppercase" style={{ color: section.accent }}>
                      {eyebrow}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)] leading-snug">
                      {name}
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{body}</p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: section.accent }} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {section.cta && (
                      <div className="flex flex-wrap items-center gap-3 pt-3">
                        <Link
                          href={section.cta.primary.href}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--brand-forest)] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs shadow-sm transition-all"
                        >
                          <span>{isHi ? section.cta.primary.labelHi : section.cta.primary.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
                        </Link>
                        {section.cta.secondary && (
                          <Link
                            href={section.cta.secondary.href}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-xs transition-all"
                          >
                            <span>{isHi ? section.cta.secondary.labelHi : section.cta.secondary.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      ) : (

        /* ── FULL SCROLL-SCRUBBED CANVAS ─────────────────────────────────── */
        <div className="relative w-full">
          {/* Sticky viewport */}
          <div className="sticky top-0 relative w-full h-[100vh] h-[100dvh] overflow-hidden select-none">

            {/* ── Background: light-to-dark depth gradient ────────────────── */}
            <div
              ref={bgRef}
              className="sw-bg absolute inset-0 z-0 pointer-events-none"
              style={{ ["--sw-depth" as string]: "0" }}
            />

            {/* ── 3 Subtle Glass Bubbles (desktop only) ───────────────────── */}
            {!false && (
              <div
                ref={bubblesRef}
                className="sw-bubbles absolute inset-0 z-[5] pointer-events-none overflow-hidden"
                aria-hidden="true"
              >
                {BUBBLES.map((b, k) => (
                  <div
                    key={k}
                    className="absolute rounded-full border border-white/30 dark:border-white/10 backdrop-blur-sm hidden md:block"
                    style={{
                      left:   b.x,
                      top:    b.y,
                      width:  `${b.size}px`,
                      height: `${b.size}px`,
                      background:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.12) 65%, rgba(255,255,255,0.04))",
                      opacity: 0.55,
                    }}
                  >
                    <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.5px]" />
                  </div>
                ))}
              </div>
            )}

            {/* ── Scroll progress bar ──────────────────────────────────────── */}
            <div className="sw-scrollbar absolute top-0 left-0 right-0 h-[3px] z-[60] bg-[var(--border-subtle)]">
              <span
                ref={scrollbarRef}
                className="block h-full w-full origin-left bg-[var(--brand-terracotta)] transition-transform duration-75"
              />
            </div>

            {/* ── Static overview toggle (top-right) ──────────────────────── */}
            <div className="absolute top-20 right-4 sm:right-8 z-50">
              <button
                onClick={() => setIsOverviewMode(true)}
                title={isHi ? "स्थिर विहंगम दृश्य पर स्विच करें" : "Switch to static overview"}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-surface)]/85 hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] backdrop-blur-md text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
                <span className="hidden sm:inline">{isHi ? "स्थिर विहंगम दृश्य" : "Static Overview"}</span>
              </button>
            </div>

            {/* ── Scene stage ─────────────────────────────────────────────── */}
            <div ref={stageRef} className="sw-stage absolute inset-0 z-10 pointer-events-none" />

            {/* ── Product text overlays (one per product section) ──────────── */}
            <div
              ref={copyLayerRef}
              className="sw-copylayer absolute inset-0 z-20 pointer-events-none"
            >
              {productSections.map((section, idx) => {
                const prod = products.find((p) => p.slug === section.productSlug);
                const name    = isHi && prod?.nameHi    ? prod.nameHi    : (prod?.name    ?? section.title);
                const tagline = isHi && prod?.taglineHi ? prod.taglineHi : (prod?.tagline ?? section.body);
                const oneLiner = isHi && prod?.oneLinerHi ? prod.oneLinerHi : (prod?.oneLiner ?? "");
                const feats   = isHi && prod?.featuresHi ? prod.featuresHi : (prod?.features.slice(0, 3) ?? section.tags);
                const eyebrow = isHi ? section.eyebrowHi : section.eyebrow;

                const primaryHref   = section.cta?.primary.href   ?? "/products";
                const primaryLabel  = isHi ? (section.cta?.primary.labelHi   ?? "Launch Platform") : (section.cta?.primary.label   ?? "Launch Platform");
                const secondaryHref = section.cta?.secondary?.href ?? `/products/${section.productSlug}`;
                const secondaryLabel = isHi ? (section.cta?.secondary?.labelHi ?? "Deep Dive") : (section.cta?.secondary?.label ?? "Deep Dive");

                return (
                  <article
                    key={section.id}
                    className="sw-copy absolute left-[clamp(18px,5vw,64px)] top-1/2 -translate-y-1/2 w-[min(46vw,520px)] opacity-0"
                    style={{ ["--sw-accent" as string]: section.accent }}
                  >
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm tracking-wider uppercase"
                        style={{ backgroundColor: section.accent }}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{eyebrow}</span>
                      </span>
                      {prod && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-black/40 border-white/20 text-white/90 backdrop-blur-sm">
                          {isHi ? (prod.statusBadgeHi ?? prod.statusBadge) : prod.statusBadge}
                        </span>
                      )}
                    </div>

                    {/* Product name */}
                    <h2 className="sw-copy__title font-serif font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-[clamp(1.85rem,3.8vw,3.2rem)] leading-[1.08] mt-3 tracking-tight line-clamp-2">
                      {name}
                    </h2>

                    {/* Tagline + one-liner */}
                    <div className="mt-3 space-y-1.5">
                      <p className="text-sm sm:text-base lg:text-lg font-medium leading-snug line-clamp-2 text-[#F1F5F9] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
                        {tagline}
                      </p>
                      {oneLiner && (
                        <p className="text-xs sm:text-sm leading-relaxed line-clamp-2 text-[#E2E8F0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                          {oneLiner}
                        </p>
                      )}
                    </div>

                    {/* 3 feature chips */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {feats.slice(0, 3).map((f: string, fi: number) => (
                        <span
                          key={fi}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-black/50 text-[#F8FAFC] border-white/20 backdrop-blur-md"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: section.accent }} />
                          <span className="truncate max-w-[200px] sm:max-w-[280px]">{f}</span>
                        </span>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="sw-copy__cta flex flex-wrap gap-3 mt-5 pointer-events-auto">
                      <a
                        href={primaryHref}
                        target={primaryHref.startsWith("http") ? "_blank" : undefined}
                        rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="sw-btn inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{primaryLabel}</span>
                        <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                      </a>
                      <Link
                        href={secondaryHref}
                        className="sw-btn inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm font-semibold text-xs sm:text-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        <span>{secondaryLabel}</span>
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* ── Route navigation dots ────────────────────────────────────── */}
            <aside
              ref={routeRef}
              aria-label="Scene navigation"
              className="sw-route absolute right-[clamp(14px,2.4vw,30px)] top-1/2 -translate-y-1/2 z-40 flex flex-col gap-5 p-2.5"
            >
              {sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => jumpTo(idx)}
                  className={`sw-route__dot group relative w-4 h-4 grid place-items-center bg-transparent border-0 cursor-pointer ${activeSectionIdx === idx ? "is-active" : ""}`}
                  style={{ ["--sw-accent" as string]: section.accent }}
                  title={isHi ? section.labelHi : section.label}
                >
                  <span className="sw-route__label absolute right-6 top-1/2 -translate-y-1/2 translate-x-1 whitespace-nowrap text-xs font-semibold text-[var(--text-primary)] bg-[var(--bg-surface)]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[var(--border-subtle)] shadow-sm opacity-0 pointer-events-none group-hover:opacity-100 group-focus:opacity-100 transition-all duration-200">
                    {isHi ? section.labelHi : section.label}
                  </span>
                  <i className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--brand-terracotta)] transition-all duration-300 group-hover:scale-125" />
                </button>
              ))}
            </aside>

            {/* ── Scroll hint ──────────────────────────────────────────────── */}
            <div
              ref={hintRef}
              className="sw-hint absolute left-1/2 -translate-x-1/2 bottom-7 z-30 flex flex-col items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[var(--text-muted)] pointer-events-none transition-opacity duration-300"
            >
              <span>{isHi ? "आगे बढ़ने के लिए स्क्रॉल करें" : "Scroll to fly through"}</span>
              <i className="w-5 h-8 rounded-full border-2 border-[var(--text-muted)]/40 relative flex justify-center">
                <span className="w-1 h-1.5 rounded-full bg-[var(--brand-terracotta)] absolute top-1.5 animate-bounce" />
              </i>
            </div>
          </div>

          {/* ── Invisible scroll spacer track ───────────────────────────────── */}
          <div ref={trackRef} className="sw-track relative z-0 w-full pointer-events-none" />
        </div>
      )}

      {/* ── Scoped CSS ────────────────────────────────────────────────────── */}
      <style jsx global>{`
        /* ── Background depth gradient ──────────────────────────────────── */
        .sw-bg {
          background: color-mix(
            in srgb,
            #FAF7F0 calc((1 - var(--sw-depth, 0)) * 100%),
            #0C0E14 calc(var(--sw-depth, 0) * 100%)
          );
          transition: background 0.08s linear;
        }

        @media (prefers-color-scheme: dark) {
          .sw-bg {
            background: color-mix(
              in srgb,
              #111318 calc((1 - var(--sw-depth, 0)) * 100%),
              #050608 calc(var(--sw-depth, 0) * 100%)
            );
          }
        }

        :root[data-theme="dark"] .sw-bg {
          background: color-mix(
            in srgb,
            #111318 calc((1 - var(--sw-depth, 0)) * 100%),
            #050608 calc(var(--sw-depth, 0) * 100%)
          );
        }

        /* ── Scene layer ────────────────────────────────────────────────── */
        .sw-scene {
          position: absolute;
          inset: 0;
          opacity: 0;
          overflow: hidden;
          will-change: opacity;
        }

        .sw-scene__still,
        .sw-scene__video,
        .sw-scene__interior,
        .sw-scene__interior-still {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 44%;
        }

        .sw-scene__still {
          will-change: transform;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .sw-scene__video {
          z-index: 1;
        }

        .sw-scene.has-clip .sw-scene__still {
          opacity: 0;
        }

        /* Interior layers sit on top of exterior */
        .sw-scene__interior-still {
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .sw-scene__interior {
          z-index: 3;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* ── Left-edge text scrim ───────────────────────────────────────── */
        .sw-copylayer::before {
          content: "";
          position: absolute;
          inset: 0;
          width: min(58vw, 780px);
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(0, 0, 0, 0.48) 36%,
            rgba(0, 0, 0, 0.12) 64%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── Copy overlay ───────────────────────────────────────────────── */
        .sw-copy {
          transition: none;
        }

        /* ── Route nav ──────────────────────────────────────────────────── */
        .sw-route::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 18px;
          bottom: 18px;
          width: 2px;
          transform: translateX(-50%);
          background: var(--border-subtle);
          opacity: 0.7;
        }

        .sw-route__dot.is-active i {
          background: var(--sw-accent);
          transform: scale(1.4);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--sw-accent) 25%, transparent);
        }

        /* ── Mobile overrides ───────────────────────────────────────────── */
        @media (max-width: 860px) {
          .sw-copylayer::before {
            width: 100%;
            height: 60%;
            top: auto;
            bottom: 0;
            background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.55) 45%,
              transparent 100%
            );
          }

          .sw-copy {
            left: clamp(16px, 4vw, 40px) !important;
            right: clamp(16px, 4vw, 40px) !important;
            top: auto !important;
            bottom: calc(clamp(48px, 11dvh, 90px) + env(safe-area-inset-bottom)) !important;
            transform: none !important;
            width: auto !important;
            max-width: 540px;
          }

          .sw-scene__video,
          .sw-scene__still,
          .sw-scene__interior,
          .sw-scene__interior-still {
            object-position: center 46%;
          }

          .sw-route {
            gap: 12px;
            right: 4px;
          }

          .sw-route__label {
            display: none;
          }

          .sw-hint {
            bottom: calc(16px + env(safe-area-inset-bottom));
          }
        }

        @media (hover: none) and (pointer: coarse) {
          .sw-route { padding: 10px 4px; }
          .sw-route__dot { width: 24px; height: 24px; }
          .sw-bubbles { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sw-scene__still, .sw-scene__video,
          .sw-scene__interior, .sw-scene__interior-still {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
