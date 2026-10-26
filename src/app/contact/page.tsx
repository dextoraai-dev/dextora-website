import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Mail,
  Sparkles,
  Building,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Institutional Partnerships — Dextora AI",
  description:
    "Partner with Dextora for institutional AI learning pilots, UPSC & NCERT curriculum integration, or technical support across our product ecosystem.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    /*
     * Full-page campus background using a plain <img> absolutely positioned
     * inside the page wrapper. This bypasses body background-color and
     * overflow-x:clip constraints that break fixed/sticky approaches.
     */
    <div
      className="relative min-h-screen text-[var(--text-primary)]"
      style={{ isolation: "isolate" }}
    >
      {/* ── FULL-PAGE BACKGROUND IMAGE (absolutely positioned, full scroll height) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/contact/campus-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ zIndex: -2 }}
      />
      {/* Dark gradient overlay — lightened so campus image is clearly visible */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#06080D]/65 via-[#0B0F18]/55 to-[#0E1420]/60 pointer-events-none select-none"
        style={{ zIndex: -1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/35 via-transparent to-transparent pointer-events-none select-none"
        style={{ zIndex: -1 }}
      />

      {/* ══════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 sm:py-36 border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-7">

            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-[#E05A38]/20 text-[#E88060] border border-[#E05A38]/35 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contact &amp; Institutional Partnerships</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#F8F5EE] leading-[1.1]">
              Let&apos;s Build Grounded<br className="hidden sm:block" /> Learning AI Together
            </h1>

            <p className="text-base sm:text-lg text-[#C8D4CE] leading-relaxed max-w-2xl">
              Whether you are a school principal, university dean, civil services academy director,
              or edtech developer — explore how Dextora&apos;s zero-hallucination cognitive learning
              ecosystem transforms student outcomes.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                NCERT &amp; State Boards (9–12)
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-amber-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                UPSC &amp; Civil Services Rubrics
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[#E2DBD0]">
                <Compass className="w-3.5 h-3.5" />
                Hindi &amp; English Bilingual Parity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. FORM + CHANNELS  (all cards are glassmorphic over campus bg)
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl backdrop-blur-xl bg-white/[0.07] border border-white/15 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-[#E05A38]/10 blur-3xl pointer-events-none" />
              <div className="mb-6 space-y-1 relative z-10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F5EE]">Send an Inquiry</h2>
                <p className="text-xs sm:text-sm text-[#9AAFAA]">
                  Fill in your details below and an academic partnerships lead will reach out within 24 hours.
                </p>
              </div>
              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>

            {/* Right: Channels */}
            <div className="lg:col-span-5 space-y-6">

              {/* Direct Mailboxes */}
              <div className="p-7 rounded-3xl backdrop-blur-xl bg-white/[0.07] border border-white/15 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-[#F8F5EE] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#E05A38]" />
                  Direct Mailboxes
                </h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  {[
                    { label: "General Inquiries & Institutional Pilots", email: siteConfig.contactEmail },
                    { label: "Student & Learner Support", email: siteConfig.supportEmail },
                    { label: "Careers & Academic Fellowship", email: siteConfig.careersEmail },
                    { label: "Press & Media Inquiries", email: siteConfig.pressEmail },
                  ].map(({ label, email }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold text-[#6A8880] uppercase tracking-wider">{label}</span>
                      <a href={`mailto:${email}`} className="font-medium text-[#E88060] hover:underline">{email}</a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regional Hubs */}
              <div className="p-7 rounded-3xl backdrop-blur-xl bg-white/[0.07] border border-white/15 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-[#F8F5EE] flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-400" />
                  Our Regional Hubs
                </h3>
                <div className="space-y-3">
                  {siteConfig.addresses.map((addr, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1 hover:border-[#E05A38]/40 transition-colors"
                    >
                      <div className="font-bold text-sm text-[#F8F5EE] flex items-center justify-between gap-2">
                        <span>{addr.city}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#A3B8B2] border border-white/10 font-medium shrink-0">
                          {addr.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#8AA09A] leading-relaxed">{addr.address}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ quick link — library image as accent */}
              <div className="relative p-7 rounded-3xl overflow-hidden border border-white/15 shadow-xl group">
                <div className="absolute inset-0">
                  <Image
                    src="/images/contact/library-bg.jpg"
                    alt="Dextora Academic Library"
                    fill
                    className="object-cover object-center opacity-30 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#081A16]/82 backdrop-blur-[2px]" />
                </div>
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#F8F5EE] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#E05A38]" />
                      Need instant answers?
                    </div>
                    <p className="text-xs text-[#7A9A93] leading-relaxed">
                      Explore our FAQ on curriculum coverage, handwriting OCR, and API security.
                    </p>
                  </div>
                  <a
                    href="/#faq-section"
                    className="p-3 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#E05A38] border border-[#235347] transition-all hover:scale-110 shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. INSTITUTIONAL PARTNERSHIPS
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl p-8 sm:p-14 lg:p-16">
            {/* Partnership-specific image layered on top of fixed campus bg */}
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <Image
                src="/images/contact/partnership-bg.jpg"
                alt="Institutional Academic Partnership"
                fill
                className="object-cover object-center opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#05070A]/96 via-[#0C0E12]/92 to-[#0C0E12]/78 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#18453A]/80 text-emerald-300 border border-[#235347] backdrop-blur-md">
                <GraduationCap className="w-4 h-4 text-[#E05A38]" />
                Institutional Collaboration Tracks
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F8F5EE] leading-tight">
                Empower Your Institution<br className="hidden sm:block" /> with Cognitive AI
              </h2>

              <p className="text-sm sm:text-base text-[#C8D4CE] leading-relaxed">
                We partner with premier K-12 school networks, civil services coaching academies, and educational
                publishers to deliver custom-calibrated AI tutoring models and bilingual answer evaluation pipelines.
              </p>

              {/* Tracks grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  {
                    icon: <Building className="w-4 h-4 text-[#E05A38]" />,
                    title: "Schools & Colleges",
                    desc: "NCERT Socratic tutoring, diagnostic knowledge gap heatmaps, and homework assistance.",
                  },
                  {
                    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
                    title: "Civil Services Centers",
                    desc: "Bilingual UPSC Mains answer copy OCR, rubric scoring, and daily current affairs synthesis.",
                  },
                  {
                    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
                    title: "Publishers & EdTech",
                    desc: "API licensing for atomic curriculum knowledge graphs, question synthesis, and assessment engines.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1.5">
                    <div className="font-bold text-sm text-[#F8F5EE] flex items-center gap-1.5">
                      {icon}
                      {title}
                    </div>
                    <p className="text-xs text-[#8AA0A0] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${siteConfig.contactEmail}?subject=Institutional%20Partnership%20Inquiry`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E05A38] hover:bg-[#F06E4D] text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
                >
                  Request Institutional Walkthrough
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#F8F5EE] border border-white/20 font-semibold text-sm backdrop-blur-md transition-all"
                >
                  Explore Product Specifications
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  );
}
