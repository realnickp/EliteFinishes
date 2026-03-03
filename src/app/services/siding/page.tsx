import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Siding Installation in Baltimore, MD | ${SITE.name}`,
  description:
    "Vinyl, fiber cement, and composite siding installation in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Siding Installation in Baltimore, MD | ${SITE.name}`,
    description:
      "Vinyl, fiber cement, and composite siding installation in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/siding`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/siding` },
};

export default function SidingPage() {
  return (
    <ServicePageTemplate
      title="Siding"
      slug="siding"
      heroImage="/images/pexels-binyaminmellish-1396122.jpg"
      heroAlt="Craftsman home with new fiber cement board-and-batten siding in Maryland"
      headline="Siding Installation That Protects Your Home for Decades"
      subheadline="Vinyl, fiber cement, and composite siding installation for Baltimore area homes with full removal of old siding, proper housewrap, and precision installation."
      factNugget={`${SITE.name} is a licensed siding contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. New siding consistently ranks among the top return-on-investment home improvement projects nationally, recovering 75 to 90 percent of cost at resale. Fiber cement siding like James Hardie is particularly well-suited for Maryland's climate, offering resistance to moisture, insects, rot, and the UV exposure that degrades cheaper vinyl.`}
      serviceOffers={[
        { name: "Vinyl Siding Installation", description: "Full installation of insulated and standard vinyl siding with proper drainage plane and trim work" },
        { name: "Fiber Cement Siding Installation", description: "James Hardie and other fiber cement siding installation with factory-primed or pre-finished options" },
        { name: "Composite Siding Installation", description: "Premium composite siding products including LP SmartSide installation" },
        { name: "Partial Siding Replacement", description: "Targeted replacement of damaged or deteriorated sections of existing siding" },
        { name: "Siding Trim and Soffit Work", description: "Fascia, soffit, corner board, and trim installation and replacement" },
      ]}
      intro={[
        "Your siding is the primary barrier between your home's structure and the elements. When it starts to fail, whether from age, impact damage, moisture intrusion, or just the accumulated effect of Baltimore's freeze-thaw cycles and summer heat, the consequences extend well beyond aesthetics. Water gets behind siding that has failed and begins damaging the sheathing, insulation, and framing behind it. By the time you see the visible damage, the hidden damage is often significant.",
        "At Elite Finishes, we install siding correctly. That means full removal of the old siding (not installing over it), inspection of the sheathing beneath for moisture damage, installation of a continuous drainage plane (housewrap or similar) to manage any water that gets past the siding, proper integration with windows and doors, and precise installation of each course with correct overlap and fastening. Details matter in siding installation, and shortcuts in this work create long-term problems.",
        "We work with vinyl, fiber cement, and composite siding products and will help you choose the right material for your home's architecture, your neighborhood's aesthetic standards, and your budget. Fiber cement products like James Hardie are particularly well-suited for Maryland's climate and are our most common recommendation for homeowners making a long-term investment.",
      ]}
      benefits={[
        {
          title: "Full Removal and Inspection",
          description:
            "We remove all existing siding before installation and inspect the sheathing beneath for moisture damage, rot, and insulation problems. Installing new siding over old siding without inspection hides problems that continue to get worse.",
        },
        {
          title: "Proper Drainage Plane Installation",
          description:
            "Every siding installation includes a continuous housewrap or drainage plane layer behind the siding to manage water that gets past the cladding. This is essential for long-term performance and is not optional.",
        },
        {
          title: "Premium Material Options",
          description:
            "We install vinyl, fiber cement, and composite siding products at multiple price points. We will explain the trade-offs in durability, maintenance requirements, and appearance honestly so you make a decision that fits your goals and budget.",
        },
        {
          title: "Window and Door Integration",
          description:
            "Every window and door must be properly flashed and integrated into the siding system. This is where most moisture intrusion problems start and where most installation shortcuts happen. We detail every opening correctly.",
        },
        {
          title: "Curb Appeal and Resale Value",
          description:
            "New siding is consistently rated among the top return-on-investment exterior projects. In the Baltimore market, homes with dated or deteriorating siding sell for less and sit longer. New siding is one of the most visible improvements you can make.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `All work is performed under our MHIC license (${SITE.license}) with full liability insurance. We handle permits where required and ensure all work meets Maryland residential construction standards.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Free Exterior Assessment and Estimate",
          description:
            "We inspect your existing siding, look for evidence of moisture intrusion, and assess the condition of the substrate beneath. You get a written estimate with material options and clear pricing.",
        },
        {
          step: 2,
          title: "Material Selection and Planning",
          description:
            "We help you select the right siding product, profile, and color for your home. We order materials with appropriate lead time and schedule the project around material delivery.",
        },
        {
          step: 3,
          title: "Removal, Inspection, and Moisture Management",
          description:
            "We remove all existing siding, inspect and repair any sheathing damage, install housewrap or drainage plane, and address any window and door flashing deficiencies before new siding goes on.",
        },
        {
          step: 4,
          title: "Siding Installation, Trim, and Cleanup",
          description:
            "We install siding courses, integrate all windows and doors, install all trim and soffit work, and clean up all debris. We walk the entire exterior with you before signing off on the project.",
        },
      ]}
      faqs={[
        {
          question: "How much does new siding cost in Baltimore?",
          answer:
            "Vinyl siding installation on a typical single-family home typically runs $8,000 to $18,000. Fiber cement siding (James Hardie) runs $15,000 to $35,000 for a typical home due to higher material cost and more labor-intensive installation. Composite siding falls between the two. We provide detailed pricing after assessing your home's specific size and conditions.",
        },
        {
          question: "What siding material is best for Maryland's climate?",
          answer:
            "Fiber cement (James Hardie and similar products) is our top recommendation for most Maryland homes. It does not rot, does not attract insects, does not warp in heat or cold, and holds paint extremely well. High-quality insulated vinyl siding is a more cost-effective option that performs well in most applications. We will help you weigh the trade-offs for your specific situation.",
        },
        {
          question: "How long does siding installation take?",
          answer:
            "A typical single-family home takes one to two weeks for a full siding replacement including removal, sheathing repairs, housewrap, and installation of all siding and trim. Larger homes or those with complex architectural details can take longer. We provide a project timeline before work begins.",
        },
        {
          question: "Do I need a permit for siding replacement in Maryland?",
          answer:
            "Requirements vary by jurisdiction in Maryland. Many municipalities require a permit for full siding replacement. We determine what is required in your jurisdiction during the planning phase and handle any permit applications on your behalf.",
        },
        {
          question: "Can you install new siding over my existing siding?",
          answer:
            "Technically it can be done, but we do not recommend it and generally will not do it. Installing new siding over old siding traps moisture, prevents inspection of the sheathing for damage, and adds weight and thickness that affects window and door trim details. Full removal is almost always the right approach.",
        },
        {
          question: "How long does fiber cement siding last?",
          answer:
            "Fiber cement siding from manufacturers like James Hardie is typically warranted for 30 years and commonly lasts 50 years or more with proper paint maintenance. The paint on fiber cement siding needs to be refreshed every 10 to 15 years to maintain its weather resistance and appearance. This is one of the most durable siding options available.",
        },
      ]}
      relatedServices={[
        { title: "Roofing", slug: "roofing" },
        { title: "Exterior Painting", slug: "exterior-painting" },
        { title: "Decks", slug: "decks" },
        { title: "Home Remodeling", slug: "home-remodeling" },
      ]}
      galleryCategory="Siding"
    />
  );
}
