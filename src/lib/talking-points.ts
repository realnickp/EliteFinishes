import { SITE } from "@/lib/constants";

export interface TalkingPointSection {
  id: string;
  title: string;
  icon: "sparkles" | "shield" | "tag" | "message" | "clock";
  items: Array<{ heading?: string; body: string }>;
}

export const TALKING_POINTS: TalkingPointSection[] = [
  {
    id: "services",
    title: "Services we offer",
    icon: "sparkles",
    items: [
      { heading: "Painting", body: "Interior, exterior, cabinets, decks, pressure washing." },
      { heading: "Remodeling", body: "Kitchens, bathrooms, basements, whole-home." },
      { heading: "Exterior", body: "Siding, roofing, decks, concrete, masonry." },
      { heading: "Finishes", body: "Flooring (hardwood, LVP, tile, carpet), drywall." },
      { heading: "Commercial", body: "Office repaints, multi-unit, retail build-outs." },
    ],
  },
  {
    id: "credentials",
    title: "Licensed and insured",
    icon: "shield",
    items: [
      {
        body: `${SITE.license} · WBME 22380085 · Based in Baltimore at ${SITE.address.street}, ${SITE.address.city} ${SITE.address.zip}.`,
      },
      { body: "Fully insured — certificate of insurance available before any work starts." },
      { body: "Nick is on every estimate. No sales middleman, no offshore call center." },
    ],
  },
  {
    id: "prices",
    title: "Honest price ranges",
    icon: "tag",
    items: [
      { heading: "Interior painting", body: "$1.5K – $8K depending on rooms and prep." },
      { heading: "Exterior painting", body: "$3K – $15K including prep and power wash." },
      { heading: "Kitchen remodel", body: "$15K cosmetic · $35K mid · $60K+ full gut." },
      { heading: "Bath remodel", body: "$8K – $40K, tile and fixtures drive the number." },
      { heading: "Basement", body: "$20K – $80K for finished living space." },
      { heading: "Decks", body: "$10K – $50K, composite costs ~40% more than wood." },
      { heading: "Roofing", body: "$5K – $30K for a residential replacement." },
      { heading: "Siding", body: "$10K – $50K depending on material and size." },
    ],
  },
  {
    id: "objections",
    title: "Common objections",
    icon: "message",
    items: [
      {
        heading: '"I need to talk to my spouse."',
        body: "Smart — we book estimates in the evening too so you both hear the same quote.",
      },
      {
        heading: '"We just had that done."',
        body: "Got it. Can I leave you a magnet for when something does come up?",
      },
      {
        heading: '"Not interested."',
        body: "No problem — five seconds: are you on our once-a-year neighborhood postcard list? Yes or no and I\'m gone.",
      },
      {
        heading: '"How much does a kitchen cost?"',
        body: "Honest range — $15K cosmetic, $35K mid, $60K+ full gut. Nick walks every cabinet on the estimate.",
      },
      {
        heading: '"Are you really local?"',
        body: `Shop at ${SITE.address.street} in ${SITE.address.zip} — yes, sir. MHIC 153498. Check us on Google.`,
      },
      {
        heading: '"What about insurance?"',
        body: "Fully insured. Certificate of insurance provided before any crew sets foot on your property.",
      },
    ],
  },
  {
    id: "next-steps",
    title: "What happens next",
    icon: "clock",
    items: [
      {
        body: "Within one business day, someone from our office calls to confirm availability and schedule a free on-site estimate.",
      },
      {
        body: "Nick comes out, walks the project, answers every question, and emails a line-item quote.",
      },
      {
        body: "No pressure. No deposit until the job is scheduled.",
      },
    ],
  },
];
