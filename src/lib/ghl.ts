/**
 * GoHighLevel sync. Every public website lead is mirrored into the Elite Finishes
 * GHL sub-account as a tagged contact plus an opportunity in the New Lead stage.
 * Skips quietly when GHL_API_KEY is not set so local dev keeps working.
 */

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

const config = {
  apiKey: process.env.GHL_API_KEY?.trim() || null,
  locationId: process.env.GHL_LOCATION_ID?.trim() || "Uk58xFkLgwyS9xugGn6u",
  /** "Elite Fall Jobs" pipeline */
  pipelineId: process.env.GHL_PIPELINE_ID?.trim() || "kHNVPGftDLn7Ekwmd5yC",
  /** "New Lead" stage */
  stageId: process.env.GHL_PIPELINE_STAGE_ID?.trim() || "a2aa9717-84a7-4285-96d9-5c02fe9dd981",
};

export interface GhlLead {
  name: string;
  phone: string;
  email: string;
  service: string;
  cityOrZip: string;
  description: string;
  timeframe: string;
  budget: string | null;
  source: string;
  landingPage: string | null;
  utmCampaign: string | null;
}

async function ghlFetch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      Version: GHL_VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`GHL ${path} ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}

/** "interior-painting" / "Interior Painting" -> "interior painting" */
function toTag(value: string): string {
  return value.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Source labels look like "google_ads:lp_builder:painting", "lp_form:bathroom-remodeling",
 * "website_quiz:kitchen-remodeling", "chatbot:/services" or "website:contact".
 */
export function buildGhlTags(service: string, source: string): string[] {
  const tags = new Set<string>(["new lead"]);
  if (service) tags.add(toTag(service));

  const s = source.toLowerCase();
  if (s.includes("google_ads")) tags.add("google ads");
  if (s.includes("facebook_ads")) tags.add("facebook ads");

  const lp = s.match(/lp_(builder|form|quiz)[^:]*:([a-z0-9-]+)/);
  if (lp) {
    tags.add("landing page");
    tags.add(`lp ${toTag(lp[2])}`);
  }
  if (s.includes("lp_builder") || s.includes("website_quiz") || s.includes("lp_quiz")) {
    tags.add("project builder");
  } else if (s.includes("chatbot")) {
    tags.add("chatbot");
  } else if (!lp) {
    tags.add("website form");
  }
  return [...tags];
}

function splitLocation(cityOrZip: string): { city?: string; postalCode?: string } {
  const zip = cityOrZip.match(/\b\d{5}\b/)?.[0];
  const city = cityOrZip.replace(/\b\d{5}\b/, "").replace(/,?\s*\b[A-Z]{2}\b\s*$/, "").replace(/[,\s]+$/, "").trim();
  return { postalCode: zip, city: city || undefined };
}

export function hasGhl(): boolean {
  return Boolean(config.apiKey);
}

/** Creates or updates the contact, tags it, adds a details note, and opens an opportunity. */
export async function syncLeadToGhl(lead: GhlLead): Promise<void> {
  if (!config.apiKey) return;

  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const { city, postalCode } = splitLocation(lead.cityOrZip);
  const tags = buildGhlTags(lead.service, lead.source);

  const { contact } = await ghlFetch<{ contact: { id: string } }>("/contacts/upsert", {
    locationId: config.locationId,
    firstName,
    lastName: rest.join(" ") || undefined,
    name: lead.name,
    phone: lead.phone,
    email: lead.email || undefined,
    city,
    postalCode,
    source: `Website: ${lead.source}`,
  });

  // Tags go through the tags endpoint so existing tags on a returning contact are kept
  await ghlFetch(`/contacts/${contact.id}/tags`, { tags });

  const note = [
    `New website lead: ${lead.service}`,
    `Location: ${lead.cityOrZip}`,
    `Timeframe: ${lead.timeframe}`,
    lead.budget ? `Budget: ${lead.budget}` : null,
    `Details: ${lead.description}`,
    `Source: ${lead.source}`,
    lead.utmCampaign ? `Campaign: ${lead.utmCampaign}` : null,
    lead.landingPage ? `Page: ${lead.landingPage}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const results = await Promise.allSettled([
    ghlFetch(`/contacts/${contact.id}/notes`, { body: note }),
    ghlFetch("/opportunities/", {
      locationId: config.locationId,
      pipelineId: config.pipelineId,
      pipelineStageId: config.stageId,
      contactId: contact.id,
      name: `${lead.name} · ${lead.service}`,
      status: "open",
      source: lead.source,
    }),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[GHL] Partial sync failure:", r.reason);
  }
}
