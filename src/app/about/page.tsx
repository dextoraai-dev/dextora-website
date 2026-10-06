import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { teamMembers } from "@/data/team";
import { siteConfig } from "@/data/site-config";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import {
  Sparkles,
  Target,
  ShieldCheck,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Dextora — Mission, Pedagogy, & Team",
  description:
    "Learn about Dextora's mission to transform Indian education through Socratic AI, our founding story, leadership team, and pedagogical values.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "Socratic First-Principles",
      description:
        "We believe education is about teaching students how to think, not what to memorize. Our AI never acts as a shortcut solver; it serves as a patient intellectual guide.",
      icon: BrainCircuit,
    },
    {
      title: "Curricular Fidelity & Rigor",
      description:
        "Every model output is grounded in official Indian education frameworks (NCERT, CBSE, UPSC CSE). Zero hallucinations, absolute exam precision.",
      icon: Target,
    },
    {
      title: "Bharat Inclusion & Bilingual Parity",
      description:
        "Brilliance is distributed equally across India; linguistic access should be too. We engineer authentic Hindi and regional language intelligence from day one.",
      icon: Sparkles,
    },
    {
      title: "Student Safety & Data Sovereignty",
      description:
        "We maintain uncompromising standards of student privacy. No unauthorized data training, full compliance with the Indian DPDP Act.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-20">
          <Badge variant="terracotta">Our Purpose</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[var(--text-primary)] leading-tight">
            Democratizing Pedagogical Excellence for Every Indian Learner
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Dextora was founded on a simple observation: while generic AI models produce fast answers,
            students need cognitive guidance that builds lasting conceptual retention.
          </p>
        </div>

        {/* Founding Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-5">
            <Badge variant="emerald">The Dextora Story</Badge>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
              Bridging the 1:1 Tutoring Gap at Scale
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              In 1984, educational psychologist Benjamin Bloom established the &quot;2 Sigma Problem&quot;—showing
              that average students tutored one-on-one using mastery learning techniques performed two
              standard deviations better than conventional classroom peers.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              For decades, personal 1:1 tutoring in India remained an expensive luxury restricted to
              affluent urban households. Dextora was born to make high-fidelity Socratic tutoring
              universally accessible to all 250 million students across India.
            </p>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              By combining domain fine-tuned language models with visual OCR engines capable of reading
              handwritten Hindi and English answers, we empower aspirants in Prayagraj, Patna, or
              Bengaluru with equal educational firepower.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0E2922] text-[#F8F5EE] space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E05A38]/15 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-serif font-bold text-[#F8F5EE]">
                Our Guiding North Star
              </h3>
              <p className="text-sm text-[#A3B8B2] leading-relaxed italic">
                &quot;To elevate India&apos;s learning standard by turning every digital screen into a patient,
                bilingual Socratic mentor that meets learners exactly where they are.&quot;
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1F4C3E]">
                <div>
                  <div className="text-2xl font-mono font-bold text-[#F8F5EE]">85k+</div>
                  <div className="text-xs text-[#A3B8B2]">Learners Mentored</div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-[#E05A38]">250k+</div>
                  <div className="text-xs text-[#A3B8B2]">Mains Copies Evaluated</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <SectionHeading
            badge="Our Pillars"
            badgeVariant="terracotta"
            title="Core Values That Drive Our Engineering"
            subtitle="How we make product decisions every day."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-4"
                >
                  <div className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)] text-[var(--brand-terracotta)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{v.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team & Leadership */}
        <div className="mb-20">
          <SectionHeading
            badge="Leadership & Research"
            badgeVariant="terracotta"
            title="The Minds Behind Dextora"
            subtitle="A multidisciplinary team of AI researchers, cognitive scientists, and curriculum veterans."
          />

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-6 space-y-4 transition-all hover:shadow-lg"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--border-subtle)]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{member.name}</h3>
                  <p className="text-xs font-semibold text-[var(--brand-terracotta)]">
                    {member.role}
                  </p>
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-muted)] font-medium">
                    {member.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)]">
              Want to join our mission?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              We are actively hiring AI researchers, full-stack engineers, and UPSC curriculum specialists.
            </p>
          </div>
          <Link
            href="/careers"
            className="px-6 py-3 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] text-sm font-semibold shadow shrink-0"
          >
            Explore Open Roles
          </Link>
        </div>
      </div>
    </div>
  );
}
