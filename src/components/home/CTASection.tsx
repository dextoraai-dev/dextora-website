"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { ArrowRight, Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0E2922] text-[#F8F5EE] border border-[#1A3F35] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl">
          {/* Background Ambient Gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E05A38]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#059669]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18453A] text-[#E2DBD0] border border-[#235347]">
                <Sparkles className="w-3.5 h-3.5 text-[#E05A38]" />
                <span>{t.cta.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#F8F5EE] leading-tight">
                {t.cta.title}
              </h2>

              <p className="text-sm sm:text-base text-[#A3B8B2] leading-relaxed max-w-xl">
                {t.cta.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <span>{t.cta.exploreAll}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#F8F5EE] border border-[#235347] font-semibold text-sm transition-colors"
                >
                  <span>Partner with Us</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Newsletter Subscription Box */}
            <div className="lg:col-span-5 rounded-2xl bg-[#14352D] border border-[#235347] p-6 sm:p-7 space-y-4">
              <h3 className="text-base font-bold text-[#F8F5EE] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#E05A38]" />
                <span>Dextora AI Research Dispatch</span>
              </h3>
              <p className="text-xs text-[#A3B8B2] leading-relaxed">
                Receive monthly papers on pedagogical prompt architectures, state exam data trends,
                and early previews of new product releases.
              </p>

              <NewsletterForm variant="stacked" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
