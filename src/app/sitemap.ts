import type { MetadataRoute } from "next";
import { PRIMARY_SERVICES, CITY_DATA, SITE } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-data";

/**
 * Only indexable, content pages belong here. Tool pages (/quote/quiz), private
 * areas and ad landing pages are left out on purpose. lastModified is only set
 * where we know the real date (blog posts); a build timestamp would be misleading.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticPaths = [
    "",
    "/services",
    "/areas",
    "/quote",
    "/about",
    "/financing",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];

  return [
    ...staticPaths.map((path) => ({ url: `${baseUrl}${path}` })),
    ...PRIMARY_SERVICES.map((service) => ({ url: `${baseUrl}/services/${service.slug}` })),
    ...CITY_DATA.map((city) => ({ url: `${baseUrl}/areas/${city.slug}` })),
    ...BLOG_POSTS.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
