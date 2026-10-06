import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Badge } from "@/components/shared/Badge";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  Building,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Institutional Partnerships — Dextora AI",
  description:
    "Get in touch with the Dextora team for institutional pilots, media inquiries, or technical support across our product family.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="terracotta">Connect With Us</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Let&apos;s Build Better Education Together
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Have questions about deploying Dextora in your institution, licensing our AI evaluation
            APIs, or discussing research collaborations? Reach out below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-strong)] shadow-xl">
            <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-6">
              Send an Inquiry
            </h2>
            <ContactForm />
          </div>

          {/* Right Column: Office Hubs & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Mailboxes */}
            <div className="p-8 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-5 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Mail className="w-5 h-5 text-[var(--brand-terracotta)]" />
                <span>Direct Mailboxes</span>
              </h3>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">
                    General Inquiries & Partnerships
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-medium text-[var(--brand-terracotta)] hover:underline"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">
                    Student & Learner Support
                  </span>
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="font-medium text-[var(--brand-terracotta)] hover:underline"
                  >
                    {siteConfig.supportEmail}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">
                    Careers & Research Fellowship
                  </span>
                  <a
                    href={`mailto:${siteConfig.careersEmail}`}
                    className="font-medium text-[var(--brand-terracotta)] hover:underline"
                  >
                    {siteConfig.careersEmail}
                  </a>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">
                    Press & Media
                  </span>
                  <a
                    href={`mailto:${siteConfig.pressEmail}`}
                    className="font-medium text-[var(--brand-terracotta)] hover:underline"
                  >
                    {siteConfig.pressEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Physical Hubs */}
            <div className="p-8 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-5 shadow-sm">
              <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Our Regional Hubs</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {siteConfig.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-1"
                  >
                    <div className="font-bold text-[var(--text-primary)] flex items-center justify-between">
                      <span>{addr.city}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)]">
                        {addr.title}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{addr.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ Link */}
            <div className="p-6 rounded-2xl bg-[#0E2922] text-[#F8F5EE] flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-sm">Need quick answers?</div>
                <div className="text-xs text-[#A3B8B2]">Check our frequently asked questions</div>
              </div>
              <Link
                href="/#faq-section"
                className="p-2.5 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#E05A38] transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
