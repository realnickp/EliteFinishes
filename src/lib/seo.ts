/**
 * Keeps meta descriptions inside what Google shows (~155 characters).
 * Prefers ending on a full sentence; otherwise cuts at a word boundary.
 */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const slice = clean.slice(0, max);
  const lastSentence = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "), slice.lastIndexOf("! "));
  if (lastSentence >= 80) return slice.slice(0, lastSentence + 1);

  const lastSpace = slice.lastIndexOf(" ", max - 1);
  return `${slice.slice(0, lastSpace).replace(/[,;:]$/, "")}…`;
}
