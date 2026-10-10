"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface ProductOrbProps {
  color?: string;
  accentColor?: string;
  size?: number;
  speed?: number;
}

export function ProductOrb({
  color = "#E05A38",
  accentColor = "#10B981",
  size = 1.2,
  speed = 1,
}: ProductOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4 * speed;
      meshRef.current.rotation.x += delta * 0.2 * speed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.3 * speed;
      ringRef.current.rotation.z += delta * 0.5 * speed;
    }
  });

  return (
    <group>
      <Float speed={2 * speed} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[size, 1]} />
          <meshPhysicalMaterial
            color={color}
            roughness={0.2}
            metalness={0.15}
            transmission={0.6}
            thickness={1.0}
            ior={1.4}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={isDark ? 0.9 : 0.8}
          />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[size * 1.5, 0.02, 16, 64]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}
