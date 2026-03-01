import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Basement Remodeling in Baltimore, MD | ${SITE.name}`,
  description:
    "Basement finishing and remodeling in Baltimore and surrounding Maryland counties. Turn unfinished space into livable square footage. Licensed contractor with free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Basement Remodeling in Baltimore, MD | ${SITE.name}`,
    description:
      "Basement finishing and remodeling in Baltimore and surrounding Maryland counties. Turn unfinished space into livable square footage. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/basement-remodeling`,
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/basement-remodeling` },
};

export default function BasementRemodelingPage() {
  return (
    <ServicePageTemplate
      title="Basement Remodeling"
      slug="basement-remodeling"
      heroImage="/images/pexels-introspectivedsgn-9899847.jpg"
      heroAlt="Finished basement living space completed by Elite Finishes in Baltimore Maryland"
      headline="Turn Your Unfinished Basement Into Livable Space"
      subheadline="Basement finishing and remodeling for Baltimore area homeowners ready to unlock the potential hiding beneath their feet."
      factNugget={`${SITE.name} is a licensed basement remodeling contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. A finished basement adds functional square footage at a fraction of the cost per square foot of a home addition. Most basement finishing projects in the Baltimore area range from $25 to $60 per square foot for a complete finished space including framing, drywall, electrical coordination, flooring, and painting.`}
      serviceOffers={[
        { name: "Basement Finishing", description: "Complete framing, insulation, drywall, flooring, and painting for unfinished basements" },
        { name: "Basement Family Room or Rec Room", description: "Entertainment and family room conversions with custom layout and finish details" },
        { name: "Basement Bedroom Addition", description: "Legal egress window installation, framing, and finishing for basement bedroom suites" },
        { name: "Basement Home Office", description: "Quiet, functional home office spaces with appropriate lighting and electrical" },
        { name: "Basement Bar and Entertainment Space", description: "Custom wet bar and entertainment area build-outs with tile, cabinetry, and specialty finishes" },
        { name: "Basement Bathroom Addition", description: "Rough-in plumbing coordination and full bathroom installation in basement space" },
      ]}
      intro={[
        "Most Baltimore area homes have an unfinished basement that is being used as storage, a laundry room, or nothing at all. That space represents hundreds of livable square feet that could be a family room, a home office, a guest suite, a playroom for kids, or a dedicated workout space. The cost per square foot to finish a basement is a fraction of what it would cost to add a room above grade.",
        "At Elite Finishes, we transform unfinished basements into fully livable, properly finished spaces. We manage framing, insulation, drywall, flooring, painting, and coordination with electrical and plumbing trades all under one contract. The result is a finished basement that looks and feels like the rest of your home.",
        "Moisture management is the most critical consideration in any Baltimore basement project. Before we frame a single wall, we assess the existing moisture situation and make sure we have the right approach to protect the finished space long-term. Building on top of an unaddressed moisture problem is how basements fail within a few years. We identify potential issues upfront and address them before they become your problem.",
      ]}
      benefits={[
        {
          title: "Most Cost-Effective Way to Add Space",
          description:
            "Finishing a basement adds livable square footage at a fraction of the cost of a home addition. Most Baltimore area basement finishing projects cost $25 to $60 per square foot compared to $150 or more per square foot for an addition above grade.",
        },
        {
          title: "Moisture Assessment Before Any Work",
          description:
            "We assess your basement's moisture situation before framing begins. If there is an active moisture issue, we address it first. Building finished walls over a moisture problem is the most common mistake in basement remodeling, and it is not one we make.",
        },
        {
          title: "Full Project Coordination",
          description:
            "We manage framing, insulation, drywall, flooring, and painting in-house and coordinate electrical and plumbing work with licensed trades. You have one contractor managing the schedule and responsible for the final result.",
        },
        {
          title: "Proper Egress for Basement Bedrooms",
          description:
            "If you want a legal bedroom in your basement, it must have a code-compliant egress window. We handle egress window installation as part of the project, ensuring your basement bedroom meets Maryland residential code requirements.",
        },
        {
          title: "Flooring That Handles Basement Conditions",
          description:
            "Basements have different moisture and temperature conditions than above-grade spaces. We recommend and install flooring products rated for below-grade installation including luxury vinyl plank, engineered hardwood, and appropriate tile options.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `All work is performed under our MHIC license (${SITE.license}) with full liability insurance. We pull required permits and ensure all work meets Maryland residential construction standards.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Basement Assessment and Estimate",
          description:
            "We walk through your basement to assess moisture conditions, ceiling height, existing mechanicals, and your layout goals. You get a written estimate with clear scope and pricing for the finished space you want.",
        },
        {
          step: 2,
          title: "Planning and Permits",
          description:
            "We finalize your layout, material selections, and design details. We prepare and submit permit applications (required for most basement finishing projects in Maryland) and coordinate material deliveries.",
        },
        {
          step: 3,
          title: "Framing, Rough-In, and Insulation",
          description:
            "We frame all walls and soffits, coordinate electrical and plumbing rough-in work, and install insulation before the walls are closed up. All rough-in work is inspected before proceeding to drywall.",
        },
        {
          step: 4,
          title: "Drywall, Flooring, Paint, and Finish",
          description:
            "We hang, tape, and finish drywall, install your flooring, paint all surfaces, and install all trim and finish details. We walk through the completed space with you before signing off.",
        },
      ]}
      faqs={[
        {
          question: "How much does it cost to finish a basement in Baltimore?",
          answer:
            "A standard basement finishing project in the Baltimore area typically runs $25 to $60 per square foot for a complete finished space including framing, insulation, drywall, electrical coordination, flooring, and painting. A 700 square foot basement would typically cost $17,500 to $42,000 depending on finish quality and features like a bathroom or wet bar.",
        },
        {
          question: "Do I need a permit to finish my basement in Maryland?",
          answer:
            "Yes. Maryland requires building permits for basement finishing projects that include framing, electrical, or plumbing work. We handle the permit application, inspections, and final sign-off as part of your project.",
        },
        {
          question: "What do I do about moisture before finishing my basement?",
          answer:
            "If your basement has active water intrusion, it needs to be addressed before any finishing work begins. That might mean exterior grading corrections, gutter extensions, crack injection, or a full interior drainage system depending on the source. We assess your specific moisture situation during the consultation and recommend the right approach before we start any finishing work.",
        },
        {
          question: "Can I have a bedroom in my basement?",
          answer:
            "Yes, but it must meet Maryland's egress requirements, which means it needs a window large enough for emergency exit. We install egress windows as part of the project to make your basement bedroom code-compliant. Egress window installation adds cost but is required for the room to be legally classified as a bedroom.",
        },
        {
          question: "What flooring is best for a finished basement?",
          answer:
            "Luxury vinyl plank (LVP) is our most popular recommendation for basements because it is 100 percent waterproof, comfortable underfoot, durable, and available in excellent wood-look options. Engineered hardwood and tile are also appropriate choices. We recommend against solid hardwood in below-grade applications due to moisture sensitivity.",
        },
        {
          question: "How long does a basement finishing project take?",
          answer:
            "A standard basement finishing project typically takes four to eight weeks from the start of framing through the final walkthrough, depending on the size of the space and any special features like a bathroom or wet bar. Permit review adds time before construction begins. We build a realistic schedule before we start so you know what to expect.",
        },
      ]}
      relatedServices={[
        { title: "Home Remodeling", slug: "home-remodeling" },
        { title: "Flooring", slug: "flooring" },
        { title: "Interior Painting", slug: "interior-painting" },
        { title: "Concrete and Masonry", slug: "concrete-and-masonry" },
      ]}
      galleryCategory="Basement Remodeling"
    />
  );
}
