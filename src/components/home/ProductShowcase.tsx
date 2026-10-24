"use client";

import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProductShowcase() {
  const { t } = useI18n();

  return (
    <section id="products-showcase" className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Section Heading */}
        <FadeInUp>
          <SectionHeading
            badge={t.products.sectionBadge}
            badgeVariant="terracotta"
            title={t.products.title}
            subtitle={t.products.subtitle}
          />
        </FadeInUp>

        {/* Staggered Animated Product Cards Grid */}
        <StaggerContainer className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Animated Bottom Explorer Action */}
        <FadeInUp delay={0.25} className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:shadow-md"
            >
              <span>Compare all products & technical specifications</span>
              <ArrowRight className="w-4 h-4 text-[var(--brand-terracotta)]" />
            </Link>
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  );
}
