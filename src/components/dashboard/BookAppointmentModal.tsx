"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Loader2, Calendar as CalendarIcon, Search } from "lucide-react";

type LeadOption = {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: string;
};

interface BookAppointmentModalProps {
  defaultStart: Date | null;
  prefilledLead?: { id: string; name: string; phone: string; service: string } | null;
  onClose: () => void;
  onSuccess: () => void;
}

function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BookAppointmentModal({
  defaultStart,
  prefilledLead,
  onClose,
  onSuccess,
}: BookAppointmentModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LeadOption[]>([]);
  const [selected, setSelected] = useState<LeadOption | null>(
    prefilledLead
      ? {
          id: prefilledLead.id,
          name: prefilledLead.name,
          phone: prefilledLead.phone,
          service: prefilledLead.service,
          status: "unknown",
        }
      : null
  );
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [when, setWhen] = useState<string>(() =>
    toLocalInputValue(defaultStart ?? new Date(Date.now() + 3600000))
  );

  useEffect(() => {
    if (prefilledLead) return;
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/leads?search=${encodeURIComponent(term)}&limit=10`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) setResults(data.leads ?? []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query, prefilledLead]);

  const headerTitle = useMemo(
    () => (prefilledLead ? "Book Appointment" : "Book Appointment"),
    [prefilledLead]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) {
      setError("Please pick a lead first.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const iso = new Date(when).toISOString();
      const res = await fetch(`/api/leads/${selected.id}/appointment`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_date: iso,
          appointment_notes: notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to book appointment");
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{headerTitle}</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {selected ? (
            <div className="flex items-start justify-between gap-3 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {selected.service} · {selected.phone}
                </p>
              </div>
              {!prefilledLead && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-xs text-gray-500 hover:text-orange-600"
                >
                  Change
                </button>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Find lead</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, phone, or email…"
                  className="w-full pl-10 pr-3 py-2.5 h-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              {query.trim().length >= 2 && (
                <div className="mt-2 border border-gray-200 rounded-md max-h-48 overflow-y-auto divide-y divide-gray-100">
                  {searching && (
                    <div className="p-3 text-sm text-gray-500 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Searching…
                    </div>
                  )}
                  {!searching && results.length === 0 && (
                    <p className="p-3 text-sm text-gray-500">No leads match.</p>
                  )}
                  {results.map((lead) => (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => setSelected(lead)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {lead.service} · {lead.phone} ·{" "}
                        <span className="capitalize">{lead.status}</span>
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & time</label>
            <input
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              required
              className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Access notes, who will be home, etc."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">{error}</p>}

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
              disabled={submitting || !selected}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CalendarIcon className="w-4 h-4" />}
              {submitting ? "Booking…" : "Book appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
