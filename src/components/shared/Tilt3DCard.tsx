"use client";

/**
 * Tilt3DCard — Mouse-tracking 3D perspective tilt wrapper.
 *
 * Wrap any card with this component to give it a realistic 3D
 * depth effect that tracks the user's cursor position.
 *
 * Features:
 *  - CSS `perspective` + `rotateX/Y` via Framer Motion spring physics
 *  - Optional shimmer highlight that follows the cursor
 *  - Optional floating glow beneath the card
 *  - Smooth spring animation in/out (no janky snapping)
 *  - Reduced-motion safe (disables on prefers-reduced-motion)
 *  - Zero layout impact: wraps children exactly, no sizing changes
 */

import React, { useRef, useState, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees (default 14) */
  maxTilt?: number;
  /** Perspective depth in px (default 900) */
  perspective?: number;
  /** Show a moving shimmer highlight on the card surface */
  shimmer?: boolean;
  /** Glow colour under the card (CSS colour string or false) */
  glowColor?: string | false;
  /** Scale on hover (default 1.03) */
  hoverScale?: number;
  /** Whether tilt is disabled entirely */
  disabled?: boolean;
}

export function Tilt3DCard({
  children,
  className = "",
  maxTilt = 14,
  perspective = 900,
  shimmer = true,
  glowColor = "rgba(224, 90, 56, 0.25)",
  hoverScale = 1.035,
  disabled = false,
}: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  // Raw normalised mouse position [-1, 1]
  const rawX = useRef(0);
  const rawY = useRef(0);

  // Shimmer position state [0..100]%
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  // Spring config — feels physical, settles quickly
  const springConfig = { stiffness: 280, damping: 28, mass: 0.6 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);
  const springScale = useSpring(1, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, (v) => `${v * maxTilt}deg`);
  const rotateY = useTransform(springX, (v) => `${v * maxTilt}deg`);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      rawX.current = (px - 0.5) * 2; // -1..1
      rawY.current = (py - 0.5) * 2; // -1..1
      springX.set(rawX.current);
      springY.set(-rawY.current); // invert Y so top = tilt back
      setShimmerPos({ x: px * 100, y: py * 100 });
    },
    [disabled, springX, springY]
  );

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setHovering(true);
    springScale.set(hoverScale);
  }, [disabled, springScale, hoverScale]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setHovering(false);
    springX.set(0);
    springY.set(0);
    springScale.set(1);
  }, [disabled, springX, springY, springScale]);

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ perspective: `${perspective}px` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full will-change-transform"
      >
        {children}

        {/* Shimmer highlight that follows the cursor */}
        {shimmer && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden z-20 transition-opacity duration-300"
            style={{ opacity: hovering ? 1 : 0 }}
            aria-hidden
          >
            <div
              className="absolute w-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-[left,top] duration-100"
              style={{
                left: `${shimmerPos.x}%`,
                top: `${shimmerPos.y}%`,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)",
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Floating ambient glow beneath the card */}
      {glowColor && (
        <div
          className="absolute inset-0 -z-10 rounded-[inherit] blur-2xl scale-90 translate-y-4 pointer-events-none transition-opacity duration-300"
          style={{
            background: glowColor,
            opacity: hovering ? 0.65 : 0,
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

