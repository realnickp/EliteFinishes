import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Phone, CheckCircle } from "lucide-react";
import { CITY_DATA, SITE } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { TrustBar } from "@/components/shared/TrustBar";

export const metadata: Metadata = {
  title: `Service Areas in Baltimore, MD | ${SITE.name}`,
  description: `${SITE.name} serves Baltimore City neighborhoods and communities across Baltimore County, Anne Arundel County, and Howard County. Licensed painting and remodeling contractor ${SITE.license}. Free estimates. Call ${SITE.phone}.`,
  alternates: { canonical: `${SITE.url}/areas` },
  openGraph: {
    title: `Service Areas | ${SITE.name}`,
    description: `Professional painting and remodeling in Baltimore City neighborhoods and Baltimore area communities. Free estimates. Call ${SITE.phone}.`,
    images: [{
      url: `/api/og?title=Service+Areas&subtitle=28+Communities+Across+the+Baltimore+Area`,
      width: 1200, height: 630,
      alt: "Elite Finishes Service Areas — Baltimore Metro Area",
    }],
  },
};

const REGION_GROUPS = [
  {
    region: "Baltimore City",
    desc: "From Federal Hill and Canton to Hampden and Mount Vernon, we serve homeowners in Baltimore City neighborhoods.",
    slugs: ["baltimore", "federal-hill", "fells-point", "canton", "mount-vernon", "locust-point", "hampden"],
  },
  {
    region: "Baltimore County",
    desc: "Established communities surrounding Baltimore City with a wide range of residential and commercial painting and remodeling needs.",
    slugs: ["towson", "catonsville", "pikesville", "owings-mills", "cockeysville", "timonium", "lutherville", "white-marsh", "essex", "dundalk", "reisterstown", "parkville", "overlea", "middle-river", "randallstown", "windsor-mill", "woodlawn", "rosedale", "sparrows-point"],
  },
  {
    region: "Howard County",
    desc: "One of Maryland's most affluent counties with high demand for quality home renovation and painting services.",
    slugs: ["ellicott-city", "columbia", "jessup"],
  },
  {
    region: "Anne Arundel County",
    desc: "From waterfront Annapolis to the communities surrounding BWI, we serve homeowners throughout Anne Arundel County.",
    slugs: ["annapolis", "glen-burnie", "pasadena", "severna-park", "arnold"],
  },
];

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-semibold mb-6">
              <MapPin className="h-3.5 w-3.5" />
              Baltimore City Neighborhoods + Communities Across the Baltimore Area
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Painting and Remodeling Throughout{" "}
              <span className="text-white">the Baltimore Area</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
              Based in Baltimore, Elite Finishes serves homeowners across
              Baltimore City, Baltimore County, Anne Arundel County, and Howard
              County with licensed, professional painting and remodeling services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <CTAButton href="/contact" size="lg">
                Get a Free Estimate
                <ArrowRight className="h-5 w-5" />
              </CTAButton>
              <CTAButton variant="phone" size="lg" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why Local Matters */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">
              Based Here. Working Here.
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We are not a national chain dispatching unknown subcontractors.
              Our team lives and works in Baltimore. We know the housing stock,
              HOA requirements, permit processes, and local building conditions
              in every community we serve, because we work in all of them every week.
            </p>
            <ul className="space-y-3">
              {[
                "Licensed Maryland Home Improvement Contractor " + SITE.license,
                "Women's Business Enterprise " + SITE.license2,
                "Fully insured with general liability and workers' compensation coverage",
                "Familiar with local permit, HOA, and county requirements",
                "We return calls quickly, usually the same business day",
                "Clean job sites with minimal disruption to your home and neighbors",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-warm-bg rounded-2xl p-8 border border-border/30">
            <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Tell us your city and what you need. We will schedule a free,
              no-pressure estimate at your property.
            </p>
            <div className="space-y-3">
              <CTAButton href="/contact" className="w-full">
                Request a Free Estimate
                <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <a
                href={SITE.phoneTel}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-border text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Phone className="h-4 w-4 text-brand" />
                Call {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* City Grid by Region */}
      <Section variant="warm">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4">Find Your Community</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Click your city to see local project details, permit information, FAQs,
            and get a free estimate specific to your area.
          </p>
        </div>

        {REGION_GROUPS.map((group) => {
          const citiesInGroup = group.slugs
            .map((slug) => CITY_DATA.find((c) => c.slug === slug))
            .filter(Boolean) as typeof CITY_DATA;
          if (citiesInGroup.length === 0) return null;
          return (
            <div key={group.region} className="mb-10">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{group.region}</h3>
                <p className="text-sm text-muted-foreground">{group.desc}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {citiesInGroup.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/areas/${city.slug}`}
                    className="group flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm border border-border/30 hover:border-brand/50 hover:shadow-md transition-all"
                  >
                    <MapPin className="h-3.5 w-3.5 text-brand flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium group-hover:text-brand transition-colors">
                      {city.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </Section>

      {/* Services Available Everywhere */}
      <Section>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl mb-4">
            Services Available Throughout Our Service Area
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every service we offer is available in every community we serve. Same
            licensed crew, same quality materials, same guarantee.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Interior Painting", desc: "Premium interior painting with meticulous prep and lasting results.", href: "/services/interior-painting" },
            { title: "Exterior Painting", desc: "Full exterior painting with power washing, caulking, and premium coatings.", href: "/services/exterior-painting" },
            { title: "Kitchen Remodeling", desc: "Complete kitchen transformations from cabinets to countertops and tile.", href: "/services/kitchen-remodeling" },
            { title: "Bathroom Remodeling", desc: "Full bathroom renovations including tile, vanities, and painting.", href: "/services/bathroom-remodeling" },
            { title: "Flooring", desc: "Hardwood, LVP, tile, and carpet installation and refinishing.", href: "/services/flooring" },
            { title: "Home Remodeling", desc: "Whole-home and multi-room renovations from start to finish.", href: "/services/home-remodeling" },
          ].map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group p-6 rounded-2xl border border-border/40 bg-white hover:border-brand/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-lg mb-2 group-hover:text-brand transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {service.desc}
              </p>
              <span className="text-xs font-semibold text-brand inline-flex items-center gap-1">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-primary text-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            Do Not See Your City?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            We serve homeowners throughout the Baltimore metro area and select
            surrounding communities. Give us a call and we will let you know if
            your location is within our service area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Request a Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
