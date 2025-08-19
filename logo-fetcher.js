/**
 * LOGO获取和存储系统
 * 用于获取真实LOGO并存储在本地
 */

class LogoFetcher {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeLogoMappings();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('logoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load logo cache from localStorage:', error);
        }
    }

    /**
     * 保存LOGO缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('logoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化LOGO映射
     */
    initializeLogoMappings() {
        // 预定义的LOGO映射
        this.logoMappings = {
            // AI公司LOGO
            'openai.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
                fallback: '🤖'
            },
            'anthropic.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png',
                fallback: '🧠'
            },
            'google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '🔍'
            },
            'microsoft.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
                fallback: '🪟'
            },
            'meta.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
                fallback: '📘'
            },
            'amazon.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
                fallback: '📦'
            },
            'deepseek.com': {
                url: 'https://www.deepseek.com/favicon.ico',
                fallback: '🔍'
            },
            'perplexity.ai': {
                url: 'https://www.perplexity.ai/favicon.ico',
                fallback: '🤔'
            },
            'claude.ai': {
                url: 'https://claude.ai/favicon.ico',
                fallback: '🧠'
            },
            'chatbot.app': {
                url: 'https://chatbot.app/favicon.ico',
                fallback: '💬'
            },
            'gemini.google.com': {
                url: 'https://gemini.google.com/favicon.ico',
                fallback: '🔍'
            }
        };
    }

    /**
     * 获取网站LOGO
     * @param {string} domain - 域名
     * @param {string} url - 完整URL
     * @returns {Promise<string>} LOGO HTML
     */
    async getLogo(domain, url = '') {
        // 检查缓存
        if (this.logoCache.has(domain)) {
            return this.createLogoHtml(this.logoCache.get(domain), domain);
        }

        // 检查预定义映射
        if (this.logoMappings[domain]) {
            const logoData = this.logoMappings[domain];
            try {
                const logoUrl = await this.fetchLogo(logoData.url, domain);
                this.logoCache.set(domain, logoUrl);
                this.saveToLocalStorage();
                return this.createLogoHtml(logoUrl, domain);
            } catch (error) {
                console.warn(`Failed to fetch logo for ${domain}:`, error);
                return this.createLogoHtml(logoData.fallback, domain);
            }
        }

        // 尝试从网站获取favicon
        try {
            const faviconUrl = await this.getFaviconUrl(domain, url);
            const logoUrl = await this.fetchLogo(faviconUrl, domain);
            this.logoCache.set(domain, logoUrl);
            this.saveToLocalStorage();
            return this.createLogoHtml(logoUrl, domain);
        } catch (error) {
            console.warn(`Failed to get favicon for ${domain}:`, error);
            const fallback = this.getFallbackIcon(domain);
            this.logoCache.set(domain, fallback);
            this.saveToLocalStorage();
            return this.createLogoHtml(fallback, domain);
        }
    }

    /**
     * 获取favicon URL
     * @param {string} domain - 域名
     * @param {string} url - 完整URL
     * @returns {Promise<string>} favicon URL
     */
    async getFaviconUrl(domain, url = '') {
        const baseUrl = url || `https://${domain}`;
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
     * 创建LOGO HTML
     * @param {string} logoData - LOGO数据（base64或emoji）
     * @param {string} domain - 域名
     * @returns {string} LOGO HTML
     */
    createLogoHtml(logoData, domain) {
        if (logoData.startsWith('data:image')) {
            // 图片LOGO
            return `
                <div class="logo-container w-12 h-12 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <img src="${logoData}" alt="${domain} logo" class="w-full h-full object-contain" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-logo w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg" style="display: none;">
                        ${this.getFallbackIcon(domain)}
                    </div>
                </div>
            `;
        } else {
            // Emoji fallback
            return `
                <div class="logo-container w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    ${logoData}
                </div>
            `;
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
            'deepseek': '🔍',
            'perplexity': '🤔',
            'claude': '🧠',
            'chatbot': '💬',
            'gemini': '🔍'
        };

        for (const [key, icon] of Object.entries(fallbackIcons)) {
            if (domain.includes(key)) {
                return icon;
            }
        }

        return '🌐';
    }

    /**
     * 为页面元素添加LOGO
     * @param {string} selector - 选择器
     * @param {Array} items - 项目数组
     */
    async addLogosToElements(selector, items) {
        const containers = document.querySelectorAll(selector);
        
        for (let i = 0; i < containers.length && i < items.length; i++) {
            const container = containers[i];
            const item = items[i];
            
            try {
                const logoHtml = await this.getLogo(item.domain, item.url);
                
                // 查找或创建LOGO容器
                let logoContainer = container.querySelector('.logo-container');
                if (!logoContainer) {
                    logoContainer = document.createElement('div');
                    logoContainer.className = 'logo-container';
                    container.insertBefore(logoContainer, container.firstChild);
                }
                
                logoContainer.innerHTML = logoHtml;
            } catch (error) {
                console.warn(`Failed to add logo for ${item.domain}:`, error);
            }
        }
    }

    /**
     * 批量获取LOGO
     * @param {Array} items - 项目数组
     */
    async batchFetchLogos(items) {
        const promises = items.map(async (item) => {
            try {
                await this.getLogo(item.domain, item.url);
            } catch (error) {
                console.warn(`Failed to fetch logo for ${item.domain}:`, error);
            }
        });

        await Promise.allSettled(promises);
        console.log('Logo fetching completed');
    }

    /**
     * 清除LOGO缓存
     */
    clearCache() {
        this.logoCache.clear();
        localStorage.removeItem('logoCache');
        console.log('Logo cache cleared');
    }

    /**
     * 导出LOGO缓存
     */
    exportCache() {
        const cacheObj = Object.fromEntries(this.logoCache);
        const dataStr = JSON.stringify(cacheObj, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'logo-cache.json';
        link.click();
    }
}

// 创建全局实例
window.logoFetcher = new LogoFetcher();

// 预定义的项目数据
window.logoItems = {
    // AI公司数据
    aiCompanies: [
        { domain: 'openai.com', url: 'https://openai.com', title: 'OpenAI' },
        { domain: 'anthropic.com', url: 'https://anthropic.com', title: 'Anthropic' },
        { domain: 'google.com', url: 'https://google.com', title: 'Google' },
        { domain: 'microsoft.com', url: 'https://microsoft.com', title: 'Microsoft' },
        { domain: 'meta.com', url: 'https://meta.com', title: 'Meta' },
        { domain: 'amazon.com', url: 'https://amazon.com', title: 'Amazon' },
        { domain: 'deepseek.com', url: 'https://deepseek.com', title: 'DeepSeek' },
        { domain: 'perplexity.ai', url: 'https://perplexity.ai', title: 'Perplexity AI' },
        { domain: 'claude.ai', url: 'https://claude.ai', title: 'Claude AI' },
        { domain: 'chatbot.app', url: 'https://chatbot.app', title: 'ChatBot' },
        { domain: 'gemini.google.com', url: 'https://gemini.google.com', title: 'Google Gemini' }
    ],

    // AI工具数据
    aiTools: [
        { domain: 'deepseek.com', url: 'https://chat.deepseek.com/', title: 'DeepSeek Chat' },
        { domain: 'google.com', url: 'https://gemini.google.com/app', title: 'Google Gemini' },
        { domain: 'perplexity.ai', url: 'https://www.perplexity.ai/', title: 'Perplexity AI' },
        { domain: 'chatbot.app', url: 'https://chat.chatbot.app/', title: 'ChatBot' },
        { domain: 'claude.ai', url: 'https://claude.ai/', title: 'Claude AI' },
        { domain: 'openai.com', url: 'https://chat.openai.com/', title: 'ChatGPT' }
    ]
};

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', async function() {
    // 为AI公司页面添加LOGO
    if (window.location.pathname.includes('ai-companies.html')) {
        await window.logoFetcher.addLogosToElements('.company-card', window.logoItems.aiCompanies);
    }
    
    // 为首页AI工具添加LOGO
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        await window.logoFetcher.addLogosToElements('.tool-card', window.logoItems.aiTools);
    }

    // 批量获取LOGO（可选）
    // await window.logoFetcher.batchFetchLogos([...window.logoItems.aiCompanies, ...window.logoItems.aiTools]);
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoFetcher;
}
