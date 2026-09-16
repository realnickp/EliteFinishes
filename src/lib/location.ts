/** Shared helpers for collecting city and zip on lead forms. */

export function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

export function isValidCity(city: string): boolean {
  return city.trim().length >= 2;
}

/** Maryland zip codes run from 20600 to 21999. */
function stateFromZipRange(zip: string): string {
  const n = Number(zip.trim().slice(0, 5));
  return n >= 20600 && n <= 21999 ? "MD" : "";
}

/**
 * Builds the single location line saved on the lead, e.g. "Towson, MD 21204".
 * Uses the looked up state when available, otherwise infers MD from the zip.
 */
export function formatLocation(city: string, zip: string, state?: string): string {
  const c = city.trim();
  const z = zip.trim();
  const s = (state || stateFromZipRange(z)).trim();
  if (!c) return z;
  return s ? `${c}, ${s} ${z}` : `${c}, ${z}`;
}
