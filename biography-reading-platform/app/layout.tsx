import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: { default: "AI工具导航｜100个主流AI网站大全 - AIAIY", template: "%s｜AIAIY" },
  description: "AIAIY 精选100个主流AI工具，覆盖ChatGPT、DeepSeek、AI写作、AI绘画、AI视频、AI编程、PPT和智能体，支持中文搜索与分类浏览。",
  keywords: ["AI工具", "AI工具导航", "AI网站大全", "AI导航", "ChatGPT", "DeepSeek", "AI写作", "AI绘画", "AI视频", "AI编程", "人工智能工具"],
  authors: [{ name: "AIAIY", url: "https://aiaiy.com" }],
  creator: "AIAIY",
  publisher: "AIAIY",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  category: "technology",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AI工具导航｜100个主流AI网站大全 - AIAIY",
    description: "精选100个主流AI工具，按对话、搜索、写作、编程、图像、视频、音频与智能体分类整理。",
    url: "/",
    siteName: "AIAIY AI工具导航",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "AIAIY - 100个主流AI工具导航" }],
  },
  twitter: { card: "summary_large_image", title: "AI工具导航｜100个主流AI网站大全", description: "精选100个主流AI工具，一个页面快速找到你的下一款生产力工具。", images: ["/og.png"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#f3f5ef", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
