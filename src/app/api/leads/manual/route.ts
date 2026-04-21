import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateLeadScore } from "@/lib/lead-scoring";
import { sendEmail } from "@/lib/automations";
import { requireAuth } from "@/lib/auth";
import { SITE } from "@/lib/constants";

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

    // Send team notification emails (no welcome email/SMS to the lead)
    if (leadId) {
      const TEAM_EMAILS = (process.env.EMAIL_NOTIFY_TO || "").split(",").map(e => e.trim()).filter(Boolean);

      if (TEAM_EMAILS.length > 0) {
        const scoreEmoji = priority === "hot" ? "\u{1F525}" : priority === "warm" ? "\u26A1" : "\u{1F4CB}";
        const priorityColor = priority === "hot" ? "#dc2626" : priority === "warm" ? "#f59e0b" : "#6b7280";
        const priorityLabel = priority === "hot" ? "HOT" : priority === "warm" ? "WARM" : "NORMAL";
        const dashboardUrl = `https://${SITE.domain}/dashboard/leads/${leadId}`;

        const leadNotifHtml = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
            <div style="background:${priorityColor};padding:16px 24px;border-radius:8px 8px 0 0;">
              <h2 style="margin:0;color:#fff;font-size:20px;">${scoreEmoji} New ${priorityLabel} Lead (Manual) — ${score} pts</h2>
            </div>
            <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
              <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Contact Information</h3>
              <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;width:120px;">Name</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Phone</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;"><a href="tel:${phone}" style="color:#2563eb;text-decoration:none;font-size:15px;">${phone}</a></td>
                </tr>
                ${email ? `<tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Email</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="color:#2563eb;text-decoration:none;font-size:15px;">${email}</a></td>
                </tr>` : ""}
                <tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Location</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${cityOrZip}</td>
                </tr>
              </table>
              <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Project Details</h3>
              <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
                <tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;width:120px;">Service</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${service}</td>
                </tr>
                ${timeframe ? `<tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Timeframe</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${timeframe}</td>
                </tr>` : ""}
                ${budget ? `<tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Budget</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${budget}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;">Source</td>
                  <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${source}</td>
                </tr>
              </table>
              ${description ? `
              <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Description</h3>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;margin-bottom:24px;font-size:14px;line-height:1.6;color:#374151;">
                ${description.replace(/\n/g, "<br>")}
              </div>` : ""}
              <div style="text-align:center;margin:24px 0 8px;">
                <a href="${dashboardUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:600;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
                  Open in Dashboard →
                </a>
              </div>
              <p style="text-align:center;margin:8px 0 0;font-size:12px;color:#9ca3af;">
                Or call them now: <a href="tel:${phone}" style="color:#2563eb;text-decoration:none;">${phone}</a>
              </p>
            </div>
          </div>
        `;

        const emailPromises = TEAM_EMAILS.map(teamEmail =>
          sendEmail(teamEmail, `${scoreEmoji} New Lead (Manual): ${name} — ${service}`, leadNotifHtml)
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
