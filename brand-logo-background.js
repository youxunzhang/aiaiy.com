/**
 * 品牌LOGO背景展示器
 * 在背景图上展示对应品牌的LOGO
 */

class BrandLogoBackground {
    constructor() {
        this.logoCache = new Map();
        this.loadCache();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    loadCache() {
        try {
            const cached = localStorage.getItem('brandLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load brand logo cache:', error);
        }
    }

    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('brandLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save brand logo cache:', error);
        }
    }

    setup() {
        this.createBackgroundContainer();
        this.addBrandLogosToBackground();
    }

    createBackgroundContainer() {
        // 创建背景LOGO容器
        const backgroundContainer = document.createElement('div');
        backgroundContainer.id = 'brand-logo-background';
        backgroundContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            opacity: 0.1;
        `;
        
        document.body.appendChild(backgroundContainer);
    }

    addBrandLogosToBackground() {
        // 获取当前页面信息
        const currentPage = this.getCurrentPageInfo();
        if (currentPage && currentPage.brandDomain) {
            this.fetchAndDisplayBrandLogo(currentPage);
        }
    }

    getCurrentPageInfo() {
        const currentPath = window.location.pathname;
        const pageMapping = {
            '/index.html': {
                name: 'home',
                brandDomain: 'aiaiy.com',
                title: 'AI工具导航'
            },
            '/ai-companies.html': {
                name: 'ai-companies',
                brandDomain: 'aiaiy.com',
                title: 'AI公司'
            },
            '/ai-ranking.html': {
                name: 'ai-ranking',
                brandDomain: 'aiaiy.com',
                title: 'AI榜单'
            },
            '/trends.html': {
                name: 'trends',
                brandDomain: 'aiaiy.com',
                title: 'AI趋势'
            },
            '/ai-capabilities.html': {
                name: 'ai-capabilities',
                brandDomain: 'aiaiy.com',
                title: 'AI功能'
            },
            '/coding.html': {
                name: 'coding',
                brandDomain: 'github.com',
                title: '编程工具'
            },
            '/designer.html': {
                name: 'designer',
                brandDomain: 'figma.com',
                title: '设计师工具'
            },
            '/writing.html': {
                name: 'writing',
                brandDomain: 'notion.so',
                title: '写作工具'
            },
            '/image.html': {
                name: 'image',
                brandDomain: 'canva.com',
                title: '图像处理'
            },
            '/video.html': {
                name: 'video',
                brandDomain: 'youtube.com',
                title: '视频制作'
            },
            '/audio.html': {
                name: 'audio',
                brandDomain: 'spotify.com',
                title: '音频处理'
            },
            '/ailinks.html': {
                name: 'ai-links',
                brandDomain: 'openai.com',
                title: 'AI链接'
            },
            '/aicommunity.html': {
                name: 'ai-community',
                brandDomain: 'discord.com',
                title: 'AI社区'
            },
            '/aicontent.html': {
                name: 'ai-content',
                brandDomain: 'medium.com',
                title: 'AI内容'
            },
            '/ailearn.html': {
                name: 'ai-learning',
                brandDomain: 'coursera.org',
                title: 'AI学习'
            },
            '/ainum.html': {
                name: 'ai-numbers',
                brandDomain: 'kaggle.com',
                title: 'AI数字'
            },
            '/aioffice.html': {
                name: 'ai-office',
                brandDomain: 'microsoft.com',
                title: 'AI办公'
            },
            '/aiprompt.html': {
                name: 'ai-prompts',
                brandDomain: 'prompthero.com',
                title: 'AI提示'
            },
            '/aitimer.html': {
                name: 'ai-timer',
                brandDomain: 'toggl.com',
                title: 'AI计时器'
            },
            '/aiagent.html': {
                name: 'ai-agents',
                brandDomain: 'zapier.com',
                title: 'AI代理'
            }
        };
        
        return pageMapping[currentPath] || null;
    }

    async fetchAndDisplayBrandLogo(pageInfo) {
        try {
            // 检查缓存
            if (this.logoCache.has(pageInfo.name)) {
                this.displayBrandLogo(this.logoCache.get(pageInfo.name), pageInfo);
                return;
            }

            // 获取品牌LOGO
            const logoUrl = await this.getBrandLogo(pageInfo.brandDomain);
            
            // 缓存结果
            this.logoCache.set(pageInfo.name, logoUrl);
            this.saveCache();
            
            // 显示品牌LOGO
            this.displayBrandLogo(logoUrl, pageInfo);
            
        } catch (error) {
            console.warn(`Failed to fetch brand logo for ${pageInfo.name}:`, error);
        }
    }

    async getBrandLogo(domain) {
        // 使用多种LOGO获取方式
        const logoUrls = this.getLogoUrls(domain);
        
        for (const url of logoUrls) {
            try {
                const exists = await this.checkLogoExists(url);
                if (exists) {
                    return url;
                }
            } catch (error) {
                continue;
            }
        }
        
        return null;
    }

    getLogoUrls(domain) {
        const baseUrl = `https://${domain}`;
        return [
            // 高分辨率LOGO路径
            `${baseUrl}/logo.png`,
            `${baseUrl}/logo.jpg`,
            `${baseUrl}/logo.svg`,
            `${baseUrl}/logo@2x.png`,
            `${baseUrl}/logo@3x.png`,
            
            // 标准LOGO路径
            `${baseUrl}/assets/logo.png`,
            `${baseUrl}/assets/logo.svg`,
            `${baseUrl}/images/logo.png`,
            `${baseUrl}/images/logo.svg`,
            `${baseUrl}/static/logo.png`,
            `${baseUrl}/static/logo.svg`,
            
            // 品牌LOGO路径
            `${baseUrl}/brand/logo.png`,
            `${baseUrl}/brand/logo.svg`,
            `${baseUrl}/branding/logo.png`,
            `${baseUrl}/branding/logo.svg`,
            
            // 标准favicon路径
            `${baseUrl}/favicon.ico`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/favicon.jpg`,
            
            // Apple touch icon
            `${baseUrl}/apple-touch-icon.png`,
            `${baseUrl}/apple-touch-icon-precomposed.png`,
            
            // 第三方服务 - 作为备用方案
            `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=64`
        ];
    }

    async checkLogoExists(url) {
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

    displayBrandLogo(logoUrl, pageInfo) {
        const backgroundContainer = document.getElementById('brand-logo-background');
        if (!backgroundContainer) return;

        if (logoUrl) {
            // 创建品牌LOGO元素
            const brandLogo = document.createElement('div');
            brandLogo.className = 'brand-logo-display';
            brandLogo.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 300px;
                background-image: url('${logoUrl}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0.05;
                filter: blur(1px);
                transition: all 0.5s ease;
            `;
            
            // 添加品牌名称
            const brandName = document.createElement('div');
            brandName.className = 'brand-name';
            brandName.textContent = pageInfo.title;
            brandName.style.cssText = `
                position: absolute;
                bottom: -40px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 24px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.1);
                text-align: center;
                white-space: nowrap;
            `;
            
            brandLogo.appendChild(brandName);
            backgroundContainer.appendChild(brandLogo);
            
            // 添加动画效果
            setTimeout(() => {
                brandLogo.style.opacity = '0.08';
                brandLogo.style.filter = 'blur(0.5px)';
            }, 100);
            
        } else {
            // 如果没有LOGO，显示默认品牌标识
            const defaultBrand = document.createElement('div');
            defaultBrand.className = 'default-brand';
            defaultBrand.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.05);
                text-transform: uppercase;
            `;
            defaultBrand.textContent = pageInfo.name.charAt(0).toUpperCase();
            
            backgroundContainer.appendChild(defaultBrand);
        }
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    #brand-logo-background {
        animation: fadeIn 1s ease-in-out;
    }
    
    .brand-logo-display {
        animation: float 6s ease-in-out infinite;
    }
    
    .default-brand {
        animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.1; }
    }
    
    @keyframes float {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
        50% { transform: translate(-50%, -50%) translateY(-10px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.08; transform: translate(-50%, -50%) scale(1.05); }
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .brand-logo-display {
            width: 200px !important;
            height: 200px !important;
        }
        
        .brand-name {
            font-size: 18px !important;
        }
        
        .default-brand {
            width: 150px !important;
            height: 150px !important;
            font-size: 36px !important;
        }
    }
`;
document.head.appendChild(style);

// 初始化
const brandLogoBackground = new BrandLogoBackground();
