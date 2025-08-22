/**
 * Favicon获取工具
 * 专门用于获取网站favicon图标，支持多种获取方式
 */

class FaviconFetcher {
    constructor() {
        this.cache = new Map();
        this.loadCache();
    }

    /**
     * 加载缓存
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('faviconCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load favicon cache:', error);
        }
    }

    /**
     * 保存缓存
     */
    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.cache);
            localStorage.setItem('faviconCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save favicon cache:', error);
        }
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
     * 检查URL是否可访问
     */
    async checkUrl(url) {
        try {
            const response = await fetch(url, { 
                method: 'HEAD',
                mode: 'no-cors'
            });
            return response.ok || response.status === 0;
        } catch (error) {
            return false;
        }
    }

    /**
     * 获取favicon URL列表
     */
    getFaviconUrls(domain) {
        const baseUrl = `https://${domain}`;
        return [
            // 标准favicon路径
            `${baseUrl}/favicon.ico`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/favicon.jpg`,
            
            // Logo路径
            `${baseUrl}/logo.png`,
            `${baseUrl}/logo.jpg`,
            `${baseUrl}/logo.ico`,
            
            // Apple touch icon
            `${baseUrl}/apple-touch-icon.png`,
            `${baseUrl}/apple-touch-icon-precomposed.png`,
            
            // 通用图标路径
            `${baseUrl}/icon.png`,
            `${baseUrl}/icon.jpg`,
            `${baseUrl}/icon.ico`,
            
            // 其他常见路径
            `${baseUrl}/assets/favicon.ico`,
            `${baseUrl}/assets/logo.png`,
            `${baseUrl}/images/favicon.ico`,
            `${baseUrl}/images/logo.png`,
            `${baseUrl}/static/favicon.ico`,
            `${baseUrl}/static/logo.png`,
            
            // 第三方服务
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${baseUrl}&size=64`,
            `https://icons.duckduckgo.com/ip3/${domain}.ico`,
            `https://favicon.yandex.net/favicon/${domain}`,
            `https://api.faviconkit.com/${domain}/64`
        ];
    }

    /**
     * 获取favicon URL
     */
    async getFaviconUrl(domain) {
        // 检查缓存
        if (this.cache.has(domain)) {
            return this.cache.get(domain);
        }

        const faviconUrls = this.getFaviconUrls(domain);
        
        for (const url of faviconUrls) {
            try {
                const isAccessible = await this.checkUrl(url);
                if (isAccessible) {
                    this.cache.set(domain, url);
                    this.saveCache();
                    return url;
                }
            } catch (error) {
                continue;
            }
        }

        return null;
    }

    /**
     * 获取favicon数据
     */
    async getFaviconData(domain) {
        const faviconUrl = await this.getFaviconUrl(domain);
        if (!faviconUrl) {
            return null;
        }

        try {
            const response = await fetch(faviconUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve({
                        dataUrl: reader.result,
                        url: faviconUrl,
                        domain: domain
                    });
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn(`Failed to fetch favicon for ${domain}:`, error);
            return null;
        }
    }

    /**
     * 批量获取favicon
     */
    async batchGetFavicons(domains) {
        const results = {};
        
        for (const domain of domains) {
            try {
                const faviconData = await this.getFaviconData(domain);
                results[domain] = faviconData;
                
                // 添加延迟避免请求过于频繁
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.warn(`Failed to get favicon for ${domain}:`, error);
                results[domain] = null;
            }
        }
        
        return results;
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('faviconCache');
        console.log('Favicon cache cleared');
    }

    /**
     * 导出缓存
     */
    exportCache() {
        const cacheObj = Object.fromEntries(this.cache);
        return JSON.stringify(cacheObj, null, 2);
    }

    /**
     * 获取备用图标
     */
    getFallbackIcon(domain) {
        const fallbackIcons = {
            // AI工具
            'deepseek.com': '🔍',
            'chat.deepseek.com': '🔍',
            'google.com': '🔍',
            'gemini.google.com': '🔍',
            'perplexity.ai': '🤔',
            'www.perplexity.ai': '🤔',
            'chatbot.app': '💬',
            'chat.chatbot.app': '💬',
            'claude.ai': '🧠',
            'openai.com': '🤖',
            'chat.openai.com': '🤖',
            
            // 网站服务
            'cloudflare.com': '☁️',
            'vercel.com': '▲',
            'domain.com': '🌐',
            'github.com': '📦',
            
            // Google服务
            'adsense.google.com': '💰',
            'analytics.google.com': '📊',
            'trends.google.com': '📈',
            'search.google.com': '🔍',
            
            // 其他服务
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

        // 检查精确匹配
        if (fallbackIcons[domain]) {
            return fallbackIcons[domain];
        }

        // 检查部分匹配
        for (const [key, icon] of Object.entries(fallbackIcons)) {
            if (domain.includes(key.replace('.com', '').replace('.ai', ''))) {
                return icon;
            }
        }

        return '🌐';
    }
}

// 创建全局实例
window.faviconFetcher = new FaviconFetcher();

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FaviconFetcher;
}
