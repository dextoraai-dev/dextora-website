"use client";

import React, { useState } from "react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from "lucide-react";

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Voices from the Field"
          badgeVariant="terracotta"
          title="Trusted by Aspirants, Students, & Educators"
          subtitle="Real stories from learners preparing for board exams and civil services across India."
        />

        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-8 sm:p-12 shadow-xl">
            <Quote className="w-12 h-12 text-[var(--brand-terracotta)]/20 absolute top-8 right-8" />

            <div className="flex items-center gap-1 text-amber-500 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="ml-2 text-xs font-semibold text-[var(--text-muted)]">
                Verified Feedback
              </span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-serif text-[var(--text-primary)] italic leading-relaxed mb-8">
              &quot;{current.quote}&quot;
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-3.5">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--brand-terracotta)]/40"
                />
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
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-[var(--text-muted)] px-2">
                  0{currentIndex + 1} / 0{testimonials.length}
                </span>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Pill Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  currentIndex === idx
                    ? "bg-[#0E2922] text-[#F8F5EE] border-[#0E2922] font-semibold shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                {t.product}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
