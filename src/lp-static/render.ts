import type { LandingConfig } from "@/lib/lp-landing";
import { GOOGLE_REVIEWS } from "@/lib/constants";
import { AD_TRACKING, SITE } from "@/lib/site-config";
import { esc } from "./escape";
import { nextImageUrl, srcSet } from "./images";
import { LP_CSS } from "./styles";
import { buildClientScript } from "./client-script";

// Plain HTML version of the conversion one pager (ConversionLanding.tsx), served
// without React so the ad page loads fast. Copy is ported from that component.

const MHIC_LOOKUP_URL =
  "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect";

const STEPS = [
  ["Tell us about your project", "Answer a few quick questions, or just call or text us."],
  ["Get a free on-site estimate", "We come out, walk through the project with you and give you a clear written quote."],
  ["We get to work", "Our crew shows up on time, does the job right and leaves your home clean."],
] as const;

function lazyImg(src: string, alt: string, widths: number[], sizes: string, w: number, h: number, cls = ""): string {
  return `<img${cls ? ` class="${cls}"` : ""} src="${nextImageUrl(src, widths[widths.length - 1])}" srcset="${srcSet(src, widths)}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
}

function callLink(cls: string, label: string, placement: string): string {
  return `<a${cls ? ` class="${cls}"` : ""} href="${SITE.phoneTel}" data-contact="call" data-placement="${placement}">${esc(label)}</a>`;
}

function textLink(cls: string, label: string, smsBody: string, placement: string): string {
  return `<a class="${cls}" href="${SITE.phoneSms}?&amp;body=${encodeURIComponent(smsBody)}" data-contact="text" data-placement="${placement}">${esc(label)}</a>`;
}

function field(id: string, name: string, label: string, attrs: string): string {
  return `<div><label for="${id}">${label}</label><input id="${id}" name="${name}" ${attrs}></div>`;
}

/** Tap-through Project Builder: the first question shows, the script reveals the rest. */
function builder(config: LandingConfig): string {
  const { questions, title } = config.builder;
  const firstSteps = questions.filter((q) => !q.showIf).length + 1;
  const sets = questions
    .map((q, i) => {
      const showIf = q.showIf ? ` data-showif="${esc(JSON.stringify(q.showIf))}"` : "";
      const foot =
        i === 0
          ? `<span>Takes about 60 seconds</span>`
          : `<button type="button" class="back" data-back>&larr; Back</button>`;
      return `<fieldset data-q="${q.id}" data-question="${esc(q.question)}"${showIf}${i === 0 ? "" : " hidden"}><legend>${esc(q.question)}</legend>
<div class="opts">${q.options.map((o) => `<button type="button" class="opt" aria-pressed="false" data-a="${esc(o.label)}">${esc(o.label)}</button>`).join("")}</div>
<div class="pb-foot">${foot}<span>Free &middot; No obligation</span></div></fieldset>`;
    })
    .join("");

  return `<div id="estimate" class="card"><div class="pb-head"><div><p class="pb-title">${esc(title)}</p><p class="pb-step" id="pb-step">Step 1 of ${firstSteps}</p></div>
<div class="prog"><i id="pb-bar" style="width:${(100 / firstSteps).toFixed(1)}%"></i></div></div>
<div class="pb-body">${sets}
<form id="estimate-form" novalidate hidden><input class="hp" type="text" name="website_url" tabindex="-1" autocomplete="off" aria-hidden="true">
<h2>Last step: who should we call about your free estimate?</h2><p class="muted" style="margin:.4rem 0 0;font-size:.875rem">We&#39;ll reach out within one business day to set up a time that works for you.</p>
${field("pb-name", "name", "Your name", 'autocomplete="name" placeholder="First and last name"')}
${field("pb-phone", "phone", "Phone", 'type="tel" inputmode="tel" autocomplete="tel" placeholder="(443) 555-0123"')}
<div class="row2">${field("pb-zip", "zip", "Zip code", 'inputmode="numeric" autocomplete="postal-code" maxlength="10" placeholder="21230"')}${field("pb-city", "city", "City", 'autocomplete="address-level2" placeholder="Baltimore"')}</div>
${field("pb-email", "email", "Email", 'type="email" autocomplete="email" placeholder="you@email.com"')}
<p class="err" id="pb-err" role="alert"></p>
<button class="btn btn-green" type="submit" style="margin-top:1.25rem">Get my free estimate</button>
<div class="pb-foot"><button type="button" class="back" data-back>&larr; Back</button><span>Private. No spam, ever.</span></div></form></div></div>`;
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
          `<figure><blockquote style="margin:0">&ldquo;${esc(r.text)}&rdquo;</blockquote><figcaption><b>${esc(r.name)}</b><br><span class="muted">${esc(r.project)} &middot; Posted on Google</span></figcaption></figure>`,
      ).join("")}</div></section>`
    : "";

  const photos = config.workPhotos
    .slice(0, 6)
    .map(
      (p) =>
        `<figure>${lazyImg(p.src, p.alt, [384, 640], "(min-width:768px) 33vw, 50vw", 640, 480)}<figcaption>${esc(p.caption)}</figcaption></figure>`,
    )
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
<header class="top"><div class="wrap"><a href="/"><img src="${nextImageUrl("/images/logo.png", 128)}" width="106" height="110" alt="${esc(SITE.name)}"></a>
${callLink("btn btn-dark", `Call ${SITE.phone}`, "header")}</div></header>
<section class="hero"><div class="hero-img"><img src="${nextImageUrl(hero, 1080)}" srcset="${srcSet(hero, heroWidths)}" sizes="100vw" width="1200" height="750" alt="" fetchpriority="high" decoding="async"></div>
<div class="hero-grid"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(headline)}</h1><p class="sub">${esc(config.subheadline)}</p>
<ul class="ticks">${config.heroBullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
<div class="cta-row">${callLink("btn btn-dark", "Call now", "hero")}${textLink("btn btn-light", "Text us", config.smsBody, "hero")}</div></div>
${builder(config)}</div></section>
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
<section class="sec"><div class="wrap">${lazyImg(config.whyImage, "", [640, 828], "(min-width:1024px) 460px, 100vw", 828, 518, "why-img")}
<h2 style="margin-top:2rem">${esc(config.why.heading)}</h2><dl class="why">${config.why.items.map((i) => `<div><dt>${esc(i.title)}</dt><dd>${esc(i.text)}</dd></div>`).join("")}</dl></div></section>
<section class="sec tint"><div class="wrap"><h2>Getting started is easy</h2><ol class="steps">${STEPS.map(
    ([t, d], i) => `<li><span class="n" aria-hidden="true">${i + 1}</span><h3>${t}</h3><p class="muted">${d}</p></li>`,
  ).join("")}</ol></div></section>
<section class="sec"><div class="wrap"><h2>Questions homeowners ask</h2>${config.faq.map((f) => `<details><summary>${esc(f.question)}</summary><p class="muted">${esc(f.answer)}</p></details>`).join("")}</div></section>
<section class="sec tint"><div class="wrap" style="text-align:center"><h2>Ready for a free estimate?</h2><p class="muted">Answer a few quick questions, or call or text. We reply within 1 business day.</p>
<div class="cta-row" style="justify-content:center"><a class="btn btn-dark" href="#estimate">Start my free estimate</a>${callLink("btn btn-light", `Call ${SITE.phone}`, "final")}</div></div></section>
<footer><p style="font-size:.875rem;font-weight:700;color:var(--fg)">${esc(SITE.name)}</p><p>${esc(address.street)}, ${esc(address.city)}, ${address.stateCode} ${address.zip}</p>
<p>Licensed and insured, ${esc(SITE.license)}</p><p>${callLink("", SITE.phone, "footer")} | <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p>
<p class="links"><a href="/">Main website</a><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms</a></p></footer>
<nav class="sticky" aria-label="Quick actions">${callLink("btn btn-dark", "Call", "sticky")}${textLink("btn btn-light", "Text", config.smsBody, "sticky")}<a class="btn btn-green" href="#estimate" style="min-height:46px">Free estimate</a></nav>
<script>${script}</script></body></html>`;
}
