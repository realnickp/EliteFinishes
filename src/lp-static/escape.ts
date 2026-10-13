const MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escapes text for HTML element content and double-quoted attributes. */
export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => MAP[ch]);
}
