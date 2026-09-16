"use client";

import { usePathname } from "next/navigation";
import { Chatbot } from "@/components/shared/Chatbot";
import { CONVERSION_LP_SLUGS } from "@/lib/constants";

/**
 * Chatbot for the older landing pages. The conversion one pagers skip it:
 * the bubble covers the Project Builder on phones, and call, text and the
 * sticky action bar already cover that need.
 */
export function LpChatbot() {
  const pathname = usePathname();
  const isConversionLanding = CONVERSION_LP_SLUGS.some(
    (slug) => pathname === `/lp/${slug}` || pathname.startsWith(`/lp/${slug}/`)
  );
  return isConversionLanding ? null : <Chatbot />;
}
