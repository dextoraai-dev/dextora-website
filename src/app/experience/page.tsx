import React from "react";
import type { Metadata } from "next";
import { ScrollWorld } from "@/components/experience/ScrollWorld";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Experience Dextora — Continuous Fly-Through Cinematic World",
  description:
    "Take a seamless 3D scroll-scrubbed camera flight through Dextora's pedagogical AI ecosystem — from K-12 chapter mastery to UPSC Mains evaluation and intelligent CRM workflows.",
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
  openGraph: {
    title: "Experience Dextora — The Cinematic World of Pedagogical AI",
    description:
      "A seamless scroll-driven journey through India's leading AI EdTech hub. Explore Dextora Learn, Dhyeya IAS, and Dextora CRM in one continuous flight.",
    url: `${siteConfig.url}/experience`,
    images: [
      {
        url: "/experience/hub.webp",
        width: 1280,
        height: 720,
        alt: "Dextora Cinematic World — Observatory Hub",
      },
    ],
  },
};

export default function ExperiencePage() {
  return (
    <div className="w-full min-h-screen bg-[var(--bg-base)]">
      <ScrollWorld />
    </div>
  );
}
