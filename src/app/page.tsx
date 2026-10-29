import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { MasterCinematicWorld } from "@/components/home/MasterCinematicWorld";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { WhyDextora } from "@/components/home/WhyDextora";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StatsStrip } from "@/components/home/StatsStrip";
import { LatestBlog } from "@/components/home/LatestBlog";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Dextora — AI-Powered Learning Hub for India",
  description:
    "The central ecosystem for Dextora AI educational products. Discover Dextora Learn and Dhyeya IAS Current Affairs with Socratic AI and bilingual mastery.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Unified Master Continuous Cinematic Flight World */}
      <MasterCinematicWorld />

      {/* 2. Product Showcase */}
      <ProductShowcase />

      {/* 3. Why Dextora Pillars */}
      <WhyDextora />

      {/* 4. How It Works - 3-Step Cognitive Loop */}
      <HowItWorks />

      {/* 5. Stats Strip (Conditional on features.showStats flag) */}
      {siteConfig.features.showStats && <StatsStrip />}

      {/* 6. Latest From the Blog */}
      <LatestBlog />

      {/* 7. Testimonials Carousel (Conditional on features.showTestimonials flag) */}
      {siteConfig.features.showTestimonials && <TestimonialsCarousel />}

      {/* 8. FAQ Accordion + FAQ JSON-LD */}
      <FAQSection />

      {/* 9. Final CTA Banner + Newsletter Signup */}
      <CTASection />
    </div>
  );
}
