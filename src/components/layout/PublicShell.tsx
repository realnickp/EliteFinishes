"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Split into their own chunks (still server rendered) so the ad landing pages,
// which never show them, don't download the nav and its city data.
const Header = dynamic(() => import("@/components/layout/Header").then((m) => m.Header));
const Footer = dynamic(() => import("@/components/layout/Footer").then((m) => m.Footer));
const StickyMobileCTA = dynamic(() =>
  import("@/components/layout/StickyMobileCTA").then((m) => m.StickyMobileCTA)
);

// Loaded after hydration so they don't add to the initial page JS
const Chatbot = dynamic(() => import("@/components/shared/Chatbot").then((m) => m.Chatbot), { ssr: false });
const FallSpecialPopup = dynamic(
  () => import("@/components/shared/FallSpecialPopup").then((m) => m.FallSpecialPopup),
  { ssr: false }
);
import { CONVERSION_LP_SLUGS } from "@/lib/site-config";

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
      <FallSpecialPopup />
    </>
  );
}
