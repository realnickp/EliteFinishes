import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ConversionLanding } from "@/components/lp/landing/ConversionLanding";
import { LANDING_PAGES } from "@/lib/lp-landing";

// Ad group versions of the conversion one pagers, e.g. /lp/painting/near-me.
// Same page and same thank-you URL as the parent, only the hero wording changes.

type Params = Promise<{ service: string; variant: string }>;

function resolve(service: string, variant: string) {
  const landing = LANDING_PAGES[service];
  const swap = landing?.variants[variant];
  if (!landing || !swap) return null;
  return { landing, swap };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(LANDING_PAGES).flatMap((landing) =>
    Object.keys(landing.variants).map((variant) => ({ service: landing.slug, variant })),
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { service, variant } = await params;
  const found = resolve(service, variant);
  if (!found) return {};
  return {
    title: { absolute: found.swap.metaTitle },
    description: found.landing.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function LpVariantPage({ params }: { params: Params }) {
  const { service, variant } = await params;
  const found = resolve(service, variant);
  if (!found) notFound();
  const { landing, swap } = found;
  return <ConversionLanding config={{ ...landing, eyebrow: swap.eyebrow, headline: swap.headline }} />;
}
