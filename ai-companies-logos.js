/**
 * AI公司页面LOGO背景管理器
 * 为每个公司卡片添加品牌LOGO作为背景
 */

class AICompaniesLogoManager {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeCompanyMappings();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('aiCompaniesLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load AI companies logo cache from localStorage:', error);
        }
    }

    /**
     * 保存LOGO缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('aiCompaniesLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save AI companies logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化公司LOGO映射
     */
    initializeCompanyMappings() {
        // 预定义的公司LOGO映射
        this.companyMappings = {
            // 大模型与AI基础模型
            'openai.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
                fallback: '🤖'
            },
            'anthropic.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png',
                fallback: '🧠'
            },
            'ai.google': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '🔍'
            },
            'microsoft.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
                fallback: '🪟'
            },
            'ai.meta.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
                fallback: '📘'
            },
            'cohere.ai': {
                url: 'https://cohere.ai/favicon.ico',
                fallback: '🔗'
            },

            // 云计算与AI平台
            'aws.amazon.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png',
                fallback: '☁️'
            },
            'cloud.google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '🔍'
            },
            'azure.microsoft.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
                fallback: '🪟'
            },
            'ibm.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1200px-IBM_logo.svg.png',
                fallback: '💼'
            },
            'oracle.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/1200px-Oracle_logo.svg.png',
                fallback: '🗄️'
            },
            'aliyun.com': {
                url: 'https://www.aliyun.com/favicon.ico',
                fallback: '☁️'
            },

            // AI芯片与硬件
            'nvidia.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/1200px-Nvidia_logo.svg.png',
                fallback: '🎮'
            },
            'intel.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282020%2C_light_blue%29.svg/1200px-Intel_logo_%282020%2C_light_blue%29.svg.png',
                fallback: '🔧'
            },
            'amd.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AMD_Logo.svg/1200px-AMD_Logo.svg.png',
                fallback: '⚡'
            },
            'qualcomm.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Qualcomm_logo.svg/1200px-Qualcomm_logo.svg.png',
                fallback: '📱'
            },
            'cerebras.net': {
                url: 'https://cerebras.net/favicon.ico',
                fallback: '🧠'
            },
            'graphcore.ai': {
                url: 'https://www.graphcore.ai/favicon.ico',
                fallback: '🔬'
            },

            // AI应用与工具
            'midjourney.com': {
                url: 'https://www.midjourney.com/favicon.ico',
                fallback: '🎨'
            },
            'stability.ai': {
                url: 'https://stability.ai/favicon.ico',
                fallback: '🎭'
            },
            'runwayml.com': {
                url: 'https://runwayml.com/favicon.ico',
                fallback: '🎬'
            },
            'notion.so': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Notion_app_logo.png/1200px-Notion_app_logo.png',
                fallback: '📝'
            },
            'grammarly.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Grammarly_logo.svg/1200px-Grammarly_logo.svg.png',
                fallback: '✍️'
            },
            'jasper.ai': {
                url: 'https://www.jasper.ai/favicon.ico',
                fallback: '🤖'
            },

            // 自动驾驶与机器人
            'tesla.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/1200px-Tesla_logo.png',
                fallback: '🚗'
            },
            'waymo.com': {
                url: 'https://waymo.com/favicon.ico',
                fallback: '🚙'
            },
            'getcruise.com': {
                url: 'https://getcruise.com/favicon.ico',
                fallback: '🚗'
            },
            'bostondynamics.com': {
                url: 'https://www.bostondynamics.com/favicon.ico',
                fallback: '🤖'
            },
            'figure.ai': {
                url: 'https://figure.ai/favicon.ico',
                fallback: '🤖'
            },
            'agilityrobotics.com': {
                url: 'https://agilityrobotics.com/favicon.ico',
                fallback: '🏃'
            },

            // 医疗健康AI
            'deepmind.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Deepmind_logo.svg/1200px-Deepmind_logo.svg.png',
                fallback: '🧠'
            },
            'tempus.com': {
                url: 'https://www.tempus.com/favicon.ico',
                fallback: '🏥'
            },
            'insitro.com': {
                url: 'https://insitro.com/favicon.ico',
                fallback: '🧬'
            },
            'atomwise.com': {
                url: 'https://www.atomwise.com/favicon.ico',
                fallback: '🔬'
            },
            'butterflynetwork.com': {
                url: 'https://butterflynetwork.com/favicon.ico',
                fallback: '🩺'
            },
            'babylonhealth.com': {
                url: 'https://www.babylonhealth.com/favicon.ico',
                fallback: '💊'
            },

            // 金融科技AI
            'palantir.com': {
                url: 'https://www.palantir.com/favicon.ico',
                fallback: '📊'
            },
            'databricks.com': {
                url: 'https://databricks.com/favicon.ico',
                fallback: '💾'
            },
            'snowflake.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Snowflake_Logo.svg/1200px-Snowflake_Logo.svg.png',
                fallback: '❄️'
            },
            'stripe.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Stripe_logo%2C_revised_2016.svg/1200px-Stripe_logo%2C_revised_2016.svg.png',
                fallback: '💳'
            },
            'plaid.com': {
                url: 'https://plaid.com/favicon.ico',
                fallback: '🔗'
            },
            'affirm.com': {
                url: 'https://www.affirm.com/favicon.ico',
                fallback: '💰'
            },

            // 教育科技AI
            'duolingo.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Duolingo_logo.svg/1200px-Duolingo_logo.svg.png',
                fallback: '🦉'
            },
            'coursera.org': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Coursera_logo.svg/1200px-Coursera_logo.svg.png',
                fallback: '🎓'
            },
            'khanacademy.org': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Khan_Academy_logo_%282020%29.svg/1200px-Khan_Academy_logo_%282020%29.svg.png',
                fallback: '📚'
            },
            'chegg.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Chegg_logo.svg/1200px-Chegg_logo.svg.png',
                fallback: '📖'
            },
            'byjus.com': {
                url: 'https://byjus.com/favicon.ico',
                fallback: '🎯'
            },
            'vipkid.com': {
                url: 'https://www.vipkid.com/favicon.ico',
                fallback: '🌍'
            },

            // 企业服务AI
            'salesforce.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce_logo.svg/1200px-Salesforce_logo.svg.png',
                fallback: '☁️'
            },
            'hubspot.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/HubSpot_logo.svg/1200px-HubSpot_logo.svg.png',
                fallback: '🎯'
            },
            'slack.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png',
                fallback: '💬'
            },
            'zoom.us': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Zoom_logo.svg/1200px-Zoom_logo.svg.png',
                fallback: '📹'
            },
            'asana.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Asana_logo.svg/1200px-Asana_logo.svg.png',
                fallback: '📋'
            },
            'monday.com': {
                url: 'https://monday.com/favicon.ico',
                fallback: '📅'
            },

            // 中国AI公司
            'ai.baidu.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Baidu_logo.svg/1200px-Baidu_logo.svg.png',
                fallback: '🔍'
            },
            'ai.tencent.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tencent_logo.svg/1200px-Tencent_logo.svg.png',
                fallback: '🐧'
            },
            'volcengine.com': {
                url: 'https://www.volcengine.com/favicon.ico',
                fallback: '🔥'
            },
            'sensetime.com': {
                url: 'https://www.sensetime.com/favicon.ico',
                fallback: '👁️'
            },
            'megvii.com': {
                url: 'https://www.megvii.com/favicon.ico',
                fallback: '👤'
            },
            'yitutech.com': {
                url: 'https://www.yitutech.com/favicon.ico',
                fallback: '🔬'
            }
        };
    }

    /**
     * 获取公司LOGO
     * @param {string} domain - 域名
     * @returns {Promise<string>} LOGO URL或fallback
     */
    async getCompanyLogo(domain) {
        // 检查缓存
        if (this.logoCache.has(domain)) {
            return this.logoCache.get(domain);
        }

        // 检查预定义映射
        if (this.companyMappings[domain]) {
            const logoData = this.companyMappings[domain];
            try {
                const logoUrl = await this.fetchLogo(logoData.url, domain);
                this.logoCache.set(domain, logoUrl);
                this.saveToLocalStorage();
                return logoUrl;
            } catch (error) {
                console.warn(`Failed to fetch logo for ${domain}:`, error);
                const fallback = logoData.fallback;
                this.logoCache.set(domain, fallback);
                this.saveToLocalStorage();
                return fallback;
            }
        }

        // 尝试从网站获取favicon
        try {
            const faviconUrl = await this.getFaviconUrl(domain);
            const logoUrl = await this.fetchLogo(faviconUrl, domain);
            this.logoCache.set(domain, logoUrl);
            this.saveToLocalStorage();
            return logoUrl;
        } catch (error) {
            console.warn(`Failed to get favicon for ${domain}:`, error);
            const fallback = this.getFallbackIcon(domain);
            this.logoCache.set(domain, fallback);
            this.saveToLocalStorage();
            return fallback;
        }
    }

    /**
     * 获取favicon URL
     * @param {string} domain - 域名
     * @returns {Promise<string>} favicon URL
     */
    async getFaviconUrl(domain) {
        const baseUrl = `https://${domain}`;
        const faviconUrls = [
            `${baseUrl}/favicon.ico`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/apple-touch-icon.png`,
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseUrl}&size=64`
        ];

        for (const faviconUrl of faviconUrls) {
            try {
                const response = await fetch(faviconUrl, { 
                    method: 'HEAD',
                    mode: 'no-cors'
                });
                if (response.ok || response.status === 0) {
                    return faviconUrl;
                }
            } catch (error) {
                continue;
            }
        }

        throw new Error('No favicon found');
    }

    /**
     * 获取LOGO图片
     * @param {string} url - LOGO URL
     * @param {string} domain - 域名
     * @returns {Promise<string>} base64编码的图片
     */
    async fetchLogo(url, domain) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            throw new Error(`Failed to fetch logo: ${error.message}`);
        }
    }

    /**
     * 获取fallback图标
     * @param {string} domain - 域名
     * @returns {string} emoji图标
     */
    getFallbackIcon(domain) {
        const fallbackIcons = {
            'openai': '🤖',
            'anthropic': '🧠',
            'google': '🔍',
            'microsoft': '🪟',
            'meta': '📘',
            'amazon': '📦',
            'nvidia': '🎮',
            'intel': '🔧',
            'amd': '⚡',
            'tesla': '🚗',
            'waymo': '🚙',
            'boston': '🤖',
            'deepmind': '🧠',
            'palantir': '📊',
            'databricks': '💾',
            'snowflake': '❄️',
            'stripe': '💳',
            'duolingo': '🦉',
            'coursera': '🎓',
            'khan': '📚',
            'salesforce': '☁️',
            'hubspot': '🎯',
            'slack': '💬',
            'zoom': '📹',
            'baidu': '🔍',
            'tencent': '🐧',
            'sensetime': '👁️',
            'megvii': '👤'
        };

        for (const [key, icon] of Object.entries(fallbackIcons)) {
            if (domain.includes(key)) {
                return icon;
            }
        }

        return '🌐';
    }

    /**
     * 为所有公司卡片添加LOGO背景
     */
    async addLogosToAllCards() {
        const companyCards = document.querySelectorAll('.company-card');
        
        for (const card of companyCards) {
            const domain = card.getAttribute('data-domain');
            if (!domain) continue;

            const logoBg = card.querySelector('.company-logo-bg');
            if (!logoBg) continue;

            // 添加加载状态
            logoBg.classList.add('loading');

            try {
                const logo = await this.getCompanyLogo(domain);
                
                // 移除加载状态
                logoBg.classList.remove('loading');
                
                if (logo.startsWith('data:image')) {
                    // 图片LOGO
                    logoBg.style.backgroundImage = `url(${logo})`;
                } else {
                    // Emoji fallback - 创建渐变背景
                    logoBg.style.background = `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))`;
                    logoBg.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; opacity: 0.3;">${logo}</div>`;
                }
            } catch (error) {
                console.warn(`Failed to add logo for ${domain}:`, error);
                // 移除加载状态，显示fallback
                logoBg.classList.remove('loading');
                logoBg.style.background = `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))`;
                logoBg.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; opacity: 0.3;">🌐</div>`;
            }
        }
    }

    /**
     * 批量获取所有公司LOGO
     */
    async batchFetchAllLogos() {
        const companyCards = document.querySelectorAll('.company-card');
        const domains = Array.from(companyCards)
            .map(card => card.getAttribute('data-domain'))
            .filter(domain => domain);

        const promises = domains.map(async (domain) => {
            try {
                await this.getCompanyLogo(domain);
            } catch (error) {
                console.warn(`Failed to fetch logo for ${domain}:`, error);
            }
        });

        await Promise.allSettled(promises);
        console.log('AI companies logo fetching completed');
    }

    /**
     * 清除LOGO缓存
     */
    clearCache() {
        this.logoCache.clear();
        localStorage.removeItem('aiCompaniesLogoCache');
        console.log('AI companies logo cache cleared');
    }
}

// 创建全局实例
window.aiCompaniesLogoManager = new AICompaniesLogoManager();

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('ai-companies.html')) {
        // 为所有公司卡片添加LOGO背景
        await window.aiCompaniesLogoManager.addLogosToAllCards();
        
        // 可选：批量获取所有LOGO
        // await window.aiCompaniesLogoManager.batchFetchAllLogos();
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AICompaniesLogoManager;
}
