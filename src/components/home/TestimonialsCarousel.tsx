"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, ScaleIn } from "@/components/shared/ScrollAnimation";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  // Guard: Hide entire section if feature flag is false or no testimonials exist
  if (!siteConfig.features?.showTestimonials || !siteConfig.testimonials?.length) {
    return null;
  }

  const items = siteConfig.testimonials;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const current = items[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <FadeInUp>
          <SectionHeading
            badge="Learner Feedback"
            badgeVariant="terracotta"
            title="Trusted by Aspirants, Students, & Educators"
            subtitle="Verified experiences from learners preparing for board exams and civil services across India."
          />
        </FadeInUp>

        <div className="mt-14 max-w-4xl mx-auto">
          {/* Animated Card Container */}
          <ScaleIn>
            <div className="relative rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-8 sm:p-12 shadow-xl overflow-hidden">
              <Quote className="w-12 h-12 text-[var(--brand-terracotta)]/20 absolute top-8 right-8 pointer-events-none" />

              {/* Animated Testimonial Content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-1 text-amber-500 mb-6">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-[var(--text-muted)]">
                      Verified Review
                    </span>
                  </div>

                  <p className="text-lg sm:text-xl md:text-2xl font-serif text-[var(--text-primary)] italic leading-relaxed mb-8 min-h-[5rem]">
                    &quot;{current.quote}&quot;
                  </p>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
                    <div className="flex items-center gap-3.5">
                      {/* Initials Avatar - No Stock Photos */}
                      <div className="w-12 h-12 rounded-full bg-[var(--brand-terracotta)]/15 text-[var(--brand-terracotta)] border-2 border-[var(--brand-terracotta)]/40 shadow-xs flex items-center justify-center font-bold text-sm tracking-wide">
                        {current.initials}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--text-primary)]">
                          {current.name}
                        </div>
                        <div className="text-xs text-[var(--brand-terracotta)] font-semibold">
                          {current.role} • {current.institution}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] mt-0.5">
                          <MapPin className="w-3 h-3 text-[var(--text-muted)]" />
                          <span>{current.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Carousel Controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </motion.button>
                      <span className="text-xs font-mono text-[var(--text-muted)] px-2">
                        0{currentIndex + 1} / 0{items.length}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all cursor-pointer shadow-xs"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </ScaleIn>

          {/* Product Pill Indicators */}
          <FadeInUp delay={0.2} className="flex justify-center gap-2 mt-6">
            {items.map((t, idx) => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelect(idx)}
                className={`px-3.5 py-1.5 text-xs rounded-full border transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "bg-[#0E2922] text-[#F8F5EE] border-[#0E2922] font-semibold shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                {t.product}
              </motion.button>
            ))}
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
