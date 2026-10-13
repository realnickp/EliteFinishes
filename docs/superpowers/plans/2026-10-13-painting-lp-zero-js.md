# Painting Ad Landing Page: Zero-JavaScript Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve `/lp/painting` and its ad-group variants as plain prerendered HTML: inline CSS, about 4 KB of inline vanilla JS, and no React runtime. Target: mobile Lighthouse performance ≥ 95 and LCP ≤ 2.5 s, which helps the "landing page experience" part of Google Ads Quality Score (currently "below average" on every painting keyword).

**Architecture:** A pure TypeScript function renders the full page HTML string from the existing `LANDING_PAGES.painting` config (one source of truth for copy). A Next route handler prerenders that string at build time (`force-static`), and `beforeFiles` rewrites map the public ad URLs onto it, so ad final URLs don't change. Lead submission, the thank-you page, conversion tracking and `/api/leads` stay exactly as they are. The inline script posts the same JSON body that `src/lib/lp-lead.ts` posts today.

**Tech Stack:** Next.js 16 App Router (route handlers), TypeScript, Vitest + jsdom (new dev dependencies, tests only), Lighthouse 12 via npx for the speed budget.

**Spec:** This plan carries its own spec, the "Evidence and decisions" section below, from the 2026-10-13 research session (handoff: Obsidian `Shared Brain/Handoffs/2026-10-13 Claude - Google Ads knowledge base review.md`).

## Evidence and decisions

Measured 2026-10-13: local `next start`, Lighthouse 12 mobile, 3 runs each.

| Version of `/lp/painting/near-me` | Score | LCP | Page JS |
|---|---|---|---|
| Live (Vercel) before any change | 48–62 | 5.5–7.1 s | ~999 KB |
| Branch `lp-speed` (cb583a7) | 76–83 | ~4.1 s | ~696 KB |
| Same HTML and CSS with every `<script>` removed | **98–99** | **2.1–2.3 s** | 0 |
| Same, with all CSS inlined into the HTML | worse (FCP 1.5 s) | 4.2–9.0 s | n/a (Tailwind CSS is 160 KB raw) |

Conclusions this plan is built on:
1. **The JS is the bottleneck, not the design.** Any App Router page ships the React runtime (~220 KB chunk plus router chunks), so getting under 2.5 s means leaving React for this page.
2. **The site-wide Tailwind CSS is too big to inline.** The page gets its own small hand-written stylesheet (budget ≤ 14 KB raw), inlined in `<head>`.
3. **Google's landing-page-experience inputs** are relevance to the search terms, clarity and usefulness, ease of navigation, few links, transparency/trust, mobile friendliness and speed. Keep everything that serves relevance and trust (keyword headline, real job photos, real Google reviews, license with state lookup link, address, owner, privacy and terms links). Cut decoration.

Content decisions (Nick asked for "strip it down"):
- **Keep:** offer bar, header (logo + call), hero (keyword-matched eyebrow and headline per variant, subheadline, 3 bullets, short estimate form, call/text buttons), trust strip, Google reviews, 10% offer, real work photos, "A local company you can look up", why list, 3 steps, FAQ, final call to action, footer, sticky mobile call/estimate bar.
- **Cut:** rotating hero slideshow (one static hero photo), stock-photo "ideas" marquee (stock imagery and heavy), 4-step Project Builder quiz, the separate second form.
- **Short form fields:** name, phone, zip (city filled from `/api/zip-lookup` when available), "What needs painting?" (Interior / Exterior / Both inside and out / Cabinets, trim or doors / Drywall repair and painting), "When?" (the existing `TIMELINE_OPTIONS` labels). Email is optional. That's 5 required taps instead of 7 fields.
- **Scope:** painting pages only: `/lp/painting` and `/lp/painting/{near-me,interior,exterior,cabinets,drywall}`. The bathroom page stays on the React version (its campaign is paused).

## Global Constraints

- Public URLs must not change: `/lp/painting`, `/lp/painting/near-me`, `/lp/painting/interior`, `/lp/painting/exterior`, `/lp/painting/cabinets`, `/lp/painting/drywall`. Query strings (`gclid`, `gbraid`, `wbraid`, `utm_*`, `fbclid`) must pass through.
- `/lp/painting/thanks`, `/lp/painting/quiz` and `/lp/painting/contact` keep working unchanged.
- POST body to `/api/leads` must match `submitLpLead` in `src/lib/lp-lead.ts` exactly: `name, phone, email, service, cityOrZip, description, timeframe, source, utmSource, utmMedium, utmCampaign, landingPage, _t, website_url`. `service` = `"Painting (Interior and Exterior)"`. `source` follows `detectSource()` with the label `lp_form:painting`.
- Store the pending conversion under sessionStorage key `ef_lp_pending_conversion` as `{"service":"Painting (Interior and Exterior)","method":"form"}`. Skip this when the API answers `accepted: false`.
- UTM storage key stays `bb_utm` (the thank-you page and other forms read it).
- Thank-you redirect: a full page load to `/lp/painting/thanks?name=<first name, URI-encoded>`, via `window.location.assign`.
- Google Ads tag `AW-18451341957` loads only after `window` `load`. The call conversion config `phone_conversion_number: "443-825-0206"` with label `LSmJCKDJyYIdEIXFpN5E` must still be sent. Read all IDs and labels from `AD_TRACKING` in `src/lib/site-config.ts`; never hard-code them.
- `<meta name="robots" content="noindex, nofollow">` on every rendered page.
- No stock photos credited as Elite's work. Never put painting reviews on a bathroom page (not in scope here; don't change bathroom).
- Copy rules from earlier redesigns: no emoji, no dark slabs, serif headings (DM Serif Display, else Georgia).
- Budgets, checked by tests: HTML ≤ 45 KB raw per page; inline CSS ≤ 14 KB raw; inline JS ≤ 6 KB raw; zero external `<script src>` in the initial HTML.

## Review Focus

1. **Double tap on "Get my free estimate".** Exactly one POST, and the button stays disabled while it sends (Task 2 test `submits once on double click`).
2. **API returns 400** (out-of-state zip, missing fields) or the network fails. The visitor's entries stay, the server's message shows next to the button, and the button re-enables (Task 2 tests `shows the server error and keeps entries`, `network failure shows fallback message`).
3. **Visitor submits within seconds,** before the spam token has loaded. The script fetches the token at submit time instead of sending an empty `_t` (Task 2 test `fetches a token at submit when none loaded yet`).
4. **Ad click arrives with `gclid`** (or `gbraid`/`wbraid`). It's stored in `bb_utm`, and `source` becomes `google_ads:lp_form:painting` (Task 2 test `google click id marks the lead as google_ads`).
5. **Config copy containing `&`, `<`, `'` or `"`** (e.g. "Benjamin Moore & Sherwin-Williams"). It renders escaped, never as markup (Task 1 test `escapes config text`).

---

## File Structure

- Create `src/lp-static/escape.ts`: `esc()` HTML escaping. One job.
- Create `src/lp-static/images.ts`: `nextImageUrl()` / `srcSet()` for `/_next/image` URLs.
- Create `src/lp-static/styles.ts`: `LP_CSS`, the page's own stylesheet string.
- Create `src/lp-static/client-script.ts`: `buildClientScript(cfg)`, the inline vanilla JS (UTM capture, token, zip lookup, submit, call/text tracking, deferred gtag).
- Create `src/lp-static/render.ts`: `renderLandingHtml(config, variantKey?)`, the full HTML document.
- Create `src/app/lp-static/[service]/[[...variant]]/route.ts`: static GET handler returning the HTML.
- Modify `next.config.ts`: add `rewrites()` with `beforeFiles`.
- Create `vitest.config.ts`; modify `package.json` (test script, dev deps).
- Create `scripts/lh-budget.mjs`: runs Lighthouse 3× per URL and fails if the median score < 95 or median LCP > 2500 ms.
- Tests: `src/lp-static/__tests__/render.test.ts` and `src/lp-static/__tests__/client-script.test.ts`.

---

### Task 1: HTML renderer, styles and test setup

**Files:**
- Create: `vitest.config.ts`, `src/lp-static/escape.ts`, `src/lp-static/images.ts`, `src/lp-static/styles.ts`, `src/lp-static/render.ts`
- Modify: `package.json` (scripts + devDependencies)
- Test: `src/lp-static/__tests__/render.test.ts`

**Interfaces:**
- Consumes: `LANDING_PAGES`, `LandingConfig` from `@/lib/lp-landing`; `SITE`, `AD_TRACKING` from `@/lib/site-config`; `GOOGLE_REVIEWS` from `@/lib/constants`; `buildClientScript` from Task 2 (a stub returning `""` until Task 2 lands).
- Produces: `renderLandingHtml(config: LandingConfig, variantKey?: string): string`, `esc(s: string): string`, `srcSet(src: string, widths: number[], quality?: number): string`, `nextImageUrl(src: string, width: number, quality?: number): string`, `LP_CSS: string`.

- [ ] **Step 1: Install the test tools and add the script**

```bash
npm install --save-dev vitest@^3 jsdom@^25
```

In `package.json` `"scripts"`, add `"test": "vitest run"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: { include: ["src/**/__tests__/**/*.test.ts"] },
});
```

- [ ] **Step 2: Write the failing renderer tests**

`src/lp-static/__tests__/render.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";
import { esc } from "@/lp-static/escape";
import { LP_CSS } from "@/lp-static/styles";

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

  it("has the call link, the form and the trust facts", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html).toContain('href="tel:+14438250206"');
    expect(html).toContain('id="estimate-form"');
    expect(html).toContain('name="website_url"');
    expect(html).toContain("MHIC 153498");
    expect(html).toContain("1601 Cuba Street");
    expect(html).toContain('href="/privacy-policy"');
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

  it("drops the stock ideas strip and the quiz", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html).not.toContain("/images/lp/ideas/");
    expect(html).not.toContain(painting.builder.title);
  });

  it("escapes config text", () => {
    const tricky = { ...painting, headline: `Paint & prep <b>"now"</b>`, variants: {} };
    const html = renderLandingHtml(tricky);
    expect(html).toContain("Paint &amp; prep &lt;b&gt;&quot;now&quot;&lt;/b&gt;");
    expect(html).not.toContain("<b>");
  });

  it("stays within the size budgets", () => {
    const html = renderLandingHtml(painting, "near-me");
    expect(html.length).toBeLessThanOrEqual(45_000);
    expect(LP_CSS.length).toBeLessThanOrEqual(14_000);
  });
});
```

- [ ] **Step 3: Run the tests and watch them fail**

Run: `npm test`
Expected: FAIL with "Cannot find module '@/lp-static/render'".

- [ ] **Step 4: Write `escape.ts` and `images.ts`**

`src/lp-static/escape.ts`:

```ts
const MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escapes text for HTML element content and double-quoted attributes. */
export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => MAP[ch]);
}
```

`src/lp-static/images.ts`:

```ts
/** URL served by Next's image optimizer (AVIF/WebP picked from the Accept header). */
export function nextImageUrl(src: string, width: number, quality = 70): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

/** Widths must be in Next's default deviceSizes (640, 750, 828, 1080, 1200) or imageSizes (≤ 384). */
export function srcSet(src: string, widths: number[], quality = 70): string {
  return widths.map((w) => `${nextImageUrl(src, w, quality)} ${w}w`).join(", ");
}
```

- [ ] **Step 5: Write `styles.ts`**

Colors come from `src/app/globals.css` (`--foreground: oklch(0.13 0.01 30)`, `--muted: oklch(0.96 0.003 30)`, `--muted-foreground: oklch(0.46 0.01 30)`, `--border: oklch(0.91 0.004 30)`), the section tint `#eef0ee`, and the offer bar `#17343a`. Look up `--brand-green` and `--brand-green-dark` in `globals.css` and paste their values into `--green` and `--green-dark` below.

```ts
export const LP_CSS = `
@font-face{font-family:"DM Serif Display";src:url(/fonts/dm-serif-display-latin.woff2) format("woff2");font-display:swap;font-weight:400}
:root{--fg:oklch(0.13 0.01 30);--muted:oklch(0.96 0.003 30);--mfg:oklch(0.46 0.01 30);--border:oklch(0.91 0.004 30);--tint:#eef0ee;--bar:#17343a;--green:oklch(0.55 0.13 150);--green-dark:oklch(0.42 0.11 150)}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--fg);background:#fff;padding-bottom:76px}
h1,h2,h3{font-family:"DM Serif Display",Georgia,serif;font-weight:400;line-height:1.1;margin:0;text-wrap:balance}
h1{font-size:clamp(2rem,6vw,3.25rem)}h2{font-size:clamp(1.75rem,4.5vw,2.75rem)}h3{font-size:1.15rem}
a{color:inherit}img{max-width:100%;display:block}
.wrap{max-width:72rem;margin:0 auto;padding:0 1rem}
.sec{padding:3.5rem 0}.tint{background:var(--tint)}.muted{color:var(--mfg)}
.bar{display:block;background:var(--bar);color:#fff;text-align:center;font-size:.875rem;font-weight:600;padding:.6rem 1rem;text-decoration:none}
.bar u{margin-left:.5rem;text-underline-offset:4px}
.top{position:sticky;top:0;z-index:40;background:#fff;box-shadow:0 1px 3px rgb(0 0 0/.08)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;height:4rem}
.top img{height:2.75rem;width:auto}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-height:52px;padding:0 1.5rem;border-radius:.5rem;font-weight:700;font-size:1rem;text-decoration:none;border:0;cursor:pointer}
.btn-dark{background:var(--fg);color:#fff}.btn-light{background:#fff;color:var(--fg);border:1px solid var(--border)}
.btn-green{background:var(--green);color:#fff;width:100%}
.btn[disabled]{opacity:.6;cursor:wait}
.hero{position:relative;background:var(--tint)}
.hero-img{position:relative;aspect-ratio:16/10;overflow:hidden}
.hero-img img{width:100%;height:100%;object-fit:cover}
.hero-grid{display:grid;gap:2rem;padding:2rem 1rem 3rem;max-width:72rem;margin:0 auto}
.eyebrow{font-size:.8rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--green-dark);margin:0 0 .75rem}
.sub{font-size:1.1rem;margin:1rem 0}
.ticks{list-style:none;padding:0;margin:0 0 1.25rem;display:grid;gap:.5rem}
.ticks li{padding-left:1.6rem;position:relative}
.ticks li::before{content:"";position:absolute;left:0;top:.45rem;width:.9rem;height:.5rem;border-left:3px solid var(--green);border-bottom:3px solid var(--green);transform:rotate(-45deg)}
.cta-row{display:flex;gap:.75rem;flex-wrap:wrap}
.card{background:#fff;border:1px solid var(--border);border-radius:.75rem;padding:1.25rem;box-shadow:0 10px 30px rgb(0 0 0/.08)}
.card h2{font-size:1.6rem;margin-bottom:.25rem}
form label{display:block;font-size:.875rem;font-weight:600;margin:.85rem 0 .3rem}
form input,form select{width:100%;min-height:48px;padding:.6rem .75rem;font:inherit;border:1px solid var(--border);border-radius:.5rem;background:#fff}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.hp{position:absolute;left:-9999px;height:0;overflow:hidden}
.err{color:#b42318;font-size:.9rem;margin:.75rem 0 0;min-height:1.2em}
.fine{font-size:.75rem;color:var(--mfg);margin:.6rem 0 0}
.facts{list-style:none;margin:0;padding:1.25rem 1rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem 1.25rem;font-size:.875rem;max-width:72rem;margin:0 auto}
.facts b{display:block}
.reviews{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 1rem 1rem}
.reviews figure{flex:0 0 86%;scroll-snap-align:center;margin:0;background:#fff;border:1px solid var(--border);border-radius:.5rem;padding:1.5rem}
.reviews figcaption{margin-top:1.25rem;padding-top:1rem;border-top:1px solid var(--border);font-size:.875rem}
.offer{background:var(--bar);color:#fff;border-radius:.75rem;padding:2rem 1.5rem}
.offer .badge{display:inline-block;background:#fff;color:var(--bar);font-weight:700;font-size:.8rem;border-radius:999px;padding:.25rem .75rem}
.photos{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:2rem}
.photos figure{margin:0}.photos img{aspect-ratio:4/3;object-fit:cover;border-radius:.5rem;width:100%;height:auto}
.photos figcaption{font-size:.8rem;color:var(--mfg);margin-top:.35rem}
dl.facts2{margin:2rem 0 0;background:#fff;border:1px solid var(--border);border-radius:.5rem}
dl.facts2 div{display:flex;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-top:1px solid var(--border)}
dl.facts2 div:first-child{border-top:0}dl.facts2 dt{color:var(--mfg)}dl.facts2 dd{margin:0;text-align:right;font-weight:600}
.why{margin:1.5rem 0 0;border-top:1px solid var(--border)}
.why div{padding:1rem 0;border-bottom:1px solid var(--border)}.why dt{font-weight:700}.why dd{margin:.2rem 0 0;color:var(--mfg)}
.steps{list-style:none;padding:0;margin:2rem 0 0;display:grid;gap:2rem}
.steps li{border-top:2px solid var(--fg);padding-top:1rem}
.steps .n{font-family:"DM Serif Display",Georgia,serif;font-size:3rem;line-height:1}
details{border-bottom:1px solid var(--border);padding:1rem 0}
summary{font-weight:700;cursor:pointer;list-style:none}summary::-webkit-details-marker{display:none}
summary::after{content:"+";float:right;font-weight:400}details[open] summary::after{content:"−"}
footer{border-top:1px solid var(--border);text-align:center;font-size:.75rem;color:var(--mfg);padding:2rem 1rem 6rem}
footer p{margin:.25rem 0}footer .links{display:flex;justify-content:center;gap:1.25rem;margin-top:1rem}
.sticky{position:fixed;inset:auto 0 0 0;z-index:50;display:grid;grid-template-columns:1fr 1fr 1.4fr;gap:.5rem;padding:.6rem .75rem calc(.6rem + env(safe-area-inset-bottom));background:#fff;box-shadow:0 -2px 10px rgb(0 0 0/.1)}
.sticky .btn{min-height:46px;padding:0 .5rem;font-size:.9rem}
@media (min-width:768px){.reviews{display:grid;grid-template-columns:1fr 1fr;overflow:visible;max-width:72rem;margin:0 auto}.photos{grid-template-columns:repeat(3,1fr)}.steps{grid-template-columns:repeat(3,1fr)}.facts{grid-template-columns:repeat(4,1fr)}}
@media (min-width:1024px){body{padding-bottom:0}.sticky{display:none}.hero-grid{grid-template-columns:1.1fr .9fr;align-items:start;padding:3.5rem 1rem}.hero-img{aspect-ratio:21/9}.sec{padding:5rem 0}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;
```

Copy the font file once:

```bash
mkdir -p public/fonts
curl -sL "https://fonts.gstatic.com/s/dmserifdisplay/v16/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2" -o public/fonts/dm-serif-display-latin.woff2
file public/fonts/dm-serif-display-latin.woff2   # must say "Web Open Font Format (Version 2)"
```

If that URL 404s, open `https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap` with a Chrome user agent and copy the `latin` `src:` URL into the curl.

- [ ] **Step 6: Write `render.ts`**

The copy for the trust strip, "A local company you can look up", the 3 steps and the footer is ported word for word from `src/components/lp/landing/ConversionLanding.tsx` (lines 20–33, 198–232, 323–383, 404–421, 503–533 at commit cb583a7).

```ts
import type { LandingConfig } from "@/lib/lp-landing";
import { GOOGLE_REVIEWS } from "@/lib/constants";
import { AD_TRACKING, SITE } from "@/lib/site-config";
import { esc } from "./escape";
import { nextImageUrl, srcSet } from "./images";
import { LP_CSS } from "./styles";
import { buildClientScript } from "./client-script";

const MHIC_LOOKUP_URL =
  "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect";

const STEPS = [
  ["Tell us about your project", "Send the short form, or just call or text us."],
  ["Get a free on-site estimate", "We come out, walk through the project with you and give you a clear written quote."],
  ["We get to work", "Our crew shows up on time, does the job right and leaves your home clean."],
] as const;

const SCOPE_OPTIONS = [
  "Interior",
  "Exterior",
  "Both inside and out",
  "Cabinets, trim or doors",
  "Drywall repair and painting",
];

function timelineLabels(config: LandingConfig): string[] {
  const q = config.builder.questions.find((x) => x.id === "timeline");
  return q ? q.options.map((o) => o.label) : ["As soon as possible", "Within a month", "1 to 3 months", "Just getting prices"];
}

function img(src: string, alt: string, widths: number[], sizes: string, w: number, h: number): string {
  return `<img src="${nextImageUrl(src, widths[widths.length - 1])}" srcset="${srcSet(src, widths)}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
}

function callLink(cls: string, label: string, placement: string): string {
  return `<a class="${cls}" href="${SITE.phoneTel}" data-contact="call" data-placement="${placement}">${label}</a>`;
}

function textLink(cls: string, label: string, smsBody: string, placement: string): string {
  return `<a class="${cls}" href="${SITE.phoneSms}?&body=${encodeURIComponent(smsBody)}" data-contact="text" data-placement="${placement}">${label}</a>`;
}

function form(config: LandingConfig): string {
  const opt = (v: string) => `<option>${esc(v)}</option>`;
  return `<form id="estimate-form" class="card" novalidate>
<h2>Get your free estimate</h2><p class="muted" style="margin:0">We reply within 1 business day.</p>
<input class="hp" type="text" name="website_url" tabindex="-1" autocomplete="off" aria-hidden="true">
<label for="f-name">Your name</label><input id="f-name" name="name" autocomplete="name" required>
<label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required>
<div class="row2"><div><label for="f-zip">Zip code</label><input id="f-zip" name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="10" required></div>
<div><label for="f-when">When?</label><select id="f-when" name="timeframe" required><option value="">Choose</option>${timelineLabels(config).map(opt).join("")}</select></div></div>
<label for="f-scope">What needs painting?</label><select id="f-scope" name="scope" required><option value="">Choose one</option>${SCOPE_OPTIONS.map(opt).join("")}</select>
<label for="f-email">Email <span class="muted">(optional)</span></label><input id="f-email" name="email" type="email" autocomplete="email">
<input type="hidden" name="city">
<p class="err" id="f-err" role="alert"></p>
<button class="btn btn-green" type="submit">Get my free estimate</button>
<p class="fine">No cost, no obligation. ${esc(config.offer.badge)}.</p>
</form>`;
}

export function renderLandingHtml(config: LandingConfig, variantKey?: string): string {
  const v = variantKey ? config.variants[variantKey] : undefined;
  const title = v?.metaTitle ?? config.metaTitle;
  const eyebrow = v?.eyebrow ?? config.eyebrow;
  const headline = v?.headline ?? config.headline;
  const hero = config.heroSlides[0];
  const heroWidths = [640, 750, 828, 1080, 1200];
  const { address } = SITE;

  const reviews = config.showReviews
    ? `<section class="sec tint"><div class="wrap"><h2>What customers say on Google</h2><p class="muted">Word for word from ${esc(SITE.name)} customers.</p></div>
<div class="reviews" style="margin-top:2rem">${GOOGLE_REVIEWS.map(
        (r) =>
          `<figure><blockquote style="margin:0">&ldquo;${esc(r.text)}&rdquo;</blockquote><figcaption><b>${esc(r.name)}</b><br><span class="muted">${esc(r.project)} · Posted on Google</span></figcaption></figure>`,
      ).join("")}</div></section>`
    : "";

  const photos = config.workPhotos
    .slice(0, 6)
    .map((p) => `<figure>${img(p.src, p.alt, [384, 640], "(min-width:768px) 33vw, 50vw", 640, 480)}<figcaption>${esc(p.caption)}</figcaption></figure>`)
    .join("");

  const script = buildClientScript({
    slug: config.slug,
    serviceTitle: config.serviceTitle,
    googleAdsId: AD_TRACKING.googleAdsId,
    callLabel: AD_TRACKING.googleAdsCallLabel,
    contactLabel: AD_TRACKING.googleAdsContactLabel,
    metaPixelId: AD_TRACKING.metaPixelId,
    phone: SITE.phone,
  });

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(config.metaDescription)}">
<meta name="robots" content="noindex, nofollow"><link rel="icon" href="/icon.png">
<link rel="preload" as="image" imagesrcset="${srcSet(hero, heroWidths)}" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="font" type="font/woff2" href="/fonts/dm-serif-display-latin.woff2" crossorigin>
<style>${LP_CSS}</style></head><body>
<a class="bar" href="#offer">${esc(config.offer.short)}<u>See details</u></a>
<header class="top"><div class="wrap"><img src="${nextImageUrl("/images/logo.png", 128)}" width="106" height="110" alt="${esc(SITE.name)}">
${callLink("btn btn-dark", `Call ${SITE.phone}`, "header")}</div></header>
<section class="hero"><div class="hero-img"><img src="${nextImageUrl(hero, 1080)}" srcset="${srcSet(hero, heroWidths)}" sizes="100vw" width="1200" height="750" alt="" fetchpriority="high" decoding="async"></div>
<div class="hero-grid"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(headline)}</h1><p class="sub">${esc(config.subheadline)}</p>
<ul class="ticks">${config.heroBullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
<div class="cta-row">${callLink("btn btn-dark", "Call now", "hero")}${textLink("btn btn-light", "Text us", config.smsBody, "hero")}</div></div>
<div id="estimate">${form(config)}</div></div></section>
<ul class="facts"><li><b>Maryland licensed</b><a class="muted" href="${MHIC_LOOKUP_URL}" target="_blank" rel="noopener noreferrer">Look up ${esc(SITE.license)}</a></li>
<li><b>Family owned and insured</b><span class="muted">Run by ${esc(SITE.owner)}</span></li>
<li><b>Free written estimates</b><span class="muted">No cost, no obligation</span></li>
<li><b>Fast response</b><span class="muted">Within 1 business day</span></li></ul>
${reviews}
<section class="sec" id="offer"><div class="wrap"><div class="offer"><span class="badge">${esc(config.offer.badge)}</span>
<h2 style="margin-top:1rem">${esc(config.offer.title)}</h2><p>${esc(config.offer.details)}</p>
<a class="btn btn-light" href="#estimate">Claim my free estimate</a><p class="fine" style="color:#cfd8da">${esc(config.offer.finePrint)}</p></div></div></section>
<section class="sec"><div class="wrap"><h2>Recent ${esc(SITE.name)} projects</h2><p class="muted">Real jobs by our crew, not stock photos.</p><div class="photos">${photos}</div></div></section>
<section class="sec tint"><div class="wrap"><h2>A local company you can look up</h2>
<p>${esc(SITE.name)} is a family owned Baltimore contractor run by ${esc(SITE.owner)}. We hold a Maryland Home Improvement Commission license and we are fully insured.</p>
<p>Don&#39;t take our word for it. Check our license number on the state website before you ever call us.</p>
<dl class="facts2"><div><dt>License</dt><dd>${esc(SITE.license)}<br><a href="${MHIC_LOOKUP_URL}" target="_blank" rel="noopener noreferrer">Verify with the State of Maryland</a></dd></div>
<div><dt>Owner</dt><dd>${esc(SITE.owner)}</dd></div>
<div><dt>Office</dt><dd>${esc(address.street)}<br>${esc(address.city)}, ${address.stateCode} ${address.zip}</dd></div>
<div><dt>Phone</dt><dd>${callLink("", SITE.phone, "company_facts")}</dd></div>
<div><dt>Website</dt><dd><a href="/">${esc(SITE.domain)}</a></dd></div></dl></div></section>
<section class="sec"><div class="wrap">${img(config.whyImage, "", [640, 828], "(min-width:1024px) 460px, 100vw", 828, 518)}
<h2 style="margin-top:2rem">${esc(config.why.heading)}</h2><dl class="why">${config.why.items.map((i) => `<div><dt>${esc(i.title)}</dt><dd>${esc(i.text)}</dd></div>`).join("")}</dl></div></section>
<section class="sec tint"><div class="wrap"><h2>Getting started is easy</h2><ol class="steps">${STEPS.map(
    ([t, d], i) => `<li><span class="n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p class="muted">${d}</p></li>`,
  ).join("")}</ol></div></section>
<section class="sec"><div class="wrap"><h2>Questions homeowners ask</h2>${config.faq.map((f) => `<details><summary>${esc(f.question)}</summary><p class="muted">${esc(f.answer)}</p></details>`).join("")}</div></section>
<section class="sec tint"><div class="wrap" style="text-align:center"><h2>Ready for a free estimate?</h2><p class="muted">Call, text or send the form. We reply within 1 business day.</p>
<div class="cta-row" style="justify-content:center"><a class="btn btn-dark" href="#estimate">Get my free estimate</a>${callLink("btn btn-light", `Call ${SITE.phone}`, "final")}</div></div></section>
<footer><p style="font-size:.875rem;font-weight:700;color:var(--fg)">${esc(SITE.name)}</p><p>${esc(address.street)}, ${esc(address.city)}, ${address.stateCode} ${address.zip}</p>
<p>Licensed and insured, ${esc(SITE.license)}</p><p>${callLink("", SITE.phone, "footer")} | <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
<p class="links"><a href="/">Main website</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a></p></footer>
<nav class="sticky" aria-label="Quick actions">${callLink("btn btn-dark", "Call", "sticky")}${textLink("btn btn-light", "Text", config.smsBody, "sticky")}<a class="btn btn-green" href="#estimate">Free estimate</a></nav>
<script>${script}</script></body></html>`;
}
```

Until Task 2 lands, create `src/lp-static/client-script.ts` holding only:

```ts
export interface ClientScriptConfig {
  slug: string; serviceTitle: string; googleAdsId: string; callLabel: string;
  contactLabel: string; metaPixelId: string; phone: string;
}
export function buildClientScript(_cfg: ClientScriptConfig): string { return ""; }
```

- [ ] **Step 7: Run the tests and watch them pass**

Run: `npm test`
Expected: all 9 tests in `render.test.ts` PASS.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts public/fonts src/lp-static
git commit -m "feat(lp-static): plain HTML renderer for the painting ad page"
```

---

### Task 2: Inline client script

**Files:**
- Modify: `src/lp-static/client-script.ts` (replace the stub)
- Test: `src/lp-static/__tests__/client-script.test.ts`

**Interfaces:**
- Consumes: `renderLandingHtml` (Task 1) to build a realistic DOM in tests.
- Produces: `buildClientScript(cfg: ClientScriptConfig): string`, a self-contained ES2017 IIFE with no imports.

- [ ] **Step 1: Write the failing tests**

`src/lp-static/__tests__/client-script.test.ts`:

```ts
// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";
import { buildClientScript } from "@/lp-static/client-script";

const CFG = {
  slug: "painting", serviceTitle: "Painting (Interior and Exterior)", googleAdsId: "AW-1",
  callLabel: "CALL", contactLabel: "", metaPixelId: "", phone: "443-825-0206",
};

type FetchCall = [string, RequestInit | undefined];
let calls: FetchCall[];
let leadReply: () => Promise<Response>;
let tokenReply: () => Promise<Response>;
const assign = vi.fn();

function boot(search = "") {
  const html = renderLandingHtml(LANDING_PAGES.painting, "near-me");
  document.documentElement.innerHTML = html.replace(/^<!doctype html><html lang="en">/, "").replace(/<\/html>$/, "");
  window.history.replaceState({}, "", `/lp/painting/near-me${search}`);
  sessionStorage.clear();
  calls = [];
  (globalThis as { fetch: unknown }).fetch = vi.fn((url: string, init?: RequestInit) => {
    calls.push([url, init]);
    if (url.startsWith("/api/form-token")) return tokenReply();
    if (url.startsWith("/api/zip-lookup")) return Promise.resolve(new Response(JSON.stringify({ city: "Towson", state: "MD" })));
    return leadReply();
  });
  // jsdom cannot spy on location.assign, so the script navigates through this optional hook
  (window as unknown as { __lpNavigate: typeof assign }).__lpNavigate = assign;
  new Function(buildClientScript(CFG))();
}

function fill() {
  const set = (id: string, v: string) => { (document.getElementById(id) as HTMLInputElement).value = v; };
  set("f-name", "Jane Doe"); set("f-phone", "(443) 555-0123"); set("f-zip", "21204");
  set("f-when", (document.querySelector("#f-when option:nth-child(2)") as HTMLOptionElement).value);
  set("f-scope", "Interior");
}
const submit = () => document.getElementById("estimate-form")!.dispatchEvent(new Event("submit", { cancelable: true }));
// Response.json() and chained fetches need a few macrotask turns to settle
const flush = async () => { for (let i = 0; i < 10; i++) await new Promise((r) => setTimeout(r, 0)); };
const leadCalls = () => calls.filter(([u]) => u === "/api/leads");

beforeEach(() => {
  assign.mockReset();
  tokenReply = () => Promise.resolve(new Response(JSON.stringify({ token: "123.abc" })));
  leadReply = () => Promise.resolve(new Response(JSON.stringify({ success: true })));
});

describe("client script", () => {
  it("stores UTM and click ids in bb_utm", () => {
    boot("?utm_source=google&utm_medium=cpc&gclid=G1");
    expect(JSON.parse(sessionStorage.getItem("bb_utm")!)).toMatchObject({ utm_source: "google", utm_medium: "cpc", gclid: "G1" });
  });

  it("posts the same body as submitLpLead and goes to thanks", async () => {
    boot("?gclid=G1"); await flush(); fill(); submit(); await flush(); await flush();
    const [, init] = leadCalls()[0];
    const body = JSON.parse(String(init!.body));
    expect(body).toMatchObject({
      name: "Jane Doe", phone: "(443) 555-0123", service: "Painting (Interior and Exterior)",
      cityOrZip: "Towson, MD 21204", source: "google_ads:lp_form:painting", _t: "123.abc", website_url: "",
    });
    expect(body.description).toContain("Interior");
    expect(body.timeframe).not.toBe("");
    expect(JSON.parse(sessionStorage.getItem("ef_lp_pending_conversion")!)).toEqual({ service: "Painting (Interior and Exterior)", method: "form" });
    expect(assign).toHaveBeenCalledWith("/lp/painting/thanks?name=Jane");
  });

  it("google click id marks the lead as google_ads", async () => {
    boot("?gbraid=B1"); await flush(); fill(); submit(); await flush(); await flush();
    expect(JSON.parse(String(leadCalls()[0][1]!.body)).source).toBe("google_ads:lp_form:painting");
  });

  it("does not record a conversion when the server says accepted false", async () => {
    leadReply = () => Promise.resolve(new Response(JSON.stringify({ success: true, accepted: false })));
    boot(); await flush(); fill(); submit(); await flush(); await flush();
    expect(sessionStorage.getItem("ef_lp_pending_conversion")).toBeNull();
    expect(assign).toHaveBeenCalled();
  });

  it("submits once on double click", async () => {
    boot(); await flush(); fill(); submit(); submit(); await flush(); await flush();
    expect(leadCalls()).toHaveLength(1);
  });

  it("shows the server error and keeps entries", async () => {
    leadReply = () => Promise.resolve(new Response(JSON.stringify({ error: "Sorry, we only serve the Baltimore area" }), { status: 400 }));
    boot(); await flush(); fill(); submit(); await flush(); await flush();
    expect(document.getElementById("f-err")!.textContent).toContain("only serve the Baltimore area");
    expect((document.getElementById("f-name") as HTMLInputElement).value).toBe("Jane Doe");
    expect((document.querySelector("#estimate-form button") as HTMLButtonElement).disabled).toBe(false);
    expect(assign).not.toHaveBeenCalled();
  });

  it("network failure shows fallback message", async () => {
    leadReply = () => Promise.reject(new TypeError("offline"));
    boot(); await flush(); fill(); submit(); await flush(); await flush();
    expect(document.getElementById("f-err")!.textContent).toContain("call or text");
  });

  it("blocks submit and explains when required fields are missing", async () => {
    boot(); await flush(); submit(); await flush();
    expect(leadCalls()).toHaveLength(0);
    expect(document.getElementById("f-err")!.textContent).not.toBe("");
  });

  it("fetches a token at submit when none loaded yet", async () => {
    let first = true;
    tokenReply = () => (first ? ((first = false), Promise.reject(new Error("slow"))) : Promise.resolve(new Response(JSON.stringify({ token: "9.z" }))));
    boot(); await flush(); fill(); submit(); await flush(); await flush(); await flush();
    expect(JSON.parse(String(leadCalls()[0][1]!.body))._t).toBe("9.z");
  });

  it("configures call tracking in the dataLayer before gtag loads", () => {
    boot();
    (document.querySelector('[data-contact="call"]') as HTMLAnchorElement).dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    const dl = (window as unknown as { dataLayer: unknown[][] }).dataLayer;
    expect(dl.some((a) => Array.from(a as ArrayLike<unknown>)[0] === "config")).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests and watch them fail**

Run: `npm test -- client-script`
Expected: FAIL. The stub returns an empty script, so no POST happens and `bb_utm` is null.

- [ ] **Step 3: Implement `buildClientScript`**

Replace `src/lp-static/client-script.ts` with:

```ts
export interface ClientScriptConfig {
  slug: string;
  serviceTitle: string;
  googleAdsId: string;
  callLabel: string;
  contactLabel: string;
  metaPixelId: string;
  phone: string;
}

/**
 * Everything the painting ad page needs at runtime, as one small inline script:
 * UTM capture, spam token, zip to city, lead submit, call/text tracking, and the
 * Google tag loaded only after the page has finished loading.
 * The POST body mirrors submitLpLead() in src/lib/lp-lead.ts. Keep them in sync.
 */
export function buildClientScript(cfg: ClientScriptConfig): string {
  const C = JSON.stringify(cfg);
  return `(function(){var C=${C};var W=window,D=document,S=sessionStorage;
function ss(k,v){try{if(v===undefined)return S.getItem(k);S.setItem(k,v)}catch(e){return null}}
var q=new URLSearchParams(location.search);
var utm={utm_source:q.get("utm_source")||"",utm_medium:q.get("utm_medium")||"",utm_campaign:q.get("utm_campaign")||"",fbclid:q.get("fbclid")||"",gclid:q.get("gclid")||q.get("gbraid")||q.get("wbraid")||""};
if(utm.utm_source||utm.gclid||utm.fbclid||!ss("bb_utm"))ss("bb_utm",JSON.stringify(utm));
function readUtm(){try{return JSON.parse(ss("bb_utm")||"{}")}catch(e){return{}}}
function source(u,label){var s=(u.utm_source||"").toLowerCase(),m=(u.utm_medium||"").toLowerCase(),p="";
if(s.indexOf("facebook")>-1||s.indexOf("fb")>-1||s==="ig"||s.indexOf("instagram")>-1||u.fbclid)p="facebook_ads";
else if(s.indexOf("google")>-1||m==="cpc"||m==="ppc"||u.gclid)p="google_ads";return p?p+":"+label:label}
W.dataLayer=W.dataLayer||[];function gtag(){W.dataLayer.push(arguments)}W.gtag=W.gtag||gtag;
if(C.googleAdsId){W.gtag("js",new Date());W.gtag("config",C.googleAdsId);
if(C.callLabel)W.gtag("config",C.googleAdsId+"/"+C.callLabel,{phone_conversion_number:C.phone});}
function loadTag(){if(!C.googleAdsId)return;var s=D.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+C.googleAdsId;D.head.appendChild(s)}
if(D.readyState==="complete")setTimeout(loadTag,0);else W.addEventListener("load",function(){setTimeout(loadTag,0)},{once:true});
D.addEventListener("click",function(e){var a=e.target&&e.target.closest&&e.target.closest("[data-contact]");if(!a)return;
if(C.contactLabel)W.gtag("event","conversion",{send_to:C.googleAdsId+"/"+C.contactLabel});
if(W.fbq)W.fbq("track","Contact",{content_name:C.serviceTitle,content_category:a.getAttribute("data-contact")})});
var token="";function getToken(){return fetch("/api/form-token").then(function(r){return r.json()}).then(function(d){token=d.token||token;return token}).catch(function(){return token})}
getToken();setInterval(getToken,1200000);
var f=D.getElementById("estimate-form");if(!f)return;var err=D.getElementById("f-err"),btn=f.querySelector("button"),busy=false;
var zip=f.elements.zip,city=f.elements.city,zipState="";
zip.addEventListener("blur",function(){var z=(zip.value.match(/\\d{5}/)||[""])[0];if(!z)return;
fetch("/api/zip-lookup?zip="+z).then(function(r){return r.json()}).then(function(d){if(d.city){city.value=d.city;zipState=d.state||""}}).catch(function(){})});
function loc(){var z=zip.value.trim(),c=city.value.trim();if(!c)return z;return zipState?c+", "+zipState+" "+z:c+", "+z}
f.addEventListener("submit",function(e){e.preventDefault();if(busy)return;err.textContent="";
var v=function(n){return(f.elements[n].value||"").trim()};
if(v("name").length<2||v("phone").replace(/\\D/g,"").length<10||!/\\d{5}/.test(v("zip"))||!v("timeframe")||!v("scope")){
err.textContent="Please add your name, a 10 digit phone number, your zip code, what needs painting and when.";return}
busy=true;btn.disabled=true;
var go=function(){if(!city.value&&/\\d{5}/.test(v("zip")))return fetch("/api/zip-lookup?zip="+v("zip").match(/\\d{5}/)[0]).then(function(r){return r.json()}).then(function(d){if(d.city){city.value=d.city;zipState=d.state||""}}).catch(function(){});return Promise.resolve()};
go().then(function(){return token?token:getToken()}).then(function(t){var u=readUtm();var src=source(u,"lp_form:"+C.slug);
return fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
name:v("name"),phone:v("phone"),email:v("email"),service:C.serviceTitle,cityOrZip:loc(),
description:"Quick form on the "+C.serviceTitle+" ad page. Needs: "+v("scope")+".",timeframe:v("timeframe"),
source:src,utmSource:u.utm_source||"",utmMedium:u.utm_medium||"",utmCampaign:u.utm_campaign||"",landingPage:location.href,
_t:t||"",website_url:f.elements.website_url.value})})}).then(function(r){return r.json().catch(function(){return{}}).then(function(d){
if(!r.ok)throw new Error(d.error||"Something went wrong. Please call or text us instead.");
if(d.accepted!==false)ss("ef_lp_pending_conversion",JSON.stringify({service:C.serviceTitle,method:"form"}));
(W.__lpNavigate||function(x){location.assign(x)})("/lp/"+C.slug+"/thanks?name="+encodeURIComponent(v("name").split(" ")[0]))})}).catch(function(x){
err.textContent=x&&x.message&&x.message!=="offline"&&!(x instanceof TypeError)?x.message:"Something went wrong. Please call or text us at "+C.phone+".";
busy=false;btn.disabled=false})});
})();`;
}
```

- [ ] **Step 4: Run all tests**

Run: `npm test`
Expected: all render and client-script tests PASS. Also confirm the budget: add this test to `render.test.ts`, then run again:

```ts
import { buildClientScript } from "@/lp-static/client-script";
it("keeps the inline script under 6 KB", () => {
  expect(buildClientScript({ slug: "painting", serviceTitle: "x", googleAdsId: "AW-1", callLabel: "a", contactLabel: "", metaPixelId: "", phone: "1" }).length).toBeLessThanOrEqual(6_000);
});
```

- [ ] **Step 5: Commit**

```bash
git add src/lp-static
git commit -m "feat(lp-static): inline lead form and tracking script for the plain HTML page"
```

---

### Task 3: Serve it at the existing ad URLs

**Files:**
- Create: `src/app/lp-static/[service]/[[...variant]]/route.ts`
- Modify: `next.config.ts` (add `rewrites`)

**Interfaces:**
- Consumes: `renderLandingHtml` (Task 1), `LANDING_PAGES`.
- Produces: GET `/lp-static/painting` and `/lp-static/painting/<variant>`, plus rewrites from `/lp/painting[/<variant>]`.

- [ ] **Step 1: Write the route handler**

```ts
import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";

// Prerendered at build. /lp/painting and its ad group variants are rewritten here
// (next.config.ts) so the ad page ships no React runtime.
export const dynamic = "force-static";
export const dynamicParams = false;

const STATIC_SERVICES = ["painting"] as const;

export function generateStaticParams() {
  return STATIC_SERVICES.flatMap((service) => [
    { service, variant: [] as string[] },
    ...Object.keys(LANDING_PAGES[service].variants).map((v) => ({ service, variant: [v] })),
  ]);
}

export async function GET(_req: Request, ctx: { params: Promise<{ service: string; variant?: string[] }> }) {
  const { service, variant } = await ctx.params;
  const config = LANDING_PAGES[service];
  const key = variant?.[0];
  if (!config || (key && !config.variants[key]) || (variant && variant.length > 1)) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(renderLandingHtml(config, key), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
```

- [ ] **Step 2: Add the rewrites**

In `next.config.ts`, inside `nextConfig`, after `redirects()`:

```ts
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/lp/painting", destination: "/lp-static/painting" },
        {
          source: "/lp/painting/:variant(near-me|interior|exterior|cabinets|drywall)",
          destination: "/lp-static/painting/:variant",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
```

- [ ] **Step 3: Build and check that the routes are static**

Run: `npm run build 2>&1 | grep -E "lp-static|Compiled|rror"`
Expected: `✓ Compiled successfully`, and `/lp-static/[service]/[[...variant]]` listed with `●` (SSG), not `ƒ`. If it shows `ƒ`, the handler is dynamic. Check that `dynamic = "force-static"` is exported and that nothing reads `headers()` or `cookies()`.

- [ ] **Step 4: Smoke-test every URL against `next start`**

```bash
npx next start -p 3456 &
sleep 8
for p in "" /near-me /interior /exterior /cabinets /drywall; do
  printf "%-12s %s scripts:%s\n" "${p:-/}" \
    "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3456/lp/painting$p?gclid=T1")" \
    "$(curl -s "http://localhost:3456/lp/painting$p" | grep -c '<script src=')"
done
curl -s -o /dev/null -w "thanks %{http_code}\n" http://localhost:3456/lp/painting/thanks
curl -s http://localhost:3456/lp/bathroom-remodeling | grep -c "_next/static/chunks"   # still the React page: > 0
curl -s -o /dev/null -w "bad variant %{http_code}\n" http://localhost:3456/lp/painting/nope
```

Expected: every painting URL `200 scripts:0`; `thanks 200`; bathroom count > 0; `bad variant 404`. (`/lp/painting/nope` isn't rewritten, so it falls through to the React `[variant]` page, which has `dynamicParams = false` and 404s.)

Stop the server: on Windows, find the PID with `netstat -ano | grep ":3456 " | grep LISTENING` and run `taskkill //F //PID <pid>`. **Never** `taskkill //IM node.exe`: that kills every Node process on the machine, including MCP servers.

- [ ] **Step 5: Commit**

```bash
git add next.config.ts "src/app/lp-static"
git commit -m "feat(lp): serve the painting ad pages as prerendered plain HTML"
```

---

### Task 4: Speed budget check and tuning

**Files:**
- Create: `scripts/lh-budget.mjs`
- Modify: `package.json` (`"lh": "node scripts/lh-budget.mjs"`)

- [ ] **Step 1: Write the budget script**

```js
// Runs Lighthouse (mobile) 3 times per URL against a running server and fails
// when the median score is under 95 or the median LCP is over 2500 ms.
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const base = process.argv[2] || "http://localhost:3456";
const urls = ["/lp/painting/near-me", "/lp/painting/interior", "/lp/painting/cabinets"];
const dir = mkdtempSync(path.join(tmpdir(), "lh-"));
const median = (a) => a.sort((x, y) => x - y)[Math.floor(a.length / 2)];
let failed = false;

for (const u of urls) {
  const scores = [], lcps = [];
  for (let i = 0; i < 3; i++) {
    const out = path.join(dir, `r${i}.json`);
    execFileSync("npx", ["-y", "lighthouse@12", base + u, "--only-categories=performance", "--output=json",
      `--output-path=${out}`, "--chrome-flags=--headless=new", "--quiet"], { stdio: "ignore", shell: true });
    const r = JSON.parse(readFileSync(out, "utf8"));
    scores.push(Math.round(r.categories.performance.score * 100));
    lcps.push(Math.round(r.audits["largest-contentful-paint"].numericValue));
  }
  const s = median(scores), l = median(lcps);
  const ok = s >= 95 && l <= 2500;
  failed ||= !ok;
  console.log(`${ok ? "PASS" : "FAIL"} ${u} score ${s} (${scores}) LCP ${l} ms (${lcps})`);
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Run it against the local production build**

Run: `npm run build && (npx next start -p 3456 &) && sleep 8 && npm run lh`
Expected: `PASS` on all three URLs. The no-JS prototype measured 98–99 and 2.1–2.3 s, so a real page should land there.

- [ ] **Step 3: If any URL fails, tune in this order and re-run after each change**
  1. Hero quality: in `render.ts`, pass `55` as the quality argument to the hero `srcSet`/`nextImageUrl` calls.
  2. Font: remove the font `<link rel="preload">`, so headings render in Georgia first and swap later.
  3. Hero widths: drop `1200` from `heroWidths`.
  4. If LCP is still over 2.5 s, look at `lcp-breakdown-insight` in the JSON (`node -e` one-liner) and report the subparts before changing anything else.

- [ ] **Step 4: Commit**

```bash
git add scripts/lh-budget.mjs package.json src/lp-static
git commit -m "test(lp): Lighthouse budget for the painting ad pages"
```

---

### Task 5: Real-world check, then deploy (needs Nick's OK)

**Files:** none new.

- [ ] **Step 1: Visual check.** Open `http://localhost:3456/lp/painting/near-me` in Chrome at 390×844 and 1280×800. Confirm the headline reads "Trusted local painters, ready for your home.", the form is visible on desktop without scrolling, the sticky bar shows on mobile only, the photos load as you scroll, and FAQ items open.
- [ ] **Step 2: Push the branch for a Vercel preview** (`git push -u origin lp-speed`). Vercel builds a preview URL for the branch. Ask Nick before pushing, because a push is outward-facing.
- [ ] **Step 3: One real test lead on the preview** with Nick's OK. Use name "Test Claude", phone 443-555-0100, zip 21204. Expected: lands on `/lp/painting/thanks?name=Test`, the lead appears in the dashboard with source `lp_form:painting` and `cityOrZip` "Towson, MD 21204", GHL gets it, and Tag Assistant shows the painting "Submit lead form" conversion firing on the `/lp/painting/thanks` page view (it is URL based). Delete the test lead afterwards.
- [ ] **Step 4: Live Lighthouse on the preview URL.** Run `node scripts/lh-budget.mjs https://<preview-url>`. Expected: median score ≥ 90 (live network adds TTFB) and LCP ≤ 2.5 s.
- [ ] **Step 5: Merge to `main` with Nick's OK.** Vercel deploys. Re-run the budget against `https://www.elitefinishesmaryland.com`. Log the before/after in the Obsidian handoff. Google Ads re-scores landing page experience over the following 1–2 weeks; check `post_click_quality_score` through Windsor around 2026-10-27.

---

## Amendment 2026-10-13 (Nick): keep the Project Builder

Nick: "the project builder is great, i dunno if we should remove it". This supersedes the "Cut: 4-step Project Builder quiz" and "Short form fields" decisions above.

- The hero card is a plain-JS port of `src/components/lp/landing/ProjectBuilder.tsx`, with parity on every field the lead carries:
  - Questions come from `config.builder.questions`. A question with `showIf` is shown only when the earlier answer is in `anyOf`. Tapping an option advances after 260 ms. Back works on every step. The header shows "Step N of M", or "Last step" on the contact step, with a progress bar.
  - The contact step has name, phone, zip, city (autofilled from `/api/zip-lookup`) and email. Validation and its error message are the same as the React builder.
  - POST body: `description` = answered questions as `"<question without ?>: <answer>"` joined with `" | "` (fallback `"Interested in: <serviceTitle>"`); `timeframe` = port of `extractTimeframe(answers.timeline)` from `src/lib/quiz-data.ts`; `budget` = the first answer containing `$`, omitted when none; `cityOrZip` = `formatLocation(city, zip, state)`.
  - `source` label is `lp_builder:painting`. The pending conversion `method` is `"builder"`.
- The separate quick form at the bottom of the page is still cut. Every "free estimate" button links to `#estimate`.
- Task 1 and Task 2 tests change to match: the form tests drive the builder (answer questions → contact step → submit). The Review Focus items are unchanged.
