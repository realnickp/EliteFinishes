# Bot Spam Prevention — Design Spec

**Date:** 2026-03-18
**Goal:** Stop bot form fills from creating fake leads in Supabase.
**Approach:** Four layered server-side defenses with matching client-side changes. No external dependencies, no user-visible friction.

---

## 1. Honeypot Field

**Concept:** Add a hidden `website_url` field to every lead form. CSS-hidden (not `display:none` — bots detect that). Real users never see it. Bots auto-fill all fields, so any submission with a value in `website_url` is silently rejected (returns 200 to avoid tipping off the bot).

> Field is named `website_url` instead of `company` to avoid browser autofill populating it for real users.

### Client-side (all 4 form components)
- Add an `<input name="website_url" />` field
- Style with `position: absolute; left: -9999px; tabIndex: -1; autoComplete: "off"`
- `aria-hidden="true"` so screen readers skip it
- Include value in POST body

### Server-side (`/api/leads/route.ts`)
- Check `body.website_url` — if truthy, return `200 { success: true }` (silent rejection)
- **Log the rejection** with reason, IP, and timestamp (mandatory for all silent rejections)

---

## 2. Time-Based Token (HMAC-Signed)

**Concept:** Embed a form-render timestamp, signed with a server secret so bots can't forge it. Reject submissions faster than 3 seconds or older than 30 minutes.

### Server secret
- Use an env var `FORM_TOKEN_SECRET` (generate a random string, add to Vercel env vars)
- Fallback: if not set, use a hash of `SUPABASE_URL` + `SUPABASE_ANON_KEY` as a deterministic secret (so it works immediately without adding an env var, but can be upgraded)

### Client-side
- On form mount, call a lightweight endpoint or compute token client-side:
  - Actually: generate the token **server-side** via a tiny API route `/api/form-token` that returns `{ token: "${timestamp}.${hmac(timestamp, secret)}" }`
  - Store in hidden field `_t`
  - Send `_t` with form submission

### Server-side (`/api/leads/route.ts`)
- Split `_t` on `.` → `[timestamp, signature]`
- Recompute HMAC from timestamp portion, compare with signature (constant-time)
- Reject if: signature invalid, timestamp < 3s ago, or timestamp > 30 minutes ago
- Return `200 { success: true }` (silent rejection)
- **Log the rejection** with reason, IP, and timestamp

### New file
- `src/app/api/form-token/route.ts` — GET endpoint, returns signed timestamp token

---

## 3. IP-Based Rate Limiting (Supabase Query)

**Concept:** Track submissions per IP. Max 5 per hour. Uses a Supabase query against the leads table (not in-memory, since serverless isolates don't share state).

### Schema change
- Add `ip` column to `leads` table (nullable text, no index needed at current scale)
- Store the submitter's IP on every lead insert

### Implementation (`/api/leads/route.ts`)
- Read IP from `x-forwarded-for` header (Vercel provides this)
- Query: `SELECT COUNT(*) FROM leads WHERE ip = $1 AND created_at > NOW() - INTERVAL '1 hour'`
- If count >= 5, return `429 { error: "Too many requests. Please try again later." }`

### Edge cases
- Shared IPs (offices, mobile carriers): 5/hour is generous enough for a local contractor site
- IP is stored for rate limiting only — could add a privacy note if needed

---

## 4. Duplicate Detection (Normalized Phone)

**Concept:** Before inserting, check if the same phone number submitted a lead in the last 24 hours. Normalize phone numbers before comparison to catch formatting variations.

### Phone normalization
- Strip all non-digit characters
- If result starts with "1" and has 11 digits, strip the leading "1" (US country code)
- Compare normalized values

### Implementation (`/api/leads/route.ts`)
- After validation passes, normalize the submitted phone
- Query: `SELECT id FROM leads WHERE regexp_replace(phone, '[^0-9]', '', 'g') = $1 AND created_at > NOW() - INTERVAL '24 hours' LIMIT 1`
- If found, return `200 { success: true, message: "We already have your request and will be in touch soon!" }`
- This also helps with legitimate duplicate submissions (user hitting submit twice)

---

## Existing reCAPTCHA Integration

The current codebase has optional reCAPTCHA verification (enabled when `RECAPTCHA_SECRET_KEY` env var is set). **This stays as-is.** It runs after the new checks in the processing order. No changes needed to the reCAPTCHA code.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/api/leads/route.ts` | Add honeypot check, timing validation, rate limiter (Supabase query), duplicate detection, store IP |
| `src/app/api/form-token/route.ts` | **New file** — GET endpoint returning HMAC-signed timestamp token |
| `src/components/shared/LeadForm.tsx` | Add honeypot field + fetch timing token on mount |
| `src/components/shared/LpLeadForm.tsx` | Same |
| `src/components/shared/EstimateQuiz.tsx` | Same (contact step) |
| `src/components/shared/Chatbot.tsx` | Same (pre-chat form) |

**One new file (`form-token` route). No new dependencies. No user-visible changes.**

**Schema change:** Add nullable `ip` text column to `leads` table in Supabase.

---

## Request Processing Order

```
POST /api/leads
  1. Honeypot check → silent reject if filled (log rejection)
  2. Timing token check → silent reject if invalid/too fast/too old (log rejection)
  3. Rate limit check (Supabase query by IP) → 429 if >= 5/hour
  4. Existing validation (field lengths, required fields)
  5. Existing reCAPTCHA check (if enabled)
  6. Duplicate detection (normalized phone, 24h window) → friendly message
  7. Insert lead with IP stored (existing logic)
```

Spam checks go first so we reject bots before doing any real work.

---

## Logging

All silent rejections MUST be logged with:
- Rejection reason (honeypot, timing, rate limit)
- IP address
- Timestamp
- Submitted name/phone (for debugging false positives)

Use `console.warn()` — these will appear in Vercel function logs.

---

## Testing

- Manual: submit form normally → should work
- Honeypot: submit with `website_url` field filled → silent reject
- Timing: submit via curl with no token → silent reject
- Timing: submit via curl with forged token → silent reject
- Rate limit: submit 6 times from same IP → 429 on 6th
- Duplicate: submit same phone twice within 24h → friendly duplicate message
- Duplicate: submit same phone with different formatting → still caught
