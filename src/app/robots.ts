import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: "https://prashantguragain.vercel.app/sitemap.xml",
    host: "https://prashantguragain.vercel.app",
  };
}
