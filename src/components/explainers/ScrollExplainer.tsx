"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ExplainerData, ExplainerObjectType } from "@/data/explainers";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

interface ScrollExplainerProps {
  data: ExplainerData;
  className?: string;
}

export function ScrollExplainer({ data, className = "" }: ScrollExplainerProps) {
  const { locale } = useI18n();
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [progress, setProgress] = useState(0.2);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHi = locale === "hi";

  // Step click or auto-progress animation
  const handleStepSelect = (idx: number) => {
    setActiveStepIdx(idx);
    setProgress(0.2 + idx * 0.35);
  };

  const activeStep = data.steps[activeStepIdx] || data.steps[0];

  const render3DObject = (type: ExplainerObjectType, p: number) => {
    switch (type) {
      case "book":
        return <KnowledgeBook progress={p} color={activeStep.accentColor} />;
      case "news":
        return <NewsStack progress={p} color={activeStep.accentColor} />;
      case "answersheet":
        return <AnswerSheet progress={p} color={activeStep.accentColor} />;
      case "campus":
        return <CampusGrid progress={p} color={activeStep.accentColor} />;
      case "network":
        return <DataFlowNetwork progress={p} color={activeStep.accentColor} />;
      default:
        return <KnowledgeBook progress={p} color={activeStep.accentColor} />;
    }
  };

  return (
    <section
      ref={containerRef}
      className={`py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative overflow-hidden ${className}`}
      aria-label={activeStep.title[isHi ? "hi" : "en"]}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={data.badge[isHi ? "hi" : "en"]}
          badgeVariant="terracotta"
          title={data.title[isHi ? "hi" : "en"]}
          subtitle={data.subtitle[isHi ? "hi" : "en"]}
        />

        {/* Step Selector Tabs for Easy Interactive Scrubbing */}
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
          {data.steps.map((st, idx) => {
            const isCurrent = activeStepIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleStepSelect(idx)}
                className={`group flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isCurrent
                    ? "bg-[var(--bg-surface)] dark:bg-[#141720] text-[var(--text-primary)] border-[var(--brand-terracotta)] shadow-md ring-2 ring-[var(--brand-terracotta)]/20"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)]"
                }`}
                aria-pressed={isCurrent}
              >
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold transition-colors ${
                    isCurrent
                      ? "bg-[var(--brand-terracotta)] text-white"
                      : "bg-[var(--bg-surface)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                  }`}
                >
                  {st.stepNumber}
                </span>
                <span>{st.badge[isHi ? "hi" : "en"]}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Pedagogical Details */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-xl relative"
              >
                {/* Step Stage Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="terracotta" size="sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {isHi ? "चरण" : "Step"} {activeStep.stepNumber}:{" "}
                      {activeStep.badge[isHi ? "hi" : "en"]}
                    </span>
                  </Badge>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    {activeStepIdx + 1} / {data.steps.length}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)] mb-2">
                  {activeStep.title[isHi ? "hi" : "en"]}
                </h3>

                <p className="text-sm font-medium text-[var(--brand-terracotta)] mb-4">
                  {activeStep.subtitle[isHi ? "hi" : "en"]}
                </p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {activeStep.description[isHi ? "hi" : "en"]}
                </p>

                {/* Highlights list */}
                <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
                  {activeStep.highlights[isHi ? "hi" : "en"].map(
                    (highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0 mt-0.5"
                          style={{ color: activeStep.accentColor }}
                        />
                        <span>{highlight}</span>
                      </div>
                    )
                  )}
                </div>

                {/* Next Step Shortcut Button */}
                {activeStepIdx < data.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => handleStepSelect(activeStepIdx + 1)}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-terracotta)] hover:text-[#f06e4d] transition-colors"
                  >
                    <span>
                      {isHi ? "अगला चरण देखें" : "Advance to next stage"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleStepSelect(0)}
                    className="mt-8 inline-flex items-center gap-2 text-xs font-bold text-[var(--brand-terracotta)] hover:text-[#f06e4d] transition-colors"
                  >
                    <span>
                      {isHi ? "शुरुआत से देखें" : "Replay walkthrough loop"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Interactive Visual Canvas */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square max-w-md sm:max-w-lg mx-auto rounded-3xl bg-[var(--bg-surface)] dark:bg-[#11141B] border border-[var(--border-subtle)] p-4 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Subtle ambient gradient ring */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${activeStep.accentColor} 0%, transparent 70%)`,
                }}
              />

              {/* 3D Scene */}
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
                  color={activeStep.accentColor}
                />
                {render3DObject(activeStep.objectType, progress)}
              </SceneCanvas>

              {/* Interactive Scrub slider for user control */}
              <div className="absolute bottom-4 inset-x-8 flex items-center gap-3 bg-[var(--bg-base)]/80 dark:bg-[#141720]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[var(--border-subtle)]">
                <span className="text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Timeline
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={progress}
                  onChange={(e) => setProgress(parseFloat(e.target.value))}
                  aria-label="3D Object Animation Progress"
                  className="w-full h-1.5 bg-[var(--border-strong)] rounded-lg appearance-none cursor-pointer accent-[var(--brand-terracotta)]"
                />
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
