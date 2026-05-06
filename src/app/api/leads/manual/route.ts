import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendEmail, EMAIL_TEMPLATES } from "@/lib/automations";
import { buildTeamLeadEmail } from "@/lib/team-notification";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();

    const name = (body.name || "").trim().slice(0, 200);
    const phone = (body.phone || "").replace(/[^\d+()-\s]/g, "").trim().slice(0, 30);
    const email = (body.email || "").trim().slice(0, 254);
    const service = (body.service || "").trim().slice(0, 100);
    const cityOrZip = (body.cityOrZip || "").trim().slice(0, 200);
    const description = (body.description || "").trim().slice(0, 5000);
    const timeframe = (body.timeframe || "").trim().slice(0, 100);
    const budget = (body.budget || "").trim().slice(0, 100) || null;
    const source = (body.source || "manual").trim().slice(0, 100);

    // Validate required fields
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Name is required (2+ characters)" }, { status: 400 });
    }
    if (!phone || phone.replace(/\D/g, "").length < 7) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!service) {
      return NextResponse.json({ error: "Service is required" }, { status: 400 });
    }
    if (!cityOrZip || cityOrZip.length < 2) {
      return NextResponse.json({ error: "City or zip is required" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "Description is required (10+ characters)" }, { status: 400 });
    }
    if (!timeframe) {
      return NextResponse.json({ error: "Timeframe is required" }, { status: 400 });
    }

    // Score the lead
    const { score, factors, priority } = calculateLeadScore({
      phone,
      email: email || undefined,
      city_or_zip: cityOrZip,
      service,
      description,
      timeframe,
      budget: budget ?? undefined,
      source,
    });

    // Build lead data
    const leadData: Record<string, unknown> = {
      name,
      email: email || "",
      phone,
      service,
      city_or_zip: cityOrZip,
      description,
      timeframe,
      budget,
      status: "new",
      source,
      score,
      score_factors: factors,
      chatbot_qualified: false,
      status_history: [{ status: "new", timestamp: new Date().toISOString(), notes: "Manually added from dashboard" }],
    };

    const adminSupabase = getSupabaseAdmin();

    // Try full insert, fall back to minimal if extended columns don't exist
    let { data, error } = await adminSupabase.from("leads").insert(leadData).select("id").single();
    if (error) {
      console.warn("[MANUAL LEAD] Full insert failed, trying minimal:", error.message);
      const minimalData = {
        name,
        email: email || "",
        phone,
        service,
        city_or_zip: cityOrZip,
        description,
        timeframe,
        budget,
        status: "new" as const,
        notes: `Source: ${source}`,
      };
      const fallback = await adminSupabase.from("leads").insert(minimalData).select("id").single();
      if (fallback.error) {
        console.error("[MANUAL LEAD] Insert failed:", fallback.error.message);
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
      }
      data = fallback.data;
      error = null;
    }

    const leadId = data?.id;

    // Welcome email to the prospect (if they gave one).
    if (leadId && email) {
      const ctx = {
        leadId,
        leadName: name,
        leadPhone: phone,
        leadEmail: email,
        leadService: service,
      };
      const tmpl = EMAIL_TEMPLATES.welcome_email(ctx);
      await sendEmail(email, tmpl.subject, tmpl.html, {
        text: tmpl.text,
        headers: {
          "Auto-Submitted": "auto-generated",
          "X-Entity-Ref-ID": leadId,
        },
      })
        .then((r) => console.log("[MANUAL WELCOME EMAIL]", email, JSON.stringify(r)))
        .catch((err) => console.error("[MANUAL WELCOME EMAIL]", email, err));
    }

    // Send team notification emails
    if (leadId) {
      const TEAM_EMAILS = (process.env.EMAIL_NOTIFY_TO || "").split(",").map(e => e.trim()).filter(Boolean);

      if (TEAM_EMAILS.length > 0) {
        const teamMail = buildTeamLeadEmail({
          channel: "manual",
          leadId,
          name,
          phone,
          email: email || null,
          service,
          cityOrZip,
          timeframe: timeframe || null,
          budget,
          description: description || null,
          source,
          score,
          priority,
        });

        const emailPromises = TEAM_EMAILS.map(teamEmail =>
          sendEmail(teamEmail, teamMail.subject, teamMail.html, {
            text: teamMail.text,
            headers: {
              "Auto-Submitted": "auto-generated",
              "X-Entity-Ref-ID": leadId,
            },
          })
            .then(r => console.log("[MANUAL TEAM EMAIL]", teamEmail, "Result:", JSON.stringify(r)))
            .catch(err => console.error("[MANUAL TEAM EMAIL]", teamEmail, "Error:", err))
        );
        await Promise.allSettled(emailPromises);
      }
    }

    return NextResponse.json({ success: true, leadId, score, priority });
  } catch (err) {
    console.error("[MANUAL LEAD] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
