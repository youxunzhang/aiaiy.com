window.AIAIY_DATA = {
  tools: [
    {slug:'chatgpt',name:'ChatGPT',shortDescription:'全能型 AI 对话与生产力助手',website:'https://chatgpt.com',categories:['chat','writing','research'],pricing:'freemium',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'limited',bestFor:['writing','research','productivity'],companyRegion:'global',apiSupport:true,featured:true,pros:['通用能力强','生态完善'],cons:['高峰期速度波动','高级能力需付费'],alternatives:['claude','gemini','deepseek']},
    {slug:'claude',name:'Claude',shortDescription:'长文本理解和写作表现优秀',website:'https://claude.ai',categories:['chat','writing'],pricing:'freemium',freeTrial:true,supportsChinese:'partial',chinaAccessibility:'requires_workaround',bestFor:['writing','analysis'],companyRegion:'global',apiSupport:true,featured:true,pros:['长文质量高','风格稳定'],cons:['国内访问门槛高'],alternatives:['chatgpt','gemini']},
    {slug:'gemini',name:'Gemini',shortDescription:'Google 生态深度整合的多模态助手',website:'https://gemini.google.com',categories:['chat','research'],pricing:'freemium',freeTrial:true,supportsChinese:'partial',chinaAccessibility:'requires_workaround',bestFor:['research','workspace'],companyRegion:'global',apiSupport:true,featured:true,pros:['搜索能力好','Workspace 联动'],cons:['国内可用性受限'],alternatives:['chatgpt','claude']},
    {slug:'deepseek',name:'DeepSeek',shortDescription:'面向推理与代码的中国 AI 模型产品',website:'https://chat.deepseek.com',categories:['chat','coding','research'],pricing:'freemium',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'easy',bestFor:['coding','reasoning'],companyRegion:'china',apiSupport:true,featured:true,pros:['中文体验好','推理性价比高'],cons:['高峰稳定性有波动'],alternatives:['kimi','doubao']},
    {slug:'doubao',name:'Doubao',shortDescription:'字节系日常办公与创作助手',website:'https://www.doubao.com',categories:['chat','productivity'],pricing:'free',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'easy',bestFor:['office','general'],companyRegion:'china',apiSupport:false,featured:true,pros:['上手快','中文场景强'],cons:['开发者能力相对弱'],alternatives:['kimi','deepseek']},
    {slug:'kimi',name:'Kimi',shortDescription:'擅长长文本和资料整理的中文助手',website:'https://kimi.moonshot.cn',categories:['chat','research','writing'],pricing:'freemium',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'easy',bestFor:['students','research'],companyRegion:'china',apiSupport:true,featured:true,pros:['长上下文强','论文场景好用'],cons:['复杂多模态能力一般'],alternatives:['deepseek','doubao']},
    {slug:'midjourney',name:'Midjourney',shortDescription:'高质量 AI 绘图工具',website:'https://www.midjourney.com',categories:['image','design'],pricing:'paid',freeTrial:false,supportsChinese:'partial',chinaAccessibility:'requires_workaround',bestFor:['design','creators'],companyRegion:'global',apiSupport:false,featured:true,pros:['出图质量高','风格一致'],cons:['订阅门槛高'],alternatives:['jimeng','kling']},
    {slug:'runway',name:'Runway',shortDescription:'面向创作者的视频生成与编辑平台',website:'https://runwayml.com',categories:['video','design'],pricing:'freemium',freeTrial:true,supportsChinese:'partial',chinaAccessibility:'limited',bestFor:['video','creators'],companyRegion:'global',apiSupport:true,featured:true,pros:['视频工作流成熟'],cons:['价格偏高'],alternatives:['kling','jimeng']},
    {slug:'kling',name:'Kling',shortDescription:'快手推出的 AI 视频生成工具',website:'https://klingai.com',categories:['video'],pricing:'freemium',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'easy',bestFor:['video','creators'],companyRegion:'china',apiSupport:false,featured:true,pros:['中文友好','生成效果稳定'],cons:['高级功能排队'],alternatives:['runway','jimeng']},
    {slug:'jimeng',name:'Jimeng',shortDescription:'即梦 AI，短视频创作效率工具',website:'https://jimeng.jianying.com',categories:['video','design'],pricing:'freemium',freeTrial:true,supportsChinese:'yes',chinaAccessibility:'easy',bestFor:['video','marketing'],companyRegion:'china',apiSupport:false,featured:true,pros:['抖音生态联动','模板多'],cons:['偏内容平台生态'],alternatives:['kling','runway']}
  ],
  comparisons:[
    {slug:'chatgpt-vs-claude-vs-gemini',title:'ChatGPT vs Claude vs Gemini',tools:['chatgpt','claude','gemini'],summary:'三大全球模型在写作、推理与生态上的取舍。',winnerByUseCase:{students:'chatgpt',research:'claude',office:'gemini'}},
    {slug:'deepseek-vs-kimi-vs-doubao',title:'DeepSeek vs Kimi vs Doubao',tools:['deepseek','kimi','doubao'],summary:'中文用户常用三款工具的核心差异。',winnerByUseCase:{students:'kimi',research:'deepseek',casualUse:'doubao'}},
    {slug:'midjourney-vs-jimeng-vs-kling',title:'Midjourney vs Jimeng vs Kling',tools:['midjourney','jimeng','kling'],summary:'绘图与视频创作三工具选择指南。',winnerByUseCase:{designers:'midjourney',creators:'kling',shortVideo:'jimeng'}},
    {slug:'runway-vs-kling',title:'Runway vs Kling',tools:['runway','kling'],summary:'全球视频编辑流 vs 中文视频生成流。',winnerByUseCase:{proTeams:'runway',chinaUsers:'kling'}},
    {slug:'chatgpt-vs-deepseek',title:'ChatGPT vs DeepSeek',tools:['chatgpt','deepseek'],summary:'通用助手与高性价比推理助手对比。',winnerByUseCase:{coding:'deepseek',general:'chatgpt'}},
    {slug:'claude-vs-gemini',title:'Claude vs Gemini',tools:['claude','gemini'],summary:'长文写作与搜索生态之间如何选。',winnerByUseCase:{writing:'claude',workspace:'gemini'}},
    {slug:'kimi-vs-doubao',title:'Kimi vs Doubao',tools:['kimi','doubao'],summary:'学习研究与日常办公的不同路径。',winnerByUseCase:{study:'kimi',daily:'doubao'}},
    {slug:'midjourney-vs-runway',title:'Midjourney vs Runway',tools:['midjourney','runway'],summary:'静态图像与动态视频创作工具对比。',winnerByUseCase:{image:'midjourney',video:'runway'}},
    {slug:'best-ai-chat-tools-for-chinese-users',title:'Best AI Chat Tools for Chinese Users',tools:['deepseek','kimi','doubao','chatgpt'],summary:'中文用户聊天/写作工具综合建议。',winnerByUseCase:{beginners:'doubao',research:'kimi',developers:'deepseek'}},
    {slug:'best-ai-video-tools-for-creators',title:'Best AI Video Tools for Creators',tools:['kling','jimeng','runway'],summary:'内容创作者视频生成工具选择。',winnerByUseCase:{shortVideo:'jimeng',quality:'runway',cnAccess:'kling'}}
  ],
  useCases:[
    {slug:'ai-tools-for-content-creators',title:'AI tools for content creators',description:'面向短视频、图文和直播团队的 AI 创作工具组合。',tools:['chatgpt','kling','jimeng','runway']},
    {slug:'ai-tools-for-students',title:'AI tools for students',description:'论文、作业、资料整理高频场景推荐。',tools:['kimi','deepseek','chatgpt']},
    {slug:'ai-tools-for-marketers',title:'AI tools for marketers',description:'选题、广告素材、投放文案和复盘效率提升。',tools:['chatgpt','jimeng','doubao']},
    {slug:'ai-tools-for-coding',title:'AI tools for coding',description:'代码生成、调试和技术文档辅助。',tools:['deepseek','chatgpt','claude']},
    {slug:'ai-tools-for-designers',title:'AI tools for designers',description:'品牌视觉、海报和概念草图推荐。',tools:['midjourney','jimeng','chatgpt']},
    {slug:'ai-tools-for-video-creation',title:'AI tools for video creation',description:'脚本、镜头、生成、剪辑的一站式路线。',tools:['kling','runway','jimeng']},
    {slug:'ai-tools-for-writing',title:'AI tools for writing',description:'写作、润色、结构优化工具清单。',tools:['chatgpt','claude','kimi']},
    {slug:'free-ai-tools',title:'Free AI tools',description:'预算有限时优先使用的免费/免费增值工具。',tools:['doubao','deepseek','kimi']},
    {slug:'china-accessible-ai-tools',title:'China-accessible AI tools',description:'国内可直接使用或低门槛访问的工具合集。',tools:['deepseek','doubao','kimi','kling','jimeng']},
    {slug:'ai-tools-for-small-business',title:'AI tools for small business',description:'中小团队增长、客服、内容运营提效。',tools:['chatgpt','doubao','kling']}
  ],
  categories:[
    {slug:'chat',title:'AI 聊天工具',description:'适合问答、写作、总结和研究场景。'},
    {slug:'image',title:'AI 绘图工具',description:'适合视觉创意、封面设计、海报生成。'},
    {slug:'video',title:'AI 视频工具',description:'适合短视频脚本、生成和后期。'},
    {slug:'audio',title:'AI 音频工具',description:'配音、音色克隆和播客制作。'},
    {slug:'productivity',title:'AI 生产力工具',description:'帮助团队自动化与效率提升。'},
    {slug:'design',title:'AI 设计工具',description:'用于 UI/品牌/视觉概念迭代。'}
  ],
  rankings:[
    {slug:'best-ai-tools-2026',title:'Best AI Tools 2026',description:'2026 年最值得关注的全球+中国 AI 工具榜单。',tools:['chatgpt','deepseek','kimi','kling','runway']},
    {slug:'best-free-ai-tools',title:'Best Free AI Tools',description:'免费或低成本工具优先推荐榜。',tools:['doubao','deepseek','kimi','chatgpt']},
    {slug:'best-ai-video-tools',title:'Best AI Video Tools',description:'创作者最常用的视频生成/编辑工具。',tools:['kling','runway','jimeng']},
    {slug:'best-china-ai-tools',title:'Best China AI Tools',description:'中国用户可用性优先榜单。',tools:['deepseek','doubao','kimi','jimeng','kling']}
  ]
};
