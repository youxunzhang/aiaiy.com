import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: { default: "人物志｜从朝代遇见历史人物", template: "%s｜人物志" },
  description: "选择一个朝代，认识这个时代的代表人物，发现你与历史人物之间的相似与联结。",
  keywords: ["历史朝代", "历史人物", "人物关系", "人物传记", "中国历史"],
  openGraph: { title: "人物志｜你想回到哪个朝代？", description: "从朝代进入历史，看见改变时代的人，也发现你与他们之间意外的相似。", type: "website", locale: "zh_CN", images: [{ url: "/og.png", width: 1732, height: 909, alt: "人物志：从朝代遇见历史人物" }] },
  twitter: { card: "summary_large_image", title: "人物志｜从朝代遇见历史人物", description: "先选朝代，再遇见一个人。", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
