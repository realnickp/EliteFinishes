"use client";

import { AD_TRACKING } from "@/lib/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */

type ContactKind = "call" | "text";

let metaInitialized = false;
let googleInitialized = false;

/** Paths where ad pixels must never load (private lead data lives here). */
const PRIVATE_PATH_PREFIXES = ["/dashboard", "/canvasser", "/login"];

export function isTrackablePath(pathname: string): boolean {
  return !PRIVATE_PATH_PREFIXES.some((p) => pathname.startsWith(p));
}

/**
 * Returns the Meta fbq function, creating the standard queue stub and
 * initializing the pixel on first use. Calls made before fbevents.js
 * finishes loading are queued and replayed in order.
 */
function getFbq(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined" || !AD_TRACKING.metaPixelId) return null;
  const w = window as any;
  if (!w.fbq) {
    const n: any = function (...args: unknown[]) {
      // Matches Meta's official snippet, which binds `this` to fbq
      // eslint-disable-next-line prefer-spread
      if (n.callMethod) n.callMethod.apply(n, args);
      else n.queue.push(args);
    };
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
  }
  if (!metaInitialized) {
    w.fbq("init", AD_TRACKING.metaPixelId);
    metaInitialized = true;
  }
  return w.fbq;
}

/** Returns gtag, creating the dataLayer queue and configuring Google Ads on first use. */
function getGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined" || !AD_TRACKING.googleAdsId) return null;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // gtag.js requires the Arguments object, not an array
    w.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
  }
  if (!googleInitialized) {
    w.gtag("js", new Date());
    w.gtag("config", AD_TRACKING.googleAdsId);
    googleInitialized = true;
  }
  return w.gtag;
}

/** Initializes both platforms (safe to call repeatedly). */
export function initAdTracking() {
  getFbq();
  getGtag();
}

export function trackAdPageView() {
  getFbq()?.("track", "PageView");
}

/** A form or Project Builder lead was submitted. `slug` selects a page specific Google Ads label. */
export function trackAdLead(details: { service: string; method: string; slug?: string }) {
  getFbq()?.("track", "Lead", { content_name: details.service, content_category: details.method });
  const googleLabel =
    (details.slug && AD_TRACKING.googleAdsLeadLabelsBySlug[details.slug]) || AD_TRACKING.googleAdsLeadLabel;
  if (googleLabel) {
    getGtag()?.("event", "conversion", {
      send_to: `${AD_TRACKING.googleAdsId}/${googleLabel}`,
    });
  }
}

/** Someone tapped a call or text button. */
export function trackAdContact(kind: ContactKind, service: string) {
  getFbq()?.("track", "Contact", { content_name: service, content_category: kind });
  if (AD_TRACKING.googleAdsContactLabel) {
    getGtag()?.("event", "conversion", {
      send_to: `${AD_TRACKING.googleAdsId}/${AD_TRACKING.googleAdsContactLabel}`,
    });
  }
}
