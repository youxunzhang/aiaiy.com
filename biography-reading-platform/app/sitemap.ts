import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://aiaiy.com", priority: 1, changeFrequency: "weekly" },
  ];
}
