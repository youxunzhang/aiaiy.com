/**
 * 导航栏外部网站LOGO获取器
 * 为导航栏链接获取对应外部网站的实际LOGO
 */

class NavExternalLogosFetcher {
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
            const cached = localStorage.getItem('navExternalLogoCache');
            if (cached) {
                const parsed = JSON.parse(cached);
                this.logoCache = new Map(Object.entries(parsed));
            }
        } catch (error) {
            console.warn('Failed to load nav external logo cache:', error);
        }
    }

    saveCache() {
        try {
            const cacheObj = Object.fromEntries(this.logoCache);
            localStorage.setItem('navExternalLogoCache', JSON.stringify(cacheObj));
        } catch (error) {
            console.warn('Failed to save nav external logo cache:', error);
        }
    }

    setup() {
        this.addLogosToNavLinks();
        this.addLogosToDropdown();
        this.addLogosToMobile();
    }

    addLogosToNavLinks() {
        const links = document.querySelectorAll('.nav-link-horizontal');
        links.forEach(link => this.addLogo(link));
    }

    addLogosToDropdown() {
        const items = document.querySelectorAll('.dropdown-item');
        items.forEach(item => this.addLogo(item));
    }

    addLogosToMobile() {
        const links = document.querySelectorAll('.mobile-nav-link');
        links.forEach(link => this.addLogo(link));
    }

    addLogo(link) {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;

        const pageInfo = this.getPageInfo(href);
        if (!pageInfo) return;

        const logoContainer = this.createLogoContainer(pageInfo);
        link.insertBefore(logoContainer, link.firstChild);
        
        // 尝试获取网站LOGO
        this.fetchWebsiteLogo(pageInfo, logoContainer);
    }

    getPageInfo(href) {
        // 页面信息映射 - 包含外部网站信息
        const pageMapping = {
            'index.html': {
                name: 'home',
                domain: 'aiaiy.com',
                title: 'AI工具导航',
                externalDomain: null
            },
            'ai-companies.html': {
                name: 'ai-companies',
                domain: 'aiaiy.com',
                title: 'AI公司',
                externalDomain: null
            },
            'ai-ranking.html': {
                name: 'ai-ranking',
                domain: 'aiaiy.com',
                title: 'AI榜单',
                externalDomain: null
            },
            'trends.html': {
                name: 'trends',
                domain: 'aiaiy.com',
                title: 'AI趋势',
                externalDomain: null
            },
            'ai-capabilities.html': {
                name: 'ai-capabilities',
                domain: 'aiaiy.com',
                title: 'AI功能',
                externalDomain: null
            },
            'coding.html': {
                name: 'coding',
                domain: 'aiaiy.com',
                title: '编程工具',
                externalDomain: 'github.com'
            },
            'designer.html': {
                name: 'designer',
                domain: 'aiaiy.com',
                title: '设计师工具',
                externalDomain: 'figma.com'
            },
            'writing.html': {
                name: 'writing',
                domain: 'aiaiy.com',
                title: '写作工具',
                externalDomain: 'notion.so'
            },
            'image.html': {
                name: 'image',
                domain: 'aiaiy.com',
                title: '图像处理',
                externalDomain: 'canva.com'
            },
            'video.html': {
                name: 'video',
                domain: 'aiaiy.com',
                title: '视频制作',
                externalDomain: 'youtube.com'
            },
            'audio.html': {
                name: 'audio',
                domain: 'aiaiy.com',
                title: '音频处理',
                externalDomain: 'spotify.com'
            },
            'ailinks.html': {
                name: 'ai-links',
                domain: 'aiaiy.com',
                title: 'AI链接',
                externalDomain: 'openai.com'
            },
            'aicommunity.html': {
                name: 'ai-community',
                domain: 'aiaiy.com',
                title: 'AI社区',
                externalDomain: 'discord.com'
            },
            'aicontent.html': {
                name: 'ai-content',
                domain: 'aiaiy.com',
                title: 'AI内容',
                externalDomain: 'medium.com'
            },
            'ailearn.html': {
                name: 'ai-learning',
                domain: 'aiaiy.com',
                title: 'AI学习',
                externalDomain: 'coursera.org'
            },
            'ainum.html': {
                name: 'ai-numbers',
                domain: 'aiaiy.com',
                title: 'AI数字',
                externalDomain: 'kaggle.com'
            },
            'aioffice.html': {
                name: 'ai-office',
                domain: 'aiaiy.com',
                title: 'AI办公',
                externalDomain: 'microsoft.com'
            },
            'aiprompt.html': {
                name: 'ai-prompts',
                domain: 'aiaiy.com',
                title: 'AI提示',
                externalDomain: 'prompthero.com'
            },
            'aitimer.html': {
                name: 'ai-timer',
                domain: 'aiaiy.com',
                title: 'AI计时器',
                externalDomain: 'toggl.com'
            },
            'aiagent.html': {
                name: 'ai-agents',
                domain: 'aiaiy.com',
                title: 'AI代理',
                externalDomain: 'zapier.com'
            }
        };
        
        return pageMapping[href] || null;
    }

    createLogoContainer(pageInfo) {
        const container = document.createElement('span');
        container.className = 'nav-external-logo-container';
        container.style.cssText = `
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: middle;
            position: relative;
        `;
        
        // 创建默认图标
        const defaultIcon = document.createElement('div');
        defaultIcon.className = 'nav-logo-default';
        defaultIcon.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
            color: white;
            font-size: 8px;
            font-weight: bold;
            text-align: center;
            line-height: 16px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        `;
        defaultIcon.textContent = pageInfo.name.charAt(0).toUpperCase();
        
        container.appendChild(defaultIcon);
        return container;
    }

    async fetchWebsiteLogo(pageInfo, logoContainer) {
        try {
            // 检查缓存
            if (this.logoCache.has(pageInfo.name)) {
                this.setLogo(logoContainer, this.logoCache.get(pageInfo.name));
                return;
            }

            // 优先尝试外部网站LOGO
            let logoUrl = null;
            if (pageInfo.externalDomain) {
                logoUrl = await this.getExternalWebsiteLogo(pageInfo.externalDomain);
            }
            
            // 如果外部网站LOGO获取失败，尝试当前网站LOGO
            if (!logoUrl) {
                logoUrl = await this.getWebsiteLogo(pageInfo.domain);
            }
            
            // 缓存结果
            this.logoCache.set(pageInfo.name, logoUrl);
            this.saveCache();
            
            // 设置LOGO
            this.setLogo(logoContainer, logoUrl);
            
        } catch (error) {
            console.warn(`Failed to fetch logo for ${pageInfo.name}:`, error);
            // 保持默认图标
        }
    }

    async getExternalWebsiteLogo(domain) {
        // 尝试多种LOGO获取方式
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

    async getWebsiteLogo(domain) {
        // 尝试多种LOGO获取方式
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
            // 标准favicon路径
            `${baseUrl}/favicon.ico`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/favicon.jpg`,
            
            // Logo路径
            `${baseUrl}/logo.png`,
            `${baseUrl}/logo.jpg`,
            `${baseUrl}/logo.ico`,
            `${baseUrl}/logo.svg`,
            
            // Apple touch icon
            `${baseUrl}/apple-touch-icon.png`,
            `${baseUrl}/apple-touch-icon-precomposed.png`,
            
            // 通用图标路径
            `${baseUrl}/icon.png`,
            `${baseUrl}/icon.jpg`,
            `${baseUrl}/icon.ico`,
            `${baseUrl}/icon.svg`,
            
            // 其他常见路径
            `${baseUrl}/assets/favicon.ico`,
            `${baseUrl}/assets/logo.png`,
            `${baseUrl}/assets/logo.svg`,
            `${baseUrl}/images/favicon.ico`,
            `${baseUrl}/images/logo.png`,
            `${baseUrl}/images/logo.svg`,
            `${baseUrl}/static/favicon.ico`,
            `${baseUrl}/static/logo.png`,
            `${baseUrl}/static/logo.svg`,
            
            // 第三方服务
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=32`
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

    setLogo(logoContainer, logoUrl) {
        const defaultIcon = logoContainer.querySelector('.nav-logo-default');
        if (!defaultIcon) return;

        if (logoUrl) {
            // 创建图片元素
            const img = document.createElement('img');
            img.src = logoUrl;
            img.alt = 'Website Logo';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 2px;
                display: none;
                transition: all 0.3s ease;
            `;
            
            // 图片加载成功后显示
            img.onload = () => {
                defaultIcon.style.display = 'none';
                img.style.display = 'block';
            };
            
            // 图片加载失败时保持默认图标
            img.onerror = () => {
                img.remove();
            };
            
            logoContainer.appendChild(img);
        }
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .nav-external-logo-container {
        transition: all 0.3s ease;
    }
    
    .nav-external-logo-container:hover {
        transform: scale(1.1);
    }
    
    .nav-external-logo-container img {
        transition: all 0.3s ease;
    }
    
    .nav-external-logo-container:hover img {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// 初始化
const navExternalLogosFetcher = new NavExternalLogosFetcher();
