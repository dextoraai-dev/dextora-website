"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Badge } from "@/components/shared/Badge";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  GraduationCap,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 hero-glow">
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex">
              <Badge variant="terracotta" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
                <span>{t.hero.badge}</span>
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--text-primary)] tracking-tight leading-[1.1]">
              {t.hero.titleLine1}{" "}
              <span className="text-[var(--brand-terracotta)] italic relative">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.titleLine2}
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#E05A38]" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all duration-200"
              >
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>NCERT & UPSC Syllabus Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Bilingual (English & Hindi)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Zero Generic Hallucinations</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Interactive Pedagogical AI Neural Card) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glowing backdrops */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#E05A38]/20 via-[#0E2922]/15 to-[#D97706]/20 rounded-3xl blur-2xl opacity-75" />

              <div className="relative rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-strong)] shadow-2xl p-6 sm:p-7 space-y-5">
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0E2922] flex items-center justify-center text-white">
                      <BrainCircuit className="w-4 h-4 text-[#E05A38]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">
                        Dextora Pedagogical Engine
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        Real-Time Cognitive Feedback
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active Pipeline
                  </span>
                </div>

                {/* Simulated Socratic Prompting Flow */}
                <div className="space-y-3 text-xs">
                  {/* Student Input */}
                  <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-1">
                    <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase">
                      Student Submission (UPSC Mains GS-2 / NCERT Physics)
                    </div>
                    <div className="text-[var(--text-primary)] italic font-serif text-sm">
                      &quot;How does the Doctrine of Basic Structure maintain constitutional balance?&quot;
                    </div>
                  </div>

                  {/* AI Evaluation Node */}
                  <div className="p-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] space-y-2 border border-[#1A3F35]">
                    <div className="flex items-center justify-between text-[10px] text-[#A3B8B2]">
                      <span className="flex items-center gap-1 text-[#E05A38] font-bold">
                        <Zap className="w-3 h-3" /> Socratic Rubric Analysis
                      </span>
                      <span>Latency: 420ms</span>
                    </div>
                    <p className="text-xs text-[#E2DBD0] leading-relaxed">
                      &quot;Good mention of Kesavananda Bharati (1973). To elevate this to a top-percentile answer, incorporate the Minerva Mills (1980) harmony principle and cite Article 368 clause (4) limits.&quot;
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="px-2 py-0.5 rounded bg-[#18453A] text-emerald-300 text-[10px] font-semibold">
                        Content Score: 8.5/10
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#18453A] text-[#D97706] text-[10px] font-semibold">
                        Hindi & EN Parity
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] text-center">
                    <div className="text-base font-bold text-[var(--text-primary)]">85,000+</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Active Learners</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] text-center">
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">94%</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Concept Retention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
