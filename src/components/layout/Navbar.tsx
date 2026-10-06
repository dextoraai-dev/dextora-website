"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { products } from "@/data/products";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import {
  GraduationCap,
  ShieldAlert,
  Building2,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus on route change
  useEffect(() => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll detection for navbar shadow/border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-[var(--brand-terracotta)]" />;
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-base)]/90 dark:bg-[#0C0E12]/90 backdrop-blur-md shadow-sm border-b border-[var(--border-subtle)]"
          : "bg-[var(--bg-base)] dark:bg-[#0C0E12] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-terracotta)] rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0E2922] flex items-center justify-center p-2 shadow-sm border border-[#1E443A] group-hover:scale-105 transition-transform duration-200">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <path
                    d="M20 5L33 12V25C33 32 20 37 20 37C20 37 7 32 7 25V12L20 5Z"
                    stroke="#E05A38"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="20" cy="20" r="4" fill="#F8F5EE" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-none">
                  Dextora
                </span>
                <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase font-semibold mt-0.5">
                  AI EdTech Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Products Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProductsOpen(!productsOpen)}
                onMouseEnter={() => setProductsOpen(true)}
                aria-expanded={productsOpen}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/products")
                    ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                }`}
              >
                <span>{t.nav.products}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    productsOpen ? "rotate-180 text-[var(--brand-terracotta)]" : ""
                  }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {productsOpen && (
                <div
                  onMouseLeave={() => setProductsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-[440px] rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                      Dextora Product Suite
                    </span>
                    <Link
                      href="/products"
                      className="text-xs font-medium text-[var(--brand-terracotta)] hover:underline flex items-center gap-1"
                    >
                      View all <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-1">
                    {products.map((p) => (
                      <div
                        key={p.slug}
                        className="group p-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${p.accentBg} shrink-0 mt-0.5`}>
                            {getProductIcon(p.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <Link
                                href={`/products/${p.slug}`}
                                className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-[var(--brand-terracotta)] transition-colors truncate"
                              >
                                {p.name}
                              </Link>
                              {p.status === "live" ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                                  Live
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300">
                                  Soon
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                              {p.oneLiner}
                            </p>
                            <div className="mt-1.5 flex items-center gap-3 text-[11px]">
                              <Link
                                href={`/products/${p.slug}`}
                                className="text-[var(--text-muted)] hover:text-[var(--brand-terracotta)] font-medium"
                              >
                                Overview
                              </Link>
                              {p.status === "live" && (
                                <a
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[var(--brand-terracotta)] hover:underline flex items-center gap-0.5 font-medium"
                                >
                                  <span>Launch</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            <Link
              href="/about"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/vision"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/vision"
                  ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {t.nav.vision}
            </Link>
            <Link
              href="/blog"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/blog")
                  ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {t.nav.blog}
            </Link>
            <Link
              href="/careers"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/careers"
                  ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {t.nav.careers}
            </Link>
            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-[var(--brand-terracotta)] font-semibold bg-[var(--bg-subtle)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
              }`}
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right Action Icons & Primary CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#153D33] text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#0E2922]"
            >
              <span>{t.nav.exploreProducts}</span>
              <ArrowRight className="w-4 h-4 text-[#E05A38]" />
            </Link>
          </div>

          {/* Mobile Menu Button & Toggles */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] dark:bg-[#141720] px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="py-2">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-2 px-2">
              Products
            </span>
            <div className="space-y-1">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-subtle)]"
                >
                  <div className="flex items-center gap-2.5">
                    {getProductIcon(p.icon)}
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {p.name}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)]">{p.tagline}</div>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--brand-terracotta)] font-semibold">
                    {p.status === "live" ? "Live" : "Soon"}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border-subtle)] pt-3 space-y-1">
            <Link
              href="/products"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              All Products Directory
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {t.nav.about}
            </Link>
            <Link
              href="/vision"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {t.nav.vision}
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {t.nav.blog}
            </Link>
            <Link
              href="/careers"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {t.nav.careers}
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-[var(--bg-subtle)] text-[var(--text-primary)]"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0E2922] text-[#F8F5EE] text-sm font-semibold shadow"
            >
              <span>{t.nav.exploreProducts}</span>
              <ArrowRight className="w-4 h-4 text-[#E05A38]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
