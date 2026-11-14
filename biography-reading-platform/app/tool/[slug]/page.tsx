import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DirectoryFooter, DirectoryHeader } from "@/components/DirectoryShell";
import { ToolCard } from "@/components/ToolCard";
import { aiTools } from "@/lib/ai-tools";
import { categoryDetails, getToolBySlug, getToolSlug } from "@/lib/ai-directory";

export function generateStaticParams() { return aiTools.map((tool) => ({ slug: getToolSlug(tool) })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name}官网入口、功能介绍与同类工具推荐`,
    description: `${tool.description} 查看${tool.name}官网入口、核心用途、相关标签与同类AI工具推荐。`,
    keywords: [tool.name, ...tool.tags, tool.category],
    alternates: { canonical: `/tool/${getToolSlug(tool)}/` },
    openGraph: { title: `${tool.name}｜AIAIY AI工具导航`, description: tool.description, type: "website" },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  const category = categoryDetails[tool.category];
  const related = aiTools.filter((item) => item.category === tool.category && item.url !== tool.url).slice(0, 4);
  const hostname = new URL(tool.url).hostname.replace(/^www\./, "");
  const structuredData = { "@context": "https://schema.org", "@type": "WebApplication", name: tool.name, description: tool.description, url: tool.url, applicationCategory: tool.category, inLanguage: ["zh-CN", "en"] };
  return (
    <div className="directory-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <DirectoryHeader />
      <main className="editorial-page">
        <div className="breadcrumbs"><Link href="/">首页</Link><span>/</span><Link href={`/category/${category.slug}/`}>{tool.category}</Link><span>/</span>{tool.name}</div>
        <article className="tool-profile">
          <div className="tool-profile-main"><div className="tool-profile-icon">{tool.short}</div><div className="tool-profile-copy"><span>{tool.category} · {hostname}</span><h1>{tool.name}</h1><p>{tool.description}</p><div className="keyword-row">{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
          <aside><p>访问官方产品页面，了解最新功能、定价与可用地区。</p><a href={tool.url} target="_blank" rel="noopener noreferrer nofollow">打开 {tool.name} <span>↗</span></a><small>外部链接 · 将在新窗口打开</small></aside>
        </article>
        <section className="tool-guide"><div><span>WHAT IT DOES</span><h2>{tool.name} 能做什么？</h2></div><p>{tool.description} 它适合关注“{tool.tags.join("、")}”的用户。产品功能和收费方案可能随时调整，请以官方网站展示为准。</p></section>
        <section className="related-section"><div className="section-heading"><div><span>RELATED TOOLS</span><h2>同类工具推荐</h2></div><a href={`/category/${category.slug}/`}>查看全部 {tool.category}工具 ↗</a></div><div className="tool-grid">{related.map((item) => <ToolCard key={item.url} tool={item} />)}</div></section>
      </main>
      <DirectoryFooter />
    </div>
  );
}
