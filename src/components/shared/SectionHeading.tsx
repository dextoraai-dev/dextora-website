import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "default" | "emerald" | "amber" | "indigo" | "terracotta";
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  badge,
  badgeVariant = "terracotta",
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
