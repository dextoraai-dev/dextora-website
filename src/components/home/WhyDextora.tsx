"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInDepth, StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { Tilt3DCard } from "@/components/shared/Tilt3DCard";
import { Sparkles, Bot, Target, Languages } from "lucide-react";

const PILLAR_COLORS = ["#E05A38", "#059669", "#D97706", "#4F46E5"];
const PILLAR_GLOWS = [
  "rgba(224, 90, 56, 0.28)",
  "rgba(5, 150, 105, 0.28)",
  "rgba(217, 119, 6, 0.28)",
  "rgba(79, 70, 229, 0.28)",
];

export function WhyDextora() {
  const { t } = useI18n();

  const getPillarIcon = (iconName: string, idx: number) => {
    const color = PILLAR_COLORS[idx % PILLAR_COLORS.length];
    const cls = "w-6 h-6 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6";
    switch (iconName) {
      case "Sparkles": return <Sparkles className={cls} style={{ color }} />;
      case "Bot":      return <Bot className={cls} style={{ color }} />;
      case "Target":   return <Target className={cls} style={{ color }} />;
      case "Languages":return <Languages className={cls} style={{ color }} />;
      default:         return <Sparkles className={cls} style={{ color }} />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-y border-[var(--border-subtle)] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <FadeInDepth>
          <SectionHeading
            badge={t.whyDextora.badge}
            badgeVariant="terracotta"
            title={t.whyDextora.title}
            subtitle={t.whyDextora.subtitle}
          />
        </FadeInDepth>

        {/* 3D Tilt Pillars Grid */}
        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.fourPillars.map((pillar, idx) => (
            <StaggerItem key={idx} className="h-full">
              <Tilt3DCard
                className="h-full"
                glowColor={PILLAR_GLOWS[idx % PILLAR_GLOWS.length]}
                shimmer
                maxTilt={13}
                hoverScale={1.04}
              >
                <div
                  className="group h-full p-7 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#151922] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/50 transition-all duration-300 shadow-sm hover:shadow-2xl space-y-4 flex flex-col justify-between relative overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Ambient glow */}
                  <div
                    className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ backgroundColor: `${PILLAR_COLORS[idx % PILLAR_COLORS.length]}25` }}
                  />

                  {/* Top content — floated forward */}
                  <div className="space-y-3 relative z-10" style={{ transform: "translateZ(6px)" }}>
                    <div
                      className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {getPillarIcon(pillar.icon, idx)}
                    </div>
                    <div
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: PILLAR_COLORS[idx % PILLAR_COLORS.length] }}
                    >
                      {pillar.tag}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors duration-200">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] relative z-10">
                    <span>Pillar 0{idx + 1}</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">Dextora Core</span>
                  </div>
                </div>
              </Tilt3DCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
