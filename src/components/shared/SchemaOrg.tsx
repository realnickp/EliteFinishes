import { SITE, CITY_DATA, PRIMARY_SERVICES } from "@/lib/constants";

const BUSINESS_ID = `${SITE.url}/#business`;

const COUNTIES_SERVED = [
  "Baltimore City",
  "Baltimore County",
  "Anne Arundel County",
  "Howard County",
];

/** The four counties as schema.org AdministrativeArea nodes. */
function countyAreas() {
  return COUNTIES_SERVED.map((name) => ({
    "@type": "AdministrativeArea",
    name: `${name}, MD`,
  }));
}

/**
 * Sitewide entity graph: the business plus the website. Only verifiable facts
 * belong here. Do not add ratings or review counts unless they come from a
 * real, current source.
 */
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HousePainter", "GeneralContractor"],
        "@id": BUSINESS_ID,
        name: SITE.name,
        description: `${SITE.name} is a licensed painting and home remodeling contractor based in Baltimore, Maryland, serving Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Services include interior painting, exterior painting, kitchen remodeling, bathroom remodeling, home remodeling, basement finishing, flooring, siding, roofing, concrete work, and commercial painting. Licensed ${SITE.license}.`,
        telephone: SITE.phone,
        email: SITE.email,
        url: SITE.url,
        sameAs: [
          "https://www.facebook.com/elitefinishesmaryland",
          "https://www.bbb.org/us/md/baltimore/profile/painting-contractors/elite-finishes-inc-0011-90381013",
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
        areaServed: [
          ...countyAreas(),
          ...CITY_DATA.map((city) => ({
            "@type": "City",
            name: `${city.name}, MD`,
          })),
        ],
        knowsAbout: [
          "Interior painting",
          "Exterior painting",
          "Kitchen remodeling",
          "Bathroom remodeling",
          "Home remodeling",
          "Basement finishing",
          "Deck construction",
          "Flooring installation",
          "Siding installation",
          "Roofing",
          "Concrete and masonry",
          "Commercial painting",
          "Cabinet painting",
          "Drywall repair",
          "Wallpaper removal",
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
            name: SITE.license,
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Maryland Home Improvement Commission",
            },
          },
        ],
        founder: {
          "@type": "Person",
          name: SITE.owner,
          jobTitle: "Owner",
        },
        logo: {
          "@type": "ImageObject",
          url: `${SITE.url}/images/logo.png`,
          width: 162,
          height: 169,
        },
        image: `${SITE.url}/images/og-default.jpg`,
        slogan: "Premium Painting and Remodeling, Done Right",
        paymentAccepted: "Cash, Credit Card, Financing",
        currenciesAccepted: "USD",
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
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        inLanguage: "en-US",
        publisher: { "@id": BUSINESS_ID },
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
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: countyAreas(),
    url: `${SITE.url}/services/${slug}`,
    ...(image && { image: `${SITE.url}${image}` }),
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
    author: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
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
