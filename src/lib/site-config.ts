/**
 * Small settings shared by client components. Kept apart from constants.ts so
 * importing them does not pull the large city and gallery data into the page JS.
 */

export const SITE = {
  name: "Elite Finishes",
  tagline: "Baltimore's Premier Painting and Home Remodeling Contractor",
  phone: "443-825-0206",
  phoneTel: "tel:+14438250206",
  phoneSms: "sms:+14438250206",
  email: "Elitefinishesmd@gmail.com",
  license: "MHIC 153498",
  owner: "Victor Cataldi",
  domain: "elitefinishesmaryland.com",
  url: "https://www.elitefinishesmaryland.com",
  address: {
    street: "1601 Cuba Street",
    city: "Baltimore",
    region: "Baltimore",
    county: "Baltimore City",
    state: "Maryland",
    stateCode: "MD",
    zip: "21230",
  },
} as const;

/** Ad landing pages that render as standalone one pagers (no site header, footer or popup). */
export const CONVERSION_LP_SLUGS = ["painting", "bathroom-remodeling"] as const;

/**
 * Ad platform IDs. Tracking stays switched off while these are blank.
 * googleAdsId looks like "AW-123456789"; labels come from the Google Ads conversion action.
 */
export const AD_TRACKING: {
  metaPixelId: string;
  googleAdsId: string;
  googleAdsLeadLabel: string;
  /** Lead conversion labels for specific /lp/[slug] pages, used instead of googleAdsLeadLabel there. */
  googleAdsLeadLabelsBySlug: Record<string, string>;
  googleAdsContactLabel: string;
  /** Website call conversion label; Google swaps SITE.phone text for a forwarding number. */
  googleAdsCallLabel: string;
} = {
  metaPixelId: "",
  googleAdsId: "AW-18451341957",
  googleAdsLeadLabel: "",
  googleAdsLeadLabelsBySlug: {
    // "Submit lead form (1)" conversion action
    "bathroom-remodeling": "f-V6COWljPscEIXFpN5E",
  },
  googleAdsContactLabel: "",
  googleAdsCallLabel: "LSmJCKDJyYIdEIXFpN5E",
};
