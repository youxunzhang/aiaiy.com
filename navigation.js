/**
 * 统一导航栏组件
 * 为所有页面提供一致的左侧导航栏
 */

class NavigationManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    /**
     * 获取当前页面
     */
    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.includes('index.html')) return 'index';
        if (path.includes('ai-companies.html')) return 'ai-companies';
        if (path.includes('play-game.html')) return 'play-game';
        if (path.includes('ai-hotspots.html')) return 'ai-hotspots';
        if (path.includes('real-needs.html')) return 'real-needs';
        if (path.includes('ai-ranking.html')) return 'ai-ranking';
        if (path.includes('ai-overseas.html')) return 'ai-overseas';
        if (path.includes('ai-ads.html')) return 'ai-ads';
        if (path.includes('trends.html')) return 'trends';
        if (path.includes('ai-capabilities.html')) return 'ai-capabilities';
        if (path.includes('lunch-recommendations.html')) return 'lunch-recommendations';
        if (path.includes('coding.html')) return 'coding';
        if (path.includes('designer.html')) return 'designer';
        if (path.includes('writing.html')) return 'writing';
        if (path.includes('image.html')) return 'image';
        if (path.includes('video.html')) return 'video';
        if (path.includes('audio.html')) return 'audio';
        if (path.includes('music.html')) return 'music';
        if (path.includes('social.html')) return 'social';
        if (path.includes('seo.html')) return 'seo';
        if (path.includes('game.html')) return 'game';
        if (path.includes('prayer.html')) return 'prayer';
        if (path.includes('words.html')) return 'words';
        if (path.includes('xiaohongshu.html')) return 'xiaohongshu';
        if (path.includes('hanghai.html')) return 'hanghai';
        if (path.includes('chuhai.html')) return 'chuhai';
        if (path.includes('img.html')) return 'img';
        if (path.includes('links.html')) return 'links';
        if (path.includes('ailinks.html')) return 'ailinks';
        if (path.includes('aicommunity.html')) return 'aicommunity';
        if (path.includes('aicontent.html')) return 'aicontent';
        if (path.includes('ailearn.html')) return 'ailearn';
        if (path.includes('ainum.html')) return 'ainum';
        if (path.includes('aioffice.html')) return 'aioffice';
        if (path.includes('aiprompt.html')) return 'aiprompt';
        if (path.includes('aitimer.html')) return 'aitimer';
        if (path.includes('aiagent.html')) return 'aiagent';
        if (path.includes('batch-open.html')) return 'batch-open';
        if (path.includes('url-opener.html')) return 'url-opener';
        if (path.includes('gametest.html')) return 'gametest';
        return 'index';
    }

    /**
     * 初始化导航栏
     */
    init() {
        this.createSidebar();
        this.createSidebarToggle();
        this.bindEvents();
        this.setActivePage();
    }

    /**
     * 创建侧边栏
     */
    createSidebar() {
        // 检查是否已存在侧边栏
        if (document.getElementById('sidebar')) {
            return;
        }

        const sidebar = document.createElement('aside');
        sidebar.id = 'sidebar';
        sidebar.className = 'sidebar';
        sidebar.innerHTML = this.getSidebarHTML();
        
        document.body.insertBefore(sidebar, document.body.firstChild);
    }

    /**
     * 创建侧边栏切换按钮
     */
    createSidebarToggle() {
        // 检查是否已存在切换按钮
        if (document.getElementById('sidebarToggle')) {
            return;
        }

        const toggle = document.createElement('button');
        toggle.id = 'sidebarToggle';
        toggle.className = 'sidebar-toggle';
        toggle.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        `;
        
        document.body.insertBefore(toggle, document.body.firstChild);
    }

    /**
     * 获取侧边栏HTML
     */
    getSidebarHTML() {
        return `
            <div class="p-6">
                <!-- Logo区域 -->
                <div class="flex items-center space-x-3 mb-8">
                    <a href="index.html" class="flex items-center space-x-3">
                        <span class="block">
                          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="ai-logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00f2fe"/>
                                <stop offset="1" stop-color="#764ba2"/>
                              </linearGradient>
                            </defs>
                            <circle cx="24" cy="24" r="22" fill="url(#ai-logo-gradient)" stroke="#222" stroke-width="2"/>
                            <rect x="14" y="14" width="20" height="20" rx="6" fill="#18181b" stroke="url(#ai-logo-gradient)" stroke-width="2"/>
                            <path d="M20 30V18M28 30V18M20 24H28" stroke="#00f2fe" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="24" cy="24" r="3.5" fill="#00f2fe" fill-opacity="0.7"/>
                          </svg>
                        </span>
                        <span class="text-xl font-bold text-gray-900">AIAIY</span>
                    </a>
                </div>

                <!-- 导航菜单 -->
                <nav class="space-y-2">
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">主要页面</div>
                    <a href="index.html" class="nav-link" data-page="index">🏠 Home</a>
                    <a href="ai-companies.html" class="nav-link" data-page="ai-companies">🏢 AI公司</a>
                    <a href="play-game.html" class="nav-link" data-page="play-game">🎮 游戏</a>
                    <a href="ai-hotspots.html" class="nav-link" data-page="ai-hotspots">🔥 AI热点</a>
                    <a href="real-needs.html" class="nav-link" data-page="real-needs">🎯 真需求</a>
                    <a href="ai-ranking.html" class="nav-link" data-page="ai-ranking">📊 AI榜单</a>
                    <a href="ai-overseas.html" class="nav-link" data-page="ai-overseas">🌍 AI出海</a>
                    <a href="ai-ads.html" class="nav-link" data-page="ai-ads">📢 AI ADS</a>
                    <a href="trends.html" class="nav-link" data-page="trends">📈 趋势</a>
                    <a href="ai-capabilities.html" class="nav-link" data-page="ai-capabilities">⚡ AI功能</a>
                    <a href="lunch-recommendations.html" class="nav-link" data-page="lunch-recommendations">🍽️ 午餐推荐</a>
                    
                    <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4 mt-8">工具页面</div>
                    <a href="coding.html" class="nav-link" data-page="coding">💻 编程工具</a>
                    <a href="designer.html" class="nav-link" data-page="designer">🎨 设计师工具</a>
                    <a href="writing.html" class="nav-link" data-page="writing">✍️ 写作工具</a>
                    <a href="image.html" class="nav-link" data-page="image">🖼️ 图像处理</a>
                    <a href="video.html" class="nav-link" data-page="video">🎬 视频制作</a>
                    <a href="audio.html" class="nav-link" data-page="audio">🎵 音频处理</a>
                    <a href="music.html" class="nav-link" data-page="music">🎼 音乐创作</a>
                    <a href="social.html" class="nav-link" data-page="social">📱 社交媒体</a>
                    <a href="seo.html" class="nav-link" data-page="seo">🔍 SEO工具</a>
                    <a href="game.html" class="nav-link" data-page="game">🎮 游戏开发</a>
                    <a href="prayer.html" class="nav-link" data-page="prayer">🙏 祈祷工具</a>
                    <a href="words.html" class="nav-link" data-page="words">📝 词汇工具</a>
                    <a href="xiaohongshu.html" class="nav-link" data-page="xiaohongshu">📖 小红书工具</a>
                    <a href="hanghai.html" class="nav-link" data-page="hanghai">🚢 航海工具</a>
                    <a href="chuhai.html" class="nav-link" data-page="chuhai">🌊 出海工具</a>
                    <a href="img.html" class="nav-link" data-page="img">🖼️ 图片工具</a>
                    <a href="links.html" class="nav-link" data-page="links">🔗 链接工具</a>
                    <a href="ailinks.html" class="nav-link" data-page="ailinks">🤖 AI链接</a>
                    <a href="aicommunity.html" class="nav-link" data-page="aicommunity">👥 AI社区</a>
                    <a href="aicontent.html" class="nav-link" data-page="aicontent">📄 AI内容</a>
                    <a href="ailearn.html" class="nav-link" data-page="ailearn">📚 AI学习</a>
                    <a href="ainum.html" class="nav-link" data-page="ainum">🔢 AI数字</a>
                    <a href="aioffice.html" class="nav-link" data-page="aioffice">💼 AI办公</a>
                    <a href="aiprompt.html" class="nav-link" data-page="aiprompt">💡 AI提示</a>
                    <a href="aitimer.html" class="nav-link" data-page="aitimer">⏰ AI计时器</a>
                    <a href="aiagent.html" class="nav-link" data-page="aiagent">🤖 AI代理</a>
                    <a href="url-opener.html" class="nav-link" data-page="url-opener">🔗 URL Opener</a>
                    <a href="batch-open.html" class="nav-link" data-page="batch-open">🚀 批量打开</a>
                    <a href="gametest.html" class="nav-link" data-page="gametest">🎯 游戏测试</a>
                </nav>

                <!-- 语言切换 -->
                <div class="mt-8 pt-6 border-t border-gray-200">
                    <button class="language-switch w-full" onclick="switchLanguage('en')">English</button>
                </div>
            </div>
        `;
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 侧边栏切换
        const toggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content') || document.querySelector('main');

        if (toggle && sidebar) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                if (mainContent) {
                    mainContent.classList.toggle('expanded');
                }
            });
        }

        // 移动端点击外部关闭侧边栏
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar?.contains(e.target) && !toggle?.contains(e.target)) {
                    sidebar?.classList.add('collapsed');
                    mainContent?.classList.add('expanded');
                }
            }
        });
    }

    /**
     * 设置当前页面为激活状态
     */
    setActivePage() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    /**
     * 添加导航栏样式
     */
    addStyles() {
        if (document.getElementById('navigation-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'navigation-styles';
        style.textContent = `
            /* 侧边栏样式 */
            .sidebar {
                position: fixed;
                left: 0;
                top: 0;
                height: 100vh;
                width: 280px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-right: 1px solid #E5E7EB;
                z-index: 1000;
                box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
                overflow-y: auto;
                transition: transform 0.3s ease;
            }

            .sidebar.collapsed {
                transform: translateX(-100%);
            }

            .sidebar-toggle {
                position: fixed;
                left: 20px;
                top: 20px;
                z-index: 1001;
                background: #2563EB;
                border: none;
                border-radius: 8px;
                padding: 8px;
                color: white;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .sidebar-toggle:hover {
                background: #1d4ed8;
                transform: scale(1.05);
            }

            .main-content {
                margin-left: 280px;
                transition: margin-left 0.3s ease;
            }

            .main-content.expanded {
                margin-left: 0;
            }

            .nav-link {
                color: #6B7280;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.2s ease;
                padding: 0.75rem 1.5rem;
                border-radius: 0.5rem;
                margin: 0.25rem 1rem;
                display: block;
            }

            .nav-link:hover {
                color: #2563EB;
                background: #F9FAFB;
                transform: translateX(5px);
            }

            .nav-link.active {
                color: #2563EB;
                background: #EFF6FF;
                border-left: 3px solid #2563EB;
            }

            .language-switch {
                background: #2563EB;
                border: none;
                border-radius: 0.375rem;
                padding: 0.5rem 1rem;
                color: white;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .language-switch:hover {
                background: #1d4ed8;
            }

            /* 移动端响应式 */
            @media (max-width: 768px) {
                .sidebar {
                    transform: translateX(-100%);
                }
                
                .main-content {
                    margin-left: 0;
                }
                
                .sidebar-toggle {
                    display: block;
                }
            }

            @media (min-width: 769px) {
                .sidebar-toggle {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// 创建全局实例
window.navigationManager = new NavigationManager();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    window.navigationManager.addStyles();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}
