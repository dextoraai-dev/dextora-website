import React from "react";
import type { Metadata } from "next";
import { jobPositions, companyPerks } from "@/data/careers";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";
import {
  Briefcase,
  MapPin,
  Clock,
  Coins,
  Sparkles,
  Cpu,
  HeartPulse,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Build Pedagogical AI at Dextora",
  description:
    "Join Dextora AI to build transformative educational intelligence. Explore open roles in AI research, full-stack engineering, product design, and UPSC curriculum.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersPage() {
  const getPerkIcon = (iconName: string) => {
    switch (iconName) {
      case "Coins":
        return <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[var(--brand-terracotta)]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      case "HeartPulse":
        return <HeartPulse className="w-6 h-6 text-rose-600 dark:text-rose-400" />;
      case "MapPin":
        return <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case "BookOpen":
        return <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[var(--brand-terracotta)]" />;
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <Badge variant="terracotta">We&apos;re Hiring</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Build the Future of Cognitive Learning in India
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            We are assembling a passionate crew of AI researchers, distributed systems builders, and
            pedagogy specialists to solve education for 250M+ learners.
          </p>
        </div>

        {/* Culture & Perks Grid */}
        <div className="mb-24">
          <SectionHeading
            badge="Life at Dextora"
            badgeVariant="terracotta"
            title="Why Build Your Career With Us"
            subtitle="Exceptional ownership, serious AI compute, and the satisfaction of building national educational infrastructure."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyPerks.map((perk, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-3 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)]">
                  {getPerkIcon(perk.icon)}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{perk.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles List */}
        <div id="open-positions" className="mb-24">
          <SectionHeading
            badge="Open Opportunities"
            badgeVariant="emerald"
            title="Current Open Positions"
            subtitle="Find your next high-impact role across our engineering, research, and curriculum teams."
          />

          <div className="mt-14 space-y-6 max-w-4xl mx-auto">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="p-8 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-all space-y-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-[var(--brand-terracotta)] uppercase tracking-wider">
                      {job.department}
                    </span>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-0.5">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] font-medium">
                      <MapPin className="w-3 h-3 text-[var(--brand-terracotta)]" />
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] font-medium">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      {job.type}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-subtle)] text-xs">
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 text-[var(--text-secondary)]">
                      {job.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[var(--text-primary)] mb-2 uppercase tracking-wide">
                      Requirements
                    </h4>
                    <ul className="space-y-1.5 text-[var(--text-secondary)]">
                      {job.requirements.map((req, reqIdx) => (
                        <li key={reqIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    Experience: <strong>{job.experience}</strong>
                  </span>
                  <a
                    href="#apply-form"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] text-xs font-semibold shadow transition-colors"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E05A38]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Section */}
        <div id="apply-form" className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-strong)] shadow-2xl">
          <div className="text-center space-y-3 mb-8">
            <Badge variant="terracotta">Direct Application</Badge>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Submit Your Profile
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Apply directly to an open role or submit a general application for future opportunities.
            </p>
          </div>

          <CareerApplicationForm />
        </div>
      </div>
    </div>
  );
}
