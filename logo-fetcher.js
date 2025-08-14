/**
 * 网站LOGO获取和展示系统
 * 自动获取网站favicon和logo，并提供统一的展示接口
 */

class LogoFetcher {
    constructor() {
        this.logoCache = new Map();
        this.fallbackIcons = {
            'default': '🤖',
            'ai': '🧠',
            'game': '🎮',
            'tool': '🛠️',
            'social': '📱',
            'news': '📰',
            'shopping': '🛍️',
            'finance': '💰',
            'health': '💪',
            'education': '📚',
            'entertainment': '🎬',
            'music': '🎵',
            'design': '🎨',
            'travel': '✈️',
            'food': '🍔',
            'sport': '⚽',
            'tech': '💻',
            'business': '💼'
        };
    }

    /**
     * 获取网站LOGO
     * @param {string} url - 网站URL
     * @param {string} domain - 域名（可选）
     * @param {string} category - 分类（用于fallback图标）
     * @returns {Promise<string>} - 返回LOGO的HTML字符串
     */
    async getLogo(url, domain = null, category = 'default') {
        if (!url) return this.getFallbackIcon(category);

        // 检查缓存
        const cacheKey = url.toLowerCase();
        if (this.logoCache.has(cacheKey)) {
            return this.logoCache.get(cacheKey);
        }

        try {
            // 提取域名
            const urlDomain = domain || this.extractDomain(url);
            
            // 尝试获取favicon
            const faviconUrl = await this.getFaviconUrl(url, urlDomain);
            
            if (faviconUrl) {
                const logoHtml = this.createLogoHtml(faviconUrl, urlDomain);
                this.logoCache.set(cacheKey, logoHtml);
                return logoHtml;
            }
        } catch (error) {
            console.warn(`Failed to fetch logo for ${url}:`, error);
        }

        // 使用fallback图标
        const fallbackHtml = this.getFallbackIcon(category, urlDomain);
        this.logoCache.set(cacheKey, fallbackHtml);
        return fallbackHtml;
    }

    /**
     * 提取域名
     * @param {string} url 
     * @returns {string}
     */
    extractDomain(url) {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname.replace('www.', '');
        } catch {
            return url.replace(/^https?:\/\//, '').replace('www.', '').split('/')[0];
        }
    }

    /**
     * 获取favicon URL
     * @param {string} url 
     * @param {string} domain 
     * @returns {Promise<string|null>}
     */
    async getFaviconUrl(url, domain) {
        const faviconUrls = [
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
            `https://favicon.ico/${domain}`,
            `https://${domain}/favicon.ico`,
            `https://${domain}/apple-touch-icon.png`,
            `https://${domain}/logo.png`,
            `https://${domain}/logo.svg`
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

        return null;
    }

    /**
     * 创建LOGO HTML
     * @param {string} logoUrl 
     * @param {string} domain 
     * @returns {string}
     */
    createLogoHtml(logoUrl, domain) {
        return `
            <div class="tool-logo" title="${domain}">
                <img src="${logoUrl}" 
                     alt="${domain} logo" 
                     class="w-full h-full object-contain rounded-lg"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
                     loading="lazy">
                <div class="fallback-icon" style="display: none;">
                    ${this.getFallbackIcon('default', domain)}
                </div>
            </div>
        `;
    }

    /**
     * 获取fallback图标
     * @param {string} category 
     * @param {string} domain 
     * @returns {string}
     */
    getFallbackIcon(category, domain = '') {
        const icon = this.fallbackIcons[category] || this.fallbackIcons['default'];
        const initials = this.getInitials(domain);
        
        return `
            <div class="tool-logo fallback-logo" title="${domain}">
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg">
                    ${initials || icon}
                </div>
            </div>
        `;
    }

    /**
     * 获取域名首字母
     * @param {string} domain 
     * @returns {string}
     */
    getInitials(domain) {
        if (!domain) return '';
        const parts = domain.split('.');
        if (parts.length >= 2) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return domain.substring(0, 2).toUpperCase();
    }

    /**
     * 批量更新页面中的LOGO
     * @param {string} selector - 选择器
     * @param {Array} links - 链接数组
     */
    async updatePageLogos(selector, links) {
        const containers = document.querySelectorAll(selector);
        
        for (let i = 0; i < containers.length && i < links.length; i++) {
            const container = containers[i];
            const link = links[i];
            
            // 查找或创建logo容器
            let logoContainer = container.querySelector('.tool-logo');
            if (!logoContainer) {
                logoContainer = document.createElement('div');
                logoContainer.className = 'tool-logo';
                container.insertBefore(logoContainer, container.firstChild);
            }
            
            // 获取并设置logo
            const logoHtml = await this.getLogo(link.url, link.domain, link.category);
            logoContainer.innerHTML = logoHtml;
        }
    }

    /**
     * 为友情链接页面创建LOGO展示
     * @param {Array} links - 链接数组
     */
    async createFriendshipLinksLogos(links) {
        const container = document.querySelector('.link-grid');
        if (!container) return;

        for (const link of links) {
            const logoHtml = await this.getLogo(link.url, link.domain, link.category);
            
            // 查找对应的链接元素并更新
            const linkElement = container.querySelector(`a[href="${link.url}"]`);
            if (linkElement) {
                let logoContainer = linkElement.querySelector('.link-logo');
                if (!logoContainer) {
                    logoContainer = document.createElement('div');
                    logoContainer.className = 'link-logo w-8 h-8 mr-3 flex-shrink-0';
                    linkElement.insertBefore(logoContainer, linkElement.firstChild);
                }
                logoContainer.innerHTML = logoHtml;
            }
        }
    }
}

// 创建全局实例
window.logoFetcher = new LogoFetcher();

// 预定义的链接数据
window.siteLinks = {
    // 友情链接数据
    friendshipLinks: [
        { url: 'https://crossword.best', domain: 'crossword.best', category: 'game' },
        { url: 'https://fruitconnect.online', domain: 'fruitconnect.online', category: 'game' },
        { url: 'https://xingxingren.online', domain: 'xingxingren.online', category: 'social' },
        { url: 'https://tushuguan.online', domain: 'tushuguan.online', category: 'education' },
        { url: 'https://citylibrary.online', domain: 'citylibrary.online', category: 'education' },
        { url: 'https://aiwebsiteprompt.online', domain: 'aiwebsiteprompt.online', category: 'ai' },
        { url: 'https://zhuangzi.blog', domain: 'zhuangzi.blog', category: 'education' },
        { url: 'https://dreamlist.live', domain: 'dreamlist.live', category: 'tool' },
        { url: 'https://zengguofan.online', domain: 'zengguofan.online', category: 'education' },
        { url: 'https://watchbrands.watch', domain: 'watchbrands.watch', category: 'shopping' },
        { url: 'https://rollingsuitcase.online', domain: 'rollingsuitcase.online', category: 'shopping' },
        { url: 'https://airconditioner.blog', domain: 'airconditioner.blog', category: 'tool' },
        { url: 'https://magiccube.online', domain: 'magiccube.online', category: 'game' },
        { url: 'https://tvrepair.cc', domain: 'tvrepair.cc', category: 'tool' },
        { url: 'https://baduanjin.online', domain: 'baduanjin.online', category: 'health' },
        { url: 'https://picturesize.online', domain: 'picturesize.online', category: 'tool' },
        { url: 'https://yinhangka.online', domain: 'yinhangka.online', category: 'finance' },
        { url: 'https://postcode.blog', domain: 'postcode.blog', category: 'tool' },
        { url: 'https://zhiyu.blog', domain: 'zhiyu.blog', category: 'education' },
        { url: 'https://taoteching.online', domain: 'taoteching.online', category: 'education' },
        { url: 'https://zhanzhuang.online', domain: 'zhanzhuang.online', category: 'health' },
        { url: 'https://youxistudio.online', domain: 'youxistudio.online', category: 'entertainment' },
        { url: 'https://roujiamodaizi.online', domain: 'roujiamodaizi.online', category: 'food' },
        { url: 'https://shijian1.online', domain: 'shijian1.online', category: 'tool' },
        { url: 'https://webintimer.online', domain: 'webintimer.online', category: 'tool' },
        { url: 'https://suitcaseservice.online', domain: 'suitcaseservice.online', category: 'tool' },
        { url: 'https://veimg.online', domain: 'veimg.online', category: 'tool' }
    ],

    // AI工具链接数据
    aiTools: [
        { url: 'https://chat.deepseek.com/', domain: 'deepseek.com', category: 'ai' },
        { url: 'https://gemini.google.com/app', domain: 'google.com', category: 'ai' },
        { url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', category: 'ai' },
        { url: 'https://chat.chatbot.app/', domain: 'chatbot.app', category: 'ai' },
        { url: 'https://claude.ai/', domain: 'claude.ai', category: 'ai' },
        { url: 'https://chat.openai.com/', domain: 'openai.com', category: 'ai' }
    ],

    // 首页友情链接数据
    homeFriendshipLinks: [
        { url: 'https://crossword.best', domain: 'crossword.best', category: 'game' },
        { url: 'https://tushuguan.online', domain: 'tushuguan.online', category: 'education' },
        { url: 'https://aiwebsiteprompt.online', domain: 'aiwebsiteprompt.online', category: 'ai' },
        { url: 'https://picturesize.online', domain: 'picturesize.online', category: 'tool' }
    ]
};

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', function() {
    // 为友情链接页面添加LOGO
    if (window.location.pathname.includes('friendship-links.html')) {
        window.logoFetcher.createFriendshipLinksLogos(window.siteLinks.friendshipLinks);
    }
    
    // 为首页AI工具添加LOGO
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.logoFetcher.updatePageLogos('.tool-card', window.siteLinks.aiTools);
        
        // 为首页友情链接添加LOGO
        setTimeout(() => {
            window.logoFetcher.updatePageLogos('.tool-card', window.siteLinks.homeFriendshipLinks);
        }, 1000);
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoFetcher;
}
