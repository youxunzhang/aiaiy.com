"use client";

import { useMemo, useState } from "react";
import { aiTools, categories, popularSearches, type ToolCategory } from "@/lib/ai-tools";

const categoryIcons: Record<ToolCategory, string> = {
  "AI 助手": "✦",
  "搜索研究": "⌕",
  "写作办公": "文",
  "编程开发": "</>",
  "图像设计": "◫",
  "视频创作": "▶",
  "音频音乐": "♪",
  "演示文档": "▤",
  "自动化智能体": "⌘",
  "检测翻译": "译",
};

export function AiDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部工具");

  const counts = useMemo(
    () => Object.fromEntries(categories.slice(1).map((item) => [item, aiTools.filter((tool) => tool.category === item).length])),
    [],
  );

  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    return aiTools.filter((tool) => {
      const categoryMatch = category === "全部工具" || tool.category === category;
      const searchable = [tool.name, tool.category, tool.description, ...tool.tags].join(" ").toLocaleLowerCase("zh-CN");
      return categoryMatch && (!keyword || searchable.includes(keyword));
    });
  }, [query, category]);

  function chooseCategory(item: (typeof categories)[number]) {
    setCategory(item);
    document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="directory-page">
      <header className="directory-header">
        <a className="directory-brand" href="#top" aria-label="AIAIY AI 工具导航首页">
          <span className="brand-symbol">AI</span>
          <span><b>AIAIY</b><small>AI 工具导航</small></span>
        </a>
        <nav aria-label="主导航">
          <a href="#directory">工具库</a>
          <a href="#about">关于本站</a>
        </nav>
        <a className="submit-link" href="mailto:hello@aiaiy.com?subject=提交 AI 工具">提交工具 <span>↗</span></a>
      </header>

      <main id="top">
        <section className="search-section" aria-label="搜索工具">
          <label className="search-shell">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索名称、用途或关键词…" aria-label="搜索 AI 工具" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="清除搜索">×</button>}
          </label>
          <div className="popular-searches"><span>热门：</span>{popularSearches.map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
        </section>

        <section className="directory-content" id="directory">
          <aside aria-label="工具分类">
            <p>按场景浏览</p>
            {categories.map((item) => (
              <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => chooseCategory(item)} aria-pressed={category === item}>
                <span className="category-label"><i aria-hidden="true">{item === "全部工具" ? "#" : categoryIcons[item]}</i>{item}</span>
                <b>{item === "全部工具" ? aiTools.length : counts[item]}</b>
              </button>
            ))}
          </aside>

          <div className="tools-panel">
            <div className="section-heading">
              <div><span>100 AI TOOLS</span><h1>{category}</h1></div>
              <p aria-live="polite">找到 <b>{filtered.length}</b> 个工具</p>
            </div>
            <div className="tool-grid">
              {filtered.map((tool) => {
                const number = String(aiTools.indexOf(tool) + 1).padStart(3, "0");
                return (
                  <a className="tool-card" href={tool.url} target="_blank" rel="noopener noreferrer" key={tool.url} aria-label={`访问 ${tool.name}（新窗口打开）`}>
                    <div className="tool-card-header">
                      <div className={`tool-icon tone-${categories.indexOf(tool.category) % 5}`}>{tool.short}</div>
                      <div className="tool-meta"><span>{tool.category}</span><b>{number}</b></div>
                    </div>
                    <div className="tool-title-row"><h3>{tool.name}</h3>{"featured" in tool && tool.featured && <span className="featured-badge">热门</span>}</div>
                    <p>{tool.description}</p>
                    <div className="tag-list">{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="visit-row"><span>{new URL(tool.url).hostname.replace(/^www\./, "")}</span><b>访问工具 <i>↗</i></b></div>
                  </a>
                );
              })}
            </div>
            {filtered.length === 0 && <div className="empty-state"><b>没有找到匹配的工具</b><span>换个关键词，或清除筛选后再试试。</span><button type="button" onClick={() => { setQuery(""); setCategory("全部工具"); }}>查看全部 100 个工具</button></div>}
          </div>
        </section>

        <section className="about-section" id="about">
          <div><span>ABOUT AIAIY</span><h2>少一点寻找，<br />多一点创造。</h2></div>
          <div><p>AIAIY 是面向中文用户的 AI 工具导航。我们按真实使用场景整理产品，不堆砌链接，让你更快找到适合工作、学习和创作的工具。</p><p>工具市场变化很快，我们会持续检查链接、更新分类并补充值得关注的新产品。</p></div>
        </section>
      </main>

      <footer className="directory-footer">
        <div><b>AIAIY</b><span>100 个主流 AI 工具，一站发现。</span></div>
        <div className="footer-links"><a href="#top">返回顶部 ↑</a><a href="mailto:hello@aiaiy.com">联系我们</a><span>© 2026 AIAIY.COM</span></div>
      </footer>
    </div>
  );
}
