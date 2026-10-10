"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SceneCanvas } from "@/components/3d/SceneCanvas";
import {
  KnowledgeBook,
  NewsStack,
  AnswerSheet,
  CampusGrid,
  DataFlowNetwork,
} from "@/components/3d/objects";
import {
  RotateCw,
  BookOpen,
  Newspaper,
  FileCheck2,
  Building,
  Cpu,
  type LucideIcon,
} from "lucide-react";

interface GalleryItem {
  id: string;
  name: { en: string; hi: string };
  product: string;
  description: { en: string; hi: string };
  accentColor: string;
  icon: LucideIcon;
  component: (progress: number, color: string) => React.ReactNode;
}

export function Product3DGallery() {
  const { locale } = useI18n();
  const isHi = locale === "hi";
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [progress, setProgress] = useState(0.5);

  const items: GalleryItem[] = [
    {
      id: "knowledge-book",
      name: {
        en: "Knowledge Core & Chapter Book",
        hi: "ज्ञान केंद्र और अध्याय पुस्तिका",
      },
      product: "Dextora Learn",
      description: {
        en: "Layered cognitive pages fanning open to release glowing atomic chapter tokens. Represents adaptive pacing and first-principles mastery.",
        hi: "परमाणु अध्याय टोकन जारी करने वाले पृष्ठ। यह व्यक्तिगत गति और मूलभूत सिद्धांतों पर आधारित शिक्षण का प्रतीक है।",
      },
      accentColor: "#059669",
      icon: BookOpen,
      component: (p, c) => <KnowledgeBook progress={p} color={c} />,
    },
    {
      id: "news-stack",
      name: {
        en: "Editorial Stack & MCQ Pulse",
        hi: "संपादकीय स्टैक और एमसीक्यू पल्स",
      },
      product: "Dhyeya IAS",
      description: {
        en: "Translucent daily news slates peeling away into dynamic question bubbles and score telemetry. Represents current affairs synthesis.",
        hi: "दैनिक समाचार स्लेटों का गतिशील प्रश्न बुलबुलों में परिवर्तन। यह समसामयिकी विश्लेषण का प्रतीक है।",
      },
      accentColor: "#D97706",
      icon: Newspaper,
      component: (p, c) => <NewsStack progress={p} color={c} />,
    },
    {
      id: "answer-sheet",
      name: {
        en: "Handwritten Sheet & Vision Scanner",
        hi: "हस्तलिखित उत्तर और विज़न स्कैनर",
      },
      product: "Mains Evaluation",
      description: {
        en: "Handwritten answer page being scanned by a sweeping laser plane with real-time rubric annotations and scoring.",
        hi: "हस्तलिखित उत्तर पुस्तिका पर लेज़र स्कैनर द्वारा वास्तविक समय में रूब्रिक मूल्यांकन और अंकन।",
      },
      accentColor: "#E05A38",
      icon: FileCheck2,
      component: (p, c) => <AnswerSheet progress={p} color={c} />,
    },
    {
      id: "campus-grid",
      name: {
        en: "Modular Campus Grid",
        hi: "मॉड्यूलर कैंपस ग्रिड",
      },
      product: "Dextora Campus",
      description: {
        en: "Isometric architectural blocks assembling dynamically with live data telemetry pulses connecting classrooms and exam blueprints.",
        hi: "कक्षाओं और परीक्षा ब्लूप्रिंट को जोड़ने वाले लाइव डेटा पल्स के साथ मॉड्यूलर संस्थागत ब्लॉक।",
      },
      accentColor: "#6366F1",
      icon: Building,
      component: (p, c) => <CampusGrid progress={p} color={c} />,
    },
    {
      id: "data-network",
      name: {
        en: "Cognitive Neural Hub",
        hi: "संज्ञानात्मक न्यूरल हब",
      },
      product: "Dextora AI Engine",
      description: {
        en: "Central reasoning nucleus transmitting verified curricular context across satellite cognitive nodes without hallucinations.",
        hi: "बिना किसी त्रुटि के सत्यापित संदर्भ प्रसारित करने वाला केंद्रीय एआई कोर।",
      },
      accentColor: "#E05A38",
      icon: Cpu,
      component: (p, c) => <DataFlowNetwork progress={p} color={c} />,
    },
  ];

  const currentItem = items[selectedIdx];

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev + 1) % items.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSelectedIdx((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  return (
    <section
      className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Interactive 3D Object Gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isHi ? "3D इंटरैक्टिव गैलरी" : "Pedagogical 3D Gallery"}
          badgeVariant="terracotta"
          title={
            isHi
              ? "प्रत्यक्ष 3D इंटरैक्शन द्वारा समझें"
              : "Explore the Mechanics Behind Dextora"
          }
          subtitle={
            isHi
              ? "हमारे उत्पादों के तकनीकी और शैक्षणिक सिद्धांतों को 3D मॉडल में देखें।"
              : "Interact with the procedural 3D models representing each pillar of our educational AI architecture."
          }
        />

        {/* Object Selector Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {items.map((item, idx) => {
            const isSelected = selectedIdx === idx;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setProgress(0.5);
                }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? "bg-[var(--bg-surface)] dark:bg-[#141720] text-[var(--text-primary)] border-[var(--brand-terracotta)] shadow-md ring-2 ring-[var(--brand-terracotta)]/20"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)]"
                }`}
                aria-pressed={isSelected}
              >
                <Icon
                  className="w-4 h-4"
                  style={{ color: isSelected ? item.accentColor : undefined }}
                />
                <span>{item.name[isHi ? "hi" : "en"]}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Visual & Detail Viewer */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* 3D Viewport */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square rounded-3xl bg-[var(--bg-surface)] dark:bg-[#11141B] border border-[var(--border-subtle)] p-6 shadow-2xl overflow-hidden flex items-center justify-center">
              <SceneCanvas
                camera={{ position: [0, 0, 4.8], fov: 42 }}
                className="w-full h-full"
                interactive
              >
                <ambientLight intensity={0.8} />
                <directionalLight position={[4, 5, 4]} intensity={1.2} />
                <directionalLight
                  position={[-3, -3, -2]}
                  intensity={0.4}
                  color={currentItem.accentColor}
                />
                {currentItem.component(progress, currentItem.accentColor)}
              </SceneCanvas>

              {/* Slider for animation state */}
              <div className="absolute bottom-4 inset-x-8 flex items-center gap-3 bg-[var(--bg-base)]/80 dark:bg-[#141720]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase">
                  Animation
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={progress}
                  onChange={(e) => setProgress(parseFloat(e.target.value))}
                  aria-label={`${currentItem.name[isHi ? "hi" : "en"]} animation slider`}
                  className="w-full h-1.5 bg-[var(--border-strong)] rounded-lg appearance-none cursor-pointer accent-[var(--brand-terracotta)]"
                />
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Description & Accessibility Text */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-8 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-xl space-y-4">
              <Badge variant="terracotta" size="sm">
                {currentItem.product}
              </Badge>
              <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
                {currentItem.name[isHi ? "hi" : "en"]}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {currentItem.description[isHi ? "hi" : "en"]}
              </p>

              <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] space-y-2">
                <div className="flex items-center gap-2">
                  <RotateCw className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
                  <span>Use slider or keyboard &larr; / &rarr; keys to inspect</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
