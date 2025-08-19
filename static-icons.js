/**
 * 静态图标管理系统
 * 实现本地存储和静态展示，避免动态获取图标
 */

class StaticIconManager {
    constructor() {
        this.iconCache = new Map();
        this.loadFromLocalStorage();
        this.initializeIcons();
    }

    /**
     * 从本地存储加载图标缓存
     */
    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('iconCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.iconCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load icon cache from localStorage:', error);
        }
    }

    /**
     * 保存图标缓存到本地存储
     */
    saveToLocalStorage() {
        try {
            const cacheObj = Object.fromEntries(this.iconCache);
            localStorage.setItem('iconCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save icon cache to localStorage:', error);
        }
    }

    /**
     * 初始化图标数据
     */
    initializeIcons() {
        // 预定义的图标映射
        this.iconMappings = {
            // 友情链接图标
            'crossword.best': '🧩',
            'fruitconnect.online': '🍎',
            'xingxingren.online': '⭐',
            'tushuguan.online': '📚',
            'citylibrary.online': '🏛️',
            'aiwebsiteprompt.online': '🤖',
            'zhuangzi.blog': '📖',
            'dreamlist.live': '💭',
            'zengguofan.online': '📜',
            'watchbrands.watch': '⌚',
            'rollingsuitcase.online': '🧳',
            'airconditioner.blog': '❄️',
            'magiccube.online': '🎲',
            'tvrepair.cc': '📺',
            'baduanjin.online': '🧘',
            'picturesize.online': '🖼️',
            'yinhangka.online': '💳',
            'postcode.blog': '📮',
            'zhiyu.blog': '📝',
            'taoteching.online': '☯️',
            'zhanzhuang.online': '🏃',
            'youxistudio.online': '🎮',
            'roujiamodaizi.online': '🥙',
            'shijian1.online': '⏰',
            'webintimer.online': '⏱️',
            'suitcaseservice.online': '🛍️',
            'veimg.online': '🖼️',

            // AI工具图标
            'deepseek.com': '🔍',
            'google.com': '🔍',
            'perplexity.ai': '🤔',
            'chatbot.app': '💬',
            'claude.ai': '🧠',
            'openai.com': '🤖',

            // 网站页面图标
            'index': '🏠',
            'ai-companies': '🏢',
            'play-game': '🎮',
            'ai-hotspots': '🔥',
            'real-needs': '🎯',
            'ai-ranking': '📊',
            'ai-overseas': '🌍',
            'ai-ads': '📢',
            'trends': '📈',
            'ai-capabilities': '⚡',
            'lunch-recommendations': '🍽️',
            'friendship-links': '🔗',
            'coding': '💻',
            'designer': '🎨',
            'writing': '✍️',
            'image': '🖼️',
            'video': '🎬',
            'audio': '🎵',
            'music': '🎼',
            'social': '📱',
            'seo': '🔍',
            'game': '🎮',
            'prayer': '🙏',
            'words': '📝',
            'xiaohongshu': '📖',
            'hanghai': '🚢',
            'chuhai': '🌊',
            'img': '🖼️',
            'links': '🔗',
            'ailinks': '🤖',
            'aicommunity': '👥',
            'aicontent': '📄',
            'ailearn': '📚',
            'ainum': '🔢',
            'aioffice': '💼',
            'aiprompt': '💡',
            'aitimer': '⏰',
            'aiagent': '🤖',
            'gametest': '🎯'
        };

        // 分类图标映射
        this.categoryIcons = {
            'ai': '🤖',
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
            'business': '💼',
            'default': '🌐'
        };
    }

    /**
     * 获取图标HTML
     * @param {string} domain - 域名
     * @param {string} category - 分类
     * @param {string} title - 标题
     * @returns {string} 图标HTML
     */
    getIconHtml(domain, category = 'default', title = '') {
        const icon = this.getIcon(domain, category);
        const displayTitle = title || domain;
        
        return `
            <div class="static-icon" title="${displayTitle}">
                <div class="icon-container w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    ${icon}
                </div>
            </div>
        `;
    }

    /**
     * 获取图标
     * @param {string} domain - 域名
     * @param {string} category - 分类
     * @returns {string} 图标
     */
    getIcon(domain, category = 'default') {
        // 检查缓存
        if (this.iconCache.has(domain)) {
            return this.iconCache.get(domain);
        }

        // 检查预定义映射
        if (this.iconMappings[domain]) {
            const icon = this.iconMappings[domain];
            this.iconCache.set(domain, icon);
            this.saveToLocalStorage();
            return icon;
        }

        // 使用分类图标
        const categoryIcon = this.categoryIcons[category] || this.categoryIcons['default'];
        this.iconCache.set(domain, categoryIcon);
        this.saveToLocalStorage();
        return categoryIcon;
    }

    /**
     * 为页面元素添加图标
     * @param {string} selector - 选择器
     * @param {Array} links - 链接数组
     */
    addIconsToElements(selector, links) {
        const containers = document.querySelectorAll(selector);
        
        containers.forEach((container, index) => {
            if (index < links.length) {
                const link = links[index];
                const iconHtml = this.getIconHtml(link.domain, link.category, link.title);
                
                // 查找或创建图标容器
                let iconContainer = container.querySelector('.static-icon');
                if (!iconContainer) {
                    iconContainer = document.createElement('div');
                    iconContainer.className = 'static-icon w-8 h-8 mr-3 flex-shrink-0';
                    container.insertBefore(iconContainer, container.firstChild);
                }
                
                iconContainer.innerHTML = iconHtml;
            }
        });
    }

    /**
     * 为友情链接页面添加图标
     * @param {Array} links - 链接数组
     */
    addIconsToFriendshipLinks(links) {
        const container = document.querySelector('.link-grid');
        if (!container) return;

        links.forEach(link => {
            const linkElement = container.querySelector(`a[href="${link.url}"]`);
            if (linkElement) {
                const iconHtml = this.getIconHtml(link.domain, link.category, link.title);
                
                let iconContainer = linkElement.querySelector('.static-icon');
                if (!iconContainer) {
                    iconContainer = document.createElement('div');
                    iconContainer.className = 'static-icon w-8 h-8 mr-3 flex-shrink-0';
                    linkElement.insertBefore(iconContainer, linkElement.firstChild);
                }
                
                iconContainer.innerHTML = iconHtml;
            }
        });
    }

    /**
     * 为导航栏添加图标（已禁用）
     */
    addIconsToNavigation() {
        // 导航栏图标功能已禁用
        return;
    }
}

// 创建全局实例
window.staticIconManager = new StaticIconManager();

// 预定义的链接数据
window.staticLinks = {
    // 友情链接数据
    friendshipLinks: [
        { url: 'https://crossword.best', domain: 'crossword.best', category: 'game', title: '填字游戏' },
        { url: 'https://fruitconnect.online', domain: 'fruitconnect.online', category: 'game', title: '水果连连看' },
        { url: 'https://xingxingren.online', domain: 'xingxingren.online', category: 'social', title: '星星人社区' },
        { url: 'https://tushuguan.online', domain: 'tushuguan.online', category: 'education', title: '在线图书馆' },
        { url: 'https://citylibrary.online', domain: 'citylibrary.online', category: 'education', title: '城市图书馆' },
        { url: 'https://aiwebsiteprompt.online', domain: 'aiwebsiteprompt.online', category: 'ai', title: 'AI网站提示' },
        { url: 'https://zhuangzi.blog', domain: 'zhuangzi.blog', category: 'education', title: '庄子博客' },
        { url: 'https://dreamlist.live', domain: 'dreamlist.live', category: 'tool', title: '梦想清单' },
        { url: 'https://zengguofan.online', domain: 'zengguofan.online', category: 'education', title: '曾国藩在线' },
        { url: 'https://watchbrands.watch', domain: 'watchbrands.watch', category: 'shopping', title: '手表品牌' },
        { url: 'https://rollingsuitcase.online', domain: 'rollingsuitcase.online', category: 'shopping', title: '行李箱服务' },
        { url: 'https://airconditioner.blog', domain: 'airconditioner.blog', category: 'tool', title: '空调博客' },
        { url: 'https://magiccube.online', domain: 'magiccube.online', category: 'game', title: '魔方在线' },
        { url: 'https://tvrepair.cc', domain: 'tvrepair.cc', category: 'tool', title: '电视维修' },
        { url: 'https://baduanjin.online', domain: 'baduanjin.online', category: 'health', title: '八段锦' },
        { url: 'https://picturesize.online', domain: 'picturesize.online', category: 'tool', title: '图片尺寸工具' },
        { url: 'https://yinhangka.online', domain: 'yinhangka.online', category: 'finance', title: '银行卡在线' },
        { url: 'https://postcode.blog', domain: 'postcode.blog', category: 'tool', title: '邮编博客' },
        { url: 'https://zhiyu.blog', domain: 'zhiyu.blog', category: 'education', title: '智语博客' },
        { url: 'https://taoteching.online', domain: 'taoteching.online', category: 'education', title: '道德经在线' },
        { url: 'https://zhanzhuang.online', domain: 'zhanzhuang.online', category: 'health', title: '站桩在线' },
        { url: 'https://youxistudio.online', domain: 'youxistudio.online', category: 'entertainment', title: '游戏工作室' },
        { url: 'https://roujiamodaizi.online', domain: 'roujiamodaizi.online', category: 'food', title: '肉夹馍' },
        { url: 'https://shijian1.online', domain: 'shijian1.online', category: 'tool', title: '时间工具' },
        { url: 'https://webintimer.online', domain: 'webintimer.online', category: 'tool', title: '网页计时器' },
        { url: 'https://suitcaseservice.online', domain: 'suitcaseservice.online', category: 'tool', title: '行李箱服务' },
        { url: 'https://veimg.online', domain: 'veimg.online', category: 'tool', title: '图片工具' }
    ],

    // AI工具链接数据
    aiTools: [
        { url: 'https://chat.deepseek.com/', domain: 'deepseek.com', category: 'ai', title: 'DeepSeek Chat' },
        { url: 'https://gemini.google.com/app', domain: 'google.com', category: 'ai', title: 'Google Gemini' },
        { url: 'https://www.perplexity.ai/', domain: 'perplexity.ai', category: 'ai', title: 'Perplexity AI' },
        { url: 'https://chat.chatbot.app/', domain: 'chatbot.app', category: 'ai', title: 'ChatBot' },
        { url: 'https://claude.ai/', domain: 'claude.ai', category: 'ai', title: 'Claude AI' },
        { url: 'https://chat.openai.com/', domain: 'openai.com', category: 'ai', title: 'ChatGPT' }
    ]
};

// 页面加载完成后初始化图标
document.addEventListener('DOMContentLoaded', function() {
    // 为友情链接页面添加图标
    if (window.location.pathname.includes('friendship-links.html')) {
        window.staticIconManager.addIconsToFriendshipLinks(window.staticLinks.friendshipLinks);
    }
    
    // 为首页AI工具添加图标
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.staticIconManager.addIconsToElements('.tool-card', window.staticLinks.aiTools);
    }

    // 为导航栏添加图标
    window.staticIconManager.addIconsToNavigation();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StaticIconManager;
}
