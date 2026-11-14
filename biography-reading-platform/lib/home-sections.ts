export type PortalItem = {
  icon: string;
  name: string;
  description: string;
  url: string;
};

export type PortalSection = {
  number: string;
  title: string;
  description: string;
  unit: "入口" | "工具";
  groups: readonly { label?: string; items: readonly PortalItem[] }[];
  footer?: string;
};

export const homeSections: readonly PortalSection[] = [
  {
    number: "01", title: "搜索与趋势研究", unit: "入口",
    description: "先看真实搜索结果，再比较关键词热度；指数不等同于精确搜索量。",
    groups: [
      { label: "主流搜索引擎", items: [
        { icon: "G", name: "Google", description: "全球网页与资讯搜索", url: "https://www.google.com/" },
        { icon: "百", name: "百度", description: "中文网页与本地信息", url: "https://www.baidu.com/" },
        { icon: "B", name: "Bing", description: "微软与 AI 搜索入口", url: "https://www.bing.com/" },
        { icon: "360", name: "360 搜索", description: "中文网页搜索入口", url: "https://www.so.com/" },
      ] },
      { label: "趋势与热度", items: [
        { icon: "GT", name: "Google Trends", description: "比较搜索兴趣变化", url: "https://trends.google.com/trends/" },
        { icon: "BI", name: "百度指数", description: "查看关键词趋势与人群", url: "https://index.baidu.com/v2/index.html#/" },
        { icon: "热", name: "百度热搜", description: "观察实时热门主题", url: "https://top.baidu.com/board" },
      ] },
    ],
  },
  {
    number: "02", title: "AI 内容生成与检测", unit: "入口",
    description: "语音合成、文本处理和 AIGC 检测；检测结果只适合作为辅助判断。",
    groups: [{ items: [
      { icon: "TTS", name: "Aura AI语音合成", description: "在线生成自然语音内容", url: "https://tts.aurastd.com/" },
      { icon: "净文", name: "舟吾净文·朱雀工作台", description: "纯文本改写与内容处理", url: "https://zy.ai-or.com/zhuque-workbench" },
      { icon: "朱雀", name: "腾讯朱雀AI检测", description: "AI文本、图片与视频检测，仅供参考", url: "https://matrix.tencent.com/ai-detect" },
    ] }],
  },
  {
    number: "03", title: "内容发布平台", unit: "入口",
    description: "视频、图文和播客的官方创作入口，发布内容前请先登录对应平台。",
    groups: [{ items: [
      { icon: "视频号", name: "微信视频号助手", description: "视频号内容发布与账号管理", url: "https://channels.weixin.qq.com/" },
      { icon: "头条", name: "今日头条创作平台", description: "文章、视频与微头条发布", url: "https://mp.toutiao.com/" },
      { icon: "百家", name: "百家号", description: "百度内容创作与发布后台", url: "https://baijiahao.baidu.com/" },
      { icon: "播客", name: "小宇宙播客后台", description: "播客节目上传与运营管理", url: "https://podcaster.xiaoyuzhoufm.com/login" },
      { icon: "YT", name: "YouTube Studio", description: "视频上传、数据与频道管理", url: "https://studio.youtube.com/" },
      { icon: "知", name: "知乎", description: "回答、文章与视频内容发布", url: "https://www.zhihu.com/" },
      { icon: "B站", name: "哔哩哔哩", description: "视频、专栏与动态内容发布", url: "https://member.bilibili.com/platform/home" },
      { icon: "微博", name: "微博", description: "图文、视频与热点内容发布", url: "https://weibo.com/" },
      { icon: "快手", name: "快手创作者服务平台", description: "视频发布、数据与账号运营", url: "https://cp.kuaishou.com/" },
      { icon: "小红书", name: "小红书创作服务平台", description: "笔记发布、数据与账号管理", url: "https://creator.xiaohongshu.com/" },
    ] }],
  },
  {
    number: "04", title: "海外社交媒体", unit: "入口",
    description: "面向全球受众的社交、短视频、职业网络与社区分发入口。",
    groups: [{ items: [
      { icon: "TG", name: "Telegram Web", description: "频道、群组与即时消息网页版", url: "https://web.telegram.org/" },
      { icon: "X", name: "X", description: "实时资讯、观点与品牌动态", url: "https://x.com/" },
      { icon: "FB", name: "Facebook", description: "主页、社群与全球内容分发", url: "https://www.facebook.com/" },
      { icon: "IG", name: "Instagram", description: "图片、Reels 与品牌内容", url: "https://www.instagram.com/" },
      { icon: "in", name: "LinkedIn", description: "职业内容、企业主页与人脉", url: "https://www.linkedin.com/" },
      { icon: "R", name: "Reddit", description: "兴趣社区与话题讨论", url: "https://www.reddit.com/" },
      { icon: "TT", name: "TikTok", description: "全球短视频内容发布与发现", url: "https://www.tiktok.com/" },
      { icon: "P", name: "Pinterest", description: "视觉灵感、作品与商品发现", url: "https://www.pinterest.com/" },
    ] }],
  },
  {
    number: "05", title: "主流大模型", unit: "工具",
    description: "使用广泛、持续更新的通用对话与推理模型。",
    groups: [{ items: [
      { icon: "豆", name: "豆包", description: "字节跳动旗下中文AI助手", url: "https://www.doubao.com/" },
      { icon: "DS", name: "DeepSeek", description: "擅长推理、代码与中文任务", url: "https://chat.deepseek.com/" },
      { icon: "GPT", name: "ChatGPT", description: "多模态通用AI助手", url: "https://chatgpt.com/" },
      { icon: "C", name: "Claude", description: "长文本、写作与分析助手", url: "https://claude.ai/" },
      { icon: "G", name: "Grok", description: "X 推出的实时信息AI助手", url: "https://grok.com/" },
      { icon: "K", name: "Kimi", description: "适合长文档阅读与中文写作", url: "https://kimi.moonshot.cn/" },
    ] }],
  },
  {
    number: "06", title: "内容创作", unit: "工具",
    description: "写作、文本比较、视觉与视频创作工具。",
    groups: [{ items: [
      { icon: "Gr", name: "Grammarly", description: "英文语法、语气与表达优化", url: "https://www.grammarly.com/" },
      { icon: "WC", name: "Winston Text Compare", description: "比较两段文本并高亮差异", url: "https://app.gowinston.ai/text-compare" },
      { icon: "Ca", name: "Canva", description: "在线设计与AI视觉创作", url: "https://www.canva.com/" },
      { icon: "MJ", name: "Midjourney", description: "高质量AI图像生成", url: "https://www.midjourney.com/" },
      { icon: "R", name: "Remove.bg", description: "快速移除图片背景", url: "https://www.remove.bg/" },
      { icon: "Rw", name: "Runway", description: "AI视频与视觉内容生成", url: "https://runwayml.com/" },
    ] }],
  },
  {
    number: "07", title: "AI 编程", unit: "工具",
    description: "面向开发者的编辑器、代码助手和开发平台。",
    groups: [{ items: [
      { icon: "Cu", name: "Cursor", description: "AI原生代码编辑器", url: "https://www.cursor.com/" },
      { icon: "D", name: "Devin Desktop", description: "Windsurf升级后的多代理IDE", url: "https://devin.ai/desktop" },
      { icon: "GH", name: "GitHub Copilot", description: "代码补全与开发协作助手", url: "https://github.com/features/copilot" },
      { icon: "G", name: "Gemini Code Assist", description: "Google的IDE代码辅助工具", url: "https://codeassist.google/" },
      { icon: "VS", name: "VS Code", description: "扩展生态丰富的代码编辑器", url: "https://code.visualstudio.com/" },
      { icon: "CG", name: "CodeGeeX", description: "国产多语言AI编程助手", url: "https://codegeex.cn/" },
    ] }],
  },
  {
    number: "08", title: "SEO 工具", unit: "工具",
    description: "搜索表现、关键词、技术诊断与内容优化。",
    groups: [{ items: [
      { icon: "GSC", name: "Search Console", description: "Google搜索表现与索引诊断", url: "https://search.google.com/search-console/about" },
      { icon: "A", name: "Ahrefs", description: "关键词、外链与竞品研究", url: "https://ahrefs.com/" },
      { icon: "S", name: "Semrush", description: "综合SEO与内容营销平台", url: "https://www.semrush.com/" },
      { icon: "SF", name: "Screaming Frog", description: "网站抓取与技术SEO审计", url: "https://www.screamingfrog.co.uk/seo-spider/" },
      { icon: "Y", name: "Yoast SEO", description: "WordPress站内内容优化", url: "https://yoast.com/wordpress/plugins/seo/" },
      { icon: "KT", name: "Keyword Tool", description: "搜索词与长尾关键词发现", url: "https://keywordtool.io/" },
    ] }],
  },
  {
    number: "09", title: "国产 AI", unit: "工具",
    description: "更适合中文语境与国内访问环境的代表产品。",
    footer: "查看完整国产AI导航 →",
    groups: [{ items: [
      { icon: "讯", name: "讯飞星火", description: "中文问答与多模态大模型", url: "https://xinghuo.xfyun.cn/" },
      { icon: "元", name: "腾讯元宝", description: "文档问答与智能助手", url: "https://yuanbao.tencent.com/" },
      { icon: "文", name: "百度文心助手", description: "办公、学习与中文内容助手", url: "https://yiyan.baidu.com/" },
      { icon: "通", name: "通义千问", description: "阿里云通用大模型产品", url: "https://www.qianwen.com/" },
      { icon: "可", name: "可灵 AI", description: "国产高质量AI视频生成", url: "https://klingai.kuaishou.com/" },
      { icon: "梦", name: "即梦 AI", description: "图片与视频创作平台", url: "https://jimeng.jianying.com/" },
    ] }],
  },
] as const;

export function countSectionItems(section: PortalSection) {
  return section.groups.reduce((total, group) => total + group.items.length, 0);
}
