import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Exterior Painting in Baltimore, MD | ${SITE.name}`,
  description:
    "Expert exterior painting for Baltimore area homes. Power washing, caulking, priming, and premium coatings that stand up to Maryland weather. Licensed contractor with free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Exterior Painting in Baltimore, MD | ${SITE.name}`,
    description:
      "Expert exterior painting for Baltimore area homes. Power washing, caulking, priming, and premium coatings that stand up to Maryland weather. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/exterior-painting`,
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/exterior-painting` },
};

export default function ExteriorPaintingPage() {
  return (
    <ServicePageTemplate
      title="Exterior Painting"
      slug="exterior-painting"
      heroImage="/images/exterior-painting-crew.jpg"
      heroAlt="Professional exterior painting crew working on a Baltimore area home"
      headline="Exterior Painting That Protects and Transforms Your Home"
      subheadline="Complete exterior painting with thorough pressure washing, caulking, priming, and premium coatings rated for Maryland's humidity, heat, and freezing winters."
      factNugget={`${SITE.name} is a licensed exterior painting contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We use exterior-grade Sherwin-Williams and Benjamin Moore paints with 15 to 25 year fade and peel resistance. All projects include pressure washing, full caulking of gaps and cracks, spot priming of bare wood, and two full finish coats on all painted surfaces.`}
      serviceOffers={[
        { name: "Full Exterior House Painting", description: "Complete exterior painting including siding, trim, shutters, soffits, and doors" },
        { name: "Trim and Shutter Painting", description: "Precision painting of all exterior trim, shutters, fascia, soffits, and decorative elements" },
        { name: "Deck and Fence Staining", description: "Wood deck and fence staining and sealing with penetrating oil or film-forming stain" },
        { name: "Porch and Floor Painting", description: "Durable floor paint for exterior porches, steps, and painted concrete surfaces" },
        { name: "Garage Door Painting", description: "Primer and topcoat application on wood, steel, and fiberglass garage doors" },
      ]}
      intro={[
        "Your home's exterior is its first impression and its first line of defense against weather. A proper exterior paint job keeps moisture out, prevents wood rot, protects your siding, and adds significant curb appeal. But exterior painting is not just about putting color on a wall. It is about the prep work that happens before a single brush or roller touches the surface.",
        "Elite Finishes starts every exterior project with a thorough power wash to remove dirt, mildew, and chalking paint. We then go over every inch of the surface caulking open joints, sealing gaps around windows and doors, and priming any bare wood or peeling areas. Only after the surface is properly prepared do we apply your finish coats using exterior-grade Benjamin Moore or Sherwin-Williams paints chosen for the climate and surface type.",
        "Baltimore's weather is tough on paint. Summer heat and UV exposure break down coatings quickly. Winter freeze-thaw cycles open gaps in caulk and siding. Humidity encourages mildew growth. We account for all of these factors in the products and application methods we choose, so your exterior paint lasts for many years instead of needing touch-up within two or three.",
      ]}
      benefits={[
        {
          title: "Full Pressure Washing and Prep",
          description:
            "We power wash the entire exterior before any prep or painting begins. Mildew, dirt, and chalking paint cannot be covered over and expected to hold. A clean surface is the foundation of a paint job that lasts.",
        },
        {
          title: "Complete Caulking and Sealing",
          description:
            "We caulk every open joint, gap around windows and doors, and crack in siding or trim before painting. This keeps moisture from getting behind the paint film and prevents the peeling and rot that cut most exterior paint jobs short.",
        },
        {
          title: "Premium Weather-Resistant Coatings",
          description:
            "We use exterior-grade paints rated for Maryland's climate, with UV stabilizers, mildew inhibitors, and long-term flexibility built in. These are not the same products you buy at a home improvement store.",
        },
        {
          title: "Two Full Coats on All Surfaces",
          description:
            "Every painted surface gets two full coats of finish paint, not a half coat followed by a touch-up. We inspect coverage after each coat and address thin spots before moving on. What you see when we leave is a complete, professional finish.",
        },
        {
          title: "Clean, Detailed Trim Work",
          description:
            "Exterior trim requires precise cutting and back-brushing to avoid lap marks and drips. Our crew takes the time to do trim work correctly, which is what separates a professional paint job from one that looks sloppy up close.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `We carry full liability insurance and are licensed with the Maryland Home Improvement Commission (${SITE.license}). You are protected on every project we complete.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Free Exterior Inspection and Estimate",
          description:
            "We inspect your home's exterior surface by surface, noting any rot, peeling, failing caulk, or moisture damage. You get a detailed written estimate with no pressure and no obligation.",
        },
        {
          step: 2,
          title: "Power Washing and Repairs",
          description:
            "We pressure wash the entire exterior, scrape any loose or peeling paint, repair minor wood rot or damaged siding, and allow everything to dry completely before the next step.",
        },
        {
          step: 3,
          title: "Caulking, Priming, and Masking",
          description:
            "We caulk all joints, gaps, and cracks throughout the exterior. Any bare wood or repaired areas get a coat of exterior primer. We mask windows, doors, and any surfaces that should not receive paint.",
        },
        {
          step: 4,
          title: "Painting, Inspection, and Walkthrough",
          description:
            "We apply two full finish coats on all painted surfaces, inspect coverage, and clean up fully. We walk around the entire exterior with you before we leave to make sure everything meets your expectations.",
        },
      ]}
      faqs={[
        {
          question: "How long does exterior painting take?",
          answer:
            "A typical single-family home takes three to six days from power washing through final coat, depending on size, the amount of trim work, and how much prep the surfaces require. We account for weather and never paint in rain, extreme heat, or when temperatures will drop below 50 degrees within 24 hours of application.",
        },
        {
          question: "What is the best time of year to paint a home's exterior in Maryland?",
          answer:
            "Late spring and early fall are ideal because temperatures are mild and humidity is lower. However, we paint exterior projects throughout the spring, summer, and fall season as long as conditions are appropriate. We monitor the forecast closely and will reschedule if weather threatens the quality of the application.",
        },
        {
          question: "How long should exterior paint last?",
          answer:
            "A properly prepped and painted exterior using premium products should last 10 to 15 years before needing full repainting, and longer if you keep up with minor touch-ups every few years. The key variables are prep quality, product quality, and how well the caulking was done. We focus on all three.",
        },
        {
          question: "Do you handle wood rot repair before painting?",
          answer:
            "Yes. Minor wood rot on siding, trim, and window sills can be repaired with an epoxy wood filler or replacement boards before painting begins. We identify all problem areas during our initial inspection and include any necessary repairs in your estimate. We will not paint over rot and call it done.",
        },
        {
          question: "Can you paint over painted brick or masonry?",
          answer:
            "Yes, though it is important to note that once brick is painted, it is very difficult to reverse. If your brick is currently painted and needs a fresh coat, we can do that with a masonry-appropriate elastomeric coating. If your brick is unpainted, we will discuss the trade-offs before recommending painting over it.",
        },
        {
          question: "How much does exterior painting cost in Baltimore?",
          answer:
            "Exterior painting for a typical single-family home in the Baltimore area ranges from $2,500 to $7,500 depending on the home's size, siding type, the number of stories, and the amount of trim work. Homes with a lot of detailed trim, multiple stories requiring staging, or significant prep needs will be on the higher end. We provide exact pricing after the on-site inspection.",
        },
      ]}
      relatedServices={[
        { title: "Interior Painting", slug: "interior-painting" },
        { title: "Siding", slug: "siding" },
        { title: "Roofing", slug: "roofing" },
        { title: "Home Remodeling", slug: "home-remodeling" },
      ]}
      galleryCategory="Exterior Painting"
    />
  );
}
