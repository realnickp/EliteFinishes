import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  CheckCircle,
  Phone,
  Star,
  Clock,
  Shield,
  MessageSquare,
  ArrowRight,
  Users,
} from "lucide-react";
import { PRIMARY_SERVICES, SITE, TESTIMONIALS } from "@/lib/constants";
import { UtmSaver } from "@/components/lp/UtmSaver";

// ── Service-specific LP content ─────────────────────────────────────────────

const LP_CONTENT: Record<
  string,
  {
    headline: string;
    subheadline: string;
    bullets: string[];
    testimonialIndex: number;
  }
> = {
  "interior-painting": {
    headline: "Professional Interior Painting in Baltimore, MD",
    subheadline:
      "Meticulous prep, premium product, and lasting results — delivered by a licensed Maryland contractor who takes every room seriously.",
    bullets: [
      "Comprehensive surface prep included on every job",
      "Benjamin Moore and Sherwin-Williams premium paints standard",
      "Clean job sites — we protect floors, furniture, and trim",
    ],
    testimonialIndex: 0,
  },
  "exterior-painting": {
    headline: "Exterior Painting That Lasts in Maryland's Climate",
    subheadline:
      "Power washing, full caulking, primer, and two coats of premium product — the right way to protect your home for years to come.",
    bullets: [
      "Full prep: power wash, scrape, sand, re-caulk",
      "Premium exterior product rated for Maryland's humidity and UV",
      "Most homes completed in 2 to 4 days with minimal disruption",
    ],
    testimonialIndex: 0,
  },
  "kitchen-remodeling": {
    headline: "Kitchen Remodeling in the Baltimore Area",
    subheadline:
      "From cabinet painting to full gut renovations — one licensed contractor, quality materials, and a finished kitchen you will actually love.",
    bullets: [
      "Cabinet painting, refacing, or full replacement options",
      "New countertops, backsplash tile, and flooring handled in-house",
      "Permits pulled and all trades coordinated under one roof",
    ],
    testimonialIndex: 0,
  },
  "bathroom-remodeling": {
    headline: "Bathroom Remodeling Done Right in Baltimore",
    subheadline:
      "Full tile work, new vanities, shower conversions, and fresh paint — transforming dated bathrooms throughout the Baltimore area.",
    bullets: [
      "Full bathroom renovations including tile, vanity, and fixtures",
      "Walk-in shower conversions and double vanity upgrades",
      "Licensed contractor with full permit handling",
    ],
    testimonialIndex: 0,
  },
  "home-remodeling": {
    headline: "Whole-Home Renovation in the Baltimore Area",
    subheadline:
      "Multi-room and full-home renovations with one contractor handling painting, flooring, tile, and finish work — no coordination headaches.",
    bullets: [
      "Painting, flooring, tile, and finish carpentry in-house",
      "Phased project options to fit your schedule and budget",
      "Licensed and fully insured with workers compensation coverage",
    ],
    testimonialIndex: 0,
  },
  "basement-remodeling": {
    headline: "Basement Finishing in Baltimore — Done to Code",
    subheadline:
      "Turn your unfinished basement into real living space — framing, drywall, flooring, and painting handled by one licensed contractor.",
    bullets: [
      "Full build-out including framing, drywall, flooring, and paint",
      "Egress window installation available for legal bedroom additions",
      "Permits handled and all inspections coordinated",
    ],
    testimonialIndex: 0,
  },
  decks: {
    headline: "Custom Decks Built for Maryland Living",
    subheadline:
      "Composite or wood, every style and size — designed and built by a licensed Maryland contractor with proper permits and full structural warranty.",
    bullets: [
      "Composite and wood options — we help you pick what is right for your home",
      "Permits pulled and handled for Baltimore area jurisdictions",
      "Code-compliant build with full structural warranty",
    ],
    testimonialIndex: 0,
  },
  flooring: {
    headline: "Flooring Installation Throughout the Baltimore Area",
    subheadline:
      "Hardwood, engineered hardwood, LVP, and tile — installed by a licensed Maryland contractor with honest pricing and lasting results.",
    bullets: [
      "Hardwood, engineered hardwood, LVP, and tile options available",
      "Subfloor assessment and repair included before installation",
      "Stair treads and transitions matched and finished properly",
    ],
    testimonialIndex: 0,
  },
  siding: {
    headline: "Siding Replacement and Repair in the Baltimore Area",
    subheadline:
      "HardiePlank fiber cement, vinyl, and engineered wood siding — installed to protect your home and improve curb appeal for decades.",
    bullets: [
      "HardiePlank fiber cement, vinyl, and engineered wood options",
      "Full trim, soffit, and fascia coordination available",
      "Permits handled and all work backed by our labor warranty",
    ],
    testimonialIndex: 0,
  },
  roofing: {
    headline: "Roofing Repair and Replacement — MD Licensed",
    subheadline:
      "Protect your home with a reliable roof installed by a licensed, insured Maryland contractor. Fast estimates, honest pricing, no pressure.",
    bullets: [
      "Shingle repair, replacement, and full re-roofs",
      "Storm damage documentation and insurance adjuster coordination",
      "GAF, CertainTeed, and Owens Corning shingle systems available",
    ],
    testimonialIndex: 0,
  },
  "concrete-and-masonry": {
    headline: "Concrete and Masonry Work in the Baltimore Area",
    subheadline:
      "Patios, walkways, steps, and masonry repair — properly graded, well-drained, and built to handle Maryland's freeze-thaw cycles.",
    bullets: [
      "Concrete patios, walkways, steps, and pad work",
      "Masonry repair and repointing for brick and block",
      "Proper drainage engineered into every poured surface",
    ],
    testimonialIndex: 0,
  },
  "commercial-services": {
    headline: "Commercial Painting and Renovation for Baltimore Businesses",
    subheadline:
      "Offices, retail spaces, multi-unit buildings, and restaurants — scheduled around your business hours with full compliance documentation available.",
    bullets: [
      "After-hours and weekend scheduling available at no premium",
      "Licensed MHIC contractor and Women's Business Enterprise",
      "COI, additional insured endorsements, and compliance docs provided",
    ],
    testimonialIndex: 0,
  },
};

// ── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PRIMARY_SERVICES.map((s) => ({ service: s.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  if (!svc) return {};
  return {
    title: `Free ${svc.title} Estimate | ${SITE.name}`,
    description: `Get a free ${svc.title.toLowerCase()} estimate from ${SITE.name} — licensed Maryland contractor. No obligation. We respond within one business day.`,
    robots: { index: false, follow: false },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function LpServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);
  const content = LP_CONTENT[service];

  if (!svc || !content) notFound();

  const testimonial = TESTIMONIALS[content.testimonialIndex];

  return (
    <div className="min-h-screen bg-background">
      {/* UTM saver (invisible client component) */}
      <Suspense fallback={null}>
        <UtmSaver />
      </Suspense>

      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
          <p className="text-sm font-medium sm:hidden">
            <span className="font-bold">{SITE.name}</span> · {SITE.license}
          </p>
          <p className="text-sm font-medium hidden sm:block">
            <span className="font-bold">{SITE.name}</span> — Licensed Maryland Contractor · {SITE.license}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={SITE.phoneTel}
              className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main hero ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16 items-start">

          {/* Left: Content */}
          <div className="lg:col-span-3 space-y-8">

            {/* Headline */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/15 text-brand-green text-xs font-semibold px-3 py-1 mb-4">
                <Clock className="h-3.5 w-3.5" />
                Free estimate · Fast response
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display leading-tight mb-4">
                {content.headline}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {content.subheadline}
              </p>
            </div>

            {/* Hero image */}
            <div className="relative h-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={svc.image}
                alt={`${svc.title} by ${SITE.name} in Baltimore, MD`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Bullets */}
            <div className="space-y-3">
              {content.bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <p className="text-foreground/85">{bullet}</p>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                <p className="text-foreground/85">
                  Free, no-pressure estimate — we visit your property and give you a written quote
                </p>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-brand-green" />
                <span>Licensed {SITE.license}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-brand-green text-brand-green" />
                <span>5-Star Rated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-brand-green" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-brand-green" />
                <span>Baltimore Area</span>
              </div>
            </div>

            {/* Testimonial */}
            {testimonial && (
              <div className="bg-warm-bg rounded-2xl border border-border/30 p-6">
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-green text-brand-green" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed mb-4 text-foreground/80">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-bold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: CTA card */}
          <div className="lg:col-span-2 lg:sticky lg:top-6">
            <div className="bg-white rounded-2xl border border-border/40 shadow-xl p-6 md:p-8">

              {/* Card header */}
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 mb-4 text-3xl">
                  🎯
                </div>
                <h2 className="text-xl font-bold mb-2">
                  Your Free Estimate is Just 2 Minutes Away
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Answer 4 quick questions so we know exactly what to prepare — then our team will reach out within one business day.
                </p>
              </div>

              {/* CTA button */}
              <Link
                href={`/lp/${service}/quiz`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-brand-dark py-4 min-h-[48px] text-base font-bold text-white shadow-md hover:shadow-lg hover:shadow-brand/25 transition-all"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="h-5 w-5" />
              </Link>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center border-t border-border/30 pt-5">
                <div>
                  <p className="text-lg font-bold">500+</p>
                  <p className="text-xs text-muted-foreground">Projects done</p>
                </div>
                <div>
                  <div className="flex justify-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-3 w-3 fill-brand-green text-brand-green" />)}
                  </div>
                  <p className="text-xs text-muted-foreground">5-star rated</p>
                </div>
                <div>
                  <p className="text-lg font-bold">Fast</p>
                  <p className="text-xs text-muted-foreground">Response time</p>
                </div>
              </div>

              {/* Or reach out */}
              <div className="mt-5 border-t border-border/30 pt-5">
                <p className="text-sm text-center text-muted-foreground mb-3">
                  Prefer to talk right now?
                </p>
                <div className="flex gap-2">
                  <a
                    href={SITE.phoneTel}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                  <a
                    href={SITE.phoneSms}
                    className="flex-1 flex items-center justify-center gap-2 py-3 min-h-[44px] rounded-xl border-2 border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Text
                  </a>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 shrink-0" />
                100% free · No obligation · No spam
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom trust bar ─────────────────────────────────────────────── */}
      <div className="border-t border-border/30 bg-muted/30 py-6 px-4 mt-8">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{SITE.name}</span>
          <span>·</span>
          <span>{SITE.license}</span>
          <span>·</span>
          <span>Baltimore Metro Area, MD</span>
          <span>·</span>
          <a href={SITE.phoneTel} className="text-primary font-semibold hover:underline">
            {SITE.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
