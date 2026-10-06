import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/shared/Badge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ArrowRight, Clock, BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Research Dispatches — Dextora AI",
  description:
    "Explore the latest research, engineering deep dives, and pedagogical analyses on Socratic AI, UPSC evaluation, and bilingual learning in India.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <Badge variant="terracotta">Research & Engineering</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Dextora Dispatches & Insights
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Perspectives on pedagogical AI architecture, UPSC evaluation benchmarks, Indic language
            NLP, and cognitive learning models.
          </p>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="mb-16">
            <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--brand-terracotta)]/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <Badge variant="terracotta">Featured Dispatch</Badge>
                  <span className="text-xs text-[var(--brand-terracotta)] font-semibold">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--text-primary)] hover:text-[var(--brand-terracotta)] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">
                        {formatDate(featuredPost.publishedAt)}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] text-xs font-semibold shadow transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E05A38]" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Topics Explored
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] pt-2 italic">
                    Published by the Dextora AI Pedagogy Research Team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="p-8 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-full font-semibold bg-[var(--bg-subtle)] text-[var(--brand-terracotta)]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] hover:text-[var(--brand-terracotta)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
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
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--brand-terracotta)] hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
