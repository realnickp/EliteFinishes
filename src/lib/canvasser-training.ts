import { SITE } from "@/lib/constants";

export type TrainingCategoryId =
  | "openers"
  | "objections"
  | "pricing"
  | "services"
  | "closing"
  | "tips"
  | "prep"
  | "safety";

export interface TrainingItem {
  title: string;
  /** Optional short prefix tag rendered as a chip (e.g. "HOT LEAD"). */
  tag?: string;
  /** Script-style body. Use \n\n for paragraph breaks. */
  body: string;
  /** Optional searchable keywords beyond title/body. */
  keywords?: string[];
}

export interface TrainingCategory {
  id: TrainingCategoryId;
  title: string;
  subtitle: string;
  icon:
    | "doorOpen"
    | "messageCircle"
    | "tag"
    | "sparkles"
    | "handshake"
    | "lightbulb"
    | "listCheck"
    | "shield";
  accent: "orange" | "blue" | "emerald" | "amber" | "violet" | "rose";
  items: TrainingItem[];
}

const PHONE = SITE.phone;

export const TRAINING_CATEGORIES: TrainingCategory[] = [
  {
    id: "openers",
    title: "Door openers",
    subtitle: "What to say in the first 10 seconds.",
    icon: "doorOpen",
    accent: "orange",
    items: [
      {
        title: "The standard intro",
        tag: "Default",
        body: `"Hey, I'm [Name] with Elite Finishes — we're the painting and remodeling crew. I'm walking the neighborhood today offering free on-site estimates. Is there anything around the house you've been meaning to get a number on — paint, kitchen, roof, anything?"\n\nKeep it to one sentence. Let them talk.`,
      },
      {
        title: "The referral drop",
        tag: "Warm",
        body: `"Hey, I'm [Name] with Elite Finishes — Nick just finished a kitchen over on Cuba and asked me to check in with a few neighbors who might be thinking about their kitchen or bath. Got 60 seconds?"\n\nOnly use if you actually know of a nearby completed job. Homeowners can smell a fake reference.`,
      },
      {
        title: "Weather hook (after a storm)",
        tag: "Roofing",
        body: `"That storm last week caused a lot of roof calls. We're Elite Finishes — free 10-minute roof check while we're in the neighborhood. No pressure, just eyeballs."\n\nWorks for hail, wind, heavy rain. Set a timer in your head — if they say yes, we respect the 10 minutes.`,
      },
      {
        title: "Exterior eye-catch",
        tag: "Paint / Siding",
        body: `"Your [siding / trim / front door] caught my eye from the street. We're Elite Finishes — we do exterior painting and siding for this zip code. Worth a free ballpark number while I'm already here?"\n\nBe specific. Praise something real about their house.`,
      },
      {
        title: "The polite bow-out recovery",
        tag: "Every door",
        body: `If they start to shut the door:\n\n"No pressure at all — here's my card. If anything comes up, text me. Have a great one."\n\nAlways leave a card. Always. Even angry homeowners will call months later when they need a contractor.`,
      },
    ],
  },
  {
    id: "objections",
    title: "Objection handling",
    subtitle: "Every no is a not-now. Pivot, don't push.",
    icon: "messageCircle",
    accent: "rose",
    items: [
      {
        title: '"Not interested."',
        tag: "Most common",
        body: `Don't fight it.\n\n"Totally fair — five seconds: are you on our once-a-year neighborhood postcard list? Yes or no and I'm gone."\n\nIf yes → "Perfect, have a great day." If no → confirm address. Either way you've captured attention without forcing anything.`,
        keywords: ["no", "go away", "leave", "uninterested"],
      },
      {
        title: '"We just had that done."',
        body: `"Nice — what'd you have done?" [listen, show interest]\n\n"Good to know you're covered. Can I leave you a magnet for whoever you'd want us to call next time?"\n\nYou're exchanging cards, not pitches. A magnet on their fridge is a lead in six months.`,
        keywords: ["already done", "already have", "just painted", "just remodeled"],
      },
      {
        title: '"I need to talk to my spouse."',
        tag: "Close signal",
        body: `Huge green flag. They're interested enough to consult.\n\n"Smart — I'd do the same. That's exactly why we do estimates in the evening too so you both hear the same quote. What night works this week — Tuesday or Thursday?"\n\nTwo-option close. Never ask if, always ask which.`,
        keywords: ["spouse", "husband", "wife", "partner", "think about it"],
      },
      {
        title: '"How much does it cost?"',
        tag: "Price",
        body: `Give an honest range. Never dodge.\n\n"Honest ranges only: interior paint runs $1.5K–$8K depending on rooms, kitchen cosmetic refresh is $15K, mid $35K, full gut $60K+. Exact number comes from Nick walking it. Want me to set up the free walk-through?"\n\nGiving ranges builds trust. Hiding them kills it.`,
        keywords: ["price", "cost", "how much", "estimate", "budget", "ballpark"],
      },
      {
        title: '"Are you guys legit?"',
        tag: "Trust",
        body: `"Good question. MHIC ${SITE.license}, WBME 22380085, fully insured. Shop is at ${SITE.address.street} in ${SITE.address.zip}. Google us — check the reviews. I'll leave the card either way."\n\nConfident, specific, verifiable. Don't get defensive.`,
        keywords: ["legit", "scam", "real", "licensed", "insurance"],
      },
      {
        title: '"Send me a flyer."',
        body: `"Happy to. Can I text it to you instead? Saves me coming back and gets to you faster. What's a good number?"\n\nYou just captured a phone number without asking for it directly.`,
        keywords: ["flyer", "brochure", "mail", "send info"],
      },
      {
        title: '"I\'m busy right now."',
        body: `"Got it — sixty seconds for me to leave a card and grab your name for the estimate queue, then I'm out?"\n\nOr: "When's a better time today — an hour? Tonight? I'll swing back."\n\nBoth preserve the lead without pressuring them in the moment.`,
        keywords: ["busy", "not a good time", "later", "cooking"],
      },
      {
        title: '"Too expensive."',
        tag: "Price",
        body: `"Heard that before. Our quotes are itemized so you see exactly what each piece costs. You pick what stays and what goes. Want that breakdown?"\n\nItemization defuses sticker shock because it turns a number into choices.`,
        keywords: ["expensive", "can't afford", "too much", "price"],
      },
      {
        title: '"We\'re getting other quotes."',
        tag: "Comparison",
        body: `"Perfect — you should. Three is the sweet spot. If we're in your top three we'll itemize the quote so you can compare apples to apples. Want me to get you on the schedule?"\n\nEncourage the comparison. Confidence sells.`,
        keywords: ["other quotes", "shopping around", "comparing", "bids"],
      },
      {
        title: '"My brother-in-law does this."',
        body: `"Love that — family is family. If you ever need a second opinion or a backup bid, you've got my card."\n\nNever fight the in-law. Just plant the seed for later.`,
        keywords: ["family does", "friend does", "know someone", "brother", "cousin"],
      },
    ],
  },
  {
    id: "closing",
    title: "Closing the booking",
    subtitle: "Get the estimate on the calendar. That's the whole job.",
    icon: "handshake",
    accent: "emerald",
    items: [
      {
        title: "Two-option close",
        tag: "Use always",
        body: `Never ask "would you like an estimate?" — it's a yes/no question and no is free.\n\nAlways ask "which works better — morning or afternoon?" That frames the yes as already decided and lets them choose the logistics.\n\nOther pairs: Tuesday or Thursday · this week or next · 10am or 2pm.`,
      },
      {
        title: "Assume the yes",
        body: `"I'll put you down for Thursday at 2 — good?"\n\nDeliberate, confident, quick. If they push back you'll find out in a second. If they don't, you just booked.`,
      },
      {
        title: "Proximity urgency",
        body: `"Nick is in your neighborhood Thursday anyway — no charge to add you to the schedule."\n\nOnly use if it's true. Canvassers who lie about the schedule burn bridges for Nick.`,
      },
      {
        title: "The soft-land walk-away",
        body: `If they still won't book:\n\n"No pressure at all — here's my card. Text me when you want the estimate set up."\n\nA captured lead who calls you in two weeks is worth more than a forced booking that cancels.`,
      },
      {
        title: "The phone-first save",
        body: `If they absolutely refuse to book on the doorstep:\n\n"Totally fine. Can I grab your number so our office calls tomorrow around lunch to set it up? Takes two minutes off your plate."\n\nOffice calls are higher-commitment than a stranger at the door. This converts hesitant homeowners.`,
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing cheat sheet",
    subtitle: "Honest ranges for every service. Memorize these.",
    icon: "tag",
    accent: "amber",
    items: [
      { title: "Interior painting", body: "$1,500 – $8,000 depending on rooms and prep work.\n\nOne accent wall vs whole-home repaint. Prep is the real variable — crown molding, trim, patching." },
      { title: "Exterior painting", body: "$3,000 – $15,000 including power wash, caulking, and two coats.\n\nTwo-story homes and heavy trim push toward the upper end." },
      { title: "Kitchen remodeling", body: "Cosmetic refresh (paint cabinets, new counters, backsplash): ~$15,000\n\nMid-range (new cabinets, counters, appliances): ~$35,000\n\nFull gut (layout change, plumbing/electrical): $60,000+" },
      { title: "Bathroom remodeling", body: "$8,000 – $40,000.\n\nTile choice and fixtures drive the number. Full wet-area rebuild starts around $25K." },
      { title: "Home / whole-house remodeling", body: "$30,000 – $150,000+.\n\nScope defines the number — always book Nick for this, never quote it at the door." },
      { title: "Basement finishing", body: "$20,000 – $80,000.\n\nEgress, moisture control, and HVAC add significantly." },
      { title: "Decks", body: "$10,000 – $50,000.\n\nComposite costs ~40% more than pressure-treated wood but lasts 2–3× longer." },
      { title: "Flooring", body: "$3,000 – $20,000.\n\nLVP is the volume seller. Hardwood premium, carpet the low end." },
      { title: "Siding", body: "$10,000 – $50,000.\n\nVinyl mid-market, fiber cement premium, insulated vinyl is the sweet spot for energy savings." },
      { title: "Roofing", body: "$5,000 – $30,000.\n\nArchitectural asphalt most common. Metal and slate premium." },
      { title: "Concrete and masonry", body: "$5,000 – $30,000.\n\nDriveways, walkways, retaining walls, chimney repair." },
      { title: "Commercial services", body: "Custom. Always book Nick for a walk-through." },
    ],
  },
  {
    id: "services",
    title: "What we actually do",
    subtitle: "Quick-reference so you can answer service questions without guessing.",
    icon: "sparkles",
    accent: "blue",
    items: [
      {
        title: "Painting",
        body: "Interior, exterior, cabinets, decks, pressure washing, drywall repair, color consultation. Premium prep — caulking, patching, sanding — included on every job.",
      },
      {
        title: "Remodeling",
        body: "Kitchens, bathrooms, basements, whole-home. We handle cabinets, counters, tile, plumbing fixtures, electrical fixtures, flooring, and paint under one contract.",
      },
      {
        title: "Exterior",
        body: "Siding (vinyl / fiber cement / composite), roofing (asphalt / metal), decks (composite / wood), concrete slabs and patios, masonry repair and chimney work.",
      },
      {
        title: "Finishes & trades",
        body: "Hardwood, LVP, tile, carpet installation. Drywall repair and patching. Cabinet painting and refinishing.",
      },
      {
        title: "Commercial",
        body: "Office repaints, retail build-outs, multi-unit property maintenance. Night and weekend work available.",
      },
      {
        title: "What we don't do",
        body: "We don't do full new-construction builds, plumbing/HVAC service calls (only remodel-scope), or pools. If they ask, say we'll refer them to a trusted partner — don't promise.",
      },
      {
        title: "Warranties",
        body: "Painting: 2-year workmanship. Remodel: 1-year workmanship. Manufacturer warranties on materials pass straight through to the homeowner.",
      },
      {
        title: "How quotes work",
        body: `Free on-site estimate. Nick walks every job personally. Itemized quote emailed within 48 hours. No deposit until the job is scheduled. Licensed MHIC ${SITE.license}.`,
      },
    ],
  },
  {
    id: "tips",
    title: "Pro tips from the top canvassers",
    subtitle: "Little habits that double your close rate.",
    icon: "lightbulb",
    accent: "violet",
    items: [
      {
        title: "Name it back",
        body: "Use their first name 2–3 times in the conversation. Builds instant trust. Don't overdo it — once at intro, once mid-pitch, once on the close.",
      },
      {
        title: "Photo every yes",
        body: "When they book the estimate, ask: \"Can I snap a quick photo of the area so Nick walks in prepared?\" Most will say yes. Saves Nick 15 min on the actual estimate.",
      },
      {
        title: "Log it immediately",
        body: "Submit the lead in the app before walking to the next house. Five doors later you will forget details. Use the Notes field to capture anything non-obvious.",
      },
      {
        title: "The 3-day follow-up rule",
        body: "If they said 'let me think about it', text a check-in in 3–5 days — not 24 hours. One line: \"Hey [Name], it's [You] from Elite Finishes. Still good to set up that estimate this week?\"",
      },
      {
        title: "Dress code",
        body: "Branded Elite Finishes shirt, clean jeans or khakis, clean shoes, badge visible. No backpack (reads like a salesman). Closed hands at your sides, never crossed.",
      },
      {
        title: "Read the door",
        body: "Security camera, political sign, kids' toys, pet sign — each is a data point. Mention the kids' bikes or the garden before pitching. Micro-rapport wins.",
      },
      {
        title: "Never leave empty-handed",
        body: "Every no still deserves a card, a magnet, or a postcard-list signup. Your leave-behind is next month's lead.",
      },
      {
        title: "The silent 3 seconds",
        body: "After you ask if they need anything done around the house — shut up for three full seconds. Most homeowners will fill the silence with a project they've been thinking about. Interrupting costs you leads.",
      },
    ],
  },
  {
    id: "prep",
    title: "Daily prep checklist",
    subtitle: "Start every shift dialed in.",
    icon: "listCheck",
    accent: "emerald",
    items: [
      {
        title: "Before you leave the house",
        body: "• Phone charged to 100%, charger in bag\n• Elite Finishes badge visible\n• Cards, magnets, and mini-flyers in bag\n• Water bottle + sunscreen + weather layer\n• Territory map open in your phone\n• Do-not-knock list reviewed and flagged\n• Submit one test entry in the app to confirm login works",
      },
      {
        title: "On the street",
        body: "• Move at a steady pace — 15–20 doors/hour is the rhythm\n• Mark every address you knocked in the notes of your submissions\n• Take a 10-minute break every 2 hours\n• Eat before you're hungry; drink before you're thirsty",
      },
      {
        title: "End of shift",
        body: `• Submit every lead, even the weak ones\n• Text Nick if you hit an emergency (leak, exposed wiring) that can't wait\n• Log any DNK-list additions\n• Check your leaderboard ranking\n• Call ${PHONE} if you didn't get paid for a prior day`,
      },
    ],
  },
  {
    id: "safety",
    title: "Safety and etiquette",
    subtitle: "Non-negotiable rules.",
    icon: "shield",
    accent: "rose",
    items: [
      {
        title: "No means no",
        tag: "Hard rule",
        body: "On the first clear refusal, thank them, leave a card, walk away. Pressuring a homeowner damages the Elite Finishes brand for everyone.",
      },
      {
        title: "Never step inside a home",
        tag: "Hard rule",
        body: "Stay at the threshold unless Nick is with you for an estimate. Even if they invite you in. If they push, say \"policy — I'll wait right here.\"",
      },
      {
        title: "Time-of-day rules",
        body: "No knocking before 10am. No knocking after 7pm. Never knock on Sundays before noon. If a municipality posts stricter rules, those win.",
      },
      {
        title: "Skip signals",
        body: "• \"No soliciting\" sign → skip, log the address to DNK\n• Aggressive dog barking → skip, log to DNK\n• No cars in driveway, no lights → skip\n• Homeowner in distress → leave politely, text Nick",
      },
      {
        title: "Never accept",
        body: "Do not accept drinks, food, tips, or cash from a homeowner. If they insist, say \"I appreciate it — my boss would kill me. Have a great one.\"",
      },
      {
        title: "Hostile address? Mark it.",
        body: "If a homeowner is rude or threatening, add them to the Do-Not-Knock list in the notes of your last submission. Nick will flag it permanently.",
      },
      {
        title: "Emergency",
        body: `Call ${PHONE} immediately if there is:\n\n• A medical emergency at a home\n• Active water or gas leak they're unaware of\n• Aggressive or threatening situation\n• Structural hazard visible from the street (leaning tree, active fire damage)`,
      },
    ],
  },
];

export function searchTraining(query: string): Array<{
  category: TrainingCategory;
  item: TrainingItem;
}> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const out: Array<{ category: TrainingCategory; item: TrainingItem }> = [];
  for (const cat of TRAINING_CATEGORIES) {
    for (const item of cat.items) {
      const haystack = [
        item.title,
        item.body,
        cat.title,
        item.tag ?? "",
        (item.keywords ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      if (haystack.includes(q)) out.push({ category: cat, item });
    }
  }
  return out;
}
