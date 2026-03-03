import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home Remodeling in Baltimore, MD | ${SITE.name}`,
  description:
    "Whole-home and multi-room remodeling in Baltimore and surrounding Maryland counties. One licensed contractor for every phase. Free estimates.",
  openGraph: {
    siteName: "Elite Finishes",
    title: `Home Remodeling in Baltimore, MD | ${SITE.name}`,
    description:
      "Whole-home and multi-room remodeling in Baltimore and surrounding Maryland counties. One licensed contractor for every phase. Free estimates.",
    url: `${SITE.url}/services/home-remodeling`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/services/home-remodeling` },
};

export default function HomeRemodelingPage() {
  return (
    <ServicePageTemplate
      title="Home Remodeling"
      slug="home-remodeling"
      heroImage="/images/pexels-curtis-adams-1694007-3935321.jpg"
      heroAlt="Beautifully remodeled home interior completed by Elite Finishes in Baltimore Maryland"
      headline="Home Remodeling That Transforms How You Live"
      subheadline="Whole-home and multi-room renovations for Baltimore area homeowners who are ready to stop settling for a house that does not fit their life."
      factNugget={`${SITE.name} is a licensed home remodeling contractor (${SITE.license}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We coordinate all phases of larger home renovation projects, including demolition, carpentry, tile, painting, flooring, and trade work, under a single contract. Most of our whole-home remodel clients report that having one contractor manage the entire project rather than coordinating multiple separate trades saved them significant time, stress, and money.`}
      serviceOffers={[
        { name: "Whole-Home Renovation", description: "Complete multi-room remodeling that transforms your home from top to bottom" },
        { name: "Open Concept Conversion", description: "Removing walls and reconfiguring floor plans to create open living spaces" },
        { name: "Multi-Room Refresh", description: "Coordinated updates across multiple rooms for a cohesive look throughout the home" },
        { name: "Home Addition Finishing", description: "Interior finishing for new additions including framing, drywall, painting, and flooring" },
        { name: "Aging in Place Modifications", description: "Accessibility upgrades including grab bars, barrier-free showers, and wider doorways" },
      ]}
      intro={[
        "Some homes need more than a fresh coat of paint or a new kitchen. They need a rethink. Maybe you bought a house that worked for one phase of your life and your family has outgrown it. Maybe you have been tolerating a cramped layout for years and you are finally ready to fix it. Maybe you have a home with great bones that just needs someone to pull it all together. That is what whole-home remodeling is for.",
        "At Elite Finishes, we manage complex, multi-phase remodeling projects from planning through completion. We coordinate all trades, manage the schedule, handle permits, and keep you informed throughout the process. You have one contractor to call, one contract to manage, and one team responsible for delivering the result.",
        "The most common mistake in home remodeling is trying to phase it out by hiring individual contractors for each trade. You end up with coordination gaps, schedule conflicts, and no single party who owns the overall result. Working with one contractor who manages the whole project is almost always faster, less stressful, and more cost-effective in the end.",
      ]}
      benefits={[
        {
          title: "One Point of Contact for Everything",
          description:
            "We coordinate demolition, carpentry, tile, painting, flooring, and all trade work under a single contract. You are not managing a revolving door of contractors or trying to figure out who is responsible for the gap between what one trade left and the next expects to find.",
        },
        {
          title: "Cohesive Design Throughout",
          description:
            "When one team executes the entire project, design decisions are coordinated from room to room. Trim profiles match. Paint colors flow. Flooring transitions make sense. The whole home looks like it was designed together, because it was.",
        },
        {
          title: "Transparent Scope and Pricing",
          description:
            "We provide a detailed written estimate that breaks down cost by phase before any work begins. When scope changes come up (and they always do in larger remodels), we present change orders in writing with clear pricing before proceeding.",
        },
        {
          title: "Permits and Inspections Managed",
          description:
            "Larger home remodels almost always involve permits. We identify what requires permits during the planning phase, prepare the applications, and schedule all required inspections. This is included in our project management, not billed separately.",
        },
        {
          title: "Experience with Baltimore's Housing Stock",
          description:
            "Baltimore's rowhouses, craftsman bungalows, and colonial-era homes present specific challenges and opportunities that cookie-cutter contractors are not prepared for. We have renovated dozens of Baltimore area homes and know what to expect.",
        },
        {
          title: "Licensed and Fully Insured",
          description:
            `All work is performed under our MHIC license (${SITE.license}) with full liability insurance and any required performance bonds for larger projects.`,
        },
      ]}
      process={[
        {
          step: 1,
          title: "Discovery and Planning",
          description:
            "We meet at your home to understand your goals, assess existing conditions, and identify any structural or permit considerations. You get a phased proposal with clear scope, timeline, and budget for each phase.",
        },
        {
          step: 2,
          title: "Design Finalization and Permits",
          description:
            "We finalize all material selections, prepare permit applications where required, and build a detailed project schedule. We coordinate all material deliveries so the project moves efficiently.",
        },
        {
          step: 3,
          title: "Construction and Coordination",
          description:
            "We execute each phase of the project in the correct sequence, coordinating all internal and external trades. You receive regular updates and have direct access to our project lead throughout construction.",
        },
        {
          step: 4,
          title: "Finishing and Final Walkthrough",
          description:
            "We complete all painting, trim, flooring, and finish work, then do a thorough punch-list walkthrough with you to address every remaining item before we close out the project.",
        },
      ]}
      faqs={[
        {
          question: "How much does a home remodel cost in Baltimore?",
          answer:
            "It depends entirely on scope. A multi-room refresh covering painting, flooring, and cosmetic updates across several rooms typically runs $15,000 to $40,000. A full home renovation involving structural work, kitchen, bathrooms, and all finishes can run $100,000 or more. We provide a detailed estimate after understanding exactly what you want to accomplish.",
        },
        {
          question: "How long does a whole-home remodel take?",
          answer:
            "A comprehensive whole-home renovation typically takes two to six months depending on scope, permit timelines, and material lead times. Larger or more complex projects can take longer. We provide a project timeline before work begins and update it regularly so you always know where things stand.",
        },
        {
          question: "Should I move out during a major remodel?",
          answer:
            "It depends on the scope. Minor refreshes can usually be done while you live in the home with some inconvenience. Major renovations involving kitchen or primary bathroom work, structural changes, or full-home painting are often better done while the home is unoccupied. We will help you plan the logistics and minimize disruption wherever possible.",
        },
        {
          question: "Do I need to have everything designed and decided before getting an estimate?",
          answer:
            "No. We can work with as much or as little detail as you have at the start. For many homeowners, the consultation is the beginning of the planning process. We help you think through scope, priority, and budget allocation so you make decisions in the right sequence.",
        },
        {
          question: "What happens if unexpected problems are found during demolition?",
          answer:
            "In older Baltimore homes, demolition sometimes reveals surprises like water damage, old wiring, or outdated plumbing. When this happens, we stop work, document what we found, and present you with options and pricing before proceeding. We never make major decisions on your behalf without your approval.",
        },
        {
          question: "How do I compare remodeling bids from different contractors?",
          answer:
            "Make sure you are comparing identical scopes of work. A lower bid often means a narrower scope, lower-quality materials, or less experienced labor. Ask each contractor to break down their estimate by phase and material versus labor. When comparing, look at what is included in the prep work, what materials are specified, and what the warranty terms are.",
        },
      ]}
      relatedServices={[
        { title: "Kitchen Remodeling", slug: "kitchen-remodeling" },
        { title: "Bathroom Remodeling", slug: "bathroom-remodeling" },
        { title: "Basement Remodeling", slug: "basement-remodeling" },
        { title: "Flooring", slug: "flooring" },
      ]}
      galleryCategory="Home Remodeling"
    />
  );
}
