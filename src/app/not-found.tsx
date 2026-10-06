import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[var(--bg-base)]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-[#0E2922] text-[#E05A38]">
          <span className="font-mono text-3xl font-bold">404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
          Page Not Found
        </h1>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          The concept or destination you are searching for might have moved or is not part of the
          current syllabus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] text-xs font-semibold shadow transition-colors"
          >
            <Home className="w-4 h-4 text-[#E05A38]" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
          >
            <span>Explore Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
