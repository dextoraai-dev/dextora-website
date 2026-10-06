"use client";

import React from "react";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[var(--brand-terracotta)]"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="w-4 h-4 relative">
        <Sun
          className={`w-4 h-4 transition-all duration-300 absolute inset-0 ${
            theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-amber-600"
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-all duration-300 absolute inset-0 ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100 text-indigo-400" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
