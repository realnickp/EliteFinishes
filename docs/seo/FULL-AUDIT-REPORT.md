# Elite Finishes SEO Audit

**Site:** https://www.elitefinishesmaryland.com
**Date:** September 16, 2026
**Business type:** Local home services contractor (painting and remodeling), service area business with a published Baltimore address
**Method:** 8 specialist audits (technical, content, schema, sitemap, performance, mobile/visual, AI search, local) plus an on-page crawl of all 64 sitemap URLs

## Executive Summary

**SEO Health Score before fixes: 53 / 100**

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 60 |
| Content Quality | 23% | 48 |
| On-Page SEO | 20% | 50 |
| Schema / Structured Data | 10% | 42 |
| Performance (estimated, PageSpeed API was rate limited) | 10% | 55 |
| AI Search Readiness | 10% | 63 |
| Images | 5% | 55 |

Supporting scores: Sitemap 74, Local SEO 47, Visual/Mobile 62.

### Top 5 critical issues found
1. **Made-up reviews and ratings.** 12 placeholder testimonials were shown across 50+ pages and fed into Review and AggregateRating schema, with three different invented numbers (63 reviews sitewide, 47 on city pages, 11 on the reviews page). This is a Google structured data policy violation and an FTC fake review risk.
2. **Every canonical, sitemap URL and schema URL pointed at the non-www domain**, which 308-redirects to www. Google was told to index 64 addresses that all redirect.
3. **Title tags repeated the brand** ("... | Elite Finishes | Elite Finishes") on 53 of 64 pages, and 57 titles ran past what Google displays.
4. **Stock photos presented as Elite's own work**, including alt text like "Kitchen remodeling completed by Elite Finishes in Ellicott City" and an About page line saying the gallery is "real work done for real homeowners."
5. **Wrong owner in schema**: "Nick P." was listed as founder, while every real review names Victor as the owner.

### Top 5 quick wins identified
1. Change `SITE.url` to the www host (one line, fixes canonicals, sitemap, robots and schema).
2. Remove the duplicate brand suffix from page titles.
3. 301 redirect the 7 retired Backyard Bobby's service URLs that return 404.
4. Keep `/login` and `/canvasser/` out of the crawl; drop `/quote/quiz` from the sitemap.
5. Add `/llms.txt` and the verified BBB profile to `sameAs`.

## Technical SEO
- Canonical, sitemap `<loc>`, robots `Sitemap:` line and OG URLs all used the non-www host (root cause: `src/lib/constants.ts` `SITE.url`).
- 7 legacy service URLs (`/services/fencing`, `/hardscaping`, `/stamped-concrete`, `/driveway-installation`, `/gravel-pads-and-concrete-foundations`, `/accessory-dwelling-units`, `/excavation-and-demolition`) returned 404 instead of redirecting.
- Sitemap `lastmod` was the build time on 58 of 64 URLs.
- `/login` and `/canvasser/*` were crawlable (they did carry noindex).
- `/gallery` was indexable while filled with stock photos.
- No CSP header (not changed; would need careful testing with ad and analytics scripts).
- Passing: all sitemap URLs return 200 on www, full server rendering, HTTPS and HSTS, `/lp/*` correctly noindex.

## Content Quality
- Placeholder testimonials on home, about, quote, every city page, service pages and old ad pages.
- Unverified claims: "Trusted by 500+ Maryland homeowners", "5.0 Average Star Rating", "5-Star Rated" badges.
- Stock photography credited to Elite, and the concrete page used a roofing photo as its hero.
- Blog posts have no named author; only 6 posts, with no support content for decks, siding, roofing, commercial or cabinet work.
- City pages (34): the local and sitemap audits found genuinely unique permit notes, local angles and FAQs; the content audit flagged repeated sentence patterns. Treat as a moderate risk: keep them, add real local project proof over time, don't add more without unique content.
- House style: about 140 em/en dashes used as punctuation in visible copy.

## On-Page SEO
- 53 duplicate brand titles, 57 titles over 60 characters, 55 meta descriptions over 160 characters.
- `/quote/quiz` had no H1.
- Blog index title still read "Tips, Guides & Outdoor Living Ideas" from the previous business.
- Service pages never linked to the 34 city pages (one-way hub and spoke).

## Schema & Structured Data
- Fabricated `aggregateRating` sitewide, on all city pages and on `/testimonials` (with Review nodes).
- Deprecated `HowTo` markup on every service page and on `/financing`.
- City pages declared a second, unlinked HomeAndConstructionBusiness entity; the quote page declared a third.
- `founder: "Nick P."`, credential name rendered as "MHIC MHIC 153498", `sameAs` used a Google Maps search URL, no WebSite entity.
- Generic `HomeAndConstructionBusiness` type instead of `HousePainter` / `GeneralContractor`.

## Performance (code review; live PageSpeed data was not available)
- Homepage preloaded two hero images on every device (one hidden by CSS).
- 43 images used on the site were 0.5 to 7.3 MB each (103 MB total).
- Chatbot and popup (with framer-motion) loaded in the initial bundle on every page.
- Hero text and buttons on service and city pages started invisible (fade-in animation), delaying the largest paint.

## Images
- Alt text present everywhere, but many stock images were described as Elite projects in specific towns.
- Oversized source files (see Performance).

## Visual / Mobile
- The offers popup covered 100% of the mobile screen 4.5 seconds after landing on any page (Google intrusive interstitial risk).
- "Ask Alex" chat button was 36px tall (below the 48px tap target guideline) and overlapped the hero call button.
- City page heroes were a plain black block.

## AI Search Readiness
- All AI crawlers allowed; content server rendered. No `llms.txt`.
- Weak entity signals: only Facebook plus a Maps search link in `sameAs`. A matching BBB profile exists (Elite Finishes Inc, 443-825-0206, 21230) but was not linked.
- Similarly named businesses nearby ("Elite Finish Interiors, LLC" in Laurel, MD) create entity confusion risk.
- No video content.

## Local SEO
- Google Business Profile could not be verified with the available tools; owner must confirm category, review count and whether the address is hidden.
- NAP conflict: the financing partner link names the business "Elite Finishes Inc. - Sykesville, MD" while the site says 1601 Cuba Street, Baltimore.
- WBME 22380085 credential could not be verified.
- Few citations beyond BBB (not accredited, 0 reviews).
