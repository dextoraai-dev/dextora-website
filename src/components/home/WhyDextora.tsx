"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Sparkles, Bot, Target, Languages } from "lucide-react";

export function WhyDextora() {
  const { t } = useI18n();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#E05A38]" />;
      case "Bot":
        return <Bot className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "Target":
        return <Target className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "Languages":
        return <Languages className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--brand-terracotta)]" />;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-y border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.whyDextora.badge}
          badgeVariant="terracotta"
          title={t.whyDextora.title}
          subtitle={t.whyDextora.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.fourPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#151922] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)]">
                  {getPillarIcon(pillar.icon)}
                </div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--brand-terracotta)]">
                  {pillar.tag}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span>Pillar 0{idx + 1}</span>
                <span className="font-mono font-semibold text-[var(--text-primary)]">Dextora Core</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
