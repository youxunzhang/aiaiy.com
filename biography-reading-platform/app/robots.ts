import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/", "/categories/", "/category/", "/tool/"], disallow: ["/go/", "/people/", "/books/", "/topics/", "/tao-te-ching/"] },
    sitemap: "https://aiaiy.com/sitemap.xml",
    host: "https://aiaiy.com",
  };
}
