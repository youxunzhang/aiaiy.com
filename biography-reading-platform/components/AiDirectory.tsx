"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { aiTools, categories, popularSearches, type ToolCategory } from "@/lib/ai-tools";
import { categoryDetails } from "@/lib/ai-directory";
import { DirectoryFooter, DirectoryHeader } from "@/components/DirectoryShell";
import { ToolCard } from "@/components/ToolCard";
import { countSectionItems, homeSections } from "@/lib/home-sections";

const categoryIcons: Record<ToolCategory, string> = {
  "AI 助手": "✦", "搜索研究": "⌕", "写作办公": "文", "编程开发": "</>", "图像设计": "◫",
  "视频创作": "▶", "音频音乐": "♪", "演示文档": "▤", "自动化智能体": "⌘", "检测翻译": "译", "国学阅读": "典",
};

type Scope = "all" | "featured" | "favorites";
type SortMode = "recommended" | "name";
type ViewMode = "compact" | "cards";

const quickTasks: { label: string; category: ToolCategory }[] = [
  { label: "聊天问答", category: "AI 助手" },
  { label: "查资料", category: "搜索研究" },
  { label: "写文章", category: "写作办公" },
  { label: "写代码", category: "编程开发" },
  { label: "做图片", category: "图像设计" },
  { label: "做视频", category: "视频创作" },
  { label: "生成音乐", category: "音频音乐" },
  { label: "做 PPT", category: "演示文档" },
  { label: "搭工作流", category: "自动化智能体" },
  { label: "检测翻译", category: "检测翻译" },
  { label: "读经典", category: "国学阅读" },
];

const portalEntries = homeSections.flatMap((section) => section.groups.flatMap((group) => group.items.map((item) => ({ ...item, section: section.title }))));

const homepageCategoryLimits: Record<ToolCategory, number> = {
  "AI 助手": 6,
  "搜索研究": 4,
  "写作办公": 4,
  "编程开发": 5,
  "图像设计": 5,
  "视频创作": 4,
  "音频音乐": 3,
  "演示文档": 3,
  "自动化智能体": 3,
  "检测翻译": 3,
  "国学阅读": 2,
};

function normalizeExternalUrl(url: string) {
  return url.replace(/^https?:\/\/(?:www\.)?/, "").replace(/\/$/, "");
}

const portalUrls = new Set(portalEntries.map((item) => normalizeExternalUrl(item.url)));
const homepageCategories = categories.slice(1) as readonly ToolCategory[];
const homepageAiTools = homepageCategories.flatMap((item) =>
  aiTools
    .filter((tool) => tool.category === item && !portalUrls.has(normalizeExternalUrl(tool.url)))
    .slice(0, homepageCategoryLimits[item]),
);
const homepageLinkCount = portalEntries.length + homepageAiTools.length;

export function AiDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("全部工具");
  const [scope, setScope] = useState<Scope>("all");
  const [sortMode, setSortMode] = useState<SortMode>("recommended");
  const [viewMode, setViewMode] = useState<ViewMode>("compact");
  const [favorites, setFavorites] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let saved: string[] = [];
    try { saved = JSON.parse(localStorage.getItem("aiaiy-favorites") ?? "[]"); } catch { saved = []; }
    queueMicrotask(() => setFavorites(saved));
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setQuery("");
        searchInputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const counts = useMemo(
    () => Object.fromEntries(homepageCategories.map((item) => [item, homepageAiTools.filter((tool) => tool.category === item).length])),
    [],
  );

  const filtered = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    const result = homepageAiTools.filter((tool) => {
      const categoryMatch = category === "全部工具" || tool.category === category;
      const scopeMatch = scope === "all" || (scope === "featured" ? ("featured" in tool && tool.featured) : favorites.includes(tool.url));
      const searchable = [tool.name, tool.category, tool.description, ...tool.tags].join(" ").toLocaleLowerCase("zh-CN");
      return categoryMatch && scopeMatch && (!keyword || searchable.includes(keyword));
    });
    return sortMode === "name" ? [...result].sort((a, b) => a.name.localeCompare(b.name, "zh-CN")) : result;
  }, [query, category, scope, sortMode, favorites]);

  const searchResults = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("zh-CN");
    if (!keyword) return [];
    const seen = new Set<string>();
    return [
      ...portalEntries.map((item) => ({ icon: item.icon, name: item.name, description: item.description, url: item.url, group: item.section })),
      ...homepageAiTools.map((tool) => ({ icon: tool.short, name: tool.name, description: tool.description, url: tool.url, group: tool.category })),
    ].filter((item) => {
      if (seen.has(item.url)) return false;
      const matches = [item.name, item.description, item.group].join(" ").toLocaleLowerCase("zh-CN").includes(keyword);
      if (matches) seen.add(item.url);
      return matches;
    }).slice(0, 12);
  }, [query]);

  function chooseCategory(item: (typeof categories)[number]) {
    setCategory(item);
    document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseTask(item: (typeof quickTasks)[number]) {
    setQuery("");
    setScope("all");
    chooseCategory(item.category);
  }

  function toggleFavorite(url: string) {
    setFavorites((current) => {
      const next = current.includes(url) ? current.filter((item) => item !== url) : [...current, url];
      localStorage.setItem("aiaiy-favorites", JSON.stringify(next));
      return next;
    });
  }

  function showDomesticTools() {
    setQuery("国产");
    setCategory("全部工具");
    setScope("all");
    document.querySelector("#directory")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="directory-page">
      <DirectoryHeader />
      <main id="top">
        <section className="finder-panel" aria-label="查找 AI 工具">
          <header className="finder-heading">
            <div><span>AI DIRECTORY</span><h1>AI 工具与常用网站</h1></div>
            <p>按任务进入，或者直接搜索名称、功能和平台。</p>
            <b>{homepageLinkCount} 个精选链接 · 覆盖 {categories.length - 1} 类场景</b>
          </header>
          <div className="search-section">
            <label className="search-shell">
              <span aria-hidden="true">⌕</span>
              <input ref={searchInputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜工具、功能或任务，例如：写代码、去背景、做 PPT…" aria-label="搜索 AI 工具" />
              <kbd>/</kbd>
              {query && <button type="button" onClick={() => setQuery("")} aria-label="清除搜索">×</button>}
            </label>
            <div className="popular-searches"><span>热门搜索</span>{popularSearches.map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div>
          </div>
          <div className="task-shortcuts"><span>按任务进入</span>{quickTasks.map((item) => <button type="button" key={item.label} onClick={() => chooseTask(item)}>{item.label}</button>)}</div>
          {query && <div className="unified-search-results" aria-live="polite">
            <header><div><span>SEARCH RESULTS</span><b>{searchResults.length > 0 ? `找到 ${searchResults.length} 个快捷入口` : "没有匹配入口"}</b></div><button type="button" onClick={() => setQuery("")}>清除搜索 ×</button></header>
            {searchResults.length > 0 && <div>{searchResults.map((item) => <a href={item.url} target="_blank" rel="noopener noreferrer nofollow" key={item.url}><span>{item.icon}</span><div><b>{item.name}</b><small>{item.group} · {item.description}</small></div><i>↗</i></a>)}</div>}
          </div>}
        </section>

        <section className="portal-hub" id="curated" aria-labelledby="portal-hub-title">
          <header className="portal-hub-heading">
            <div><span>QUICK LINKS</span><h2 id="portal-hub-title">常用网站</h2></div>
            <p>按真实工作场景分组，打开首页即可直接访问。</p>
          </header>
          <div className="portal-sections">
            {homeSections.map((section) => (
              <article className="portal-section" id={`portal-${section.number}`} key={section.number}>
                <header className="portal-section-heading">
                  <span className="portal-number">{section.number}</span>
                  <div><h3>{section.title}</h3><p>{section.description}</p></div>
                  <b>{countSectionItems(section)} 个{section.unit}</b>
                </header>
                <div className="portal-groups">
                  {section.groups.map((group, groupIndex) => (
                    <div className="portal-group" key={`${section.number}-${group.label ?? groupIndex}`}>
                      {group.label && <h4>{group.label}</h4>}
                      <div className="portal-grid">
                        {group.items.map((item) => (
                          <a className="portal-card" href={item.url} target="_blank" rel="noopener noreferrer nofollow" key={item.url}>
                            <span>{item.icon}</span><div><b>{item.name}</b><small>{item.description}</small></div><i>↗</i>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                  {section.footer && <button className="portal-footer-link" type="button" onClick={showDomesticTools}>{section.footer}</button>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="directory-content" id="directory">
          <header className="library-heading">
            <div><span>AI TOOL LIBRARY</span><h2>全部 AI 工具</h2></div>
            <p>从 100 个主流工具中，再精选 {homepageAiTools.length} 个不重复入口。</p>
          </header>
          <div className="category-strip" aria-label="工具分类">
            {categories.map((item) => (
              <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => chooseCategory(item)} aria-pressed={category === item}>
                <span className="category-label"><i aria-hidden="true">{item === "全部工具" ? "#" : categoryIcons[item]}</i>{item}</span>
                <b>{item === "全部工具" ? homepageAiTools.length : counts[item]}</b>
              </button>
            ))}
            <a href="/categories/">分类专题 ↗</a>
          </div>

          <div className="tools-panel">
            <div className="section-heading">
              <div><span>{homepageAiTools.length} CURATED AI TOOLS</span><h2>{category}</h2></div>
              <div className="heading-actions">
                {category !== "全部工具" && <a href={`/category/${categoryDetails[category].slug}/`}>分类专题页 ↗</a>}
                <p aria-live="polite">找到 <b>{filtered.length}</b> 个工具</p>
              </div>
            </div>

            <div className="filter-toolbar" aria-label="筛选和排序">
              <div className="scope-tabs">
                <button type="button" className={scope === "all" ? "active" : ""} onClick={() => setScope("all")}>全部</button>
                <button type="button" className={scope === "featured" ? "active" : ""} onClick={() => setScope("featured")}>热门推荐</button>
                <button type="button" className={scope === "favorites" ? "active" : ""} onClick={() => setScope("favorites")}>我的收藏 <span>{favorites.length}</span></button>
              </div>
              <label>排序<select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}><option value="recommended">推荐顺序</option><option value="name">名称 A–Z</option></select></label>
              <div className="view-switch" aria-label="显示方式"><button type="button" className={viewMode === "compact" ? "active" : ""} onClick={() => setViewMode("compact")}>紧凑</button><button type="button" className={viewMode === "cards" ? "active" : ""} onClick={() => setViewMode("cards")}>卡片</button></div>
            </div>

            <div className={viewMode === "compact" ? "tool-grid compact-grid" : "tool-grid"}>
              {filtered.map((tool) => <ToolCard key={tool.url} tool={tool} compact={viewMode === "compact"} number={homepageAiTools.indexOf(tool) + 1} favorite={favorites.includes(tool.url)} onToggleFavorite={toggleFavorite} />)}
            </div>
            {filtered.length === 0 && <div className="empty-state"><b>{scope === "favorites" ? "还没有收藏工具" : "没有找到匹配的工具"}</b><span>{scope === "favorites" ? "点击工具卡片右上角的星标，建立你的常用 AI 工具箱。" : "换个关键词，或清除筛选后再试试。"}</span><button type="button" onClick={() => { setQuery(""); setCategory("全部工具"); setScope("all"); }}>查看全部 {homepageAiTools.length} 个精选工具</button></div>}
          </div>
        </section>

        <section className="about-section" id="about">
          <div><span>ABOUT AIAIY</span><h2>少一点寻找，<br />多一点创造。</h2></div>
          <div><p>AIAIY 是面向中文用户的 AI 工具导航。我们按真实使用场景整理产品，不堆砌链接，让你更快找到适合工作、学习和创作的工具。</p><p>现在你可以收藏常用工具、浏览分类专题和查看工具详情。工具市场变化很快，我们会持续检查链接、更新分类并补充值得关注的新产品。</p></div>
        </section>
      </main>
      <DirectoryFooter />
    </div>
  );
}
