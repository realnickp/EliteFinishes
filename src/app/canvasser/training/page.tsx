"use client";

import { useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  DoorOpen,
  MessageCircle,
  Tag,
  Sparkles,
  Handshake,
  Lightbulb,
  ListChecks,
  ShieldAlert,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import {
  TRAINING_CATEGORIES,
  searchTraining,
  type TrainingCategory,
  type TrainingItem,
} from "@/lib/canvasser-training";

const ICON_MAP: Record<TrainingCategory["icon"], LucideIcon> = {
  doorOpen: DoorOpen,
  messageCircle: MessageCircle,
  tag: Tag,
  sparkles: Sparkles,
  handshake: Handshake,
  lightbulb: Lightbulb,
  listCheck: ListChecks,
  shield: ShieldAlert,
};

const ACCENT: Record<
  TrainingCategory["accent"],
  { bg: string; text: string; ring: string; chip: string }
> = {
  orange: { bg: "bg-orange-100", text: "text-orange-600", ring: "ring-orange-200", chip: "bg-orange-100 text-orange-700" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", ring: "ring-blue-200", chip: "bg-blue-100 text-blue-700" },
  emerald: { bg: "bg-emerald-100", text: "text-emerald-600", ring: "ring-emerald-200", chip: "bg-emerald-100 text-emerald-700" },
  amber: { bg: "bg-amber-100", text: "text-amber-600", ring: "ring-amber-200", chip: "bg-amber-100 text-amber-700" },
  violet: { bg: "bg-violet-100", text: "text-violet-600", ring: "ring-violet-200", chip: "bg-violet-100 text-violet-700" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", ring: "ring-rose-200", chip: "bg-rose-100 text-rose-700" },
};

function ItemCard({ item, accent }: { item: TrainingItem; accent: TrainingCategory["accent"] }) {
  const [open, setOpen] = useState(false);
  const a = ACCENT[accent];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-gray-50"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {item.tag && (
              <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded-full ${a.chip}`}>
                {item.tag}
              </span>
            )}
            <h3 className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</h3>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-gray-100 px-4 py-4 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
          {item.body}
        </div>
      )}
    </div>
  );
}

function CategoryButton({
  category,
  active,
  onClick,
}: {
  category: TrainingCategory;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[category.icon];
  const a = ACCENT[category.accent];
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border min-h-[40px] ${
        active
          ? `${a.bg} ${a.text} border-transparent ring-2 ${a.ring}`
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
      }`}
    >
      <Icon className="h-4 w-4" />
      {category.title}
    </button>
  );
}

export default function CanvasserTrainingPage() {
  const [activeId, setActiveId] = useState<TrainingCategory["id"]>(TRAINING_CATEGORIES[0].id);
  const [query, setQuery] = useState("");

  const searching = query.trim().length >= 2;
  const results = useMemo(() => (searching ? searchTraining(query) : []), [query, searching]);
  const activeCategory = TRAINING_CATEGORIES.find((c) => c.id === activeId) ?? TRAINING_CATEGORIES[0];

  return (
    <div className="pb-10">
      {/* Sticky header */}
      <div className="sticky top-0 md:top-0 bg-gray-50/95 backdrop-blur z-20 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 pt-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-orange-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                Field Training
              </p>
              <h1 className="text-xl font-bold text-gray-900 truncate">Canvasser playbook</h1>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search objections, scripts, prices…"
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {!searching && (
            <div className="flex gap-2 overflow-x-auto -mx-4 px-4 mt-3 pb-1 scrollbar-none">
              {TRAINING_CATEGORIES.map((c) => (
                <CategoryButton
                  key={c.id}
                  category={c}
                  active={c.id === activeId}
                  onClick={() => setActiveId(c.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-3">
        {searching ? (
          results.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-500">
                Nothing matches <span className="font-semibold text-gray-700">&ldquo;{query}&rdquo;</span>.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try: <button onClick={() => setQuery("price")} className="text-orange-600 font-medium">price</button> ·{" "}
                <button onClick={() => setQuery("spouse")} className="text-orange-600 font-medium">spouse</button> ·{" "}
                <button onClick={() => setQuery("flyer")} className="text-orange-600 font-medium">flyer</button> ·{" "}
                <button onClick={() => setQuery("roofing")} className="text-orange-600 font-medium">roofing</button>
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-wide font-semibold text-gray-500 px-1">
                {results.length} result{results.length === 1 ? "" : "s"}
              </p>
              {results.map(({ category, item }, i) => (
                <div key={`${category.id}-${i}`} className="space-y-1">
                  <p className="text-[11px] uppercase tracking-wide font-semibold text-gray-400 px-1">
                    {category.title}
                  </p>
                  <ItemCard item={item} accent={category.accent} />
                </div>
              ))}
            </>
          )
        ) : (
          <>
            <div className="px-1 mb-1">
              <h2 className="text-lg font-bold text-gray-900">{activeCategory.title}</h2>
              <p className="text-sm text-gray-500">{activeCategory.subtitle}</p>
            </div>
            <div className="space-y-2.5">
              {activeCategory.items.map((item, i) => (
                <ItemCard key={i} item={item} accent={activeCategory.accent} />
              ))}
            </div>
          </>
        )}

        <p className="text-[11px] text-gray-400 text-center pt-6">
          Tap any card to expand. Add this page to your home screen for one-tap access.
        </p>
      </div>
    </div>
  );
}
