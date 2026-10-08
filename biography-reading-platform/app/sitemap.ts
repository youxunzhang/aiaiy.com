import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://aiaiy.com/", lastModified: new Date("2026-10-08"), priority: 1, changeFrequency: "weekly" },
  ];
}
