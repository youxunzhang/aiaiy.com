/**
 * 首页LOGO管理器
 * 为首页所有链接板块添加对应的LOGO图片
 */

class HomepageLogoManager {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeHomepageMappings();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('homepageLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
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
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('homepageLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save homepage logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化首页LOGO映射
     */
    initializeHomepageMappings() {
        // 预定义的首页LOGO映射
        this.homepageMappings = {
            // AI大模型
            'chat.deepseek.com': {
                url: 'https://www.deepseek.com/favicon.ico',
                fallback: '🔍'
            },
            'gemini.google.com': {
                url: 'https://gemini.google.com/favicon.ico',
                fallback: '🔍'
            },
            'perplexity.ai': {
                url: 'https://www.perplexity.ai/favicon.ico',
                fallback: '🤔'
            },
            'chat.chatbot.app': {
                url: 'https://chatbot.app/favicon.ico',
                fallback: '💬'
            },
            'claude.ai': {
                url: 'https://claude.ai/favicon.ico',
                fallback: '🧠'
            },

            // 网站服务
            'cloudflare.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.svg/1200px-Cloudflare_Logo.svg.png',
                fallback: '☁️'
            },
            'vercel.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vercel_logo_black.svg/1200px-Vercel_logo_black.svg.png',
                fallback: '⚡'
            },
            'domain.com': {
                url: 'https://www.domain.com/favicon.ico',
                fallback: '🌐'
            },
            'github.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png',
                fallback: '🐙'
            },

            // 赚美金工具
            'adsense.google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '💰'
            },
            'analytics.google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '📊'
            },
            'trends.google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '📈'
            },
            'search.google.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '🔍'
            },
            'spaceship.com': {
                url: 'https://www.spaceship.com/favicon.ico',
                fallback: '🚀'
            },
            'similarweb.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/SimilarWeb_logo.svg/1200px-SimilarWeb_logo.svg.png',
                fallback: '📊'
            },

            // 社交媒体
            'x.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/1200px-X_logo_2023_%28white%29.png',
                fallback: '🐦'
            },
            'instagram.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png',
                fallback: '📷'
            },
            'facebook.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Facebook_logo.svg/1200px-Facebook_logo.svg.png',
                fallback: '📘'
            },

            // 广告平台
            'monetag.com': {
                url: 'https://monetag.com/favicon.ico',
                fallback: '💰'
            },
            'propellerads.com': {
                url: 'https://propellerads.com/favicon.ico',
                fallback: '📢'
            },
            'media.net': {
                url: 'https://www.media.net/favicon.ico',
                fallback: '📺'
            },
            'adsterra.com': {
                url: 'https://adsterra.com/favicon.ico',
                fallback: '📈'
            }
        };
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
        if (this.homepageMappings[domain]) {
            const logoData = this.homepageMappings[domain];
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
            'claude': '🧠',
            'cloudflare': '☁️',
            'vercel': '⚡',
            'domain': '🌐',
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
     * 为首页工具卡片添加LOGO背景
     */
    async addLogosToHomepageCards() {
        const toolCards = document.querySelectorAll('.tool-card');
        
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
                
                if (logo.startsWith('data:image')) {
                    // 图片LOGO
                    logoBg.style.backgroundImage = `url(${logo})`;
                } else {
                    // Emoji fallback - 创建渐变背景
                    logoBg.style.background = `linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))`;
                    logoBg.innerHTML = `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 3rem; opacity: 0.3;">${logo}</div>`;
                }
                
                console.log(`✅ 成功为 ${domain} 添加LOGO背景`);
            } catch (error) {
                console.warn(`Failed to add logo for ${href}:`, error);
            }
        }
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
        console.log('Homepage logo fetching completed');
    }

    /**
     * 清除LOGO缓存
     */
    clearCache() {
        this.logoCache.clear();
        localStorage.removeItem('homepageLogoCache');
        console.log('Homepage logo cache cleared');
    }
}

// 创建全局实例
window.homepageLogoManager = new HomepageLogoManager();

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // 为首页所有工具卡片添加LOGO背景
        await window.homepageLogoManager.addLogosToHomepageCards();
        
        // 可选：批量获取所有LOGO
        // await window.homepageLogoManager.batchFetchAllLogos();
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageLogoManager;
}
