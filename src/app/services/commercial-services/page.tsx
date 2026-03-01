import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/shared/ServicePageTemplate";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Commercial Painting and Renovation in Baltimore, MD | ${SITE.name}`,
  description:
    "Commercial painting and renovation services in Baltimore and surrounding Maryland counties. Offices, retail, and multi-unit properties. Licensed contractor with free estimates.",
  openGraph: {
    title: `Commercial Painting and Renovation in Baltimore, MD | ${SITE.name}`,
    description:
      "Commercial painting and renovation services in Baltimore and surrounding Maryland counties. Offices, retail, and multi-unit properties. Licensed contractor with free estimates.",
    url: `${SITE.url}/services/commercial-services`,
    images: [
      {
        url: `/api/og?title=Commercial+Painting&subtitle=Baltimore%2C+MD+%26+Surrounding+Counties`,
        width: 1200,
        height: 630,
        alt: "Commercial Painting in Baltimore, MD | Elite Finishes",
      },
    ],
  },
  alternates: { canonical: `${SITE.url}/services/commercial-services` },
};

export default function CommercialServicesPage() {
  return (
    <ServicePageTemplate
      title="Commercial Services"
      slug="commercial-services"
      heroImage="/images/point3d-commercial-imaging-ltd-qVIDQ-jCMFw-unsplash.jpg"
      heroAlt="Commercial painting and renovation in a Baltimore office space by Elite Finishes"
      headline="Commercial Painting and Renovation for Baltimore Businesses"
      subheadline="Professional commercial painting and renovation for offices, retail spaces, restaurants, and multi-unit residential properties in the Baltimore area."
      factNugget={`${SITE.name} is a licensed commercial painting and renovation contractor (${SITE.license} and ${SITE.license2}) serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. We schedule commercial work around your business hours to minimize disruption, and we have experience with the documentation, compliance, and coordination requirements that commercial projects demand.`}
      serviceOffers={[
        { name: "Commercial Interior Painting", description: "Professional interior painting for offices, retail spaces, restaurants, and commercial buildings" },
        { name: "Commercial Exterior Painting", description: "Exterior painting for commercial properties, storefronts, and multi-unit buildings" },
        { name: "Multi-Unit Residential Painting", description: "Apartment complex, townhome association, and condominium unit painting and renovation" },
        { name: "Office Renovation", description: "Interior office renovation including drywall, flooring, painting, and finish work" },
        { name: "Retail Space Build-Out", description: "Tenant improvement painting and renovation for retail and restaurant spaces" },
        { name: "Industrial and Warehouse Painting", description: "Epoxy floor coatings, ceiling painting, and large-scale interior and exterior painting" },
      ]}
      intro={[
        "Commercial painting and renovation is different from residential work. The standards are higher, the stakes are different, and the scheduling requirements are more demanding. Your customers and employees judge your business by the state of your space. A clean, well-maintained commercial interior signals competence and attention to detail. A scuffed, dingy space with peeling paint says the opposite.",
        "At Elite Finishes, we have the licensing, insurance, and operational capacity to handle commercial painting and renovation projects of all sizes. We are experienced in scheduling work around business hours, weekends, and off-peak periods to minimize disruption to your operations. We understand that a restaurant that cannot serve customers during a renovation or an office that cannot function during painting is losing money, so we plan and execute with that in mind.",
        "We are a licensed Women's Business Enterprise (WBME 22380085) and Maryland Home Improvement Contractor. This dual licensing makes us a qualified vendor for government and institutional projects that require WBE certification as part of their procurement process.",
      ]}
      benefits={[
        {
          title: "Scheduling Around Your Business Hours",
          description:
            "We can work evenings, weekends, or in phases around your operating schedule to minimize disruption. We have done paint jobs in occupied offices, restaurants during off-hours, and retail spaces over single weekends. Your business keeps running while we work.",
        },
        {
          title: "Licensed for Commercial Work",
          description:
            `We hold both an MHIC contractor license (${SITE.license}) and Women's Business Enterprise registration (${SITE.license2}). We can satisfy the licensing and certification requirements for commercial, government, and institutional projects.`,
        },
        {
          title: "Experience with Multi-Unit Properties",
          description:
            "We have painted and renovated apartment complexes, condominium units, and townhome associations throughout the Baltimore area. We understand how to coordinate unit turnover, manage access, and work efficiently in occupied multi-unit buildings.",
        },
        {
          title: "Commercial-Grade Materials",
          description:
            "Commercial spaces need paints and coatings engineered for higher traffic, more frequent cleaning, and more demanding applications. We specify and use commercial-grade products from Benjamin Moore, Sherwin-Williams, and other manufacturers rated for commercial use.",
        },
        {
          title: "Coordination and Documentation",
          description:
            "Commercial projects require more documentation: certificates of insurance, compliance documentation, detailed scope of work, and sometimes performance bonds. We provide all required documentation and can meet the compliance needs of commercial clients.",
        },
        {
          title: "Full-Service Capability",
          description:
            "Beyond painting, we can handle interior renovation work including drywall, flooring, and general finish carpentry for commercial tenant improvements and renovation projects. One contractor for multiple trades reduces coordination complexity.",
        },
      ]}
      process={[
        {
          step: 1,
          title: "Site Walk and Estimate",
          description:
            "We walk the property, assess the scope of work, discuss your scheduling requirements, and review any building-specific access or compliance requirements. You get a detailed written estimate with clear scope and pricing.",
        },
        {
          step: 2,
          title: "Scheduling and Coordination",
          description:
            "We develop a project schedule that works around your business operations, coordinate with building management if required, and confirm all access, elevator, and staging requirements before work begins.",
        },
        {
          step: 3,
          title: "Work Execution",
          description:
            "We execute the project on schedule, contain work areas to minimize disruption to adjacent spaces, and meet all safety and cleanliness standards required for occupied commercial buildings.",
        },
        {
          step: 4,
          title: "Inspection, Touch-Up, and Sign-Off",
          description:
            "We inspect all completed work, address any punch-list items, provide required completion documentation, and do a final walkthrough with your designated contact before signing off.",
        },
      ]}
      faqs={[
        {
          question: "Can you work after hours or on weekends to avoid disrupting our business?",
          answer:
            "Yes. We regularly schedule commercial painting work for evenings, weekends, and holiday periods to minimize disruption to business operations. We discuss your operating schedule during the planning phase and build a work schedule around it. After-hours work is included in our commercial pricing without a premium surcharge for most projects.",
        },
        {
          question: "Are you licensed for commercial painting in Maryland?",
          answer:
            `Yes. We hold MHIC license ${SITE.license} for home improvement contracting and WBME registration ${SITE.license2} as a Women's Business Enterprise. We carry full commercial general liability insurance and can provide certificates of insurance and additional insured endorsements as required by commercial property owners and managers.`,
        },
        {
          question: "What types of commercial properties do you work in?",
          answer:
            "We work in offices, retail spaces, restaurants, apartment complexes, condominium buildings, townhome associations, industrial facilities, warehouses, schools, houses of worship, and government buildings throughout the Baltimore metropolitan area.",
        },
        {
          question: "How do you handle occupied commercial spaces during painting?",
          answer:
            "We use low-VOC and zero-VOC paints in occupied spaces to minimize odor impact. We contain work areas with plastic sheeting and negative pressure when necessary, work in sections to allow continued use of adjacent areas, and maintain clean, organized job sites throughout. We do not leave materials or equipment in pathways or occupied areas at the end of each work session.",
        },
        {
          question: "Can you paint the exterior of a commercial building?",
          answer:
            "Yes. We paint commercial building exteriors including storefronts, masonry facades, metal panels, and large-scale exterior surfaces. We have the equipment and crew capacity for exterior commercial projects of varying scale.",
        },
        {
          question: "Do you offer maintenance agreements for ongoing commercial painting needs?",
          answer:
            "Yes. We work with several property management companies and commercial clients on ongoing maintenance agreements for touch-up work, unit turnover painting, and scheduled refreshes. Contact us to discuss what a maintenance arrangement would look like for your property.",
        },
      ]}
      relatedServices={[
        { title: "Interior Painting", slug: "interior-painting" },
        { title: "Exterior Painting", slug: "exterior-painting" },
        { title: "Flooring", slug: "flooring" },
        { title: "Siding", slug: "siding" },
      ]}
      galleryCategory="Commercial Services"
    />
  );
}
