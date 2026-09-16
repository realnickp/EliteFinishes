import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block clickjacking — allow framing only from same origin
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Enforce HTTPS for 2 years (only sent over HTTPS)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Control referrer information
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  // Legacy XSS filter (belt-and-suspenders)
  { key: "X-XSS-Protection", value: "1; mode=block" },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: ".",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/login", permanent: false },
      { source: "/admin/:path*", destination: "/dashboard/:path*", permanent: false },
      { source: "/signin", destination: "/login", permanent: false },
      // Testimonials page removed (it held placeholder reviews); real reviews live on the homepage
      { source: "/testimonials", destination: "/", permanent: true },
      // Retired service pages from the previous business on this domain
      ...[
        "fencing",
        "hardscaping",
        "stamped-concrete",
        "driveway-installation",
        "gravel-pads-and-concrete-foundations",
        "accessory-dwelling-units",
        "excavation-and-demolition",
      ].map((slug) => ({ source: `/services/${slug}`, destination: "/services", permanent: true })),
      // Interior and exterior painting ads now share one landing page (query strings carry over)
      { source: "/lp/interior-painting/:path*", destination: "/lp/painting", permanent: false },
      { source: "/lp/exterior-painting/:path*", destination: "/lp/painting", permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
