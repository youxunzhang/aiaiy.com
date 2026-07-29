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
  avatar: string;
  summary: string;
  tags: string[];
};

const featured = [
  "confucius",
  "qin-shi-huang",
  "wu-zetian",
  "li-bai",
  "du-fu",
  "su-shi",
  "wang-an-shi",
  "sima-qian",
  "wang-yangming",
  "zhang-juzheng",
  "zeng-guofan",
  "lu-xun",
  "ren-zhengfei",
];

export function DynastyExplorer({ people }: { people: PersonPreview[] }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return [...people]
      .sort((a, b) => featured.indexOf(a.slug) - featured.indexOf(b.slug))
      .map((person, index) => ({ ...person, catalogNumber: index + 1 }))
      .filter(
        (person) =>
          !needle ||
          [person.name, person.dynasty, person.identity, ...person.tags]
            .join(" ")
            .toLowerCase()
            .includes(needle),
      );
  }, [people, query]);

  return (
    <section className="people-directory" aria-label="历史人物">
      <div className="people-directory-bar">
        <div className="people-directory-heading">
          <div>
            <p>人物志 · PEOPLE</p>
            <h1>认识改变时代的人</h1>
          </div>
          <span>{visible.length} 位人物</span>
        </div>
        <label className="directory-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索姓名、朝代或身份"
            aria-label="搜索人物"
          />
        </label>
      </div>

      {visible.length ? (
        <div className="people-first-grid">
          {visible.map((person) => (
            <Link className="people-first-card" href={`/people/${person.slug}`} key={person.slug}>
              <div className="first-card-symbol">
                <img src={person.avatar} alt={`${person.name}人物肖像`} loading="lazy" />
                <small>NO. {String(person.catalogNumber).padStart(2, "0")}</small>
              </div>
              <div className="first-card-body">
                <p>{person.dynasty} · {person.identity}</p>
                <h2>{person.name}</h2>
                <div className="first-card-dates">{person.birth} — {person.death}</div>
                <p className="first-card-summary">{person.summary}</p>
                <div className="first-card-foot">
                  <span>{person.tags.slice(0, 2).join(" · ")}</span>
                  <b>查看人物 <i>→</i></b>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="people-no-result">没有找到匹配的人物，换个关键词试试。</div>
      )}
    </section>
  );
}
