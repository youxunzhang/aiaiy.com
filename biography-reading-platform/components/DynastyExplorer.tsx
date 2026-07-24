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

const dynasties = [
  { id: "all", label: "全部", years: "上下五千年", note: "从文明源流到现代中国，在人物的选择里读懂时代。" },
  { id: "pre-qin", label: "先秦", years: "约前770—前221", note: "思想迸发、诸侯竞逐，关于秩序与人的问题第一次被集中回答。" },
  { id: "qin-han", label: "秦汉", years: "前221—220", note: "大一统制度成形，帝国、历史书写与国家想象由此展开。" },
  { id: "tang", label: "唐", years: "618—907", note: "开放与雄健的时代，诗歌、权力和个人命运都抵达高峰。" },
  { id: "song", label: "宋", years: "960—1279", note: "文治、商业与思想成熟，改革者和文人的光芒交相辉映。" },
  { id: "ming", label: "明", years: "1368—1644", note: "制度高度运转，也催生了直面内心与现实的思想突破。" },
  { id: "qing", label: "清", years: "1636—1912", note: "旧世界遭遇新秩序，人物在危局中寻找自强与转型之路。" },
  { id: "modern", label: "近现代", years: "1840—1949", note: "剧烈变动中的中国，以文字、思想和行动重新理解自己。" },
  { id: "today", label: "当代", years: "1949—至今", note: "技术、商业与社会快速变化，新的时代人物仍在书写答案。" },
] as const;

const relationWords = ["理想", "创造", "变革", "坚韧"] as const;

const personRelation: Record<string, (typeof relationWords)[number]> = {
  confucius: "理想",
  "li-bai": "创造",
  "du-fu": "坚韧",
  "qin-shi-huang": "变革",
  "sima-qian": "坚韧",
  "su-shi": "创造",
  "wang-an-shi": "变革",
  "wang-yangming": "理想",
  "wu-zetian": "变革",
  "zeng-guofan": "坚韧",
  "zhang-juzheng": "变革",
  "lu-xun": "理想",
  "ren-zhengfei": "坚韧",
};

function dynastyGroup(dynasty: string) {
  if (dynasty.includes("春秋") || dynasty.includes("战国")) return "pre-qin";
  if (dynasty.includes("秦") || dynasty.includes("汉")) return "qin-han";
  if (dynasty.includes("唐")) return "tang";
  if (dynasty.includes("宋")) return "song";
  if (dynasty.includes("明")) return "ming";
  if (dynasty.includes("清")) return "qing";
  if (dynasty.includes("近现代")) return "modern";
  return "today";
}

export function DynastyExplorer({ people }: { people: PersonPreview[] }) {
  const [selected, setSelected] = useState("tang");
  const [relation, setRelation] = useState<(typeof relationWords)[number]>("创造");
  const current = dynasties.find((item) => item.id === selected) ?? dynasties[0];
  const visible = useMemo(
    () => people.filter((person) => selected === "all" || dynastyGroup(person.dynasty) === selected),
    [people, selected],
  );
  const match = visible.find((person) => personRelation[person.slug] === relation) ?? visible[0];

  return (
    <div className="dynasty-home">
      <section className="dynasty-hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> 先选朝代，再遇见一个人</p>
          <h1>你想回到<br /><em>哪个朝代？</em></h1>
          <p className="hero-lead">从朝代进入历史，看见那些改变时代的人，也发现你与他们之间意外的相似。</p>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit-year">公元</span>
          <b>二〇二六</b>
          <i>历史从未走远</i>
        </div>
      </section>

      <section className="dynasty-picker" aria-label="选择朝代">
        <div className="timeline-line" />
        <div className="dynasty-tabs" role="tablist">
          {dynasties.map((dynasty) => (
            <button
              key={dynasty.id}
              className={selected === dynasty.id ? "active" : ""}
              onClick={() => setSelected(dynasty.id)}
              role="tab"
              aria-selected={selected === dynasty.id}
            >
              <span>{dynasty.label}</span>
              <small>{dynasty.id === "all" ? "总览" : dynasty.years.split("—")[0]}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="dynasty-stage">
        <div className="dynasty-intro">
          <p className="eyebrow">CURRENT DYNASTY · 当前朝代</p>
          <div className="dynasty-title-row">
            <h2>{current.label}</h2>
            <span>{current.years}</span>
          </div>
          <p>{current.note}</p>
        </div>

        <div className="relation-panel">
          <div>
            <p className="eyebrow">你的历史关键词</p>
            <h3>你更相信哪一种力量？</h3>
          </div>
          <div className="relation-options">
            {relationWords.map((word) => (
              <button key={word} className={relation === word ? "active" : ""} onClick={() => setRelation(word)}>
                {word}
              </button>
            ))}
          </div>
          {match ? (
            <p className="match-line">
              在{current.label}，与你最同频的是 <Link href={`/people/${match.slug}`}>{match.name} <span>→</span></Link>
            </p>
          ) : (
            <p className="match-line">这个朝代的人物正在陆续收录中。</p>
          )}
        </div>

        <div className="people-heading">
          <div><span>{String(visible.length).padStart(2, "0")}</span><h2>{current.label}代表人物</h2></div>
          <p>点击人物，查看生平时间线、成就与关系网络</p>
        </div>

        {visible.length ? (
          <div className="dynasty-people-grid">
            {visible.map((person, index) => (
              <Link className="dynasty-person-card" href={`/people/${person.slug}`} key={person.slug}>
                <div className={`person-symbol symbol-${index % 5}`}>
                  <span>{person.name.slice(-1)}</span>
                  <small>{person.birth}</small>
                </div>
                <div className="person-body">
                  <p>{person.dynasty} · {person.identity}</p>
                  <h3>{person.name}</h3>
                  <div className="person-dates">{person.birth} — {person.death}</div>
                  <p className="person-summary">{person.summary}</p>
                  <div className="person-card-foot">
                    <span>与你的关键词：{personRelation[person.slug] ?? "探索"}</span>
                    <b>认识他 / 她 →</b>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="dynasty-empty">
            <b>这一卷，正在展开</b>
            <p>该朝代人物资料正在整理。你可以先从“全部”浏览已收录人物。</p>
            <button onClick={() => setSelected("all")}>浏览全部人物</button>
          </div>
        )}
      </section>
    </div>
  );
}
