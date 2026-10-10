"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@/lib/theme";

interface DataFlowNetworkProps {
  progress?: number; // 0 to 1
  color?: string;
  accentColor?: string;
}

export function DataFlowNetwork({
  progress = 0,
  color = "#E05A38", // Terracotta
  accentColor = "#10B981", // Emerald
}: DataFlowNetworkProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  const pulsesRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);

  const geometries = useMemo(() => {
    return {
      core: new THREE.IcosahedronGeometry(0.85, 1),
      satellite: new THREE.OctahedronGeometry(0.22, 0),
      pulse: new THREE.SphereGeometry(0.08, 16, 16),
      ring: new THREE.TorusGeometry(1.6, 0.02, 16, 64),
    };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
    };
  }, [geometries]);

  const nodes = useMemo(
    () => [
      { pos: [1.4, 0.8, 0.4] as [number, number, number], color: "#059669" },
      { pos: [-1.3, 0.9, -0.5] as [number, number, number], color: "#D97706" },
      { pos: [-1.1, -0.9, 0.6] as [number, number, number], color: "#6366F1" },
      { pos: [1.2, -0.8, -0.4] as [number, number, number], color: "#E05A38" },
      { pos: [0, 1.5, 0.2] as [number, number, number], color: "#059669" },
    ],
    []
  );

  useFrame((_, delta) => {
    elapsedRef.current += delta;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.25;
      coreRef.current.rotation.y += delta * 0.35;
    }

    // Move pulse particles along lines
    if (pulsesRef.current) {
      const time = elapsedRef.current;
      pulsesRef.current.children.forEach((child, idx) => {
        const node = nodes[idx];
        const t = ((time * 0.8 + idx * 0.2 + progress * 2) % 1);
        child.position.x = node.pos[0] * t;
        child.position.y = node.pos[1] * t;
        child.position.z = node.pos[2] * t;
      });
    }
  });

  const coreColor = isDark ? "#E5E1D8" : "#FFFFFF";

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.4}>
        {/* Central Core Nucleus */}
        <mesh ref={coreRef} geometry={geometries.core} castShadow>
          <meshPhysicalMaterial
            color={coreColor}
            transmission={0.6}
            thickness={1.0}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Orbiting Equatorial Ring */}
        <mesh geometry={geometries.ring} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Satellite Nodes */}
        <group ref={satellitesRef}>
          {nodes.map((node, idx) => (
            <mesh
              key={`node-${idx}`}
              position={node.pos}
              geometry={geometries.satellite}
              castShadow
            >
              <meshPhysicalMaterial
                color={node.color}
                roughness={0.2}
                metalness={0.7}
                clearcoat={0.8}
              />
            </mesh>
          ))}
        </group>

        {/* Connecting Filaments */}
        {nodes.map((node, idx) => (
          <Line
            key={`filament-${idx}`}
            points={[
              [0, 0, 0],
              node.pos,
            ]}
            color={node.color}
            transparent
            opacity={isDark ? 0.4 : 0.3}
            lineWidth={1.2}
          />
        ))}

        {/* Data Light Pulses */}
        <group ref={pulsesRef}>
          {nodes.map((node, idx) => (
            <mesh
              key={`pulse-${idx}`}
              geometry={geometries.pulse}
            >
              <meshBasicMaterial color={node.color} />
            </mesh>
          ))}
        </group>

        {/* Dynamic Light */}
        <pointLight
          position={[0, 0, 0]}
          color={color}
          intensity={1.2}
          distance={4}
        />
      </Float>
    </group>
  );
}
