const PRODUCT_DATA = {
  jasper: {
    id: 'jasper',
    name: 'Jasper',
    category: 'AI写作助手',
    tagline: '营销与品牌团队的全能AI写作平台',
    summary: 'Jasper 提供品牌语调管理、长短内容创作和多渠道模板，帮助市场团队以一致的品牌声音快速输出高质量文案。',
    website: 'https://www.jasper.ai/',
    logo: 'https://logo.clearbit.com/jasper.ai',
    heroGradient: 'linear-gradient(135deg, #f59e0b, #6366f1)',
    keyFeatures: [
      '支持博客、广告、邮件等 70+ 模板，几分钟内生成完整内容',
      '品牌声音 Brand Voice 功能，锁定语调、受众和风格偏好',
      '协作文档与批量内容生成，适配团队流程与审批',
      '集成 Surfer SEO、HubSpot、Webflow 等主流工具'
    ],
    idealUsers: [
      '需要保持品牌一致性的市场与品牌团队',
      '需要大量创意素材的广告与社媒运营',
      '为多语言市场制作内容的全球化团队'
    ],
    pricing: [
      'Creator：$49/月，适合个人创作者，包含 1 个品牌语调与基础模板',
      'Teams：$69/用户/月，支持协作、活动管理与多个品牌语调',
      'Business：按需报价，提供企业级安全、API 与自定义模板'
    ],
    highlights: [
      '浏览器扩展与文档编辑器提供即时写作体验',
      'AI 活动编排 Campaigns 功能覆盖从简报到发布全流程',
      '内置抄袭检测与 SEO 建议，保障内容可靠性'
    ],
    integrations: ['Surfer SEO', 'HubSpot', 'Notion', 'Webflow', 'Google Docs'],
    relatedTools: ['Copy.ai', 'Anyword', 'INK'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  'copy.ai': {
    id: 'copy.ai',
    name: 'Copy.ai',
    category: 'AI文案生成',
    tagline: '电商与销售团队的自动化文案引擎',
    summary: 'Copy.ai 提供自动化工作流、团队协作和丰富的营销模板，帮助企业批量产出高转化内容。',
    website: 'https://www.copy.ai/',
    logo: 'https://logo.clearbit.com/copy.ai',
    heroGradient: 'linear-gradient(135deg, #0ea5e9, #9333ea)',
    keyFeatures: [
      '预置 90+ 营销、产品、销售与社交媒体模板',
      '自动化工作流 Workflows，可串联研究、撰写与发布环节',
      '支持多成员协作、审批与版本管理',
      '提供 API 接口，便于嵌入内部系统'
    ],
    idealUsers: [
      '需要批量撰写商品描述的电商团队',
      '追求线索转化的 B2B 营销与销售团队',
      '运营大量社交平台的内容团队'
    ],
    pricing: [
      'Start：$49/月，含 5 帐号与无限项目',
      'Grow：$249/月，解锁自动化工作流、5+ 成员席位与先进功能',
      'Scale：企业报价，提供 SSO、安全策略与自定义训练'
    ],
    highlights: [
      '内置竞争对手研究与语调分析，保证内容精准',
      '支持 25+ 种语言，满足全球市场需求',
      '工作流可与 Zapier、Make 等自动化平台衔接'
    ],
    integrations: ['HubSpot', 'Marketo', 'Zapier', 'Shopify'],
    relatedTools: ['Jasper', 'Anyword', 'Wordtune'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  writesonic: {
    id: 'writesonic',
    name: 'Writesonic',
    category: 'AI内容创作',
    tagline: '多模态内容与增长团队的一体化平台',
    summary: 'Writesonic 集成博客写作、登陆页、广告文案、AI 聊天与图像生成功能，适合需要快速扩展内容生产的团队。',
    website: 'https://writesonic.com/',
    logo: 'https://logo.clearbit.com/writesonic.com',
    heroGradient: 'linear-gradient(135deg, #6366f1, #ec4899)',
    keyFeatures: [
      'Article Writer 5.0 可生成 SEO 优化的长篇文章',
      'Brand Voice 功能让内容与品牌语调保持一致',
      'Chatsonic 支持实时联网与图像生成',
      'Photosonic 与 Audiosonic 提供多模态创作能力'
    ],
    idealUsers: [
      '寻求一站式创作平台的内容营销团队',
      '需要生成登陆页与广告素材的增长团队',
      '希望结合文字、图片、音频的创作者'
    ],
    pricing: [
      'Small Team：$19/月起，含 4 成员与 200,000 Premium 字数',
      'Enterprise：按需报价，提供单点登录、定制工作流与 API',
      'Chatsonic 与 Photosonic 提供免费额度试用'
    ],
    highlights: [
      '支持导入关键字与大纲，生成结构化文章',
      '内置抄袭检测与事实核查辅助',
      '与 WordPress、Zapier 和 Chrome 插件深度集成'
    ],
    integrations: ['WordPress', 'Zapier', 'Chrome Extension', 'Semrush'],
    relatedTools: ['Jasper', 'Copy.ai', 'Rytr'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  rytr: {
    id: 'rytr',
    name: 'Rytr',
    category: '多语言写作',
    tagline: '高性价比的轻量级 AI 写作助手',
    summary: 'Rytr 提供 40+ 模板与 30+ 语言支持，界面简洁，适合个人创作者和小团队以低成本完成内容创作。',
    website: 'https://rytr.me/',
    logo: 'https://logo.clearbit.com/rytr.me',
    heroGradient: 'linear-gradient(135deg, #f97316, #facc15)',
    keyFeatures: [
      '覆盖博客、邮件、社媒和广告的多种模板',
      '创造性、严谨性等多种语气选项可调节输出风格',
      '内置抄袭检测与 SEO 分析工具',
      'Chrome 扩展支持随处调用'
    ],
    idealUsers: [
      '预算有限的自由职业者与小型团队',
      '需要快速生成多语言内容的跨境卖家',
      '希望在写作流程中获得灵感的内容创作者'
    ],
    pricing: [
      'Free Plan：每月 10,000 字额度',
      'Saver Plan：$9/月，提供 100,000 字与自定义用例',
      'Unlimited Plan：$29/月，解锁无限字数与专属社区'
    ],
    highlights: [
      '支持 Markdown 编辑，方便输出结构化内容',
      '文案生成速度快，几乎无等待',
      '提供社区「Rytr Me」分享与获取提示词灵感'
    ],
    integrations: ['Chrome Extension', 'WordPress', 'Semrush'],
    relatedTools: ['Writesonic', 'Copy.ai', 'Wordtune'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  quillbot: {
    id: 'quillbot',
    name: 'QuillBot',
    category: '改写与润色',
    tagline: '集改写、语法检查与引用管理于一体',
    summary: 'QuillBot 以改写器 Paraphraser 闻名，结合语法检查、摘要、引用等功能，帮助用户快速润色文本。',
    website: 'https://quillbot.com/',
    logo: 'https://logo.clearbit.com/quillbot.com',
    heroGradient: 'linear-gradient(135deg, #10b981, #047857)',
    keyFeatures: [
      '改写器提供标准、流畅、正式、创意等 7 种语气',
      'Grammar Checker 与 Spell Checker 实时纠错',
      'Citation Generator 支持 APA、MLA 等格式',
      'Summarizer 生成关键要点或段落摘要'
    ],
    idealUsers: [
      '需要保持学术严谨性的学生与研究者',
      '需要快速润色邮件与文案的职场人士',
      '希望优化语句结构的非英语母语写作者'
    ],
    pricing: [
      'Free：每日改写 125 字，基础语气可用',
      'Premium：$19.95/月，解锁全部语气、抄袭检测与无字数限制',
      '团队版：批量授权，提供集中账单管理'
    ],
    highlights: [
      '浏览器扩展与 Microsoft Word 插件支持随处调用',
      'AI 写作模式可从一句话生成段落',
      '抄袭检测器覆盖 100+ 亿网页与学术资源'
    ],
    integrations: ['Chrome Extension', 'Word Plugin', 'Google Docs'],
    relatedTools: ['Grammarly', 'Wordtune', 'INK'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  anyword: {
    id: 'anyword',
    name: 'Anyword',
    category: '数据驱动文案',
    tagline: '基于预测评分的营销文案优化平台',
    summary: 'Anyword 通过预测性能评分、受众定制和多渠道模板，帮助营销团队产出更具转化力的文案。',
    website: 'https://anyword.com/',
    logo: 'https://logo.clearbit.com/anyword.com',
    heroGradient: 'linear-gradient(135deg, #3b82f6, #0ea5e9)',
    keyFeatures: [
      'Predictive Performance Score 预测点击与转化',
      '支持不同受众画像与语调的个性化内容生成',
      '提供广告、登陆页、邮件等渠道专用模板',
      '拥有大规模行业数据集，提供竞争洞察'
    ],
    idealUsers: [
      '注重数据驱动决策的营销与广告团队',
      '希望验证多版本文案表现的增长团队',
      '进行 A/B 测试的绩效营销人员'
    ],
    pricing: [
      'Starter：$49/月，适合个人与小型团队，含预测评分',
      'Data-Driven：$99/月，提供品牌语调、网站个性化与团队协作',
      'Business：企业级方案，提供 API、合规与定制模型'
    ],
    highlights: [
      '登陆页优化功能可直接同步到 Webflow、WordPress',
      '广告平台模板覆盖 Meta、Google、LinkedIn 等主流渠道',
      '关键词库与竞争分析帮助快速定位创意方向'
    ],
    integrations: ['Facebook Ads', 'Google Ads', 'HubSpot', 'WordPress'],
    relatedTools: ['Copy.ai', 'Jasper', 'INK'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  wordtune: {
    id: 'wordtune',
    name: 'Wordtune',
    category: '智能改写助手',
    tagline: '用自然语言交互的实时写作伙伴',
    summary: 'Wordtune 提供改写、总结、补全文段与会议记录整理等功能，帮助知识工作者更快完成写作任务。',
    website: 'https://www.wordtune.com/',
    logo: 'https://logo.clearbit.com/wordtune.com',
    heroGradient: 'linear-gradient(135deg, #9333ea, #f472b6)',
    keyFeatures: [
      'Rewrite 功能支持正式、随意、简洁等语气转换',
      'Spices 提供示例、统计、反驳等创意补充',
      'Read & Summarize 自动概括长文与网页内容',
      'Wordtune Workspace 整合写作、总结与行动项'
    ],
    idealUsers: [
      '需要频繁撰写邮件与报告的知识型工作者',
      '希望快速总结会议与文章的运营人员',
      '追求灵感与创意补充的内容创作者'
    ],
    pricing: [
      'Free：每日改写 10 次，基础功能可用',
      'Plus：$24.99/月，提供无限改写、总结与 AI 引导',
      'Unlimited：$37.50/月，解锁高级分析、团队协作与 API'
    ],
    highlights: [
      'Chrome、Edge 扩展支持网页内实时改写',
      '可导入会议录音生成要点与待办事项',
      '支持 Slack、Gmail、Notion 等常用工具场景'
    ],
    integrations: ['Chrome Extension', 'Slack', 'Gmail', 'Notion'],
    relatedTools: ['QuillBot', 'Grammarly', 'Notion AI'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  grammarly: {
    id: 'grammarly',
    name: 'Grammarly',
    category: '语法与写作助手',
    tagline: '实时语法纠错与AI写作结合的平台',
    summary: 'Grammarly 集成语法、拼写、语气与抄袭检测，同时推出 GrammarlyGO AI 写作功能，适合需要高质量英文写作的用户。',
    website: 'https://www.grammarly.com/',
    logo: 'https://logo.clearbit.com/grammarly.com',
    heroGradient: 'linear-gradient(135deg, #22c55e, #0f766e)',
    keyFeatures: [
      '实时语法、拼写与语调建议，支持 500+ 应用',
      'GrammarlyGO 根据上下文生成草稿、回复与创意',
      '抄袭检测覆盖学术与网页资源',
      '风格指南 Style Guides 帮助团队统一语气'
    ],
    idealUsers: [
      '需要高质量英文写作的学生与专业人士',
      '注重品牌语气一致性的企业团队',
      '需要快速回复邮件与社交消息的知识工作者'
    ],
    pricing: [
      'Free：基础语法检查与语气建议',
      'Premium：$30/月或 $144/年，解锁高级写作建议与抄袭检测',
      'Business：$15/用户/月（起），支持团队风格指南、分析与 SSO'
    ],
    highlights: [
      '桌面应用、浏览器插件与 Office 插件覆盖全平台',
      '写作分析仪表盘提供团队质量洞察',
      'AI 写作提示支持自定义角色与语气'
    ],
    integrations: ['Microsoft Word', 'Google Docs', 'Slack', 'Gmail'],
    relatedTools: ['QuillBot', 'Wordtune', 'Notion AI'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  'notion-ai': {
    id: 'notion-ai',
    name: 'Notion AI',
    category: '知识管理与写作',
    tagline: '嵌入式 AI 助手，赋能知识管理与协作',
    summary: 'Notion AI 将生成式 AI 融入 Notion 笔记与数据库，提供总结、头脑风暴、翻译与项目管理辅助。',
    website: 'https://www.notion.so/product/ai',
    logo: 'https://logo.clearbit.com/notion.so',
    heroGradient: 'linear-gradient(135deg, #111827, #6b7280)',
    keyFeatures: [
      '在任意页面中生成、总结或改写内容',
      '数据库支持批量生成属性与任务',
      '提供会议记录、产品需求、知识库等模板',
      '支持 30+ 种语言翻译与多语写作'
    ],
    idealUsers: [
      '使用 Notion 进行项目管理的团队',
      '需要集中知识库并快速整理信息的运营人员',
      '希望在同一工作区完成写作与协作的企业'
    ],
    pricing: [
      'Notion AI Add-on：个人版 $10/月，团队版 $10/成员/月',
      'Business/Enterprise 计划可按需添加 AI 功能，包含更高安全级别',
      'Notion 提供免费基础用量体验 AI 功能'
    ],
    highlights: [
      'AI 可根据数据库上下文生成任务描述与摘要',
      '支持在会议纪要中直接提取行动项',
      '与 Slack、Jira、GitHub 等应用整合，保持信息同步'
    ],
    integrations: ['Slack', 'Jira', 'GitHub', 'Google Calendar'],
    relatedTools: ['Jasper', 'Wordtune', 'Notion Templates'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  },
  ink: {
    id: 'ink',
    name: 'INK',
    category: 'SEO 与 AI 文案',
    tagline: '结合 SEO 优化与 AI 写作的增长平台',
    summary: 'INK（INK for All）融合 SEO 评分、内容优化与 AI 写作，帮助团队在搜索引擎中获得更高排名并保持品牌一致。',
    website: 'https://inkforall.com/',
    logo: 'https://logo.clearbit.com/inkforall.com',
    heroGradient: 'linear-gradient(135deg, #6366f1, #0ea5e9)',
    keyFeatures: [
      'SEO Optimizer 提供关键词建议与内容评分',
      'AI 写作助手支持博客、广告与社交媒体文案',
      '品牌语调训练让输出符合品牌指南',
      '防抄袭模式确保原创性'
    ],
    idealUsers: [
      '专注自然搜索流量的内容营销团队',
      '需要保持品牌一致的多渠道创作者',
      '寻求 SEO 与写作一体化方案的中小企业'
    ],
    pricing: [
      'Professional：$49/月，含 AI 写作与 SEO 优化核心功能',
      'Enterprise：按需报价，提供协作、API 与自定义风格',
      '提供免费试用额度体验 SEO 评分'
    ],
    highlights: [
      'Real-time SEO Score 指导内容结构与关键词密度',
      '可生成社交媒体与广告文案并自动适配字数',
      '支持团队协作与审批流程'
    ],
    integrations: ['WordPress', 'Chrome Extension', 'Semrush'],
    relatedTools: ['Anyword', 'Writesonic', 'Jasper'],
    collectionLink: '../writing.html',
    collectionLabel: '查看更多写作工具'
  }
};

function getProductData(id) {
  if (!id) return null;
  const normalizedId = id.toLowerCase();
  return PRODUCT_DATA[normalizedId] || PRODUCT_DATA[normalizedId.replace(/\s+/g, '-')];
}

window.PRODUCT_DATA = PRODUCT_DATA;
window.getProductData = getProductData;
