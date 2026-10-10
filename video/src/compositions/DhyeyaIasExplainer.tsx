import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const DhyeyaIasExplainer: React.FC = () => {
  const frame = useCurrentFrame();

  // Scene 1: 0 - 240 (Editorial Ingestion & Micro-tagging)
  // Scene 2: 240 - 480 (Dynamic Prelims MCQs)
  // Scene 3: 480 - 720 (AI Mains OCR Evaluation)

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
      {/* Amber radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.15) 0%, rgba(14, 41, 34, 0.25) 50%, transparent 80%)",
        }}
      />

      {/* Frame border */}
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "1px solid rgba(217, 119, 6, 0.2)",
          borderRadius: 24,
          pointerEvents: "none",
        }}
      />

      {/* STAGE 1: Editorial Ingestion */}
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
              backgroundColor: "rgba(217, 119, 6, 0.15)",
              color: "#F59E0B",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: 28,
              border: "1px solid rgba(217, 119, 6, 0.3)",
            }}
          >
            Step 01 &bull; News Ingestion
          </div>
          <h1 style={{ fontSize: 62, fontWeight: 700, marginBottom: 24 }}>
            Daily Editorials Mapped to GS 1-4
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
            Stripping noise from national news to extract syllabus-anchored arguments, constitutional articles, and key data points in Hindi & English.
          </p>
        </div>
      )}

      {/* STAGE 2: MCQ Radar */}
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
            Step 02 &bull; Prelims MCQ Radar
          </div>
          <h2 style={{ fontSize: 58, fontWeight: 700, marginBottom: 24 }}>
            Statement-Based Assertion Drills
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
            Instant Prelims question synthesis matching UPSC difficulty with elimination logic, traps, and historical trend comparisons.
          </p>
        </div>
      )}

      {/* STAGE 3: Mains Evaluation */}
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
            Step 03 &bull; AI Mains Vision Grading
          </div>
          <h2 style={{ fontSize: 58, fontWeight: 700, marginBottom: 24 }}>
            Handwritten Answer OCR & Rubric Scoring
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
            Upload photos of handwritten pages to receive paragraph-by-paragraph rubric feedback, structural flow analysis, and score benchmarks.
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: 14,
              backgroundColor: "#D97706",
              color: "#FFFFFF",
              fontFamily: "system-ui, sans-serif",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Dhyeya IAS &bull; upscnews.dextora.org
          </div>
        </div>
      )}
    </div>
  );
};
