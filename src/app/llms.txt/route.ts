import { SITE, PRIMARY_SERVICES, CITY_DATA } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

/**
 * /llms.txt: a plain text guide for AI answer engines. Generated from site data
 * so it never drifts from the real pages. Verifiable facts only.
 */
export function GET() {
  const counties = ["Baltimore City", "Baltimore County", "Anne Arundel County", "Howard County"];

  const body = `# ${SITE.name}

> ${SITE.name} is a licensed painting and home remodeling contractor based in Baltimore, Maryland (Maryland Home Improvement Commission license ${SITE.license}). Free on-site estimates.

- Owner: ${SITE.owner} (family owned)
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Address: ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.stateCode} ${SITE.address.zip}
- Website: ${SITE.url}
- Hours: Monday to Friday 7am to 6pm, Saturday 8am to 4pm
- Service area: ${counties.join(", ")}, Maryland

## Services

${PRIMARY_SERVICES.map((s) => `- [${s.title}](${SITE.url}/services/${s.slug}): ${s.shortDesc}`).join("\n")}

## Communities Served

${CITY_DATA.map((c) => `- [${c.name}, MD](${SITE.url}/areas/${c.slug}) (${c.county})`).join("\n")}

## Guides

${BLOG_POSTS.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug})`).join("\n")}

## Key Pages

- [Free estimate](${SITE.url}/quote)
- [Financing](${SITE.url}/financing)
- [About](${SITE.url}/about)
- [Contact](${SITE.url}/contact)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
