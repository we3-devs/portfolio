import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: "https://prashantaguragain.com.np/sitemap.xml",
    host: "https://prashantaguragain.com.np",
  };
}
