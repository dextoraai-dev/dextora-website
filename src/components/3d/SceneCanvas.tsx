"use client";

import React, { useState, useEffect, useRef, Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  fallback?: React.ReactNode;
  dpr?: [number, number];
  interactive?: boolean;
}

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function subscribeNoop() {
  return () => {};
}

function getWebGLSnapshot() {
  return isWebGLAvailable();
}

function getWebGLServerSnapshot() {
  return true;
}

export function SceneCanvas({
  children,
  className = "w-full h-full",
  camera = { position: [0, 0, 5], fov: 45 },
  fallback = null,
  dpr = [1, 1.75],
  interactive = false,
}: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasWebGL = useSyncExternalStore(
    subscribeNoop,
    getWebGLSnapshot,
    getWebGLServerSnapshot
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!hasWebGL) {
    return (
      <div ref={containerRef} className={className} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className} ${
        interactive ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <Canvas
        camera={camera}
        dpr={dpr}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
