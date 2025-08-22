/**
 * 修复版LOGO获取工具
 * 使用更直接可靠的方法获取favicon
 */

class FixLogoFetcher {
    constructor() {
        this.cache = new Map();
        this.loadCache();
    }

    /**
     * 加载缓存
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('fixLogoCache');
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
            localStorage.setItem('fixLogoCache', JSON.stringify(cacheObj));
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
     * 直接获取favicon - 使用Google服务
     */
    async getFaviconUrl(domain) {
        // 检查缓存
        if (this.cache.has(domain)) {
            return this.cache.get(domain);
        }

        // 使用Google favicon服务
        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        
        // 直接缓存并返回，不检查可访问性
        this.cache.set(domain, googleFaviconUrl);
        this.saveCache();
        return googleFaviconUrl;
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
        if (!href) {
            console.log('No href found for element:', element);
            return;
        }

        const domain = this.getDomain(href);
        console.log(`Processing domain: ${domain} for href: ${href}`);
        
        // 查找或创建LOGO背景容器
        let logoBgContainer = element.querySelector('.tool-logo-bg');
        if (!logoBgContainer) {
            logoBgContainer = document.createElement('div');
            logoBgContainer.className = 'tool-logo-bg';
            element.insertBefore(logoBgContainer, element.firstChild);
            console.log(`Created logo background container for ${domain}`);
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
            console.log(`Created content container for ${domain}`);
        }

        try {
            console.log(`Fetching favicon for ${domain}...`);
            const faviconData = await this.getFaviconData(domain);
            
            if (faviconData) {
                console.log(`Successfully got favicon for ${domain}`);
                logoBgContainer.innerHTML = `
                    <div class="tool-logo-bg" title="${domain}" style="background-image: url('${faviconData.dataUrl}');"></div>
                `;
            } else {
                console.log(`Failed to get favicon for ${domain}, using fallback`);
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
        } catch (error) {
            console.warn(`Failed to add logo background for ${domain}:`, error);
            
            // 使用fallback图标
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
        console.log(`Found ${cards.length} tool cards`);
        
        if (cards.length === 0) {
            console.warn('No .tool-card elements found on the page');
            return;
        }
        
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            console.log(`Processing card ${i + 1}/${cards.length}:`, card);
            await this.addLogoBackground(card);
            // 添加小延迟避免请求过于频繁
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('Finished processing all cards');
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        localStorage.removeItem('fixLogoCache');
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
window.fixLogoFetcher = new FixLogoFetcher();

// 页面加载完成后自动应用LOGO背景
document.addEventListener('DOMContentLoaded', function() {
    console.log('FixLogoFetcher: DOM loaded, starting to add logo backgrounds...');
    setTimeout(() => {
        window.fixLogoFetcher.addLogoBackgroundsToAllCards();
    }, 1000); // 延迟1秒执行，确保页面完全加载
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FixLogoFetcher;
}
