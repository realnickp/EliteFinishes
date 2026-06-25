"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sun, UtensilsCrossed, PaintRoller, ArrowRight, Phone, Star } from "lucide-react";
import { FlagStripe } from "@/components/shared/FlagStripe";
import { SITE } from "@/lib/constants";

const STORAGE_KEY = "ef_summer_special_dismissed";
/** Re-show the offer after this many days once dismissed. */
const SUPPRESS_DAYS = 7;
/** Delay before the popup appears, so it doesn't fight the page load. */
const SHOW_DELAY_MS = 4500;

export function SummerSpecialPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Respect a recent dismissal.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const dismissedAt = Number(raw);
        const ageDays = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
        if (ageDays < SUPPRESS_DAYS) return;
      }
    } catch {
      /* localStorage unavailable — show anyway */
    }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="summer-special-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Card */}
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative w-full sm:max-w-md overflow-hidden rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
          >
            <FlagStripe className="h-1.5" />

            {/* ===== Image hero header ===== */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <Image
                src="/images/hero-bathroom-tile.jpg"
                alt="Elite Finishes kitchen and bathroom remodeling in Baltimore, MD"
                fill
                className="object-cover object-[center_55%]"
                sizes="(max-width: 640px) 100vw, 28rem"
                priority
              />
              {/* Charcoal brand wash, matching the site heroes */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/30" />
              <div className="pointer-events-none absolute -top-16 -right-12 h-44 w-44 rounded-full bg-brand/30 blur-3xl" />

              {/* Close */}
              <button
                onClick={dismiss}
                aria-label="Close offer"
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Rotated $500 reward sticker */}
              <motion.div
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: -8 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 11 }}
                className="absolute left-4 top-4 z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark text-center text-white shadow-xl ring-2 ring-white/70"
              >
                <span className="text-[10px] font-semibold uppercase leading-none tracking-wider text-white/80">
                  Up to
                </span>
                <span className="font-display text-2xl leading-none">$500</span>
                <span className="text-[9px] font-semibold uppercase leading-none tracking-wide text-white/80">
                  Dining
                </span>
              </motion.div>

              {/* Headline block */}
              <div className="absolute inset-x-0 bottom-0 px-6 pb-5 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/20 border border-brand-green/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-green backdrop-blur-sm">
                  <Sun className="h-3.5 w-3.5" />
                  Summer Special
                </span>
                <h2
                  id="summer-special-title"
                  className="mt-2.5 font-display text-[1.9rem] leading-[1.05] sm:text-[2.1rem]"
                >
                  Save Big This Summer
                </h2>
              </div>
            </div>

            {/* ===== Offers ===== */}
            <div className="px-5 pb-6 pt-5 sm:px-7">
              <p className="mb-4 text-sm text-muted-foreground">
                Two limited-time offers from {SITE.name} — book your free estimate before summer ends.
              </p>

              {/* Offer 1 — painting + drywall */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  <PaintRoller className="h-6 w-6 text-brand" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold leading-tight">
                    <span className="text-brand">10% off</span> painting &amp; drywall
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                    Interior &amp; exterior painting and all drywall jobs.
                  </p>
                </div>
              </div>

              <div className="my-4 h-px bg-border" />

              {/* Offer 2 — $500 gift card */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                  <UtensilsCrossed className="h-6 w-6 text-brand-green" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold leading-tight">
                    <span className="text-brand-green-dark">$500 gift card</span> on us
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
                    To <span className="font-semibold text-foreground">The Capital Grille</span> or{" "}
                    <span className="font-semibold text-foreground">Ruth&apos;s Chris</span> with any
                    kitchen remodel, bathroom remodel, new deck, or new roof.
                  </p>
                </div>
              </div>

              {/* CTAs — site button styles */}
              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href="/quote"
                  onClick={dismiss}
                  className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-brand-green to-brand-green-dark px-8 py-4 text-base font-semibold text-white shadow-lg shadow-brand-green/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-green/30 active:scale-[0.98]"
                >
                  Claim My Offer
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={SITE.phoneTel}
                  onClick={dismiss}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition-all duration-300 hover:scale-[1.02] hover:bg-brand hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Call {SITE.phone}
                </a>
              </div>

              {/* Trust line */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-brand-green text-brand-green" />
                  ))}
                </span>
                <span>5-star rated &middot; Licensed {SITE.license}</span>
              </div>

              <p className="mt-3 text-center text-[10px] leading-relaxed text-muted-foreground/70">
                Limited-time summer offer. Cannot be combined with other discounts.
                Mention this offer at your free estimate.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
