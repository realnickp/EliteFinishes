import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Bathroom Remodeling in Baltimore, MD | ${SITE.name}`,
  description:
    "Full bathroom remodeling in Baltimore and surrounding Maryland counties. Tile, vanities, fixtures, and painting all by one licensed contractor. Free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Bathroom Remodeling in Baltimore, MD | ${SITE.name}`,
    description:
      "Full bathroom remodeling in Baltimore and surrounding Maryland counties. Tile, vanities, fixtures, and painting all by one licensed contractor. Free estimates.",
    url: `${SITE.url}/services/bathroom-remodeling`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/bathroom-remodeling` },
};

export default function BathroomRemodelingPage() {
  return (
    <ServicePageTemplate
      title="Bathroom Remodeling"
      slug="bathroom-remodeling"
      heroImage="/images/pexels-artbovich-8143696.jpg"
      heroAlt="Beautifully remodeled bathroom with tile and new fixtures by Elite Finishes in Baltimore"
      headline="Bathroom Remodeling That Turns a Chore Into a Retreat"
      subheadline="Complete bathroom renovations including tile, vanities, fixtures, and painting, all handled by one licensed local contractor from demolition to final caulk."
      factNugget={`${SITE.name} is a licensed bathroom remodeling contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Bathroom remodels deliver some of the best returns of any home improvement project. A mid-range master bathroom remodel in the Baltimore market typically recoups 60 to 70 percent of its cost at resale and significantly improves your daily quality of life in the meantime.`}
      serviceOffers={[
        { name: "Full Bathroom Gut Renovation", description: "Complete bathroom demolition and rebuilding including waterproofing, tile, fixtures, and all finishes" },
        { name: "Master Bathroom Remodeling", description: "Luxury master bath upgrades with custom tile, walk-in showers, soaking tubs, and double vanities" },
        { name: "Guest Bathroom Refresh", description: "Cost-effective updates for hall and guest baths including vanity, toilet, tile, and paint" },
        { name: "Tile Shower Installation", description: "Custom tiled showers and tub surrounds with proper waterproofing membrane behind all tile work" },
        { name: "Vanity and Fixture Replacement", description: "Vanity, sink, toilet, and faucet removal and installation" },
        { name: "Bathroom Painting", description: "Walls, ceiling, and trim painted with moisture-resistant formulas rated for bathroom environments" },
      ]}
      intro={[
        "Your bathroom is where you start and end every day. An outdated, cramped, or deteriorating bathroom affects your mood every single morning. A well-designed, properly executed bathroom remodel changes that. It does not need to be a luxury spa to make a real difference in how you feel in your home. It just needs to be done right.",
        "At Elite Finishes, we handle all phases of bathroom remodeling in-house. That means one contractor manages your demolition, waterproofing, tile work, carpentry, plumbing coordination, painting, and all finishing details. You do not have to juggle a tile setter, a plumber, a painter, and a carpenter and hope they all show up in the right sequence. We coordinate it all and deliver a finished product.",
        "Waterproofing is the part most bathroom remodelers get wrong. Every tiled shower and wet area needs a proper waterproofing membrane behind the tile before any tile is set. Skipping this step leads to water damage behind walls within a few years. It is invisible once the tile is on, which is why so many contractors cut this corner. We never do.",
      ]}
      benefits={[
        {
          title: "Proper Waterproofing Every Time",
          description:
            "We install a continuous waterproofing membrane behind every tiled shower and wet area before a single tile goes up. This is the most important step in any bathroom remodel and the one most commonly skipped by contractors trying to move fast.",
        },
        {
          title: "One Contractor, No Coordination Headaches",
          description:
            "We manage demolition, waterproofing, tile, carpentry, painting, and trade coordination all under one contract. You have one contact, one schedule, and one team responsible for everything from first demo to final caulk.",
        },
        {
          title: "Custom Tile Work Done Right",
          description:
            "Tile layout, cutting, and setting requires a steady hand and a careful eye. Our crew works from a planned layout, cuts with precision, and sets tile plumb, level, and evenly spaced throughout the entire installation.",
        },
        {
          title: "Honest Material Recommendations",
          description:
            "We help you choose materials that fit your budget and perform well in bathroom environments. Porcelain tile for durability. Solid-surface or cultured marble for easy-clean vanity tops. Exhaust fan upgrades to prevent future moisture damage. Practical advice, not upselling.",
        },
        {
          title: "Moisture-Resistant Paint Throughout",
          description:
            "Bathroom walls and ceilings need moisture-resistant paint formulas to prevent peeling, mildew, and staining. We select the right product for each surface and apply it properly so your painted surfaces hold up as well as your tile.",
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
            "We walk through your bathroom, assess the existing conditions, and discuss your goals and budget. We present options with clear pricing so you can make an informed decision. Written estimate provided with no obligation.",
        },
        {
          step: 2,
          title: "Planning and Material Selection",
          description:
            "We finalize your tile selection, vanity, fixtures, hardware, and paint colors. We coordinate material ordering and build a project schedule that minimizes the time your bathroom is out of service.",
        },
        {
          step: 3,
          title: "Demolition and Installation",
          description:
            "We remove existing tile, fixtures, and vanity, inspect and address any underlying moisture damage or rot, then install waterproofing, cement board, tile, vanity, and all fixtures in the proper sequence.",
        },
        {
          step: 4,
          title: "Painting, Caulking, and Walkthrough",
          description:
            "We paint walls, ceiling, and trim, grout and seal all tile, caulk every joint, install hardware and accessories, and do a complete walkthrough with you to confirm every detail is right before we close the job.",
        },
      ]}
      faqs={[
        {
          question: "How much does a bathroom remodel cost in Baltimore?",
          answer:
            "A basic guest bathroom refresh (new vanity, toilet, tile surround, and paint) typically runs $5,000 to $12,000. A mid-range full bathroom renovation runs $15,000 to $35,000. A luxury master bathroom with custom tile, a walk-in shower, soaking tub, and high-end fixtures can run $40,000 or more. We provide a detailed estimate after seeing your specific bathroom.",
        },
        {
          question: "How long does a bathroom remodel take?",
          answer:
            "A full bathroom gut renovation typically takes two to three weeks once work begins. A more limited refresh (vanity, toilet, paint, no tile work) can be done in three to five days. We give you a specific schedule before the project starts so you can plan for the disruption and arrange alternative bathroom access if needed.",
        },
        {
          question: "Do I need permits for a bathroom remodel in Maryland?",
          answer:
            "Work that involves moving plumbing, adding a new exhaust fan circuit, or making structural changes typically requires permits. Cosmetic work (tile, vanity swap, paint) generally does not. We identify what requires permits during the planning phase and handle the applications on your behalf at no extra charge.",
        },
        {
          question: "Why is waterproofing so important in a shower remodel?",
          answer:
            "Tile is not waterproof. Grout is not waterproof. Water that gets through tile and grout must be stopped by the membrane behind it. Without a proper waterproofing layer, water penetrates the wall and destroys the framing and drywall behind the tile. This damage is invisible until it causes serious structural problems. A proper waterproofing membrane is essential and is included in every shower and wet area we tile.",
        },
        {
          question: "Can you work around a tight bathroom layout?",
          answer:
            "Yes. Most Baltimore rowhouses and older homes have small bathrooms with limited reconfiguration options. We are experienced in maximizing the function and feel of tight spaces through smart tile selection, vanity sizing, mirror placement, and lighting. We can also tell you when moving a wall or relocating plumbing is worth the added cost for your particular space.",
        },
        {
          question: "How do I choose the right tile for my bathroom?",
          answer:
            "For floor tile, we recommend a matte or textured porcelain with a slip-resistant surface, at least a PEI rating of 4 for floor applications. For shower walls, large-format porcelain or ceramic tile reduces grout lines and is easier to keep clean. We bring samples and can discuss specific products that work well in Maryland bathrooms during your free consultation.",
        },
      ]}
      relatedServices={[
        { title: "Kitchen Remodeling", slug: "kitchen-remodeling" },
        { title: "Home Remodeling", slug: "home-remodeling" },
        { title: "Flooring", slug: "flooring" },
        { title: "Interior Painting", slug: "interior-painting" },
      ]}
      galleryCategory="Bathroom Remodeling"
    />
  );
}
