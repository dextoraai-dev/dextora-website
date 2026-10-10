import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const DextoraExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 1: 0 - 270 (The Challenge)
  // Scene 2: 270 - 570 (The Product Suite)
  // Scene 3: 570 - 870 (Pedagogical AI Engine)
  // Scene 4: 870 - 1050 (Brand Resolution)

  const scene1Opacity = interpolate(frame, [0, 20, 240, 270], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene2Opacity = interpolate(frame, [270, 290, 540, 570], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene3Opacity = interpolate(frame, [570, 590, 840, 870], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scene4Opacity = interpolate(frame, [870, 895, 1050], [0, 1, 1], {
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
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(224, 90, 56, 0.12) 0%, rgba(14, 41, 34, 0.3) 50%, transparent 80%)",
        }}
      />

      {/* Grid texture line */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          pointerEvents: "none",
        }}
      />

      {/* SCENE 1: The Challenge */}
      {frame < 280 && (
        <div
          style={{
            opacity: scene1Opacity,
            textAlign: "center",
            maxWidth: 1200,
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
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 32,
              border: "1px solid rgba(224, 90, 56, 0.3)",
            }}
          >
            The Problem in Indian EdTech
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 28,
            }}
          >
            Monolithic Syllabi. Generic AI Hallucinations.
          </h1>
          <p
            style={{
              fontSize: 28,
              fontFamily: "system-ui, sans-serif",
              color: "#A3B8B2",
              lineHeight: 1.5,
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            Indian students face massive competitive curriculums where generic chatbots fail to understand strict NCERT rubrics and UPSC scoring standards.
          </p>
        </div>
      )}

      {/* SCENE 2: The Unified Suite */}
      {frame >= 260 && frame < 580 && (
        <div
          style={{
            opacity: scene2Opacity,
            textAlign: "center",
            maxWidth: 1400,
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
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 24,
              border: "1px solid rgba(5, 150, 105, 0.3)",
            }}
          >
            The Dextora Ecosystem
          </div>
          <h2
            style={{
              fontSize: 54,
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            Purpose-Built Pedagogical Platforms
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 36,
            }}
          >
            {[
              {
                title: "Dextora Learn",
                tag: "Academic Mastery",
                color: "#059669",
                desc: "Adaptive chapter pacing & Socratic hint engine",
              },
              {
                title: "Dhyeya IAS",
                tag: "Civil Services",
                color: "#D97706",
                desc: "Editorial synthesis, MCQs & Mains OCR grading",
              },
              {
                title: "Dextora Campus",
                tag: "Institutional OS",
                color: "#6366F1",
                desc: "Automated exam authoring & cohort telemetry",
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                style={{
                  width: 380,
                  padding: "36px 28px",
                  borderRadius: 24,
                  backgroundColor: "rgba(20, 23, 32, 0.8)",
                  border: `1px solid ${prod.color}40`,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    color: prod.color,
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {prod.tag}
                </div>
                <h3 style={{ fontSize: 32, marginBottom: 12 }}>{prod.title}</h3>
                <p
                  style={{
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 16,
                    color: "#94A3B8",
                    lineHeight: 1.5,
                  }}
                >
                  {prod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 3: The Engine */}
      {frame >= 560 && frame < 880 && (
        <div
          style={{
            opacity: scene3Opacity,
            textAlign: "center",
            maxWidth: 1200,
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
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 28,
              border: "1px solid rgba(224, 90, 56, 0.3)",
            }}
          >
            Pedagogical AI Principles
          </div>
          <h2 style={{ fontSize: 56, fontWeight: 700, marginBottom: 36 }}>
            Rigorous Pedagogy. Native Bilingual Parity.
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {[
              { num: "01", label: "Zero-Hallucination Curricular Grounding" },
              { num: "02", label: "Hindi & English Terminology Parity" },
              { num: "03", label: "Official Exam Rubric Alignment" },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  width: 320,
                  padding: "24px 20px",
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#E05A38",
                    marginBottom: 8,
                  }}
                >
                  {item.num}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#F8F5EE" }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCENE 4: Brand Close */}
      {frame >= 860 && (
        <div
          style={{
            opacity: scene4Opacity,
            textAlign: "center",
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "system-ui, sans-serif",
              color: "#E05A38",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            DEXTORA AI
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 32,
            }}
          >
            AI-Powered Learning for Every Learner in India.
          </h1>
          <div
            style={{
              display: "inline-block",
              padding: "16px 44px",
              borderRadius: 16,
              backgroundColor: "#E05A38",
              color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            Explore the Ecosystem &rarr; dextora.org
          </div>
        </div>
      )}
    </div>
  );
};
