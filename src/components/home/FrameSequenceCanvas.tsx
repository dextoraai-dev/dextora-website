"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface FrameSequenceCanvasProps {
  slug: string;
  progress: number; // 0..1 for this chapter
  active: boolean;
  preloadPriority?: "high" | "normal" | "low";
  className?: string;
  style?: React.CSSProperties;
}

// Module-level persistent cache across mounts & tab switches
const globalImageCache = new Map<string, (HTMLImageElement | null)[]>();
const globalLoadedIndices = new Map<string, Set<number>>();

export function FrameSequenceCanvas({
  slug,
  progress,
  active,
  preloadPriority = "normal",
  className = "",
  style,
}: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [totalFrames, setTotalFrames] = useState(120);
  const [variant, setVariant] = useState<"desktop" | "mobile">("desktop");
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cacheKey = `${slug}-${variant}`;
  const frameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  // Variant detection (above 768px desktop, below mobile)
  useEffect(() => {
    const updateVariant = () => {
      if (typeof window !== "undefined") {
        setVariant(window.innerWidth > 768 ? "desktop" : "mobile");
      }
    };
    updateVariant();
    window.addEventListener("resize", updateVariant);
    return () => window.removeEventListener("resize", updateVariant);
  }, []);

  // Fetch meta.json for frame count
  useEffect(() => {
    isMountedRef.current = true;
    let cancelled = false;

    fetch(`/cinematic/${slug}/frames/${variant}/meta.json`)
      .then((res) => (res.ok ? res.json() : { frames: 120 }))
      .then((data) => {
        if (!cancelled && data?.frames) {
          setTotalFrames(data.frames);
        }
      })
      .catch(() => {
        if (!cancelled) setTotalFrames(120);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, variant]);

  // Helper to load and decode a single frame with persistent caching
  const loadFrame = useCallback(
    async (frameNum: number): Promise<HTMLImageElement | null> => {
      const idx = frameNum - 1;
      let cachedArray = globalImageCache.get(cacheKey);
      if (!cachedArray) {
        cachedArray = new Array(totalFrames).fill(null);
        globalImageCache.set(cacheKey, cachedArray);
      }
      let loadedSet = globalLoadedIndices.get(cacheKey);
      if (!loadedSet) {
        loadedSet = new Set<number>();
        globalLoadedIndices.set(cacheKey, loadedSet);
      }

      if (cachedArray[idx]) {
        return cachedArray[idx];
      }

      const pad = String(frameNum).padStart(4, "0");
      const src = `/cinematic/${slug}/frames/${variant}/${pad}.webp`;
      const img = new Image();
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
          if (idx === 0) setFirstFrameLoaded(true);
        }
        return img;
      } catch {
        return null;
      }
    },
    [cacheKey, slug, variant, totalFrames]
  );

  // Progressive loading strategy with persistent cache preservation
  useEffect(() => {
    if (!active && preloadPriority === "low") return;

    let cancelled = false;
    let loadedSet = globalLoadedIndices.get(cacheKey);
    if (!loadedSet) {
      loadedSet = new Set<number>();
      globalLoadedIndices.set(cacheKey, loadedSet);
    }

    // Check if frame 0 is already loaded from cache
    const cachedArray = globalImageCache.get(cacheKey);
    if (cachedArray && cachedArray[0]) {
      setFirstFrameLoaded(true);
    }

    const startPreload = async () => {
      // 1. Load First Frame
      if (!loadedSet?.has(0)) {
        await loadFrame(1);
      }
      if (cancelled) return;

      // 2. Load Every 6th Keyframe for faster jump-scrub coverage
      const keyframes: number[] = [];
      for (let f = 7; f <= totalFrames; f += 6) {
        if (!loadedSet?.has(f - 1)) {
          keyframes.push(f);
        }
      }
      for (const f of keyframes) {
        if (cancelled) return;
        await loadFrame(f);
      }

      // 3. Load remaining frames sequentially
      for (let f = 2; f <= totalFrames; f++) {
        if (cancelled) return;
        if (!loadedSet?.has(f - 1)) {
          await loadFrame(f);
        }
      }
    };

    startPreload().catch(() => {
      if (!cancelled) setHasError(true);
    });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, totalFrames, active, preloadPriority, loadFrame]);

  // Find nearest loaded frame index
  const getNearestLoadedIndex = useCallback(
    (targetIdx: number): number => {
      const loadedSet = globalLoadedIndices.get(cacheKey);
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
    [cacheKey]
  );

  // Draw frame with cover math onto Retina canvas with sub-frame interpolation
  const drawFrame = useCallback(
    (canvas: HTMLCanvasElement, floatIdx: number) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const total = totalFrames;
      const clampedIdx = Math.max(0, Math.min(total - 1, floatIdx));
      const f1 = Math.floor(clampedIdx);
      const f2 = Math.min(total - 1, Math.ceil(clampedIdx));
      const alpha = clampedIdx - f1;

      const cachedArray = globalImageCache.get(cacheKey);
      if (!cachedArray) return;

      const idx1 = getNearestLoadedIndex(f1);
      const img1 = cachedArray[idx1];

      if (!img1) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img1.naturalWidth || (variant === "desktop" ? 1600 : 854);
      const ih = img1.naturalHeight || (variant === "desktop" ? 900 : 480);

      // "Cover" math: fills the entire viewport without distortion
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Draw primary floor frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(img1, dx, dy, dw, dh);

      // Draw ceiling frame with sub-frame crossfade for ultra-smooth non-stepped motion
      if (f2 !== f1 && alpha > 0.001) {
        const idx2 = getNearestLoadedIndex(f2);
        const img2 = cachedArray[idx2];
        if (img2 && img2 !== img1) {
          ctx.globalAlpha = alpha;
          ctx.drawImage(img2, dx, dy, dw, dh);
        }
      }
    },
    [cacheKey, totalFrames, variant, getNearestLoadedIndex]
  );

  // Resize canvas with devicePixelRatio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawFrame(canvas, frameIndexRef.current);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => ro.disconnect();
  }, [drawFrame]);

  // Update target frame from progress prop
  useEffect(() => {
    const clampedP = Math.max(0, Math.min(1, progress));
    targetFrameIndexRef.current = clampedP * (totalFrames - 1);
  }, [progress, totalFrames]);

  // Direct, low-latency animation loop that syncs with RAF
  useEffect(() => {
    if (!active) {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      return;
    }

    const loop = () => {
      const canvas = canvasRef.current;
      const target = targetFrameIndexRef.current;
      const current = frameIndexRef.current;
      const diff = target - current;

      // Snappy, responsive interpolation (0.42 factor) to eliminate double-lerp lag
      if (Math.abs(diff) > 0.002) {
        const next = Math.abs(diff) < 0.01 ? target : current + diff * 0.42;
        frameIndexRef.current = next;

        if (canvas) {
          drawFrame(canvas, next);
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [active, drawFrame]);

  // Initial draw once first frame loads
  useEffect(() => {
    if (firstFrameLoaded && canvasRef.current) {
      drawFrame(canvasRef.current, frameIndexRef.current);
    }
  }, [firstFrameLoaded, drawFrame]);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      {/* Fallback image if frames fail */}
      {hasError && (
        <img
          src={`/cinematic/${slug}/scene.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      )}

      {/* Primary Retina WebP Image Sequence Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block object-cover select-none pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
