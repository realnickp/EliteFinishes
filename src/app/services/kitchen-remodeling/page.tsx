import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Kitchen Remodeling in Baltimore, MD | ${SITE.name}`,
  description:
    "Full kitchen remodeling in Baltimore and surrounding Maryland counties. Cabinets, countertops, tile, and painting all handled by one licensed contractor. Free estimates.",
  openGraph: {
    title: `Kitchen Remodeling in Baltimore, MD | ${SITE.name}`,
    description:
      "Full kitchen remodeling in Baltimore and surrounding Maryland counties. Cabinets, countertops, tile, and painting all handled by one licensed contractor. Free estimates.",
    url: `${SITE.url}/services/kitchen-remodeling`,
    images: [
      {
        url: `/api/og?title=Kitchen+Remodeling&subtitle=Baltimore%2C+MD+%26+Surrounding+Counties`,
        width: 1200,
        height: 630,
        alt: "Kitchen Remodeling in Baltimore, MD | Elite Finishes",
      },
    ],
  },
  alternates: { canonical: `${SITE.url}/services/kitchen-remodeling` },
};

export default function KitchenRemodelingPage() {
  return (
    <ServicePageTemplate
      title="Kitchen Remodeling"
      slug="kitchen-remodeling"
      heroImage="/images/pexels-artbovich-6301185.jpg"
      heroAlt="Beautifully remodeled kitchen completed by Elite Finishes in Baltimore area home"
      headline="Kitchen Remodeling That Makes Your Home Feel Brand New"
      subheadline="Complete kitchen transformations from cabinet painting and countertop replacement to full gut renovations, handled by one licensed local crew from start to finish."
      factNugget={`${SITE.name} is a licensed kitchen remodeling contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Kitchen remodels consistently rank among the highest-return home improvements, recouping 60 to 80 percent of cost at resale. We handle all phases of your kitchen project including demolition, carpentry, tile work, painting, and finishing, which reduces schedule overlap and communication gaps compared to hiring separate contractors for each trade.`}
      serviceOffers={[
        { name: "Full Kitchen Gut Renovation", description: "Complete kitchen demolition and rebuilding from subfloor to ceiling" },
        { name: "Cabinet Painting and Refinishing", description: "Transform existing cabinets with professional spray painting instead of replacement" },
        { name: "Cabinet Replacement and Installation", description: "Semi-custom and custom cabinet installation with new hardware" },
        { name: "Countertop Replacement", description: "Quartz, granite, laminate, and butcher block countertop removal and installation" },
        { name: "Tile Backsplash Installation", description: "Subway, mosaic, and decorative tile backsplash installation" },
        { name: "Kitchen Painting", description: "Walls, ceiling, and trim painting in moisture-resistant formulas" },
      ]}
      intro={[
        "The kitchen is the most used room in most homes and the one that most directly affects your daily quality of life. An outdated kitchen with dark oak cabinets, worn countertops, and peeling paint makes cooking feel like a chore. A transformed kitchen with fresh cabinetry, clean surfaces, and proper lighting makes the same cooking feel like something you actually want to do. That transformation does not always require a complete gut renovation.",
        "At Elite Finishes, we assess what your kitchen actually needs and recommend the most cost-effective path to the result you want. Sometimes cabinet painting and new hardware delivers 80 percent of the impact of a full replacement at a fraction of the cost. Sometimes the cabinets are too far gone and replacement makes more sense. We will show you the options honestly and help you decide.",
        "We handle all phases of kitchen remodeling in-house: demolition, carpentry, tile work, plumbing coordination, painting, and all finishing details. Working with one contractor through the entire project eliminates the scheduling gaps, communication errors, and finger-pointing that happen when you try to coordinate multiple specialty trades on your own.",
      ]}
      benefits={[
        {
          title: "One Contractor for Every Phase",
          description:
            "We manage demolition, carpentry, tile, painting, and coordination with plumbing and electrical trades all under one contract. You have one point of contact, one schedule, and one team responsible for delivering the finished product.",
        },
        {
          title: "Cabinet Painting as a Cost-Effective Alternative",
          description:
            "Professional cabinet painting can transform your kitchen for a fraction of the cost of full replacement. We spray your cabinet boxes and doors with a durable, factory-smooth finish that holds up to daily kitchen use and looks indistinguishable from new.",
        },
        {
          title: "High-Return Investment",
          description:
            "Kitchen remodels consistently deliver among the best returns on investment of any home improvement project in the Baltimore market. A refreshed kitchen raises your home's value, improves your quality of life, and attracts buyers if you decide to sell.",
        },
        {
          title: "Honest Scope Recommendations",
          description:
            "We will tell you when cabinet painting is the better choice and when replacement makes more financial sense. Our recommendation is based on what is right for your home and your budget, not on what produces the largest invoice for us.",
        },
        {
          title: "Clean, Contained Work",
          description:
            "Kitchen remodels are messy. We contain dust with temporary barriers, protect adjacent rooms and flooring, and clean up every day before we leave. Your home will not look like a construction zone throughout the project.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `All work is performed under our MHIC license (${SITE.license}) with full liability insurance. We pull any required permits and ensure all work meets Maryland residential construction standards.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Design Consultation and Estimate",
          description:
            "We visit your kitchen, assess the existing layout and condition, discuss your goals and budget, and present options with honest cost-to-benefit analysis. You get a detailed written estimate with no pressure to commit.",
        },
        {
          step: 2,
          title: "Planning and Material Selection",
          description:
            "We finalize your cabinet style, countertop material, tile selection, hardware, and paint colors. We coordinate delivery of materials and establish a schedule that minimizes the amount of time your kitchen is fully out of commission.",
        },
        {
          step: 3,
          title: "Demolition and Installation",
          description:
            "We remove existing cabinets, countertops, and tile as needed, then frame, install, and finish your new kitchen components. All phases are coordinated so that plumbing and electrical are addressed at the right point in the sequence.",
        },
        {
          step: 4,
          title: "Painting, Finishing, and Walkthrough",
          description:
            "We complete all painting including walls, cabinets, and trim, install hardware and fixtures, and finish every detail. We walk through the entire kitchen with you and address any punch-list items before signing off on the project.",
        },
      ]}
      faqs={[
        {
          question: "How much does a kitchen remodel cost in Baltimore?",
          answer:
            "A minor kitchen refresh (cabinet painting, new hardware, countertop replacement, and paint) typically runs $5,000 to $15,000. A mid-range remodel with new cabinets, countertops, tile, and painting runs $20,000 to $50,000. A full gut renovation with layout changes can run $50,000 or more. We provide a detailed estimate after assessing your specific kitchen and goals.",
        },
        {
          question: "Is cabinet painting as durable as new cabinets?",
          answer:
            "When done properly with the right primer, paint, and application method (spray, not brush), cabinet painting is highly durable and holds up well to daily kitchen use. The key is prep and product. We sand, degrease, prime, and spray your cabinets with a professional finish that cures to a hard, washable surface.",
        },
        {
          question: "How long does a kitchen remodel take?",
          answer:
            "A minor refresh (cabinet painting, countertops, and paint) typically takes one to two weeks. A full kitchen renovation with new cabinets and tile can take three to six weeks depending on the scope and the lead time on materials. We build a schedule before the project starts so you know exactly when to plan for the disruption.",
        },
        {
          question: "Do I need permits for a kitchen remodel in Maryland?",
          answer:
            "It depends on the scope. Cosmetic work (painting, cabinet painting, countertop replacement) generally does not require permits. Work that involves moving walls, changing the electrical panel configuration, or relocating plumbing typically does. We identify what needs permits during the planning phase and handle the applications on your behalf.",
        },
        {
          question: "Can you work around my existing kitchen layout, or do you do layout changes too?",
          answer:
            "Both. We can refresh your existing layout with new finishes, or we can redesign the layout entirely including moving walls, relocating the sink, adding an island, or opening the kitchen to an adjacent space. Layout changes involve additional permitting and coordination, and we walk you through all of that upfront.",
        },
        {
          question: "What countertop material do you recommend?",
          answer:
            "Quartz is our most popular recommendation for Baltimore kitchens because it is non-porous, highly durable, and available in hundreds of colors and patterns. Granite is beautiful and adds value but requires periodic sealing. Butcher block adds warmth but needs more maintenance. We will show you samples and walk through the trade-offs for your specific situation.",
        },
      ]}
      relatedServices={[
        { title: "Bathroom Remodeling", slug: "bathroom-remodeling" },
        { title: "Home Remodeling", slug: "home-remodeling" },
        { title: "Interior Painting", slug: "interior-painting" },
        { title: "Flooring", slug: "flooring" },
      ]}
      galleryCategory="Kitchen Remodeling"
    />
  );
}
