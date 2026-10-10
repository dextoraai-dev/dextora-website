"use client";

import React, { useState, useEffect } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { Play, X } from "lucide-react";

interface VideoModalProps {
  srcName: string;
  title: string;
  poster: string;
  captionSrc?: string;
  triggerText?: string;
}

export function VideoModal({
  srcName,
  title,
  poster,
  captionSrc,
  triggerText = "Watch the Story (35s)",
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      >
        <span className="p-1.5 rounded-lg bg-[var(--brand-terracotta)]/15 text-[var(--brand-terracotta)]">
          <Play className="w-4 h-4 fill-[var(--brand-terracotta)]" />
        </span>
        <span>{triggerText}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-[#0B0E14] border border-white/10 shadow-2xl p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close video player"
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <VideoPlayer
              srcName={srcName}
              title={title}
              poster={poster}
              captionSrc={captionSrc}
              mode="interactive"
              aspectRatio="16/9"
            />
          </div>
        </div>
      )}
    </>
  );
}
