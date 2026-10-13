import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Section } from "./Section";

const COST_GUIDES = [
  "cost-to-paint-a-house-baltimore",
  "bathroom-remodel-cost-baltimore",
  "kitchen-remodel-cost-baltimore",
  "cheaper-quote-cost-more-choosing-contractor-baltimore",
];

/** Blog links for service and area pages: posts about this service first, then the cost guides. */
export function RelatedGuides({ serviceSlug, heading = "Advice from Victor" }: { serviceSlug?: string; heading?: string }) {
  const matching = serviceSlug ? BLOG_POSTS.filter((p) => p.relatedServiceSlug === serviceSlug) : [];
  const fill = COST_GUIDES.map((slug) => BLOG_POSTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof BLOG_POSTS)[number] => Boolean(p)
  );
  const posts = [...matching, ...fill].filter((p, i, all) => all.findIndex((x) => x.slug === p.slug) === i).slice(0, 4);
  if (!posts.length) return null;

  return (
    <Section>
      <h2 className="text-2xl font-display mb-6">{heading}</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block h-full rounded-xl border border-border/40 bg-white p-5 transition-all hover:border-brand hover:shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">{p.category}</span>
              <span className="mt-1 block font-semibold leading-snug">{p.title}</span>
              <span className="mt-2 block text-sm text-muted-foreground line-clamp-2">{p.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
