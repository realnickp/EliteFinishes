/** URL served by Next's image optimizer (AVIF/WebP picked from the Accept header). */
export function nextImageUrl(src: string, width: number, quality = 75): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** Widths must be in Next's default deviceSizes (640, 750, 828, 1080, 1200) or imageSizes (≤ 384). */
export function srcSet(src: string, widths: number[], quality = 75): string {
  return widths.map((w) => `${nextImageUrl(src, w, quality)} ${w}w`).join(", ");
}
