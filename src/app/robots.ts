import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // disallow: ["/api/", "/admission/"],
      },
    ],
    sitemap: `${process.env.NEXT_APP_SITE_URL}/sitemap.xml`,
  };
}
