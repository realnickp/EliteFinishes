"use client";

import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { trackAdContact } from "@/lib/ad-tracking";
import { trackEvent } from "@/lib/analytics";

interface ContactButtonProps {
  kind: "call" | "text";
  service: string;
  placement: string;
  /** Prefilled text message body (text buttons only). */
  smsBody?: string;
  className?: string;
  children: ReactNode;
}

/** Tap to call or tap to text link that records the tap for ads and analytics. */
export function ContactButton({ kind, service, placement, smsBody, className, children }: ContactButtonProps) {
  const href =
    kind === "call"
      ? SITE.phoneTel
      : smsBody
        ? `${SITE.phoneSms}?&body=${encodeURIComponent(smsBody)}`
        : SITE.phoneSms;

  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        trackAdContact(kind, service);
        trackEvent(`lp_${kind}_tap`, { service, placement });
      }}
    >
      {children}
    </a>
  );
}

interface EstimateButtonProps {
  placement: string;
  className?: string;
  children: ReactNode;
}

/** Scrolls up to the Project Builder in the hero. */
export function EstimateButton({ placement, className, children }: EstimateButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth", block: "start" });
        trackEvent("lp_estimate_cta_tap", { placement });
      }}
    >
      {children}
    </button>
  );
}
