export interface QuizOption {
  label: string;
  emoji: string;
  image?: string;
}

export interface QuizQuestion {
  question: string;
  subtext: string;
  options: QuizOption[];
}

// ── Shared questions reused across services ──────────────────────────────────

const DECISION_STAGE_QUESTION: QuizQuestion = {
  question: "Where are you in your decision process?",
  subtext:
    "Elite Finishes is happy to answer questions at any stage — no pressure, no pushy sales calls. Just honest advice from a local contractor who knows the work.",
  options: [
    { label: "Just starting to research", emoji: "🔍" },
    { label: "Comparing a few contractors", emoji: "⚖️" },
    { label: "Ready to hire the right person", emoji: "🏆" },
    { label: "Need to loop in my partner", emoji: "👫" },
  ],
};

// ── Quiz data per service (8 questions each) ───────────────────────────────────
// Order: type → size → material → situational #1 → situational #2 → budget → decision stage → timeline
// Timeline is always LAST so extractTimeframe() works correctly.

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
  "interior-painting": [
    {
      question: "What kind of interior painting project are you planning?",
      subtext:
        "Whether you need a single accent wall or a whole-home repaint, we bring the same level of prep and care to every job.",
      options: [
        { label: "Full home repaint", emoji: "🏠" },
        { label: "Several rooms", emoji: "🚪" },
        { label: "One or two rooms", emoji: "🖌️" },
        { label: "Touch-ups and accent walls", emoji: "🎨" },
      ],
    },
    {
      question: "How many rooms need painting?",
      subtext:
        "We provide itemized estimates so you know exactly what each room costs — no bundled pricing that hides where your money goes.",
      options: [
        { label: "1 to 2 rooms", emoji: "🏠" },
        { label: "3 to 5 rooms", emoji: "🛋️" },
        { label: "6 or more rooms", emoji: "🔥" },
        { label: "Whole house including halls", emoji: "🏡" },
      ],
    },
    {
      question: "What's the ceiling situation?",
      subtext:
        "High ceilings and two-story spaces require different equipment and more time — we account for this in every estimate.",
      options: [
        { label: "Standard 8 to 9 foot ceilings", emoji: "📐" },
        { label: "High ceilings 10 feet or more", emoji: "🏛️" },
        { label: "Vaulted or cathedral ceilings", emoji: "⛪" },
        { label: "Two-story foyer or stairwell", emoji: "🏗️" },
      ],
    },
    {
      question: "What's the current condition of the walls?",
      subtext:
        "Surface prep is the most important part of a lasting paint job. We assess every room before we price it so repairs are included, not surprises.",
      options: [
        { label: "Good condition — just needs fresh color", emoji: "✅" },
        { label: "Minor nail holes and scuffs to fix", emoji: "🔧" },
        { label: "Several patches or damaged areas", emoji: "🔨" },
        { label: "New drywall — never been painted", emoji: "🏗️" },
      ],
    },
    {
      question: "Should trim, doors, and ceilings be included?",
      subtext:
        "Painting trim to match or contrast walls is one of the most impactful upgrades you can make in an older home. We handle all of it.",
      options: [
        { label: "Walls only", emoji: "🖼️" },
        { label: "Walls plus trim and doors", emoji: "🚪" },
        { label: "Everything including ceilings", emoji: "🏠" },
        { label: "Ceilings only", emoji: "☁️" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Our estimates are detailed and transparent — you'll see exactly what you're getting for every dollar before we start.",
      options: [
        { label: "Under $1,500", emoji: "💵" },
        { label: "$1,500 to $4,000", emoji: "💰" },
        { label: "$4,000 to $8,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Our schedule fills fast, especially in spring and fall. Locking in an estimate now gets you the best availability.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This season", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "exterior-painting": [
    {
      question: "What exterior painting work do you need?",
      subtext:
        "We handle everything from full exterior repaints to trim refreshes and spot repairs — always with proper prep and premium product.",
      options: [
        { label: "Full exterior repaint", emoji: "🏠" },
        { label: "Front of home only", emoji: "🚪" },
        { label: "Trim, doors, and accents", emoji: "🎨" },
        { label: "Specific damaged areas", emoji: "🔧" },
      ],
    },
    {
      question: "How large is your home?",
      subtext:
        "Home size determines surface area and the amount of prep work involved — we scope every job accurately before pricing.",
      options: [
        { label: "Under 1,500 sq ft", emoji: "🏠" },
        { label: "1,500 to 2,500 sq ft", emoji: "🏡" },
        { label: "2,500 sq ft or larger", emoji: "🏘️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What type of siding does your home have?",
      subtext:
        "Different siding materials require different prep approaches and product specifications. We use the right primer and paint for every surface type.",
      options: [
        { label: "Vinyl siding", emoji: "🏠" },
        { label: "Wood siding or cedar shake", emoji: "🌲" },
        { label: "Brick or masonry", emoji: "🧱" },
        { label: "Fiber cement (HardiePlank)", emoji: "🔩" },
      ],
    },
    {
      question: "What's the current condition of the exterior?",
      subtext:
        "We inspect every surface before we estimate — so the prep work needed is priced in from the start, not added on later.",
      options: [
        { label: "Faded but otherwise intact", emoji: "✅" },
        { label: "Peeling or cracking in areas", emoji: "🔨" },
        { label: "Significant prep needed throughout", emoji: "⚠️" },
        { label: "Not sure — needs an assessment", emoji: "🤔" },
      ],
    },
    {
      question: "How many stories is your home?",
      subtext:
        "Multi-story work requires specialized equipment. We scope access and staging requirements during the site visit so there are no surprises.",
      options: [
        { label: "Single story", emoji: "🏠" },
        { label: "Two stories", emoji: "🏡" },
        { label: "Three or more stories", emoji: "🏢" },
        { label: "Mixed — varies by section", emoji: "📐" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Exterior painting costs depend on size, surface condition, and product choice. We walk you through every option so you can make an informed decision.",
      options: [
        { label: "Under $3,000", emoji: "💵" },
        { label: "$3,000 to $7,000", emoji: "💰" },
        { label: "$7,000 to $15,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want this done?",
      subtext:
        "Exterior painting is weather-dependent. We plan around conditions to make sure every coat cures properly — let us know your target window.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This season", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "kitchen-remodeling": [
    {
      question: "What level of kitchen remodel are you considering?",
      subtext:
        "We work at every level — from a fresh coat of paint and new cabinet hardware to a complete gut renovation. There's no wrong answer here.",
      options: [
        { label: "Cosmetic refresh (paint, hardware)", emoji: "🎨" },
        { label: "Cabinet painting or refacing", emoji: "🖌️" },
        { label: "Mid-level remodel (new cabinets, counters)", emoji: "🔧" },
        { label: "Full gut renovation", emoji: "🏗️" },
      ],
    },
    {
      question: "How large is your kitchen?",
      subtext:
        "Kitchen size drives material quantities and labor scope. We measure everything on-site before finalizing your estimate.",
      options: [
        { label: "Small galley under 100 sq ft", emoji: "📐" },
        { label: "Medium 100 to 200 sq ft", emoji: "🏡" },
        { label: "Large 200+ sq ft", emoji: "🔥" },
        { label: "Open concept — part of larger space", emoji: "🏠" },
      ],
    },
    {
      question: "What's your top priority in the remodel?",
      subtext:
        "Knowing where to focus lets us build an estimate around what matters most to you — and suggest where to save versus splurge.",
      options: [
        { label: "New cabinets", emoji: "🚪" },
        { label: "Countertops and backsplash", emoji: "🪨" },
        { label: "Flooring and tile", emoji: "⬜" },
        { label: "All of the above", emoji: "✨" },
      ],
    },
    {
      question: "Are you keeping the existing kitchen layout?",
      subtext:
        "Moving plumbing or electrical adds cost and scope. We help you evaluate whether the layout change is worth it before you commit.",
      options: [
        { label: "Yes — same footprint", emoji: "✅" },
        { label: "Minor changes to improve flow", emoji: "🔧" },
        { label: "Full layout redesign", emoji: "🏗️" },
        { label: "Not sure — need advice", emoji: "💭" },
      ],
    },
    {
      question: "What's the plan for appliances?",
      subtext:
        "New appliances affect cabinet sizing and rough electrical requirements. We coordinate appliance specs during the design phase.",
      options: [
        { label: "Keeping existing appliances", emoji: "✅" },
        { label: "Replacing some appliances", emoji: "🔄" },
        { label: "All new appliances", emoji: "✨" },
        { label: "Not decided yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Kitchen remodel budgets vary widely. We help you understand exactly what's possible at your number and where the best value is.",
      options: [
        { label: "Under $15,000", emoji: "💵" },
        { label: "$15,000 to $35,000", emoji: "💰" },
        { label: "$35,000 to $60,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you hoping to start?",
      subtext:
        "Kitchen remodels take planning — material lead times and permit schedules affect the start date. The earlier we connect, the smoother the timeline.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "Later this year", emoji: "🗓️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "bathroom-remodeling": [
    {
      question: "Which bathroom are you remodeling?",
      subtext:
        "The scope and priorities differ significantly between a primary bath, a guest bath, and a half bath. Tell us which one and we'll focus the estimate accordingly.",
      options: [
        { label: "Primary bathroom", emoji: "🛁" },
        { label: "Guest or hall bathroom", emoji: "🚿" },
        { label: "Half bath or powder room", emoji: "🪥" },
        { label: "Multiple bathrooms", emoji: "✨" },
      ],
    },
    {
      question: "How extensive is the remodel?",
      subtext:
        "We work at every level — from a cosmetic refresh to a full gut renovation. No project is too small or too large.",
      options: [
        { label: "Cosmetic refresh (paint, vanity, fixtures)", emoji: "🎨" },
        { label: "Mid-level remodel (tile, vanity, shower)", emoji: "🔧" },
        { label: "Full gut renovation", emoji: "🏗️" },
        { label: "Walk-in shower conversion", emoji: "🚿" },
      ],
    },
    {
      question: "What's most important to update?",
      subtext:
        "This helps us prioritize your budget toward the elements that will have the most impact on how the bathroom looks and functions.",
      options: [
        { label: "Tile and shower surround", emoji: "⬜" },
        { label: "Vanity and fixtures", emoji: "🪥" },
        { label: "The whole room equally", emoji: "🏠" },
        { label: "Accessibility features", emoji: "♿" },
      ],
    },
    {
      question: "Are you keeping the same plumbing layout?",
      subtext:
        "Moving plumbing adds significant cost and typically requires a permit. We'll tell you honestly if a layout change is worth it for your situation.",
      options: [
        { label: "Yes — same layout", emoji: "✅" },
        { label: "Moving some plumbing", emoji: "🔧" },
        { label: "Not sure yet", emoji: "🤔" },
        { label: "Want advice on the best layout", emoji: "💭" },
      ],
    },
    {
      question: "Any special features you want to include?",
      subtext:
        "Special features affect framing, waterproofing, and rough work requirements. Knowing this upfront helps us build an accurate estimate.",
      options: [
        { label: "Double vanity", emoji: "🪥" },
        { label: "Soaking tub", emoji: "🛁" },
        { label: "Large walk-in shower", emoji: "🚿" },
        { label: "No special features — keep it clean", emoji: "✅" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Bathroom remodel costs vary by scope and finish level. We give you honest options at multiple price points so you can decide what makes sense.",
      options: [
        { label: "Under $8,000", emoji: "💵" },
        { label: "$8,000 to $20,000", emoji: "💰" },
        { label: "$20,000 to $40,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you hoping to start?",
      subtext:
        "Bathroom remodels typically take 2 to 4 weeks once underway. We schedule around your situation to minimize disruption.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "Later this year", emoji: "🗓️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "home-remodeling": [
    {
      question: "What scope of home renovation are you planning?",
      subtext:
        "Whether it's several rooms or a whole-home transformation, we coordinate all trades so you work with one contractor instead of four.",
      options: [
        { label: "Multiple rooms at once", emoji: "🚪" },
        { label: "Open floor plan conversion", emoji: "🏠" },
        { label: "Full home renovation", emoji: "🔥" },
        { label: "Specific area — need to discuss", emoji: "💭" },
      ],
    },
    {
      question: "How large is your home?",
      subtext:
        "Home size helps us understand the full scope before we visit — so our estimate appointment is focused and efficient.",
      options: [
        { label: "Under 1,500 sq ft", emoji: "🏠" },
        { label: "1,500 to 2,500 sq ft", emoji: "🏡" },
        { label: "2,500 sq ft or larger", emoji: "🏘️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "Which trades are involved in your project?",
      subtext:
        "We handle painting, flooring, tile, drywall, and finish carpentry in-house — reducing coordination complexity and keeping your project on one schedule.",
      options: [
        { label: "Painting throughout", emoji: "🖌️" },
        { label: "Painting plus flooring", emoji: "⬜" },
        { label: "Painting, flooring, and tile work", emoji: "🔧" },
        { label: "Full interior renovation — all trades", emoji: "✨" },
      ],
    },
    {
      question: "Do you want to do it all at once or in phases?",
      subtext:
        "Phased renovations can be scheduled around your life and budget. We help you sequence phases so each one makes sense on its own.",
      options: [
        { label: "All at once — minimize disruption", emoji: "⚡" },
        { label: "Phased over time", emoji: "📅" },
        { label: "Not sure — need advice", emoji: "💭" },
        { label: "Depends on the timeline", emoji: "🗓️" },
      ],
    },
    {
      question: "Will you be home during the renovation?",
      subtext:
        "We plan our work around your schedule — whether you're staying home, relocating temporarily, or working with a partially occupied house.",
      options: [
        { label: "Yes — living here throughout", emoji: "🏠" },
        { label: "Moving out temporarily", emoji: "🧳" },
        { label: "Partially occupied", emoji: "🚪" },
        { label: "Not decided yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Whole-home renovation costs vary considerably. Sharing your range helps us focus on what's realistic rather than showing you options outside your budget.",
      options: [
        { label: "Under $30,000", emoji: "💵" },
        { label: "$30,000 to $75,000", emoji: "💰" },
        { label: "$75,000 to $150,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you hoping to start?",
      subtext:
        "Larger renovations take more planning — the sooner we connect, the more time we have to design, permit if needed, and sequence the work properly.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "Later this year", emoji: "🗓️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "basement-remodeling": [
    {
      question: "What do you want to do with your basement?",
      subtext:
        "A finished basement adds significant living space and value. Knowing the intended use helps us design the layout and spec the right finishes.",
      options: [
        { label: "General living and entertainment space", emoji: "🛋️" },
        { label: "Home office or gym", emoji: "💻" },
        { label: "Legal bedroom or in-law suite", emoji: "🛏️" },
        { label: "Multiple uses", emoji: "✨" },
      ],
    },
    {
      question: "How large is the basement?",
      subtext:
        "Size determines framing, drywall, flooring, and mechanical scope. We measure on-site to ensure every estimate is accurate.",
      options: [
        { label: "Under 500 sq ft", emoji: "📐" },
        { label: "500 to 800 sq ft", emoji: "🏡" },
        { label: "800 sq ft or more", emoji: "🔥" },
        { label: "Full walkout — not sure of size", emoji: "🚪" },
      ],
    },
    {
      question: "What's the current condition of the basement?",
      subtext:
        "Moisture issues must be addressed before any finishing work begins. We identify and discuss any moisture concerns during the site visit.",
      options: [
        { label: "Unfinished — dry and ready", emoji: "✅" },
        { label: "Partially finished — needs updates", emoji: "🔧" },
        { label: "Old finish to gut and redo", emoji: "🔨" },
        { label: "Had water issues — now resolved", emoji: "💧" },
      ],
    },
    {
      question: "What finishes are you looking for?",
      subtext:
        "We handle drywall, flooring, tile, and painting in-house. You can go as simple or as complete as your goals and budget allow.",
      options: [
        { label: "Drywall and paint — straightforward finish", emoji: "🖌️" },
        { label: "Flooring and paint throughout", emoji: "⬜" },
        { label: "Full finish with bathroom", emoji: "🚿" },
        { label: "Complete build-out with all features", emoji: "✨" },
      ],
    },
    {
      question: "Will you need an egress window for a legal bedroom?",
      subtext:
        "A code-compliant egress window is required for any bedroom in a finished basement. We handle the foundation cut and installation as part of the project.",
      options: [
        { label: "Already has an egress window", emoji: "✅" },
        { label: "Need an egress window added", emoji: "🏗️" },
        { label: "Walkout basement — egress not required", emoji: "🚪" },
        { label: "Not planning a bedroom down there", emoji: "🛋️" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Basement finishing costs vary by size, bathroom inclusion, and finish level. We'll give you a clear breakdown of exactly what you get at your budget.",
      options: [
        { label: "Under $20,000", emoji: "💵" },
        { label: "$20,000 to $45,000", emoji: "💰" },
        { label: "$45,000 to $80,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Basement projects require permits in most Maryland jurisdictions. Starting the planning process early gives us time to handle permitting before we break ground.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "Later this year", emoji: "🗓️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  flooring: [
    {
      question: "What type of flooring are you interested in?",
      subtext:
        "We install hardwood, engineered hardwood, LVP, tile, and carpet. We'll help you weigh the options for your specific rooms and lifestyle.",
      options: [
        { label: "Hardwood (solid or engineered)", emoji: "🌲" },
        { label: "Luxury vinyl plank (LVP)", emoji: "✨" },
        { label: "Tile", emoji: "⬜" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "How many rooms need new flooring?",
      subtext:
        "Installing flooring throughout multiple connected rooms at once is more efficient and ensures a consistent look with matching materials.",
      options: [
        { label: "One room", emoji: "🚪" },
        { label: "Two to three rooms", emoji: "🏠" },
        { label: "Four or more rooms", emoji: "🏡" },
        { label: "Whole house", emoji: "🔥" },
      ],
    },
    {
      question: "Which material are you leaning toward?",
      subtext:
        "We'll walk you through the cost, lifespan, and maintenance differences between every option so you can make an informed choice.",
      options: [
        { label: "Solid hardwood", emoji: "🌲" },
        { label: "Engineered hardwood", emoji: "🪵" },
        { label: "LVP (waterproof, low maintenance)", emoji: "💧" },
        { label: "Tile (kitchen, bath, or entry)", emoji: "⬜" },
      ],
    },
    {
      question: "What's the current subfloor situation?",
      subtext:
        "Squeaks, soft spots, and level issues must be addressed before new flooring goes down. We assess the subfloor during the estimate so there are no surprises.",
      options: [
        { label: "Solid and level — no issues", emoji: "✅" },
        { label: "Some squeaks or soft spots", emoji: "🔧" },
        { label: "Old flooring to remove first", emoji: "🔨" },
        { label: "Not sure — never looked closely", emoji: "🤔" },
      ],
    },
    {
      question: "Do the stairs need new flooring too?",
      subtext:
        "Matching stair treads to new flooring creates a finished, cohesive look. We handle stairs and risers as part of the project.",
      options: [
        { label: "No stairs involved", emoji: "✅" },
        { label: "Matching stair treads needed", emoji: "📐" },
        { label: "Full stair runner or carpet", emoji: "🏠" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Flooring costs vary by material, room size, and subfloor prep needed. We provide a line-item estimate so you see what's driving the number.",
      options: [
        { label: "Under $3,000", emoji: "💵" },
        { label: "$3,000 to $8,000", emoji: "💰" },
        { label: "$8,000 to $20,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Some flooring materials have lead times for special orders. Reaching out early lets us confirm availability and schedule your project without delays.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This season", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  siding: [
    {
      question: "What kind of siding work do you need?",
      subtext:
        "Whether you need a full replacement or targeted repairs, we assess the full exterior to make sure nothing gets missed.",
      options: [
        { label: "Full siding replacement", emoji: "🏠" },
        { label: "Partial replacement — damaged sections", emoji: "🔧" },
        { label: "Storm damage repair", emoji: "⚡" },
        { label: "Not sure — needs inspection", emoji: "🔍" },
      ],
    },
    {
      question: "How large is your home?",
      subtext:
        "Home size determines the amount of material and labor. We measure the exterior precisely before finalizing your estimate.",
      options: [
        { label: "Under 1,500 sq ft", emoji: "🏠" },
        { label: "1,500 to 2,500 sq ft", emoji: "🏡" },
        { label: "2,500 sq ft or larger", emoji: "🏘️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What siding material are you considering?",
      subtext:
        "We install fiber cement, vinyl, and wood siding. We'll help you compare durability, maintenance, and cost for each option in Maryland's climate.",
      options: [
        { label: "Fiber cement (HardiePlank)", emoji: "🏗️" },
        { label: "Vinyl", emoji: "✨" },
        { label: "Engineered wood", emoji: "🌲" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "What's the current condition of your siding?",
      subtext:
        "The condition of existing siding affects prep scope and whether the sheathing underneath needs to be evaluated or replaced.",
      options: [
        { label: "Faded and dated — structurally okay", emoji: "✅" },
        { label: "Damaged sections or warping", emoji: "🔧" },
        { label: "Actively failing — needs replacement", emoji: "🔨" },
        { label: "Storm damage — may need insurance claim", emoji: "⛈️" },
      ],
    },
    {
      question: "Should trim, soffits, and fascia be included?",
      subtext:
        "Replacing siding while leaving aged trim or deteriorating soffits creates a mismatched look. We coordinate the full exterior as part of the project.",
      options: [
        { label: "Siding only", emoji: "🏠" },
        { label: "Siding plus trim", emoji: "🔧" },
        { label: "Full exterior including soffits and fascia", emoji: "✨" },
        { label: "Not sure — want a recommendation", emoji: "💭" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Siding costs vary by material, home size, and the amount of prep involved. Our estimates are itemized so you see the full breakdown.",
      options: [
        { label: "Under $10,000", emoji: "💵" },
        { label: "$10,000 to $25,000", emoji: "💰" },
        { label: "$25,000 to $50,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get this done?",
      subtext:
        "Siding projects require good weather windows. Planning ahead lets us schedule at the right time for the best installation conditions.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This season", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  decks: [
    {
      question: "What kind of deck are you envisioning?",
      subtext:
        "We have built every style — from simple weekend retreats to full outdoor living rooms with built-in seating and pergola integration.",
      options: [
        { label: "Brand new deck", emoji: "🏗️" },
        { label: "Replace existing", emoji: "🔄" },
        { label: "Deck plus pergola", emoji: "🌿" },
        { label: "Expand existing", emoji: "➕" },
      ],
    },
    {
      question: "How big do you want to go?",
      subtext:
        "Our estimates are always honest and transparent — no surprise fees, no upselling. Just the right deck for your space and budget.",
      options: [
        { label: "Under 200 sq ft", emoji: "🏠" },
        { label: "200 to 400 sq ft", emoji: "🎉" },
        { label: "400+ sq ft", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What material are you leaning toward?",
      subtext:
        "We'll walk you through every option in person — composite, wood, hardwood — and help you pick what fits your budget and lifestyle.",
      options: [
        { label: "Composite (low-maintenance)", emoji: "✨" },
        { label: "Pressure-treated wood", emoji: "🌲" },
        { label: "Premium hardwood", emoji: "👑" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "How high off the ground will the deck be?",
      subtext:
        "Elevation determines structural requirements, footing depth, and whether a permit is required. We design everything to code so there are never any surprises.",
      options: [
        { label: "At grade or ground level", emoji: "🌿" },
        { label: "1 to 3 feet off the ground", emoji: "📐" },
        { label: "4+ feet — elevated or second story", emoji: "🏔️" },
        { label: "Depends on the design", emoji: "🤔" },
      ],
    },
    {
      question: "What is the deck connecting to?",
      subtext:
        "Attaching to brick or stucco requires special ledger flashing and waterproofing. We scope this correctly upfront so your estimate is accurate from day one.",
      options: [
        { label: "House wall — standard siding", emoji: "🏠" },
        { label: "House wall — brick or stucco", emoji: "🧱" },
        { label: "Freestanding or floating deck", emoji: "🏗️" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "This helps us prepare an estimate that actually fits your situation. We work at every price point with honest recommendations.",
      options: [
        { label: "Under $10,000", emoji: "💵" },
        { label: "$10,000 to $25,000", emoji: "💰" },
        { label: "$25,000 to $50,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you want to get started?",
      subtext:
        "Our calendar fills fast, especially in spring and summer. The sooner you lock in an estimate, the better your spot.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This summer", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  roofing: [
    {
      question: "What kind of roofing work do you need?",
      subtext:
        "Our roofing crew handles everything from emergency patch repairs to full tear-offs — fast response, done right the first time.",
      options: [
        { label: "Repair (leaks or damage)", emoji: "🔧" },
        { label: "Full replacement", emoji: "🏠" },
        { label: "New installation", emoji: "🏗️" },
        { label: "Inspection first", emoji: "🔍" },
      ],
    },
    {
      question: "How large is your home?",
      subtext:
        "We provide detailed, honest quotes — you'll know exactly what you're getting before a single nail is driven.",
      options: [
        { label: "Under 1,500 sq ft", emoji: "🏠" },
        { label: "1,500 to 2,500 sq ft", emoji: "🏡" },
        { label: "2,500+ sq ft", emoji: "🏘️" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's your current roof material?",
      subtext:
        "We work with all roofing materials and will make sure your replacement or repair is the right fit for your home and climate.",
      options: [
        { label: "Asphalt shingles", emoji: "🏠" },
        { label: "Metal", emoji: "🔩" },
        { label: "Tile", emoji: "🏛️" },
        { label: "Don't know", emoji: "💭" },
      ],
    },
    {
      question: "How many layers of shingles are on the roof now?",
      subtext:
        "Two layers already means a mandatory full tear-off before new shingles go on — Maryland code does not allow a third layer. We determine this exactly during the estimate.",
      options: [
        { label: "One layer (original shingles)", emoji: "1️⃣" },
        { label: "Two layers already on there", emoji: "2️⃣" },
        { label: "Not sure — house is older", emoji: "🤔" },
        { label: "New construction — no existing roof", emoji: "🏗️" },
      ],
    },
    {
      question: "Any signs of soft spots, rot, or deck damage?",
      subtext:
        "Rotted decking under the shingles has to be replaced before the new roof goes on. We inspect and quote any repairs honestly before a single shingle is removed.",
      options: [
        { label: "Feels solid — no soft spots noticed", emoji: "✅" },
        { label: "Some soft spots or sagging", emoji: "🔨" },
        { label: "Active leak — likely deck damage", emoji: "💧" },
        { label: "Not sure — needs inspection", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "We tell you upfront what your roof needs — and what it will cost — before any work begins. No surprises.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000 to $15,000", emoji: "💰" },
        { label: "$15,000 to $30,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "How urgent is this?",
      subtext:
        "We prioritize emergency calls — if you have an active leak right now, contact us directly and we will get someone out to you fast.",
      options: [
        { label: "Emergency — active leak!", emoji: "🚨" },
        { label: "Within 1 month", emoji: "📅" },
        { label: "Within 3 months", emoji: "🗓️" },
        { label: "Planning ahead", emoji: "🔍" },
      ],
    },
  ],

  "concrete-and-masonry": [
    {
      question: "What concrete or masonry work do you need?",
      subtext:
        "We handle concrete patios, walkways, steps, retaining walls, and masonry repairs throughout the Baltimore area.",
      options: [
        { label: "Concrete patio or pad", emoji: "⬜" },
        { label: "Walkway or front steps", emoji: "👣" },
        { label: "Masonry repair or repointing", emoji: "🧱" },
        { label: "Multiple items", emoji: "✨" },
      ],
    },
    {
      question: "Approximately how large is the area?",
      subtext:
        "Size drives material quantities and labor scope. We measure precisely on-site so your estimate is accurate.",
      options: [
        { label: "Under 200 sq ft", emoji: "📐" },
        { label: "200 to 500 sq ft", emoji: "🏡" },
        { label: "500+ sq ft", emoji: "🔥" },
        { label: "Not sure yet", emoji: "🤔" },
      ],
    },
    {
      question: "What material or finish are you interested in?",
      subtext:
        "We pour standard concrete, exposed aggregate, and decorative finishes. We'll help you choose based on your aesthetic goals and budget.",
      options: [
        { label: "Standard concrete — clean and simple", emoji: "⬜" },
        { label: "Exposed aggregate finish", emoji: "🪨" },
        { label: "Brick or block", emoji: "🧱" },
        { label: "Help me decide", emoji: "💭" },
      ],
    },
    {
      question: "What's the site condition?",
      subtext:
        "Grade changes, existing surfaces to remove, and drainage situations all affect scope. We identify these during the site visit.",
      options: [
        { label: "Level and clear — ready to pour", emoji: "✅" },
        { label: "Moderate slope to deal with", emoji: "📐" },
        { label: "Old concrete or surface to remove", emoji: "🔨" },
        { label: "Not sure — needs a look", emoji: "🤔" },
      ],
    },
    {
      question: "Are there any drainage concerns in this area?",
      subtext:
        "Proper drainage planning prevents water from pooling on concrete surfaces or running toward your home. We address this in the design phase.",
      options: [
        { label: "Drains well — no concerns", emoji: "✅" },
        { label: "Water pools there after rain", emoji: "💧" },
        { label: "Drainage issues nearby", emoji: "🔧" },
        { label: "Not sure", emoji: "🤔" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Concrete and masonry costs depend on size, site conditions, and finish. Our estimates are line-itemized so you see exactly what's included.",
      options: [
        { label: "Under $5,000", emoji: "💵" },
        { label: "$5,000 to $15,000", emoji: "💰" },
        { label: "$15,000 to $30,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When are you looking to get this done?",
      subtext:
        "Concrete work is weather-dependent. We plan around temperature and precipitation to ensure every pour cures properly.",
      options: [
        { label: "ASAP — I'm ready!", emoji: "⚡" },
        { label: "Within 3 months", emoji: "📅" },
        { label: "This season", emoji: "☀️" },
        { label: "Just exploring", emoji: "🔍" },
      ],
    },
  ],

  "commercial-services": [
    {
      question: "What type of commercial work are you looking for?",
      subtext:
        "We handle commercial painting and renovation for offices, retail spaces, restaurants, and multi-unit properties throughout the Baltimore area.",
      options: [
        { label: "Office interior painting", emoji: "🏢" },
        { label: "Retail or restaurant space", emoji: "🏪" },
        { label: "Multi-unit or apartment building", emoji: "🏘️" },
        { label: "Commercial exterior", emoji: "🏗️" },
      ],
    },
    {
      question: "How large is the space?",
      subtext:
        "Commercial project size helps us understand crew and scheduling requirements before the site walk.",
      options: [
        { label: "Under 2,000 sq ft", emoji: "📐" },
        { label: "2,000 to 5,000 sq ft", emoji: "🏢" },
        { label: "5,000+ sq ft", emoji: "🔥" },
        { label: "Multiple units or buildings", emoji: "🏘️" },
      ],
    },
    {
      question: "What are your scheduling requirements?",
      subtext:
        "We regularly work evenings and weekends to minimize disruption to your business. We build the work schedule around your operations.",
      options: [
        { label: "Standard business hours are fine", emoji: "✅" },
        { label: "After hours or weekends required", emoji: "🌙" },
        { label: "Phased — must keep sections open", emoji: "🔄" },
        { label: "Flexible — let's discuss", emoji: "💭" },
      ],
    },
    {
      question: "What's the full scope of work?",
      subtext:
        "Beyond painting, we handle flooring, drywall, and finish work for commercial tenant improvements — one contractor for multiple trades.",
      options: [
        { label: "Painting only", emoji: "🖌️" },
        { label: "Painting plus flooring", emoji: "⬜" },
        { label: "Full interior renovation", emoji: "🔧" },
        { label: "Not fully defined yet", emoji: "💭" },
      ],
    },
    {
      question: "Do you have specific certification or documentation requirements?",
      subtext:
        "We hold an MHIC contractor license and Women's Business Enterprise registration, and we can provide certificates of insurance and additional insured endorsements.",
      options: [
        { label: "Standard COI and insurance docs", emoji: "📋" },
        { label: "WBE or minority contractor required", emoji: "✅" },
        { label: "Government or institutional project", emoji: "🏛️" },
        { label: "No special requirements", emoji: "👍" },
      ],
    },
    {
      question: "What's your rough budget in mind?",
      subtext:
        "Commercial project costs vary by scope and scheduling requirements. We provide detailed, itemized estimates for every commercial project.",
      options: [
        { label: "Under $10,000", emoji: "💵" },
        { label: "$10,000 to $30,000", emoji: "💰" },
        { label: "$30,000 to $75,000", emoji: "💎" },
        { label: "Still figuring it out", emoji: "🤔" },
      ],
    },
    DECISION_STAGE_QUESTION,
    {
      question: "When do you need this completed?",
      subtext:
        "Commercial projects often have firm deadlines. Share your target date and we'll tell you honestly whether it's achievable.",
      options: [
        { label: "ASAP — urgent need", emoji: "⚡" },
        { label: "Within 4 to 6 weeks", emoji: "📅" },
        { label: "Within 3 months", emoji: "🗓️" },
        { label: "Flexible timeline", emoji: "🔍" },
      ],
    },
  ],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function extractTimeframe(lastAnswer: string): string {
  const a = lastAnswer.toLowerCase();
  if (a.includes("asap") || a.includes("emergency") || a.includes("active leak") || a.includes("urgent")) return "ASAP";
  if (a.includes("1 month") || a.includes("4 to 6 weeks")) return "Within 1 month";
  if (a.includes("3 month")) return "Within 3 months";
  if (a.includes("6 month")) return "Within 6 months";
  if (a.includes("summer") || a.includes("season")) return "This season";
  if (a.includes("next year") || a.includes("later this year")) return "Later this year";
  if (a.includes("explor") || a.includes("planning ahead") || a.includes("flexible")) return "Just exploring";
  return "To be discussed";
}

export function extractBudget(answers: string[]): string | null {
  const budgetAnswer = answers.find((a) => a.includes("$"));
  return budgetAnswer ?? null;
}
