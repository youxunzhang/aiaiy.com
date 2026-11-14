import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: { default: "AI工具导航｜103个主流AI网站与优质资源 - AIAIY", template: "%s｜AIAIY" },
  description: "AIAIY 超级导航站，汇集搜索与趋势研究、内容发布、海外社交媒体、SEO工具及103个AI工具与优质资源，支持中文搜索、收藏与分类浏览。",
  keywords: ["AI工具", "AI工具导航", "AI网站大全", "AI导航", "搜索引擎", "Google Trends", "内容发布平台", "海外社交媒体", "SEO工具", "ChatGPT", "DeepSeek", "AI编程"],
  authors: [{ name: "AIAIY", url: "https://aiaiy.com" }],
  creator: "AIAIY",
  publisher: "AIAIY",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "technology",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AI工具导航｜103个主流AI网站与优质资源 - AIAIY",
    description: "从搜索研究、内容创作到多平台发布，一页直达常用入口，并精选103个AI工具与优质资源。",
    url: "/",
    siteName: "AIAIY AI工具导航",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "AIAIY - 103个AI工具与优质网站导航" }],
  },
  twitter: { card: "summary_large_image", title: "AI工具导航｜103个主流AI网站与优质资源", description: "搜索、收藏并按场景发现适合你的 AI 工具和优质网站。", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f5ef", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
