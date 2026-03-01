import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Concrete and Masonry in Baltimore, MD | ${SITE.name}`,
  description:
    "Concrete slabs, steps, patios, and masonry repair in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
  openGraph: {
    title: `Concrete and Masonry in Baltimore, MD | ${SITE.name}`,
    description:
      "Concrete slabs, steps, patios, and masonry repair in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/concrete-and-masonry`,
    images: [
      {
        url: `${SITE.url}/api/og?title=Concrete+and+Masonry&subtitle=Baltimore%2C+MD+%26+Surrounding+Counties`,
        width: 1200,
        height: 630,
        alt: "Concrete and Masonry in Baltimore, MD | Elite Finishes",
      },
    ],
  },
  alternates: { canonical: `${SITE.url}/services/concrete-and-masonry` },
};

export default function ConcreteAndMasonryPage() {
  return (
    <ServicePageTemplate
      title="Concrete and Masonry"
      slug="concrete-and-masonry"
      heroImage="/images/roofing-shingles.jpg"
      heroAlt="Concrete and masonry work on a Baltimore area home by Elite Finishes"
      headline="Concrete and Masonry Work Built to Last"
      subheadline="Concrete slabs, steps, walkways, patios, and masonry repair and tuck-pointing for Baltimore area homes, done right the first time."
      factNugget={`${SITE.name} is a licensed concrete and masonry contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Baltimore's freeze-thaw climate is particularly hard on concrete and masonry. Proper mix design, installation technique, and curing are essential for longevity. Cutting corners on concrete work creates surfaces that scale, crack, and deteriorate rapidly in Maryland winters.`}
      serviceOffers={[
        { name: "Concrete Slab Installation", description: "Poured concrete slabs for patios, garages, sheds, and utility areas with proper base preparation" },
        { name: "Concrete Steps and Stoops", description: "New concrete step construction and deteriorated step removal and replacement" },
        { name: "Concrete Walkways and Paths", description: "Concrete walkway installation with control joints and appropriate finishing" },
        { name: "Masonry Repair and Tuck-Pointing", description: "Mortar joint repointing, crack repair, and spalling brick restoration" },
        { name: "Brick and Block Work", description: "Brick and concrete block wall construction, repair, and rebuilding" },
        { name: "Concrete Patios", description: "Broom-finished and decorative concrete patio installation" },
      ]}
      intro={[
        "Baltimore's weather is brutal on concrete and masonry. Winter freeze-thaw cycles expand water in cracks and joints, accelerating deterioration. Improper installation speeds this process dramatically. Concrete poured without proper base compaction, with the wrong water-to-cement ratio, or without adequate control joints will crack and scale within a few winters. Masonry with failed mortar joints allows water behind the brick, causing spalling, structural issues, and interior moisture damage.",
        "At Elite Finishes, we install concrete the right way: properly compacted gravel base, correctly formulated mix, appropriate thickness for the load, control joints placed to manage cracking, and proper curing time. We do not rush concrete work because we know the consequences of shortcuts. A properly installed concrete surface in Maryland should last 30 to 50 years. A poorly installed one starts failing in two to three.",
        "For masonry, we repair what can be saved and replace what cannot. Tuck-pointing is one of the most important maintenance tasks for Baltimore's brick rowhouses and older homes. When mortar joints deteriorate, water infiltrates behind the brick and causes serious damage over time. Addressing mortar joints while the brick is still in good condition is far less expensive than waiting until the structure is compromised.",
      ]}
      benefits={[
        {
          title: "Proper Mix Design for Maryland Winters",
          description:
            "We specify and use concrete mixes formulated for Maryland's freeze-thaw climate, with appropriate air entrainment and water-to-cement ratios. The mix matters as much as the installation for long-term performance.",
        },
        {
          title: "Correct Base Preparation",
          description:
            "No concrete is better than its base. We compact granular fill to the appropriate depth, verify proper drainage slope, and ensure the subgrade is uniform before any concrete is placed. This prevents differential settlement and premature cracking.",
        },
        {
          title: "Control Joints That Actually Work",
          description:
            "Concrete cracks. The question is whether it cracks where you want it to (at control joints) or where it wants to (randomly across the slab). We plan and install control joints at correct intervals so any cracking is controlled and predictable.",
        },
        {
          title: "Expert Tuck-Pointing and Masonry Repair",
          description:
            "We match mortar color and composition to your existing masonry, remove deteriorated mortar to the correct depth, and pack new mortar in a way that bonds properly and protects the brick for years to come.",
        },
        {
          title: "Structural Assessment Before Repairs",
          description:
            "We assess the underlying cause of masonry distress before we repair it. Repointing over a structural settlement problem without addressing the cause is a cosmetic fix that fails quickly. We identify root causes and recommend appropriate solutions.",
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
          title: "Assessment and Estimate",
          description:
            "We visit your property, assess the existing conditions, measure the project area, and identify any drainage, structural, or base preparation concerns. You get a written estimate with clear scope and pricing.",
        },
        {
          step: 2,
          title: "Planning and Permitting",
          description:
            "We finalize the project plan, apply for any required permits, and schedule work around cure time requirements. Some concrete projects require 28-day cure before loading, which we account for in the schedule.",
        },
        {
          step: 3,
          title: "Demolition and Base Preparation",
          description:
            "We remove and haul away existing concrete or deteriorated masonry as needed, excavate to appropriate depth, and compact a proper granular base before any new concrete or masonry work begins.",
        },
        {
          step: 4,
          title: "Installation, Finishing, and Curing",
          description:
            "We place, finish, and cure concrete with the care it requires. Masonry work is pointed, tooled, and cleaned. All debris is removed and the area is left clean and safe before we leave.",
        },
      ]}
      faqs={[
        {
          question: "How much do new concrete steps cost in Baltimore?",
          answer:
            "A standard set of concrete steps (three to five risers) typically runs $1,500 to $4,000 depending on the width, number of risers, and whether a landing is included. Steps that require removal of the existing steps, significant base preparation, or railing installation will be on the higher end. We provide exact pricing after assessing your specific situation.",
        },
        {
          question: "How long does concrete take to cure?",
          answer:
            "Concrete achieves initial set within a few hours and is generally safe for foot traffic within 24 hours. It reaches 70 percent of its design strength within seven days and full strength at 28 days. For driveways and any areas subject to vehicle loading, we recommend waiting the full 28-day cure before driving on the surface.",
        },
        {
          question: "Why is my concrete cracking?",
          answer:
            "Some cracking in concrete is normal and expected. The question is whether it is hairline cracking at control joints (acceptable) or random structural cracking that indicates a problem. Common causes of problematic cracking include inadequate base preparation, poor mix design, missing control joints, and freeze-thaw damage from improper air entrainment. We assess cracks during our inspection and tell you honestly what you are looking at.",
        },
        {
          question: "What is tuck-pointing and do I need it?",
          answer:
            "Tuck-pointing is the process of removing deteriorated mortar from brick or stone joints and replacing it with fresh mortar. You need it when mortar joints show crumbling, gaps, or open cracks. Failing mortar allows water behind the brick, which causes spalling, interior moisture damage, and eventually structural problems. The earlier you address failing mortar, the less expensive the fix.",
        },
        {
          question: "How long does a concrete patio last in Maryland?",
          answer:
            "A properly installed concrete patio with the right mix, adequate base, and proper control joints should last 30 to 50 years in Maryland with minimal maintenance. The biggest risk factor is improper installation, which can lead to rapid scaling and cracking within a few winters. Deicing salts also accelerate deterioration, so we recommend using sand instead of salt on concrete surfaces in winter.",
        },
        {
          question: "Can you repair cracked concrete, or does it need to be replaced?",
          answer:
            "It depends on the type and extent of the damage. Hairline surface cracks can often be filled and sealed effectively. Structural cracking, significant spalling, or a slab that has settled or heaved typically requires replacement. We assess every situation individually and give you an honest recommendation. We never push for replacement when repair is the appropriate solution.",
        },
      ]}
      relatedServices={[
        { title: "Decks", slug: "decks" },
        { title: "Roofing", slug: "roofing" },
        { title: "Siding", slug: "siding" },
        { title: "Exterior Painting", slug: "exterior-painting" },
      ]}
      galleryCategory="Concrete and Masonry"
    />
  );
}
