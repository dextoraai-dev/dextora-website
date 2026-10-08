"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  BookOpenCheck,
  Cpu,
  FileCheck2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function HowItWorks() {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      title: t.howItWorks.step1Title,
      subtitle: "Personalised Concept Diagnostics",
      description: t.howItWorks.step1Desc,
      icon: BookOpenCheck,
      color: "emerald",
      badgeText: "Concept Ingestion",
      details: [
        "Identifies cognitive prerequisites & misconceptions",
        "Adaptive chapter pacing tailored to comprehension speed",
        "Step-by-step Socratic hints instead of direct answer dumps",
      ],
    },
    {
      num: "02",
      title: t.howItWorks.step2Title,
      subtitle: "Dynamic Question Synthesis",
      description: t.howItWorks.step2Desc,
      icon: Cpu,
      color: "amber",
      badgeText: "Real-Time Generation",
      details: [
        "Curriculum-grounded MCQs matched to official blueprint",
        "Elimination logic & statement-based assertion drills",
        "Instant multi-lingual translation between Hindi and English",
      ],
    },
    {
      num: "03",
      title: t.howItWorks.step3Title,
      subtitle: "Rubric-Based AI Grading",
      description: t.howItWorks.step3Desc,
      icon: FileCheck2,
      color: "terracotta",
      badgeText: "Vision OCR + Scoring",
      details: [
        "Handwritten answer OCR with layout & diagram analysis",
        "Scoring against official UPSC / CBSE marking schemes",
        "Actionable paragraph-by-paragraph improvement tips",
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.howItWorks.badge}
          badgeVariant="terracotta"
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-8 border transition-all duration-300 relative flex flex-col justify-between ${isSelected
                    ? "bg-[var(--bg-surface)] dark:bg-[#141720] border-[var(--brand-terracotta)] shadow-xl ring-2 ring-[var(--brand-terracotta)]/20 -translate-y-1"
                    : "bg-[var(--bg-surface)] dark:bg-[#141720] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-[var(--brand-terracotta)]">
                      {step.num}
                    </span>
                    <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-[var(--brand-forest)] dark:text-[#E05A38]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                    {step.badgeText}
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-[var(--text-primary)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--brand-terracotta)]">
                  <span>Explore Loop Stage {step.num}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
