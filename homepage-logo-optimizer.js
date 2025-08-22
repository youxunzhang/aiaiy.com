/**
 * 首页LOGO优化器
 * 专门为首页工具卡片添加LOGO背景
 */

class HomepageLogoOptimizer {
    constructor() {
        this.cache = new Map();
        this.loadCache();
        this.isProcessing = false;
        this.processedCards = new Set();
    }

    /**
     * 加载缓存
     */
    loadCache() {
        try {
            const cached = localStorage.getItem('homepageLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.cache = new Map(Object.entries(parsed));
                console.log(`Loaded ${this.cache.size} cached logos`);
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
            localStorage.setItem('homepageLogoCache', JSON.stringify(cacheObj));
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
     * 获取favicon URL
     */
    async getFaviconUrl(domain) {
        // 检查缓存
        if (this.cache.has(domain)) {
            return this.cache.get(domain);
        }

        // 使用Google favicon服务
        const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        
        // 缓存并返回
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
     * 为单个工具卡片添加LOGO背景
     */
    async addLogoToCard(card) {
        // 检查是否已经处理过
        if (this.processedCards.has(card)) {
            return;
        }

        const href = card.getAttribute('href');
        if (!href) {
            console.log('No href found for card:', card);
            return;
        }

        const domain = this.getDomain(href);
        console.log(`Processing card for domain: ${domain}`);

        // 标记为已处理
        this.processedCards.add(card);

        // 查找或创建LOGO背景容器
        let logoBg = card.querySelector('.tool-logo-bg');
        if (!logoBg) {
            logoBg = document.createElement('div');
            logoBg.className = 'tool-logo-bg';
            card.insertBefore(logoBg, card.firstChild);
        }

        try {
            const faviconData = await this.getFaviconData(domain);
            
            if (faviconData) {
                console.log(`✓ Successfully got favicon for ${domain}`);
                logoBg.style.backgroundImage = `url('${faviconData.dataUrl}')`;
                logoBg.style.backgroundSize = 'contain';
                logoBg.style.backgroundPosition = 'center';
                logoBg.style.backgroundRepeat = 'no-repeat';
                logoBg.style.opacity = '0.08';
                logoBg.style.transition = 'all 0.3s ease';
                logoBg.style.zIndex = '1';
                logoBg.style.filter = 'grayscale(100%) brightness(1.2)';
            } else {
                console.log(`✗ Failed to get favicon for ${domain}, using fallback`);
                this.addFallbackIcon(logoBg, domain);
            }
        } catch (error) {
            console.warn(`Failed to add logo for ${domain}:`, error);
            this.addFallbackIcon(logoBg, domain);
        }
    }

    /**
     * 添加备用图标
     */
    addFallbackIcon(logoBg, domain) {
        const fallbackIcon = this.getFallbackIcon(domain);
        logoBg.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        logoBg.style.display = 'flex';
        logoBg.style.alignItems = 'center';
        logoBg.style.justifyContent = 'center';
        logoBg.style.fontSize = '2rem';
        logoBg.style.color = 'white';
        logoBg.style.opacity = '0.1';
        logoBg.style.zIndex = '1';
        logoBg.textContent = fallbackIcon;
    }

    /**
     * 为所有工具卡片添加LOGO
     */
    async addLogosToAllCards() {
        if (this.isProcessing) {
            console.log('Already processing logos...');
            return;
        }

        this.isProcessing = true;
        console.log('Starting to add logos to all cards...');

        const cards = document.querySelectorAll('.tool-card');
        console.log(`Found ${cards.length} tool cards`);

        if (cards.length === 0) {
            console.warn('No .tool-card elements found on the page');
            this.isProcessing = false;
            return;
        }

        // 批量处理，避免阻塞UI
        const batchSize = 5;
        for (let i = 0; i < cards.length; i += batchSize) {
            const batch = Array.from(cards).slice(i, i + batchSize);
            
            await Promise.all(batch.map(card => this.addLogoToCard(card)));
            
            // 添加延迟避免请求过于频繁
            if (i + batchSize < cards.length) {
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }

        console.log('Finished processing all cards');
        this.isProcessing = false;
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        this.processedCards.clear();
        localStorage.removeItem('homepageLogoCache');
        console.log('Logo cache cleared');
    }

    /**
     * 重新加载所有LOGO
     */
    async reloadAllLogos() {
        this.clearCache();
        this.processedCards.clear();
        await this.addLogosToAllCards();
    }

    /**
     * 导出缓存信息
     */
    exportCacheInfo() {
        const cacheObj = Object.fromEntries(this.cache);
        return {
            cachedDomains: Object.keys(cacheObj),
            totalCached: this.cache.size,
            processedCards: this.processedCards.size
        };
    }
}

// 创建全局实例
window.homepageLogoOptimizer = new HomepageLogoOptimizer();

// 页面加载完成后自动应用LOGO
document.addEventListener('DOMContentLoaded', function() {
    console.log('HomepageLogoOptimizer: DOM loaded, starting to add logos...');
    
    // 延迟执行，确保页面完全加载
    setTimeout(() => {
        window.homepageLogoOptimizer.addLogosToAllCards();
    }, 1500);
});

// 监听页面变化，处理动态加载的内容
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            const newCards = Array.from(mutation.addedNodes).filter(node => 
                node.nodeType === 1 && node.classList && node.classList.contains('tool-card')
            );
            
            if (newCards.length > 0) {
                console.log(`Found ${newCards.length} new tool cards, adding logos...`);
                newCards.forEach(card => {
                    window.homepageLogoOptimizer.addLogoToCard(card);
                });
            }
        }
    });
});

// 开始观察DOM变化
document.addEventListener('DOMContentLoaded', function() {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageLogoOptimizer;
}
