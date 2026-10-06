"use client";

import React from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRight } from "lucide-react";

export function ProductShowcase() {
  const { t } = useI18n();

  return (
    <section id="products-showcase" className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.products.sectionBadge}
          badgeVariant="terracotta"
          title={t.products.title}
          subtitle={t.products.subtitle}
        />

        {/* Product Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Bottom Explorer Action */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-all hover:shadow"
          >
            <span>Compare all products & technical specifications</span>
            <ArrowRight className="w-4 h-4 text-[var(--brand-terracotta)]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
