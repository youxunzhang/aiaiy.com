export const categories = [
  "全部工具",
  "AI 助手",
  "搜索研究",
  "写作办公",
  "编程开发",
  "图像设计",
  "视频创作",
  "音频音乐",
  "演示文档",
  "自动化智能体",
  "检测翻译",
] as const;

export type ToolCategory = Exclude<(typeof categories)[number], "全部工具">;

export type AiTool = {
  name: string;
  short: string;
  url: string;
  category: ToolCategory;
  description: string;
  tags: readonly [string, string, string];
  featured?: boolean;
};

export const aiTools = [
  { name: "ChatGPT", short: "GPT", url: "https://chatgpt.com/", category: "AI 助手", description: "OpenAI 推出的通用 AI 助手，覆盖问答、写作、分析、编程与创作。", tags: ["对话", "多模态", "推理"], featured: true },
  { name: "Claude", short: "CL", url: "https://claude.ai/", category: "AI 助手", description: "Anthropic 的 AI 助手，擅长长文本理解、写作、推理与代码任务。", tags: ["长文本", "写作", "编程"], featured: true },
  { name: "Gemini", short: "GE", url: "https://gemini.google.com/", category: "AI 助手", description: "Google 的多模态 AI 助手，可处理文本、图片、文件与研究任务。", tags: ["Google", "多模态", "研究"], featured: true },
  { name: "Microsoft Copilot", short: "CP", url: "https://copilot.microsoft.com/", category: "AI 助手", description: "微软 AI 助手，连接搜索、创作与 Microsoft 生态中的日常工作。", tags: ["微软", "搜索", "办公"], featured: true },
  { name: "DeepSeek", short: "DS", url: "https://chat.deepseek.com/", category: "AI 助手", description: "面向中文问答、深度推理、数学与编程场景的通用 AI 助手。", tags: ["推理", "中文", "编程"], featured: true },
  { name: "豆包", short: "豆", url: "https://www.doubao.com/", category: "AI 助手", description: "字节跳动推出的 AI 助手，支持对话、搜索、写作和多媒体创作。", tags: ["中文", "多模态", "创作"], featured: true },
  { name: "Kimi", short: "KI", url: "https://kimi.moonshot.cn/", category: "AI 助手", description: "月之暗面推出的 AI 助手，擅长长文档分析、联网搜索和推理。", tags: ["长文本", "搜索", "推理"], featured: true },
  { name: "通义千问", short: "千", url: "https://www.qianwen.com/", category: "AI 助手", description: "阿里巴巴推出的全能 AI 助手，覆盖对话、创作、学习和办公。", tags: ["中文", "办公", "多模态"] },
  { name: "文心一言", short: "文", url: "https://yiyan.baidu.com/", category: "AI 助手", description: "百度推出的生成式 AI 助手，提供搜索、问答、写作与内容创作。", tags: ["百度", "中文", "创作"] },
  { name: "腾讯元宝", short: "元", url: "https://yuanbao.tencent.com/", category: "AI 助手", description: "腾讯推出的 AI 助手，支持深度搜索、文档解析和多模型问答。", tags: ["腾讯", "搜索", "文档"], featured: true },
  { name: "Grok", short: "GR", url: "https://grok.com/", category: "AI 助手", description: "xAI 推出的实时信息与推理助手，支持对话、搜索和内容生成。", tags: ["实时信息", "推理", "搜索"] },
  { name: "Poe", short: "PO", url: "https://poe.com/", category: "AI 助手", description: "在一个平台中使用多家 AI 模型，并创建和分享自定义机器人。", tags: ["多模型", "机器人", "社区"] },
  { name: "Character.AI", short: "CA", url: "https://character.ai/", category: "AI 助手", description: "以角色设定和沉浸式对话为核心的 AI 角色互动平台。", tags: ["角色", "对话", "娱乐"] },
  { name: "智谱清言", short: "智", url: "https://chatglm.cn/", category: "AI 助手", description: "智谱推出的中文 AI 助手，支持问答、写作、代码和智能体任务。", tags: ["中文", "智能体", "编程"] },
  { name: "Cherry Studio", short: "CS", url: "https://cherry-ai.com/", category: "AI 助手", description: "跨平台 AI 工作站，支持多模型对话、知识库、Agent 与 MCP。", tags: ["多模型", "知识库", "MCP"] },

  { name: "Perplexity", short: "PX", url: "https://www.perplexity.ai/", category: "搜索研究", description: "以来源引用为核心的 AI 搜索与研究助手，适合快速查证信息。", tags: ["AI 搜索", "引用", "研究"], featured: true },
  { name: "NotebookLM", short: "NB", url: "https://notebooklm.google.com/", category: "搜索研究", description: "基于自有资料进行总结、问答和音频概览的 Google 研究工具。", tags: ["知识库", "文档", "Google"], featured: true },
  { name: "Consensus", short: "CO", url: "https://consensus.app/", category: "搜索研究", description: "面向学术论文的 AI 搜索引擎，帮助快速定位研究结论与证据。", tags: ["论文", "学术", "证据"] },
  { name: "Elicit", short: "EL", url: "https://elicit.com/", category: "搜索研究", description: "用于文献检索、论文整理和系统综述的 AI 研究助手。", tags: ["文献", "综述", "研究"] },
  { name: "SciSpace", short: "SS", url: "https://scispace.com/", category: "搜索研究", description: "帮助查找、理解和解释科研论文的 AI 学术阅读平台。", tags: ["论文", "阅读", "学术"] },
  { name: "Genspark", short: "GS", url: "https://www.genspark.ai/", category: "搜索研究", description: "通过智能体完成搜索、整理资料并生成结构化结果的 AI 工作台。", tags: ["智能体", "搜索", "报告"] },
  { name: "秘塔 AI 搜索", short: "秘", url: "https://metaso.cn/", category: "搜索研究", description: "中文 AI 搜索引擎，可生成带来源的结构化答案和研究报告。", tags: ["中文搜索", "来源", "报告"] },
  { name: "天工 AI", short: "天", url: "https://www.tiangong.cn/", category: "搜索研究", description: "支持联网搜索、知识问答、内容创作与研究分析的中文 AI 工具。", tags: ["中文", "搜索", "研究"] },
  { name: "You.com", short: "YOU", url: "https://you.com/", category: "搜索研究", description: "结合实时网络信息、引用与多模型能力的 AI 搜索助手。", tags: ["搜索", "多模型", "引用"] },
  { name: "Phind", short: "PH", url: "https://www.phind.com/", category: "搜索研究", description: "面向开发者的 AI 搜索引擎，专注技术问题、代码与资料查找。", tags: ["开发者", "代码", "搜索"] },

  { name: "Notion AI", short: "NO", url: "https://www.notion.com/product/ai", category: "写作办公", description: "集成于 Notion 的写作、总结、知识检索和工作流 AI 助手。", tags: ["笔记", "写作", "知识库"], featured: true },
  { name: "Grammarly", short: "GM", url: "https://www.grammarly.com/", category: "写作办公", description: "英文语法检查、改写和语气优化工具，适合邮件与专业写作。", tags: ["语法", "英文", "润色"] },
  { name: "Jasper", short: "JA", url: "https://www.jasper.ai/", category: "写作办公", description: "面向营销团队的 AI 内容平台，用于品牌文案和活动内容生成。", tags: ["营销", "文案", "品牌"] },
  { name: "Copy.ai", short: "COPY", url: "https://www.copy.ai/", category: "写作办公", description: "用于销售和营销文案生成、内容改写与流程自动化的 AI 平台。", tags: ["营销", "销售", "文案"] },
  { name: "QuillBot", short: "QB", url: "https://quillbot.com/", category: "写作办公", description: "提供改写、语法检查、摘要和引用生成的一站式写作工具。", tags: ["改写", "摘要", "语法"] },
  { name: "Writesonic", short: "WS", url: "https://writesonic.com/", category: "写作办公", description: "面向 SEO 与营销场景的 AI 写作、内容优化和生成式搜索平台。", tags: ["SEO", "写作", "营销"] },
  { name: "Wordtune", short: "WT", url: "https://www.wordtune.com/", category: "写作办公", description: "帮助重写句子、调整语气并精炼英文表达的 AI 写作助手。", tags: ["改写", "英文", "语气"] },
  { name: "Monica", short: "MO", url: "https://monica.im/", category: "写作办公", description: "集合聊天、搜索、翻译、阅读和写作能力的跨平台 AI 助手。", tags: ["浏览器", "写作", "翻译"] },
  { name: "WPS AI", short: "WPS", url: "https://ai.wps.cn/", category: "写作办公", description: "融入文字、表格和演示文稿的国产 AI 办公与文档助手。", tags: ["办公", "文档", "国产"] },
  { name: "ima copilot", short: "IMA", url: "https://ima.qq.com/", category: "写作办公", description: "腾讯推出的知识库与智能工作台，用于资料收集、阅读和创作。", tags: ["知识库", "阅读", "腾讯"] },
  { name: "ChatPDF", short: "PDF", url: "https://www.chatpdf.com/", category: "写作办公", description: "上传 PDF 后进行问答、总结与信息提取的文档阅读工具。", tags: ["PDF", "问答", "总结"] },
  { name: "问皮皮文字精简", short: "简", url: "http://www.wenpipi.com/sim", category: "写作办公", description: "在线精简冗余文字，帮助内容表达更清晰、更紧凑。", tags: ["文字精简", "改写", "中文"] },
  { name: "AI 降重降痕", short: "降", url: "https://zy.ai-or.com/ai-reduce", category: "写作办公", description: "优化 AI 生成文本的表达方式，让内容更自然、更贴近日常写作。", tags: ["AI 降痕", "润色", "写作"] },

  { name: "GitHub Copilot", short: "GH", url: "https://github.com/features/copilot", category: "编程开发", description: "集成于编辑器与 GitHub 工作流的 AI 编程助手和代码智能体。", tags: ["代码补全", "GitHub", "Agent"], featured: true },
  { name: "Cursor", short: "CU", url: "https://www.cursor.com/", category: "编程开发", description: "AI 原生代码编辑器，支持代码库理解、自动修改和智能体开发。", tags: ["AI IDE", "代码库", "Agent"], featured: true },
  { name: "Windsurf", short: "WI", url: "https://windsurf.com/", category: "编程开发", description: "面向智能体编程的 AI IDE，可理解项目并完成跨文件开发任务。", tags: ["AI IDE", "Agent", "代码"] },
  { name: "Replit", short: "RE", url: "https://replit.com/", category: "编程开发", description: "在浏览器中通过 AI 构建、运行和部署应用的云端开发平台。", tags: ["云开发", "应用生成", "部署"] },
  { name: "Claude Code", short: "CC", url: "https://www.anthropic.com/claude-code", category: "编程开发", description: "Anthropic 的终端编程智能体，可理解代码库并执行复杂开发任务。", tags: ["终端", "Agent", "代码库"] },
  { name: "Gemini Code Assist", short: "GC", url: "https://codeassist.google/", category: "编程开发", description: "Google 面向个人和团队的 AI 编码辅助、审查与开发工具。", tags: ["Google", "代码补全", "审查"] },
  { name: "Tabnine", short: "TN", url: "https://www.tabnine.com/", category: "编程开发", description: "注重企业隐私与代码安全的 AI 编程助手和开发智能体。", tags: ["企业", "隐私", "代码"] },
  { name: "Qoder", short: "QD", url: "https://qoder.com/", category: "编程开发", description: "面向真实软件项目的智能编程平台，支持代码理解和任务代理。", tags: ["AI IDE", "项目", "Agent"] },
  { name: "Trae", short: "TR", url: "https://www.trae.ai/", category: "编程开发", description: "字节跳动推出的 AI IDE，提供代码补全、对话和智能体开发模式。", tags: ["AI IDE", "免费", "Agent"] },
  { name: "Bolt.new", short: "BO", url: "https://bolt.new/", category: "编程开发", description: "通过自然语言在浏览器中生成、运行和发布全栈 Web 应用。", tags: ["全栈", "应用生成", "浏览器"] },
  { name: "Lovable", short: "LO", url: "https://lovable.dev/", category: "编程开发", description: "通过对话快速生成可编辑、可部署的 Web 产品和应用原型。", tags: ["应用生成", "原型", "全栈"] },
  { name: "v0", short: "V0", url: "https://v0.dev/", category: "编程开发", description: "Vercel 推出的 AI 应用构建工具，擅长生成前端界面和全栈应用。", tags: ["前端", "Vercel", "应用生成"] },

  { name: "Midjourney", short: "MJ", url: "https://www.midjourney.com/", category: "图像设计", description: "高质量 AI 图像生成平台，擅长艺术创作、概念视觉与风格探索。", tags: ["图像生成", "艺术", "设计"], featured: true },
  { name: "Adobe Firefly", short: "FF", url: "https://firefly.adobe.com/", category: "图像设计", description: "Adobe 的生成式创意平台，支持图像、设计、视频与商业工作流。", tags: ["Adobe", "图像", "商用"] },
  { name: "Stability AI", short: "SD", url: "https://stability.ai/", category: "图像设计", description: "Stable Diffusion 背后的生成式 AI 平台，提供开放图像模型与工具。", tags: ["开源模型", "图像", "Stable Diffusion"] },
  { name: "Ideogram", short: "ID", url: "https://ideogram.ai/", category: "图像设计", description: "擅长文字排版、海报和品牌视觉的 AI 图像生成与编辑工具。", tags: ["文字生成", "海报", "设计"] },
  { name: "Leonardo.Ai", short: "LE", url: "https://leonardo.ai/", category: "图像设计", description: "面向设计师与创作者的 AI 图像生成、编辑和资产制作平台。", tags: ["图像生成", "游戏资产", "设计"] },
  { name: "Canva Magic Studio", short: "CV", url: "https://www.canva.com/magic-studio/", category: "图像设计", description: "集成于 Canva 的 AI 设计套件，支持图片、文案和版式快速生成。", tags: ["设计", "模板", "营销"] },
  { name: "Microsoft Designer", short: "MD", url: "https://designer.microsoft.com/", category: "图像设计", description: "微软的 AI 平面设计与图片编辑工具，适合社媒和营销素材制作。", tags: ["微软", "平面设计", "图片"] },
  { name: "Recraft", short: "RC", url: "https://www.recraft.ai/", category: "图像设计", description: "面向品牌设计的 AI 图像与矢量生成工具，支持一致风格控制。", tags: ["矢量", "品牌", "图像"] },
  { name: "Playground", short: "PG", url: "https://playground.com/", category: "图像设计", description: "易用的 AI 图像设计画布，用于生成、合成和编辑视觉内容。", tags: ["图像", "编辑", "画布"] },
  { name: "Clipdrop", short: "CD", url: "https://clipdrop.co/", category: "图像设计", description: "集成抠图、扩图、清理、放大和生成能力的 AI 图片工具箱。", tags: ["抠图", "扩图", "修图"] },
  { name: "remove.bg", short: "BG", url: "https://www.remove.bg/", category: "图像设计", description: "自动识别人像与物体并快速移除图片背景的在线 AI 工具。", tags: ["去背景", "抠图", "图片"] },
  { name: "Photoroom", short: "PR", url: "https://www.photoroom.com/", category: "图像设计", description: "面向电商与品牌素材的 AI 商品图、背景生成和批量编辑平台。", tags: ["商品图", "电商", "背景"] },
  { name: "Magnific", short: "MA", url: "https://magnific.ai/", category: "图像设计", description: "通过生成式细节增强实现图片高清放大与风格优化的 AI 工具。", tags: ["高清放大", "细节", "修复"] },
  { name: "即梦 AI", short: "梦", url: "https://jimeng.jianying.com/", category: "图像设计", description: "字节跳动旗下的中文 AI 创作平台，支持图片和视频生成。", tags: ["中文", "图像生成", "视频"] },
  { name: "通义万相", short: "万", url: "https://tongyi.aliyun.com/wanxiang/", category: "图像设计", description: "阿里云推出的 AI 视觉创作平台，提供文生图与图像编辑能力。", tags: ["国产", "图像生成", "设计"] },

  { name: "Runway", short: "RW", url: "https://runwayml.com/", category: "视频创作", description: "专业级生成式视频平台，覆盖文生视频、编辑和视觉特效工作流。", tags: ["视频生成", "特效", "创作"], featured: true },
  { name: "可灵 AI", short: "可", url: "https://klingai.com/", category: "视频创作", description: "快手推出的 AI 视频与图像创作平台，支持多种生成和编辑模式。", tags: ["视频生成", "国产", "图像"] },
  { name: "Pika", short: "PI", url: "https://pika.art/", category: "视频创作", description: "面向创作者的 AI 视频生成和特效平台，可快速制作创意短片。", tags: ["视频生成", "特效", "短视频"] },
  { name: "Luma Dream Machine", short: "LU", url: "https://lumalabs.ai/dream-machine", category: "视频创作", description: "Luma 的 AI 视频生成工具，可从文字或图片创建高质量动态画面。", tags: ["文生视频", "图生视频", "电影感"] },
  { name: "HeyGen", short: "HG", url: "https://www.heygen.com/", category: "视频创作", description: "AI 数字人和视频翻译平台，适合营销、培训与多语言内容。", tags: ["数字人", "视频翻译", "营销"] },
  { name: "Synthesia", short: "SY", url: "https://www.synthesia.io/", category: "视频创作", description: "企业级 AI 数字人视频平台，用文本快速制作培训和讲解视频。", tags: ["数字人", "企业", "培训"] },
  { name: "海螺 AI", short: "海", url: "https://hailuoai.video/", category: "视频创作", description: "MiniMax 推出的 AI 视频生成平台，支持文字与图片生成视频。", tags: ["国产", "视频生成", "图生视频"] },
  { name: "Google Flow", short: "FL", url: "https://labs.google/fx/tools/flow/", category: "视频创作", description: "Google 面向影视创作者的 AI 影片制作工具，整合 Veo 等模型。", tags: ["Google", "Veo", "电影制作"] },
  { name: "CapCut AI", short: "剪", url: "https://www.capcut.com/tools/ai-video-generator", category: "视频创作", description: "剪映海外版的 AI 视频生成与编辑工具，适合社媒短视频制作。", tags: ["剪辑", "短视频", "社媒"] },
  { name: "Vidu", short: "VD", url: "https://www.vidu.com/", category: "视频创作", description: "生数科技推出的 AI 视频生成平台，支持角色一致性与参考生视频。", tags: ["国产", "视频生成", "角色一致"] },

  { name: "ElevenLabs", short: "11", url: "https://elevenlabs.io/", category: "音频音乐", description: "高质量 AI 语音生成、声音克隆、配音和多语言音频平台。", tags: ["语音生成", "声音克隆", "配音"], featured: true },
  { name: "Suno", short: "SU", url: "https://suno.com/", category: "音频音乐", description: "通过文字提示快速生成完整歌曲、演唱和伴奏的 AI 音乐平台。", tags: ["音乐生成", "歌曲", "创作"], featured: true },
  { name: "Udio", short: "UD", url: "https://www.udio.com/", category: "音频音乐", description: "支持多种曲风、歌词和延展编辑的高质量 AI 音乐生成工具。", tags: ["音乐生成", "歌词", "编辑"] },
  { name: "Adobe Podcast", short: "AP", url: "https://podcast.adobe.com/", category: "音频音乐", description: "提供语音增强、录音和转录能力的浏览器端 AI 播客工具。", tags: ["音质增强", "播客", "录音"] },
  { name: "Descript", short: "DE", url: "https://www.descript.com/", category: "音频音乐", description: "像编辑文档一样编辑音频和视频，支持转录、配音与降噪。", tags: ["音视频编辑", "转录", "配音"] },
  { name: "Murf", short: "MU", url: "https://murf.ai/", category: "音频音乐", description: "面向商业内容的 AI 配音平台，提供多语言声音和团队协作。", tags: ["配音", "多语言", "企业"] },
  { name: "Speechify", short: "SP", url: "https://speechify.com/", category: "音频音乐", description: "将网页、文档和书籍转换为自然语音的 AI 朗读与配音工具。", tags: ["文字转语音", "朗读", "配音"] },
  { name: "Aura TTS", short: "声", url: "https://tts.aurastd.com/", category: "音频音乐", description: "在线文字转语音工具，快速生成自然语音与多场景配音。", tags: ["文字转语音", "配音", "音频"] },

  { name: "Gamma", short: "GA", url: "https://gamma.app/", category: "演示文档", description: "通过提示词生成演示文稿、文档和网页的 AI 内容设计工具。", tags: ["PPT", "文档", "网页"], featured: true },
  { name: "Beautiful.ai", short: "BA", url: "https://www.beautiful.ai/", category: "演示文档", description: "通过智能版式自动生成和美化专业演示文稿的 AI 工具。", tags: ["PPT", "版式", "团队"] },
  { name: "Presentations.AI", short: "PA", url: "https://www.presentations.ai/", category: "演示文档", description: "从主题或文档快速生成品牌化演示稿和可分享幻灯片。", tags: ["PPT", "品牌", "生成"] },
  { name: "Napkin AI", short: "NA", url: "https://www.napkin.ai/", category: "演示文档", description: "把文字内容自动转换成图表、流程图和视觉说明的 AI 工具。", tags: ["可视化", "图表", "文档"] },
  { name: "Pitch", short: "PT", url: "https://pitch.com/", category: "演示文档", description: "面向团队协作的现代演示平台，提供 AI 生成与品牌模板。", tags: ["PPT", "协作", "模板"] },
  { name: "Prezi AI", short: "PZ", url: "https://prezi.com/features/ai/", category: "演示文档", description: "利用 AI 生成具有动态叙事结构的演示文稿和视觉故事。", tags: ["演示", "动态", "叙事"] },

  { name: "Zapier AI", short: "ZA", url: "https://zapier.com/ai", category: "自动化智能体", description: "连接数千款应用，用 AI 和自动化工作流处理重复性业务任务。", tags: ["自动化", "连接器", "工作流"], featured: true },
  { name: "Make", short: "MK", url: "https://www.make.com/en/ai-agents", category: "自动化智能体", description: "可视化构建跨应用自动化与 AI 智能体工作流的平台。", tags: ["工作流", "智能体", "无代码"] },
  { name: "n8n", short: "N8N", url: "https://n8n.io/ai/", category: "自动化智能体", description: "面向技术团队的可扩展工作流自动化和 AI Agent 平台。", tags: ["开源", "工作流", "Agent"] },
  { name: "Dify", short: "DF", url: "https://dify.ai/", category: "自动化智能体", description: "开源 LLM 应用开发平台，用于构建工作流、知识库与智能体。", tags: ["开源", "LLM 应用", "知识库"] },
  { name: "Coze", short: "CZ", url: "https://www.coze.com/", category: "自动化智能体", description: "字节跳动推出的 AI 智能体开发平台，支持插件、工作流与发布。", tags: ["智能体", "工作流", "插件"] },
  { name: "Flowise", short: "FW", url: "https://flowiseai.com/", category: "自动化智能体", description: "通过可视化节点构建 LLM 应用、RAG 流程和多智能体系统。", tags: ["开源", "可视化", "RAG"] },

  { name: "腾讯朱雀 AI 检测", short: "朱", url: "https://matrix.tencent.com/ai-detect", category: "检测翻译", description: "腾讯安全推出的 AI 内容检测工具，可用于文本与图像内容识别。", tags: ["AI 检测", "腾讯", "内容安全"] },
  { name: "Winston AI 文本对比", short: "比", url: "https://app.gowinston.ai/text-compare", category: "检测翻译", description: "在线比较两段文本，高亮新增、删除和相同内容，并显示相似度。", tags: ["文本对比", "差异检查", "相似度"] },
  { name: "Originality.ai", short: "OR", url: "https://originality.ai/", category: "检测翻译", description: "面向出版和内容团队的 AI 文本检测、抄袭检查与事实核验平台。", tags: ["AI 检测", "查重", "事实核验"] },
  { name: "DeepL", short: "DL", url: "https://www.deepl.com/translator", category: "检测翻译", description: "高质量 AI 翻译与写作辅助工具，支持多语言文本和文档翻译。", tags: ["翻译", "多语言", "文档"] },
  { name: "沉浸式翻译", short: "译", url: "https://immersivetranslate.com/", category: "检测翻译", description: "网页双语对照、PDF 和视频字幕翻译的跨平台 AI 翻译工具。", tags: ["网页翻译", "双语", "PDF"] },
] as const satisfies readonly AiTool[];

export const popularSearches = ["ChatGPT", "DeepSeek", "AI 编程", "AI 绘画", "视频生成", "PPT"] as const;
