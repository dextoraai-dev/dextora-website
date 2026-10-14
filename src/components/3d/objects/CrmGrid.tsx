"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface CrmGridProps {
  progress?: number; // 0 (pipeline base) to 1 (active multi-stage deal flow & telemetry)
  color?: string;
  accentColor?: string;
}

export function CrmGrid({
  progress = 0,
  color = "#10B981", // Emerald Green
  accentColor = "#34D399", // Mint / Light Emerald
}: CrmGridProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const stagesGroupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return {
      basePlate: new THREE.BoxGeometry(3.6, 0.1, 2.6),
      stageA: new THREE.BoxGeometry(0.65, 0.6, 1.8),
      stageB: new THREE.BoxGeometry(0.65, 0.9, 1.8),
      stageC: new THREE.BoxGeometry(0.65, 1.25, 1.8),
      stageD: new THREE.BoxGeometry(0.65, 1.6, 1.8),
      dealCard: new THREE.BoxGeometry(0.55, 0.22, 0.45),
      beaconOrb: new THREE.SphereGeometry(0.14, 16, 16),
      pulseRing: new THREE.RingGeometry(0.2, 0.28, 32),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  const stageConfigs = useMemo(
    () => [
      { x: -1.2, height: 0.6, geo: geometries.stageA, delay: 0.1, label: "Discovery" },
      { x: -0.4, height: 0.9, geo: geometries.stageB, delay: 0.25, label: "Demo" },
      { x: 0.4, height: 1.25, geo: geometries.stageC, delay: 0.4, label: "Proposal" },
      { x: 1.2, height: 1.6, geo: geometries.stageD, delay: 0.55, label: "Contract" },
    ],
    [geometries]
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    if (stagesGroupRef.current) {
      stagesGroupRef.current.children.forEach((child, idx) => {
        const config = stageConfigs[idx];
        const localP = Math.max(0, Math.min(1, (progress - config.delay) / 0.35));
        const targetY = (config.height / 2) * localP;
        const targetScaleY = Math.max(0.01, localP);

        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.12);
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, targetScaleY, 0.12);
      });
    }

    if (beaconRef.current) {
      const beaconP = Math.max(0, (progress - 0.65) / 0.35);
      beaconRef.current.scale.setScalar(
        THREE.MathUtils.lerp(beaconRef.current.scale.x, beaconP, 0.1)
      );
    }
  });

  const baseColor = isDark ? "#0F172A" : "#E2E8F0";
  const stageMatColor = isDark ? "#1E293B" : "#FFFFFF";

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.42, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.3}>
        {/* Isometric Base Grid Foundation */}
        <mesh geometry={geometries.basePlate} receiveShadow>
          <meshStandardMaterial
            color={baseColor}
            roughness={0.5}
            metalness={0.25}
          />
        </mesh>

        {/* Foundation Grid Lines for Pipeline Stages */}
        {[-1.2, -0.4, 0.4, 1.2].map((coord, idx) => (
          <React.Fragment key={`grid-${idx}`}>
            <mesh position={[coord, 0.055, 0]}>
              <planeGeometry args={[0.02, 2.4]} />
              <meshBasicMaterial
                color={isDark ? "#334155" : "#CBD5E1"}
                side={THREE.DoubleSide}
              />
            </mesh>
          </React.Fragment>
        ))}

        {/* Modular Pipeline Stages */}
        <group ref={stagesGroupRef}>
          {stageConfigs.map((cfg, idx) => (
            <group
              key={`stage-${idx}`}
              position={[cfg.x, 0, 0]}
              scale={[1, 0.01, 1]}
            >
              <mesh geometry={cfg.geo} castShadow receiveShadow>
                <meshPhysicalMaterial
                  color={idx === 3 ? color : stageMatColor}
                  roughness={0.2}
                  metalness={0.3}
                  clearcoat={0.7}
                  transparent
                  opacity={0.94}
                />
              </mesh>
              {/* Stage Header Accent Strip */}
              <mesh position={[0, cfg.height / 2 + 0.02, 0]}>
                <boxGeometry args={[0.62, 0.04, 1.76]} />
                <meshStandardMaterial
                  color={idx === 3 ? "#059669" : accentColor}
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>
            </group>
          ))}
        </group>

        {/* Revenue Milestone & WhatsApp Live Telemetry Beacon */}
        <group ref={beaconRef} position={[1.2, 1.85, 0]} scale={0}>
          <mesh geometry={geometries.beaconOrb}>
            <meshBasicMaterial color={accentColor} />
          </mesh>
          <pointLight color={color} intensity={2.2} distance={4} />
        </group>

        {/* Telemetry Connecting Laser Lines between Stages */}
        {progress > 0.35 && (
          <group>
            <Line
              points={[
                [-1.2, 0.6, 0],
                [-0.4, 0.9, 0],
                [0.4, 1.25, 0],
                [1.2, 1.6, 0],
                [1.2, 1.85, 0],
              ]}
              color={color}
              transparent
              opacity={0.6 * progress}
              lineWidth={2}
            />
          </group>
        )}
      </Float>
    </group>
  );
}
