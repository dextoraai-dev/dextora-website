"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface FloatingParticlesProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
}

export function FloatingParticles({
  count = 60,
  radius = 4,
  color,
  speed = 0.2,
}: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const particleColor = color || (isDark ? "#E05A38" : "#0E2922");

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = radius * (0.3 + ((i * 37) % 70) / 100);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sc[i] = 0.5 + ((i * 17) % 50) / 100;
    }
    return [pos, sc];
  }, [count, radius]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * speed * 0.3;
      pointsRef.current.rotation.x += delta * speed * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={particleColor}
        transparent
        opacity={isDark ? 0.6 : 0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
