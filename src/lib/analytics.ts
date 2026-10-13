"use client";

import type { PostHog } from "posthog-js";

// posthog-js is ~170 KB, so it is only downloaded when a PostHog key is configured.
let client: Promise<PostHog | null> | null = null;

function loadPosthog(): Promise<PostHog | null> {
  if (client) return client;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  if (!key || typeof window === "undefined") {
    client = Promise.resolve(null);
    return client;
  }
  client = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(key, {
        api_host: host,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: "localStorage+cookie",
      });
      return posthog;
    })
    .catch(() => null);
  return client;
}

export function initAnalytics() {
  void loadPosthog();
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  void loadPosthog().then((posthog) => posthog?.capture(event, properties));
}
