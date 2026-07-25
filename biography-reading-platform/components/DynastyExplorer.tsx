"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PersonPreview = {
  slug: string;
  name: string;
  dynasty: string;
  identity: string;
  birth: string;
  death: string;
  summary: string;
  tags: string[];
};

const filters = [
  { id: "all", label: "全部人物" },
  { id: "tang", label: "唐" },
  { id: "qing", label: "清" },
  { id: "pre-qin", label: "先秦" },
  { id: "qin-han", label: "秦汉" },
  { id: "song", label: "宋" },
  { id: "ming", label: "明" },
  { id: "modern", label: "近现代" },
  { id: "today", label: "当代" },
] as const;

const featured = [
  "li-shimin", "kangxi", "wu-zetian", "lin-zexu", "li-bai", "cao-xueqin",
  "li-longji", "wei-zheng", "zeng-guofan", "xuan-zang", "du-fu", "zuo-zongtang",
];

function dynastyGroup(dynasty: string) {
  if (dynasty.includes("春秋") || dynasty.includes("战国")) return "pre-qin";
  if (dynasty.includes("秦") || dynasty.includes("汉")) return "qin-han";
  if (dynasty.includes("唐")) return "tang";
  if (dynasty.includes("宋")) return "song";
  if (dynasty.includes("明")) return "ming";
  if (dynasty.includes("清")) return "qing";
  if (dynasty.includes("近现代") || dynasty.includes("晚清")) return "modern";
  return "today";
}

export function DynastyExplorer({ people }: { people: PersonPreview[] }) {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return [...people]
      .sort((a, b) => {
        const ai = featured.indexOf(a.slug);
        const bi = featured.indexOf(b.slug);
        return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
      })
      .filter((person) => selected === "all" || dynastyGroup(person.dynasty) === selected)
      .filter((person) =>
        !needle || [person.name, person.dynasty, person.identity, ...person.tags].join(" ").toLowerCase().includes(needle),
      );
  }, [people, query, selected]);

  const cards = expanded || query ? visible : visible.slice(0, 12);

  return (
    <div className="people-first">
      <section className="people-first-intro">
        <div className="people-first-title">
          <p className="eyebrow">CHINESE LIVES · 中国人物志</p>
          <h1>先认识一个人，<br /><em>再读懂一个时代。</em></h1>
          <p>从帝王、改革家到诗人与思想家。每张卡片都是一段生平的入口，也是一扇通往时代的门。</p>
        </div>
        <div className="archive-count" aria-label={`已收录 ${people.length} 位人物`}>
          <span>{String(people.length).padStart(2, "0")}</span>
          <p>位人物<br />持续收录</p>
        </div>
      </section>

      <section className="people-tools" aria-label="人物筛选">
        <label className="people-search">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索姓名、朝代、身份或标签"
            aria-label="搜索人物"
          />
        </label>
        <div className="quick-filters" role="group" aria-label="按朝代筛选">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={selected === filter.id ? "active" : ""}
              onClick={() => {
                setSelected(filter.id);
                setExpanded(false);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <section className="people-results" aria-live="polite">
        <div className="people-results-head">
          <div>
            <span>{String(visible.length).padStart(2, "0")}</span>
            <h2>{filters.find((item) => item.id === selected)?.label ?? "人物"}</h2>
          </div>
          <p>点击人物，阅读生平、成就与关键时间线</p>
        </div>

        {cards.length ? (
          <div className="people-first-grid">
            {cards.map((person, index) => (
              <Link className="people-first-card" href={`/people/${person.slug}`} key={person.slug}>
                <div className={`first-card-symbol symbol-${index % 5}`}>
                  <span>{person.name.slice(-1)}</span>
                  <small>{person.birth}</small>
                </div>
                <div className="first-card-body">
                  <p>{person.dynasty} · {person.identity}</p>
                  <h3>{person.name}</h3>
                  <div className="first-card-dates">{person.birth} — {person.death}</div>
                  <p className="first-card-summary">{person.summary}</p>
                  <div className="first-card-foot">
                    <span>{person.tags.slice(0, 2).join(" · ")}</span>
                    <b>阅读人物志 <i>↗</i></b>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="people-no-result">没有找到匹配的人物，换个关键词试试。</div>
        )}

        {!query && visible.length > 12 && (
          <button className="load-more" onClick={() => setExpanded((value) => !value)}>
            {expanded ? "收起人物" : `继续浏览其余 ${visible.length - 12} 位人物`}
          </button>
        )}
      </section>
    </div>
  );
}
