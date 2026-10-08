import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "@/data/products";
import { generateProductSchema } from "@/lib/seo";
import { Badge } from "@/components/shared/Badge";
import {
  GraduationCap,
  ShieldAlert,
  Building2,
  Sparkles,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Users,
  BrainCircuit,
  MessageSquareCode,
  TrendingUp,
  Languages,
  Tags,
  FileCheck,
  Globe,
  FileSpreadsheet,
  BarChart3,
  Lock,
  ArrowLeft,
} from "lucide-react";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const ogImage = product.image ? product.image.src : "/images/generated/og-image.png";

  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Dextora AI`,
      description: product.description,
      url: `/products/${product.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: product.image?.alt || `${product.name} by Dextora AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Dextora AI`,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "BrainCircuit":
        return <BrainCircuit className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "MessageSquareCode":
        return <MessageSquareCode className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Languages":
        return <Languages className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "Tags":
        return <Tags className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "FileCheck":
        return <FileCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "CheckCircle2":
        return <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case "Lock":
        return <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--brand-terracotta)]" />;
    }
  };

  const isLive = product.status === "live";

  return (
    <div className="py-12 sm:py-20 bg-[var(--bg-base)]">
      {/* Product JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand-terracotta)] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all products</span>
        </Link>

        {/* Hero Banner with Product Image */}
        <div className="rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-8 sm:p-10 lg:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                {isLive ? (
                  <Badge variant="emerald">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-1" />
                    Live Platform
                  </Badge>
                ) : (
                  <Badge variant="indigo">In Active Development</Badge>
                )}
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  Launch Year: {product.launchYear}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
                {product.name}
              </h1>

              <p className="text-lg sm:text-xl text-[var(--brand-terracotta)] font-medium font-serif italic">
                &quot;{product.tagline}&quot;
              </p>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {product.longDescription}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {isLive ? (
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-bold text-sm shadow-md transition-all hover:scale-105"
                  >
                    <span>Launch {product.name}</span>
                    <ExternalLink className="w-4 h-4 text-[#E05A38]" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-bold text-sm shadow-md transition-all"
                  >
                    <span>Request Institutional Beta Access</span>
                    <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                  </Link>
                )}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-surface)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-colors"
                >
                  <span>Inquire for Institution</span>
                </Link>
              </div>
            </div>

            {/* Product Hero Image / Fallback */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-strong)] shadow-lg">
                {product.image ? (
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className={`w-full h-full ${product.accentBg} flex flex-col items-center justify-center text-center p-8 space-y-3`}>
                    <div className="p-4 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] shadow-sm border border-[var(--border-subtle)]">
                      <Sparkles className="w-8 h-8 text-[var(--brand-terracotta)]" />
                    </div>
                    <span className="text-sm font-semibold text-[var(--text-muted)]">
                      Interface in Active Development
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {product.stats.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-center space-y-1 shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)]">
                {st.value}
              </div>
              <div className="text-xs text-[var(--text-muted)] font-medium">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Deep Capabilities Grid */}
        <div className="mb-16">
          <div className="max-w-2xl mb-10">
            <Badge variant="terracotta" className="mb-2">
              Feature Deep Dive
            </Badge>
            <h2 className="text-3xl font-bold text-[var(--text-primary)]">
              Core Capabilities & Pedagogical Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.deepFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] space-y-4 hover:shadow-md transition-all"
              >
                <div className="p-3 w-fit rounded-xl bg-[var(--bg-subtle)]">
                  {getFeatureIcon(feat.iconName)}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Audience & Target Users */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--bg-surface-elevated)] dark:bg-[#11141B] border border-[var(--border-subtle)] mb-16">
          <div className="max-w-2xl mb-8">
            <Badge variant="amber" className="mb-2">
              Audience Alignment
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Who is {product.name} Built For?
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {product.audience}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.targetUsers.map((user, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-terracotta)] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  {user}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA for this Product */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0E2922] text-[#F8F5EE] text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold">
            Ready to get started with {product.name}?
          </h2>
          <p className="text-sm text-[#A3B8B2] max-w-xl mx-auto">
            Experience our AI-powered learning environment today or schedule a tailored institutional
            walkthrough with our product specialists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {isLive ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all hover:scale-105"
              >
                <span>Launch {product.name}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#E05A38] text-white hover:bg-[#F06E4D] font-bold text-sm shadow-md transition-all"
              >
                <span>Contact for Beta Access</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14352D] hover:bg-[#1C473C] text-[#F8F5EE] text-sm font-semibold border border-[#235347] transition-colors"
            >
              <span>Explore Other Products</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
