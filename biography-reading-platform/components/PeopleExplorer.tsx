"use client";

import { useMemo, useState } from "react";
import type { Person } from "@/lib/content";
import { PersonCard } from "./PersonCard";

export function PeopleExplorer({
  people,
  compact = false,
}: {
  people: Person[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [identity, setIdentity] = useState("全部");
  const [dynasty, setDynasty] = useState("全部");
  const identities = ["全部", ...Array.from(new Set(people.map((person) => person.identity)))];
  const dynasties = ["全部", ...Array.from(new Set(people.map((person) => person.dynasty)))];
  const filtered = useMemo(
    () =>
      people.filter((person) => {
        const haystack = [
          person.name,
          person.alias,
          person.dynasty,
          person.identity,
          ...person.tags,
        ].join(" ").toLowerCase();
        return (
          haystack.includes(query.toLowerCase()) &&
          (identity === "全部" || person.identity === identity) &&
          (dynasty === "全部" || person.dynasty === dynasty)
        );
      }),
    [people, query, identity, dynasty],
  );

  return (
    <div className="explorer">
      <div className="search-panel">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索人物、朝代、身份或标签"
            aria-label="搜索人物"
          />
          <kbd>搜索</kbd>
        </label>
        {!compact && (
          <div className="filters">
            <div>
              <b>身份</b>
              {identities.map((item) => (
                <button
                  className={identity === item ? "active" : ""}
                  onClick={() => setIdentity(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <b>朝代</b>
              {dynasties.map((item) => (
                <button
                  className={dynasty === item ? "active" : ""}
                  onClick={() => setDynasty(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {!compact && <p className="result-count">找到 {filtered.length} 位人物</p>}
      <div className="people-grid">
        {filtered
          .slice(0, compact ? 6 : undefined)
          .map((person, index) => (
            <PersonCard key={person.slug} person={person} index={index} />
          ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">没有找到匹配的人物，换个关键词试试。</div>
      )}
    </div>
  );
}
