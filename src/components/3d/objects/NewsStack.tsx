"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface NewsStackProps {
  progress?: number; // 0 (neat stack) to 1 (peeled cards + question bubbles + meter)
  color?: string;
  accentColor?: string;
}

export function NewsStack({
  progress = 0,
  color = "#D97706", // Amber / Saffron
  accentColor = "#F59E0B",
}: NewsStackProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const cardsGroupRef = useRef<THREE.Group>(null);
  const questionsGroupRef = useRef<THREE.Group>(null);
  const meterRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return {
      card: new THREE.BoxGeometry(1.8, 2.4, 0.03),
      bubble: new THREE.SphereGeometry(0.18, 24, 24),
      meterRing: new THREE.TorusGeometry(0.55, 0.05, 16, 64),
      meterArc: new THREE.TorusGeometry(0.55, 0.065, 16, 64, Math.PI * 1.5),
      needle: new THREE.BoxGeometry(0.04, 0.45, 0.02),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  const cardCount = 4;
  const questionCount = 3;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    // Animate peeling cards
    if (cardsGroupRef.current) {
      cardsGroupRef.current.children.forEach((child, idx) => {
        const peelStart = idx * 0.18;
        const localProgress = Math.max(0, Math.min(1, (progress - peelStart) / 0.5));

        const baseZ = idx * 0.06;
        const targetZ = baseZ + localProgress * 0.8;
        const targetX = (idx % 2 === 0 ? -1 : 1) * localProgress * 0.9;
        const targetRotZ = (idx % 2 === 0 ? 0.2 : -0.2) * localProgress;
        const targetRotX = localProgress * 0.3;

        child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 0.1);
        child.position.x = THREE.MathUtils.lerp(child.position.x, targetX, 0.1);
        child.rotation.z = THREE.MathUtils.lerp(child.rotation.z, targetRotZ, 0.1);
        child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, targetRotX, 0.1);
      });
    }

    // Animate question bubbles rising
    if (questionsGroupRef.current) {
      const bubbleProgress = Math.max(0, (progress - 0.4) / 0.6);
      questionsGroupRef.current.children.forEach((child, idx) => {
        const angle = (idx / questionCount) * Math.PI * 2;
        const radius = 1.3 * bubbleProgress;
        const targetX = Math.cos(angle) * radius;
        const targetY = 1.2 + Math.sin(angle) * 0.5 + idx * 0.2;
        const targetZ = Math.sin(angle) * radius;

        child.position.x = THREE.MathUtils.lerp(child.position.x, targetX, 0.1);
        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1);
        child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 0.1);
        child.scale.setScalar(THREE.MathUtils.lerp(child.scale.x, bubbleProgress, 0.1));
      });
    }

    // Animate meter indicator
    if (meterRef.current) {
      const meterProgress = Math.max(0, (progress - 0.6) / 0.4);
      meterRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meterRef.current.scale.x, meterProgress, 0.1)
      );
    }
  });

  const baseCardColor = isDark ? "#1E1B18" : "#FAF8F5";
  const headerBarColor = color;

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.35}>
        {/* Stack of Editorial/News Cards */}
        <group ref={cardsGroupRef}>
          {Array.from({ length: cardCount }).map((_, idx) => (
            <group key={`news-card-${idx}`} position={[0, 0, idx * 0.06]}>
              {/* Paper Slate */}
              <mesh geometry={geometries.card} castShadow receiveShadow>
                <meshPhysicalMaterial
                  color={baseCardColor}
                  transmission={0.3}
                  thickness={0.4}
                  roughness={0.3}
                  metalness={0.1}
                  clearcoat={0.6}
                  transparent
                  opacity={0.92}
                />
              </mesh>

              {/* Editorial Header Stripe on card */}
              <mesh position={[0, 0.95, 0.02]}>
                <boxGeometry args={[1.5, 0.2, 0.01]} />
                <meshStandardMaterial
                  color={idx === cardCount - 1 ? headerBarColor : "#64748B"}
                  roughness={0.4}
                />
              </mesh>

              {/* Text simulation line stripes */}
              {[-0.2, -0.45, -0.7].map((y, lIdx) => (
                <mesh key={lIdx} position={[0, y, 0.02]}>
                  <boxGeometry args={[1.4 - lIdx * 0.2, 0.04, 0.01]} />
                  <meshBasicMaterial
                    color={isDark ? "#475569" : "#CBD5E1"}
                    transparent
                    opacity={0.6}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Floating Question & MCQ Bubbles */}
        <group ref={questionsGroupRef}>
          {Array.from({ length: questionCount }).map((_, idx) => (
            <group key={`q-bubble-${idx}`} scale={0}>
              <mesh geometry={geometries.bubble} castShadow>
                <meshPhysicalMaterial
                  color={color}
                  roughness={0.1}
                  metalness={0.2}
                  transmission={0.7}
                  thickness={0.8}
                  clearcoat={1}
                  transparent
                  opacity={0.85}
                />
              </mesh>
              <pointLight color={accentColor} intensity={0.5} distance={1.5} />
            </group>
          ))}
        </group>

        {/* Evaluated Score Meter Radial Dial */}
        <group ref={meterRef} position={[0, 1.6, 0.5]} scale={0}>
          {/* Outer ring */}
          <mesh geometry={geometries.meterRing}>
            <meshStandardMaterial
              color={isDark ? "#334155" : "#E2E8F0"}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          {/* Active arc */}
          <mesh geometry={geometries.meterArc} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color={accentColor} />
          </mesh>
          {/* Center Hub */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Ambient Amber Glow */}
        <pointLight
          position={[0, 0, 1]}
          intensity={0.6 * progress}
          color={accentColor}
          distance={3.5}
        />
      </Float>
    </group>
  );
}
