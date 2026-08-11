"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { TaoChapter, TaoTheme } from "@/lib/tao";

const moods = [
  { label: "Anxiety", zh: "焦虑", chapters: [16, 33, 44] },
  { label: "Anger", zh: "愤怒", chapters: [22, 68, 78] },
  { label: "Exhaustion", zh: "疲惫", chapters: [8, 44, 48] },
  { label: "Relationships", zh: "关系", chapters: [22, 49, 67] },
  { label: "Work Pressure", zh: "工作压力", chapters: [33, 44, 64] },
  { label: "Letting Go", zh: "放下", chapters: [16, 48, 78] },
  { label: "Leadership", zh: "领导力", chapters: [17, 60, 66] },
  { label: "Uncertainty", zh: "迷茫", chapters: [1, 25, 33] },
];

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[\u4e00-\u9fff]/.test(text) ? "zh-CN" : "en-US";
  utterance.rate = .82;
  window.speechSynthesis.speak(utterance);
}

export function TaoHome({ chapters, themes }: { chapters: TaoChapter[]; themes: TaoTheme[] }) {
  const [mood, setMood] = useState("Anxiety");
  const [theme, setTheme] = useState("All");
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const daily = chapters[7];
  const selectedMood = moods.find((item) => item.label === mood) ?? moods[0];
  const recommendations = selectedMood.chapters.map((number) => chapters[number - 1]);
  const visible = useMemo(() => theme === "All" ? chapters : chapters.filter((chapter) => chapter.themes.includes(theme)), [chapters, theme]);

  function joinJourney(event: FormEvent) {
    event.preventDefault();
    if (!email.trim()) return;
    localStorage.setItem("readtao-early-access", email.trim());
    setJoined(true);
  }

  return (
    <>
      <section className="tao-hero">
        <div className="sun" aria-hidden="true" />
        <div className="mountain mountain-one" aria-hidden="true" />
        <div className="mountain mountain-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker">Ancient wisdom · Daily practice</p>
          <h1>Find calm in the<br />wisdom of <em>Tao</em></h1>
          <p className="hero-lead">Read the Tao Te Ching, reflect on its timeless wisdom, and bring balance into modern life.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#daily">Read Today&apos;s Wisdom</a>
            <a className="text-button" href="#chapters">Explore 81 Chapters <span>→</span></a>
          </div>
          <blockquote><b>知足不辱，知止不殆。</b><span>Know contentment. Know when to stop.</span></blockquote>
        </div>
        <div className="chapter-orbit" aria-hidden="true"><span>81</span><small>CHAPTERS</small></div>
      </section>

      <section className="daily-section section-shell" id="daily">
        <div className="section-label"><span>01</span><p>Daily Tao · 每日一道</p></div>
        <div className="daily-layout">
          <div className="daily-intro"><p className="eyebrow">TODAY&apos;S WISDOM</p><h2>A quiet thought<br />for your day.</h2><p>One passage, one reflection, one small practice. No rush.</p></div>
          <article className="wisdom-card">
            <div className="card-top"><span>Chapter 08</span><div><button onClick={() => speak(daily.opening)} aria-label="Play Chinese reading">▶</button><button className={saved ? "saved" : ""} onClick={() => setSaved(!saved)} aria-label="Save this wisdom">{saved ? "♥" : "♡"}</button></div></div>
            <p className="chinese-quote">{daily.opening}</p>
            <p className="translation">{daily.english}</p>
            <div className="modern-note"><b>For today</b><p>{daily.insight}</p></div>
            <Link href="/tao-te-ching/chapter-8">Read the full chapter <span>→</span></Link>
          </article>
        </div>
      </section>

      <section className="questions-section" id="questions">
        <div className="section-shell">
          <div className="questions-head"><div><p className="eyebrow">WISDOM FOR REAL LIFE</p><h2>What are you facing today?</h2></div><p>Choose what feels closest. We&apos;ll guide you to a few chapters worth sitting with.</p></div>
          <div className="mood-grid">{moods.map((item) => <button className={mood === item.label ? "active" : ""} onClick={() => setMood(item.label)} key={item.label}><span>{item.label}</span><small>{item.zh}</small></button>)}</div>
          <div className="recommendations"><div><small>FOR {mood.toUpperCase()}</small><h3>Three places to begin</h3></div>{recommendations.map((chapter) => <Link href={`/tao-te-ching/chapter-${chapter.number}`} key={chapter.number}><span>{String(chapter.number).padStart(2, "0")}</span><p>{chapter.opening}</p><b>→</b></Link>)}</div>
        </div>
      </section>

      <section className="chapters-section section-shell" id="chapters">
        <div className="chapters-head"><div><p className="eyebrow">THE COMPLETE TEXT</p><h2>81 Chapters, many ways in.</h2></div><p>Browse in order or begin with the theme that speaks to your life now.</p></div>
        <div className="theme-tabs"><button className={theme === "All" ? "active" : ""} onClick={() => setTheme("All")}>All · 全部</button>{themes.map((item) => <button className={theme === item.name ? "active" : ""} onClick={() => setTheme(item.name)} key={item.name}>{item.name} · {item.chinese}</button>)}</div>
        <div className="chapter-grid">{visible.map((chapter) => <Link href={`/tao-te-ching/chapter-${chapter.number}`} key={chapter.number}><span>{String(chapter.number).padStart(2, "0")}</span><p>{chapter.opening}</p></Link>)}</div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-copy"><p className="eyebrow">THE 81-DAY JOURNEY</p><h2>One chapter a day.<br />A calmer life, one day at a time.</h2><p>Read slowly. Reflect honestly. Build a personal relationship with the Tao Te Ching in 81 quiet steps.</p><ul><li>Daily bilingual reading</li><li>A small practice for modern life</li><li>Private reflection prompts</li></ul></div>
        <form className="journey-form" onSubmit={joinJourney}><span>EARLY ACCESS</span><h3>Carry the Tao with you, every day.</h3>{joined ? <p className="success-message">Saved on this device. Early access details are coming soon.</p> : <><label><span>Email address</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label><button type="submit">Join the Early Access List</button><small>No noise. Only meaningful product updates.</small></>}</form>
      </section>
    </>
  );
}
