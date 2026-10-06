import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "amber" | "indigo" | "terracotta" | "outline";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  className,
  size = "md",
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-[var(--bg-subtle)] text-[var(--text-secondary)] border-[var(--border-subtle)]",
    emerald:
      "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    amber:
      "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    indigo:
      "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
    terracotta:
      "bg-[#FAF0ED] text-[#C0411F] border-[#F5D5CB] dark:bg-[#2C1712] dark:text-[#FFA085] dark:border-[#52291E]",
    outline:
      "bg-transparent text-[var(--text-secondary)] border-[var(--border-strong)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border tracking-wide transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
