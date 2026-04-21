"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PRIMARY_SERVICES } from "@/lib/constants";
import { QUIZ_DATA } from "@/lib/quiz-data";

const SERVICE_EMOJI: Record<string, string> = {
  "interior-painting": "🎨",
  "exterior-painting": "🏡",
  "kitchen-remodeling": "🍳",
  "bathroom-remodeling": "🛁",
  "home-remodeling": "🏠",
  "basement-remodeling": "🏚️",
  decks: "🪵",
  flooring: "🪟",
  siding: "🧱",
  roofing: "⛰️",
  "concrete-and-masonry": "🧱",
  "commercial-services": "🏢",
};

interface ServicePickerProps {
  selected?: string;
  onSelect: (slug: string) => void;
}

export function ServicePicker({ selected, onSelect }: ServicePickerProps) {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 mb-2">
          Step 1 of 3
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          What is the prospect interested in?
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Pick the service they&apos;re asking about. You&apos;ll walk them through 8 questions next.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {PRIMARY_SERVICES.map((svc) => {
          const hasQuiz = Boolean(QUIZ_DATA[svc.slug]?.length);
          const isSelected = selected === svc.slug;
          const emoji = SERVICE_EMOJI[svc.slug] ?? "🛠️";
          return (
            <button
              key={svc.slug}
              disabled={!hasQuiz}
              onClick={() => onSelect(svc.slug)}
              className={[
                "relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-200",
                "bg-white disabled:opacity-40 disabled:cursor-not-allowed",
                isSelected
                  ? "border-orange-500 shadow-lg shadow-orange-500/20 scale-[1.01]"
                  : "border-gray-200 hover:border-orange-300 hover:shadow-md",
              ].join(" ")}
            >
              <div className="relative w-full aspect-[5/3] bg-gray-100">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 text-2xl drop-shadow">
                  {emoji}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-orange-500 rounded-full p-1 shadow">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className={`text-sm font-semibold leading-tight ${isSelected ? "text-orange-600" : "text-gray-900"}`}>
                  {svc.title}
                </p>
                {!hasQuiz && (
                  <p className="text-xs text-gray-400 mt-1">Coming soon</p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
