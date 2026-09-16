# Elite Finishes SEO Action Plan

Status as of September 16, 2026. See FULL-AUDIT-REPORT.md for evidence.

## Done in code (this round)

### Critical
- [x] `SITE.url` switched to `https://www.elitefinishesmaryland.com`: canonicals, sitemap, robots, OG and schema now use the live host. `metadataBase` pinned to it.
- [x] Removed every fabricated rating and review: sitewide `aggregateRating`, city page ratings, the Review schema on `/testimonials`, and all 12 placeholder testimonials. The `/testimonials` page was removed entirely and 301 redirects to the homepage. `TESTIMONIALS` is now built only from the 4 real Google reviews.
- [x] Removed unverified numbers: "Trusted by 500+", "5.0 Average Star Rating", "5-Star Rated" badges (replaced with license, free estimates, counties served, real Google reviews).
- [x] Page titles: no more doubled brand; homepage, about, services hub, commercial and blog titles shortened; blog posts use their own title.
- [x] Stock photos no longer credited to Elite or to specific towns (alt text rewritten); removed the "real work done for real homeowners" gallery claim.
- [x] Real Elite photos now lead the bathroom, basement, home remodeling and interior painting service pages. Concrete page no longer uses a roofing photo.

### High
- [x] New sitewide schema graph: `HousePainter` + `GeneralContractor` business with `@id`, `WebSite` entity, all 34 cities plus 4 counties in `areaServed`, BBB profile in `sameAs`, correct license name. Wrong founder removed.
- [x] Removed deprecated `HowTo` markup (service pages, financing). Service and blog schema reference the business by `@id`. City pages no longer declare a duplicate business.
- [x] 301 redirects for the 7 retired service URLs to `/services`.
- [x] robots.txt blocks `/canvasser/` and `/login`; `/quote/quiz` removed from the sitemap; fake build-time `lastmod` removed (blog keeps real dates).
- [x] `/gallery` set to noindex until real project photos replace the stock images.
- [x] Service pages now link to all 34 city pages, grouped by county.
- [x] Meta descriptions clamped to 155 characters sitewide (city pages, blog posts, service and static pages).
- [x] `/quote/quiz` has an H1.
- [x] `/llms.txt` generated from site data (services, cities, guides, contact facts).

### Performance and mobile
- [x] 43 oversized images resized to 2000px and recompressed: 103 MB down to 9.5 MB.
- [x] Homepage and service heroes preload only the image for the current screen size.
- [x] Service and city page hero content renders immediately (no fade-in above the fold); city pages got a photo hero.
- [x] Offers popup now opens only after the visitor scrolls halfway down a page, not on landing.
- [x] Chatbot and popup load after hydration; chat button meets the 48px tap target and sits above the mobile call bar.

## Owner answers (September 16, 2026)
- [x] Owner is **Victor Cataldi**: added to schema (`founder`), the About page and `llms.txt`.
- [x] **1601 Cuba Street, Baltimore** is the correct address. Owner task: update the HFS financing profile, which still says "Elite Finishes Inc. - Sykesville, MD".
- [x] Only the **MHIC 153498** license is valid: WBME 22380085 and "Women's Business Enterprise" removed from the footer, home, about, areas, commercial page, ad pages, quiz and canvasser scripts.
- [x] Business hours and "family owned" confirmed as accurate.
- [ ] Still needed: Google Business Profile link, primary category and review count; active Facebook and Instagram URLs.

## Off-site tasks (owner)
- Verify the site in Google Search Console and Bing Webmaster Tools; submit `https://www.elitefinishesmaryland.com/sitemap.xml`. Bing matters for ChatGPT search.
- Claim or create listings with identical name, address and phone: Yelp, Angi, HomeAdvisor, Houzz, Nextdoor, Thumbtack. Consider BBB accreditation.
- Set up a review request text and email after every finished job (Twilio and Resend are already wired up). Aim for steady new Google reviews.
- List on Sherwin-Williams and Benjamin Moore contractor locators; join a local chamber of commerce.
- Post short before and after project videos on YouTube and embed them on service pages.
- Download the customer photos attached to the Google reviews and send them over for the gallery and service pages.

## Next round in code (after owner answers)
- Author bylines on blog posts (confirm whether Victor reviews them before crediting him).
- Real project gallery (then remove noindex and add an image sitemap).
- New content, needs real pricing input from the owner:
  1. Interior Painting Cost in Baltimore (pricing guide)
  2. Cabinet Painting vs Refacing vs Replacement (cost comparison)
  3. How to Verify an MHIC License Before Hiring a Maryland Contractor
  4. Deck Cost in Maryland
  5. Vinyl vs Fiber Cement Siding in Maryland's Climate
  6. Roof Replacement Cost Guide for Baltimore Homes
  7. Commercial Painting for Baltimore Offices and Retail
  8. Before and after case studies using real job photos
- Replace em/en dashes used as punctuation in visible copy (about 140) per house style.
- Re-run PageSpeed Insights with an API key to get real Core Web Vitals.
- Consider IndexNow for faster Bing pickup and a Content-Security-Policy header (test with ad scripts).
