import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { Badge } from "@/components/shared/Badge";
import { ShieldCheck, Lock, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Student Data Protection",
  description:
    "Learn about Dextora's strict data privacy commitments, DPDP Act compliance, and student data protection standards.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-12">
          <Badge variant="emerald">Trust & Compliance</Badge>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--text-primary)]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[var(--text-muted)]">
            Last Updated: October 2026 • Compliant with Digital Personal Data Protection (DPDP) Act, India
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">1. Introduction</h2>
            <p>
              {siteConfig.legalName} (&quot;Dextora&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values your trust and is
              dedicated to protecting the personal data of all students, civil services aspirants,
              educators, and institutions using our platform family (including Dextora Learn, Dhyeya IAS
              Current Affairs, and Dextora Campus).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              2. Information We Collect
            </h2>
            <p>We collect only the information necessary to provide pedagogical AI evaluations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Account Information:</strong> Name, email address, phone number, and optional
                academic grade/exam category.
              </li>
              <li>
                <strong>Learning Submissions:</strong> Practice quiz responses, handwritten answer
                sheet photos/scans for Mains evaluation, and question search queries.
              </li>
              <li>
                <strong>Diagnostic Telemetry:</strong> Anonymized concept retention metrics, response
                latencies, and difficulty calibration logs.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              3. AI Model Training & Data Isolation
            </h2>
            <p>
              <strong>We never sell student data.</strong> Student submissions, handwritten copies, and
              private notes are strictly isolated and are never shared with third-party advertisers or
              used to train public foundation models without explicit institutional authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              4. Data Security & Storage
            </h2>
            <p>
              All data transmitted to Dextora is encrypted in transit using TLS 1.3 and at rest using
              AES-256 encryption. Primary data stores are hosted in ISO 27001 certified data centers
              with strict access control policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              5. Your Rights & Data Deletion
            </h2>
            <p>
              Under the Digital Personal Data Protection Act, you have the right to request a copy of
              your personal data, correct inaccuracies, or request full account deletion by emailing{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-[var(--brand-terracotta)] underline"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
