/**
 * 首页LOGO背景管理器
 * 为首页添加目标品牌的LOGO作为背景
 */

class HomepageLogoManager {
    constructor() {
        this.logoCache = new Map();
        this.loadFromLocalStorage();
        this.initializeBrandMappings();
        this.init();
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
     * 初始化品牌LOGO映射
     */
    initializeBrandMappings() {
        // 预定义的品牌LOGO映射
        this.brandMappings = {
            // AI大模型公司
            'openai.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1280px-OpenAI_Logo.svg.png',
                fallback: '🤖',
                name: 'OpenAI'
            },
            'anthropic.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Anthropic_logo.svg/1200px-Anthropic_logo.svg.png',
                fallback: '🧠',
                name: 'Anthropic'
            },
            'ai.google': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png',
                fallback: '🔍',
                name: 'Google AI'
            },
            'microsoft.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
                fallback: '🪟',
                name: 'Microsoft'
            },
            'ai.meta.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png',
                fallback: '📘',
                name: 'Meta AI'
            },
            'amazon.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
                fallback: '📦',
                name: 'Amazon'
            },

            // 编程工具
            'github.com': {
                url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
                fallback: '🐙',
                name: 'GitHub'
            },
            'gitlab.com': {
                url: 'https://about.gitlab.com/images/press/logo/svg/gitlab-icon-rgb.svg',
                fallback: '🦊',
                name: 'GitLab'
            },
            'stackoverflow.com': {
                url: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png',
                fallback: '💻',
                name: 'Stack Overflow'
            },
            'visualstudio.com': {
                url: 'https://visualstudio.microsoft.com/wp-content/uploads/2019/06/BrandVisualStudioWin2019-3.svg',
                fallback: '🔧',
                name: 'Visual Studio'
            },

            // 设计师工具
            'figma.com': {
                url: 'https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png',
                fallback: '🎨',
                name: 'Figma'
            },
            'adobe.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/1200px-Adobe_Systems_logo_and_wordmark.svg.png',
                fallback: '🎭',
                name: 'Adobe'
            },
            'sketch.com': {
                url: 'https://www.sketch.com/images/press/sketch-press-kit.zip',
                fallback: '✏️',
                name: 'Sketch'
            },
            'invisionapp.com': {
                url: 'https://www.invisionapp.com/static/img/invision-logo.svg',
                fallback: '👁️',
                name: 'InVision'
            },

            // 写作工具
            'notion.so': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Notion_app_logo.png/1200px-Notion_app_logo.png',
                fallback: '📝',
                name: 'Notion'
            },
            'medium.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png',
                fallback: '📰',
                name: 'Medium'
            },
            'grammarly.com': {
                url: 'https://static.grammarly.com/assets/files/cb6ce17d281d15f2c81905b5e3c650e8/ukraine-grammarly-logo.svg',
                fallback: '✍️',
                name: 'Grammarly'
            },
            'evernote.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Evernote_Logo.svg/1200px-Evernote_Logo.svg.png',
                fallback: '🐘',
                name: 'Evernote'
            },

            // 图像处理
            'canva.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/1200px-Canva_icon_2021.svg.png',
                fallback: '🎨',
                name: 'Canva'
            },
            'pinterest.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/1200px-Pinterest-logo.png',
                fallback: '📌',
                name: 'Pinterest'
            },
            'unsplash.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_Unsplash.svg/1200px-Logo_of_Unsplash.svg.png',
                fallback: '📸',
                name: 'Unsplash'
            },

            // 视频制作
            'youtube.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_logo_%282017%29.svg/1200px-YouTube_logo_%282017%29.svg.png',
                fallback: '📺',
                name: 'YouTube'
            },
            'vimeo.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Vimeo_icon.svg/1200px-Vimeo_icon.svg.png',
                fallback: '🎬',
                name: 'Vimeo'
            },
            'davinciresolve.com': {
                url: 'https://www.blackmagicdesign.com/images/products/davinciresolve/logo.png',
                fallback: '🎬',
                name: 'DaVinci Resolve'
            },

            // 音频处理
            'spotify.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1200px-Spotify_icon.svg.png',
                fallback: '🎵',
                name: 'Spotify'
            },
            'apple.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png',
                fallback: '🍎',
                name: 'Apple'
            },
            'audacityteam.org': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Audacity_Logo.svg/1200px-Audacity_Logo.svg.png',
                fallback: '🎤',
                name: 'Audacity'
            },

            // AI社区与学习
            'huggingface.co': {
                url: 'https://huggingface.co/front/assets/huggingface_logo.svg',
                fallback: '🤗',
                name: 'Hugging Face'
            },
            'discord.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Discord_logo.svg/1200px-Discord_logo.svg.png',
                fallback: '💬',
                name: 'Discord'
            },
            'coursera.org': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png',
                fallback: '🎓',
                name: 'Coursera'
            },
            'kaggle.com': {
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kaggle_logo.svg/1200px-Kaggle_logo.svg.png',
                fallback: '📊',
                name: 'Kaggle'
            }
        };
    }

    /**
     * 初始化
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * 设置首页LOGO背景
     */
    setup() {
        this.createBackgroundContainer();
        this.addBrandLogosToBackground();
    }

    /**
     * 创建背景容器
     */
    createBackgroundContainer() {
        // 检查是否已存在背景容器
        if (document.getElementById('homepage-brand-background')) {
            return;
        }

        const backgroundContainer = document.createElement('div');
        backgroundContainer.id = 'homepage-brand-background';
        backgroundContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
            opacity: 0.08;
        `;
        
        document.body.appendChild(backgroundContainer);
    }

    /**
     * 添加品牌LOGO到背景
     */
    addBrandLogosToBackground() {
        const backgroundContainer = document.getElementById('homepage-brand-background');
        if (!backgroundContainer) return;

        // 选择要显示的品牌（首页显示主要AI品牌）
        const mainBrands = [
            'openai.com',
            'anthropic.com',
            'ai.google',
            'microsoft.com',
            'ai.meta.com',
            'amazon.com'
        ];

        // 创建品牌LOGO网格
        const brandGrid = document.createElement('div');
        brandGrid.className = 'homepage-brand-grid';
        brandGrid.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            padding: 60px;
            align-items: center;
            justify-items: center;
        `;

        // 为每个品牌创建LOGO
        mainBrands.forEach((brandDomain, index) => {
            this.createBrandLogoElement(brandGrid, brandDomain, index);
        });

        backgroundContainer.appendChild(brandGrid);
    }

    /**
     * 创建品牌LOGO元素
     */
    async createBrandLogoElement(container, brandDomain, index) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'homepage-brand-logo';
        logoContainer.style.cssText = `
            width: 150px;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.8);
            animation: homepageBrandLogoAppear 0.8s ease-out ${index * 0.3}s forwards;
            transition: all 0.3s ease;
        `;

        try {
            const brandInfo = this.brandMappings[brandDomain];
            if (!brandInfo) {
                this.setDefaultLogo(logoContainer, brandDomain);
                return;
            }

            // 检查缓存
            if (this.logoCache.has(brandDomain)) {
                this.setBrandLogo(logoContainer, this.logoCache.get(brandDomain), brandInfo);
            } else {
                // 获取品牌LOGO
                const logoUrl = await this.fetchBrandLogo(brandDomain, brandInfo);
                
                // 缓存结果
                this.logoCache.set(brandDomain, logoUrl);
                this.saveToLocalStorage();
                
                // 设置品牌LOGO
                this.setBrandLogo(logoContainer, logoUrl, brandInfo);
            }
        } catch (error) {
            console.warn(`Failed to fetch logo for ${brandDomain}:`, error);
            this.setDefaultLogo(logoContainer, brandDomain);
        }

        container.appendChild(logoContainer);
    }

    /**
     * 获取品牌LOGO
     */
    async fetchBrandLogo(domain, brandInfo) {
        // 优先使用预定义的URL
        if (brandInfo.url) {
            try {
                const exists = await this.checkImageExists(brandInfo.url);
                if (exists) {
                    return brandInfo.url;
                }
            } catch (error) {
                console.warn(`Failed to load predefined logo for ${domain}:`, error);
            }
        }

        // 尝试从网站获取LOGO
        const logoUrls = this.generateLogoUrls(domain);
        
        for (const url of logoUrls) {
            try {
                const exists = await this.checkImageExists(url);
                if (exists) {
                    return url;
                }
            } catch (error) {
                continue;
            }
        }
        
        return null;
    }

    /**
     * 生成LOGO URL列表
     */
    generateLogoUrls(domain) {
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
            
            // 第三方服务
            `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=64`
        ];
    }

    /**
     * 检查图片是否存在
     */
    async checkImageExists(url) {
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
     * 设置品牌LOGO
     */
    setBrandLogo(container, logoUrl, brandInfo) {
        if (logoUrl) {
            // 创建品牌LOGO图片
            const logoImg = document.createElement('div');
            logoImg.style.cssText = `
                width: 100%;
                height: 100%;
                background-image: url('${logoUrl}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                filter: blur(0.5px);
                transition: all 0.3s ease;
            `;
            
            container.appendChild(logoImg);
        } else {
            this.setDefaultLogo(container, brandInfo.name || 'Brand');
        }
    }

    /**
     * 设置默认LOGO
     */
    setDefaultLogo(container, brandName) {
        const defaultLogo = document.createElement('div');
        defaultLogo.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.1);
            text-transform: uppercase;
        `;
        defaultLogo.textContent = brandName.charAt(0).toUpperCase();
        
        container.appendChild(defaultLogo);
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    #homepage-brand-background {
        animation: fadeIn 1s ease-in-out;
    }
    
    .homepage-brand-logo {
        transition: all 0.3s ease;
    }
    
    .homepage-brand-logo:hover {
        transform: scale(1.1) !important;
        opacity: 0.15 !important;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.08; }
    }
    
    @keyframes homepageBrandLogoAppear {
        to {
            opacity: 0.1;
            transform: scale(1);
        }
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .homepage-brand-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            gap: 20px !important;
            padding: 30px !important;
        }
        
        .homepage-brand-logo {
            width: 100px !important;
            height: 100px !important;
        }
    }
    
    @media (max-width: 480px) {
        .homepage-brand-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important;
            gap: 15px !important;
            padding: 20px !important;
        }
        
        .homepage-brand-logo {
            width: 70px !important;
            height: 70px !important;
        }
    }
`;
document.head.appendChild(style);

// 初始化
window.homepageLogoManager = new HomepageLogoManager();
