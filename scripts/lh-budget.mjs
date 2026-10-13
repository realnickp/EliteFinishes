// Runs Lighthouse (mobile) 3 times per URL against a running server and fails
// when the median score is under 95 or the median LCP is over 2500 ms.
// Usage: node scripts/lh-budget.mjs [baseUrl]   (default http://localhost:3456)
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const base = process.argv[2] || "http://localhost:3456";
const urls = ["/lp/painting/near-me", "/lp/painting/interior", "/lp/painting/cabinets"];
const dir = mkdtempSync(path.join(tmpdir(), "lh-"));
const median = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];
let failed = false;

for (const u of urls) {
  const scores = [];
  const lcps = [];
  for (let i = 0; i < 3; i++) {
    const out = path.join(dir, `r${i}.json`);
    execFileSync(
      "npx",
      ["-y", "lighthouse@12", base + u, "--only-categories=performance", "--output=json", `--output-path=${out}`, "--chrome-flags=--headless=new", "--quiet"],
      { stdio: "ignore", shell: true },
    );
    const r = JSON.parse(readFileSync(out, "utf8"));
    scores.push(Math.round(r.categories.performance.score * 100));
    lcps.push(Math.round(r.audits["largest-contentful-paint"].numericValue));
  }
  const s = median(scores);
  const l = median(lcps);
  const ok = s >= 95 && l <= 2500;
  failed ||= !ok;
  console.log(`${ok ? "PASS" : "FAIL"} ${u} score ${s} (${scores}) LCP ${l} ms (${lcps})`);
}
process.exit(failed ? 1 : 0);
