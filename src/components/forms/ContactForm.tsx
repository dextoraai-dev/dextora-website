"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Mail,
  User,
  Phone,
  MessageSquare,
} from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    inquiryType: "institutional-partnership",
    message: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        trackEvent("contact_form_submitted", {
          inquiryType: formData.inquiryType,
          hasOrg: Boolean(formData.organization),
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          organization: "",
          inquiryType: "institutional-partnership",
          message: "",
          _gotcha: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Submission failed. Please check the fields and try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network connection error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Message Received
        </h3>
        <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
          Thank you for reaching out to Dextora. Our academic & partnerships team will review your
          inquiry and respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field */}
      <input
        type="text"
        name="_gotcha"
        value={formData._gotcha}
        onChange={handleChange}
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Dr. Rajesh Sharma"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Email Address *</span>
          </label>
          <input
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. rajesh@vidya-academy.org"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>

        {/* Organization / School */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>School / Institute / Org</span>
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            placeholder="e.g. Delhi Public School / UPSC Forum"
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[var(--text-primary)]">
          Inquiry Purpose *
        </label>
        <select
          name="inquiryType"
          value={formData.inquiryType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)] cursor-pointer"
        >
          <option value="institutional-partnership">
            Institutional Partnership & Campus AI Sandbox
          </option>
          <option value="dextora-learn">Dextora Learn (Academic Inquiries)</option>
          <option value="dhyeya-ias">Dhyeya IAS (UPSC / Civil Services Collaboration)</option>
          <option value="careers">Careers & Research Fellowships</option>
          <option value="press-media">Press, Media & Academic Research</option>
          <option value="general">General Corporate Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
          <span>How can we help you? *</span>
        </label>
        <textarea
          required
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please share details about your requirement, student cohort size, or specific questions..."
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs border border-rose-200 dark:border-rose-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow-md transition-all hover:shadow-lg disabled:opacity-60 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send className="w-4 h-4 text-[#E05A38]" />
          </>
        )}
      </button>
    </form>
  );
}
