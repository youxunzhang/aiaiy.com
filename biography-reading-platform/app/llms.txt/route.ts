import { aiTools } from "@/lib/ai-tools";
import { categoryDetails } from "@/lib/ai-directory";

export const dynamic = "force-static";

export function GET() {
  const categories = Object.entries(categoryDetails).map(([name, detail]) => `- [${name}](https://aiaiy.com/category/${detail.slug}/): ${detail.description}`).join("\n");
  const body = `# AIAIY AI工具导航\n\n> 面向中文用户的精选 AI 工具导航，收录 ${aiTools.length} 个主流工具，按真实使用场景分类。\n\n## 主要页面\n\n- [工具首页](https://aiaiy.com/)\n- [全部分类](https://aiaiy.com/categories/)\n\n## 工具分类\n\n${categories}\n\n## 内容原则\n\nAIAIY 提供工具发现、分类、介绍与官方入口。产品功能、定价和地区可用性以各工具官网为准。\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
