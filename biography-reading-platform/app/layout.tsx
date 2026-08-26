import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: "AIAIY — 实用 AI 工具黄页导航",
  description: "发现真正实用的 AI 网站与工具，覆盖 AI 对话、内容检测、写作辅助、文字转语音等场景。",
  keywords: ["AI工具", "AI导航", "ChatGPT", "AI检测", "文字转语音", "AI黄页"],
  openGraph: { title: "AIAIY — 实用 AI 工具黄页导航", description: "少一点寻找，多一点创造。发现真正实用的 AI 工具。", type: "website", locale: "zh_CN", images: [{ url: "/og.png", width: 1536, height: 1024, alt: "AIAIY AI 工具黄页导航" }] },
  twitter: { card: "summary_large_image", title: "AIAIY — 实用 AI 工具黄页导航", description: "少一点寻找，多一点创造。", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
