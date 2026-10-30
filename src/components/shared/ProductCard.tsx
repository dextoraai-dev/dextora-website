"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { trackEvent } from "@/lib/analytics";
import { Tilt3DCard } from "@/components/shared/Tilt3DCard";
import {
  GraduationCap,
  ShieldAlert,
  Building2,
  Kanban,
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

export function ProductCard({ product }: ProductCardProps) {
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "Kanban":
        return <Kanban className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
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
    <Tilt3DCard
      className="h-full"
      glowColor="rgba(224, 90, 56, 0.22)"
      shimmer
      maxTilt={11}
      hoverScale={1.03}
    >
      {/* 3D depth floating badge — sits "above" the card surface via translateZ */}
      <div
        className="group relative rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl h-full overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Ambient glow corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[var(--brand-terracotta)]/8 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top Section */}
        <div>
          {/* Product Visual Image Preview / Graceful Fallback */}
          <div
            className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-subtle)] mb-3.5 group-hover:border-[var(--border-strong)] transition-all"
            style={{ transform: "translateZ(8px)" }}
          >
            {product.image ? (
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
            ) : (
              <div className={`w-full h-full ${product.accentBg} flex flex-col items-center justify-center text-center p-4 space-y-1.5`}>
                <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] shadow-sm border border-[var(--border-subtle)]">
                  {getProductIcon(product.icon)}
                </div>
                <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                  Interface Preview in R&D
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          {/* Top Header — floated slightly forward in Z */}
          <div
            className="flex items-start justify-between gap-3 mb-2.5"
            style={{ transform: "translateZ(4px)" }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-lg ${product.accentBg} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
                {getProductIcon(product.icon)}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-[11px] font-semibold text-[var(--brand-terracotta)] truncate">
                  {product.tagline}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {isLive ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                  Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3.5 line-clamp-2">
            {product.description}
          </p>

          {/* Key Features List */}
          <div className="space-y-1.5 mb-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block">
              Key Capabilities
            </span>
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-primary)] leading-tight">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>

          {/* Target Audience Pill */}
          <div className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] mb-4">
            <Users className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />
            <span className="truncate">
              <strong className="text-[var(--text-primary)]">For: </strong>
              {product.audience}
            </span>
          </div>
        </div>

        {/* Bottom Actions — popped forward most */}
        <div
          className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs"
          style={{ transform: "translateZ(6px)" }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-terracotta)] transition-colors py-1 text-xs"
          >
            <span>Architecture & Specs</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {isLive ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLaunchClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E2922] hover:bg-[#18453A] text-[#F8F5EE] text-xs font-bold shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02]"
            >
              <span>Launch</span>
              <ExternalLink className="w-3 h-3 text-[#E05A38]" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-md">
              In Active R&D
            </span>
          )}
        </div>
      </div>
    </Tilt3DCard>
  );
}
