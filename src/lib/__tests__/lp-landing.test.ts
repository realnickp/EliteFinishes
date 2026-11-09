import { describe, expect, it } from "vitest";
import { LANDING_PAGES } from "@/lib/lp-landing";
import { extractTimeframe } from "@/lib/quiz-data";

describe("remodel gift card landing pages", () => {
  it("serves /lp/remodeling with kitchen, bathroom and basement headline variants", () => {
    const remodeling = LANDING_PAGES.remodeling;
    expect(remodeling).toBeDefined();
    expect(Object.keys(remodeling.variants).sort()).toEqual(["basement", "bathroom", "kitchen"]);
    expect(remodeling.offer.variant).toBe("giftcard");
  });

  it("puts bathroom remodeling on the generic gift card offer", () => {
    expect(LANDING_PAGES["bathroom-remodeling"].offer.variant).toBe("giftcard");
  });

  it("never mentions restaurants or dining on any landing page", () => {
    const text = JSON.stringify(LANDING_PAGES).toLowerCase();
    for (const word of ["dinner", "dining", "steak", "capital grille", "ruth's chris"]) {
      expect(text).not.toContain(word);
    }
  });

  it("states the offer end date in the gift card fine print", () => {
    for (const config of Object.values(LANDING_PAGES)) {
      if (config.offer.variant === "giftcard") {
        expect(config.offer.finePrint).toContain("November 30, 2026");
      }
    }
  });

  it("never captions a work photo as a basement", () => {
    for (const photo of LANDING_PAGES.remodeling.workPhotos) {
      expect(`${photo.alt} ${photo.caption}`.toLowerCase()).not.toContain("basement");
    }
  });
});

describe("remodeling page photos", () => {
  it("leads with the finished slate blue kitchen", () => {
    expect(LANDING_PAGES.remodeling.heroSlides[0]).toBe("/images/work/kitchen-slate-blue-shaker-island.jpg");
  });

  it("only uses our own job photos in the work, before and after and crew sections", () => {
    const r = LANDING_PAGES.remodeling;
    const srcs = [...r.workPhotos, ...(r.beforeAfter?.steps ?? []), ...(r.teamPhotos ?? [])].map((p) => p.src);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) expect(src).toMatch(/^\/images\/(work|lp\/work)\//);
  });

  it("shows a real before and after on the remodeling page", () => {
    const labels = LANDING_PAGES.remodeling.beforeAfter?.steps.map((s) => s.label);
    expect(labels?.[0]).toBe("Before");
    expect(labels?.at(-1)).toBe("After");
  });
});

describe("extractTimeframe with the remodel builder answers", () => {
  it.each([
    ["Within 1 month", "Within 1 month"],
    ["1 to 3 months", "Within 3 months"],
    ["3+ months", "3+ months"],
    ["Just pricing", "Just exploring"],
  ])("%s -> %s", (answer, expected) => {
    expect(extractTimeframe(answer)).toBe(expected);
  });
});

describe("standalone landing page chrome", () => {
  it("treats every conversion landing page as standalone (no site header, popup or chatbot)", async () => {
    const { CONVERSION_LP_SLUGS } = await import("@/lib/site-config");
    for (const slug of Object.keys(LANDING_PAGES)) {
      expect(CONVERSION_LP_SLUGS as readonly string[]).toContain(slug);
    }
  });
});
