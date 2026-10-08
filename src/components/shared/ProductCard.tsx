"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import {
  GraduationCap,
  ShieldAlert,
  Building2,
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "featured";
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--brand-terracotta)]" />;
    }
  };

  const handleLaunchClick = () => {
    trackEvent("product_launch_clicked", {
      productSlug: product.slug,
      productName: product.name,
      url: product.url,
    });
  };

  const isLive = product.status === "live";

  return (
    <div
      className={`group relative rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border ${product.accentBorder} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Top Section */}
      <div>
        {/* Product Visual Image Preview / Graceful Fallback */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-subtle)] mb-5 group-hover:border-[var(--border-strong)] transition-all">
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className={`w-full h-full ${product.accentBg} flex flex-col items-center justify-center text-center p-6 space-y-2`}>
              <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] shadow-sm border border-[var(--border-subtle)]">
                {getProductIcon(product.icon)}
              </div>
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Interface Preview in R&D
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${product.accentBg} shrink-0`}>
              {getProductIcon(product.icon)}
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors">
                {product.name}
              </h3>
              <p className="text-xs font-semibold text-[var(--brand-terracotta)]">
                {product.tagline}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
          {product.description}
        </p>

        {/* Key Features List */}
        <div className="space-y-2.5 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
            Key Capabilities
          </span>
          {product.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Target Audience Pill */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] mb-6">
          <Users className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          <span className="truncate">
            <strong className="text-[var(--text-primary)]">For: </strong>
            {product.audience}
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-terracotta)] transition-colors py-2"
        >
          <span>Explore Architecture & Specs</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {isLive ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLaunchClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E2922] hover:bg-[#18453A] text-[#F8F5EE] text-xs font-bold shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02]"
          >
            <span>Launch Platform</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E05A38]" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-lg">
            In Active R&D
          </span>
        )}
      </div>
    </div>
  );
}
