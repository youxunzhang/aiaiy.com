/**
 * 页面介绍和FAQ组件
 * 为每个页面提供详细的使用说明和常见问题解答
 */

class PageIntroductions {
    constructor() {
        this.introductions = {
            'index.html': {
                title: 'AI工具导航 - 最全面的人工智能工具集合',
                description: 'AI工具导航是专业的人工智能工具导航网站，收录最全面的AI工具，包括大模型、AI图片处理、AI视频制作、AI文字处理、AI音乐、AI设计师工具等，帮助您快速找到最适合的AI助手和工具。',
                features: [
                    '🤖 主流AI大模型：DeepSeek、Google Gemini、Perplexity等',
                    '🌐 网站服务：Cloudflare、Vercel、GitHub等',
                    '💰 赚美金工具：Google AdSense、Analytics、Trends等',
                    '📱 社交媒体：X、Instagram、Facebook等',
                    '💎 广告联盟：Monetag、PropellerAds、Media.net等'
                ],
                faq: [
                    {
                        question: '这个网站收录了多少个AI工具？',
                        answer: '目前收录了超过50个主流AI工具和网站，涵盖AI大模型、网站服务、赚钱工具、社交媒体等多个领域，持续更新中。'
                    },
                    {
                        question: '如何快速找到我需要的AI工具？',
                        answer: '网站按功能分类，您可以根据需求选择对应板块，每个工具都有详细说明和使用指南。'
                    },
                    {
                        question: '这些工具都是免费的吗？',
                        answer: '网站收录的工具包括免费和付费版本，具体费用请查看各工具的官方网站。'
                    },
                    {
                        question: '如何推荐新的AI工具？',
                        answer: '如果您发现优秀的AI工具，欢迎通过社交媒体联系我们，我们会认真评估后添加到导航中。'
                    }
                ]
            },
            'aiagent.html': {
                title: 'AI智能体网站导航',
                description: 'AI智能体（AI Agent）是能够自主执行任务的AI系统，本页面收录了主流的AI智能体平台和工具，帮助您探索前沿的AI应用。',
                features: [
                    '🤖 AgentGPT：自动化AI智能体创建与执行平台',
                    '⚡ AutoGPT：开源AI智能体项目，支持多任务自动执行',
                    '🚀 Coze：腾讯出品的AI智能体平台，支持多场景应用',
                    '🔧 智能体开发：提供完整的智能体创建和管理工具',
                    '📊 任务自动化：支持复杂任务的自动规划和执行'
                ],
                faq: [
                    {
                        question: '什么是AI智能体？',
                        answer: 'AI智能体是能够感知环境、做出决策并执行行动的AI系统，可以自主完成复杂任务，如数据分析、内容创作、自动化操作等。'
                    },
                    {
                        question: 'AI智能体与传统AI工具有什么区别？',
                        answer: '传统AI工具通常需要人工输入指令，而AI智能体能够自主规划任务步骤，持续执行直到完成任务目标。'
                    },
                    {
                        question: '如何选择合适的AI智能体平台？',
                        answer: '根据您的具体需求选择：AgentGPT适合快速创建智能体，AutoGPT适合开发者，Coze适合企业级应用。'
                    },
                    {
                        question: 'AI智能体可以完成哪些任务？',
                        answer: '包括但不限于：数据分析、内容创作、网站开发、自动化测试、客户服务、市场调研等。'
                    }
                ]
            },
            'aicontent.html': {
                title: 'AI内容检测与小红书工具导航',
                description: '收录主流AI内容检测工具及小红书常用第三方工具，帮助内容创作者提高内容质量和效率。',
                features: [
                    '🔍 Content at Scale Detector：主流AI内容检测工具，支持多语言检测',
                    '📝 GPTZero：AI生成内容检测工具，适合教育和内容审核',
                    '📱 小红书卡片生成：Markdown转小红书卡片工具，便捷内容创作',
                    '✅ 内容质量检测：确保内容原创性和质量',
                    '🎨 格式优化：提升内容视觉效果和用户体验'
                ],
                faq: [
                    {
                        question: '为什么需要AI内容检测？',
                        answer: 'AI内容检测可以帮助识别AI生成的内容，确保内容的原创性和真实性，对于教育、出版、内容审核等领域非常重要。'
                    },
                    {
                        question: '这些检测工具的准确率如何？',
                        answer: '主流检测工具的准确率通常在90%以上，但建议结合人工判断，因为AI技术不断发展，检测工具也在持续改进。'
                    },
                    {
                        question: '小红书卡片生成工具有什么优势？',
                        answer: '可以将Markdown格式快速转换为小红书卡片，节省排版时间，提升内容创作效率。'
                    },
                    {
                        question: '如何提高内容的原创性？',
                        answer: '建议结合个人经验和观点，使用AI工具辅助创作而非完全依赖，保持内容的独特性和价值。'
                    }
                ]
            },
            'ailearn.html': {
                title: 'AI学习网站导航',
                description: '收录主流AI学习网站，帮助用户快速找到优质AI学习资源，从入门到进阶的完整学习路径。',
                features: [
                    '🎓 DeepLearning.AI：深度学习专业课程平台',
                    '📚 Coursera：世界顶级大学AI课程集合',
                    '💻 Kaggle：数据科学竞赛和实战项目平台',
                    '📖 系统学习：从基础理论到实战应用',
                    '🏆 项目实践：通过实际项目提升技能'
                ],
                faq: [
                    {
                        question: 'AI学习需要什么基础？',
                        answer: '建议具备基础的数学知识（线性代数、概率统计）和编程基础（Python），但很多平台也提供零基础入门课程。'
                    },
                    {
                        question: '如何制定AI学习计划？',
                        answer: '建议从基础概念开始，逐步学习机器学习、深度学习，然后选择特定领域深入，如计算机视觉、自然语言处理等。'
                    },
                    {
                        question: '哪个平台最适合初学者？',
                        answer: 'Coursera的机器学习课程和DeepLearning.AI的深度学习专项课程都是很好的入门选择，有中文课程和详细指导。'
                    },
                    {
                        question: '如何验证学习效果？',
                        answer: '建议通过Kaggle等平台参与实际项目，完成个人项目作品集，这样可以更好地展示和应用所学知识。'
                    }
                ]
            },
            'ainum.html': {
                title: 'AI数字人网站导航',
                description: '收录主流AI数字人制作平台，帮助用户快速找到专业的数字人创建和定制服务。',
                features: [
                    '👤 Soul Machines：专业数字人创建平台',
                    '🎬 D-ID：AI视频数字人制作工具',
                    '🎭 Synthesia：AI视频生成平台',
                    '🎵 Replica Studios：AI语音合成服务',
                    '🎨 数字人定制：支持个性化数字人创建'
                ],
                faq: [
                    {
                        question: '什么是AI数字人？',
                        answer: 'AI数字人是通过人工智能技术创建的虚拟人物，可以用于视频制作、直播、客服、教育等多种场景。'
                    },
                    {
                        question: '数字人制作需要多长时间？',
                        answer: '根据复杂程度不同，从几小时到几周不等。简单的数字人可以在几小时内完成，复杂的定制数字人可能需要更长时间。'
                    },
                    {
                        question: '数字人的应用场景有哪些？',
                        answer: '包括但不限于：企业宣传、教育培训、直播带货、客服服务、娱乐内容制作等。'
                    },
                    {
                        question: '如何选择合适的数字人平台？',
                        answer: '根据需求选择：Soul Machines适合企业级应用，D-ID适合快速制作，Synthesia适合教育内容，Replica适合语音合成。'
                    }
                ]
            },
            'aioffice.html': {
                title: 'AI办公工具导航',
                description: '收录主流AI办公工具，提升工作效率，让办公更加智能化和自动化。',
                features: [
                    '📝 Notion：全能型协作平台',
                    '💼 飞书：智能办公套件',
                    '📊 WPS AI：智能文档处理',
                    '🤖 AI助手：智能写作、数据分析、会议记录',
                    '🔄 工作流自动化：提升团队协作效率'
                ],
                faq: [
                    {
                        question: 'AI办公工具有哪些优势？',
                        answer: '可以自动化重复性工作，提供智能写作和数据分析，提升团队协作效率，减少人为错误。'
                    },
                    {
                        question: '如何选择合适的AI办公工具？',
                        answer: '根据团队规模和需求选择：小团队可以选择Notion，大企业推荐飞书，文档处理可以选择WPS AI。'
                    },
                    {
                        question: 'AI办公工具的安全性如何？',
                        answer: '主流平台都有完善的安全措施，但建议在使用前了解数据隐私政策，避免上传敏感信息。'
                    },
                    {
                        question: '如何快速上手AI办公工具？',
                        answer: '建议从基础功能开始，逐步探索高级特性，参加官方培训课程，加入用户社区交流经验。'
                    }
                ]
            },
            'aiprompt.html': {
                title: 'AI提示词工具导航',
                description: '收录主流AI提示词工具和平台，帮助用户更好地与AI模型交互，获得更精准的结果。',
                features: [
                    '💡 PromptBase：专业提示词市场',
                    '🎨 FlowGPT：AI提示词社区',
                    '📝 提示词优化：提升AI输出质量',
                    '🔄 模板库：丰富的提示词模板',
                    '📚 学习资源：提示词编写技巧'
                ],
                faq: [
                    {
                        question: '什么是AI提示词？',
                        answer: 'AI提示词是与AI模型交互的指令或问题，好的提示词能够获得更准确、更有用的AI输出结果。'
                    },
                    {
                        question: '如何编写有效的提示词？',
                        answer: '明确目标、提供具体细节、使用清晰的语言、指定输出格式、包含示例和约束条件。'
                    },
                    {
                        question: '提示词工具有什么作用？',
                        answer: '提供优化建议、分享成功案例、提供模板库、帮助用户快速上手AI工具。'
                    },
                    {
                        question: '如何选择合适的提示词？',
                        answer: '根据具体任务选择，参考用户评价和成功率，可以购买专业提示词或学习编写技巧。'
                    }
                ]
            },
            'aitimer.html': {
                title: 'AI时间管理工具导航',
                description: '收录主流AI时间管理工具，帮助用户更好地规划时间，提高工作效率和生活质量。',
                features: [
                    '⏰ 智能日程管理：AI自动规划时间',
                    '📊 时间分析：详细的时间使用报告',
                    '🎯 目标追踪：智能目标设定和进度监控',
                    '🔄 习惯养成：AI辅助习惯培养',
                    '📱 多平台同步：随时随地管理时间'
                ],
                faq: [
                    {
                        question: 'AI时间管理工具有什么优势？',
                        answer: '可以智能分析时间使用模式，自动优化日程安排，提供个性化建议，帮助用户建立更好的时间管理习惯。'
                    },
                    {
                        question: '如何开始使用AI时间管理？',
                        answer: '从记录时间开始，让AI分析使用模式，然后根据建议调整日程，逐步建立个人时间管理系统。'
                    },
                    {
                        question: 'AI时间管理适合所有人吗？',
                        answer: '适合大多数用户，特别是忙碌的职场人士、学生和自由职业者，但需要一定的适应期。'
                    },
                    {
                        question: '如何保持时间管理的持续性？',
                        answer: '设定合理目标，定期回顾和调整，利用AI提醒功能，与朋友或同事分享进度获得支持。'
                    }
                ]
            }
        };
    }

    /**
     * 获取页面介绍内容
     */
    getIntroduction(pageName) {
        return this.introductions[pageName] || this.getDefaultIntroduction();
    }

    /**
     * 获取默认介绍内容
     */
    getDefaultIntroduction() {
        return {
            title: 'AI工具导航',
            description: '专业的AI工具导航网站，帮助您快速找到最适合的AI助手和工具。',
            features: [
                '🔍 智能搜索：快速找到所需工具',
                '📱 移动友好：随时随地访问',
                '🔄 持续更新：及时收录最新工具',
                '💡 使用指南：详细的使用说明'
            ],
            faq: [
                {
                    question: '如何使用这个导航网站？',
                    answer: '浏览不同分类，点击感兴趣的工具链接，查看详细说明和使用指南。'
                },
                {
                    question: '工具会定期更新吗？',
                    answer: '是的，我们会定期更新和添加新的AI工具，确保信息的时效性。'
                }
            ]
        };
    }

    /**
     * 创建介绍HTML
     */
    createIntroductionHTML(pageName) {
        const intro = this.getIntroduction(pageName);
        
        return `
        <!-- 页面介绍和FAQ部分 -->
        <section class="max-w-7xl mx-auto px-4 py-12 mt-20">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                <!-- 页面介绍 -->
                <div class="p-8 border-b border-gray-200">
                    <h2 class="text-3xl font-bold text-gray-900 mb-4">📖 页面介绍</h2>
                    <p class="text-lg text-gray-700 leading-relaxed mb-6">${intro.description}</p>
                    
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">✨ 主要功能</h3>
                    <ul class="space-y-2">
                        ${intro.features.map(feature => `
                            <li class="flex items-start">
                                <span class="text-green-500 mr-2">•</span>
                                <span class="text-gray-700">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <!-- FAQ部分 -->
                <div class="p-8">
                    <h2 class="text-3xl font-bold text-gray-900 mb-6">❓ 常见问题</h2>
                    <div class="space-y-6">
                        ${intro.faq.map((item, index) => `
                            <div class="bg-gray-50 rounded-lg p-6">
                                <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <span class="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">${index + 1}</span>
                                    ${item.question}
                                </h3>
                                <p class="text-gray-700 leading-relaxed">${item.answer}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- 使用建议 -->
                <div class="p-8 bg-gradient-to-r from-blue-50 to-purple-50">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">💡 使用建议</h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-white rounded-lg p-6 shadow-sm">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">🎯 如何开始</h3>
                            <p class="text-gray-700">浏览页面内容，了解各个工具的功能特点，根据您的具体需求选择合适的工具开始使用。</p>
                        </div>
                        <div class="bg-white rounded-lg p-6 shadow-sm">
                            <h3 class="text-lg font-semibold text-gray-800 mb-3">🚀 进阶使用</h3>
                            <p class="text-gray-700">熟悉基础功能后，可以尝试组合使用多个工具，探索更多高级功能和创意应用。</p>
                        </div>
                    </div>
                </div>

                <!-- 联系我们 -->
                <div class="p-8 bg-gray-900 text-white">
                    <h2 class="text-2xl font-bold mb-4">📞 联系我们</h2>
                    <p class="text-gray-300 mb-4">如果您在使用过程中遇到问题，或有任何建议和反馈，欢迎联系我们。</p>
                    <div class="flex flex-wrap gap-4">
                        <a href="mailto:contact@aiaiy.com" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                            📧 发送邮件
                        </a>
                        <a href="https://github.com/your-repo" target="_blank" class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors">
                            📂 GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    /**
     * 自动添加页面介绍
     */
    autoAddIntroduction() {
        const currentPage = this.getCurrentPageName();
        const introHTML = this.createIntroductionHTML(currentPage);
        
        // 查找main标签的结束位置
        const mainElement = document.querySelector('main');
        if (mainElement) {
            mainElement.insertAdjacentHTML('beforeend', introHTML);
        } else {
            // 如果没有main标签，添加到body末尾
            document.body.insertAdjacentHTML('beforeend', introHTML);
        }
    }

    /**
     * 获取当前页面名称
     */
    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        return fileName || 'index.html';
    }
}

// 创建全局实例
window.pageIntroductions = new PageIntroductions();

// 页面加载完成后自动添加介绍
document.addEventListener('DOMContentLoaded', function() {
    window.pageIntroductions.autoAddIntroduction();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageIntroductions;
}
