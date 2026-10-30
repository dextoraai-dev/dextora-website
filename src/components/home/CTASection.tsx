"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { AppStoreButtons } from "@/components/shared/AppStoreButtons";
import { FadeInUp, ScaleIn, Float, Parallax } from "@/components/shared/ScrollAnimation";
import { Tilt3DCard } from "@/components/shared/Tilt3DCard";
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
          <Tilt3DCard
            maxTilt={5}
            shimmer
            glowColor="rgba(224, 90, 56, 0.18)"
            hoverScale={1.01}
          >
            <div className="relative rounded-3xl bg-[#0E2922] text-[#F8F5EE] border border-[#1A3F35] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl" style={{ transformStyle: "preserve-3d" }}>

              {/* Parallax background image layer */}
              <Parallax speed={0.15} className="absolute inset-0 pointer-events-none select-none z-0">
                <Image
                  src="/images/contact/campus-bg.jpg"
                  alt="Educational Campus Background"
                  fill
                  className="object-cover object-center opacity-15 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-[#0E2922]/80 backdrop-blur-[1px]" />
              </Parallax>

              {/* Animated ambient gradients */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.15, 0.28, 0.15] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E05A38]/30 blur-3xl pointer-events-none z-0"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#059669]/30 blur-3xl pointer-events-none z-0"
              />

              {/* Floating decorative orbs */}
              <Float duration={5} distance={14} delay={0} className="absolute top-8 right-[30%] z-0 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-[#E05A38]/20 border border-[#E05A38]/30 blur-sm" />
              </Float>
              <Float duration={6} distance={10} delay={1.5} className="absolute bottom-12 right-16 z-0 pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-[#059669]/30 border border-[#059669]/30 blur-sm" />
              </Float>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column */}
                <FadeInUp className="lg:col-span-7 space-y-6">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18453A] text-[#E2DBD0] border border-[#235347] shadow-xs"
                    style={{ transform: "translateZ(8px)" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#E05A38]" />
                    <span>{t.cta.badge}</span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-[#F8F5EE] leading-tight"
                    style={{ transform: "translateZ(6px)" }}
                  >
                    {t.cta.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#A3B8B2] leading-relaxed max-w-xl">
                    {t.cta.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2" style={{ transform: "translateZ(10px)" }}>
                    <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all duration-200 hover:shadow-xl"
                      >
                        <span>{t.cta.exploreAll}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#F8F5EE] border border-[#235347] font-semibold text-sm transition-all"
                      >
                        <span>Partner with Us</span>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Conditional App Store Download Badges */}
                  <AppStoreButtons className="pt-2" />
                </FadeInUp>

                {/* Right Column: Newsletter — 3D floated card */}
                <motion.div
                  initial={{ opacity: 0, x: 30, rotateY: -8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ perspective: 800, transformStyle: "preserve-3d" }}
                  className="lg:col-span-5"
                >
                  <Tilt3DCard maxTilt={8} shimmer glowColor="rgba(224,90,56,0.20)" hoverScale={1.02}>
                    <div className="rounded-2xl bg-[#14352D] border border-[#235347] hover:border-[#E05A38]/40 transition-colors p-6 sm:p-7 space-y-4 shadow-lg">
                      <h3 className="text-base font-bold text-[#F8F5EE] flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[#E05A38]" />
                        <span>Dextora AI Research Dispatch</span>
                      </h3>
                      <p className="text-xs text-[#A3B8B2] leading-relaxed">
                        Receive monthly papers on Learning prompt architectures, state exam data trends,
                        and early previews of new product releases.
                      </p>
                      <NewsletterForm variant="stacked" />
                    </div>
                  </Tilt3DCard>
                </motion.div>
              </div>
            </div>
          </Tilt3DCard>
        </ScaleIn>
      </div>
    </section>
  );
}
