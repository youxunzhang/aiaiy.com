import type { Metadata } from "next";
import Link from "next/link";
import { DirectoryFooter, DirectoryHeader } from "@/components/DirectoryShell";
import { aiTools } from "@/lib/ai-tools";
import { categoryDetails, getToolsByCategory } from "@/lib/ai-directory";

export const metadata: Metadata = {
  title: "AI工具分类大全｜按场景发现好用的AI工具",
  description: "按AI助手、AI写作、AI编程、AI绘画、AI视频、AI搜索、AI智能体和国学阅读等真实使用场景浏览103个精选网站。",
  alternates: { canonical: "/categories/" },
};

export default function CategoriesPage() {
  return (
    <div className="directory-page">
      <DirectoryHeader />
      <main className="editorial-page">
        <div className="breadcrumbs"><Link href="/">首页</Link><span>/</span>AI 工具分类</div>
        <header className="editorial-heading"><span>11 CATEGORIES · {aiTools.length} LINKS</span><h1>按使用场景发现优质网站</h1><p>从要完成的任务出发，找到更适合你的工具和资源。每个分类都经过人工整理，并提供独立专题页。</p></header>
        <div className="category-index">
          {Object.entries(categoryDetails).map(([category, detail], index) => {
            const tools = getToolsByCategory(category as keyof typeof categoryDetails);
            return <Link href={`/category/${detail.slug}/`} className="category-index-card" key={detail.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{detail.label}</h2><p>{detail.description}</p><small>{tools.length} 个工具 · {tools.slice(0, 3).map((tool) => tool.name).join("、")}</small></div><b>↗</b></Link>;
          })}
        </div>
      </main>
      <DirectoryFooter />
    </div>
  );
}
