"use client";

import { useState } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { ALL_SERVICES_FOR_FORM } from "@/lib/constants";
import { TIMEFRAME_OPTIONS, BUDGET_OPTIONS } from "@/lib/lead-schema";

const SOURCE_OPTIONS = ["Phone Call", "Referral", "Walk-in", "Other"] as const;

interface AddLeadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AddLeadModal({ onClose, onSuccess }: AddLeadModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email") || "",
      service: fd.get("service"),
      cityOrZip: fd.get("cityOrZip"),
      timeframe: fd.get("timeframe"),
      budget: fd.get("budget") || "",
      description: fd.get("description"),
      source: fd.get("source") || "manual:phone_call",
    };

    try {
      const res = await fetch("/api/leads/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add lead");
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Lead Manually</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ml-name" className={labelClass}>Name *</label>
              <input id="ml-name" name="name" required minLength={2} className={inputClass} placeholder="John Smith" />
            </div>
            <div>
              <label htmlFor="ml-phone" className={labelClass}>Phone *</label>
              <input id="ml-phone" name="phone" type="tel" required minLength={10} className={inputClass} placeholder="(410) 555-1234" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="ml-email" className={labelClass}>Email (optional)</label>
            <input id="ml-email" name="email" type="email" className={inputClass} placeholder="john@example.com" />
          </div>

          {/* Service & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ml-service" className={labelClass}>Service *</label>
              <select id="ml-service" name="service" required className={inputClass}>
                <option value="">Select service...</option>
                {ALL_SERVICES_FOR_FORM.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ml-source" className={labelClass}>Source</label>
              <select id="ml-source" name="source" defaultValue="manual:phone_call" className={inputClass}>
                {SOURCE_OPTIONS.map((s) => (
                  <option key={s} value={`manual:${s.toLowerCase().replace(/\s+/g, "_")}`}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* City/Zip */}
          <div>
            <label htmlFor="ml-city" className={labelClass}>City or Zip *</label>
            <input id="ml-city" name="cityOrZip" required minLength={2} className={inputClass} placeholder="Baltimore" />
          </div>

          {/* Timeframe & Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ml-timeframe" className={labelClass}>Timeframe *</label>
              <select id="ml-timeframe" name="timeframe" required className={inputClass}>
                <option value="">Select timeframe...</option>
                {TIMEFRAME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="ml-budget" className={labelClass}>Budget (optional)</label>
              <select id="ml-budget" name="budget" className={inputClass}>
                <option value="">Select budget...</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="ml-desc" className={labelClass}>Description / Notes *</label>
            <textarea
              id="ml-desc"
              name="description"
              required
              minLength={10}
              rows={3}
              className={`${inputClass} h-auto`}
              placeholder="Describe the project or conversation details..."
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {submitting ? "Adding..." : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
