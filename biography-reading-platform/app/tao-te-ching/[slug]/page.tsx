import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterTools } from "@/components/ChapterTools";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { chapters, getChapter } from "@/lib/tao";

function numberFromSlug(slug: string) {
  const match = /^chapter-(\d+)$/.exec(slug);
  return match ? Number(match[1]) : 0;
}

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: `chapter-${chapter.number}` }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(numberFromSlug(slug));
  if (!chapter) return {};
  return { title: `Tao Te Ching Chapter ${chapter.number}`, description: `${chapter.opening} Read Chapter ${chapter.number} in Chinese and English with a modern reflection and daily practice.`, alternates: { canonical: `/tao-te-ching/${slug}` } };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(numberFromSlug(slug));
  if (!chapter) notFound();
  const previous = chapter.number > 1 ? chapter.number - 1 : null;
  const next = chapter.number < 81 ? chapter.number + 1 : null;
  const related = [chapter.number + 8, chapter.number + 16, chapter.number + 24].map((number) => ((number - 1) % 81) + 1);

  return <><SiteHeader/><main className="chapter-page"><div className="chapter-breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#chapters">81 Chapters</Link><span>/</span>Chapter {chapter.number}</div><header className="chapter-hero"><p>TAO TE CHING · 道德经</p><h1>Chapter {String(chapter.number).padStart(2, "0")}</h1><div className="chapter-themes">{chapter.themes.map((theme) => <span key={theme}>{theme}</span>)}</div></header><div className="chapter-reading"><article><section className="original-text"><small>ORIGINAL · 原文</small><p>{chapter.opening}</p><ChapterTools chinese={chapter.opening} english={chapter.english}/></section><section><small>ENGLISH INTERPRETATION</small><p className="english-reading">{chapter.english}</p></section><section><small>TAO IN MODERN LIFE</small><h2>Let the chapter meet your life.</h2><p>{chapter.insight}</p></section><div className="practice-grid"><section><small>TODAY&apos;S PRACTICE</small><p>{chapter.practice}</p></section><section><small>REFLECT</small><p>{chapter.reflection}</p></section></div></article><aside><div className="aside-card"><small>READING PATH</small><b>{chapter.number} of 81</b><div className="progress"><span style={{width:`${chapter.number / 81 * 100}%`}}/></div></div><div className="aside-card"><small>RELATED CHAPTERS</small>{related.map((number) => <Link href={`/tao-te-ching/chapter-${number}`} key={number}>Chapter {String(number).padStart(2, "0")} <span>→</span></Link>)}</div></aside></div><nav className="chapter-nav">{previous ? <Link href={`/tao-te-ching/chapter-${previous}`}>← Chapter {previous}</Link> : <span/>}{next ? <Link href={`/tao-te-ching/chapter-${next}`}>Chapter {next} →</Link> : <Link href="/">Return home →</Link>}</nav></main><SiteFooter/></>;
}
