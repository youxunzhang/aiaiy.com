/**
 * 通用LOGO管理器
 * 为整个网站的所有链接添加对应的LOGO图片
 */

class UniversalLogoManager {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeUniversalMappings();
    }

    /**
     * 从本地存储加载LOGO缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('universalLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load universal logo cache from localStorage:', error);
        }
    }

    /**
     * 保存LOGO缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('universalLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save universal logo cache to localStorage:', error);
        }
    }

    /**
     * 初始化通用LOGO映射
     */
    initializeUniversalMappings() {
        // 预定义的通用LOGO映射
        this.universalMappings = {
            // AI工具类
            'openai.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
                fallback: '🤖'
            },
            'anthropic.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png',
                fallback: '🧠'
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
            },

            // 其他常用网站
            'seodog.cn': {
                url: 'https://www.seodog.cn/favicon.ico',
                fallback: '🔍'
            },
            'xiaohongxia': {
                url: 'https://xiaohongxia.com/favicon.ico',
                fallback: '📱'
            },
            'aiaiy.com': {
                url: 'https://aiaiy.com/favicon.ico',
                fallback: '🤖'
            },
            'aiwebsiteprompt.online': {
                url: 'https://aiwebsiteprompt.online/favicon.ico',
                fallback: '💡'
            },

            // 图片处理工具
            'veimg.online': {
                url: 'https://veimg.online/favicon.ico',
                fallback: '🖼️'
            },
            'picturesize.online': {
                url: 'https://picturesize.online/favicon.ico',
                fallback: '📏'
            },
            'cleanuppicture.online': {
                url: 'https://cleanuppicture.online/favicon.ico',
                fallback: '🧹'
            },
            'topicture.online': {
                url: 'https://topicture.online/favicon.ico',
                fallback: '🎨'
            },

            // 生活服务类
            'babujinganggong.com': {
                url: 'https://babujinganggong.com/favicon.ico',
                fallback: '🏃'
            },
            'roujiamodaizi.online': {
                url: 'https://roujiamodaizi.online/favicon.ico',
                fallback: '🥙'
            },
            'fangyoudaizi.com': {
                url: 'https://fangyoudaizi.com/favicon.ico',
                fallback: '📦'
            },
            'daizi.org': {
                url: 'https://daizi.org/favicon.ico',
                fallback: '📦'
            },
            'roujiamozhidai.com': {
                url: 'https://roujiamozhidai.com/favicon.ico',
                fallback: '🥙'
            },
            'suitcaseservice.online': {
                url: 'https://suitcaseservice.online/favicon.ico',
                fallback: '🧳'
            },
            'rollingsuitcase.online': {
                url: 'https://rollingsuitcase.online/favicon.ico',
                fallback: '🧳'
            },

            // 时间工具
            'shijian1.online': {
                url: 'https://shijian1.online/favicon.ico',
                fallback: '⏰'
            },
            'webintimer.online': {
                url: 'https://webintimer.online/favicon.ico',
                fallback: '⏱️'
            },
            'iseetime.online': {
                url: 'https://iseetime.online/favicon.ico',
                fallback: '👁️'
            },

            // 传统文化
            'taoteching.online': {
                url: 'https://taoteching.online/favicon.ico',
                fallback: '📜'
            },
            'zengguofan.online': {
                url: 'https://zengguofan.online/favicon.ico',
                fallback: '📚'
            },
            'zhuangzi.blog': {
                url: 'https://zhuangzi.blog/favicon.ico',
                fallback: '🦋'
            },
            'traditionalchinesemedicine.online': {
                url: 'https://traditionalchinesemedicine.online/favicon.ico',
                fallback: '🌿'
            },
            'nihaixia.online': {
                url: 'https://nihaixia.online/favicon.ico',
                fallback: '🏃'
            },
            'nihaixia.org': {
                url: 'https://nihaixia.org/favicon.ico',
                fallback: '🏃'
            },
            'zhanzhuang.online': {
                url: 'https://zhanzhuang.online/favicon.ico',
                fallback: '🧘'
            },
            'baduanjin.online': {
                url: 'https://baduanjin.online/favicon.ico',
                fallback: '🧘'
            },

            // 游戏娱乐
            'youxistudio.online': {
                url: 'https://youxistudio.online/favicon.ico',
                fallback: '🎮'
            },
            'fruitconnect.online': {
                url: 'https://fruitconnect.online/favicon.ico',
                fallback: '🍎'
            },
            'crossword.best': {
                url: 'https://crossword.best/favicon.ico',
                fallback: '📝'
            },

            // 博客和工具
            'zhiyu.blog': {
                url: 'https://zhiyu.blog/favicon.ico',
                fallback: '📝'
            },
            'postcode.blog': {
                url: 'https://postcode.blog/favicon.ico',
                fallback: '📮'
            },
            'yinhangka.online': {
                url: 'https://yinhangka.online/favicon.ico',
                fallback: '💳'
            },
            'ceshimbti.com': {
                url: 'https://ceshimbti.com/favicon.ico',
                fallback: '🧠'
            },
            'dreamlist.live': {
                url: 'https://dreamlist.live/favicon.ico',
                fallback: '💭'
            },
            'htmltemplate.online': {
                url: 'https://htmltemplate.online/favicon.ico',
                fallback: '🌐'
            },
            'citylibrary.online': {
                url: 'https://citylibrary.online/favicon.ico',
                fallback: '📚'
            },
            'tushuguan.online': {
                url: 'https://tushuguan.online/favicon.ico',
                fallback: '📚'
            },

            // GrowGarden系列
            'growgarden.website': {
                url: 'https://growgarden.website/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.quest': {
                url: 'https://growgarden.quest/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.casa': {
                url: 'https://growgarden.casa/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.world': {
                url: 'https://growgarden.world/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.cfd': {
                url: 'https://growgarden.cfd/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.top': {
                url: 'https://growgarden.top/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.wtf': {
                url: 'https://growgarden.wtf/favicon.ico',
                fallback: '🌱'
            },
            'growgarden.cc': {
                url: 'https://growgarden.cc/favicon.ico',
                fallback: '🌱'
            },

            // 其他网站
            'youxistudio.com': {
                url: 'https://youxistudio.com/favicon.ico',
                fallback: '🎮'
            },
            'hotspotgame.net': {
                url: 'https://hotspotgame.net/favicon.ico',
                fallback: '🎯'
            },
            'xingxingren.online': {
                url: 'https://xingxingren.online/favicon.ico',
                fallback: '⭐'
            },
            'webintimer.com': {
                url: 'https://webintimer.com/favicon.ico',
                fallback: '⏱️'
            },
            'veimg.com': {
                url: 'https://veimg.com/favicon.ico',
                fallback: '🖼️'
            },
            'kongfutime.com': {
                url: 'https://kongfutime.com/favicon.ico',
                fallback: '⏰'
            },
            'zmrgame.com': {
                url: 'https://zmrgame.com/favicon.ico',
                fallback: '🎮'
            },
            'yinyuejia.cn': {
                url: 'https://yinyuejia.cn/favicon.ico',
                fallback: '🎵'
            },
            'zuoyujia.com': {
                url: 'https://zuoyujia.com/favicon.ico',
                fallback: '✍️'
            },
            'bgmme.cn': {
                url: 'https://bgmme.cn/favicon.ico',
                fallback: '🎵'
            },
            'obgm.cn': {
                url: 'https://obgm.cn/favicon.ico',
                fallback: '🎵'
            },
            'babujinganggong.cn': {
                url: 'https://babujinganggong.cn/favicon.ico',
                fallback: '🏃'
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
        if (this.universalMappings[domain]) {
            const logoData = this.universalMappings[domain];
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
            'openai': '🤖',
            'anthropic': '🧠',
            'deepseek': '🔍',
            'google': '🔍',
            'perplexity': '🤔',
            'claude': '🧠',
            'chatbot': '💬',
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
            'adsterra': '📈',
            'seodog': '🔍',
            'xiaohongxia': '📱',
            'aiaiy': '🤖',
            'aiwebsiteprompt': '💡',
            'veimg': '🖼️',
            'picturesize': '📏',
            'cleanuppicture': '🧹',
            'topicture': '🎨',
            'babujinganggong': '🏃',
            'roujiamodaizi': '🥙',
            'fangyoudaizi': '📦',
            'daizi': '📦',
            'roujiamozhidai': '🥙',
            'suitcase': '🧳',
            'shijian': '⏰',
            'webintimer': '⏱️',
            'iseetime': '👁️',
            'taoteching': '📜',
            'zengguofan': '📚',
            'zhuangzi': '🦋',
            'traditionalchinesemedicine': '🌿',
            'nihaixia': '🏃',
            'zhanzhuang': '🧘',
            'baduanjin': '🧘',
            'youxistudio': '🎮',
            'fruitconnect': '🍎',
            'crossword': '📝',
            'zhiyu': '📝',
            'postcode': '📮',
            'yinhangka': '💳',
            'ceshimbti': '🧠',
            'dreamlist': '💭',
            'htmltemplate': '🌐',
            'citylibrary': '📚',
            'tushuguan': '📚',
            'growgarden': '🌱',
            'hotspotgame': '🎯',
            'xingxingren': '⭐',
            'kongfutime': '⏰',
            'zmrgame': '🎮',
            'yinyuejia': '🎵',
            'zuoyujia': '✍️',
            'bgmme': '🎵',
            'obgm': '🎵'
        };

        for (const [key, icon] of Object.entries(fallbackIcons)) {
            if (domain.includes(key)) {
                return icon;
            }
        }

        return '🌐';
    }

    /**
     * 为所有链接卡片添加LOGO背景
     */
    async addLogosToAllCards() {
        // 为工具卡片添加LOGO
        const toolCards = document.querySelectorAll('.tool-card');
        for (const card of toolCards) {
            await this.addLogoToCard(card);
        }

        // 为链接卡片添加LOGO
        const linkCards = document.querySelectorAll('.link-card');
        for (const card of linkCards) {
            await this.addLogoToCard(card);
        }

        // 为公司卡片添加LOGO
        const companyCards = document.querySelectorAll('.company-card');
        for (const card of companyCards) {
            await this.addLogoToCard(card);
        }
    }

    /**
     * 为单个卡片添加LOGO
     * @param {Element} card - 卡片元素
     */
    async addLogoToCard(card) {
        const link = card.querySelector('a') || card;
        const href = link.getAttribute('href');
        if (!href) return;

        try {
            const domain = this.extractDomain(href);
            const logo = await this.getLogo(domain, href);
            
            // 创建或获取LOGO背景元素
            let logoBg = card.querySelector('.tool-logo-bg, .link-logo-bg, .company-logo-bg');
            if (!logoBg) {
                logoBg = document.createElement('div');
                // 根据卡片类型设置不同的类名
                if (card.classList.contains('tool-card')) {
                    logoBg.className = 'tool-logo-bg';
                } else if (card.classList.contains('link-card')) {
                    logoBg.className = 'link-logo-bg';
                } else if (card.classList.contains('company-card')) {
                    logoBg.className = 'company-logo-bg';
                } else {
                    logoBg.className = 'tool-logo-bg'; // 默认
                }
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
        } catch (error) {
            console.warn(`Failed to add logo for ${href}:`, error);
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
     * 批量获取所有LOGO
     */
    async batchFetchAllLogos() {
        const allCards = document.querySelectorAll('.tool-card, .link-card, .company-card');
        const domains = new Set();
        
        allCards.forEach(card => {
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
        console.log('Universal logo fetching completed');
    }

    /**
     * 清除LOGO缓存
     */
    clearCache() {
        this.logoCache.clear();
        localStorage.removeItem('universalLogoCache');
        console.log('Universal logo cache cleared');
    }
}

// 创建全局实例
window.universalLogoManager = new UniversalLogoManager();

// 页面加载完成后初始化LOGO
document.addEventListener('DOMContentLoaded', async function() {
    // 为所有页面的链接卡片添加LOGO背景
    await window.universalLogoManager.addLogosToAllCards();
    
    // 可选：批量获取所有LOGO
    // await window.universalLogoManager.batchFetchAllLogos();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalLogoManager;
}
