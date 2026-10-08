"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "inline" | "stacked" | "card";
  className?: string;
}

export function NewsletterForm({ variant = "inline", className }: NewsletterFormProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _gotcha: honeypot }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Success! You have been subscribed to Dextora research briefings.");
        setEmail("");
        trackEvent("newsletter_subscribed", { variant });
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className={className}>
      {status === "success" ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="_gotcha"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div
            className={`flex ${variant === "stacked" ? "flex-col" : "flex-col sm:flex-row"
              } gap-2.5`}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.cta.emailPlaceholder}
              disabled={status === "submitting"}
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#1A202C] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0E2922] dark:bg-[#14352D] text-[#F8F5EE] hover:bg-[#19463A] text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow disabled:opacity-60 cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{t.cta.subscribeButton}</span>
                  <ArrowRight className="w-4 h-4 text-[#E05A38]" />
                </>
              )}
            </button>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <p className="text-[11px] text-[var(--text-muted)]">
            We value privacy. Zero spam. Unsubscribe anytime with one click.
          </p>
        </form>
      )}
    </div>
  );
}
