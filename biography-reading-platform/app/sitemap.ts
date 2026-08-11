import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aiaiy.com";
  return [
    { url: base, priority: 1, changeFrequency: "daily" },
    ...Array.from({ length: 81 }, (_, index) => ({
      url: `${base}/tao-te-ching/chapter-${index + 1}`,
      priority: .8,
      changeFrequency: "monthly" as const,
    })),
  ];
}
