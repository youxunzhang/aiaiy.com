/**
 * 首页LOGO管理系统
 * 为首页的链接板块获取和显示品牌LOGO
 */

class HomepageLogoManager {
    constructor() {
        this.logoCache = {};
        this.loadFromLocalStorage();
        this.initializeLogoMappings();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('homepageLogoCache');
            if (cached) {
                this.logoCache = JSON.parse(cached);
            }
        } catch (error) {
            console.warn('Failed to load homepage logo cache from localStorage:', error);
        }
    }

    /**
     * 保存LOGO缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            localStorage.setItem('homepageLogoCache', JSON.stringify(this.logoCache));
        } catch (error) {
            console.warn('Failed to save homepage logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化LOGO映射
     */
    initializeLogoMappings() {
        // 预定义的高质量LOGO映射
        this.logoMappings = {
            // AI Foundation Models
            'deepseek.com': 'https://chat.deepseek.com/favicon.ico',
            'chat.deepseek.com': 'https://chat.deepseek.com/favicon.ico',
            'google.com': 'https://www.google.com/favicon.ico',
            'gemini.google.com': 'https://www.google.com/favicon.ico',
            'perplexity.ai': 'https://www.perplexity.ai/favicon.ico',
            'www.perplexity.ai': 'https://www.perplexity.ai/favicon.ico',
            'chatbot.app': 'https://chat.chatbot.app/favicon.ico',
            'chat.chatbot.app': 'https://chat.chatbot.app/favicon.ico',
            'claude.ai': 'https://claude.ai/favicon.ico',
            // 备用高质量LOGO
            'deepseek': 'https://chat.deepseek.com/favicon.ico',
            'gemini': 'https://www.google.com/favicon.ico',
            'perplexity': 'https://www.perplexity.ai/favicon.ico',
            'chatbot': 'https://chat.chatbot.app/favicon.ico',
            'claude': 'https://claude.ai/favicon.ico',
            
            // Website Services
            'cloudflare.com': 'https://www.cloudflare.com/favicon.ico',
            'vercel.com': 'https://vercel.com/favicon.ico',
            'domain.com': 'https://www.domain.com/favicon.ico',
            'github.com': 'https://github.com/favicon.ico',
            
            // Make Money Online
            'adsense.google.com': 'https://adsense.google.com/favicon.ico',
            'analytics.google.com': 'https://analytics.google.com/favicon.ico',
            'trends.google.com': 'https://trends.google.com/favicon.ico',
            'search.google.com': 'https://search.google.com/favicon.ico',
            'spaceship.com': 'https://www.spaceship.com/favicon.ico',
            'similarweb.com': 'https://www.similarweb.com/favicon.ico',
            
            // Social Media
            'x.com': 'https://x.com/favicon.ico',
            'instagram.com': 'https://www.instagram.com/favicon.ico',
            'facebook.com': 'https://www.facebook.com/favicon.ico',
            
            // 广告联盟
            'monetag.com': 'https://monetag.com/favicon.ico',
            'propellerads.com': 'https://propellerads.com/favicon.ico',
            'media.net': 'https://www.media.net/favicon.ico',
            'adsterra.com': 'https://adsterra.com/favicon.ico',
            

        };
    }

    /**
     * 获取域名
     */
    getDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.replace('www.', '');
        } catch (error) {
            return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
        }
    }

    /**
     * 获取LOGO URL
     */
    async getLogoUrl(domain) {
        // 检查缓存
        if (this.logoCache[domain]) {
            return this.logoCache[domain];
        }

        // 检查预定义映射
        if (this.logoMappings[domain]) {
            const logoUrl = this.logoMappings[domain];
            this.logoCache[domain] = logoUrl;
            this.saveToLocalStorage();
            return logoUrl;
        }

        // 尝试获取favicon
        const faviconUrl = `https://${domain}/favicon.ico`;
        try {
            const response = await fetch(faviconUrl, { method: 'HEAD' });
            if (response.ok) {
                this.logoCache[domain] = faviconUrl;
                this.saveToLocalStorage();
                return faviconUrl;
            }
        } catch (error) {
            console.warn(`Failed to fetch favicon for ${domain}:`, error);
        }

        return null;
    }

    /**
     * 获取LOGO数据
     */
    async getLogo(domain) {
        const logoUrl = await this.getLogoUrl(domain);
        if (!logoUrl) {
            return null;
        }

        try {
            const response = await fetch(logoUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const reader = new FileReader();
            
            return new Promise((resolve) => {
                reader.onload = () => {
                    resolve({
                        dataUrl: reader.result,
                        domain: domain
                    });
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn(`Failed to fetch logo for ${domain}:`, error);
            return null;
        }
    }

    /**
     * 创建LOGO背景HTML
     */
    createLogoBackgroundHtml(logoData, domain) {
        if (!logoData) {
            return '';
        }

        return `
            <div class="tool-logo-bg" title="${domain}" style="background-image: url('${logoData.dataUrl}');"></div>
        `;
    }

    /**
     * 获取备用图标
     */
    getFallbackIcon(domain) {
        const fallbackIcons = {
            'deepseek.com': '🔍',
            'google.com': '🔍',
            'perplexity.ai': '🤔',
            'chatbot.app': '💬',
            'claude.ai': '🧠',
            'cloudflare.com': '☁️',
            'vercel.com': '▲',
            'domain.com': '🌐',
            'github.com': '📦',
            'adsense.google.com': '💰',
            'analytics.google.com': '📊',
            'trends.google.com': '📈',
            'search.google.com': '🔍',
            'spaceship.com': '🚀',
            'similarweb.com': '📊',
            'x.com': '𝕏',
            'instagram.com': '📷',
            'facebook.com': '📘',
            'monetag.com': '💎',
            'propellerads.com': '⚡',
            'media.net': '📰',
            'adsterra.com': '🌍',

        };

        return fallbackIcons[domain] || '🌐';
    }

    /**
     * 更新单个链接的LOGO背景
     */
    async updateLinkLogoBackground(linkElement) {
        const href = linkElement.getAttribute('href');
        if (!href) return;

        const domain = this.getDomain(href);
        const logoData = await this.getLogo(domain);
        
        // 查找或创建LOGO背景容器
        let logoBgContainer = linkElement.querySelector('.tool-logo-bg');
        if (!logoBgContainer) {
            logoBgContainer = document.createElement('div');
            logoBgContainer.className = 'tool-logo-bg';
            linkElement.insertBefore(logoBgContainer, linkElement.firstChild);
        }

        // 查找或创建内容容器
        let contentContainer = linkElement.querySelector('.tool-content');
        if (!contentContainer) {
            contentContainer = document.createElement('div');
            contentContainer.className = 'tool-content';
            
            // 将原有的内容移动到content容器中
            const originalContent = Array.from(linkElement.children).filter(child => 
                !child.classList.contains('tool-logo-bg')
            );
            originalContent.forEach(child => contentContainer.appendChild(child));
            linkElement.appendChild(contentContainer);
        }

        logoBgContainer.innerHTML = this.createLogoBackgroundHtml(logoData, domain);
    }

    /**
     * 更新所有链接的LOGO背景
     */
    async updateAllLogoBackgrounds() {
        const links = document.querySelectorAll('.tool-card');
        
        for (const link of links) {
            await this.updateLinkLogoBackground(link);
            // 添加小延迟避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.logoCache = {};
        localStorage.removeItem('homepageLogoCache');
        console.log('Homepage logo cache cleared');
    }

    /**
     * 导出缓存
     */
    exportCache() {
        return JSON.stringify(this.logoCache, null, 2);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const logoManager = new HomepageLogoManager();
    logoManager.updateAllLogoBackgrounds();
    
    // 将实例挂载到全局，方便调试
    window.homepageLogoManager = logoManager;
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageLogoManager;
}
