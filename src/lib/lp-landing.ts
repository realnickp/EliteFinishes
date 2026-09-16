import type { FAQItem } from "@/components/shared/FAQAccordion";

// ── Types ────────────────────────────────────────────────────────────────────

export interface BuilderOption {
  label: string;
  emoji: string;
}

export interface BuilderQuestion {
  id: string;
  question: string;
  options: BuilderOption[];
  /** Only ask this question when an earlier answer matches one of these labels. */
  showIf?: { questionId: string; anyOf: string[] };
}

export type WhyIcon =
  | "prep"
  | "palette"
  | "shield"
  | "sparkles"
  | "clock"
  | "price"
  | "bath"
  | "team"
  | "wallet";

export interface WorkPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface LandingConfig {
  slug: string;
  /** Service name saved on the lead and shown in the dashboard. */
  serviceTitle: string;
  metaTitle: string;
  metaDescription: string;
  heroImage: string;
  offerImage: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  heroBullets: string[];
  offer: {
    badge: string;
    title: string;
    details: string;
    finePrint: string;
  };
  showFinancing: boolean;
  /** Prefilled message when a visitor taps Text. */
  smsBody: string;
  builder: {
    title: string;
    questions: BuilderQuestion[];
  };
  /** Kept low key on the page: a small strip of real job photos. */
  workPhotos: WorkPhoto[];
  why: {
    heading: string;
    items: { icon: WhyIcon; title: string; text: string }[];
  };
  faq: FAQItem[];
}

// ── Real Elite Finishes project photos ───────────────────────────────────────
// Only real Elite Finishes work belongs in these. Add new job photos to
// /public/images/lp/work/ and list them in the page's workPhotos below.

const PHOTO_STAIRCASE: WorkPhoto = {
  src: "/images/hero-staircase.jpg",
  alt: "Staircase railings and spindles refinished in charcoal by Elite Finishes",
  caption: "Staircase railings and spindles refinished in charcoal",
};

const PHOTO_BASEMENT: WorkPhoto = {
  src: "/images/hero-basement-remodel.jpg",
  alt: "Finished basement with fresh paint, new flooring and a slat wall fireplace by Elite Finishes",
  caption: "Basement finished with fresh paint, new flooring and a fireplace wall",
};

const PHOTO_BUILT_IN: WorkPhoto = {
  src: "/images/hero-entertainment-center.jpg",
  alt: "Custom built-in entertainment wall with fireplace by Elite Finishes",
  caption: "Custom built-in entertainment wall with fireplace",
};

const PHOTO_BATHROOM: WorkPhoto = {
  src: "/images/hero-bathroom-tile.jpg",
  alt: "Bathroom remodel with a floor to ceiling blue tile shower by Elite Finishes",
  caption: "Bathroom remodel with a floor to ceiling tile shower and new vanity",
};

const PHOTO_PRIMARY_BATH: WorkPhoto = {
  src: "/images/lp/work/bathroom-primary-double-vanity.jpg",
  alt: "Primary bathroom remodel with a marble look walk-in shower, tiled niche and double vanity by Elite Finishes",
  caption: "Primary bathroom with a walk-in shower, tiled niche and double vanity",
};

const PHOTO_TUB_SURROUND: WorkPhoto = {
  src: "/images/lp/work/bathroom-tub-surround.jpg",
  alt: "Hall bathroom with a new tile tub surround, vanity and matte black fixtures by Elite Finishes",
  caption: "Hall bath with a new tile tub surround and matte black fixtures",
};

const TIMELINE_OPTIONS: BuilderOption[] = [
  { label: "ASAP", emoji: "⚡" },
  { label: "Within 1 month", emoji: "📅" },
  { label: "Within 3 months", emoji: "🗓️" },
  { label: "Just exploring prices", emoji: "🔍" },
];

const OFFER_FINE_PRINT =
  "Limited-time offer. Cannot be combined with other discounts. Mention this offer at your free estimate.";

const LICENSED_FAQ: FAQItem = {
  question: "Are you licensed and insured?",
  answer:
    "Yes. Elite Finishes is licensed by the Maryland Home Improvement Commission (MHIC 153498) and fully insured.",
};

// ── Pages ────────────────────────────────────────────────────────────────────

const PAINTING: LandingConfig = {
  slug: "painting",
  serviceTitle: "Painting (Interior and Exterior)",
  metaTitle: "Interior and Exterior Painting | 10% Off | Elite Finishes",
  metaDescription:
    "Interior and exterior painting across the Baltimore area. Careful prep, premium paint, clean crews. Save 10% and get a free estimate from Elite Finishes.",
  heroImage: "/images/lp/painting-hero.jpg",
  offerImage: "/images/lp/painting-offer.jpg",
  eyebrow: "Interior and Exterior Painting · Baltimore Area",
  headline: "A paint job you'll be proud of, inside and out.",
  subheadline:
    "Careful prep, premium paint and a clean, respectful crew. Elite Finishes paints homes across the Baltimore area, and every estimate is free.",
  heroBullets: [
    "Walls patched, sanded and primed before any paint goes on",
    "Premium Benjamin Moore and Sherwin-Williams paints",
    "Floors and furniture protected, and everything cleaned up when we leave",
  ],
  offer: {
    badge: "10% off painting and drywall",
    title: "Take 10% off your painting project",
    details:
      "Save 10% on interior painting, exterior painting and drywall work. Book your free estimate and mention this offer when we come out.",
    finePrint: OFFER_FINE_PRINT,
  },
  showFinancing: false,
  smsBody: "Hi Elite Finishes, I'd like a free painting estimate.",
  builder: {
    title: "Build your painting estimate",
    questions: [
      {
        id: "scope",
        question: "What do you need painted?",
        options: [
          { label: "Interior", emoji: "🛋️" },
          { label: "Exterior", emoji: "🏡" },
          { label: "Both inside and out", emoji: "🏠" },
          { label: "Cabinets, trim or doors", emoji: "🚪" },
        ],
      },
      {
        id: "interior_size",
        question: "How much of the inside?",
        showIf: { questionId: "scope", anyOf: ["Interior", "Both inside and out"] },
        options: [
          { label: "1 or 2 rooms", emoji: "🎨" },
          { label: "3 to 5 rooms", emoji: "🖌️" },
          { label: "The whole interior", emoji: "🏠" },
          { label: "Not sure yet", emoji: "🤔" },
        ],
      },
      {
        id: "exterior_surface",
        question: "What's on the outside of your home?",
        showIf: { questionId: "scope", anyOf: ["Exterior", "Both inside and out"] },
        options: [
          { label: "Wood or fiber cement siding", emoji: "🪵" },
          { label: "Brick or stucco", emoji: "🧱" },
          { label: "Vinyl or aluminum siding", emoji: "🏘️" },
          { label: "Just trim, doors and shutters", emoji: "🚪" },
        ],
      },
      {
        id: "home_type",
        question: "What kind of property is it?",
        options: [
          { label: "Rowhome or townhome", emoji: "🏘️" },
          { label: "Single family home", emoji: "🏡" },
          { label: "Condo or apartment", emoji: "🏢" },
          { label: "Business or commercial", emoji: "🏬" },
        ],
      },
      {
        id: "condition",
        question: "What shape are the surfaces in?",
        options: [
          { label: "Good, just needs a fresh look", emoji: "✨" },
          { label: "Some peeling, cracks or patching", emoji: "🩹" },
          { label: "Wallpaper to remove", emoji: "📜" },
          { label: "Not sure", emoji: "🤔" },
        ],
      },
      {
        id: "timeline",
        question: "When do you want it done?",
        options: TIMELINE_OPTIONS,
      },
    ],
  },
  workPhotos: [PHOTO_STAIRCASE, PHOTO_BASEMENT, PHOTO_BUILT_IN],
  why: {
    heading: "Why homeowners pick Elite Finishes",
    items: [
      {
        icon: "prep",
        title: "Prep done right",
        text: "We patch, sand, caulk and prime first, so the finish looks smooth and lasts for years.",
      },
      {
        icon: "palette",
        title: "Exact color matching",
        text: "Painting one room? We match your existing colors so everything flows together.",
      },
      {
        icon: "sparkles",
        title: "Clean, careful crews",
        text: "Floors and furniture get covered, and your home is cleaned up before we leave.",
      },
      {
        icon: "price",
        title: "Fair, upfront pricing",
        text: "You get a clear written estimate before any work starts. No surprise charges.",
      },
      {
        icon: "clock",
        title: "Fast estimates",
        text: "We get back to you within one business day and come out to see the job in person.",
      },
      {
        icon: "shield",
        title: "Licensed and insured",
        text: "Maryland Home Improvement Commission license MHIC 153498, fully insured.",
      },
    ],
  },
  faq: [
    {
      question: "How much does it cost to paint my home?",
      answer:
        "Every home is different, so we give you a free written estimate after seeing the space. Price depends on the size of the area, the condition of the surfaces and how much trim and ceiling work is included. Right now you also save 10%.",
    },
    {
      question: "How long does a painting job take?",
      answer:
        "A room or two often takes a day or two. Most exteriors are finished in 2 to 4 days. Your estimate includes a clear timeline so you can plan around it.",
    },
    {
      question: "Do I need to be home while you paint?",
      answer:
        "No. Plenty of customers are at work or out of town while we paint. We set up access with you ahead of time and keep you updated.",
    },
    {
      question: "What paint do you use?",
      answer:
        "Premium Benjamin Moore and Sherwin-Williams paints, chosen for the surface. We can also match colors you already have.",
    },
    {
      question: "Do you remove wallpaper?",
      answer:
        "Yes. We remove the wallpaper, repair the walls underneath and prime them so the new paint goes on smooth.",
    },
    {
      question: "My home was built before 1978. Is that a problem?",
      answer:
        "Not at all. Many Baltimore area homes are older, and we follow lead-safe practices on pre-1978 homes.",
    },
    LICENSED_FAQ,
  ],
};

const BATHROOM: LandingConfig = {
  slug: "bathroom-remodeling",
  serviceTitle: "Bathroom Remodeling",
  metaTitle: "Bathroom Remodeling | $500 Gift Card | Elite Finishes",
  metaDescription:
    "Tile showers, new vanities and full bathroom remodels across the Baltimore area. Get a free estimate and a $500 dining gift card with your remodel.",
  heroImage: "/images/lp/bathroom-hero.jpg",
  offerImage: "/images/lp/bathroom-offer.jpg",
  eyebrow: "Bathroom Remodeling · Baltimore Area",
  headline: "Love your bathroom again.",
  subheadline:
    "Tile showers, new vanities and full remodels across the Baltimore area. One licensed contractor handles the whole job, from demo to final cleanup.",
  heroBullets: [
    "Custom tile showers, tub to shower conversions and new vanities",
    "One team coordinates every trade, start to finish",
    "Licensed and insured, with permits handled for you",
  ],
  offer: {
    badge: "$500 dining gift card with your remodel",
    title: "Get a $500 gift card with your bathroom remodel",
    details:
      "Book your bathroom remodel with Elite Finishes and we'll give you a $500 gift card to The Capital Grille or Ruth's Chris. Celebrate the new bathroom with a great dinner on us.",
    finePrint: OFFER_FINE_PRINT,
  },
  showFinancing: true,
  smsBody: "Hi Elite Finishes, I'd like a free bathroom remodel estimate.",
  builder: {
    title: "Build your bathroom estimate",
    questions: [
      {
        id: "which",
        question: "Which bathroom are we remodeling?",
        options: [
          { label: "Primary bathroom", emoji: "🛁" },
          { label: "Hall or guest bathroom", emoji: "🚿" },
          { label: "Half bath or powder room", emoji: "🚽" },
          { label: "More than one bathroom", emoji: "✨" },
        ],
      },
      {
        id: "scope",
        question: "How big of a remodel?",
        options: [
          { label: "Refresh: vanity, fixtures and paint", emoji: "🎨" },
          { label: "New tile and shower", emoji: "🔧" },
          { label: "Full gut renovation", emoji: "🏗️" },
          { label: "Tub to walk-in shower", emoji: "🚿" },
        ],
      },
      {
        id: "priority",
        question: "What matters most to you?",
        options: [
          { label: "A beautiful tile shower", emoji: "⬜" },
          { label: "New vanity and more storage", emoji: "🪥" },
          { label: "Safety and easier access", emoji: "♿" },
          { label: "The whole room, top to bottom", emoji: "🏠" },
        ],
      },
      {
        id: "owner",
        question: "Do you own the home?",
        options: [
          { label: "Yes, I live there", emoji: "🏡" },
          { label: "Yes, it's a rental I own", emoji: "🔑" },
          { label: "Buying or selling soon", emoji: "📝" },
          { label: "No, I rent", emoji: "🏢" },
        ],
      },
      {
        id: "budget",
        question: "Do you have a budget in mind?",
        options: [
          { label: "Under $8,000", emoji: "💵" },
          { label: "$8,000 to $20,000", emoji: "💰" },
          { label: "$20,000 to $40,000", emoji: "💎" },
          { label: "Still figuring it out", emoji: "🤔" },
        ],
      },
      {
        id: "timeline",
        question: "When would you like to start?",
        options: TIMELINE_OPTIONS,
      },
    ],
  },
  workPhotos: [PHOTO_PRIMARY_BATH, PHOTO_BATHROOM, PHOTO_TUB_SURROUND],
  why: {
    heading: "Why homeowners pick Elite Finishes",
    items: [
      {
        icon: "bath",
        title: "The complete bathroom",
        text: "Showers, tubs, tile, vanities, lighting and paint, all handled by one team.",
      },
      {
        icon: "team",
        title: "One point of contact",
        text: "No juggling separate tile setters, plumbers and painters. We coordinate it all.",
      },
      {
        icon: "shield",
        title: "Licensed, insured, permitted",
        text: "MHIC 153498, fully insured, and we pull the permits when your project needs them.",
      },
      {
        icon: "sparkles",
        title: "Clean, careful crews",
        text: "We protect the rest of your home and clean up so you can live comfortably during the job.",
      },
      {
        icon: "wallet",
        title: "Financing available",
        text: "Spread the cost into monthly payments. Checking your rate won't affect your credit score.",
      },
      {
        icon: "clock",
        title: "Fast estimates",
        text: "We get back to you within one business day and come out to see the space in person.",
      },
    ],
  },
  faq: [
    {
      question: "How much does a bathroom remodel cost?",
      answer:
        "It depends on the size of the room and the finishes you choose. A refresh costs far less than a full gut renovation. We give you a free written estimate with options, and financing is available.",
    },
    {
      question: "How long will the remodel take?",
      answer:
        "Most bathroom remodels take 2 to 4 weeks once work starts, depending on the scope. Your estimate includes a timeline so you can plan around it.",
    },
    {
      question: "Can you turn my tub into a walk-in shower?",
      answer:
        "Yes. We handle tub to walk-in shower conversions from demo through the final tile and fixtures.",
    },
    {
      question: "Do you handle permits?",
      answer: "Yes. When your project needs a permit, we pull it and coordinate the inspections.",
    },
    {
      question: "Do you offer financing?",
      answer:
        "Yes. You can prequalify in about a minute with no impact to your credit score, with fixed monthly payments.",
    },
    LICENSED_FAQ,
  ],
};

export const LANDING_PAGES: Record<string, LandingConfig> = {
  [PAINTING.slug]: PAINTING,
  [BATHROOM.slug]: BATHROOM,
};
