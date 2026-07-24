"use client";
import { useMemo, useState } from "react";
import type { Person } from "@/lib/content";
import { PersonCard } from "./PersonCard";

export function PeopleExplorer({ people, compact = false }: { people: Person[]; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [identity, setIdentity] = useState("全部");
  const [dynasty, setDynasty] = useState("全部");
  const identities = ["全部", ...Array.from(new Set(people.map(p => p.identity)))];
  const dynasties = ["全部", ...Array.from(new Set(people.map(p => p.dynasty)))];
  const filtered = useMemo(() => people.filter(p => {
    const haystack = [p.name, p.alias, p.dynasty, p.identity, ...p.tags].join(" ").toLowerCase();
    return haystack.includes(query.toLowerCase()) && (identity === "全部" || p.identity === identity) && (dynasty === "全部" || p.dynasty === dynasty);
  }), [people, query, identity, dynasty]);
  return <div className="explorer">
    <div className="search-panel">
      <label className="search-box"><span>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索人物、朝代、身份或标签" aria-label="搜索人物"/><kbd>搜索</kbd></label>
      {!compact && <div className="filters"><div><b>身份</b>{identities.map(x => <button className={identity === x ? "active" : ""} onClick={() => setIdentity(x)} key={x}>{x}</button>)}</div><div><b>朝代</b>{dynasties.map(x => <button className={dynasty === x ? "active" : ""} onClick={() => setDynasty(x)} key={x}>{x}</button>)}</div></div>}
    </div>
    {!compact && <p className="result-count">找到 {filtered.length} 位人物</p>}
    <div className="people-grid">{filtered.slice(0, compact ? 6 : undefined).map((p, i) => <PersonCard key={p.slug} person={p} index={i}/>)}</div>
    {filtered.length === 0 && <div className="empty-state">没有找到匹配的人物，换个关键词试试。</div>}
  </div>;
}

