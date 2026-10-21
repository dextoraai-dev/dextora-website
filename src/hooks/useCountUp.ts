// useCountUp.ts – Hook for count‑up animations
// This hook animates a numeric value from 0 to a target when the element becomes visible.
// It uses IntersectionObserver to start the animation only when the component is in the viewport.

import { useEffect, useRef, useState } from "react";

/**
 * useCountUp
 * @param end   Target number to count up to (integer or float)
 * @param durationMs Animation duration in milliseconds (default 1500ms)
 * @param decimals Number of decimal places (default 0)
 * @param startWhenVisible Whether to start only when the element is visible (default true)
 * @returns current animated number and a ref to attach to the DOM element
 */
export function useCountUp({
  end,
  durationMs = 1500,
  decimals = 0,
  startWhenVisible = true,
}: {
  end: number;
  durationMs?: number;
  decimals?: number;
  startWhenVisible?: boolean;
}) {
  const [value, setValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const startAnimation = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = Number((end * progress).toFixed(decimals));
      setValue(current);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(startAnimation);
      }
    };

    const maybeStart = () => {
      startTimeRef.current = null;
      animationFrameRef.current = requestAnimationFrame(startAnimation);
    };

    if (!startWhenVisible) {
      maybeStart();
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            maybeStart();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(element);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      observer.disconnect();
    };
  }, [end, durationMs, decimals, startWhenVisible]);

  return { value, ref };
}
