/**
 * 首页工具卡片LOGO背景管理器
 * 为首页各个板块的工具卡片添加对应的品牌LOGO背景
 */

class HomepageToolLogoManager {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeToolMappings();
        this.init();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('homepageToolLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load homepage tool logo cache from localStorage:', error);
        }
    }

    /**
     * 保存LOGO缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('homepageToolLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save homepage tool logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化工具LOGO映射
     */
    initializeToolMappings() {
        // 预定义的工具LOGO映射
        const createLogoConfig = (url, fallback, name) => ({
            url,
            fallback,
            name,
            direct: true // 直接使用远程LOGO，避免跨域fetch导致的加载失败
        });

        const googleLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png';
        const cloudflareLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.svg/512px-Cloudflare_Logo.svg.png';
        const vercelLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/512px-Vercel_logo_black.svg.png';
        const githubLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png';
        const similarwebLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SimilarWeb_logo.svg/512px-SimilarWeb_logo.svg.png';
        const xLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/512px-X_logo_2023_%28white%29.png';
        const instagramLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/512px-Instagram_logo_2016.svg.png';
        const facebookLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Facebook_logo.svg/512px-Facebook_logo.svg.png';
        const deepseekLogoUrl = 'https://chat.deepseek.com/favicon.ico';
        const chatgptLogoUrl = 'https://chatgpt.com/favicon.ico';
        const perplexityLogoUrl = 'https://www.perplexity.ai/favicon.ico';
        const chatbotLogoUrl = 'https://chat.chatbot.app/favicon.ico';
        const claudeLogoUrl = 'https://claude.ai/favicon.ico';
        const grokLogoUrl = 'https://grok.com/favicon.ico';
        const domainLogoUrl = 'https://www.domain.com/favicon.ico';
        const queryDomainsLogoUrl = 'https://query.domains/favicon.ico';
        const spaceshipLogoUrl = 'https://www.spaceship.com/favicon.ico';
        const monetagLogoUrl = 'https://monetag.com/favicon.ico';
        const propellerLogoUrl = 'https://propellerads.com/favicon.ico';
        const mediaNetLogoUrl = 'https://www.media.net/favicon.ico';
        const adsterraLogoUrl = 'https://adsterra.com/favicon.ico';

        this.toolMappings = {
            // AI Foundation Models
            'chat.deepseek.com': createLogoConfig(deepseekLogoUrl, '🔍', 'Deepseek'),
            'deepseek.com': createLogoConfig(deepseekLogoUrl, '🔍', 'Deepseek'),
            'chatgpt.com': createLogoConfig(chatgptLogoUrl, '🤖', 'ChatGPT'),
            'www.chatgpt.com': createLogoConfig(chatgptLogoUrl, '🤖', 'ChatGPT'),
            'gemini.google.com': createLogoConfig(googleLogoUrl, '🔍', 'Google Gemini'),
            'google.com': createLogoConfig(googleLogoUrl, '🔍', 'Google'),
            'www.perplexity.ai': createLogoConfig(perplexityLogoUrl, '🤔', 'Perplexity'),
            'perplexity.ai': createLogoConfig(perplexityLogoUrl, '🤔', 'Perplexity'),
            'chat.chatbot.app': createLogoConfig(chatbotLogoUrl, '💬', 'ChatBot'),
            'chatbot.app': createLogoConfig(chatbotLogoUrl, '💬', 'ChatBot'),
            'claude.ai': createLogoConfig(claudeLogoUrl, '🧠', 'Claude'),
            'grok.com': createLogoConfig(grokLogoUrl, '🤖', 'Grok'),
            'www.grok.com': createLogoConfig(grokLogoUrl, '🤖', 'Grok'),

            // 网站服务
            'cloudflare.com': createLogoConfig(cloudflareLogoUrl, '☁️', 'Cloudflare'),
            'www.cloudflare.com': createLogoConfig(cloudflareLogoUrl, '☁️', 'Cloudflare'),
            'vercel.com': createLogoConfig(vercelLogoUrl, '⚡', 'Vercel'),
            'domain.com': createLogoConfig(domainLogoUrl, '🌐', 'Domain.com'),
            'www.domain.com': createLogoConfig(domainLogoUrl, '🌐', 'Domain.com'),
            'github.com': createLogoConfig(githubLogoUrl, '🐙', 'GitHub'),
            'query.domains': createLogoConfig(queryDomainsLogoUrl, '🧭', 'Query.Domains'),

            // 赚美金工具
            'adsense.google.com': createLogoConfig(googleLogoUrl, '💰', 'Google AdSense'),
            'analytics.google.com': createLogoConfig(googleLogoUrl, '📊', 'Google Analytics'),
            'trends.google.com': createLogoConfig(googleLogoUrl, '📈', 'Google Trends'),
            'search.google.com': createLogoConfig(googleLogoUrl, '🔍', 'Google Search Console'),
            'spaceship.com': createLogoConfig(spaceshipLogoUrl, '🚀', 'Spaceship'),
            'www.spaceship.com': createLogoConfig(spaceshipLogoUrl, '🚀', 'Spaceship'),
            'similarweb.com': createLogoConfig(similarwebLogoUrl, '📊', 'SimilarWeb'),
            'www.similarweb.com': createLogoConfig(similarwebLogoUrl, '📊', 'SimilarWeb'),

            // 社交媒体
            'x.com': createLogoConfig(xLogoUrl, '🐦', 'X (Twitter)'),
            'instagram.com': createLogoConfig(instagramLogoUrl, '📷', 'Instagram'),
            'www.instagram.com': createLogoConfig(instagramLogoUrl, '📷', 'Instagram'),
            'facebook.com': createLogoConfig(facebookLogoUrl, '📘', 'Facebook'),
            'www.facebook.com': createLogoConfig(facebookLogoUrl, '📘', 'Facebook'),

            // 广告平台
            'monetag.com': createLogoConfig(monetagLogoUrl, '💰', 'Monetag'),
            'propellerads.com': createLogoConfig(propellerLogoUrl, '📢', 'PropellerAds'),
            'media.net': createLogoConfig(mediaNetLogoUrl, '📺', 'Media.net'),
            'www.media.net': createLogoConfig(mediaNetLogoUrl, '📺', 'Media.net'),
            'adsterra.com': createLogoConfig(adsterraLogoUrl, '📈', 'Adsterra')
        };
    }

    /**
     * 初始化
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * 设置首页工具卡片LOGO
     */
    setup() {
        this.addLogosToToolCards();
    }

    /**
     * 为首页工具卡片添加LOGO背景
     */
    async addLogosToToolCards() {
        // 查找所有工具卡片，包括带有modern-card类的
        const toolCards = document.querySelectorAll('.tool-card, .modern-card');
        
        for (const card of toolCards) {
            // 处理两种情况：1) card本身就是链接 2) card包含链接
            let link, href;
            if (card.tagName === 'A') {
                link = card;
                href = card.getAttribute('href');
            } else {
                link = card.querySelector('a');
                href = link ? link.getAttribute('href') : null;
            }
            
            if (!href) continue;

            try {
                const domain = this.extractDomain(href);
                const logo = await this.getLogo(domain, href);
                
                // 创建或获取LOGO背景元素
                let logoBg = card.querySelector('.tool-logo-bg');
                if (!logoBg) {
                    logoBg = document.createElement('div');
                    logoBg.className = 'tool-logo-bg';
                    card.insertBefore(logoBg, card.firstChild);
                }
                
                if (logo && (logo.startsWith('data:image') || logo.startsWith('http') || logo.startsWith('//'))) {
                    // 图片LOGO
                    logoBg.style.backgroundImage = `url(${logo})`;
                    logoBg.style.background = 'none';
                    logoBg.innerHTML = '';
                } else if (logo) {
                    // Emoji fallback - 创建渐变背景
                    logoBg.style.backgroundImage = 'none';
                    logoBg.style.background = `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))`;
                    logoBg.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.75rem; opacity: 0.35;">${logo}</div>`;
                }
                
                console.log(`✅ 成功为 ${domain} 添加LOGO背景`);
            } catch (error) {
                console.warn(`Failed to add logo for ${href}:`, error);
            }
        }
    }

    /**
     * 获取网站LOGO
     * @param {string} domain - 域名
     * @param {string} url - 完整URL
     * @returns {Promise<string>} LOGO数据
     */
    async getLogo(domain, url = '') {
        // 检查缓存
        if (this.logoCache.has(domain)) {
            return this.logoCache.get(domain);
        }

        // 检查预定义映射
        if (this.toolMappings[domain]) {
            const logoData = this.toolMappings[domain];
            const { url, fallback, direct } = logoData;

            if (direct) {
                this.logoCache.set(domain, url);
                this.saveToLocalStorage();
                return url;
            }

            try {
                const logoUrl = await this.fetchLogo(url, domain);
                this.logoCache.set(domain, logoUrl);
                this.saveToLocalStorage();
                return logoUrl;
            } catch (error) {
                console.warn(`Failed to fetch logo for ${domain}:`, error);
                this.logoCache.set(domain, fallback);
                this.saveToLocalStorage();
                return fallback;
            }
        }

        // 尝试从网站获取favicon
        try {
            const faviconUrl = await this.getFaviconUrl(domain, url);
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
     * 获取fallback图标
     * @param {string} domain - 域名
     * @returns {string} emoji图标
     */
    getFallbackIcon(domain) {
        const fallbackIcons = {
            'deepseek': '🔍',
            'google': '🔍',
            'perplexity': '🤔',
            'chatbot': '💬',
            'chatgpt': '🤖',
            'claude': '🧠',
            'grok': '🤖',
            'cloudflare': '☁️',
            'vercel': '⚡',
            'domain': '🌐',
            'query': '🧭',
            'github': '🐙',
            'adsense': '💰',
            'analytics': '📊',
            'trends': '📈',
            'search': '🔍',
            'spaceship': '🚀',
            'similarweb': '📊',
            'instagram': '📷',
            'facebook': '📘',
            'twitter': '🐦',
            'x.com': '🐦',
            'monetag': '💰',
            'propeller': '📢',
            'media': '📺',
            'adsterra': '📈'
        };

        for (const [key, icon] of Object.entries(fallbackIcons)) {
            if (domain.includes(key)) {
                return icon;
            }
        }

        return '🌐';
    }

    /**
     * 提取域名
     * @param {string} url - URL
     * @returns {string} 域名
     */
    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (error) {
            // 如果不是完整URL，尝试直接使用
            return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        }
    }

    /**
     * 批量获取所有首页LOGO
     */
    async batchFetchAllLogos() {
        const toolCards = document.querySelectorAll('.tool-card');
        const domains = new Set();
        
        toolCards.forEach(card => {
            const link = card.querySelector('a') || card;
            const href = link.getAttribute('href');
            if (href) {
                domains.add(this.extractDomain(href));
            }
        });

        const promises = Array.from(domains).map(async (domain) => {
            try {
                await this.getLogo(domain);
            } catch (error) {
                console.warn(`Failed to fetch logo for ${domain}:`, error);
            }
        });

        await Promise.allSettled(promises);
        console.log('Homepage tool logo fetching completed');
    }

    /**
     * 清除LOGO缓存
     */
    clearCache() {
        this.logoCache.clear();
        localStorage.removeItem('homepageToolLogoCache');
        console.log('Homepage tool logo cache cleared');
    }
}

// 创建全局实例
window.homepageToolLogoManager = new HomepageToolLogoManager();

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // 为首页所有工具卡片添加LOGO背景
        await window.homepageToolLogoManager.addLogosToToolCards();
        
        // 可选：批量获取所有LOGO
        // await window.homepageToolLogoManager.batchFetchAllLogos();
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageToolLogoManager;
}

