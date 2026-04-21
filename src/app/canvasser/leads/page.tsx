"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Calendar, Camera, Loader2, Phone, RefreshCw, Users } from "lucide-react";

type Status =
  | "new"
  | "contacted"
  | "qualified"
  | "quoted"
  | "scheduled"
  | "completed"
  | "lost"
  | "re_engaged"
  | "chatbot_qualified";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  city_or_zip: string;
  status: Status;
  score: number;
  appointment_scheduled: boolean;
  appointment_date: string | null;
  photos: string[] | null;
  created_at: string;
};

const STATUS_META: Record<Status, { label: string; color: string }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", color: "bg-indigo-100 text-indigo-700" },
  qualified: { label: "Qualified", color: "bg-teal-100 text-teal-700" },
  quoted: { label: "Quoted", color: "bg-amber-100 text-amber-700" },
  scheduled: { label: "Scheduled", color: "bg-green-100 text-green-700" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700" },
  lost: { label: "Lost", color: "bg-gray-200 text-gray-600" },
  re_engaged: { label: "Re-engaged", color: "bg-purple-100 text-purple-700" },
  chatbot_qualified: { label: "Chatbot", color: "bg-cyan-100 text-cyan-700" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function MyLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchInitial = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/canvasser/leads?limit=50");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads(data.leads ?? []);
      setCursor(data.nextCursor);
      setHasMore(Boolean(data.hasMore));
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await fetch(`/api/canvasser/leads?limit=50&after=${encodeURIComponent(cursor)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLeads((prev) => [...prev, ...(data.leads ?? [])]);
      setCursor(data.nextCursor);
      setHasMore(Boolean(data.hasMore));
    } catch {
      toast.error("Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My leads</h1>
          <p className="text-sm text-gray-500 mt-1">
            Every prospect you&apos;ve submitted, with their latest status.
          </p>
        </div>
        <button
          onClick={fetchInitial}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-orange-600"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="p-10 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
          <Users className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-gray-900">No leads yet</h2>
          <p className="text-sm text-gray-500 mt-1">
            Knock some doors and submit your first lead from the New Lead tab.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{lead.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {lead.service} · {lead.city_or_zip}
                  </p>
                </div>
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${STATUS_META[lead.status].color}`}
                >
                  {STATUS_META[lead.status].label}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-orange-600"
                >
                  <Phone className="h-4 w-4" />
                  {lead.phone}
                </a>
                {lead.appointment_scheduled && lead.appointment_date && (
                  <span className="inline-flex items-center gap-1.5 text-green-700">
                    <Calendar className="h-4 w-4" />
                    Estimate: {formatDateTime(lead.appointment_date)}
                  </span>
                )}
                {lead.photos && lead.photos.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-gray-500">
                    <Camera className="h-4 w-4" />
                    {lead.photos.length} photo{lead.photos.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>

              {lead.photos && lead.photos.length > 0 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {lead.photos.slice(0, 6).map((url) => (
                    <div key={url} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                      <Image src={url} alt="Lead photo" fill sizes="64px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-xs text-gray-400">Submitted {formatDate(lead.created_at)}</p>
            </article>
          ))}

          {hasMore && (
            <div className="pt-2 text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                {loadingMore ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Load more
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
