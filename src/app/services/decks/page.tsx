import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Deck Building in Baltimore, MD | ${SITE.name}`,
  description:
    "Custom composite and wood deck building in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates. Expand your outdoor living space today.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Deck Building in Baltimore, MD | ${SITE.name}`,
    description:
      "Custom composite and wood deck building in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates. Expand your outdoor living space today.",
    url: `${SITE.url}/services/decks`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Deck Building in Baltimore, MD | ${SITE.name}`,
    description:
      "Custom composite and wood deck building in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates. Expand your outdoor living space today.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  keywords: ["deck building Baltimore", "deck contractor Baltimore MD", "composite deck Maryland", "deck installation Baltimore County", "Trex deck Baltimore", "custom deck builder Baltimore", "deck company Maryland", "Elite Finishes decks"],
  alternates: { canonical: `${SITE.url}/services/decks` },
};

export default function DecksPage() {
  return (
    <ServicePageTemplate
      title="Decks"
      slug="decks"
      heroImage="/images/pexels-curtis-adams-7601167.jpg"
      heroAlt="Newly built screened deck with composite decking and railings on a Maryland home"
      headline="Custom Decks That Turn Your Backyard Into a Destination"
      subheadline="From intimate elevated platforms to full outdoor living spaces with built-in seating, we design and build decks that stand up to Maryland's humidity, rain, and snow."
      factNugget={`${SITE.name} is a licensed deck contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We build custom decks using pressure-treated framing rated for ground contact and stainless steel fasteners selected specifically for the Chesapeake Bay region's humidity and salt air. All permits and inspections are handled in-house. A typical 350 square foot deck takes one to two weeks to build.`}
      serviceOffers={[
        { name: "Composite Deck Building", description: "Trex, TimberTech, and Azek composite deck construction with manufacturer warranty" },
        { name: "Pressure-Treated Wood Decks", description: "Traditional wood deck building with pressure-treated pine or cedar" },
        { name: "Multi-Level Deck Design", description: "Custom multi-level and wraparound deck layouts with built-in seating and planters" },
        { name: "Deck Board Replacement", description: "Re-decking with new boards on structurally sound existing frames" },
        { name: "Pergola and Shade Structure Integration", description: "Pergolas and shade structures built into new or existing deck designs" },
      ]}
      intro={[
        "A great deck changes how you use your home. It is where Saturday morning coffee happens, where the grill lives from April through October, and where your kids actually want to spend time. In the Baltimore area, where you get a solid six to eight months of outdoor living, a well-built deck is one of the highest-return improvements you can make for both daily enjoyment and resale value.",
        "At Elite Finishes, we build decks engineered for the Chesapeake Bay region. That means pressure-treated framing rated for ground contact, stainless steel fasteners that will not streak your decking, and decking materials chosen specifically for Maryland's humidity and UV exposure. Whether you want the warmth of natural hardwood, the low maintenance of composite, or the premium feel of capped PVC, we help you choose the right material and design a layout that fits your house, your yard, and your lifestyle.",
        "We handle everything from the initial design through county permits, construction, and final inspection. Our builds meet or exceed local building codes for structural integrity and safety, and we stand behind our work. If you are ready to stop looking at your backyard and start living in it, let us talk.",
      ]}
      benefits={[
        {
          title: "Built for Maryland Weather",
          description:
            "We use materials and fasteners rated for the Chesapeake Bay climate, including high humidity, heavy rain, freeze-thaw cycles, and intense summer UV. Your deck will not warp, rot, or fade like the bargain builds that start falling apart in three years.",
        },
        {
          title: "Composite and Wood Options",
          description:
            "Choose from Trex, TimberTech, or Azek composites for near-zero maintenance, or go with pressure-treated pine, cedar, or ipe hardwood for a natural look. We lay out the cost, lifespan, and upkeep differences so you make an informed choice.",
        },
        {
          title: "Custom Designs, Not Cookie-Cutters",
          description:
            "Multi-level layouts, wraparound designs, built-in benches, planter boxes, pergola integration, and cable railing. We design around your home's architecture and your family's lifestyle, not a one-size-fits-all template.",
        },
        {
          title: "Strong Return on Investment",
          description:
            "Deck additions consistently recoup 65 to 75 percent of their cost at resale in the Mid-Atlantic market. In desirable Baltimore area neighborhoods, outdoor living space is a major selling point for buyers.",
        },
        {
          title: "Code-Compliant Construction",
          description:
            "Every deck meets local building codes for structural load, railing height, stair dimensions, and ledger board attachment. We pull permits, schedule inspections, and make sure everything passes the first time.",
        },
        {
          title: "Clean, Respectful Job Sites",
          description:
            "We protect your landscaping, clean up every day, and haul away all debris when the job is done. Your yard will look better after we leave, not like a construction zone.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Design Consultation",
          description:
            "We visit your home, measure the build area, evaluate attachment points on your house, and discuss your vision including size, shape, features, and materials. You get a design concept and a detailed estimate with no obligation.",
        },
        {
          step: 2,
          title: "Permits and Material Selection",
          description:
            "We prepare structural drawings, submit the permit application, and finalize your material choices. Once the permit is approved, we order materials and lock in your build date.",
        },
        {
          step: 3,
          title: "Build and Framing",
          description:
            "Our crew sets the posts, installs the ledger board and beams, and frames the entire deck structure using hot-dipped galvanized or stainless hardware at every connection point. Framing is inspected before we move to decking.",
        },
        {
          step: 4,
          title: "Finish and Inspection",
          description:
            "We install the decking boards, railings, stairs, and any custom features like built-in seating or lighting. The inspector signs off on the completed structure, and we do a final walkthrough with you to make sure every detail is right.",
        },
      ]}
      faqs={[
        {
          question: "Should I go with composite or pressure-treated wood?",
          answer:
            "Composite costs more upfront but requires almost no maintenance. No staining, no sealing, no sanding. Pressure-treated wood is significantly cheaper to install but needs staining or sealing every one to two years to prevent rot and graying. For most Baltimore area homeowners who do not want to spend weekends on deck maintenance, composite pays for itself within five to seven years.",
        },
        {
          question: "How long does it take to build a deck?",
          answer:
            "A standard 300 to 400 square foot deck takes about one to two weeks from the start of construction. Larger or multi-level decks with custom features can take two to three weeks. Permitting adds two to six weeks before construction begins depending on the jurisdiction's review schedule.",
        },
        {
          question: "Do I need a permit to build a deck in Maryland?",
          answer:
            "Yes. Most Maryland jurisdictions require a building permit for any attached or freestanding deck. The permit ensures the structure meets code for safety and structural integrity. We handle the entire permit process as part of your project.",
        },
        {
          question: "How much does a new deck cost in the Baltimore area?",
          answer:
            "A pressure-treated wood deck typically runs $30 to $45 per square foot installed. Composite decks range from $45 to $75 per square foot depending on the brand and railing style. A typical 350 square foot deck costs between $10,500 and $26,000. We provide exact pricing after the on-site consultation.",
        },
        {
          question: "Can you replace my old deck boards without rebuilding the frame?",
          answer:
            "Sometimes. If the existing frame is structurally sound and meets current code, we can remove the old decking and install new boards on the existing structure. We inspect every joist, beam, and connection before making that call. If the frame has rot or does not meet code, we recommend a full rebuild for your safety.",
        },
        {
          question: "What is the best time of year to build a deck in Maryland?",
          answer:
            "Spring and fall are ideal for construction, but we build year-round in appropriate weather. The best strategy is to start the design and permitting process in late winter so construction can begin as soon as the weather breaks. That way you are enjoying your new deck by Memorial Day.",
        },
      ]}
      relatedServices={[
        { title: "Siding", slug: "siding" },
        { title: "Roofing", slug: "roofing" },
        { title: "Concrete and Masonry", slug: "concrete-and-masonry" },
        { title: "Home Remodeling", slug: "home-remodeling" },
      ]}
      galleryCategory="Decks"
    />
  );
}
