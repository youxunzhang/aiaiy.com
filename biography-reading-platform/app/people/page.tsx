import type { Metadata } from "next";
import { PeopleExplorer } from "@/components/PeopleExplorer";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPeople } from "@/lib/content";
export const metadata: Metadata = { title: "人物库", description: "按身份、朝代与关键词探索人物传记。" };
export default function PeoplePage(){const people=getPeople();return <><SiteHeader/><main className="page-shell"><div className="page-hero"><div><p className="eyebrow">PEOPLE ARCHIVE</p><h1>人物库</h1></div><p>每一份传记，都是理解时代的一把钥匙。按身份、朝代或关键词，找到你想认识的人。</p></div><PeopleExplorer people={people}/></main><SiteFooter/></>}

