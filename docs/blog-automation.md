# Elite Finishes blog routine

A scheduled cloud agent publishes one post every **Tuesday and Friday**. This file is its rulebook and topic queue. Humans can edit the queue anytime: reorder topics, add new ones, or add notes.

## What the routine does each run

1. Pick the **first unchecked topic** in the queue below whose "Needs" are met (see Prices). Skip any topic whose core answer needs a dollar figure that is not in the price sources. Leave it unchecked and add a short note after it, e.g. `(skipped 2026-10-16: needs Victor's deck staining prices)`.
2. Write the post and add it to the **top** of the `AUTO_POSTS` array in `src/lib/blog-posts-auto.ts`. Use the `BlogPost` shape from `src/lib/blog-data.ts`.
3. Tick the topic in this file: `- [x]` plus the slug and date.
4. Run `npm ci`, `npm test` and `npm run build`. All must pass. If anything fails, fix the post. Never weaken or delete a test to make it pass.
5. Commit with `feat(blog): <title>` and push to `main`. Vercel deploys it automatically.
6. If no topic can be written, change nothing except the skip notes. Commit those and stop.

## Voice: Victor Cataldi, owner

- First person, as Victor. He's Italian, family oriented, serious, no fluff. He cares about customers and how the job feels to them: protecting the home, cleaning up, telling the truth about price.
- Give real value: straight answers, what drives cost, what to watch out for, what he would do. No hype words ("premier", "top-notch", "unparalleled", "elevate"). No emoji. Keep em dashes rare. Short paragraphs.
- Write for Baltimore homeowners. Mention local housing (rowhouses, plaster walls, pre-1978 homes, colonials and split-levels in the county) where it's relevant.
- 900 to 1,400 words. Use `##` section headings. Use a `| table |` when comparing options or prices.
- Do not invent stories, customers, jobs, reviews, statistics, awards, warranties or years in business. The only true story we may use is in `src/lib/blog-posts-2026-10.ts`, in the first post (the cheaper quote that cost $3,000 more). Retell it briefly only where it fits, and link to that post. **Never name the business or the other contractor from that story.**
- Facts we can state: MHIC 153498; licensed and insured; family owned; Victor comes out for estimates; free written estimates; Benjamin Moore and Sherwin-Williams paints; floors and furniture protected and cleaned up; lead-safe practices on pre-1978 homes; permits handled; phone 443-825-0206; serves Baltimore City, Baltimore County, Anne Arundel County and Howard County. Current offer: 10% off painting and drywall work.

## Prices: only these sources

Use only numbers that already appear in:

- `src/lib/talking-points.ts` and `src/lib/canvasser-training.ts` (the sales sheet)
- the existing posts in `src/lib/blog-data.ts`, `src/lib/blog-posts-2026-10.ts` and `src/lib/blog-posts-auto.ts`
- FAQ answers on `src/app/services/*/page.tsx` (for example, bathroom timing: a full gut takes 2 to 3 weeks once work begins, a refresh takes 3 to 5 days)

Never make up a price, a timeline, or a competitor's price. If the topic needs a number we don't have, skip the topic as described above.

## Links: lots of internal links (the test enforces this)

Every post needs at least 25 internal markdown links, written as `[text](/path)`:

- At least one `/services/<slug>` link. The slugs are the folder names in `src/app/services/`.
- At least 5 `/areas/<slug>` links, woven into the text. The slugs are in `CITY_DATA` in `src/lib/constants.ts`, e.g. towson, catonsville, ellicott-city, columbia, glen-burnie, annapolis, canton, federal-hill, hampden, parkville, dundalk, pikesville.
- At least 3 `/blog/<slug>` links to other posts.
- At least one `[...](/quote)` call to action, plus the phone number.
- End with `## Where we work` (a city list with links), `## Keep reading` (links to 5 to 6 related posts) and an **Our services:** line linking service pages. Copy the pattern from the posts in `src/lib/blog-posts-2026-10.ts`.

Only link to pages that exist. Allowed static paths: `/`, `/quote`, `/contact`, `/areas`, `/services`, `/blog`, `/about`, `/financing`, `/lp/painting/cabinets`.

## Post fields

- `slug`: lowercase-with-dashes, usually ending in `-baltimore`
- `date`: today's date as YYYY-MM-DD
- `image`: a real job photo from `public/images/work/`. Don't use the same image as the newest 3 posts. Never use stock photos.
- `imageAlt`: describe the photo
- `category`: e.g. "Painting", "Bathroom Remodeling", "Kitchen Remodeling", "Hiring a Contractor"
- `relatedService` / `relatedServiceSlug`: the main service page
- `description`: 1 to 2 sentences, under 160 characters, with the main question answered

## Topic queue (buyer intent first)

- [x] **How long does a kitchen remodel take? A week-by-week look.** Covers: how long does a kitchen remodel take (1.3K/mo), what comes first, steps. Needs: timing only as stated in the kitchen cost post (cosmetic refresh 1 to 2 weeks, mid-range several weeks, countertops measured after cabinets). (how-long-does-kitchen-remodel-take-baltimore, 2026-10-13)
- [x] **Painting cabinets vs. replacing them: the smart way to update a Baltimore kitchen.** Covers: cheapest way to remodel a kitchen, remodel on a budget, is $10,000 enough. Needs: kitchen ranges from the sales sheet. Don't give a cabinet-painting-only price. (paint-or-replace-kitchen-cabinets-baltimore, 2026-10-16)
- [x] **How long does a bathroom remodel take, and do you need a permit in Baltimore?** Covers: how long, permits, what comes first, steps. Needs: bathroom timing from the bathroom service page FAQ. (how-long-does-bathroom-remodel-take-permit-baltimore, 2026-10-20)
- [ ] **The cheapest way to modernize a bathroom without a full remodel.** Covers: cheapest way to modernize, save money remodeling. Needs: refresh ranges from `bathroom-remodel-roi-baltimore` and the bathroom cost post.
- [ ] **What your painting quote should include (the prep most painters skip).** Covers: how to prep a house for exterior painting, do you need to power wash before painting, what to do before painting. Needs: painting ranges only if used.
- [ ] **Should you paint before selling your Baltimore home?** Covers: is it worth painting before selling, how important is painting when selling. Needs: painting ranges from the sales sheet.
- [ ] **Painting a brick rowhouse in Baltimore: smart move or mistake?** Covers: is painting a brick house a good idea. Needs: no prices. Note that homes in Baltimore historic districts need approval from the city's historic preservation commission (CHAP) for exterior changes, so tell readers to check with CHAP first. Don't state specific CHAP rules beyond that.
- [ ] **How much does it cost to finish a basement in Baltimore?** Covers: basement finishing cost. Needs: basement ranges in `finishing-basement-baltimore-guide` and the sales sheet.
- [ ] **How much does new flooring cost in a Baltimore home?** Covers: flooring cost, hardwood vs LVP price. Needs: flooring ranges in `hardwood-vs-lvp-flooring-baltimore` and the sales sheet.
- [ ] **Home Depot or Lowe's vs. a local contractor for your kitchen or bathroom.** Covers: Home Depot bathroom price, Home Depot 10x10 kitchen, Lowe's kitchen remodel, which company is best. Needs: no competitor prices at all. Compare on what's included, who installs, permits and who you call. Be factual and fair.
- [ ] **What to ask a contractor before remodeling your bathroom.** Covers: what to ask a contractor, how to choose a bathroom remodeling contractor. Needs: no prices. Link the cheaper-quote story post.
- [ ] **When is the best time to paint your house's exterior in Maryland?** Covers: when painting the exterior of a house. Needs: no prices. Weather and scheduling only (Maryland: generally spring through fall, warm and dry enough to cure).
