import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PricingWaitlistForm } from "@/components/forms/PricingWaitlistForm";
import {
  Sparkles,
  GraduationCap,
  Building2,
  Kanban,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  HelpCircle,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Early Access Plans — Dextora AI",
  description:
    "Explore upcoming plans for Dextora Learn, Dhyeya IAS, and School Deployments. Join the priority waitlist or book an institutional demo.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const tiers = [
    {
      id: "learn",
      name: "Dextora Learn",
      target: "K-12 Students & CBSE / State Boards",
      badge: "Early Access",
      badgeVariant: "emerald" as const,
      icon: GraduationCap,
      description:
        "Chapter-wise Socratic tutoring that guides learners to derive answers themselves, building lasting conceptual retention.",
      features: [
        "Interactive Socratic hints for Physics, Chemistry & Math",
        "Handwritten homework & doubt OCR evaluation",
        "NCERT and CBSE syllabus-mapped practice drills",
        "Deep bilingual Hindi and English explanations",
        "Continuous diagnostic micro-gap detection",
      ],
      ctaLabel: "Join Student Waitlist",
      ctaHref: "#waitlist",
      popular: false,
    },
    {
      id: "dhyeya",
      name: "Dhyeya IAS Current Affairs",
      target: "UPSC CSE & State PSC Aspirants",
      badge: "Cohort In Progress",
      badgeVariant: "terracotta" as const,
      icon: Sparkles,
      description:
        "High-yield daily editorial intelligence and rapid AI Mains answer evaluation mapped directly to official UPSC frameworks.",
      features: [
        "Sub-20-second Mains handwritten copy evaluation",
        "Rubric feedback on structure, keywords & constitutional articles",
        "Daily bilingual current affairs MCQs & editorial summaries",
        "Coverage for GS Papers 1 to 4 and State PSC syllabi",
        "Personalized answer refinement prompts",
      ],
      ctaLabel: "Join Aspirant Waitlist",
      ctaHref: "#waitlist",
      popular: true,
    },
    {
      id: "schools",
      name: "Schools & Institutions",
      target: "K-12 Schools, Colleges & Coaching Networks",
      badge: "Campus Pilots",
      badgeVariant: "terracotta" as const,
      icon: Building2,
      description:
        "Turn classrooms into personalized learning hubs with faculty co-pilots and granular student comprehension heatmaps.",
      features: [
        "Teacher dashboard with real-time class mastery diagnostics",
        "Institutional curriculum & test series integration",
        "Strict DPDP Act student privacy & data isolation",
        "Faculty training workshops & pedagogical onboarding",
        "Dedicated institutional account manager",
      ],
      ctaLabel: "Book Campus Walkthrough",
      ctaHref: "/contact?subject=School%20Deployment%20Inquiry",
      popular: false,
    },
    {
      id: "crm",
      name: "Dextora CRM",
      target: "EdTech Operations & Enterprise Sales",
      badge: "Commercial Access",
      badgeVariant: "emerald" as const,
      icon: Kanban,
      description:
        "Unified sales operating system equipped with Official Meta WhatsApp Cloud API integration and predictive lead scoring.",
      features: [
        "Official Meta Verified WhatsApp Cloud API broadcasts",
        "Sub-5-second Meta Ads & social form lead sync",
        "Drag-and-drop visual Kanban pipeline automation",
        "Predictive AI lead scoring & intent classification",
        "Multi-agent shared team inbox",
      ],
      ctaLabel: "Schedule Live Demo",
      ctaHref: "/contact?subject=Dextora%20CRM%20Demo",
      popular: false,
    },
  ];

  const pricingFaqs = [
    {
      q: "Why are official plans currently in Early Access?",
      a: "To ensure that every learner and pilot institution receives dedicated AI compute and high pedagogical accuracy, we onboard users in prioritized cohorts. Joining the waitlist reserves your priority queue position and grandfathered early-access terms.",
    },
    {
      q: "What perks do waitlist members receive?",
      a: "Waitlist members receive complimentary onboarding access during our beta periods, direct access to product roadmap roundtables, and preferred introductory terms when public subscription tiers launch.",
    },
    {
      q: "How does campus and institutional pricing work?",
      a: "Institutional deployments are tailored based on student cohort size, custom syllabus integration, and faculty training requirements. Contact our institutional team to schedule a custom walkthrough and receive a formal proposal.",
    },
    {
      q: "Are student data and test records protected?",
      a: "Yes. Dextora is strictly built in compliance with India's Digital Personal Data Protection (DPDP) Act. We never train public foundation models on individual student responses or school records.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5 mb-16">
          <Badge variant="terracotta">{siteConfig.pricing.statusBadge}</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            {siteConfig.pricing.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {siteConfig.pricing.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] font-medium mt-2">
            <Clock className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Public Subscription Plans Rolling Out Soon • Priority Cohorts Now Open</span>
          </div>
        </div>

        {/* Early Access Status Banner */}
        <div className="mb-20 rounded-3xl bg-[#0E2922] text-[#F8F5EE] border border-[#1A3F35] p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E05A38]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#18453A] text-[#E2DBD0] border border-[#235347]">
                <Layers className="w-3.5 h-3.5 text-[#E05A38]" />
                <span>Phase 1 Rollout</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F5EE]">
                No Hidden Fees. No Opaque Pricing.
              </h2>
              <p className="text-xs sm:text-sm text-[#A3B8B2] leading-relaxed">
                We are actively onboarding student groups, UPSC aspirants, and partner schools.
                Explore the plan tiers below to join our early-access waitlist or book an institutional walkthrough.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#waitlist"
                className="px-6 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact?subject=Book%20a%20Demo"
                className="px-6 py-3.5 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#F8F5EE] border border-[#235347] font-semibold text-sm transition-all"
              >
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Plan Tier Cards (Structural with NO fake prices) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Ecosystem Access Tiers
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Designed specifically for learners, competitive exam candidates, and institutional deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.id}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    tier.popular
                      ? "bg-[var(--bg-surface)] dark:bg-[#151922] border-2 border-[var(--brand-terracotta)] shadow-xl"
                      : "bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 shadow-sm hover:shadow-md"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[var(--brand-terracotta)] text-white text-[11px] font-bold tracking-wide uppercase shadow">
                      Most In Demand
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--brand-terracotta)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant={tier.badgeVariant}>{tier.badge}</Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">
                        {tier.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
                        {tier.target}
                      </p>
                    </div>

                    <div className="py-3 border-y border-[var(--border-subtle)]">
                      <div className="text-sm font-bold text-[var(--brand-terracotta)] font-mono">
                        Early Access Tier
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Public pricing releasing soon
                      </div>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                        What&apos;s Included:
                      </div>
                      <ul className="space-y-2">
                        {tier.features.map((feat, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--text-secondary)]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[var(--border-subtle)]">
                    <a
                      href={tier.ctaHref}
                      className={`w-full py-3 px-4 rounded-xl text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        tier.popular
                          ? "bg-[#E05A38] text-white hover:bg-[#F06E4D] shadow-sm"
                          : "bg-[#0E2922] text-[#F8F5EE] hover:bg-[#153D33]"
                      }`}
                    >
                      <span>{tier.ctaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Waitlist Section */}
        <div id="waitlist" className="mb-24 scroll-mt-24">
          <div className="rounded-3xl bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border border-[var(--border-subtle)] p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <Badge variant="terracotta">Early Access Registration</Badge>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
                  Reserve Your Spot on the Dextora Priority Waitlist
                </h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Join hundreds of students, aspirants, and educators getting early previews of Dextora Learn,
                  Dhyeya IAS, and our Socratic AI evaluation engines.
                </p>
                <div className="space-y-3 pt-2 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Guaranteed introductory benefits when paid plans go live</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--brand-terracotta)]" />
                    <span>Invitations to exclusive closed-beta testing cohorts</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <PricingWaitlistForm />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mb-20 max-w-4xl mx-auto">
          <SectionHeading
            badge="Pricing FAQs"
            badgeVariant="terracotta"
            title="Common Questions About Our Plans"
            subtitle="Straightforward answers regarding our early access rollout and commercial tiers."
          />

          <div className="mt-12 space-y-4">
            {pricingFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-6 space-y-2"
              >
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[var(--brand-terracotta)] shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
