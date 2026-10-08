import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AIAIY AI工具导航",
    short_name: "AIAIY",
    description: "精选100个主流AI工具，按使用场景分类整理。",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f5ef",
    theme_color: "#173f2d",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
