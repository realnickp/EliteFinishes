"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Calendar as CalendarIcon, Loader2, Plus, Phone, Mail, MapPin, X } from "lucide-react";
import { CalendarView, type CalendarLead } from "@/components/dashboard/CalendarView";
import { BookAppointmentModal } from "@/components/dashboard/BookAppointmentModal";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
  const [selected, setSelected] = useState<CalendarLead | null>(null);
  const [bookSlot, setBookSlot] = useState<Date | null>(null);
  const [bookLead, setBookLead] = useState<CalendarLead | null>(null);

  const load = useCallback(async (start: Date, end: Date) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/dashboard/calendar?start=${encodeURIComponent(start.toISOString())}&end=${encodeURIComponent(end.toISOString())}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEvents(data.events ?? []);
    } catch {
      toast.error("Failed to load calendar");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the default range on mount (current month ± buffer).
  useEffect(() => {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - 7);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 2);
    setRange({ start, end });
    load(start, end);
  }, [load]);

  const handleRangeChange = useCallback(
    (r: { start: Date; end: Date }) => {
      setRange(r);
      load(r.start, r.end);
    },
    [load]
  );

  const refresh = useCallback(() => {
    if (range) load(range.start, range.end);
  }, [range, load]);

  const selectedIsBooked = useMemo(() => !!selected?.appointment_date, [selected]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Every scheduled estimate. Click a slot to book a new one, or a lead to view details.
          </p>
        </div>
        <button
          onClick={() => {
            setBookLead(null);
            setBookSlot(new Date(Date.now() + 3600000));
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600"
        >
          <Plus className="w-4 h-4" /> Book Estimate
        </button>
      </div>

      {loading && events.length === 0 ? (
        <div className="p-10 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <CalendarView
          events={events}
          onSelectEvent={(lead) => setSelected(lead)}
          onSelectSlot={(start) => {
            setBookLead(null);
            setBookSlot(start);
          }}
          onRangeChange={handleRangeChange}
        />
      )}

      {selected && (
        <div
          className="fixed inset-0 z-40 bg-black/40 flex items-end sm:items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Scheduled Estimate</h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <p className="text-xl font-bold text-gray-900">{selected.name}</p>
                <p className="text-sm text-gray-600">{selected.service}</p>
              </div>

              {selectedIsBooked && (
                <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                  {formatDateTime(selected.appointment_date)}
                </p>
              )}

              <div className="space-y-2 text-sm">
                <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-gray-700 hover:text-orange-600">
                  <Phone className="h-4 w-4 text-gray-400" /> {selected.phone}
                </a>
                {selected.email && (
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-gray-700 hover:text-orange-600">
                    <Mail className="h-4 w-4 text-gray-400" /> {selected.email}
                  </a>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" /> {selected.city_or_zip}
                </div>
                {selected.canvasser_name && (
                  <p className="text-xs text-orange-600">🚪 Canvasser: {selected.canvasser_name}</p>
                )}
                {selected.appointment_notes && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">{selected.appointment_notes}</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Link
                  href={`/dashboard/leads/${selected.id}`}
                  className="flex-1 text-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200"
                >
                  Open lead →
                </Link>
                <button
                  onClick={() => {
                    setBookLead(selected);
                    setBookSlot(new Date(selected.appointment_date));
                    setSelected(null);
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600"
                >
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookSlot && (
        <BookAppointmentModal
          defaultStart={bookSlot}
          prefilledLead={bookLead ? { id: bookLead.id, name: bookLead.name, phone: bookLead.phone, service: bookLead.service } : null}
          onClose={() => {
            setBookSlot(null);
            setBookLead(null);
          }}
          onSuccess={() => {
            setBookSlot(null);
            setBookLead(null);
            toast.success("Appointment booked");
            refresh();
          }}
        />
      )}
    </div>
  );
}
