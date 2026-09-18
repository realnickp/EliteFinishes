import type { FAQItem } from "@/components/shared/FAQAccordion";

// ── Types ────────────────────────────────────────────────────────────────────

export interface BuilderOption {
  label: string;
}

export interface BuilderQuestion {
  id: string;
  question: string;
  options: BuilderOption[];
  /** Only ask this question when an earlier answer matches one of these labels. */
  showIf?: { questionId: string; anyOf: string[] };
}

export interface WorkPhoto {
  src: string;
  alt: string;
  caption: string;
}

/** Style idea photo for the scrolling inspiration strip. Stock imagery, never credited as our work. */
export interface IdeaPhoto {
  src: string;
  label: string;
}

export interface LandingConfig {
  slug: string;
  /** Service name saved on the lead and shown in the dashboard. */
  serviceTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Background photos that slowly rotate behind the headline. The first one loads right away. */
  heroSlides: string[];
  /** Decorative photo beside the "Why" list. */
  whyImage: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  heroBullets: string[];
  offer: {
    /** "dinner" shows the steakhouse gift cards, "paint" shows the paint chips. */
    variant: "dinner" | "paint";
    badge: string;
    /** One line version for the bar at the top of the page. */
    short: string;
    title: string;
    details: string;
    finePrint: string;
  };
  showFinancing: boolean;
  /** Only switch on when our Google reviews talk about this service. */
  showReviews: boolean;
  /** Scrolling strip of style ideas (stock photos, labeled as inspiration). */
  ideas: {
    heading: string;
    subheading: string;
    photos: IdeaPhoto[];
  };
  /** Prefilled message when a visitor taps Text. */
  smsBody: string;
  builder: {
    title: string;
    questions: BuilderQuestion[];
  };
  /** Real Elite Finishes job photos only. */
  workPhotos: WorkPhoto[];
  why: {
    heading: string;
    items: { title: string; text: string }[];
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
  { label: "ASAP" },
  { label: "Within 1 month" },
  { label: "Within 3 months" },
  { label: "Just exploring prices" },
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
  heroSlides: [
    "/images/lp/painting-hero.jpg",
    "/images/lp/ideas/paint-6903157.jpg",
    "/images/lp/ideas/paint-7601163.jpg",
    "/images/lp/ideas/paint-18038116.jpg",
  ],
  whyImage: "/images/lp/painting-offer.jpg",
  eyebrow: "Interior and exterior painting in the Baltimore area",
  headline: "A paint job you'll be proud of, inside and out.",
  subheadline:
    "Careful prep, premium paint and a clean, respectful crew. Elite Finishes paints homes across the Baltimore area, and every estimate is free.",
  heroBullets: [
    "Walls patched, sanded and primed before any paint goes on",
    "Premium Benjamin Moore and Sherwin-Williams paints",
    "Floors and furniture protected, and everything cleaned up when we leave",
  ],
  offer: {
    variant: "paint",
    badge: "10% off painting and drywall",
    short: "Save 10% on painting and drywall when you book a free estimate",
    title: "Take 10% off your painting project",
    details:
      "Save 10% on interior painting, exterior painting and drywall work. Book your free estimate and mention this offer when we come out.",
    finePrint: OFFER_FINE_PRINT,
  },
  showFinancing: false,
  showReviews: true,
  ideas: {
    heading: "Picture your home in a fresh coat",
    subheading:
      "A few looks to get you thinking. Bring your own colors, or we'll help you choose and match them.",
    photos: [
      { src: "/images/lp/ideas/paint-6903157.jpg", label: "Deep teal bedroom with panel molding" },
      { src: "/images/lp/ideas/paint-7601163.jpg", label: "Crisp white exterior with black shutters" },
      { src: "/images/lp/ideas/paint-8583595.jpg", label: "Two tone green with white trim" },
      { src: "/images/lp/ideas/paint-18038116.jpg", label: "Soft gray living room" },
      { src: "/images/lp/ideas/paint-271816.jpg", label: "Bold blue accent wall" },
      { src: "/images/lp/ideas/paint-3958954.jpg", label: "Fresh siding and trim" },
      { src: "/images/lp/ideas/paint-35419462.jpg", label: "Cool gray family room" },
      { src: "/images/lp/ideas/paint-20296321.jpg", label: "Coastal blue shingle siding" },
      { src: "/images/lp/ideas/paint-19899076.jpg", label: "Blue gray paneled walls" },
      { src: "/images/lp/ideas/paint-10628470.jpg", label: "Townhome exteriors" },
      { src: "/images/lp/ideas/paint-8031973.jpg", label: "Bright white and gray living room" },
      { src: "/images/lp/ideas/paint-8583638.jpg", label: "Sage green exterior" },
    ],
  },
  smsBody: "Hi Elite Finishes, I'd like a free painting estimate.",
  builder: {
    title: "Free painting estimate",
    questions: [
      {
        id: "scope",
        question: "What do you need painted?",
        options: [
          { label: "Interior" },
          { label: "Exterior" },
          { label: "Both inside and out" },
          { label: "Cabinets, trim or doors" },
        ],
      },
      {
        id: "interior_size",
        question: "How much of the inside?",
        showIf: { questionId: "scope", anyOf: ["Interior", "Both inside and out"] },
        options: [
          { label: "1 or 2 rooms" },
          { label: "3 to 5 rooms" },
          { label: "The whole interior" },
          { label: "Not sure yet" },
        ],
      },
      {
        id: "exterior_surface",
        question: "What's on the outside of your home?",
        showIf: { questionId: "scope", anyOf: ["Exterior", "Both inside and out"] },
        options: [
          { label: "Wood or fiber cement siding" },
          { label: "Brick or stucco" },
          { label: "Vinyl or aluminum siding" },
          { label: "Just trim, doors and shutters" },
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
      {        title: "Prep done right",
        text: "We patch, sand, caulk and prime first, so the finish looks smooth and lasts for years.",
      },
      {        title: "Exact color matching",
        text: "Painting one room? We match your existing colors so everything flows together.",
      },
      {        title: "Clean, careful crews",
        text: "Floors and furniture get covered, and your home is cleaned up before we leave.",
      },
      {        title: "Fair, upfront pricing",
        text: "You get a clear written estimate before any work starts. No surprise charges.",
      },
      {        title: "Fast estimates",
        text: "We get back to you within one business day and come out to see the job in person.",
      },
      {        title: "Licensed and insured",
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
  heroSlides: [
    "/images/lp/bathroom-hero.jpg",
    "/images/lp/ideas/bath-15062118.jpg",
    "/images/lp/ideas/bath-16501253.jpg",
    "/images/lp/ideas/bath-36777898.jpg",
  ],
  whyImage: "/images/lp/bathroom-offer.jpg",
  eyebrow: "Bathroom remodeling in the Baltimore area",
  headline: "Love your bathroom again.",
  subheadline:
    "Tile showers, new vanities and full remodels across the Baltimore area. One licensed contractor handles the whole job, from demo to final cleanup.",
  heroBullets: [
    "Custom tile showers, tub to shower conversions and new vanities",
    "One team coordinates every trade, start to finish",
    "Licensed and insured, with permits handled for you",
  ],
  offer: {
    variant: "dinner",
    badge: "$500 dining gift card with your remodel",
    short: "Dinner's on us: a $500 steakhouse gift card with your bathroom remodel",
    title: "Remodel your bathroom. Dinner's on us.",
    details:
      "Book your bathroom remodel with Elite Finishes and we'll hand you a $500 gift card to The Capital Grille or Ruth's Chris Steak House, your choice. Celebrate the new bathroom with a great dinner on us.",
    finePrint: OFFER_FINE_PRINT,
  },
  showFinancing: true,
  showReviews: false,
  ideas: {
    heading: "What could your bathroom look like?",
    subheading:
      "A few styles to get you thinking. Tell us what you like and we'll price it out for your space.",
    photos: [
      { src: "/images/lp/ideas/bath-15062118.jpg", label: "Freestanding tub and glass shower" },
      { src: "/images/lp/ideas/bath-16501253.jpg", label: "Double vanities in navy" },
      { src: "/images/lp/ideas/bath-10486087.jpg", label: "Tile shower with a patterned accent" },
      { src: "/images/lp/ideas/bath-36777942.jpg", label: "Soaking tub with subway tile" },
      { src: "/images/lp/ideas/bath-5502253.jpg", label: "Black vanity with round mirrors" },
      { src: "/images/lp/ideas/bath-36777898.jpg", label: "Marble look walk-in shower" },
      { src: "/images/lp/ideas/bath-7168080.jpg", label: "Subway tile tub surround" },
      { src: "/images/lp/ideas/bath-15062116.jpg", label: "Frameless glass shower" },
      { src: "/images/lp/ideas/bath-36511377.jpg", label: "Long vanity with brass fixtures" },
      { src: "/images/lp/ideas/bath-5502260.jpg", label: "Herringbone tile shower" },
      { src: "/images/lp/ideas/bath-39383568.jpg", label: "Soaking tub and separate shower" },
      { src: "/images/lp/ideas/bath-16342171.jpg", label: "Wood look tile and patterned floor" },
    ],
  },
  smsBody: "Hi Elite Finishes, I'd like a free bathroom remodel estimate.",
  builder: {
    title: "Free bathroom estimate",
    questions: [
      {
        id: "which",
        question: "Which bathroom are we remodeling?",
        options: [
          { label: "Primary bathroom" },
          { label: "Hall or guest bathroom" },
          { label: "Half bath or powder room" },
          { label: "More than one bathroom" },
        ],
      },
      {
        id: "scope",
        question: "How big of a remodel?",
        options: [
          { label: "Refresh: vanity, fixtures and paint" },
          { label: "New tile and shower" },
          { label: "Full gut renovation" },
          { label: "Tub to walk-in shower" },
        ],
      },
      {
        id: "budget",
        question: "Do you have a budget in mind?",
        options: [
          { label: "Under $8,000" },
          { label: "$8,000 to $20,000" },
          { label: "$20,000 to $40,000" },
          { label: "Still figuring it out" },
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
      {        title: "The complete bathroom",
        text: "Showers, tubs, tile, vanities, lighting and paint, all handled by one team.",
      },
      {        title: "One point of contact",
        text: "No juggling separate tile setters, plumbers and painters. We coordinate it all.",
      },
      {        title: "Licensed, insured, permitted",
        text: "MHIC 153498, fully insured, and we pull the permits when your project needs them.",
      },
      {        title: "Clean, careful crews",
        text: "We protect the rest of your home and clean up so you can live comfortably during the job.",
      },
      {        title: "Financing available",
        text: "Spread the cost into monthly payments. Checking your rate won't affect your credit score.",
      },
      {        title: "Fast estimates",
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
