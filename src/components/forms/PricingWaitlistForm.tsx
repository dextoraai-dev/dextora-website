"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function PricingWaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Dextora Learn (K-12)");
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
        body: JSON.stringify({
          email,
          name,
          interest,
          source: "pricing-waitlist",
          _gotcha: honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You are on the priority waitlist! We will notify you as soon as your cohort opens.");
        setName("");
        setEmail("");
        trackEvent("pricing_waitlist_joined", { interest });
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to join waitlist. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("A network error occurred. Please try again later.");
    }
  };

  return (
    <div className="rounded-2xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] p-6 sm:p-8 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[var(--brand-terracotta)]" />
        <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
          Join Early Access Queue
        </h3>
      </div>

      {status === "success" ? (
        <div className="space-y-4 py-4 animate-in fade-in">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Priority Reservation Confirmed</p>
              <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-300/90 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs text-[var(--brand-terracotta)] font-semibold hover:underline"
          >
            Register another learner or team member →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field for bot spam prevention */}
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

          <div>
            <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aditi Sharma"
              disabled={status === "submitting"}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              disabled={status === "submitting"}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
              Product of Primary Interest
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              disabled={status === "submitting"}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
            >
              <option value="Dextora Learn (K-12)">Dextora Learn (K-12 & CBSE)</option>
              <option value="Dhyeya IAS (Civil Services)">Dhyeya IAS (UPSC / State PSC)</option>
              <option value="School & Campus Deployment">School & Campus Institutional Deployment</option>
              <option value="Dextora CRM (WhatsApp Cloud API)">Dextora CRM (Sales & WhatsApp Cloud API)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-3 px-5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#153D33] text-sm font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Securing Priority Spot...</span>
              </>
            ) : (
              <>
                <span>Join Priority Waitlist</span>
                <ArrowRight className="w-4 h-4 text-[#E05A38]" />
              </>
            )}
          </button>

          {status === "error" && (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 mt-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            No payment required today. We respect student and faculty privacy under the DPDP Act.
          </p>
        </form>
      )}
    </div>
  );
}
