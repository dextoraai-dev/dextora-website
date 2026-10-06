"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { Users, FileQuestion, FileCheck, CheckCircle } from "lucide-react";

export function StatsStrip() {
  const statIcons = [Users, FileQuestion, FileCheck, CheckCircle];

  return (
    <section className="py-14 bg-[#0E2922] text-[#F8F5EE] border-y border-[#1B4439] relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-[#E05A38]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#1D4A3E]">
          {siteConfig.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={idx}
                className={`pt-6 sm:pt-0 ${idx > 0 ? "sm:pl-8" : ""} flex flex-col items-center sm:items-start space-y-2 text-center sm:text-left`}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#153D33] text-[#E05A38]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F8F5EE]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-[#A3B8B2] font-medium max-w-[200px]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
