import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Compass,
  Sparkles,
  Milestone,
  CheckCircle2,
  Cpu,
  Layers,
  Globe2,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vision & AI Philosophy — Dextora AI",
  description:
    "Explore Dextora's 5-year pedagogical AI roadmap, regional language inclusion philosophy, and the future of cognitive learning in India.",
  alternates: {
    canonical: "/vision",
  },
};

export default function VisionPage() {
  const roadmapItems = [
    {
      phase: "Phase 1: 2024 - 2025",
      status: "Completed & Live",
      badgeVariant: "emerald" as const,
      title: "Foundational Socratic AI & UPSC Intelligence",
      description:
        "Launched Dextora Learn for chapter-wise adaptive pacing and Dhyeya IAS for daily current affairs and handwritten Mains answer evaluation in Hindi and English.",
      milestones: [
        "Sub-500ms Socratic hint generation",
        "Vision OCR handwriting extraction for Hindi and English",
        "Syllabus tagging across GS Papers 1 to 4",
      ],
    },
    {
      phase: "Phase 2: 2026",
      status: "In Active Deployment",
      badgeVariant: "terracotta" as const,
      title: "Institutional Campus OS & Multimodal Voice Tutoring",
      description:
        "Deploying Dextora Campus for schools and coaching institutes to automate balanced exam paper generation, classroom performance telemetry, and interactive voice tutoring.",
      milestones: [
        "Dextora Campus OS beta release",
        "Low-latency conversational voice AI in Hindi/Hinglish",
        "Automated Bloom's taxonomy question paper blueprinter",
      ],
    },
    {
      phase: "Phase 3: 2027+",
      status: "Research Horizon",
      badgeVariant: "indigo" as const,
      title: "Pan-India 22 Scheduled Languages & Universal Cognitive Graph",
      description:
        "Extending our domain models to Tamil, Telugu, Marathi, Bengali, and all 22 official Indian languages, accompanied by an open cognitive knowledge graph for Indian curricula.",
      milestones: [
        "Universal Indic LLM for state curriculum boards",
        "Cross-subject concept transfer diagnostics",
        "Open pedagogical benchmarks for Indian EdTech",
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <Badge variant="terracotta">Strategic Roadmap</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Our Vision: The Cognitive Architecture of Next-Gen Bharat
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            How we are building a generational educational infrastructure that replaces rote
            memorization with first-principles understanding for every Indian student.
          </p>
        </div>

        {/* Core Philosophy Manifesto */}
        <div className="p-8 sm:p-14 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-xl mb-24">
          <div className="max-w-3xl space-y-6">
            <Badge variant="emerald">Pedagogical Philosophy</Badge>
            <h2 className="text-3xl font-serif font-bold text-[var(--text-primary)]">
              The Three Tenets of Cognitive EdTech
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p>
                <strong>1. Cognitive Struggle is Essential:</strong> True neural rewiring occurs when a
                student navigates difficulty. Direct answer generation degrades learning capacity; Socratic
                guidance strengthens it.
              </p>
              <p>
                <strong>2. Language Should Accelerate, Not Inhibit:</strong> Millions of capable Indian
                minds are held back by language barriers. By treating Hindi and Indian vernaculars as
                first-class research citizens, we unlock unprecedented human potential.
              </p>
              <p>
                <strong>3. Teacher-in-the-Loop AI:</strong> AI does not replace educators; it liberates
                them from repetitive grading and blueprint drafting so they can focus on emotional
                mentorship and classroom inspiration.
              </p>
            </div>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-24">
          <SectionHeading
            badge="Execution Plan"
            badgeVariant="terracotta"
            title="Dextora 5-Year Technology Roadmap"
            subtitle="Clear phases from foundational models to institutional deployment and pan-India linguistic expansion."
          />

          <div className="mt-14 space-y-8 max-w-4xl mx-auto">
            {roadmapItems.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-4 hover:border-[var(--brand-terracotta)]/40 transition-all shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--brand-terracotta)]">
                    {item.phase}
                  </span>
                  <Badge variant={item.badgeVariant}>{item.status}</Badge>
                </div>

                <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block">
                    Key Milestones
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.milestones.map((ms, mIdx) => (
                      <div key={mIdx} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0E2922] text-[#F8F5EE] text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Partner with us to shape the future of Indian learning
          </h2>
          <p className="text-sm text-[#A3B8B2] max-w-xl mx-auto">
            Whether you are an academic researcher, school director, or civil services mentor, we
            welcome collaborations that push pedagogical boundaries.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
