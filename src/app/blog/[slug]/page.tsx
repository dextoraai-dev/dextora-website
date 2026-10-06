import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { generateBlogPostingSchema } from "@/lib/seo";
import { Badge } from "@/components/shared/Badge";
import {
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} — Dextora AI Research`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogSchema = generateBlogPostingSchema(post);
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      {/* BlogPosting JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand-terracotta)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-6 pb-10 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <Badge variant="terracotta">{post.category}</Badge>
            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
            <span className="text-xs text-[var(--text-muted)]">•</span>
            <span className="text-xs text-[var(--text-muted)]">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-[var(--text-secondary)] leading-relaxed italic">
            &quot;{post.excerpt}&quot;
          </p>

          {/* Author Card */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--border-subtle)]"
              />
              <div>
                <div className="font-bold text-sm text-[var(--text-primary)]">
                  {post.author.name}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[var(--text-muted)]">Dextora Research</span>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="py-12 space-y-6 text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 pb-10 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[var(--text-muted)] mr-2">Tags:</span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)] font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[var(--border-subtle)] space-y-6">
            <h3 className="text-xl font-serif font-bold text-[var(--text-primary)]">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="p-6 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] hover:border-[var(--brand-terracotta)]/40 transition-all space-y-2 group"
                >
                  <span className="text-[11px] font-semibold text-[var(--brand-terracotta)]">
                    {related.category}
                  </span>
                  <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
