import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 270;

  // Seamless 360 loop
  const angle = (frame / totalFrames) * Math.PI * 2;
  const rotY = angle;
  const rotX = Math.sin(angle) * 0.15;
  const floatY = Math.sin(angle * 2) * 12;

  // Satellite node positions
  const satellites = [
    { radius: 240, speed: 1, color: "#059669", size: 28, phase: 0 },
    { radius: 310, speed: -1, color: "#D97706", size: 34, phase: 2 },
    { radius: 210, speed: 1.5, color: "#6366F1", size: 22, phase: 4 },
    { radius: 280, speed: -1.2, color: "#E05A38", size: 30, phase: 1 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0B0E14",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: 220,
      }}
    >
      {/* Background radial atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 75% 50%, rgba(224, 90, 56, 0.15) 0%, rgba(14, 41, 34, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* Orbit Container */}
      <div
        style={{
          width: 500,
          height: 500,
          position: "relative",
          transform: `translateY(${floatY}px) perspective(1000px) rotateX(${rotX * 20}deg) rotateY(${rotY * 10}deg)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Orbital Rings */}
        <div
          style={{
            position: "absolute",
            width: 440,
            height: 440,
            borderRadius: "50%",
            border: "2px solid rgba(224, 90, 56, 0.4)",
            transform: `rotateX(65deg) rotateY(${frame * 0.6}deg)`,
            boxShadow: "0 0 30px rgba(224, 90, 56, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "1.5px dashed rgba(217, 119, 6, 0.35)",
            transform: `rotateX(55deg) rotateZ(35deg) rotateY(${-frame * 0.4}deg)`,
          }}
        />

        {/* Central Knowledge Core Prism */}
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 36,
            background:
              "linear-gradient(135deg, rgba(240, 236, 225, 0.95) 0%, rgba(26, 63, 53, 0.85) 100%)",
            boxShadow:
              "0 0 60px rgba(224, 90, 56, 0.35), inset 0 0 30px rgba(255, 255, 255, 0.6)",
            transform: `rotateY(${frame * 1.2}deg) rotateX(${frame * 0.8}deg)`,
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        />

        {/* Orbiting Satellite Nodes */}
        {satellites.map((sat, idx) => {
          const curAngle = angle * sat.speed + sat.phase;
          const x = Math.cos(curAngle) * sat.radius;
          const y = Math.sin(curAngle) * (sat.radius * 0.45);
          const zScale = interpolate(Math.sin(curAngle), [-1, 1], [0.75, 1.25]);

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                width: sat.size * zScale,
                height: sat.size * zScale,
                borderRadius: 10,
                backgroundColor: sat.color,
                transform: `translate(${x}px, ${y}px) rotate(45deg)`,
                boxShadow: `0 0 24px ${sat.color}`,
                border: "2px solid rgba(255,255,255,0.7)",
                transition: "all 0.05s linear",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
