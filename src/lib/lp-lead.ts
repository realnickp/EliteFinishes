"use client";

import { trackEvent } from "@/lib/analytics";

const PENDING_CONVERSION_KEY = "ef_lp_pending_conversion";

export type LpLeadMethod = "builder" | "form";

interface StoredUtm {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  fbclid?: string;
  gclid?: string;
}

export interface LpLeadInput {
  slug: string;
  service: string;
  method: LpLeadMethod;
  name: string;
  phone: string;
  cityOrZip: string;
  email: string;
  description: string;
  timeframe: string;
  budget?: string | null;
  spamFields: Record<string, string>;
}

export interface PendingConversion {
  service: string;
  method: LpLeadMethod;
}

function readUtm(): StoredUtm {
  try {
    const raw = sessionStorage.getItem("bb_utm");
    return raw ? (JSON.parse(raw) as StoredUtm) : {};
  } catch {
    return {};
  }
}

/** e.g. "google_ads:lp_builder:painting" or "lp_form:bathroom-remodeling" */
function detectSource(utm: StoredUtm, label: string): string {
  const src = (utm.utm_source ?? "").toLowerCase();
  const med = (utm.utm_medium ?? "").toLowerCase();
  let platform = "";
  if (src.includes("facebook") || src.includes("fb") || src === "ig" || src.includes("instagram") || utm.fbclid) {
    platform = "facebook_ads";
  } else if (src.includes("google") || med === "cpc" || med === "ppc" || utm.gclid) {
    platform = "google_ads";
  }
  return platform ? `${platform}:${label}` : label;
}

/** Posts a landing page lead to /api/leads. Throws with a friendly message on failure. */
export async function submitLpLead(input: LpLeadInput): Promise<void> {
  const utm = readUtm();
  const source = detectSource(utm, `lp_${input.method}:${input.slug}`);

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: input.name.trim(),
      phone: input.phone.trim(),
      email: input.email.trim(),
      service: input.service,
      cityOrZip: input.cityOrZip.trim(),
      description: input.description,
      timeframe: input.timeframe,
      budget: input.budget ?? undefined,
      source,
      utmSource: utm.utm_source ?? "",
      utmMedium: utm.utm_medium ?? "",
      utmCampaign: utm.utm_campaign ?? "",
      landingPage: window.location.href,
      ...input.spamFields,
    }),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || "Something went wrong. Please call or text us instead.");
  }

  trackEvent("lp_lead_submitted", { service: input.slug, method: input.method, source });

  try {
    const pending: PendingConversion = { service: input.service, method: input.method };
    sessionStorage.setItem(PENDING_CONVERSION_KEY, JSON.stringify(pending));
  } catch {
    // sessionStorage unavailable
  }
}

/**
 * Returns the conversion recorded by submitLpLead and clears it, so the
 * thank-you page counts each lead once (not on refresh or direct visits).
 */
export function consumePendingConversion(): PendingConversion | null {
  try {
    const raw = sessionStorage.getItem(PENDING_CONVERSION_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_CONVERSION_KEY);
    return JSON.parse(raw) as PendingConversion;
  } catch {
    return null;
  }
}
