// ============================================================
// AUTOMATION ENGINE — Elite Finishes Lead Management
// ============================================================
// Plug in your Twilio + SendGrid/Resend keys in .env.local
// to activate SMS and email delivery.
// ============================================================

import { SITE } from "@/lib/constants";

export interface AutomationContext {
  leadId: string;
  leadName: string;
  leadPhone?: string;
  leadEmail?: string;
  leadService?: string;
  appointmentDate?: string;
  quoteAmount?: number;
}

// ── SMS Templates ─────────────────────────────────────────

export const SMS_TEMPLATES: Record<string, (ctx: AutomationContext) => string> = {
  welcome_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}! Thanks for reaching out to Elite Finishes. We will call you within one business day about your ${ctx.leadService || "project"}. Questions? Call ${SITE.phone}. Reply STOP to opt out.`,

  no_response_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, we tried reaching you about your ${ctx.leadService || "project"} request. Still interested? Reply YES or call ${SITE.phone}. — Elite Finishes`,

  quote_followup_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, just checking in on the estimate we sent you. Any questions? We are happy to walk through it. Call ${SITE.phone}. — Elite Finishes`,

  appointment_reminder_sms: (ctx) =>
    `Reminder: Your site visit with Elite Finishes is tomorrow${ctx.appointmentDate ? " at " + new Date(ctx.appointmentDate).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : ""}. Reply CONFIRM or call ${SITE.phone} to reschedule.`,

  review_request_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, hope you are loving your ${ctx.leadService || "project"}! Could you leave us a quick Google review? It means the world to our small team. Call ${SITE.phone} if you have any questions. — Elite Finishes`,

  re_engage_sms: (ctx) =>
    `Hi ${ctx.leadName.split(" ")[0]}, still thinking about your ${ctx.leadService || "home project"}? We are running a special this month. Call ${SITE.phone} for details. — Elite Finishes`,
};

// ── Email Templates ───────────────────────────────────────

export const EMAIL_TEMPLATES: Record<
  string,
  (ctx: AutomationContext) => { subject: string; html: string }
> = {
  welcome_email: (ctx) => ({
    subject: `Thanks for reaching out, ${ctx.leadName.split(" ")[0]}! — Elite Finishes`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We Got Your Request!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>Thanks for reaching out to Elite Finishes about your <strong>${ctx.leadService || "project"}</strong>. We have received your request and will be in touch within <strong>one business day</strong>.</p>
        <h3>What Happens Next:</h3>
        <ol>
          <li>We will call you to discuss your project in more detail.</li>
          <li>We will schedule a free on-site visit at your property.</li>
          <li>You will receive a clear, written estimate with no surprises.</li>
        </ol>
        <p>In the meantime, if you have any questions, give us a call: <a href="tel:+1${SITE.phone.replace(/\D/g, "")}">${SITE.phone}</a></p>
        <p>— The Elite Finishes Team</p>
        <hr>
        <p style="color: #666; font-size: 12px;">${SITE.license} · Licensed and Insured · Baltimore, MD</p>
      </div>
    `,
  }),

  quote_followup_email: (ctx) => ({
    subject: `Questions about your estimate? — Elite Finishes`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Following Up on Your Estimate</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>We sent you an estimate for your <strong>${ctx.leadService || "project"}</strong> a couple days ago and wanted to check in.</p>
        <p>Do you have any questions? We are happy to walk through every line item and make sure it makes sense for your budget and goals.</p>
        <p><a href="tel:+1${SITE.phone.replace(/\D/g, "")}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Call Us: ${SITE.phone}</a></p>
        <p>— Elite Finishes</p>
      </div>
    `,
  }),

  appointment_reminder_email: (ctx) => ({
    subject: `Your site visit is tomorrow — Elite Finishes`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>See You Tomorrow!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>Just a reminder that your site visit with Elite Finishes is scheduled for <strong>tomorrow${ctx.appointmentDate ? " at " + new Date(ctx.appointmentDate).toLocaleString("en-US", { hour: "numeric", minute: "2-digit", weekday: "long" }) : ""}</strong>.</p>
        <h3>To Prepare:</h3>
        <ul>
          <li>Note any access limitations (gates, pets, tight spots)</li>
          <li>Think about the areas or rooms involved in the project</li>
          <li>Have any questions ready — we love to talk through ideas in person</li>
        </ul>
        <p>Need to reschedule? Call us: <a href="tel:+1${SITE.phone.replace(/\D/g, "")}">${SITE.phone}</a></p>
        <p>— The Elite Finishes Team</p>
      </div>
    `,
  }),

  review_request_email: (ctx) => ({
    subject: `How did we do? — Elite Finishes`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We Hope You Love It!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>It was a pleasure working on your <strong>${ctx.leadService || "project"}</strong>. We hope you are thrilled with the result!</p>
        <p>If you have a moment, we would really appreciate a Google review. It helps other Baltimore area homeowners find us and it genuinely means a lot to our team.</p>
        <p><a href="${SITE.url}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Visit Our Website</a></p>
        <p>Thank you for choosing Elite Finishes.</p>
        <p>— The Elite Finishes Team</p>
      </div>
    `,
  }),

  re_engage_email: (ctx) => ({
    subject: `Still thinking about your ${ctx.leadService || "project"}? — Elite Finishes`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>We Are Still Here!</h2>
        <p>Hi ${ctx.leadName.split(" ")[0]},</p>
        <p>A while back you reached out about <strong>${ctx.leadService || "a home project"}</strong>. We wanted to check in — are you still planning to move forward?</p>
        <p>Our schedule fills fast, especially in spring and fall. If you are ready to get on the calendar, we would love to get you locked in.</p>
        <p><a href="${SITE.url}/contact" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">Request a Free Estimate</a></p>
        <p>Or call us directly: ${SITE.phone}</p>
        <p>— Elite Finishes</p>
      </div>
    `,
  }),
};

// ── SMS Sender (Twilio) ───────────────────────────────────

export async function sendSMS(to: string, body: string): Promise<{ success: boolean; sid?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[SMS] Twilio not configured. Would have sent to:", to, "→", body.slice(0, 50) + "...");
    return { success: false, error: "Twilio not configured" };
  }

  try {
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ To: to, From: fromNumber, Body: body }).toString(),
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Twilio error");
    return { success: true, sid: data.sid };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[SMS] Failed:", error);
    return { success: false, error };
  }
}

// ── Email Sender (Resend) ─────────────────────────────────

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || `info@${SITE.domain}`;

  if (!apiKey) {
    console.warn("[EMAIL] Resend not configured. Would have sent to:", to, "Subject:", subject);
    return { success: false, error: "Resend not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: `${SITE.name} <${fromEmail}>`, reply_to: SITE.email, to, subject, html }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Resend error");
    return { success: true, id: data.id };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL] Failed:", error);
    return { success: false, error };
  }
}
