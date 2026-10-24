"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faq";
import { generateFAQSchema } from "@/lib/seo";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { ChevronDown, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIds, setOpenIds] = useState<string[]>([]);
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
    <section id="faq-section" className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-t border-[var(--border-subtle)] transition-colors overflow-hidden">
      {/* FAQ Schema for SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <FadeInUp>
          <SectionHeading
            badge="Frequently Asked Questions"
            badgeVariant="terracotta"
            title="Everything You Need to Know About Dextora"
            subtitle="Answers about our AI models, syllabus coverage, evaluation engines, and school partnerships."
          />
        </FadeInUp>

        {/* Animated Category Filters */}
        <FadeInUp delay={0.15} className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-8">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-[#0E2922] text-[#F8F5EE] shadow-sm font-bold"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </FadeInUp>

        {/* Staggered Animated Accordion */}
        <StaggerContainer className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <StaggerItem
                key={faq.id}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-colors shadow-xs overflow-hidden"
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
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="p-1 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] shrink-0"
                  >
                    <ChevronDown
                      className={`w-4 h-4 ${isOpen ? "text-[var(--brand-terracotta)]" : ""}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Animated Support Banner */}
        <FadeInUp delay={0.2} className="mt-12 p-6 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="flex items-center gap-3.5">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-3 rounded-xl bg-[#0E2922] text-[#F8F5EE] shadow-xs"
            >
              <MessageSquare className="w-5 h-5 text-[#E05A38]" />
            </motion.div>
            <div>
              <div className="font-bold text-sm text-[var(--text-primary)]">
                Have a specific question not listed here?
              </div>
              <div className="text-xs text-[var(--text-secondary)]">
                Our educational support team is ready to assist you.
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[#0E2922] hover:text-[#F8F5EE] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-subtle)] transition-all inline-block"
            >
              Contact Support Team
            </Link>
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  );
}
