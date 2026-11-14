import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DirectoryFooter, DirectoryHeader } from "@/components/DirectoryShell";
import { ToolCard } from "@/components/ToolCard";
import { categoryDetails, getCategoryBySlug, getToolsByCategory, getToolSlug } from "@/lib/ai-directory";

export function generateStaticParams() { return Object.values(categoryDetails).map((detail) => ({ slug: detail.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCategoryBySlug(slug);
  if (!entry) return {};
  const [, detail] = entry;
  return {
    title: `${detail.label}工具推荐｜好用的${detail.keywords[0]}大全`,
    description: detail.description,
    keywords: [...detail.keywords],
    alternates: { canonical: `/category/${detail.slug}/` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCategoryBySlug(slug);
  if (!entry) notFound();
  const [category, detail] = entry;
  const tools = getToolsByCategory(category);
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", name: `${detail.label}工具推荐`, description: detail.description, url: `https://aiaiy.com/category/${slug}/`, mainEntity: { "@type": "ItemList", numberOfItems: tools.length, itemListElement: tools.map((tool, index) => ({ "@type": "ListItem", position: index + 1, name: tool.name, url: `https://aiaiy.com/tool/${getToolSlug(tool)}/` })) } };
  return (
    <div className="directory-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <DirectoryHeader />
      <main className="editorial-page">
        <div className="breadcrumbs"><Link href="/">首页</Link><span>/</span><Link href="/categories/">分类</Link><span>/</span>{detail.label}</div>
        <header className="editorial-heading"><span>{tools.length} CURATED TOOLS</span><h1>{detail.label}工具推荐</h1><p>{detail.description}</p><div className="keyword-row">{detail.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></header>
        <div className="tool-grid category-tool-grid">{tools.map((tool, index) => <ToolCard key={tool.url} tool={tool} number={index + 1} />)}</div>
      </main>
      <DirectoryFooter />
    </div>
  );
}
