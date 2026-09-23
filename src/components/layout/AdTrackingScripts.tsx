"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { AD_TRACKING, SITE } from "@/lib/constants";
import { initAdTracking, isTrackablePath, trackAdPageView } from "@/lib/ad-tracking";

/** Loads the Meta Pixel and Google Ads tag when their IDs are set in AD_TRACKING. */
export function AdTrackingScripts() {
  const pathname = usePathname();
  const trackable = isTrackablePath(pathname);
  // Child Script effects run before this component's effect, so the call
  // tracking config waits until initAdTracking has defined gtag.
  const [gtagReady, setGtagReady] = useState(false);

  useEffect(() => {
    if (!trackable) return;
    initAdTracking();
    trackAdPageView();
    setGtagReady(true);
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
      {AD_TRACKING.googleAdsId && AD_TRACKING.googleAdsCallLabel && gtagReady && (
        <Script id="google-ads-call-tracking" strategy="afterInteractive">
          {`gtag('config', '${AD_TRACKING.googleAdsId}/${AD_TRACKING.googleAdsCallLabel}', {
  'phone_conversion_number': '${SITE.phone}'
});`}
        </Script>
      )}
    </>
  );
}
