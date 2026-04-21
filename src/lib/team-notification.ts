import { SITE } from "@/lib/constants";

export type LeadPriority = "hot" | "warm" | "normal" | "cold";
export type LeadChannel = "website" | "manual" | "canvasser";

export interface BuildTeamLeadEmailOptions {
  channel: LeadChannel;
  leadId: string;
  name: string;
  phone: string;
  email?: string | null;
  service: string;
  cityOrZip?: string | null;
  timeframe?: string | null;
  budget?: string | null;
  description?: string | null;
  source?: string | null;
  landingPage?: string | null;
  score: number;
  priority: LeadPriority;
  canvasser?: { name: string } | null;
  photos?: string[];
}

const PRIORITY_META: Record<LeadPriority, { emoji: string; color: string; label: string }> = {
  hot: { emoji: "🔥", color: "#dc2626", label: "HOT" },
  warm: { emoji: "⚡", color: "#f59e0b", label: "WARM" },
  normal: { emoji: "📋", color: "#6b7280", label: "NORMAL" },
  cold: { emoji: "🧊", color: "#64748b", label: "COLD" },
};

const CHANNEL_SUBJECT_PREFIX: Record<LeadChannel, string> = {
  website: "New Lead",
  manual: "New Lead (Manual)",
  canvasser: "🚪 Canvasser Lead",
};

function formatDescription(description: string | null | undefined): string {
  if (!description) return "";
  return description
    .replace(/\n/g, "<br>")
    .replace(/([A-Z][^:?]+[?:])\s*/g, '<br><strong>$1</strong> ')
    .replace(/^<br>/, "");
}

function row(label: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:10px 12px;font-weight:600;color:#374151;border-bottom:1px solid #f3f4f6;width:140px;">${label}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-size:15px;">${valueHtml}</td>
  </tr>`;
}

function photosBlock(photos: string[] | undefined): string {
  if (!photos || photos.length === 0) return "";
  const thumbs = photos
    .map(
      (url) => `
      <a href="${url}" style="display:inline-block;margin:4px;">
        <img src="${url}" alt="Lead photo" style="width:120px;height:120px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;" />
      </a>`
    )
    .join("");
  return `
    <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Photos (${photos.length})</h3>
    <div style="margin-bottom:24px;">${thumbs}</div>
  `;
}

export function buildTeamLeadEmail(
  opts: BuildTeamLeadEmailOptions
): { subject: string; html: string } {
  const meta = PRIORITY_META[opts.priority];
  const prefix = CHANNEL_SUBJECT_PREFIX[opts.channel];

  const subject =
    opts.channel === "canvasser"
      ? `${prefix}: ${opts.name} — ${opts.service}`
      : `${meta.emoji} ${prefix}: ${opts.name} — ${opts.service}`;

  const dashboardUrl = `https://${SITE.domain}/dashboard/leads/${opts.leadId}`;
  const descHtml = formatDescription(opts.description ?? "");

  const bannerLabel =
    opts.channel === "canvasser"
      ? `${meta.emoji} New ${meta.label} Canvasser Lead — ${opts.score} pts`
      : opts.channel === "manual"
        ? `${meta.emoji} New ${meta.label} Lead (Manual) — ${opts.score} pts`
        : `${meta.emoji} New ${meta.label} Lead — ${opts.score} pts`;

  const contactRows: string[] = [];
  if (opts.canvasser) {
    contactRows.push(
      row(
        "Submitted by",
        `<span style="color:#111;font-weight:600;">🚪 ${opts.canvasser.name}</span>`
      )
    );
  }
  contactRows.push(row("Name", opts.name));
  contactRows.push(
    row("Phone", `<a href="tel:${opts.phone}" style="color:#2563eb;text-decoration:none;">${opts.phone}</a>`)
  );
  if (opts.email) {
    contactRows.push(
      row("Email", `<a href="mailto:${opts.email}" style="color:#2563eb;text-decoration:none;">${opts.email}</a>`)
    );
  }
  if (opts.cityOrZip) contactRows.push(row("Location", opts.cityOrZip));

  const projectRows: string[] = [];
  projectRows.push(row("Service", opts.service));
  if (opts.timeframe) projectRows.push(row("Timeframe", opts.timeframe));
  if (opts.budget) projectRows.push(row("Budget", opts.budget));
  if (opts.source) projectRows.push(row("Source", opts.source));
  if (opts.landingPage) {
    projectRows.push(
      row(
        "Page",
        `<span style="font-size:13px;word-break:break-all;color:#6b7280;">${opts.landingPage}</span>`
      )
    );
  }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
      <div style="background:${meta.color};padding:16px 24px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;color:#fff;font-size:20px;">${bannerLabel}</h2>
      </div>

      <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;padding:24px;">
        <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Contact Information</h3>
        <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
          ${contactRows.join("")}
        </table>

        <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Project Details</h3>
        <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
          ${projectRows.join("")}
        </table>

        ${descHtml ? `
        <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Description</h3>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:14px 16px;margin-bottom:24px;font-size:14px;line-height:1.6;color:#374151;">
          ${descHtml}
        </div>
        ` : ""}

        ${photosBlock(opts.photos)}

        <div style="text-align:center;margin:24px 0 8px;">
          <a href="${dashboardUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;font-weight:600;font-size:16px;padding:14px 32px;border-radius:8px;text-decoration:none;">
            Open in Dashboard →
          </a>
        </div>
        <p style="text-align:center;margin:8px 0 0;font-size:12px;color:#9ca3af;">
          Or call them now: <a href="tel:${opts.phone}" style="color:#2563eb;text-decoration:none;">${opts.phone}</a>
        </p>
      </div>
    </div>
  `;

  return { subject, html };
}

export function getTeamEmailRecipients(): string[] {
  return (process.env.EMAIL_NOTIFY_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}
