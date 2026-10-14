"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface CrmPipelineProps {
  progress?: number; // 0 (grid base) to 1 (fully synchronized pipeline with deal telemetry)
  color?: string;
  accentColor?: string;
}

export function CrmPipeline({
  progress = 0,
  color = "#00bb7f", // Emerald WhatsApp green
  accentColor = "#3080ff", // Vibrant pipeline blue
}: CrmPipelineProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const stagesGroupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Group>(null);
  const pulseRingsRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return {
      basePlate: new THREE.BoxGeometry(3.4, 0.1, 2.6),
      stageColumnA: new THREE.BoxGeometry(0.65, 0.9, 0.45),
      stageColumnB: new THREE.BoxGeometry(0.65, 1.25, 0.45),
      stageColumnC: new THREE.BoxGeometry(0.65, 1.5, 0.45),
      stageColumnD: new THREE.BoxGeometry(0.65, 1.8, 0.45),
      dealCard: new THREE.BoxGeometry(0.5, 0.08, 0.35),
      beaconOrb: new THREE.SphereGeometry(0.14, 20, 20),
      ring: new THREE.RingGeometry(0.2, 0.26, 32),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  // 4 Kanban Pipeline Stages: Discovery -> Qualification -> Proposal -> Closed Won
  const stageConfigs = useMemo(
    () => [
      { x: -1.05, height: 0.9, geo: geometries.stageColumnA, delay: 0.05, name: "Leads" },
      { x: -0.35, height: 1.25, geo: geometries.stageColumnB, delay: 0.2, name: "Qualified" },
      { x: 0.35, height: 1.5, geo: geometries.stageColumnC, delay: 0.35, name: "Proposal" },
      { x: 1.05, height: 1.8, geo: geometries.stageColumnD, delay: 0.5, name: "Closed Won" },
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
      const beaconP = Math.max(0, (progress - 0.6) / 0.4);
      beaconRef.current.scale.setScalar(
        THREE.MathUtils.lerp(beaconRef.current.scale.x, beaconP, 0.1)
      );
    }

    if (pulseRingsRef.current) {
      pulseRingsRef.current.rotation.z += delta * 0.8;
    }
  });

  const baseColor = isDark ? "#0F172A" : "#F1F5F9";
  const stageMatColor = isDark ? "#1E293B" : "#FFFFFF";
  const gridLineColor = isDark ? "#334155" : "#CBD5E1";

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.42, 0, 0]}>
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.25}>
        {/* Isometric Base Grid Platform */}
        <mesh geometry={geometries.basePlate} receiveShadow>
          <meshStandardMaterial
            color={baseColor}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {/* Pipeline Stage Separation Tracks */}
        {[-0.7, 0, 0.7].map((xTrack, idx) => (
          <mesh key={`track-${idx}`} position={[xTrack, 0.055, 0]}>
            <planeGeometry args={[0.02, 2.4]} />
            <meshBasicMaterial
              color={gridLineColor}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}

        {/* 4 Pipeline Stage Columns */}
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
                  metalness={0.4}
                  clearcoat={0.8}
                  transparent
                  opacity={0.92}
                />
              </mesh>

              {/* Stage Top Header Badge */}
              <mesh position={[0, cfg.height / 2 + 0.03, 0]}>
                <boxGeometry args={[0.55, 0.04, 0.38]} />
                <meshStandardMaterial
                  color={idx === 3 ? color : accentColor}
                  metalness={0.8}
                  roughness={0.2}
                />
              </mesh>

              {/* Floating Deal Cards inside Stage */}
              {[0.25, 0.55, 0.85].map((cardOffset, cIdx) => (
                <mesh
                  key={`card-${cIdx}`}
                  geometry={geometries.dealCard}
                  position={[0, (cfg.height * cardOffset) - (cfg.height / 2), 0]}
                >
                  <meshStandardMaterial
                    color={idx === 3 ? "#00c758" : isDark ? "#334155" : "#E2E8F0"}
                    roughness={0.3}
                    metalness={0.2}
                  />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Omnichannel WhatsApp Beacon Hub */}
        <group ref={beaconRef} position={[1.05, 2.1, 0]} scale={0}>
          <mesh geometry={geometries.beaconOrb}>
            <meshBasicMaterial color={color} />
          </mesh>
          <pointLight color={color} intensity={2.2} distance={4} />

          {/* Pulse Signal Ring */}
          <group ref={pulseRingsRef} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={geometries.ring}>
              <meshBasicMaterial
                color={color}
                side={THREE.DoubleSide}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        </group>

        {/* Real-time Sales Velocity Telemetry Wave */}
        {progress > 0.3 && (
          <group>
            <Line
              points={[
                [-1.05, 0.9, 0],
                [-0.35, 1.25, 0],
                [0.35, 1.5, 0],
                [1.05, 1.8, 0],
              ]}
              color={color}
              transparent
              opacity={0.7 * progress}
              lineWidth={2}
            />
            <Line
              points={[
                [0.35, 1.5, 0],
                [1.05, 2.1, 0],
              ]}
              color={accentColor}
              transparent
              opacity={0.5 * progress}
              lineWidth={1.5}
            />
          </group>
        )}
      </Float>
    </group>
  );
}
