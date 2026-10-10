"use client";

import React from "react";
import { sharedSubdomainBarConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import { Sparkles, ExternalLink } from "lucide-react";

export function DextoraBar() {
  const { t } = useI18n();

  return (
    <div className="bg-[#0E2922] text-[#E2DBD0] text-xs py-1.5 px-4 sm:px-6 border-b border-[#1A3F35] relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#E05A38] text-white">
            <Sparkles className="w-2.5 h-2.5" />
          </span>
          <span className="font-medium tracking-tight text-cream">
            {t.nav.partOfDextora}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[11px]">
          {sharedSubdomainBarConfig.siblingProducts.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith("http") ? "_blank" : "_self"}
              rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-white transition-colors flex items-center gap-1 opacity-85 hover:opacity-100"
            >
              <span>{item.name}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 text-[9px] rounded bg-[#1A3F35] text-[#D97706] font-semibold">
                  {item.badge}
                </span>
              )}
              {item.url.startsWith("http") && <ExternalLink className="w-2.5 h-2.5 opacity-70" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
