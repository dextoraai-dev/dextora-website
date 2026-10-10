"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface CampusGridProps {
  progress?: number; // 0 (grid base) to 1 (fully assembled campus with telemetry)
  color?: string;
  accentColor?: string;
}

export function CampusGrid({
  progress = 0,
  color = "#6366F1", // Indigo
  accentColor = "#818CF8",
}: CampusGridProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const blocksGroupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return {
      basePlate: new THREE.BoxGeometry(3.2, 0.1, 3.2),
      blockA: new THREE.BoxGeometry(0.8, 1.2, 0.8),
      blockB: new THREE.BoxGeometry(0.7, 0.8, 0.7),
      blockC: new THREE.BoxGeometry(0.9, 0.6, 0.9),
      roofSpire: new THREE.ConeGeometry(0.25, 0.6, 4),
      beaconOrb: new THREE.SphereGeometry(0.12, 16, 16),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  const blockConfigs = useMemo(
    () => [
      { x: -0.7, z: -0.7, height: 1.2, geo: geometries.blockA, delay: 0.1 },
      { x: 0.7, z: -0.6, height: 0.8, geo: geometries.blockB, delay: 0.25 },
      { x: -0.6, z: 0.7, height: 0.6, geo: geometries.blockC, delay: 0.4 },
      { x: 0.6, z: 0.6, height: 1.0, geo: geometries.blockA, delay: 0.55 },
    ],
    [geometries]
  );

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }

    if (blocksGroupRef.current) {
      blocksGroupRef.current.children.forEach((child, idx) => {
        const config = blockConfigs[idx];
        const localP = Math.max(0, Math.min(1, (progress - config.delay) / 0.4));
        const targetY = (config.height / 2) * localP;
        const targetScaleY = Math.max(0.01, localP);

        child.position.y = THREE.MathUtils.lerp(child.position.y, targetY, 0.12);
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, targetScaleY, 0.12);
      });
    }

    if (beaconRef.current) {
      const beaconP = Math.max(0, (progress - 0.7) / 0.3);
      beaconRef.current.scale.setScalar(
        THREE.MathUtils.lerp(beaconRef.current.scale.x, beaconP, 0.1)
      );
    }
  });

  const baseColor = isDark ? "#141720" : "#E2E8F0";
  const blockMatColor = isDark ? "#1E2230" : "#FFFFFF";

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0.4, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.3}>
        {/* Isometric Base Grid Foundation */}
        <mesh geometry={geometries.basePlate} receiveShadow>
          <meshStandardMaterial
            color={baseColor}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Foundation Grid Lines */}
        {[-1.0, -0.5, 0, 0.5, 1.0].map((coord, idx) => (
          <React.Fragment key={`grid-${idx}`}>
            <mesh position={[coord, 0.055, 0]}>
              <planeGeometry args={[0.02, 3.0]} />
              <meshBasicMaterial
                color={isDark ? "#334155" : "#CBD5E1"}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[0, 0.055, coord]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.02, 3.0]} />
              <meshBasicMaterial
                color={isDark ? "#334155" : "#CBD5E1"}
                side={THREE.DoubleSide}
              />
            </mesh>
          </React.Fragment>
        ))}

        {/* Modular Architectural Blocks */}
        <group ref={blocksGroupRef}>
          {blockConfigs.map((cfg, idx) => (
            <group
              key={`block-${idx}`}
              position={[cfg.x, 0, cfg.z]}
              scale={[1, 0.01, 1]}
            >
              <mesh geometry={cfg.geo} castShadow receiveShadow>
                <meshPhysicalMaterial
                  color={idx === 0 ? color : blockMatColor}
                  roughness={0.25}
                  metalness={0.3}
                  clearcoat={0.6}
                  transparent
                  opacity={0.95}
                />
              </mesh>
              {/* Roof Accent Cap */}
              <mesh position={[0, cfg.height / 2 + 0.02, 0]}>
                <boxGeometry args={[0.7, 0.04, 0.7]} />
                <meshStandardMaterial color={accentColor} metalness={0.8} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Central Telemetry Beacon */}
        <group ref={beaconRef} position={[0, 1.6, 0]} scale={0}>
          <mesh geometry={geometries.beaconOrb}>
            <meshBasicMaterial color={accentColor} />
          </mesh>
          <pointLight color={color} intensity={1.8} distance={3.5} />
        </group>

        {/* Telemetry Connecting Lines */}
        {progress > 0.4 && (
          <group>
            <Line
              points={[
                [-0.7, 1.2, -0.7],
                [0, 1.6, 0],
                [0.7, 0.8, -0.6],
              ]}
              color={accentColor}
              transparent
              opacity={0.4 * progress}
              lineWidth={1.5}
            />
            <Line
              points={[
                [-0.6, 0.6, 0.7],
                [0, 1.6, 0],
                [0.6, 1.0, 0.6],
              ]}
              color={color}
              transparent
              opacity={0.4 * progress}
              lineWidth={1.5}
            />
          </group>
        )}
      </Float>
    </group>
  );
}
