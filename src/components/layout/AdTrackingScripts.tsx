"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { AD_TRACKING } from "@/lib/constants";
import { initAdTracking, isTrackablePath, trackAdPageView } from "@/lib/ad-tracking";

/** Loads the Meta Pixel and Google Ads tag when their IDs are set in AD_TRACKING. */
export function AdTrackingScripts() {
  const pathname = usePathname();
  const trackable = isTrackablePath(pathname);

  useEffect(() => {
    if (!trackable) return;
    initAdTracking();
    trackAdPageView();
  }, [pathname, trackable]);

  if (!trackable) return null;

  return (
    <>
      {AD_TRACKING.metaPixelId && (
        <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
      {AD_TRACKING.googleAdsId && (
        <Script
          id="google-ads-tag"
          src={`https://www.googletagmanager.com/gtag/js?id=${AD_TRACKING.googleAdsId}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
