"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface AnswerSheetProps {
  progress?: number; // 0 (blank sheet) to 1 (scanned with rubric marks & score)
  color?: string;
  accentColor?: string;
}

export function AnswerSheet({
  progress = 0,
  color = "#E05A38", // Terracotta
  accentColor = "#10B981", // Emerald Check
}: AnswerSheetProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Group>(null);
  const annotationsRef = useRef<THREE.Group>(null);
  const scoreBadgeRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return {
      sheet: new THREE.BoxGeometry(2.0, 2.7, 0.02),
      scannerBar: new THREE.BoxGeometry(2.2, 0.06, 0.06),
      scannerPlane: new THREE.PlaneGeometry(2.1, 0.4),
      checkBadge: new THREE.BoxGeometry(0.35, 0.35, 0.04),
      scorePill: new THREE.BoxGeometry(1.2, 0.4, 0.06),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    // Move scanner beam vertically across sheet
    if (scannerRef.current) {
      const scanY = THREE.MathUtils.lerp(1.3, -1.3, progress);
      scannerRef.current.position.y = THREE.MathUtils.lerp(
        scannerRef.current.position.y,
        scanY,
        0.15
      );
    }

    // Show annotations progressively as scan passes
    if (annotationsRef.current) {
      annotationsRef.current.children.forEach((child, idx) => {
        const threshold = 0.2 + idx * 0.22;
        const visible = progress >= threshold;
        const targetScale = visible ? 1 : 0;
        child.scale.setScalar(
          THREE.MathUtils.lerp(child.scale.x, targetScale, 0.15)
        );
      });
    }

    // Display score pill at the end
    if (scoreBadgeRef.current) {
      const targetScale = progress > 0.75 ? 1 : 0;
      scoreBadgeRef.current.scale.setScalar(
        THREE.MathUtils.lerp(scoreBadgeRef.current.scale.x, targetScale, 0.1)
      );
      scoreBadgeRef.current.position.z = THREE.MathUtils.lerp(
        scoreBadgeRef.current.position.z,
        0.4,
        0.1
      );
    }
  });

  const sheetColor = isDark ? "#1A1D24" : "#FAF9F5";
  const lineColor = isDark ? "#334155" : "#E2E8F0";
  const textColor = isDark ? "#64748B" : "#94A3B8";

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Main Answer Sheet Paper */}
        <mesh geometry={geometries.sheet} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={sheetColor}
            roughness={0.4}
            metalness={0.05}
            clearcoat={0.3}
          />
        </mesh>

        {/* Paper Ruled Margin Line */}
        <mesh position={[-0.7, 0, 0.015]}>
          <planeGeometry args={[0.015, 2.5]} />
          <meshBasicMaterial color="#E05A38" opacity={0.6} transparent />
        </mesh>

        {/* Ruled lines & handwritten stroke simulation */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const y = 1.0 - idx * 0.26;
          return (
            <group key={`line-${idx}`} position={[0.1, y, 0.015]}>
              {/* Ruled guideline */}
              <mesh position={[0, -0.04, 0]}>
                <planeGeometry args={[1.4, 0.008]} />
                <meshBasicMaterial color={lineColor} />
              </mesh>
              {/* Handwritten text block */}
              <mesh position={[-(idx % 2) * 0.1, 0.02, 0]}>
                <planeGeometry args={[1.2 - (idx % 3) * 0.15, 0.04]} />
                <meshBasicMaterial color={textColor} opacity={0.7} transparent />
              </mesh>
            </group>
          );
        })}

        {/* Dynamic Sweeping Scanner Beam */}
        <group ref={scannerRef} position={[0, 1.3, 0.05]}>
          <mesh geometry={geometries.scannerBar}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.5}
            />
          </mesh>
          <mesh
            geometry={geometries.scannerPlane}
            position={[0, -0.2, 0]}
            rotation={[0, 0, 0]}
          >
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          <pointLight color={color} intensity={1.5} distance={2.5} />
        </group>

        {/* Annotation & Rubric Mark Highlights */}
        <group ref={annotationsRef}>
          {/* Rubric Mark 1: Intro structure */}
          <group position={[-0.4, 0.75, 0.03]} scale={0}>
            <mesh geometry={geometries.checkBadge}>
              <meshStandardMaterial color={accentColor} roughness={0.2} />
            </mesh>
          </group>

          {/* Rubric Mark 2: Keyword match highlight */}
          <group position={[0.2, 0.22, 0.03]} scale={0}>
            <mesh>
              <planeGeometry args={[0.9, 0.08]} />
              <meshBasicMaterial
                color={accentColor}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>

          {/* Rubric Mark 3: Argument structure check */}
          <group position={[-0.4, -0.3, 0.03]} scale={0}>
            <mesh geometry={geometries.checkBadge}>
              <meshStandardMaterial color={accentColor} roughness={0.2} />
            </mesh>
          </group>
        </group>

        {/* Final Evaluated Score Pill */}
        <group ref={scoreBadgeRef} position={[0.4, -1.0, 0.1]} scale={0}>
          <mesh geometry={geometries.scorePill} castShadow>
            <meshPhysicalMaterial
              color={isDark ? "#0E2922" : "#0E2922"}
              roughness={0.2}
              metalness={0.3}
              clearcoat={0.9}
            />
          </mesh>
          <mesh position={[0.3, 0, 0.04]}>
            <circleGeometry args={[0.09, 16]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
