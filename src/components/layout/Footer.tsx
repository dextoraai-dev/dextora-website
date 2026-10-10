"use client";

import React, { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import {
  ArrowRight,
  ExternalLink,
  Send,
} from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _gotcha: "" }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! You're subscribed to Dextora research briefings.");
        setEmail("");
        trackEvent("newsletter_subscribed", { location: "footer" });
      } else {
        setStatus("error");
        setMessage("Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <footer className="bg-[#0E2922] text-[#E2DBD0] border-t border-[#184035] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1A3F35]">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#091D18] flex items-center justify-center p-2 border border-[#1E443A]">
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
              <span className="font-serif text-2xl font-bold text-[#F8F5EE] tracking-tight">
                Dextora
              </span>
            </Link>

            <p className="text-sm text-[#A3B8B2] leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            {/* Newsletter Mini Box */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#F8F5EE] uppercase tracking-wider block mb-2">
                Subscribe to Research Updates
              </span>
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="flex-1 px-3.5 py-2 text-xs rounded-lg bg-[#14352D] text-[#F8F5EE] border border-[#235347] placeholder-[#6E8E85] focus:outline-none focus:border-[#E05A38]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-3 py-2 bg-[#E05A38] text-white rounded-lg text-xs font-semibold hover:bg-[#F06E4D] transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                >
                  {status === "loading" ? "..." : "Join"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
              {message && (
                <p
                  className={`text-[11px] mt-1.5 ${status === "success" ? "text-emerald-400" : "text-amber-400"
                    }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Products Column (Single Source of Truth) */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8F5EE]">
              {t.footer.productsTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B8B2]">
              {products.map((p) => (
                <li key={p.slug}>
                  {p.status === "live" ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {p.name}
                      </span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </a>
                  ) : (
                    <Link
                      href={`/products/${p.slug}`}
                      className="hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1A3F35] text-[#D97706]">
                        Soon
                      </span>
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-xs text-[#E05A38] hover:underline font-semibold flex items-center gap-1 pt-1"
                >
                  All Products Overview <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8F5EE]">
              {t.footer.companyTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B8B2]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Dextora
                </Link>
              </li>
              <li>
                <Link href="/vision" className="hover:text-white transition-colors">
                  Vision & AI Philosophy
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Research & Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Careers</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-900/80 text-emerald-300 font-semibold">
                    We&apos;re hiring
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#F8F5EE]">
              {t.footer.legalTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#A3B8B2]">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#7A9991]">
                  AI Safety & Student Data Compliance (DPDP Act)
                </span>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>All Systems Operational</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A9991]">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. {t.footer.rightsReserved}
          </p>

          <p className="italic text-[#92AEA7]">
            {t.footer.builtWithPride}
          </p>

          <div className="flex items-center gap-3">
            {/* Twitter / X */}
            <a
              href={siteConfig.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dextora on Twitter"
              className="p-1.5 rounded-lg bg-[#14352D] text-[#A3B8B2] hover:text-white hover:bg-[#1C473C] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dextora on LinkedIn"
              className="p-1.5 rounded-lg bg-[#14352D] text-[#A3B8B2] hover:text-white hover:bg-[#1C473C] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dextora on YouTube"
              className="p-1.5 rounded-lg bg-[#14352D] text-[#A3B8B2] hover:text-white hover:bg-[#1C473C] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            {/* Telegram */}
            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dextora on Telegram"
              className="p-1.5 rounded-lg bg-[#14352D] text-[#A3B8B2] hover:text-white hover:bg-[#1C473C] transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>
            {/* GitHub */}
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dextora on GitHub"
              className="p-1.5 rounded-lg bg-[#14352D] text-[#A3B8B2] hover:text-white hover:bg-[#1C473C] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
