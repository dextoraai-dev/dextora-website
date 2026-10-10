"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface KnowledgeBookProps {
  progress?: number; // 0 (closed) to 1 (fully open with chapter cards out)
  color?: string;
  accentColor?: string;
}

export function KnowledgeBook({
  progress = 0,
  color = "#059669", // Emerald
  accentColor = "#10B981",
}: KnowledgeBookProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Group>(null);
  const rightCoverRef = useRef<THREE.Group>(null);
  const pagesGroupRef = useRef<THREE.Group>(null);
  const cardsGroupRef = useRef<THREE.Group>(null);

  // Materials & Geometries memoized for disposal
  const geometries = useMemo(() => {
    return {
      cover: new THREE.BoxGeometry(1.6, 2.2, 0.08),
      page: new THREE.BoxGeometry(1.5, 2.1, 0.02),
      card: new THREE.BoxGeometry(0.7, 0.9, 0.03),
      spine: new THREE.CylinderGeometry(0.12, 0.12, 2.2, 16),
      marker: new THREE.SphereGeometry(0.06, 16, 16),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  const pageCount = 6;
  const cardCount = 3;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    const openAngle = THREE.MathUtils.lerp(0.05, Math.PI * 0.45, Math.min(1, Math.max(0, progress)));

    if (leftCoverRef.current) {
      leftCoverRef.current.rotation.y = -openAngle;
    }
    if (rightCoverRef.current) {
      rightCoverRef.current.rotation.y = openAngle;
    }

    // Fan pages proportionally
    if (pagesGroupRef.current) {
      pagesGroupRef.current.children.forEach((child, idx) => {
        const side = idx < pageCount / 2 ? -1 : 1;
        const factor = (idx % (pageCount / 2) + 1) / (pageCount / 2);
        child.rotation.y = side * openAngle * factor * 0.85;
      });
    }

    // Animate levitating chapter cards
    if (cardsGroupRef.current) {
      const cardProgress = Math.max(0, (progress - 0.3) / 0.7);
      cardsGroupRef.current.children.forEach((child, idx) => {
        const targetY = 1.0 + idx * 0.45 * cardProgress;
        const targetX = (idx - 1) * 0.8 * cardProgress;
        const targetZ = 0.3 + idx * 0.25 * cardProgress;

        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.1);
        child.position.x = THREE.MathUtils.lerp(child.position.x, targetX, 0.1);
        child.position.z = THREE.MathUtils.lerp(child.position.z, targetZ, 0.1);
        child.rotation.y = THREE.MathUtils.lerp(child.rotation.y, (idx - 1) * 0.3, 0.1);
        child.rotation.x = THREE.MathUtils.lerp(child.rotation.x, -0.2, 0.1);
      });
    }
  });

  const coverColor = isDark ? "#0E2922" : "#1A3F35";
  const pageColor = isDark ? "#E5E1D8" : "#FAF8F5";
  const glowColor = accentColor;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Central Spine */}
        <mesh geometry={geometries.spine} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={color}
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* Left Cover */}
        <group ref={leftCoverRef} position={[0, 0, 0]}>
          <mesh
            geometry={geometries.cover}
            position={[-0.8, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={coverColor}
              roughness={0.35}
              metalness={0.2}
              clearcoat={0.3}
            />
          </mesh>
        </group>

        {/* Right Cover */}
        <group ref={rightCoverRef} position={[0, 0, 0]}>
          <mesh
            geometry={geometries.cover}
            position={[0.8, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color={coverColor}
              roughness={0.35}
              metalness={0.2}
              clearcoat={0.3}
            />
          </mesh>
        </group>

        {/* Fanned Pages */}
        <group ref={pagesGroupRef}>
          {Array.from({ length: pageCount }).map((_, idx) => {
            const isLeft = idx < pageCount / 2;
            const xOffset = isLeft ? -0.75 : 0.75;
            return (
              <group key={`page-${idx}`}>
                <mesh
                  geometry={geometries.page}
                  position={[xOffset, 0, (idx - pageCount / 2) * 0.015]}
                >
                  <meshStandardMaterial
                    color={pageColor}
                    roughness={0.8}
                    metalness={0.05}
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Glowing Levitating Chapter Cards */}
        <group ref={cardsGroupRef}>
          {Array.from({ length: cardCount }).map((_, idx) => (
            <group key={`card-${idx}`} position={[0, 0, 0]}>
              <mesh geometry={geometries.card} castShadow>
                <meshPhysicalMaterial
                  color={idx === 1 ? color : coverColor}
                  transmission={0.4}
                  thickness={0.5}
                  roughness={0.15}
                  metalness={0.3}
                  clearcoat={0.8}
                  transparent
                  opacity={0.92}
                />
              </mesh>
              {/* Glowing Indicator Orb on each card */}
              <mesh
                geometry={geometries.marker}
                position={[0.22, 0.32, 0.03]}
              >
                <meshBasicMaterial color={glowColor} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Ambient Soft Underglow */}
        <pointLight
          position={[0, 0.5, 0.5]}
          intensity={0.8 * progress}
          color={glowColor}
          distance={3}
        />
      </Float>
    </group>
  );
}
