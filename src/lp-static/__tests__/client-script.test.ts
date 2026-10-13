// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LANDING_PAGES } from "@/lib/lp-landing";
import { renderLandingHtml } from "@/lp-static/render";
import { buildClientScript } from "@/lp-static/client-script";

const CFG = {
  slug: "painting",
  serviceTitle: "Painting (Interior and Exterior)",
  googleAdsId: "AW-1",
  callLabel: "CALL",
  contactLabel: "",
  metaPixelId: "",
  phone: "443-825-0206",
};

type FetchCall = [string, RequestInit | undefined];
let calls: FetchCall[];
let leadReply: () => Promise<Response>;
let tokenReply: () => Promise<Response>;
const navigate = vi.fn();

const $ = <T extends Element = HTMLElement>(sel: string) => document.querySelector(sel) as unknown as T;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
// Response.json() and chained fetches need a few macrotask turns to settle
const flush = async () => {
  for (let i = 0; i < 10; i++) await wait(0);
};

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
  (window as unknown as { __lpNavigate: typeof navigate }).__lpNavigate = navigate;
  new Function(buildClientScript(CFG))();
}

async function answer(questionId: string, label: string) {
  $(`fieldset[data-q="${questionId}"] [data-a="${label}"]`).click();
  await wait(300);
}

async function reachContactStep() {
  await answer("scope", "Interior");
  await answer("interior_size", "1 or 2 rooms");
  await answer("timeline", "ASAP");
}

function fill(values: Partial<Record<"name" | "phone" | "zip" | "city" | "email", string>> = {}) {
  const v = { name: "Jane Doe", phone: "(443) 555-0123", zip: "21204", city: "Towson", email: "jane@example.com", ...values };
  for (const [k, val] of Object.entries(v)) $<HTMLInputElement>(`#pb-${k}`).value = val;
}

const submit = () => $("#estimate-form").dispatchEvent(new Event("submit", { cancelable: true }));
const leadCalls = () => calls.filter(([u]) => u === "/api/leads");
const leadBody = () => JSON.parse(String(leadCalls()[0][1]!.body));

beforeEach(() => {
  navigate.mockReset();
  tokenReply = () => Promise.resolve(new Response(JSON.stringify({ token: "123.abc" })));
  leadReply = () => Promise.resolve(new Response(JSON.stringify({ success: true })));
});

describe("tracking", () => {
  it("stores UTM and click ids in bb_utm", () => {
    boot("?utm_source=google&utm_medium=cpc&gclid=G1");
    expect(JSON.parse(sessionStorage.getItem("bb_utm")!)).toMatchObject({ utm_source: "google", utm_medium: "cpc", gclid: "G1" });
  });

  it("configures call tracking in the dataLayer before gtag loads", () => {
    boot();
    const dl = (window as unknown as { dataLayer: ArrayLike<unknown>[] }).dataLayer;
    expect(dl.some((a) => Array.from(a)[0] === "config" && String(Array.from(a)[1]).endsWith("/CALL"))).toBe(true);
  });
});

describe("project builder", () => {
  it("follows the showIf rules and updates the step label", async () => {
    boot();
    expect($("#pb-step").textContent).toBe("Step 1 of 3");
    await answer("scope", "Interior");
    expect($('fieldset[data-q="interior_size"]').hidden).toBe(false);
    expect($('fieldset[data-q="scope"]').hidden).toBe(true);
    expect($("#pb-step").textContent).toBe("Step 2 of 4");
    await answer("interior_size", "1 or 2 rooms");
    expect($('fieldset[data-q="timeline"]').hidden).toBe(false);
    expect($('fieldset[data-q="exterior_surface"]').hidden).toBe(true);
  });

  it("goes back a step", async () => {
    boot();
    await answer("scope", "Exterior");
    $('fieldset[data-q="exterior_surface"] [data-back]').click();
    expect($('fieldset[data-q="scope"]').hidden).toBe(false);
    expect($('fieldset[data-q="scope"] [data-a="Exterior"]').getAttribute("aria-pressed")).toBe("true");
  });

  it("shows the contact step after the last question", async () => {
    boot();
    await reachContactStep();
    expect($("#estimate-form").hidden).toBe(false);
    expect($("#pb-step").textContent).toBe("Last step");
  });
});

describe("lead submit", () => {
  it("posts the same body as the React builder and goes to thanks", async () => {
    boot("?gclid=G1");
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect(leadBody()).toMatchObject({
      name: "Jane Doe",
      phone: "(443) 555-0123",
      email: "jane@example.com",
      service: "Painting (Interior and Exterior)",
      cityOrZip: "Towson, MD 21204",
      description: "What do you need painted: Interior | How much of the inside: 1 or 2 rooms | When do you want it done: ASAP",
      timeframe: "ASAP",
      source: "google_ads:lp_builder:painting",
      _t: "123.abc",
      website_url: "",
    });
    expect(leadBody().budget).toBeUndefined();
    expect(JSON.parse(sessionStorage.getItem("ef_lp_pending_conversion")!)).toEqual({
      service: "Painting (Interior and Exterior)",
      method: "builder",
    });
    expect(navigate).toHaveBeenCalledWith("/lp/painting/thanks?name=Jane");
  });

  it("google click id marks the lead as google_ads", async () => {
    boot("?gbraid=B1");
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect(leadBody().source).toBe("google_ads:lp_builder:painting");
  });

  it("does not record a conversion when the server says accepted false", async () => {
    leadReply = () => Promise.resolve(new Response(JSON.stringify({ success: true, accepted: false })));
    boot();
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect(sessionStorage.getItem("ef_lp_pending_conversion")).toBeNull();
    expect(navigate).toHaveBeenCalled();
  });

  it("submits once on double click", async () => {
    boot();
    await flush();
    await reachContactStep();
    fill();
    submit();
    submit();
    await flush();
    expect(leadCalls()).toHaveLength(1);
  });

  it("shows the server error and keeps entries", async () => {
    leadReply = () =>
      Promise.resolve(new Response(JSON.stringify({ error: "Sorry, we only serve the Baltimore area" }), { status: 400 }));
    boot();
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect($("#pb-err").textContent).toContain("only serve the Baltimore area");
    expect($<HTMLInputElement>("#pb-name").value).toBe("Jane Doe");
    expect($<HTMLButtonElement>('#estimate-form button[type="submit"]').disabled).toBe(false);
    expect(navigate).not.toHaveBeenCalled();
  });

  it("network failure shows fallback message", async () => {
    leadReply = () => Promise.reject(new TypeError("Failed to fetch"));
    boot();
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect($("#pb-err").textContent).toContain("call or text");
  });

  it("blocks submit and explains when the email is missing", async () => {
    boot();
    await flush();
    await reachContactStep();
    fill({ email: "" });
    submit();
    await flush();
    expect(leadCalls()).toHaveLength(0);
    expect($("#pb-err").textContent).toContain("email");
  });

  it("fetches a token at submit when none loaded yet", async () => {
    let first = true;
    tokenReply = () => {
      if (first) {
        first = false;
        return Promise.reject(new Error("slow"));
      }
      return Promise.resolve(new Response(JSON.stringify({ token: "9.z" })));
    };
    boot();
    await flush();
    await reachContactStep();
    fill();
    submit();
    await flush();
    expect(leadBody()._t).toBe("9.z");
  });

  it("fills the city from the zip when it is empty", async () => {
    boot();
    await reachContactStep();
    fill({ city: "" });
    $("#pb-zip").dispatchEvent(new Event("blur"));
    await flush();
    expect($<HTMLInputElement>("#pb-city").value).toBe("Towson");
  });
});
