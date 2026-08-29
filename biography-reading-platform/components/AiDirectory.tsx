"use client";

import { useMemo, useState } from "react";

const tools = [
  { name: "腾讯朱雀 AI 检测", short: "朱", url: "https://matrix.tencent.com/ai-detect", category: "AI 检测", description: "检测文本是否可能由 AI 生成，适合内容审核与写作自查。", tags: ["文本检测", "中文", "腾讯"], color: "violet" },
  { name: "AI 降重降痕", short: "降", url: "https://zy.ai-or.com/ai-reduce", category: "写作辅助", description: "优化 AI 生成文本的表达方式，让内容更自然、更贴近日常写作。", tags: ["AI 降痕", "润色", "写作"], color: "amber" },
  { name: "ChatGPT", short: "GPT", url: "https://chatgpt.com/", category: "AI 对话", description: "通用 AI 助手，用于问答、写作、研究、编程与创意工作。", tags: ["对话", "写作", "编程"], color: "green" },
  { name: "Aura TTS", short: "声", url: "https://tts.aurastd.com/", category: "音频工具", description: "在线文字转语音工具，快速生成自然语音与多场景配音。", tags: ["文字转语音", "配音", "音频"], color: "blue" },
  { name: "生财有术", short: "财", url: "https://scys.com/", category: "创业社区", description: "面向创业者的实战社群，提供 AI、自媒体、电商与商业增长内容。", tags: ["创业", "商业", "实战社群"], color: "red" },
  { name: "Google Search Console", short: "SC", url: "https://search.google.com/search-console/about", category: "网站运营", description: "查看网站在 Google 搜索中的表现、收录状态与页面问题。", tags: ["SEO", "网站收录", "搜索表现"], color: "blue" },
  { name: "Google Analytics", short: "GA", url: "https://analytics.google.com/", category: "网站运营", description: "分析网站流量、用户来源与访问行为，了解内容运营效果。", tags: ["流量分析", "用户行为", "数据"], color: "amber" },
  { name: "Google AdSense", short: "AD", url: "https://adsense.google.com/", category: "网站运营", description: "通过在网站展示相关广告，管理内容变现与广告收益。", tags: ["网站变现", "广告", "收益"], color: "green" },
  { name: "Google Trends", short: "趋势", url: "https://trends.google.com/trends/", category: "趋势研究", description: "查看全球用户正在搜索的内容，比较关键词热度与变化趋势。", tags: ["搜索趋势", "关键词", "热点"], color: "violet" },
] as const;

const categories = ["全部工具", "AI 对话", "AI 检测", "写作辅助", "音频工具", "网站运营", "趋势研究", "创业社区"];

export function AiDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部工具");
  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const categoryMatch = category === "全部工具" || tool.category === category;
      const keywordMatch = !keyword || [tool.name, tool.category, tool.description, ...tool.tags].join(" ").toLowerCase().includes(keyword);
      return categoryMatch && keywordMatch;
    });
  }, [query, category]);

  return (
    <div className="directory-page">
      <header className="directory-header">
        <a className="directory-brand" href="#top" aria-label="AIAIY 首页"><span className="brand-symbol">AI</span><span><b>AIAIY</b><small>AI 黄页</small></span></a>
        <p className="header-count">已收录 {tools.length} 个常用工具</p>
        <a className="submit-link" href="mailto:hello@aiaiy.com?subject=提交 AI 工具">提交工具 <span>↗</span></a>
      </header>

      <main id="top">
        <section className="directory-intro">
          <div><p>AIAIY.COM</p><h1>AI 工具导航</h1></div>
          <div className="search-shell"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索工具…" aria-label="搜索 AI 工具" /></div>
        </section>

        <section className="directory-content" id="tools">
          <aside id="categories">
            <p>浏览分类</p>
            {categories.map((item) => <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}><span>{item}</span><b>{item === "全部工具" ? tools.length : tools.filter((tool) => tool.category === item).length}</b></button>)}
          </aside>
          <div className="tools-panel">
            <div className="section-heading"><div><span>TOOLS</span><h2>{category}</h2></div><p>共 {filtered.length} 个工具</p></div>
            <div className="tool-grid">
              {filtered.map((tool, index) => <a className="tool-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.url}>
                <div className={`tool-icon ${tool.color}`}>{tool.short}</div><div className="tool-card-top"><span>{tool.category}</span><b>0{index + 1}</b></div>
                <h3>{tool.name}</h3><p>{tool.description}</p><div className="tag-list">{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="visit-row"><span>{new URL(tool.url).hostname}</span><b>访问工具 ↗</b></div>
              </a>)}
            </div>
            {filtered.length === 0 && <div className="empty-state">没有找到相关工具，试试其他关键词。</div>}
          </div>
        </section>

      </main>

      <footer className="directory-footer"><div><b>AIAIY</b><span>AI 黄页导航</span></div><span>© 2026 AIAIY.COM</span></footer>
    </div>
  );
}
