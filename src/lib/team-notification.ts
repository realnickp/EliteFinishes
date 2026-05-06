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

const PRIORITY_META: Record<LeadPriority, { label: string }> = {
  hot: { label: "HOT" },
  warm: { label: "WARM" },
  normal: { label: "NORMAL" },
  cold: { label: "COLD" },
};

const CHANNEL_SUBJECT_PREFIX: Record<LeadChannel, string> = {
  website: "New lead",
  manual: "New lead (manual)",
  canvasser: "New lead (canvasser)",
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
): { subject: string; html: string; text: string } {
  const meta = PRIORITY_META[opts.priority];
  const prefix = CHANNEL_SUBJECT_PREFIX[opts.channel];

  const subject = `${prefix}: ${opts.name} (${opts.service})`;

  const dashboardUrl = `https://${SITE.domain}/dashboard/leads/${opts.leadId}`;
  const descHtml = formatDescription(opts.description ?? "");

  const headline =
    opts.channel === "canvasser"
      ? `New ${meta.label} canvasser lead (${opts.score} pts)`
      : opts.channel === "manual"
        ? `New ${meta.label} lead, manual entry (${opts.score} pts)`
        : `New ${meta.label} lead (${opts.score} pts)`;

  const contactRows: string[] = [];
  if (opts.canvasser) {
    contactRows.push(
      row("Submitted by", `<span style="color:#111;">${opts.canvasser.name}</span>`)
    );
  }
  contactRows.push(row("Name", opts.name));
  contactRows.push(
    row("Phone", `<a href="tel:${opts.phone}" style="color:#1f2937;">${opts.phone}</a>`)
  );
  if (opts.email) {
    contactRows.push(
      row("Email", `<a href="mailto:${opts.email}" style="color:#1f2937;">${opts.email}</a>`)
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
      row("Page", `<span style="font-size:13px;word-break:break-all;color:#6b7280;">${opts.landingPage}</span>`)
    );
  }

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
      <p style="margin:0 0 16px;font-size:15px;">${headline}.</p>

      <p style="margin:0 0 8px;font-weight:600;">Contact</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
        ${contactRows.join("")}
      </table>

      <p style="margin:0 0 8px;font-weight:600;">Project</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px;">
        ${projectRows.join("")}
      </table>

      ${descHtml ? `
      <p style="margin:0 0 8px;font-weight:600;">Description</p>
      <div style="font-size:14px;line-height:1.6;color:#374151;margin-bottom:20px;">
        ${descHtml}
      </div>
      ` : ""}

      ${photosBlock(opts.photos)}

      <p style="margin:16px 0 0;font-size:14px;">
        View in dashboard: <a href="${dashboardUrl}" style="color:#1f2937;">${dashboardUrl}</a>
      </p>
      <p style="margin:8px 0 0;font-size:14px;">
        Call: <a href="tel:${opts.phone}" style="color:#1f2937;">${opts.phone}</a>
      </p>
    </div>
  `;

  const text = buildTeamLeadEmailText(opts, headline, dashboardUrl);

  return { subject, html, text };
}

function buildTeamLeadEmailText(
  opts: BuildTeamLeadEmailOptions,
  headline: string,
  dashboardUrl: string
): string {
  const lines: string[] = [];
  lines.push(`${headline}.`);
  lines.push("");
  lines.push("Contact");
  if (opts.canvasser) lines.push(`  Submitted by: ${opts.canvasser.name}`);
  lines.push(`  Name: ${opts.name}`);
  lines.push(`  Phone: ${opts.phone}`);
  if (opts.email) lines.push(`  Email: ${opts.email}`);
  if (opts.cityOrZip) lines.push(`  Location: ${opts.cityOrZip}`);
  lines.push("");
  lines.push("Project");
  lines.push(`  Service: ${opts.service}`);
  if (opts.timeframe) lines.push(`  Timeframe: ${opts.timeframe}`);
  if (opts.budget) lines.push(`  Budget: ${opts.budget}`);
  if (opts.source) lines.push(`  Source: ${opts.source}`);
  if (opts.landingPage) lines.push(`  Page: ${opts.landingPage}`);
  if (opts.description) {
    lines.push("");
    lines.push("Description");
    lines.push(opts.description);
  }
  if (opts.photos && opts.photos.length > 0) {
    lines.push("");
    lines.push(`Photos (${opts.photos.length}):`);
    for (const url of opts.photos) lines.push(`  ${url}`);
  }
  lines.push("");
  lines.push(`View in dashboard: ${dashboardUrl}`);
  lines.push(`Call: ${opts.phone}`);
  return lines.join("\n");
}

export function getTeamEmailRecipients(): string[] {
  return (process.env.EMAIL_NOTIFY_TO || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}
