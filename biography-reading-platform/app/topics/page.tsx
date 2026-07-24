import type {Metadata} from "next";import Link from "next/link";import {SiteHeader} from "@/components/SiteHeader";import {SiteFooter} from "@/components/SiteFooter";import {getTopics} from "@/lib/content";
export const metadata:Metadata={title:"人物专题",description:"沿着主题线索，系统认识一群人与一个时代。"};
export default function Topics(){const topics=getTopics();return <><SiteHeader/><main className="page-shell"><div className="page-hero"><div><p className="eyebrow">EDITORIAL TOPICS</p><h1>人物专题</h1></div><p>不是孤立地记住名字，而是在一组人物之间看见时代的结构。</p></div><div className="topic-grid">{topics.map((t,i)=><Link className={`topic-card topic-${i}`} href={`/topics/${t.slug}`} key={t.slug}><span>{t.eyebrow}</span><h3>{t.title}</h3><p>{t.summary}</p><b>{t.people.length} 位人物 <i>→</i></b></Link>)}</div></main><SiteFooter/></>}

