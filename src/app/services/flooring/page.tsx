import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Flooring Installation in Baltimore, MD | ${SITE.name}`,
  description:
    "Hardwood, LVP, tile, and carpet flooring installation in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
  openGraph: {
    title: `Flooring Installation in Baltimore, MD | ${SITE.name}`,
    description:
      "Hardwood, LVP, tile, and carpet flooring installation in Baltimore and surrounding Maryland counties. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/flooring`,
    images: [
      {
        url: `/api/og?title=Flooring+Installation&subtitle=Baltimore%2C+MD+%26+Surrounding+Counties`,
        width: 1200,
        height: 630,
        alt: "Flooring Installation in Baltimore, MD | Elite Finishes",
      },
    ],
  },
  alternates: { canonical: `${SITE.url}/services/flooring` },
};

export default function FlooringPage() {
  return (
    <ServicePageTemplate
      title="Flooring"
      slug="flooring"
      heroImage="/images/pexels-clickerhappy-1388944.jpg"
      heroAlt="Professional flooring installation in a Baltimore home by Elite Finishes"
      headline="Flooring Installation and Refinishing for Baltimore Area Homes"
      subheadline="Hardwood, luxury vinyl plank, tile, and carpet installation throughout your home with precise installation and minimal disruption to your daily life."
      factNugget={`${SITE.name} is a licensed flooring contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. New flooring is one of the most impactful cosmetic upgrades you can make to a home, dramatically changing how a space looks and feels. We install all major flooring types and also refinish existing hardwood floors, which is often more cost-effective than replacement.`}
      serviceOffers={[
        { name: "Hardwood Floor Installation", description: "Solid and engineered hardwood installation with nailing, gluing, and floating installation methods" },
        { name: "Hardwood Floor Refinishing", description: "Sanding, staining, and refinishing of existing hardwood floors to restore their original beauty" },
        { name: "Luxury Vinyl Plank Installation", description: "100% waterproof LVP installation in click-lock and glue-down formats" },
        { name: "Tile Flooring Installation", description: "Porcelain and ceramic tile installation for kitchens, bathrooms, and entryways" },
        { name: "Carpet Installation", description: "Carpet installation for bedrooms and lower-traffic areas with pad selection guidance" },
        { name: "Subfloor Preparation and Repair", description: "Subfloor leveling, squeaky floor repair, and structural repairs before new flooring installation" },
      ]}
      intro={[
        "New flooring changes the feel of a room more than almost any other single improvement. The right floor makes a space look larger, feel warmer, and show better. The wrong floor or a poorly installed floor creates problems for years: squeaks, gaps, uneven surfaces, and deterioration that makes the whole space feel cheap and neglected. The difference between a great floor and a mediocre one is installation quality.",
        "At Elite Finishes, we install all major flooring types and we take installation seriously. That starts with proper subfloor preparation. No new flooring should go down on a wavy, squeaky, or contaminated subfloor. We identify and address subfloor issues before installation begins so your new floors are level, solid, and quiet from day one.",
        "If your home has existing hardwood floors, refinishing is often the most cost-effective path. We sand, stain, and recoat hardwood floors to restore them to like-new condition at a fraction of the cost of replacement. Many Baltimore area homes have original hardwood floors hidden under carpet that are in excellent condition and just need a professional refinish.",
      ]}
      benefits={[
        {
          title: "Proper Subfloor Preparation",
          description:
            "New flooring is only as good as the surface underneath it. We inspect, level, and repair the subfloor before any flooring goes down. Squeaks are addressed. Waves are flattened. Moisture is checked. This is what separates an installation that lasts from one that fails.",
        },
        {
          title: "All Major Flooring Types",
          description:
            "We install solid and engineered hardwood, luxury vinyl plank, porcelain and ceramic tile, and carpet. We can also refinish existing hardwood floors. You can get all your flooring needs handled by one contractor rather than shopping specialty installers for each type.",
        },
        {
          title: "Expert Hardwood Refinishing",
          description:
            "If your home has existing hardwood floors, refinishing them is usually the smartest investment you can make. We sand, stain, and recoat floors to a factory-smooth finish at significantly less cost than replacement. Many floors under old carpet are in better shape than homeowners expect.",
        },
        {
          title: "Precise Layout and Installation",
          description:
            "We plan flooring layouts to minimize waste, center patterns in focal spaces, and ensure transitions between rooms and flooring types are clean and professional. Details matter in flooring installation, and we pay attention to them.",
        },
        {
          title: "Coordination with Painting and Remodeling",
          description:
            "Flooring works best when sequenced correctly with other renovation work. We coordinate flooring installation with your painting and remodeling projects to protect new floors during other work and ensure the right sequence of trades.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `All work is performed under our MHIC license (${SITE.license}) with full liability insurance. We handle all materials and installation to industry standards.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Free In-Home Consultation",
          description:
            "We visit your home, measure all spaces, assess your existing subfloor and any existing flooring, and discuss your material options and budget. You get a written estimate with no obligation.",
        },
        {
          step: 2,
          title: "Material Selection and Ordering",
          description:
            "We help you select the right flooring material for each space based on traffic level, moisture exposure, your aesthetic goals, and your budget. We order materials with appropriate acclimation time for wood products.",
        },
        {
          step: 3,
          title: "Subfloor Prep and Installation",
          description:
            "We prepare the subfloor, remove existing flooring as needed, and install your new flooring with precision. Hardwood refinishing projects involve sanding, staining, and multiple coats of finish with proper dry time between coats.",
        },
        {
          step: 4,
          title: "Trim, Transitions, and Cleanup",
          description:
            "We install all base trim, transition strips, and thresholds, then clean up all materials and dust. We walk through every space with you before we consider the job complete.",
        },
      ]}
      faqs={[
        {
          question: "What type of flooring is best for a Baltimore home?",
          answer:
            "It depends on the space and how you live. Luxury vinyl plank is our most popular recommendation for main living areas because it is 100 percent waterproof, durable, and available in excellent wood-look options. Hardwood is beautiful in bedrooms and formal areas. Tile is best for kitchens, bathrooms, and mudrooms. Carpet is comfortable in bedrooms and lower-traffic areas.",
        },
        {
          question: "How much does new flooring cost in Baltimore?",
          answer:
            "Flooring costs vary widely by material. Luxury vinyl plank typically runs $5 to $10 per square foot installed. Engineered hardwood runs $8 to $15 per square foot installed. Solid hardwood runs $10 to $20 per square foot installed. Tile runs $8 to $18 per square foot installed depending on tile size and layout complexity. Hardwood refinishing typically runs $3 to $6 per square foot.",
        },
        {
          question: "Can you refinish my existing hardwood floors instead of replacing them?",
          answer:
            "Yes, and in most cases we recommend refinishing if the floors have adequate thickness (at least 3/4 inch solid or 1/8 inch engineered veneer) and are in structurally sound condition. Refinishing costs significantly less than replacement and delivers equally impressive results. We assess your floors during the consultation and give you an honest recommendation.",
        },
        {
          question: "How long does flooring installation take?",
          answer:
            "A standard room (200 to 300 square feet) takes one to two days including subfloor prep, installation, and trim work. Whole-home flooring projects covering multiple rooms can take three to seven days. Hardwood refinishing projects require additional drying time between coats and typically take four to seven days from start to final coat.",
        },
        {
          question: "Is luxury vinyl plank as good as hardwood?",
          answer:
            "LVP is not hardwood, but it has significant advantages in many applications. It is 100 percent waterproof, making it appropriate for kitchens and bathrooms where hardwood is not. It is more resistant to scratching and denting in high-traffic areas. The best LVP products have realistic wood texture and are difficult to distinguish from hardwood to the untrained eye. For those who want the look of wood in moisture-prone spaces, LVP is often the right choice.",
        },
        {
          question: "Do I need to move my furniture before flooring installation?",
          answer:
            "Yes. All furniture in the rooms being done needs to be cleared before we can begin. We can assist with moving lighter pieces on the day of installation, but large or heavy furniture (pianos, antiques, large sectionals) should be arranged in advance. We will discuss logistics during the consultation so you know exactly what to prepare.",
        },
      ]}
      relatedServices={[
        { title: "Interior Painting", slug: "interior-painting" },
        { title: "Bathroom Remodeling", slug: "bathroom-remodeling" },
        { title: "Kitchen Remodeling", slug: "kitchen-remodeling" },
        { title: "Home Remodeling", slug: "home-remodeling" },
      ]}
      galleryCategory="Flooring"
    />
  );
}
