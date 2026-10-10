import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const DextoraLearnExplainer: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene 1: 0 - 240 (Atomic Chapter Decomposition)
  // Scene 2: 240 - 480 (Socratic AI Tutor)
  // Scene 3: 480 - 720 (Predictive Exam Mastery)

  const s1Opacity = interpolate(frame, [0, 20, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s2Opacity = interpolate(frame, [240, 260, 450, 480], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const s3Opacity = interpolate(frame, [480, 500, 720], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0B0E14",
        color: "#F8F5EE",
        fontFamily: "'Playfair Display', Georgia, serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Emerald radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(5, 150, 105, 0.15) 0%, rgba(14, 41, 34, 0.3) 50%, transparent 80%)",
        }}
      />

      {/* Frame border */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "1px solid rgba(5, 150, 105, 0.2)",
          borderRadius: 24,
          pointerEvents: "none",
        }}
      />

      {/* STAGE 1: Atomic Concepts */}
      {frame < 250 && (
        <div
          style={{
            opacity: s1Opacity,
            textAlign: "center",
            maxWidth: 1100,
            padding: "0 40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(5, 150, 105, 0.15)",
              color: "#10B981",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 28,
              border: "1px solid rgba(5, 150, 105, 0.3)",
            }}
          >
            Step 01 &bull; Atomic Decomposition
          </div>
          <h1 style={{ fontSize: 62, fontWeight: 700, marginBottom: 24 }}>
            Textbooks Deconstructed into 10-Min Micro-Modules
          </h1>
          <p
            style={{
              fontSize: 26,
              fontFamily: "system-ui, sans-serif",
              color: "#CBD5E1",
              lineHeight: 1.5,
              maxWidth: 850,
              margin: "0 auto",
            }}
          >
            Transforming dense NCERT chapters into interactive simulations, real-world analogies, and granular concept graphs.
          </p>
        </div>
      )}

      {/* STAGE 2: Socratic Guidance */}
      {frame >= 235 && frame < 490 && (
        <div
          style={{
            opacity: s2Opacity,
            textAlign: "center",
            maxWidth: 1100,
            padding: "0 40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(224, 90, 56, 0.15)",
              color: "#E05A38",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 28,
              border: "1px solid rgba(224, 90, 56, 0.3)",
            }}
          >
            Step 02 &bull; Socratic AI Tutor
          </div>
          <h2 style={{ fontSize: 58, fontWeight: 700, marginBottom: 24 }}>
            First-Principles Hints Instead of Direct Answers
          </h2>
          <p
            style={{
              fontSize: 26,
              fontFamily: "system-ui, sans-serif",
              color: "#CBD5E1",
              lineHeight: 1.5,
              maxWidth: 850,
              margin: "0 auto",
            }}
          >
            Guides students with subtle pedagogical nudges to build lasting problem-solving intuition and long-term memory.
          </p>
        </div>
      )}

      {/* STAGE 3: Predictive Retention */}
      {frame >= 475 && (
        <div
          style={{
            opacity: s3Opacity,
            textAlign: "center",
            maxWidth: 1100,
            padding: "0 40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(99, 102, 241, 0.15)",
              color: "#818CF8",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 28,
              border: "1px solid rgba(99, 102, 241, 0.3)",
            }}
          >
            Step 03 &bull; Continuous Diagnostics
          </div>
          <h2 style={{ fontSize: 58, fontWeight: 700, marginBottom: 24 }}>
            Real-Time Board Readiness & Spaced Repetition
          </h2>
          <p
            style={{
              fontSize: 26,
              fontFamily: "system-ui, sans-serif",
              color: "#CBD5E1",
              lineHeight: 1.5,
              maxWidth: 850,
              margin: "0 auto 32px",
            }}
          >
            Granular mastery heatmaps identifying prerequisite gaps with automated revision scheduling before board examinations.
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: 14,
              backgroundColor: "#059669",
              color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Dextora Learn &bull; dextora.org
          </div>
        </div>
      )}
    </div>
  );
};
