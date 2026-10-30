"use client";

import React, { useRef } from "react";
import { motion, HTMLMotionProps, Variants, useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollAnimationProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
}

export const containerStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

export const itemFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  amount = 0.2,
  ...props
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  amount = 0.15,
  ...props
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={containerStaggerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  whileHover = { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
  ...props
}: ScrollAnimationProps) {
  return (
    <motion.div
      variants={itemFadeUpVariants}
      whileHover={whileHover}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  amount = 0.2,
  ...props
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── 3D Entrance: slides in with depth (Z-axis) ──────────────────────────────
export function FadeInDepth({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  amount = 0.15,
  ...props
}: ScrollAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1000 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating loop animation: gentle bob up/down ─────────────────────────────
interface FloatProps {
  children: React.ReactNode;
  className?: string;
  /** Duration of one full cycle in seconds (default 4) */
  duration?: number;
  /** Pixel distance to float up/down (default 10) */
  distance?: number;
  /** Delay before starting (default 0) */
  delay?: number;
}

export function Float({ children, className = "", duration = 4, distance = 10, delay = 0 }: FloatProps) {
  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll-driven parallax layer ────────────────────────────────────────────
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** How much slower/faster than scroll (0.2 = subtle, 0.5 = strong) */
  speed?: number;
}

export function Parallax({ children, className = "", speed = 0.25 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -60}px`, `${speed * 60}px`]
  );
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
