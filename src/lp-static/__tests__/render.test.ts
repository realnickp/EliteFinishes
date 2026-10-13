import { describe, expect, it } from "vitest";
import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";
import { esc } from "@/lp-static/escape";
import { LP_CSS } from "@/lp-static/styles";
import { buildClientScript } from "@/lp-static/client-script";

const painting = LANDING_PAGES.painting;

describe("renderLandingHtml", () => {
  it("uses the variant eyebrow, headline and title", () => {
    const html = renderLandingHtml(painting, "near-me");
    const v = painting.variants["near-me"];
    expect(html).toContain(`<title>${esc(v.metaTitle)}</title>`);
    expect(html).toContain(esc(v.headline));
    expect(html).toContain(esc(v.eyebrow));
  });

  it("falls back to the base headline without a variant", () => {
    expect(renderLandingHtml(painting)).toContain(esc(painting.headline));
  });

  it("is noindex and has no external scripts", () => {
    const html = renderLandingHtml(painting, "interior");
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(html).not.toMatch(/<script[^>]+src=/);
  });

  it("has the call link, the contact form and the trust facts", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html).toContain('href="tel:+14438250206"');
    expect(html).toContain('id="estimate-form"');
    expect(html).toContain('name="website_url"');
    expect(html).toContain("MHIC 153498");
    expect(html).toContain("1601 Cuba Street");
    expect(html).toContain('href="/privacy-policy"');
  });

  it("renders every Project Builder question with its options", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html).toContain(esc(painting.builder.title));
    for (const q of painting.builder.questions) {
      expect(html).toContain(`data-q="${q.id}"`);
      expect(html).toContain(esc(q.question));
      for (const o of q.options) expect(html).toContain(`data-a="${esc(o.label)}"`);
    }
  });

  it("only shows the first question before the script runs", () => {
    const html = renderLandingHtml(painting, "near-me");
    const sets = html.match(/<fieldset[^>]*>/g) ?? [];
    expect(sets.length).toBe(painting.builder.questions.length);
    expect(sets.filter((t) => !t.includes(" hidden")).length).toBe(1);
  });

  it("preloads exactly one hero image with high priority", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html.match(/rel="preload" as="image"/g)?.length).toBe(1);
    expect(html).toContain('fetchpriority="high"');
    expect(html).toContain(encodeURIComponent(painting.heroSlides[0]));
  });

  it("lazy loads every image except the logo and the hero", () => {
    const html = renderLandingHtml(painting, "near-me");
    const imgs = html.match(/<img [^>]+>/g) ?? [];
    expect(imgs.length).toBeGreaterThan(5);
    expect(imgs.filter((t) => !t.includes('loading="lazy"')).length).toBe(2);
  });

  it("drops the stock ideas strip", () => {
    expect(renderLandingHtml(painting, "near-me")).not.toContain("/images/lp/ideas/");
  });

  it("escapes config text", () => {
    const tricky = { ...painting, headline: `Paint & prep <b>"now"</b>`, variants: {} };
    const html = renderLandingHtml(tricky);
    expect(html).toContain("Paint &amp; prep &lt;b&gt;&quot;now&quot;&lt;/b&gt;");
    expect(html).not.toContain(`<b>"now"</b>`);
  });

  it("stays within the size budgets", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html.length).toBeLessThanOrEqual(45_000);
    expect(LP_CSS.length).toBeLessThanOrEqual(14_000);
    const js = buildClientScript({ slug: "painting", serviceTitle: "x", googleAdsId: "AW-1", callLabel: "a", contactLabel: "", metaPixelId: "", phone: "1" });
    expect(js.length).toBeLessThanOrEqual(8_000);
  });
  it("only requests image quality 75, the one Next 16 allows by default", () => {
    const html = renderLandingHtml(painting, "near-me");
    const qualities = new Set([...html.matchAll(/[?&]q=(\d+)/g)].map((m) => m[1]));
    expect([...qualities]).toEqual(["75"]);
  });
});
