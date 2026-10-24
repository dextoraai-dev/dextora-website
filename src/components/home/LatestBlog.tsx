"use client";

import React from "react";
import Link from "next/link";
import { getLatestBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/shared/ScrollAnimation";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function LatestBlog() {
  const posts = getLatestBlogPosts(3);

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-t border-[var(--border-subtle)] transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <FadeInUp className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            align="left"
            badge="AI & Pedagogy Dispatches"
            badgeVariant="terracotta"
            title="Latest Research & Engineering Insights"
            subtitle="Deep dives into cognitive modeling, handwriting OCR, and bilingual education architecture."
            className="max-w-2xl"
          />

          <motion.div whileHover={{ x: 4 }} className="shrink-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-terracotta)] hover:underline"
            >
              <span>View all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </FadeInUp>

        {/* Staggered Animated Blog Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem
              key={post.slug}
              className="h-full"
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
            >
              <article className="group h-full rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
                {/* Subtle Hover Gradient Glow */}
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-28 h-28 rounded-full bg-[var(--brand-terracotta)]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-full font-semibold text-[11px] bg-[var(--bg-subtle)] text-[var(--brand-terracotta)] border border-[var(--border-subtle)]">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--text-muted)] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-[var(--border-subtle)]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[var(--text-primary)]">
                        {post.author.name}
                      </div>
                      <div className="text-[10px] text-[var(--text-muted)]">
                        {formatDate(post.publishedAt)}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read article: ${post.title}`}
                    className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] group-hover:bg-[#E05A38] group-hover:text-white transition-all duration-200 group-hover:scale-110 shadow-xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
