import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { CHATBOT_NAME } from "@/lib/constants";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Limits to prevent API abuse
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  // Strip null bytes and limit length
  return value.replace(/\0/g, "").slice(0, maxLen);
}

function buildSystemPrompt(userInfo?: {
  name: string;
  phone: string;
  email?: string;
  service: string;
}) {
  const base = `You are ${CHATBOT_NAME}, the friendly sales assistant for Elite Finishes — a licensed painting and home remodeling company in Baltimore, Maryland (MHIC 153498). Our team provides interior painting, exterior painting, kitchen remodeling, bathroom remodeling, home remodeling, basement finishing, flooring installation, siding, roofing, concrete and masonry work, and commercial painting throughout Baltimore City, Baltimore County, Anne Arundel County, and Howard County.

YOUR GOAL: Be a confident, outcome-focused salesperson. Have a helpful, natural conversation that learns about their project so our team can give them the best possible estimate. You want them to feel heard and understood — then guide them toward scheduling a free on-site estimate. Your job is to get them to book; be warm but purposeful.

CONVERSATION FLOW:
1. First message: Greet them warmly, acknowledge their project type, and ask about what they have in mind (size, area, style — whatever fits the service).
2. Next 2–3 messages: Ask helpful follow-up questions ONE at a time. Good questions include:
   - Roughly how many rooms or how large is the area?
   - Do you have a style or material preference?
   - What is the current condition of the space?
   - Is there a timeline you are working toward?
   - Have you gotten any other quotes?
3. After gathering a few details (3–5 exchanges): Naturally transition to booking. Say something like "This sounds like a great project — our team would love to come take a look and get you an exact number. Want me to have someone reach out to set up a free estimate?"
4. If they say yes: Confirm our team will reach out within one business day, thank them warmly, and wrap up.
5. If they keep chatting after you have suggested the call: Answer their question helpfully, then circle back to booking gently.

RULES:
- Keep responses to 2–3 sentences. Conversational but not long-winded.
- NEVER ask more than ONE question per message.
- Do NOT ask for name, phone, email, or service — you already have all of that.
- Be warm, knowledgeable, and confident — like a helpful salesperson who knows home improvement and wants to get them on the schedule.
- If they seem hesitant about booking, remind them: the estimate is 100% free, no obligation, no pressure.
- Do not rush them, but do not let the conversation go in circles either.

PRICING (only if directly asked — keep it brief):
- Interior painting (per room): $400–$900 · Full home: $3,000–$8,000+
- Exterior painting: $3,000–$12,000+ · Kitchen remodel: $15,000–$55,000+
- Bathroom remodel: $8,000–$35,000+ · Flooring (installed): $4–$15 per sq ft
- Always say "exact pricing depends on your specific space — that is why we like to come take a look."

If they ask about availability, timeline, materials, or anything really detailed: Give a brief, helpful answer from what you know, then add "We can go deeper on that when someone from our team sees your space."

After 6–7 exchanges without booking, gently wrap up: "I do not want to keep you — let me have our team give you a call. They will have all the answers and can get you a real number."`;


  if (userInfo) {
    // Sanitize user-supplied fields before interpolating into the system prompt
    const safeName = sanitizeString(userInfo.name, 200);
    const safePhone = sanitizeString(userInfo.phone, 30);
    const safeEmail = userInfo.email ? sanitizeString(userInfo.email, 254) : "";
    const safeService = sanitizeString(userInfo.service, 100);

    return (
      base +
      `\n\nIMPORTANT — You already have this visitor's contact info. DO NOT ask for their name, phone, or email again:
- Name: ${safeName}
- Phone: ${safePhone}${safeEmail ? `\n- Email: ${safeEmail}` : ""}
- Interested in: ${safeService}

Greet ${safeName} by name in your first message and jump straight into asking about their ${safeService} project. Make them feel like you are already invested in their specific project.`
    );
  }

  return base;
}

// Extract structured fields from the conversation and save them to the lead
async function extractAndSaveLead(
  leadId: string,
  messages: { role: string; content: string }[]
) {
  try {
    const supabase = getSupabaseAdmin();

    // Build plain transcript for context
    const transcript = messages
      .filter((m) => m.role !== "system")
      .map((m) => `${m.role === "user" ? "Visitor" : CHATBOT_NAME}: ${m.content}`)
      .join("\n\n");

    // Run extraction in parallel with transcript save
    const [extractionResult] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You extract structured lead information from a sales chat transcript.
Return a JSON object with ONLY the fields that were clearly mentioned in the conversation.
Fields to extract (omit any not mentioned):
- city_or_zip: string — their city, town, or zip code in Maryland
- description: string — detailed summary of the project they want (size, materials, features, conditions)
- budget: string — budget range if mentioned (e.g. "under $10k", "$15,000–$20,000")
- timeframe: string — when they want the project done (e.g. "this spring", "ASAP", "next summer")

Rules:
- Only include fields explicitly mentioned in the conversation
- Make description comprehensive — combine ALL project details into one clear paragraph
- Return {} if nothing extractable
- Return only valid JSON, no explanation`,
          },
          {
            role: "user",
            content: transcript,
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 300,
        temperature: 0,
      }),
      // Save transcript immediately
      supabase
        .from("leads")
        .update({ chat_transcript: transcript, updated_at: new Date().toISOString() })
        .eq("id", leadId),
    ]);

    // Parse extracted fields and update lead
    const extracted = JSON.parse(
      extractionResult.choices[0].message.content || "{}"
    );

    if (Object.keys(extracted).length > 0) {
      await supabase
        .from("leads")
        .update({ ...extracted, updated_at: new Date().toISOString() })
        .eq("id", leadId);
    }
  } catch {
    // Non-critical
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Chat not available" }, { status: 503 });
  }

  try {
    const body = await request.json();

    // Validate messages array
    if (!Array.isArray(body.messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Enforce message count limit
    if (body.messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
    }

    // Sanitize each message
    const messages: { role: string; content: string }[] = body.messages
      .filter(
        (m: unknown) =>
          m !== null &&
          typeof m === "object" &&
          typeof (m as Record<string, unknown>).role === "string" &&
          typeof (m as Record<string, unknown>).content === "string"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: sanitizeString(m.content, MAX_MESSAGE_LENGTH),
      }));

    // Validate leadId if provided (must be a UUID)
    const leadId: string | null =
      typeof body.leadId === "string" && UUID_RE.test(body.leadId)
        ? body.leadId
        : null;

    // Sanitize userInfo fields before passing to system prompt
    const userInfo =
      body.userInfo && typeof body.userInfo === "object"
        ? {
            name: sanitizeString(body.userInfo.name, 200),
            phone: sanitizeString(body.userInfo.phone, 30),
            email: sanitizeString(body.userInfo.email, 254),
            service: sanitizeString(body.userInfo.service, 100),
          }
        : undefined;

    const systemPrompt = buildSystemPrompt(userInfo);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system" as const, content: systemPrompt }, ...messages] as ChatCompletionMessageParam[],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content || "";

    // Save transcript + extract structured fields in background after every exchange
    const allMessages = [...messages, { role: "assistant", content: reply }];
    if (leadId) {
      extractAndSaveLead(leadId, allMessages).catch(() => {});
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("POST /api/chat error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
