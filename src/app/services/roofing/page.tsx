import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Services in Baltimore, MD | ${SITE.name}`,
  description:
    "Expert roof repairs and replacements for Baltimore area homeowners. Licensed Maryland roofing contractor with warranty-backed installations. Free estimates.",
  openGraph: {
    title: `Roofing Services in Baltimore, MD | ${SITE.name}`,
    description:
      "Expert roof repairs and replacements for Baltimore area homeowners. Licensed Maryland roofing contractor with warranty-backed installations. Free estimates.",
    url: `${SITE.url}/services/roofing`,
    images: [
      {
        url: `/api/og?title=Roofing+Services&subtitle=Baltimore%2C+MD+%26+Surrounding+Counties`,
        width: 1200,
        height: 630,
        alt: "Roofing Services in Baltimore, MD | Elite Finishes",
      },
    ],
  },
  alternates: { canonical: `${SITE.url}/services/roofing` },
};

export default function RoofingPage() {
  return (
    <ServicePageTemplate
      title="Roofing"
      slug="roofing"
      heroImage="/images/roofing-crew-shingles.jpg"
      heroAlt="Roofing crew installing shingles on a residential home in the Baltimore area"
      headline="Reliable Roof Repairs and Replacements for Baltimore Area Homes"
      subheadline="From storm damage repairs to full roof replacements, we protect your biggest investment with quality materials, expert installation, and warranties you can count on."
      factNugget={`${SITE.name} is a licensed roofing contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We install GAF, CertainTeed, and Owens Corning shingle systems with ice and water shield, proper ridge ventilation, and manufacturer warranties up to 50 years. Most replacements are completed in one to three days, and we handle insurance claim documentation for storm damage.`}
      serviceOffers={[
        { name: "Roof Replacement", description: "Full tear-off and re-roof with architectural or impact-resistant shingles" },
        { name: "Roof Repair", description: "Targeted repair of missing shingles, flashing, pipe boots, and leak points" },
        { name: "Storm Damage Restoration", description: "Insurance-documented storm damage repair with adjuster coordination" },
        { name: "Attic Ventilation Improvement", description: "Ridge vent, soffit vent, and baffle installation to prevent ice dams and reduce cooling costs" },
      ]}
      intro={[
        "Your roof takes the worst of what Maryland dishes out. Nor'easters, summer thunderstorms, ice dams, UV exposure, and the humidity that accelerates wear on shingles and flashing. When your roof starts showing its age or takes a hit from a storm, you need a contractor who understands the specific challenges Baltimore area homes face, not a crew chasing storm work from out of state.",
        "Elite Finishes is a local, licensed roofing contractor that lives and works right here in the Baltimore area. We have repaired and replaced roofs across Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We know which shingle systems hold up best against the Chesapeake Bay's coastal humidity, how to properly ventilate attics to prevent ice damming, and how to navigate your insurance claim if storm damage is involved.",
        "Whether you need a few missing shingles replaced after a wind event, a full tear-off and re-roof with architectural shingles, or a proactive upgrade to improve your home's energy efficiency, we deliver honest assessments, transparent pricing, and workmanship backed by both manufacturer and labor warranties.",
      ]}
      benefits={[
        {
          title: "Local Storm Damage Expertise",
          description:
            "We know how Maryland storms damage roofs, from wind-lifted shingles to hail bruising. We document everything properly to support your insurance claim and get the work approved efficiently.",
        },
        {
          title: "Premium Material Options",
          description:
            "We install GAF, CertainTeed, and Owens Corning shingle systems including architectural and impact-resistant lines. We help you choose the right product for your budget and performance needs.",
        },
        {
          title: "Proper Ventilation and Ice Dam Prevention",
          description:
            "We assess and correct attic ventilation as part of every roof replacement, reducing ice dam risk in winter and cutting cooling costs in summer. This is a critical detail many roofers skip.",
        },
        {
          title: "Manufacturer and Labor Warranties",
          description:
            "Our installations qualify for manufacturer warranties up to 50 years on materials, and we back our labor with our own warranty. Your roof is protected long after we leave.",
        },
        {
          title: "Clean, Respectful Job Sites",
          description:
            "We use tarps and magnetic nail sweepers to protect your landscaping, siding, and driveway. Your property looks as good when we leave as it did when we arrived.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `We carry general liability and workers' compensation insurance and hold MHIC license ${SITE.license}. Your project is backed by Maryland's consumer protection guaranty fund.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Roof Inspection and Assessment",
          description:
            "We perform a thorough inspection of your roof, attic, and ventilation system, checking for damaged shingles, deteriorated flashing, soft decking, and signs of leaks. You get a written report with photos documenting every issue.",
        },
        {
          step: 2,
          title: "Estimate and Material Selection",
          description:
            "Based on the inspection, we provide a detailed estimate covering materials, labor, and any structural repairs. We walk you through shingle options, color choices, and warranty tiers so you can make an informed decision.",
        },
        {
          step: 3,
          title: "Tear-Off and Installation",
          description:
            "We strip the old roofing down to the deck, replace any damaged plywood or OSB, install ice and water shield in valleys and eaves, and lay your new shingle system with proper starter strips, flashing, and ridge ventilation.",
        },
        {
          step: 4,
          title: "Final Inspection and Warranty",
          description:
            "After installation, we do a complete walk-around and attic check to verify every detail. We clean up all debris, run magnetic nail sweeps, and provide your warranty documentation along with maintenance recommendations.",
        },
      ]}
      faqs={[
        {
          question: "How do I know if my roof needs repair or a full replacement?",
          answer:
            "If your roof is under 15 years old and the damage is localized, a repair is usually the right call. If your roof is 20 or more years old, has widespread granule loss, curling shingles, or multiple leak points, a full replacement is almost always more cost-effective than continued patching. We give you an honest recommendation either way.",
        },
        {
          question: "Will you work with my insurance company on a storm damage claim?",
          answer:
            "Yes. We document all storm damage with photos and detailed reports, meet with your insurance adjuster on-site if needed, and provide a scope of work that aligns with what your policy covers. We have helped many Baltimore area homeowners navigate the claims process smoothly.",
        },
        {
          question: "How long does a roof replacement take?",
          answer:
            "Most residential roof replacements are completed in one to three days depending on the size of the home, weather conditions, and whether any decking needs to be replaced. We never leave your home exposed overnight. If we start a tear-off, we finish or secure the area before we leave.",
        },
        {
          question: "What type of shingles do you recommend for Baltimore area homes?",
          answer:
            "For homes in the Baltimore area, we typically recommend architectural shingles rated for 130-plus mph winds with algae-resistant granules to combat the humidity. GAF Timberline HDZ and CertainTeed Landmark are two of our standard products. For areas prone to hail, we can upgrade to impact-resistant Class 4 shingles.",
        },
        {
          question: "Do I need a permit for a roof replacement in Maryland?",
          answer:
            "Yes. Most Maryland jurisdictions require a building permit for roof replacements. We handle the permit application, inspection scheduling, and final sign-off as part of your project at no extra charge.",
        },
        {
          question: "How much does a new roof cost in the Baltimore area?",
          answer:
            "A typical asphalt shingle roof replacement for an average-sized Baltimore area home ranges from $8,000 to $15,000 depending on roof size, pitch, accessibility, material choice, and whether any decking or structural repairs are needed. We provide itemized estimates so you see exactly what you are paying for.",
        },
      ]}
      relatedServices={[
        { title: "Siding", slug: "siding" },
        { title: "Exterior Painting", slug: "exterior-painting" },
        { title: "Decks", slug: "decks" },
        { title: "Concrete and Masonry", slug: "concrete-and-masonry" },
      ]}
      galleryCategory="Roofing"
    />
  );
}
