import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "@/lib/blog-data";
import { CITY_DATA } from "@/lib/constants";

// Guards for every blog post, including the ones the scheduled routine writes.

const SERVICE_SLUGS = new Set(
  readdirSync(path.join(__dirname, "../../app/services"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
);
const CITY_SLUGS = new Set(CITY_DATA.map((c) => c.slug));
const BLOG_SLUGS = new Set(BLOG_POSTS.map((p) => p.slug));
const STATIC_PATHS = new Set(["/", "/quote", "/quote/quiz", "/contact", "/areas", "/services", "/blog", "/about", "/financing", "/lp/painting/cabinets", "/lp/painting", "/lp/bathroom-remodeling"]);

function internalLinks(content: string): string[] {
  return [...content.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1].split(/[?#]/)[0]);
}

function linkExists(href: string): boolean {
  if (STATIC_PATHS.has(href)) return true;
  const [, section, slug, extra] = href.split("/");
  if (extra) return false;
  if (section === "services") return SERVICE_SLUGS.has(slug);
  if (section === "areas") return CITY_SLUGS.has(slug);
  if (section === "blog") return BLOG_SLUGS.has(slug);
  return false;
}

describe.each(BLOG_POSTS.map((p) => [p.slug, p] as const))("blog post %s", (_slug, post) => {
  it("has a unique, url-safe slug and an ISO date", () => {
    expect(post.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(BLOG_POSTS.filter((p) => p.slug === post.slug)).toHaveLength(1);
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("only links to pages that exist", () => {
    const broken = internalLinks(post.content).filter((href) => !linkExists(href));
    expect(broken).toEqual([]);
  });

  it("uses an image that exists and a real service page", () => {
    expect(existsSync(path.join(__dirname, "../../../public", post.image))).toBe(true);
    expect(SERVICE_SLUGS.has(post.relatedServiceSlug)).toBe(true);
  });

  it("never names the business from the contractor story", () => {
    expect(post.content.toLowerCase()).not.toContain("root city");
  });
});

describe("new posts link heavily", () => {
  const NEW = BLOG_POSTS.filter((p) => p.date >= "2026-10-13");
  it.each(NEW.map((p) => [p.slug, p] as const))("%s has 25+ internal links incl. services, areas and other posts", (_s, post) => {
    const links = internalLinks(post.content);
    expect(links.length).toBeGreaterThanOrEqual(25);
    expect(links.some((l) => l.startsWith("/services/"))).toBe(true);
    expect(links.filter((l) => l.startsWith("/areas/")).length).toBeGreaterThanOrEqual(5);
    expect(links.filter((l) => l.startsWith("/blog/")).length).toBeGreaterThanOrEqual(3);
    expect(links).toContain("/quote");
  });
});
