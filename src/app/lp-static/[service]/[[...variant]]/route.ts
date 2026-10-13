import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";

// Prerendered at build. /lp/painting and its ad group variants are rewritten here
// (next.config.ts) so the ad page ships no React runtime.
export const dynamic = "force-static";
export const dynamicParams = false;

const STATIC_SERVICES = ["painting"] as const;

export function generateStaticParams() {
  return STATIC_SERVICES.flatMap((service) => [
    { service, variant: [] as string[] },
    ...Object.keys(LANDING_PAGES[service].variants).map((v) => ({ service, variant: [v] })),
  ]);
}

export async function GET(_req: Request, ctx: { params: Promise<{ service: string; variant?: string[] }> }) {
  const { service, variant } = await ctx.params;
  const config = LANDING_PAGES[service];
  const key = variant?.[0];
  if (!config || (key && !config.variants[key]) || (variant && variant.length > 1)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(renderLandingHtml(config, key), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
