/**
 * 多品牌LOGO背景展示器
 * 在背景上展示多个相关品牌的LOGO
 */

class MultiBrandBackground {
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
            const cached = localStorage.getItem('multiBrandLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load multi brand logo cache:', error);
        }
    }

    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('multiBrandLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save multi brand logo cache:', error);
        }
    }

    setup() {
        this.createBackgroundContainer();
        this.addMultiBrandLogos();
    }

    createBackgroundContainer() {
        // 创建背景LOGO容器
        const backgroundContainer = document.createElement('div');
        backgroundContainer.id = 'multi-brand-background';
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

    addMultiBrandLogos() {
        // 获取当前页面信息
        const currentPage = this.getCurrentPageInfo();
        if (currentPage && currentPage.brands) {
            this.displayMultiBrandLogos(currentPage);
        }
    }

    getCurrentPageInfo() {
        const currentPath = window.location.pathname;
        const pageMapping = {
            '/index.html': {
                name: 'home',
                title: 'AI工具导航',
                brands: [
                    { domain: 'openai.com', name: 'OpenAI' },
                    { domain: 'anthropic.com', name: 'Anthropic' },
                    { domain: 'google.com', name: 'Google' },
                    { domain: 'microsoft.com', name: 'Microsoft' }
                ]
            },
            '/ai-companies.html': {
                name: 'ai-companies',
                title: 'AI公司',
                brands: [
                    { domain: 'openai.com', name: 'OpenAI' },
                    { domain: 'anthropic.com', name: 'Anthropic' },
                    { domain: 'google.com', name: 'Google' },
                    { domain: 'microsoft.com', name: 'Microsoft' },
                    { domain: 'meta.com', name: 'Meta' },
                    { domain: 'amazon.com', name: 'Amazon' }
                ]
            },
            '/coding.html': {
                name: 'coding',
                title: '编程工具',
                brands: [
                    { domain: 'github.com', name: 'GitHub' },
                    { domain: 'gitlab.com', name: 'GitLab' },
                    { domain: 'stackoverflow.com', name: 'Stack Overflow' },
                    { domain: 'visualstudio.com', name: 'Visual Studio' }
                ]
            },
            '/designer.html': {
                name: 'designer',
                title: '设计师工具',
                brands: [
                    { domain: 'figma.com', name: 'Figma' },
                    { domain: 'adobe.com', name: 'Adobe' },
                    { domain: 'sketch.com', name: 'Sketch' },
                    { domain: 'invisionapp.com', name: 'InVision' }
                ]
            },
            '/writing.html': {
                name: 'writing',
                title: '写作工具',
                brands: [
                    { domain: 'notion.so', name: 'Notion' },
                    { domain: 'medium.com', name: 'Medium' },
                    { domain: 'grammarly.com', name: 'Grammarly' },
                    { domain: 'evernote.com', name: 'Evernote' }
                ]
            },
            '/image.html': {
                name: 'image',
                title: '图像处理',
                brands: [
                    { domain: 'canva.com', name: 'Canva' },
                    { domain: 'adobe.com', name: 'Adobe' },
                    { domain: 'pinterest.com', name: 'Pinterest' },
                    { domain: 'unsplash.com', name: 'Unsplash' }
                ]
            },
            '/video.html': {
                name: 'video',
                title: '视频制作',
                brands: [
                    { domain: 'youtube.com', name: 'YouTube' },
                    { domain: 'vimeo.com', name: 'Vimeo' },
                    { domain: 'adobe.com', name: 'Adobe' },
                    { domain: 'davinciresolve.com', name: 'DaVinci Resolve' }
                ]
            },
            '/audio.html': {
                name: 'audio',
                title: '音频处理',
                brands: [
                    { domain: 'spotify.com', name: 'Spotify' },
                    { domain: 'apple.com', name: 'Apple Music' },
                    { domain: 'audacityteam.org', name: 'Audacity' },
                    { domain: 'adobe.com', name: 'Adobe Audition' }
                ]
            },
            '/ailinks.html': {
                name: 'ai-links',
                title: 'AI链接',
                brands: [
                    { domain: 'openai.com', name: 'OpenAI' },
                    { domain: 'anthropic.com', name: 'Anthropic' },
                    { domain: 'google.com', name: 'Google AI' },
                    { domain: 'huggingface.co', name: 'Hugging Face' }
                ]
            }
        };
        
        return pageMapping[currentPath] || null;
    }

    async displayMultiBrandLogos(pageInfo) {
        const backgroundContainer = document.getElementById('multi-brand-background');
        if (!backgroundContainer) return;

        // 创建品牌LOGO网格
        const brandGrid = document.createElement('div');
        brandGrid.className = 'brand-logo-grid';
        brandGrid.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            padding: 40px;
            align-items: center;
            justify-items: center;
        `;

        // 为每个品牌创建LOGO
        for (let i = 0; i < pageInfo.brands.length; i++) {
            const brand = pageInfo.brands[i];
            const logoElement = await this.createBrandLogo(brand, i);
            brandGrid.appendChild(logoElement);
        }

        backgroundContainer.appendChild(brandGrid);
    }

    async createBrandLogo(brand, index) {
        const logoContainer = document.createElement('div');
        logoContainer.className = 'brand-logo-item';
        logoContainer.style.cssText = `
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transform: scale(0.8);
            animation: brandLogoAppear 0.6s ease-out ${index * 0.2}s forwards;
        `;

        try {
            // 检查缓存
            if (this.logoCache.has(brand.domain)) {
                this.setBrandLogo(logoContainer, this.logoCache.get(brand.domain), brand);
            } else {
                // 获取品牌LOGO
                const logoUrl = await this.getBrandLogo(brand.domain);
                
                // 缓存结果
                this.logoCache.set(brand.domain, logoUrl);
                this.saveCache();
                
                // 设置品牌LOGO
                this.setBrandLogo(logoContainer, logoUrl, brand);
            }
        } catch (error) {
            console.warn(`Failed to fetch logo for ${brand.domain}:`, error);
            this.setDefaultBrandLogo(logoContainer, brand);
        }

        return logoContainer;
    }

    async getBrandLogo(domain) {
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
            
            // 第三方服务
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

    setBrandLogo(container, logoUrl, brand) {
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
            this.setDefaultBrandLogo(container, brand);
        }
    }

    setDefaultBrandLogo(container, brand) {
        // 创建默认品牌标识
        const defaultLogo = document.createElement('div');
        defaultLogo.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.1);
            text-transform: uppercase;
        `;
        defaultLogo.textContent = brand.name.charAt(0).toUpperCase();
        
        container.appendChild(defaultLogo);
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    #multi-brand-background {
        animation: fadeIn 1s ease-in-out;
    }
    
    .brand-logo-item {
        transition: all 0.3s ease;
    }
    
    .brand-logo-item:hover {
        transform: scale(1.1) !important;
        opacity: 0.15 !important;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 0.08; }
    }
    
    @keyframes brandLogoAppear {
        to {
            opacity: 0.1;
            transform: scale(1);
        }
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
        .brand-logo-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
            gap: 15px !important;
            padding: 20px !important;
        }
        
        .brand-logo-item {
            width: 80px !important;
            height: 80px !important;
        }
    }
    
    @media (max-width: 480px) {
        .brand-logo-grid {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)) !important;
            gap: 10px !important;
            padding: 15px !important;
        }
        
        .brand-logo-item {
            width: 60px !important;
            height: 60px !important;
        }
    }
`;
document.head.appendChild(style);

// 初始化
const multiBrandBackground = new MultiBrandBackground();
