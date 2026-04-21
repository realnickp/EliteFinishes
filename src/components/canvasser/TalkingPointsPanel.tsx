"use client";

import { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Tag,
  MessageCircle,
  Clock,
  ChevronDown,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { TALKING_POINTS, type TalkingPointSection } from "@/lib/talking-points";

const ICON_MAP: Record<TalkingPointSection["icon"], LucideIcon> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  tag: Tag,
  message: MessageCircle,
  clock: Clock,
};

interface TalkingPointsPanelProps {
  /** When true, only one section is expanded at a time (mobile friendly). */
  accordion?: boolean;
}

export function TalkingPointsPanel({ accordion = false }: TalkingPointsPanelProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set(accordion ? [] : TALKING_POINTS.map((s) => s.id))
  );

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (accordion) {
        next.clear();
        if (!prev.has(id)) next.add(id);
      } else {
        if (prev.has(id)) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1 mb-2">
        <Lightbulb className="h-4 w-4 text-orange-500" />
        <h2 className="text-sm font-semibold text-gray-900">Talking points</h2>
      </div>

      {TALKING_POINTS.map((section) => {
        const Icon = ICON_MAP[section.icon];
        const open = openIds.has(section.id);
        return (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <Icon className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-gray-900 flex-1 text-left">
                {section.title}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <div className="border-t border-gray-100 px-4 py-3 space-y-2.5">
                {section.items.map((item, i) => (
                  <div key={i} className="text-sm leading-relaxed">
                    {item.heading && (
                      <p className="font-semibold text-gray-900 mb-0.5">{item.heading}</p>
                    )}
                    <p className="text-gray-600">{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
