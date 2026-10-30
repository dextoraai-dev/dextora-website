"use client";

import React from "react";
import CountUpNumber from "../shared/CountUpNumber";
import { siteConfig } from "@/config/site";
import { StaggerContainer, StaggerItem, Float } from "@/components/shared/ScrollAnimation";
import { Tilt3DCard } from "@/components/shared/Tilt3DCard";
import { Users, FileQuestion, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function StatsStrip() {
  // Guard: Hide entire section if feature flag is false or no stats exist
  if (!siteConfig.features?.showStats || !siteConfig.stats?.length) {
    return null;
  }

  const statIcons = [Users, FileQuestion, FileCheck, CheckCircle];

  return (
    <section className="py-20 bg-[#0E2922] text-[#F8F5EE] border-y border-[#1B4439] relative overflow-hidden">
      {/* Animated ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 bg-[#E05A38]/20 blur-3xl pointer-events-none"
      />

      {/* 3D grid background lines — decorative depth cue */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F5EE 1px, transparent 1px), linear-gradient(90deg, #F8F5EE 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(600px) rotateX(12deg) scaleY(1.1)",
          transformOrigin: "top center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
            const suffix =
              stat.suffix ||
              (stat.value.includes("+") ? "+" : stat.value.includes("%") ? "%" : "");

            return (
              <StaggerItem
                key={idx}
                className="h-full"
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              >
                <Tilt3DCard
                  className="h-full"
                  glowColor="rgba(224, 90, 56, 0.35)"
                  shimmer
                  maxTilt={10}
                  hoverScale={1.04}
                >
                  <div
                    className="relative rounded-2xl border border-[#1D4A3E] hover:border-[#E05A38]/50 bg-[#0B1F1A]/80 p-6 flex flex-col items-center text-center space-y-3 h-full transition-all duration-300 hover:shadow-2xl group overflow-hidden"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-[#E05A38]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating icon */}
                    <Float duration={3.5} distance={7} delay={idx * 0.4}>
                      <div
                        className="p-3 rounded-xl bg-[#153D33] text-[#E05A38] border border-[#235347] shadow-lg group-hover:border-[#E05A38]/60 transition-colors"
                        style={{ transform: "translateZ(8px)" }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </Float>

                    {/* Number — popped forward */}
                    <div style={{ transform: "translateZ(12px)" }}>
                      <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F8F5EE] flex items-center justify-center">
                        <CountUpNumber
                          end={numericValue}
                          decimals={stat.value.includes(".") ? 1 : 0}
                          className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F8F5EE]"
                        />
                        {suffix && <span>{suffix}</span>}
                      </span>
                    </div>

                    <p className="text-xs text-[#A3B8B2] group-hover:text-[#F8F5EE] transition-colors font-medium">
                      {stat.label}
                    </p>
                  </div>
                </Tilt3DCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
