"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
  type View,
  type SlotInfo,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";

export interface CalendarLead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  service: string;
  city_or_zip: string;
  status: string;
  appointment_date: string;
  appointment_notes: string | null;
  canvasser_name: string | null;
}

type CalEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: CalendarLead;
};

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  events: CalendarLead[];
  onSelectEvent: (lead: CalendarLead) => void;
  onSelectSlot: (start: Date) => void;
  onRangeChange: (range: { start: Date; end: Date }) => void;
}

export function CalendarView({
  events,
  onSelectEvent,
  onSelectSlot,
  onRangeChange,
}: CalendarViewProps) {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState<Date>(new Date());

  const calEvents: CalEvent[] = useMemo(
    () =>
      events.map((l) => {
        const start = new Date(l.appointment_date);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // 1h default
        return {
          id: l.id,
          title: `${l.name} — ${l.service}`,
          start,
          end,
          resource: l,
        };
      }),
    [events]
  );

  const handleRangeChange = useCallback(
    (range: Date[] | { start: Date; end: Date }) => {
      if (Array.isArray(range)) {
        if (range.length === 0) return;
        const start = range[0];
        const end = range[range.length - 1];
        onRangeChange({ start, end });
      } else {
        onRangeChange(range);
      }
    },
    [onRangeChange]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 md:p-4">
      <div className="h-[72vh]">
        <BigCalendar<CalEvent>
          localizer={localizer}
          events={calEvents}
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          selectable
          onSelectEvent={(evt) => onSelectEvent(evt.resource)}
          onSelectSlot={(slot: SlotInfo) => onSelectSlot(slot.start)}
          onRangeChange={handleRangeChange}
          popup
          step={30}
          timeslots={2}
          defaultView={Views.WEEK}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
