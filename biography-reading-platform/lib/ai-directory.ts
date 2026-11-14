import { aiTools, type AiTool, type ToolCategory } from "@/lib/ai-tools";

export const categoryDetails: Record<ToolCategory, {
  slug: string;
  label: string;
  description: string;
  keywords: readonly string[];
}> = {
  "AI 助手": { slug: "ai-assistants", label: "AI 助手", description: "精选通用对话、推理、多模态与个人助理工具，快速找到适合学习和工作的 AI 助手。", keywords: ["AI助手", "AI聊天", "AI对话", "大模型"] },
  "搜索研究": { slug: "ai-search-research", label: "搜索研究", description: "聚合 AI 搜索、学术研究、文献阅读与深度调研工具，让查资料和验证信息更高效。", keywords: ["AI搜索", "AI研究", "学术工具", "文献阅读"] },
  "写作办公": { slug: "ai-writing-office", label: "写作办公", description: "覆盖 AI 写作、文案润色、文档总结、知识库与办公提效工具。", keywords: ["AI写作", "AI办公", "文案生成", "文档总结"] },
  "编程开发": { slug: "ai-coding", label: "编程开发", description: "发现 AI 编程助手、AI IDE、应用生成与开发智能体，提升从代码到产品的效率。", keywords: ["AI编程", "AI代码", "AI IDE", "编程助手"] },
  "图像设计": { slug: "ai-image-design", label: "图像设计", description: "精选 AI 绘画、图片生成、图像编辑、视觉设计与商业素材工具。", keywords: ["AI绘画", "AI图片", "图像生成", "AI设计"] },
  "视频创作": { slug: "ai-video", label: "视频创作", description: "整理 AI 视频生成、数字人、剪辑与影视制作工具，覆盖短视频和专业创作场景。", keywords: ["AI视频", "文生视频", "数字人", "视频生成"] },
  "音频音乐": { slug: "ai-audio-music", label: "音频音乐", description: "发现 AI 音乐、语音合成、声音克隆、配音与播客制作工具。", keywords: ["AI音乐", "AI配音", "语音生成", "声音克隆"] },
  "演示文档": { slug: "ai-presentation", label: "演示文档", description: "精选 AI PPT、演示生成、文档设计与信息可视化工具。", keywords: ["AI PPT", "PPT生成", "演示文稿", "文档设计"] },
  "自动化智能体": { slug: "ai-agents-automation", label: "自动化智能体", description: "聚合 AI Agent、工作流自动化、无代码编排与 LLM 应用开发平台。", keywords: ["AI智能体", "AI Agent", "自动化", "工作流"] },
  "检测翻译": { slug: "ai-detection-translation", label: "检测翻译", description: "整理 AI 内容检测、文本对比、查重与多语言翻译工具。", keywords: ["AI检测", "AI翻译", "文本对比", "AI查重"] },
  "国学阅读": { slug: "chinese-classics", label: "国学阅读", description: "精选道德经、中国古典文献、古籍原文与数字经典阅读资源。", keywords: ["道德经", "国学经典", "古籍阅读", "中国哲学"] },
};

export function getToolSlug(tool: Pick<AiTool, "name">) {
  return tool.name
    .normalize("NFKC")
    .toLocaleLowerCase("zh-CN")
    .replace(/&/g, " and ")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getToolBySlug(slug: string) {
  return aiTools.find((tool) => getToolSlug(tool) === decodeURIComponent(slug));
}

export function getCategoryBySlug(slug: string) {
  return (Object.entries(categoryDetails) as [ToolCategory, (typeof categoryDetails)[ToolCategory]][])
    .find(([, detail]) => detail.slug === slug);
}

export function getToolsByCategory(category: ToolCategory) {
  return aiTools.filter((tool) => tool.category === category);
}
