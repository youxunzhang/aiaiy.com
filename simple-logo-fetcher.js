/**
 * 简化LOGO获取工具
 * 专注于多路径自动探测favicon
 */

class SimpleLogoFetcher {
    constructor() {
        this.cache = new Map();
        this.loadCache();
    }

    /**
     * 加载缓存
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('simpleLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load logo cache:', error);
        }
    }

    /**
     * 保存缓存
     */
    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.cache);
            localStorage.setItem('simpleLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save logo cache:', error);
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
     * 获取favicon URL列表 - 多路径探测
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
     * 获取favicon URL - 多路径探测
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
     * 为页面元素添加LOGO背景
     */
    async addLogoBackground(element) {
        const href = element.getAttribute('href');
        if (!href) return;

        const domain = this.getDomain(href);
        const faviconData = await this.getFaviconData(domain);
        
        // 查找或创建LOGO背景容器
        let logoBgContainer = element.querySelector('.tool-logo-bg');
        if (!logoBgContainer) {
            logoBgContainer = document.createElement('div');
            logoBgContainer.className = 'tool-logo-bg';
            element.insertBefore(logoBgContainer, element.firstChild);
        }

        // 查找或创建内容容器
        let contentContainer = element.querySelector('.tool-content');
        if (!contentContainer) {
            contentContainer = document.createElement('div');
            contentContainer.className = 'tool-content';
            
            // 将原有的内容移动到content容器中
            const originalContent = Array.from(element.children).filter(child => 
                !child.classList.contains('tool-logo-bg')
            );
            originalContent.forEach(child => contentContainer.appendChild(child));
            element.appendChild(contentContainer);
        }

        if (faviconData) {
            logoBgContainer.innerHTML = `
                <div class="tool-logo-bg" title="${domain}" style="background-image: url('${faviconData.dataUrl}');"></div>
            `;
        } else {
            // 如果没有获取到LOGO，使用fallback图标
            const fallbackIcon = this.getFallbackIcon(domain);
            logoBgContainer.innerHTML = `
                <div class="tool-logo-bg fallback" title="${domain}" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: white;
                    opacity: 0.1;
                ">${fallbackIcon}</div>
            `;
        }
    }

    /**
     * 为所有工具卡片添加LOGO背景
     */
    async addLogoBackgroundsToAllCards() {
        const cards = document.querySelectorAll('.tool-card');
        
        for (const card of cards) {
            await this.addLogoBackground(card);
            // 添加小延迟避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('simpleLogoCache');
        console.log('Logo cache cleared');
    }

    /**
     * 导出缓存
     */
    exportCache() {
        const cacheObj = Object.fromEntries(this.cache);
        return JSON.stringify(cacheObj, null, 2);
    }
}

// 创建全局实例
window.simpleLogoFetcher = new SimpleLogoFetcher();

// 页面加载完成后自动应用LOGO背景
document.addEventListener('DOMContentLoaded', function() {
    window.simpleLogoFetcher.addLogoBackgroundsToAllCards();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SimpleLogoFetcher;
}
