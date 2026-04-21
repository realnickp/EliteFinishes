import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { sendEmail } from "@/lib/automations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const recipients = (process.env.EMAIL_NOTIFY_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return NextResponse.json({
      ok: false,
      reason: "EMAIL_NOTIFY_TO is empty in runtime env",
    });
  }

  const to = recipients[0];
  const started = Date.now();

  const result = await sendEmail(
    to,
    "Elite Finishes — test email probe",
    `<div style="font-family:sans-serif;padding:20px;">
       <h2>Test email from /api/debug/send-test-email</h2>
       <p>If you are reading this in your inbox, Resend + EMAIL_FROM + EMAIL_NOTIFY_TO are all wired correctly on the live build.</p>
       <p>Sent at: ${new Date().toISOString()}</p>
     </div>`
  );

  return NextResponse.json({
    recipient: to,
    allRecipients: recipients,
    durationMs: Date.now() - started,
    resendResult: result,
    resendKeyPrefix: process.env.RESEND_API_KEY?.slice(0, 4) ?? "MISSING",
    emailFrom: process.env.EMAIL_FROM ?? "MISSING",
  });
}
