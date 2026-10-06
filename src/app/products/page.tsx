import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/shared/Badge";
import {
  Layers,
  Sparkles,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Products & AI Platform Family",
  description:
    "Explore Dextora's specialized AI educational platforms: Dextora Learn for academic curriculum and Dhyeya IAS Current Affairs for civil services exams.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="terracotta">Product Architecture</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            The Dextora AI Product Family
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            A unified suite of pedagogical engines engineered for specific academic milestones, from
            foundation board exams to the nation&apos;s toughest competitive civil services tests.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Comparison Matrix / Architecture Highlights */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-xl">
          <div className="max-w-3xl mb-10">
            <Badge variant="emerald" className="mb-3">
              Unified Foundation
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Shared AI Engine & Infrastructure
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Every Dextora product inherits our core pedagogical guarantees: zero hallucination guardrails,
              sub-500ms inference, and authentic bilingual Hindi/English terminology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[var(--bg-surface)] text-emerald-600 dark:text-emerald-400">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Curricular Grounding Model
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                All reasoning trees are anchored against official NCERT, CBSE, and UPSC syllabi with
                strict citation graphs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[var(--bg-surface)] text-amber-600 dark:text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Standard Rubric Grading
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Evaluations reflect real examiner rubrics, giving learners transparent marks across
                structure, keywords, and conclusions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-3">
              <div className="p-3 w-fit rounded-xl bg-[var(--bg-surface)] text-indigo-600 dark:text-indigo-400">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                Bilingual Parity Engine
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Equal pedagogical fidelity in both Hindi and English, ensuring no medium of study is
                disadvantaged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
