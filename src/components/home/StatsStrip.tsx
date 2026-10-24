"use client";

import React from "react";
import CountUpNumber from "../shared/CountUpNumber";
import { siteConfig } from "@/data/site-config";
import { StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { Users, FileQuestion, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function StatsStrip() {
  const statIcons = [Users, FileQuestion, FileCheck, CheckCircle];

  return (
    <section className="py-16 bg-[#0E2922] text-[#F8F5EE] border-y border-[#1B4439] relative overflow-hidden">
      {/* Animated Glow background accent */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-36 bg-[#E05A38]/20 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#1D4A3E]">
          {siteConfig.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <StaggerItem
                key={idx}
                className={`pt-6 sm:pt-0 ${idx > 0 ? "sm:pl-8" : ""} flex flex-col items-center sm:items-start space-y-2 text-center sm:text-left group cursor-default`}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="p-2.5 rounded-xl bg-[#153D33] text-[#E05A38] border border-[#235347] shadow-sm group-hover:border-[#E05A38]/40 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.div>
                  <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F8F5EE]">
                    <CountUpNumber
                      end={parseFloat(stat.value.replace(/[^0-9.]/g, ""))}
                      decimals={stat.value.includes(".") ? 1 : 0}
                      className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F8F5EE]"
                    />
                  </span>
                </div>
                <p className="text-xs text-[#A3B8B2] group-hover:text-[#F8F5EE] transition-colors font-medium max-w-[200px]">
                  {stat.label}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
