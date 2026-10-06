"use client";

import React, { useState } from "react";
import { JobPosition, jobPositions } from "@/data/careers";
import { trackEvent } from "@/lib/analytics";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Briefcase,
  FileText,
  Link2,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface CareerApplicationFormProps {
  initialRole?: JobPosition | null;
  onSuccess?: () => void;
}

export function CareerApplicationForm({
  initialRole,
  onSuccess,
}: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleId: initialRole ? initialRole.id : "general-application",
    roleTitle: initialRole ? initialRole.title : "General Engineering & Research Application",
    linkedinUrl: "",
    portfolioUrl: "",
    resumeLink: "",
    coverNote: "",
    _gotcha: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "roleId") {
      const selected = jobPositions.find((j) => j.id === value);
      setFormData((prev) => ({
        ...prev,
        roleId: value,
        roleTitle: selected ? selected.title : "General Engineering & Research Application",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        trackEvent("careers_application_submitted", {
          roleId: formData.roleId,
          roleTitle: formData.roleTitle,
        });
        if (onSuccess) onSuccess();
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Application submission failed. Please check the inputs.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-200">
          Application Submitted!
        </h3>
        <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
          Thank you for applying to Dextora. Our engineering and talent leadership team reviews all
          applications within 48 hours.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({
              fullName: "",
              email: "",
              phone: "",
              roleId: "general-application",
              roleTitle: "General Engineering & Research Application",
              linkedinUrl: "",
              portfolioUrl: "",
              resumeLink: "",
              coverNote: "",
              _gotcha: "",
            });
          }}
          className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* Position Selection */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
          <span>Select Position *</span>
        </label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)] cursor-pointer"
        >
          <option value="general-application">
            General Application (Engineering, AI Research, Pedagogy)
          </option>
          {jobPositions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.title} ({pos.department} • {pos.location})
            </option>
          ))}
        </select>
      </div>

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
            placeholder="e.g. Sanya Iyer"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
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
            placeholder="sanya@domain.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Phone Number *</span>
          </label>
          <input
            type="tel"
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 00000"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>

        {/* Resume URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>Resume Link (Drive/Dropbox/Notion) *</span>
          </label>
          <input
            type="url"
            required
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            placeholder="https://drive.google.com/..."
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LinkedIn URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>LinkedIn Profile URL</span>
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>

        {/* Portfolio / GitHub URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-[var(--brand-terracotta)]" />
            <span>GitHub / Portfolio URL</span>
          </label>
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
          />
        </div>
      </div>

      {/* Cover Note */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[var(--text-primary)]">
          Why do you want to build pedagogical AI with Dextora? *
        </label>
        <textarea
          required
          rows={4}
          name="coverNote"
          value={formData.coverNote}
          onChange={handleChange}
          placeholder="Tell us about what you've built, your interest in Indian EdTech/AI, and what problems excite you..."
          className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)]"
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
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0E2922] text-[#F8F5EE] hover:bg-[#18453A] font-semibold text-sm shadow transition-all disabled:opacity-60 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <span>Submit Application</span>
            <Send className="w-4 h-4 text-[#E05A38]" />
          </>
        )}
      </button>
    </form>
  );
}
