import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendSMS, sendEmail, SMS_TEMPLATES, EMAIL_TEMPLATES } from "@/lib/automations";
import { requireAuth } from "@/lib/auth";
import { env, hasRecaptcha } from "@/lib/env";

// ── GET /api/leads — list with filters (dashboard only) ───

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortDir = searchParams.get("sortDir") || "desc";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
    const offset = parseInt(searchParams.get("offset") || "0");

    let query = supabase
      .from("leads")
      .select("*, note_count:lead_notes(count), communication_count:lead_communications(count)", { count: "exact" })
      .order(sortBy, { ascending: sortDir === "asc" })
      .range(offset, offset + limit - 1);

    if (status) query = query.eq("status", status);
    if (source) query = query.eq("source", source);
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,service.ilike.%${search}%`
      );
    }

    let result = await query;
    // If extended schema (lead_notes/lead_communications) missing, fall back to leads only
    if (result.error && (result.error.message?.includes("lead_notes") || result.error.message?.includes("lead_communications"))) {
      let fallbackQuery = supabase
        .from("leads")
        .select("*", { count: "exact" })
        .order(sortBy, { ascending: sortDir === "asc" })
        .range(offset, offset + limit - 1);
      if (status) fallbackQuery = fallbackQuery.eq("status", status);
      if (search) {
        fallbackQuery = fallbackQuery.or(
          `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,service.ilike.%${search}%`
        );
      }
      result = await fallbackQuery;
    }
    const { data, error, count } = result;
    if (error) throw error;

    return NextResponse.json({ leads: data || [], total: count ?? (data?.length ?? 0) });
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── PATCH /api/leads — bulk status update ─────────────────

export async function PATCH(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const { ids, updates } = body as { ids: string[]; updates: Record<string, unknown> };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    const allowed = ["status", "assigned_to", "source"];
    const safeUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    for (const key of allowed) {
      if (key in updates) safeUpdates[key] = updates[key];
    }

    if (Object.keys(safeUpdates).length === 1) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").update(safeUpdates).in("id", ids);
    if (error) throw error;

    return NextResponse.json({ success: true, updated: ids.length });
  } catch (err) {
    console.error("PATCH /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── DELETE /api/leads — bulk delete ───────────────────────

export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();
    const { ids } = await request.json() as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").delete().in("id", ids);
    if (error) throw error;

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (err) {
    console.error("DELETE /api/leads error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ── POST /api/leads — create lead from website form (public) ───────

// Field length limits
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_SERVICE = 100;
const MAX_CITY = 200;
const MAX_DESCRIPTION = 5000;
const MAX_TIMEFRAME = 100;
const MAX_BUDGET = 100;
const MAX_STYLE = 100;
const MAX_UTM = 500;
const MAX_TRANSCRIPT = 50000;

function truncate(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = env.recaptchaSecretKey;
  if (!secret) return true;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });
    const data = await res.json();
    return Boolean(data?.success);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Optional reCAPTCHA: when RECAPTCHA_SECRET_KEY is set and token is sent, verify it
    const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : null;
    if (hasRecaptcha() && recaptchaToken) {
      const valid = await verifyRecaptcha(recaptchaToken);
      if (!valid) {
        return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
      }
    }

    // Sanitize and limit all string inputs
    const name = truncate(body.name, MAX_NAME).trim();
    const email = truncate(body.email, MAX_EMAIL).trim();
    const phone = truncate(body.phone, MAX_PHONE).trim();
    const service = truncate(body.service, MAX_SERVICE).trim();
    const cityOrZip = truncate(body.cityOrZip || body.city, MAX_CITY).trim();
    const description = truncate(body.description || body.message, MAX_DESCRIPTION).trim();
    const timeframe = truncate(body.timeframe, MAX_TIMEFRAME).trim();
    const budget = truncate(body.budget, MAX_BUDGET).trim() || null;
    const preferredStyle = truncate(body.preferredStyle, MAX_STYLE).trim() || null;
    const chatTranscript = truncate(body.chatTranscript, MAX_TRANSCRIPT) || null;
    const chatbotQualified = Boolean(body.chatbotQualified);
    const bodySource = truncate(body.source, 50).trim();

    // UTM / source tracking — accept from body but limit length
    const utmSource = truncate(body.utmSource, MAX_UTM).trim() || null;
    const utmMedium = truncate(body.utmMedium, MAX_UTM).trim() || null;
    const utmCampaign = truncate(body.utmCampaign, MAX_UTM).trim() || null;
    const landingPage = truncate(body.landingPage, MAX_UTM).trim() || null;

    const isChatbot = bodySource === "chatbot" || chatbotQualified;

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isChatbot && (!cityOrZip || !description || !timeframe)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Detect source — prefer the specific label the client sends (e.g. "quote_page", "lp_quiz:interior-painting")
    const source = bodySource || utmSource || (landingPage?.includes("google") ? "google_ads" : "website:unknown");

    // Score the lead
    const { score, factors, priority } = calculateLeadScore({
      phone: phone || undefined,
      email: email || undefined,
      city_or_zip: cityOrZip || undefined,
      service: service || undefined,
      description: description || undefined,
      timeframe: timeframe || undefined,
      budget: budget ?? undefined,
      source: source || undefined,
      utm_campaign: utmCampaign ?? undefined,
      chatbot_qualified: isChatbot,
    });

    // Build lead data — omit preferred_style if column doesn't exist yet
    const leadData: Record<string, unknown> = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: cityOrZip || "Not specified",
      description: description || `Interested in: ${service}`,
      timeframe: timeframe || "To be discussed",
      budget: budget || null,
      status: isChatbot ? "chatbot_qualified" : "new",
      source,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      landing_page: landingPage,
      score,
      score_factors: factors,
      chat_transcript: chatTranscript,
      chatbot_qualified: isChatbot || false,
      status_history: [{ status: "new", timestamp: new Date().toISOString() }],
    };
    if (preferredStyle) leadData.preferred_style = preferredStyle;

    let leadId: string | null = null;
    const adminSupabase = getSupabaseAdmin();

    // Minimal payload: only columns in base schema (works if migration hasn't been run)
    const minimalLeadData = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: cityOrZip || "Not specified",
      description: description || `Interested in: ${service}`,
      timeframe: timeframe || "To be discussed",
      budget: budget || null,
      status: "new" as const,
      notes: [source, utmSource, utmCampaign, landingPage].filter(Boolean).join(" | ") || null,
    };

    // Try full insert first (supports extended schema)
    let { data, error } = await adminSupabase.from("leads").insert(leadData).select("id").single();
    if (error && error.message?.includes("preferred_style")) {
      delete leadData.preferred_style;
      const retry = await adminSupabase.from("leads").insert(leadData).select("id").single();
      data = retry.data;
      error = retry.error;
    }
    // If full insert fails (e.g. missing columns or status constraint), fall back to minimal so lead still saves
    if (error) {
      console.warn("Lead full insert failed, trying minimal insert:", error.message);
      const fallback = await adminSupabase.from("leads").insert(minimalLeadData).select("id").single();
      if (fallback.error) {
        console.error("Lead minimal insert also failed:", fallback.error.message, fallback.error.details);
        return NextResponse.json(
          { error: "We couldn't save your request. Please call us directly or try again." },
          { status: 500 }
        );
      }
      data = fallback.data;
      error = null;
    }
    if (data) leadId = data.id;

    // ── Send all emails and SMS, awaiting completion so Vercel doesn't kill them ──
    if (leadId && phone) {
      const ctx = { leadId, leadName: name, leadPhone: phone, leadEmail: email, leadService: service };

      const emailPromises: Promise<unknown>[] = [];

      // Welcome email to the lead
      if (email) {
        console.log("[WELCOME EMAIL] Sending to:", email);
        const tmpl = EMAIL_TEMPLATES.welcome_email(ctx);
        emailPromises.push(
          sendEmail(email, tmpl.subject, tmpl.html)
            .then((r) => console.log("[WELCOME EMAIL] Result:", JSON.stringify(r)))
            .catch((err) => console.error("[WELCOME EMAIL] Error:", err))
        );
      } else {
        console.log("[WELCOME EMAIL] Skipped — email is empty. Raw body.email:", JSON.stringify(body.email));
      }

      // Team notification emails
      const TEAM_EMAILS = ["realnickpatrick@gmail.com", "Elitefinishesmd@gmail.com"];
      const leadNotifHtml = `
        <h2>New Lead Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
          ${email ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${service}</td></tr>
          ${cityOrZip ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Location</td><td style="padding:8px;border-bottom:1px solid #eee;">${cityOrZip}</td></tr>` : ""}
          ${description ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Details</td><td style="padding:8px;border-bottom:1px solid #eee;">${description}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Score</td><td style="padding:8px;border-bottom:1px solid #eee;">${score} pts (${priority})</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Source</td><td style="padding:8px;">${bodySource || source || "website"}</td></tr>
        </table>
      `;
      const scoreEmoji = priority === "hot" ? "🔥" : priority === "warm" ? "⚡" : "📋";
      for (const teamEmail of TEAM_EMAILS) {
        emailPromises.push(
          sendEmail(teamEmail, `${scoreEmoji} New Lead: ${name} — ${service}`, leadNotifHtml)
            .then((r) => console.log("[TEAM EMAIL]", teamEmail, "Result:", JSON.stringify(r)))
            .catch((err) => console.error("[TEAM EMAIL]", teamEmail, "Error:", err))
        );
      }

      // Wait for ALL emails to finish before returning — prevents Vercel from killing the function
      await Promise.allSettled(emailPromises);

      // SMS notifications (non-critical, fire-and-forget is fine)
      sendSMS(phone, SMS_TEMPLATES.welcome_sms(ctx)).catch(console.error);
      const adminPhone = env.adminPhone;
      if (adminPhone) {
        const scoreLabel = priority === "hot" ? "🔥 HOT" : priority === "warm" ? "⚡ WARM" : "📋";
        sendSMS(
          adminPhone,
          `${scoreLabel} NEW LEAD (${score}pts): ${name} · ${service} · ${phone} · ${cityOrZip}`
        ).catch(console.error);
      }
    }

    return NextResponse.json({
      success: true,
      leadId,
      score,
      priority,
      estimatedResponse: "Within one business day",
    });
  } catch (err) {
    console.error("Lead creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
