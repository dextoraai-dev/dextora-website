"use client";

import React, { useState } from "react";
import { faqs, FAQItem } from "@/data/faq";
import { generateFAQSchema } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0].id, faqs[1].id]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((item) => item.category === selectedCategory);

  const faqSchema = generateFAQSchema(faqs);

  const categories = [
    { key: "all", label: "All Questions" },
    { key: "general", label: "General & Ecosystem" },
    { key: "products", label: "Products & Features" },
    { key: "pedagogy", label: "AI & Pedagogy" },
    { key: "security", label: "Privacy & Data" },
  ];

  return (
    <section id="faq-section" className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-t border-[var(--border-subtle)] transition-colors">
      {/* FAQ Schema for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Frequently Asked Questions"
          badgeVariant="terracotta"
          title="Everything You Need to Know About Dextora"
          subtitle="Answers about our AI models, syllabus coverage, evaluation engines, and school partnerships."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#0E2922] text-[#F8F5EE] shadow-sm"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--brand-terracotta)]" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0E2922] text-[#F8F5EE]">
              <MessageSquare className="w-5 h-5 text-[#E05A38]" />
            </div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                Have a specific question not listed here?
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                Our educational support team is ready to assist you.
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#0E2922] hover:text-[#F8F5EE] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors"
          >
            Contact Support Team
          </Link>
        </div>
      </div>
    </section>
  );
}
