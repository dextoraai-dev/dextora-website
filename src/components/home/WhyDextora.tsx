"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { Sparkles, Bot, Target, Languages } from "lucide-react";

export function WhyDextora() {
  const { t } = useI18n();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#E05A38] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
      case "Bot":
        return <Bot className="w-6 h-6 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
      case "Target":
        return <Target className="w-6 h-6 text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
      case "Languages":
        return <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--brand-terracotta)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-y border-[var(--border-subtle)] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Section Heading */}
        <FadeInUp>
          <SectionHeading
            badge={t.whyDextora.badge}
            badgeVariant="terracotta"
            title={t.whyDextora.title}
            subtitle={t.whyDextora.subtitle}
          />
        </FadeInUp>

        {/* Staggered Animated 4 Pillars Grid */}
        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.fourPillars.map((pillar, idx) => (
            <StaggerItem
              key={idx}
              className="h-full"
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
            >
              <div className="group h-full p-7 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#151922] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/50 transition-all duration-300 shadow-sm hover:shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden">
                {/* Subtle Hover Gradient Glow */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full bg-[var(--brand-terracotta)]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] transition-colors duration-300 group-hover:border-[var(--brand-terracotta)]/30">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-terracotta)]">
                    {pillar.tag}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)] relative z-10">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="font-mono font-semibold text-[var(--text-primary)]">Dextora Core</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
