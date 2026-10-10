"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface FrameSequenceCanvasProps {
  slug: string;
  progress: number; // 0..1 for this chapter
  active: boolean;
  preloadPriority?: "high" | "normal" | "low";
  className?: string;
}

export function FrameSequenceCanvas({
  slug,
  progress,
  active,
  preloadPriority = "normal",
  className = "",
}: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedIndicesRef = useRef<Set<number>>(new Set());
  const [totalFrames, setTotalFrames] = useState(120);
  const [variant, setVariant] = useState<"desktop" | "mobile">("desktop");
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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

  // Helper to load and decode a single frame
  const loadFrame = useCallback(
    async (frameNum: number): Promise<HTMLImageElement | null> => {
      const idx = frameNum - 1;
      if (imagesRef.current[idx]) {
        return imagesRef.current[idx];
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
          imagesRef.current[idx] = img;
          loadedIndicesRef.current.add(idx);
          if (idx === 0) setFirstFrameLoaded(true);
        }
        return img;
      } catch {
        // Silently skip if aborted or network error
        return null;
      }
    },
    [slug, variant]
  );

  // Progressive loading strategy:
  // Phase 1: Frame 1 immediately (instant first paint)
  // Phase 2: Stride 8 keyframes
  // Phase 3: Fill in the remaining frames
  useEffect(() => {
    if (!active && preloadPriority === "low") return;

    let cancelled = false;
    imagesRef.current = new Array(totalFrames).fill(null);
    loadedIndicesRef.current.clear();

    const startPreload = async () => {
      // 1. Load First Frame
      await loadFrame(1);
      if (cancelled) return;

      // 2. Load Every 8th Keyframe
      const keyframes: number[] = [];
      for (let f = 9; f <= totalFrames; f += 8) {
        keyframes.push(f);
      }
      for (const f of keyframes) {
        if (cancelled) return;
        await loadFrame(f);
      }

      // 3. Load remaining frames sequentially
      for (let f = 2; f <= totalFrames; f++) {
        if (cancelled) return;
        if (!loadedIndicesRef.current.has(f - 1)) {
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
  }, [slug, variant, totalFrames, active, preloadPriority, loadFrame]);

  // Find nearest loaded frame index
  const getNearestLoadedIndex = (targetIdx: number): number => {
    if (loadedIndicesRef.current.has(targetIdx)) return targetIdx;
    let minDiff = Infinity;
    let bestIdx = 0;
    for (const idx of loadedIndicesRef.current) {
      const diff = Math.abs(idx - targetIdx);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = idx;
      }
    }
    return bestIdx;
  };

  // Draw frame with cover math onto Retina canvas
  const drawFrame = useCallback(
    (canvas: HTMLCanvasElement, floatIdx: number) => {
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const total = totalFrames;
      const clampedIdx = Math.max(0, Math.min(total - 1, floatIdx));
      const f1 = Math.floor(clampedIdx);
      const f2 = Math.min(total - 1, Math.ceil(clampedIdx));
      const alpha = clampedIdx - f1;

      const idx1 = getNearestLoadedIndex(f1);
      const img1 = imagesRef.current[idx1];

      if (!img1) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img1.naturalWidth || (variant === "desktop" ? 1920 : 960);
      const ih = img1.naturalHeight || (variant === "desktop" ? 1080 : 540);

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
        const img2 = imagesRef.current[idx2];
        if (img2 && img2 !== img1) {
          ctx.globalAlpha = alpha;
          ctx.drawImage(img2, dx, dy, dw, dh);
        }
      }
    },
    [totalFrames, variant]
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

  // Animation loop with frameIndex interpolation
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

      if (Math.abs(diff) > 0.005) {
        const next = current + diff * 0.14; // Lerp smoothing
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
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
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
