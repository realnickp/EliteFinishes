import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireCanvasser } from "@/lib/canvasser-auth";
import { consume } from "@/lib/rate-limit";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendEmail, EMAIL_TEMPLATES } from "@/lib/automations";
import { QUIZ_DATA, extractTimeframe, extractBudget } from "@/lib/quiz-data";
import { PRIMARY_SERVICES } from "@/lib/constants";
import {
  buildTeamLeadEmail,
  getTeamEmailRecipients,
} from "@/lib/team-notification";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireCanvasser(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const after = searchParams.get("after");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("leads")
    .select(
      "id, name, phone, email, service, city_or_zip, status, score, appointment_scheduled, appointment_date, photos, created_at"
    )
    .eq("canvasser_id", auth.canvasser.id)
    .order("created_at", { ascending: false })
    .limit(limit + 1);

  if (after) query = query.lt("created_at", after);

  const { data, error } = await query;
  if (error) {
    console.error("[CANVASSER LEADS GET]", error.message);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }

  const hasMore = (data?.length ?? 0) > limit;
  const leads = (data ?? []).slice(0, limit);
  const nextCursor = hasMore ? leads[leads.length - 1]?.created_at ?? null : null;

  return NextResponse.json({ leads, nextCursor, hasMore });
}

const BodySchema = z.object({
  name: z.string().trim().min(2).max(200),
  phone: z.string().trim().min(7).max(30),
  cityOrZip: z.string().trim().min(2).max(200),
  email: z.string().email().max(254).optional().or(z.literal("")),
  service: z.string().trim().min(1).max(100),
  answers: z.array(z.string().max(400)).max(12),
  photos: z.array(z.string().url().max(500)).max(10).default([]),
  notes: z.string().max(2000).optional(),
});

function buildDescriptionFromAnswers(serviceSlug: string, answers: string[]): string {
  const questions = QUIZ_DATA[serviceSlug] ?? [];
  const pairs = questions
    .map((q, i) => (answers[i] ? `${q.question.replace("?", "")}: ${answers[i]}` : null))
    .filter(Boolean) as string[];
  if (!pairs.length) return `Canvasser lead interested in service`;
  return pairs.join(" | ");
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

export async function POST(request: NextRequest) {
  const auth = await requireCanvasser(request);
  if (!auth.ok) return auth.response;
  const canvasser = auth.canvasser;

  if (!consume(`canvasser-submit:${canvasser.id}`, 60, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many submissions in the last hour. Slow down and try again." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = BodySchema.parse(await request.json());
  } catch (err) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const svc = PRIMARY_SERVICES.find((s) => s.slug === body.service);
  const serviceTitle = svc?.title ?? body.service;
  const normalizedPhone = normalizePhone(body.phone);
  const email = body.email?.trim() || "";
  const description = buildDescriptionFromAnswers(body.service, body.answers);
  const lastAnswer = body.answers[body.answers.length - 1] ?? "";
  const timeframe = extractTimeframe(lastAnswer);
  const budget = extractBudget(body.answers);
  const supabase = getSupabaseAdmin();

  // Note: no duplicate-phone suppression here. Canvassers are authenticated
  // and rate-limited, and two canvassers can legitimately pitch the same
  // household on the same day — each submission deserves its own lead +
  // notification so attribution is correct.

  const { score, factors, priority } = calculateLeadScore({
    phone: normalizedPhone,
    email: email || undefined,
    city_or_zip: body.cityOrZip,
    service: serviceTitle,
    description,
    timeframe,
    budget: budget ?? undefined,
    source: "canvasser",
  });

  const leadData: Record<string, unknown> = {
    name: body.name.trim(),
    email,
    phone: normalizedPhone,
    service: serviceTitle,
    city_or_zip: body.cityOrZip.trim(),
    description: body.notes ? `${description}${description ? " | " : ""}Canvasser note: ${body.notes.trim()}` : description,
    timeframe,
    budget: budget ?? null,
    status: "new",
    source: "canvasser",
    canvasser_id: canvasser.id,
    photos: body.photos,
    score,
    score_factors: factors,
    status_history: [
      {
        status: "new",
        timestamp: new Date().toISOString(),
        notes: `Submitted by canvasser ${canvasser.name}`,
      },
    ],
  };

  let { data, error } = await supabase
    .from("leads")
    .insert(leadData)
    .select("id")
    .single();

  // If canvasser_id / photos columns missing, fall back. Shouldn't happen once
  // migration 003 has run, but keeps parity with /api/leads insert robustness.
  if (error && /canvasser_id|photos/.test(error.message ?? "")) {
    console.warn("[CANVASSER LEAD] Falling back without canvasser_id/photos:", error.message);
    const { canvasser_id: _ci, photos: _ph, ...fallbackData } = leadData;
    void _ci;
    void _ph;
    const retry = await supabase.from("leads").insert(fallbackData).select("id").single();
    data = retry.data;
    error = retry.error;
  }

  if (error || !data) {
    console.error("[CANVASSER LEAD] Insert failed:", error?.message);
    return NextResponse.json(
      { error: "We couldn't save the lead. Please try again." },
      { status: 500 }
    );
  }

  const leadId = data.id as string;

  // Welcome email to the prospect (if they gave one).
  if (email) {
    const ctx = {
      leadId,
      leadName: body.name.trim(),
      leadPhone: normalizedPhone,
      leadEmail: email,
      leadService: serviceTitle,
    };
    const tmpl = EMAIL_TEMPLATES.welcome_email(ctx);
    await sendEmail(email, tmpl.subject, tmpl.html)
      .then((r) => console.log("[CANVASSER WELCOME EMAIL]", email, JSON.stringify(r)))
      .catch((err) => console.error("[CANVASSER WELCOME EMAIL]", email, err));
  }

  const teamEmails = getTeamEmailRecipients();
  console.log(
    `[CANVASSER LEAD] leadId=${leadId} canvasser=${canvasser.name} recipients=${teamEmails.length} resend=${process.env.RESEND_API_KEY ? "set" : "missing"}`
  );
  if (teamEmails.length === 0) {
    console.warn(
      "[CANVASSER LEAD] EMAIL_NOTIFY_TO is empty — no team notification will fire. Set it in Vercel env vars."
    );
  }
  if (teamEmails.length > 0) {
    const { subject, html } = buildTeamLeadEmail({
      channel: "canvasser",
      leadId,
      name: body.name.trim(),
      phone: normalizedPhone,
      email: email || null,
      service: serviceTitle,
      cityOrZip: body.cityOrZip.trim(),
      timeframe,
      budget,
      description,
      source: "canvasser",
      score,
      priority,
      canvasser: { name: canvasser.name },
      photos: body.photos,
    });

    await Promise.allSettled(
      teamEmails.map((to) =>
        sendEmail(to, subject, html)
          .then((r) => console.log("[CANVASSER TEAM EMAIL]", to, JSON.stringify(r)))
          .catch((err) => console.error("[CANVASSER TEAM EMAIL]", to, err))
      )
    );
  }

  return NextResponse.json({ success: true, leadId, score, priority });
}
