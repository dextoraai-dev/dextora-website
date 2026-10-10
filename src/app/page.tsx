import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CinematicProducts } from "@/components/home/CinematicProducts";
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
      {/* 2. Hero Section */}
      <Hero />

      {/* 2.5. Cinematic Product Journey Scroll Stage */}
      <CinematicProducts />

      {/* 3. Product Showcase */}
      <ProductShowcase />

      {/* 4. Why Dextora Pillars */}
      <WhyDextora />

      {/* 5. How It Works - 3-Step Cognitive Loop */}
      <HowItWorks />

      {/* 6. Stats Strip */}
      <StatsStrip />

      {/* 7. Latest From the Blog */}
      <LatestBlog />

      {/* 8. Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* 9. FAQ Accordion + FAQ JSON-LD */}
      <FAQSection />

      {/* 10. Final CTA Banner + Newsletter Signup */}
      <CTASection />
    </div>
  );
}
