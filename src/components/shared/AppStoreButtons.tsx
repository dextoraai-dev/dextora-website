"use client";

import React from "react";
import { siteConfig } from "@/config/site";

interface AppStoreButtonsProps {
  className?: string;
  theme?: "dark" | "light";
}

export function AppStoreButtons({ className = "", theme = "dark" }: AppStoreButtonsProps) {
  const iosUrl = siteConfig.appStore?.iosUrl?.trim();
  const androidUrl = siteConfig.appStore?.androidUrl?.trim();

  // If neither URL is provided in src/config/site.ts, render NOTHING.
  if (!iosUrl && !androidUrl) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Apple App Store */}
      {iosUrl && (
        <a
          href={iosUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Dextora on the Apple App Store"
          className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105 ${
            isDark
              ? "bg-[#0A1D17] border-[#1C473C] text-[#F8F5EE] hover:bg-[#12362C]"
              : "bg-black text-white border-black/20 hover:bg-zinc-900"
          }`}
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.66-.9 2.69 1 .08 2.02-.51 2.58-1.18z" />
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider opacity-75 leading-none">
              Download on the
            </span>
            <span className="text-xs font-bold leading-tight mt-0.5">App Store</span>
          </div>
        </a>
      )}

      {/* Google Play Store */}
      {androidUrl && (
        <a
          href={androidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get Dextora on Google Play"
          className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 hover:scale-105 ${
            isDark
              ? "bg-[#0A1D17] border-[#1C473C] text-[#F8F5EE] hover:bg-[#12362C]"
              : "bg-black text-white border-black/20 hover:bg-zinc-900"
          }`}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M3.609 1.814L13.793 12 3.61 22.186a1.5 1.5 0 0 1-.61-.926V2.74c.002-.36.223-.715.609-.926zm11.605 11.607l2.25 2.25-11.89 6.844 9.64-9.094zm0-2.842L5.574 1.485l11.89 6.844-2.25 2.25zm1.414 1.414l3.197 1.838a1.5 1.5 0 0 1 0 2.583l-3.197 1.838-1.92-1.92 1.92-1.92z" />
          </svg>
          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase tracking-wider opacity-75 leading-none">
              Get it on
            </span>
            <span className="text-xs font-bold leading-tight mt-0.5">Google Play</span>
          </div>
        </a>
      )}
    </div>
  );
}
