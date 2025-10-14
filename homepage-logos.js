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
            'chatgpt.com': [
                'https://chatgpt.com/apple-touch-icon.png',
                'https://chatgpt.com/favicon.ico',
                'https://logo.clearbit.com/chatgpt.com'
            ],
            'deepseek.com': [
                'https://chat.deepseek.com/apple-touch-icon.png',
                'https://chat.deepseek.com/favicon.ico',
                'https://logo.clearbit.com/deepseek.com'
            ],
            'chat.deepseek.com': [
                'https://chat.deepseek.com/apple-touch-icon.png',
                'https://chat.deepseek.com/favicon.ico'
            ],
            'google.com': [
                'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
                'https://www.google.com/favicon.ico'
            ],
            'gemini.google.com': [
                'https://www.gstatic.com/lamda/images/share-favicon-512x512.png',
                'https://logo.clearbit.com/gemini.google.com'
            ],
            'perplexity.ai': [
                'https://www.perplexity.ai/icons/icon-512x512.png',
                'https://www.perplexity.ai/favicon.ico',
                'https://logo.clearbit.com/perplexity.ai'
            ],
            'chatbot.app': [
                'https://chat.chatbot.app/apple-touch-icon.png',
                'https://chat.chatbot.app/favicon.ico',
                'https://logo.clearbit.com/chatbot.app'
            ],
            'chat.chatbot.app': [
                'https://chat.chatbot.app/apple-touch-icon.png',
                'https://chat.chatbot.app/favicon.ico'
            ],
            'claude.ai': [
                'https://claude.ai/apple-touch-icon.png',
                'https://claude.ai/favicon.ico',
                'https://logo.clearbit.com/claude.ai'
            ],
            'grok.com': [
                'https://grok.com/apple-touch-icon.png',
                'https://grok.com/favicon.ico',
                'https://logo.clearbit.com/grok.com'
            ],
            // 备用高质量LOGO
            'deepseek': [
                'https://chat.deepseek.com/apple-touch-icon.png',
                'https://chat.deepseek.com/favicon.ico'
            ],
            'gemini': [
                'https://www.gstatic.com/lamda/images/share-favicon-512x512.png'
            ],
            'perplexity': [
                'https://www.perplexity.ai/icons/icon-512x512.png'
            ],
            'chatbot': [
                'https://chat.chatbot.app/apple-touch-icon.png'
            ],
            'claude': [
                'https://claude.ai/apple-touch-icon.png'
            ],
            'grok': [
                'https://grok.com/apple-touch-icon.png'
            ],

            // Website Services
            'cloudflare.com': [
                'https://www.cloudflare.com/img/logo-cloudflare-dark.svg',
                'https://www.cloudflare.com/img/logo-cloudflare.png',
                'https://logo.clearbit.com/cloudflare.com'
            ],
            'vercel.com': [
                'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
                'https://vercel.com/favicon.ico',
                'https://logo.clearbit.com/vercel.com'
            ],
            'domain.com': [
                'https://www.domain.com/apple-touch-icon.png',
                'https://www.domain.com/favicon-196x196.png',
                'https://logo.clearbit.com/domain.com'
            ],
            'github.com': [
                'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                'https://github.githubassets.com/favicons/favicon.png'
            ],

            // Make Money Online
            'adsense.google.com': [
                'https://www.gstatic.com/adsense/social/fb_adSense_icon_512dp.png',
                'https://logo.clearbit.com/adsense.google.com'
            ],
            'analytics.google.com': [
                'https://ssl.gstatic.com/analytics/20240410-01/landing/img/home/google-analytics-icon.png',
                'https://logo.clearbit.com/analytics.google.com'
            ],
            'trends.google.com': [
                'https://ssl.gstatic.com/trends_nrtr/3351_RC01/static/images/apple-touch-icon.png',
                'https://logo.clearbit.com/trends.google.com'
            ],
            'search.google.com': [
                'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png',
                'https://logo.clearbit.com/search.google.com'
            ],
            'spaceship.com': [
                'https://www.spaceship.com/apple-touch-icon.png',
                'https://www.spaceship.com/favicon.ico',
                'https://logo.clearbit.com/spaceship.com'
            ],
            'similarweb.com': [
                'https://www.similarweb.com/static/favicon/similarweb-icon-192x192.png',
                'https://www.similarweb.com/static/favicon/favicon-96x96.png',
                'https://logo.clearbit.com/similarweb.com'
            ],

            // Social Media
            'x.com': [
                'https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc7275.png',
                'https://logo.clearbit.com/x.com'
            ],
            'instagram.com': [
                'https://www.instagram.com/static/images/ico/apple-touch-icon-180x180.png/1006fb1c8a3f.png',
                'https://logo.clearbit.com/instagram.com'
            ],
            'facebook.com': [
                'https://www.facebook.com/images/fb_icon_325x325.png',
                'https://logo.clearbit.com/facebook.com'
            ],

            // 广告联盟
            'monetag.com': [
                'https://monetag.com/assets/favicon/android-chrome-192x192.png',
                'https://monetag.com/favicon.ico',
                'https://logo.clearbit.com/monetag.com'
            ],
            'propellerads.com': [
                'https://propellerads.com/wp-content/uploads/2019/03/cropped-PROP-Logo-Black-192x192.png',
                'https://propellerads.com/favicon.ico',
                'https://logo.clearbit.com/propellerads.com'
            ],
            'media.net': [
                'https://www.media.net/wp-content/themes/media.net/images/favicon-196x196.png',
                'https://www.media.net/favicon.ico',
                'https://logo.clearbit.com/media.net'
            ],
            'adsterra.com': [
                'https://adsterra.com/wp-content/uploads/2021/05/cropped-Adsterra_icon-192x192.png',
                'https://adsterra.com/favicon.ico',
                'https://logo.clearbit.com/adsterra.com'
            ],
            'beta.publishers.adsterra.com': [
                'https://beta.publishers.adsterra.com/assets/favicon/android-chrome-192x192.png',
                'https://adsterra.com/wp-content/uploads/2021/05/cropped-Adsterra_icon-192x192.png'
            ],

            // Tools & Resources
            'query.domains': [
                'https://query.domains/apple-touch-icon.png',
                'https://query.domains/favicon.ico'
            ]
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
     * 获取LOGO URL - 使用favicon-fetcher
     */
    async getLogoUrl(domain) {
        const candidateSet = new Set();

        if (this.logoCache[domain]) {
            candidateSet.add(this.logoCache[domain]);
        }

        const mappedLogos = this.logoMappings[domain];
        if (mappedLogos) {
            const urls = Array.isArray(mappedLogos) ? mappedLogos : [mappedLogos];
            urls.filter(Boolean).forEach(url => candidateSet.add(url));
        }

        if (window.faviconFetcher && typeof window.faviconFetcher.getFaviconUrl === 'function') {
            try {
                const faviconUrl = await window.faviconFetcher.getFaviconUrl(domain);
                if (faviconUrl) {
                    candidateSet.add(faviconUrl);
                }
            } catch (error) {
                console.warn(`Failed to fetch favicon for ${domain}:`, error);
            }
        }

        const googleFallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
        candidateSet.add(googleFallback);

        return Array.from(candidateSet);
    }

    /**
     * 检查LOGO资源是否可加载
     */
    tryLoadLogo(url) {
        if (!url) {
            return Promise.resolve(false);
        }

        return new Promise(resolve => {
            const img = new Image();
            img.referrerPolicy = 'no-referrer';
            img.decoding = 'async';
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    /**
     * 获取LOGO数据
     */
    async getLogo(domain) {
        const logoUrls = await this.getLogoUrl(domain);
        if (!logoUrls || logoUrls.length === 0) {
            return null;
        }

        for (const url of logoUrls) {
            try {
                const isLoadable = await this.tryLoadLogo(url);
                if (!isLoadable) {
                    continue;
                }

                this.logoCache[domain] = url;
                this.saveToLocalStorage();
                return {
                    url,
                    domain
                };
            } catch (error) {
                console.warn(`Failed to preload logo image from ${url}:`, error);
                continue;
            }
        }

        return null;
    }

    /**
     * 获取备用图标
     */
    getFallbackIcon(domain) {
        if (window.faviconFetcher) {
            return window.faviconFetcher.getFallbackIcon(domain);
        }

        const fallbackIcons = {
            'chatgpt.com': '🤖',
            'deepseek.com': '🔍',
            'google.com': '🔍',
            'gemini.google.com': '✨',
            'perplexity.ai': '🤔',
            'chatbot.app': '💬',
            'claude.ai': '🧠',
            'grok.com': '🤖',
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
            'beta.publishers.adsterra.com': '🌍',
            'query.domains': '🌐'
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

        if (logoData) {
            logoBgContainer.classList.remove('fallback');
            logoBgContainer.title = domain;
            logoBgContainer.textContent = '';
            logoBgContainer.style.backgroundImage = `url('${logoData.url}')`;
            logoBgContainer.style.background = '';
            logoBgContainer.style.display = '';
            logoBgContainer.style.alignItems = '';
            logoBgContainer.style.justifyContent = '';
            logoBgContainer.style.fontSize = '';
            logoBgContainer.style.color = '';
            logoBgContainer.style.opacity = '';
        } else {
            // 如果没有获取到LOGO，使用fallback图标
            const fallbackIcon = this.getFallbackIcon(domain);
            logoBgContainer.classList.add('fallback');
            logoBgContainer.title = domain;
            logoBgContainer.style.backgroundImage = 'none';
            logoBgContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            logoBgContainer.style.display = 'flex';
            logoBgContainer.style.alignItems = 'center';
            logoBgContainer.style.justifyContent = 'center';
            logoBgContainer.style.fontSize = '2rem';
            logoBgContainer.style.color = 'white';
            logoBgContainer.style.opacity = '0.1';
            logoBgContainer.textContent = fallbackIcon;
        }
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

    /**
     * 批量预加载LOGO
     */
    async preloadLogos() {
        const links = document.querySelectorAll('.tool-card');
        const domains = new Set();
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                domains.add(this.getDomain(href));
            }
        });

        console.log(`Preloading logos for ${domains.size} domains...`);
        
        for (const domain of domains) {
            try {
                await this.getLogo(domain);
                await new Promise(resolve => setTimeout(resolve, 50));
            } catch (error) {
                console.warn(`Failed to preload logo for ${domain}:`, error);
            }
        }
        
        console.log('Logo preloading completed');
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const logoManager = new HomepageLogoManager();
    
    // 先预加载LOGO，然后更新背景
    logoManager.preloadLogos().then(() => {
        logoManager.updateAllLogoBackgrounds();
    });
    
    // 将实例挂载到全局，方便调试
    window.homepageLogoManager = logoManager;
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageLogoManager;
}
