import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaiy.com"),
  title: { default: "ReadTao — Ancient Taoist Wisdom for Modern Life", template: "%s | ReadTao" },
  description: "Read the Tao Te Ching in Chinese and English, find daily wisdom, and explore practical guidance for calm, balance, and modern life.",
  keywords: ["Tao Te Ching", "Lao Tzu", "Daily Tao", "Taoism", "道德经", "Chinese philosophy"],
  openGraph: {
    title: "ReadTao — Ancient Taoist Wisdom for Modern Life",
    description: "Find calm in the wisdom of Tao.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-readtao.png", width: 1536, height: 1024, alt: "ReadTao — Find calm in the wisdom of Tao" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReadTao — Ancient Taoist Wisdom for Modern Life",
    description: "Find calm in the wisdom of Tao.",
    images: ["/og-readtao.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
