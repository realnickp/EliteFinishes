"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import dynamic from "next/dynamic";

// Loaded after hydration so they don't add to the initial page JS
const Chatbot = dynamic(() => import("@/components/shared/Chatbot").then((m) => m.Chatbot), { ssr: false });
const SummerSpecialPopup = dynamic(
  () => import("@/components/shared/SummerSpecialPopup").then((m) => m.SummerSpecialPopup),
  { ssr: false }
);
import { CONVERSION_LP_SLUGS } from "@/lib/constants";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  // Ad landing pages are standalone: no site nav, footer, popup or second chatbot
  const isConversionLanding = CONVERSION_LP_SLUGS.some(
    (slug) => pathname === `/lp/${slug}` || pathname.startsWith(`/lp/${slug}/`)
  );

  if (isDashboard || isConversionLanding) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
      <Footer />
      <StickyMobileCTA />
      <Chatbot />
      <SummerSpecialPopup />
    </>
  );
}
