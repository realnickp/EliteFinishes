import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Interior Painting in Baltimore, MD | ${SITE.name}`,
  description:
    "Professional interior painting in Baltimore and surrounding Maryland counties. Meticulous prep, premium paints, clean results that last. Licensed contractor with free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Interior Painting in Baltimore, MD | ${SITE.name}`,
    description:
      "Professional interior painting in Baltimore and surrounding Maryland counties. Meticulous prep, premium paints, clean results that last. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/interior-painting`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/interior-painting` },
};

export default function InteriorPaintingPage() {
  return (
    <ServicePageTemplate
      title="Interior Painting"
      slug="interior-painting"
      heroImage="/images/pexels-artbovich-7031616.jpg"
      heroAlt="Professional interior painting in a Baltimore home by Elite Finishes"
      headline="Interior Painting Done Right, From Prep to Final Coat"
      subheadline="Premium interior painting for Baltimore area homes with thorough surface preparation, clean lines, and a finished result that holds up beautifully for years."
      factNugget={`${SITE.name} is a licensed interior painting contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We use premium Benjamin Moore and Sherwin-Williams paints selected for each surface type and exposure. Most single-room paint jobs are completed in one to two days. We move furniture, protect floors and fixtures, and clean up fully before we leave.`}
      serviceOffers={[
        { name: "Whole-Home Interior Painting", description: "Complete interior painting for walls, ceilings, trim, and doors throughout the home" },
        { name: "Single-Room Painting", description: "Precision painting for individual rooms, bedrooms, kitchens, and bathrooms" },
        { name: "Trim, Door, and Cabinet Painting", description: "Detailed brush-applied paint on baseboards, door casings, crown molding, and cabinet boxes" },
        { name: "Ceiling Painting", description: "Smooth, uniform ceiling coatings including popcorn texture coverage and high-gloss accent ceilings" },
        { name: "Color Consultation", description: "On-site color consulting to help you select the right palette for your home's light and architecture" },
      ]}
      intro={[
        "A fresh coat of paint is the single highest-return investment you can make in your home. Done right, it transforms how a space feels, protects your walls and woodwork, and makes everything look cleaner and more cohesive. Done wrong, it peels, streaks, and fades within a few years. The difference almost always comes down to preparation.",
        "At Elite Finishes, thorough prep is non-negotiable. We fill holes and cracks, sand rough surfaces, clean greasy kitchen walls, prime bare wood and patch spots, and mask everything that should not get paint on it. Only then do we apply your finish coats with the right tool for each surface. Walls get rolled to a consistent sheen. Trim gets brushed with crisp, clean edges. Ceilings get cut in tight to every corner and fixture.",
        "We use premium Benjamin Moore and Sherwin-Williams paints selected specifically for the room type, exposure, and finish you need. Bathroom and kitchen walls get moisture-resistant formulas. High-traffic areas get scrubbable finishes. If you are not sure what you need, our crew will walk you through the options without pressure.",
      ]}
      benefits={[
        {
          title: "Prep Work That Actually Happens",
          description:
            "Every nail hole filled. Every crack caulked. Every surface cleaned, sanded, and primed where needed. Our prep work is what separates a finish that lasts five years from one that starts peeling in twelve months.",
        },
        {
          title: "Premium Paints, Properly Applied",
          description:
            "We use Benjamin Moore and Sherwin-Williams paints chosen for the specific application. We never water down our product or cut corners on coverage. Two coats means two full coats, not a swipe and a prayer.",
        },
        {
          title: "Clean, Protected Job Sites",
          description:
            "We move furniture, cover floors and fixtures with drop cloths, and tape everything that should stay paint-free. Your home is protected throughout the job and fully cleaned up when we are done.",
        },
        {
          title: "Crisp Lines and Smooth Finishes",
          description:
            "We cut in by hand along ceilings, trim, and fixtures so your lines are straight and your surfaces are smooth. No tape bleed, no roller stipple on trim, no missed spots in corners.",
        },
        {
          title: "Color Consultation Included",
          description:
            "Not sure what color or finish to choose? We help. We can review samples in your actual lighting and with your existing furnishings so you make a decision you will love instead of one you second-guess.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `Licensed with the Maryland Home Improvement Commission (${SITE.license}) and carrying full liability insurance. Your home and property are protected on every job we complete.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Free On-Site Estimate",
          description:
            "We visit your home, walk through every room, assess the surfaces, and discuss your color goals. You get a written estimate covering materials, prep, and labor with no obligation to book.",
        },
        {
          step: 2,
          title: "Surface Preparation",
          description:
            "We fill holes, caulk cracks, sand rough surfaces, spot-prime any bare wood or patches, clean dirty walls, and protect all floors, fixtures, and furniture before a single drop of paint is applied.",
        },
        {
          step: 3,
          title: "Painting",
          description:
            "We cut in ceilings and trim by hand, roll walls to a consistent sheen, and apply your specified number of coats. Each coat is inspected before proceeding to ensure proper coverage and adhesion.",
        },
        {
          step: 4,
          title: "Final Walkthrough and Cleanup",
          description:
            "When the paint is dry, we remove all masking, touch up any imperfections, clean up all materials, and walk through every room with you to make sure everything meets your expectations before we pack up.",
        },
      ]}
      faqs={[
        {
          question: "How long does interior painting take?",
          answer:
            "A single room typically takes one to two days including prep, painting, and cleanup. A full home interior can take anywhere from three days to two weeks depending on the number of rooms, ceiling heights, the amount of trim work, and how much prep the surfaces require. We give you a realistic timeline before we start.",
        },
        {
          question: "Do I need to move my furniture before the painters arrive?",
          answer:
            "We handle light furniture moving as part of the job. Heavy items like pianos, antiques, or large built-ins should be moved before we arrive. We will let you know during the estimate exactly what you need to do so there are no surprises on the start date.",
        },
        {
          question: "What paint brands do you use?",
          answer:
            "We primarily use Benjamin Moore and Sherwin-Williams, which are consistently rated best-in-class for durability, coverage, and color retention. We select the specific product line based on the room, the surface type, and the finish you want. We never use contractor-grade discount paints on your home.",
        },
        {
          question: "How many coats of paint do I need?",
          answer:
            "In most cases, two coats of a premium paint give you full, even coverage with a beautiful finish. If you are making a dramatic color change (going from a very dark color to a very light one, for example), or if the existing surface is porous or stained, we may recommend a primer coat first. We will tell you upfront what is needed for your specific situation.",
        },
        {
          question: "How long should I wait after painting before I can use the room?",
          answer:
            "Most interior latex paints are dry to the touch within two hours and safe for light use within 24 hours. We recommend waiting 24 to 48 hours before moving heavy furniture back and 30 days before washing the walls, which allows the paint to fully cure. We will give you specific guidance based on the products used in your home.",
        },
        {
          question: "Can you match an existing paint color?",
          answer:
            "Yes. If you have the original paint can with color information, we can use that. If not, most paint stores can match a color from a chip or a painted surface using a spectrophotometer. We handle the color matching process as part of your estimate.",
        },
      ]}
      relatedServices={[
        { title: "Exterior Painting", slug: "exterior-painting" },
        { title: "Bathroom Remodeling", slug: "bathroom-remodeling" },
        { title: "Home Remodeling", slug: "home-remodeling" },
        { title: "Flooring", slug: "flooring" },
      ]}
      galleryCategory="Interior Painting"
    />
  );
}
