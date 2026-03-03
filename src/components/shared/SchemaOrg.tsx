import { SITE, SERVICE_AREAS, PRIMARY_SERVICES } from "@/lib/constants";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: `${SITE.name} is a licensed painting and home remodeling contractor based in Baltimore, Maryland, serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Services include interior painting, exterior painting, kitchen remodeling, bathroom remodeling, home remodeling, basement finishing, flooring, siding, roofing, concrete work, and commercial painting. Licensed ${SITE.license}.`,
    telephone: SITE.phone,
    email: SITE.email,
    url: SITE.url,
    sameAs: [
      "https://www.facebook.com/elitefinishesmaryland",
      "https://www.google.com/maps/place/Elite+Finishes",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.stateCode,
      postalCode: SITE.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.2725,
      longitude: -76.6223,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
      containedInPlace: {
        "@type": "State",
        name: "Maryland",
      },
    })),
    knowsAbout: [
      "Interior painting",
      "Exterior painting",
      "Kitchen remodeling",
      "Bathroom remodeling",
      "Home remodeling",
      "Basement finishing",
      "Deck construction",
      "Flooring installation",
      "Hardwood floor refinishing",
      "Siding installation",
      "Roofing",
      "Concrete and masonry",
      "Commercial painting",
      "Cabinet painting",
      "Drywall repair",
      "Color consultation",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting and Home Remodeling Services",
      itemListElement: PRIMARY_SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${SITE.url}/services/${service.slug}`,
        },
      })),
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `MHIC ${SITE.license}`,
        recognizedBy: {
          "@type": "Organization",
          name: "Maryland Home Improvement Commission",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: `WBME ${SITE.license2}`,
        recognizedBy: {
          "@type": "Organization",
          name: "State of Maryland",
        },
      },
    ],
    founder: {
      "@type": "Person",
      name: "Nick P.",
      jobTitle: "Owner",
      worksFor: {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE.url}/#business`,
      },
    },
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/logo.png`,
      width: 400,
      height: 152,
    },
    image: `${SITE.url}/images/logo.png`,
    slogan: "Premium Painting and Remodeling, Done Right",
    paymentAccepted: "Cash, Credit Card, Financing",
    currenciesAccepted: "USD",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "63",
      bestRating: "5",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  image?: string;
  slug: string;
  offers?: { name: string; description?: string }[];
}

export function ServiceSchema({
  name,
  description,
  image,
  slug,
  offers,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      telephone: SITE.phone,
      url: SITE.url,
    },
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area,
      containedInPlace: {
        "@type": "State",
        name: "Maryland",
      },
    })),
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "Baltimore Metropolitan Area, Maryland",
    },
    url: `${SITE.url}/services/${slug}`,
    ...(image && { image: `${SITE.url}${image}` }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "63",
      bestRating: "5",
    },
    ...(offers && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${name} Services`,
        itemListElement: offers.map((offer) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            ...(offer.description && { description: offer.description }),
          },
        })),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQPageSchemaProps {
  faqs: { question: string; answer: string }[];
}

export function FAQPageSchema({ faqs }: FAQPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BlogPostSchemaProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  image?: string;
}

export function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  image,
}: BlogPostSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#business`,
        name: SITE.name,
        url: SITE.url,
      },
      {
        "@type": "Person",
        name: "Elite Finishes Team",
        url: `${SITE.url}/about`,
      },
    ],
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
    },
    url: `${SITE.url}/blog/${slug}`,
    ...(image && { image: `${SITE.url}${image}` }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
