"use client";

import { categories, type AiTool } from "@/lib/ai-tools";
import { getToolSlug } from "@/lib/ai-directory";
import { SiteIcon } from "@/components/SiteIcon";

type Props = {
  tool: AiTool;
  number?: number;
  favorite?: boolean;
  compact?: boolean;
  onToggleFavorite?: (url: string) => void;
};

export function ToolCard({ tool, number, favorite = false, compact = false, onToggleFavorite }: Props) {
  const displayNumber = number ? String(number).padStart(3, "0") : "精选";
  return (
    <article className={compact ? "tool-card compact" : "tool-card"}>
      <div className="tool-card-header">
        <SiteIcon className={`tool-icon tone-${categories.indexOf(tool.category) % 5}`} url={tool.url} fallback={tool.short} />
        <div className="tool-meta">
          <span>{tool.category}</span><b>{displayNumber}</b>
          {onToggleFavorite && <button type="button" className={favorite ? "favorite-button active" : "favorite-button"} onClick={() => onToggleFavorite(tool.url)} aria-label={favorite ? `取消收藏 ${tool.name}` : `收藏 ${tool.name}`} title={favorite ? "取消收藏" : "收藏"}>{favorite ? "★" : "☆"}</button>}
        </div>
      </div>
      <div className="tool-title-row"><h3><a href={`/tool/${getToolSlug(tool)}/`}>{tool.name}</a></h3>{tool.featured && <span className="featured-badge">热门</span>}</div>
      <p>{tool.description}</p>
      {!compact && <div className="tag-list">{tool.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
      <div className="visit-row">
        <a className="detail-link" href={`/tool/${getToolSlug(tool)}/`}>查看详情</a>
        <a className="visit-link" href={tool.url} target="_blank" rel="noopener noreferrer nofollow" aria-label={`访问 ${tool.name}（新窗口打开）`}>打开工具 <i>↗</i></a>
      </div>
    </article>
  );
}
