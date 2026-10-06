"use client";

import React from "react";
import Link from "next/link";
import { getLatestBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRight, Clock, User, Sparkles } from "lucide-react";

export function LatestBlog() {
  const posts = getLatestBlogPosts(3);

  return (
    <section className="py-20 sm:py-28 bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border-t border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <SectionHeading
            align="left"
            badge="AI & Pedagogy Dispatches"
            badgeVariant="terracotta"
            title="Latest Research & Engineering Insights"
            subtitle="Deep dives into cognitive modeling, handwriting OCR, and bilingual education architecture."
            className="max-w-2xl"
          />

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-terracotta)] hover:underline shrink-0"
          >
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-[11px] bg-[var(--bg-subtle)] text-[var(--brand-terracotta)]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
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

              <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
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
                  className="p-2 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-primary)] group-hover:bg-[#0E2922] group-hover:text-white transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
