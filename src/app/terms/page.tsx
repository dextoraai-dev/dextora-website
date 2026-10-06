import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { Badge } from "@/components/shared/Badge";

export const metadata: Metadata = {
  title: "Terms of Service — Dextora AI",
  description:
    "Review the terms and conditions governing the use of Dextora corporate platforms and AI learning services.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <Badge variant="terracotta">Legal Agreement</Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--text-primary)]">
            Terms of Service
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Last Updated: October 2026 • Governed by the Laws of the Republic of India
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">1. Acceptance of Terms</h2>
            <p>
              By accessing or using {siteConfig.name} websites and associated software applications,
              you agree to be bound by these Terms of Service. If you do not agree, please do not use
              our platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              2. Educational Purpose & Disclaimer
            </h2>
            <p>
              Dextora products provide AI-augmented educational assistance and diagnostic evaluations.
              While our evaluation engines are designed against standard rubrics (such as NCERT and
              UPSC marking patterns), they are supplementary study aids and do not guarantee specific
              examination ranks or board outcomes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">3. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the services to generate unlawful, deceptive, or abusive material.</li>
              <li>Attempt to reverse-engineer, decompile, or scrape the AI model endpoints.</li>
              <li>Share subscription credentials with unauthorized third parties.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, curriculum tagging taxonomies, user interface designs, and proprietary
              pedagogical algorithms are the exclusive property of {siteConfig.legalName}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">5. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India,
              subject to the jurisdiction of courts in Bengaluru, Karnataka.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
