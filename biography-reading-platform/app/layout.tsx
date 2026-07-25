import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: { default: "人物志｜先认识一个人，再读懂一个时代", template: "%s｜人物志" },
  description: "从帝王、改革家到诗人与思想家，直接浏览中国历史人物的生平、成就与关键时间线。",
  keywords: ["历史朝代", "历史人物", "人物关系", "人物传记", "中国历史"],
  openGraph: { title: "人物志｜先认识一个人，再读懂一个时代", description: "打开首页，直接遇见改变时代的人。", type: "website", locale: "zh_CN", images: [{ url: "/og-people.png", width: 1536, height: 1024, alt: "人物志：中国历史人物阅读平台" }] },
  twitter: { card: "summary_large_image", title: "人物志｜先认识一个人，再读懂一个时代", description: "打开首页，直接遇见改变时代的人。", images: ["/og-people.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
