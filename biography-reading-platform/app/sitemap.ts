import type { MetadataRoute } from "next";
import { aiTools } from "@/lib/ai-tools";
import { categoryDetails, getToolSlug } from "@/lib/ai-directory";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-15");
  return [
    { url: "https://aiaiy.com/", lastModified, priority: 1, changeFrequency: "daily" },
    { url: "https://aiaiy.com/categories/", lastModified, priority: 0.9, changeFrequency: "weekly" },
    ...Object.values(categoryDetails).map((detail) => ({ url: `https://aiaiy.com/category/${detail.slug}/`, lastModified, priority: 0.85, changeFrequency: "weekly" as const })),
    ...aiTools.map((tool) => ({ url: `https://aiaiy.com/tool/${getToolSlug(tool)}/`, lastModified, priority: "featured" in tool && tool.featured ? 0.8 : 0.7, changeFrequency: "monthly" as const })),
  ];
}
