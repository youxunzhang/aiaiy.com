// 高级导航栏LOGO获取器
class AdvancedNavLogoFetcher {
    constructor() {
        this.logoCache = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
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

        const pageName = this.getPageName(href);
        if (!pageName) return;

        const logo = this.createLogoContainer(pageName);
        link.insertBefore(logo, link.firstChild);
        
        // 尝试获取实际favicon
        this.fetchFavicon(pageName, logo);
    }

    getPageName(href) {
        const mapping = {
            'index.html': 'home',
            'ai-companies.html': 'ai',
            'ai-ranking.html': 'rank',
            'trends.html': 'trend',
            'ai-capabilities.html': 'cap',
            'coding.html': 'code',
            'designer.html': 'design',
            'writing.html': 'write',
            'image.html': 'image',
            'video.html': 'video',
            'audio.html': 'audio',
            'ailinks.html': 'links',
            'aicommunity.html': 'comm',
            'aicontent.html': 'content',
            'ailearn.html': 'learn',
            'ainum.html': 'num',
            'aioffice.html': 'office',
            'aiprompt.html': 'prompt',
            'aitimer.html': 'timer',
            'aiagent.html': 'agent'
        };
        return mapping[href] || null;
    }

    createLogoContainer(pageName) {
        const logo = document.createElement('span');
        logo.className = 'nav-logo-container';
        logo.style.cssText = `
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
        `;
        defaultIcon.textContent = pageName.charAt(0).toUpperCase();
        
        logo.appendChild(defaultIcon);
        return logo;
    }

    async fetchFavicon(pageName, logoContainer) {
        try {
            // 检查缓存
            if (this.logoCache.has(pageName)) {
                this.setFavicon(logoContainer, this.logoCache.get(pageName));
                return;
            }

            // 尝试获取页面内容
            const response = await fetch(pageName);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const html = await response.text();
            const faviconUrl = this.extractFaviconFromHTML(html, pageName);
            
            // 缓存结果
            this.logoCache.set(pageName, faviconUrl);
            
            // 设置favicon
            this.setFavicon(logoContainer, faviconUrl);
            
        } catch (error) {
            console.warn(`Failed to fetch favicon for ${pageName}:`, error);
            // 保持默认图标
        }
    }

    extractFaviconFromHTML(html, pageName) {
        // 简单的favicon提取逻辑
        const faviconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*href=["']([^"']+)["']/i);
        if (faviconMatch) {
            const faviconUrl = faviconMatch[1];
            return this.resolveFaviconUrl(faviconUrl, pageName);
        }
        
        // 尝试默认favicon路径
        return this.getDefaultFaviconUrl(pageName);
    }

    resolveFaviconUrl(href, pageName) {
        if (href.startsWith('http://') || href.startsWith('https://')) {
            return href;
        }
        
        if (href.startsWith('/')) {
            return window.location.origin + href;
        }
        
        // 相对于页面的路径
        const baseUrl = window.location.origin + '/' + pageName.replace('.html', '');
        return baseUrl + '/' + href;
    }

    getDefaultFaviconUrl(pageName) {
        // 为不同页面提供特定的favicon路径
        const faviconPaths = {
            'home': '/favicon.ico',
            'ai': '/favicon.ico',
            'rank': '/favicon.ico',
            'trend': '/favicon.ico',
            'cap': '/favicon.ico',
            'code': '/favicon.ico',
            'design': '/favicon.ico',
            'write': '/favicon.ico',
            'image': '/favicon.ico',
            'video': '/favicon.ico',
            'audio': '/favicon.ico',
            'links': '/favicon.ico',
            'comm': '/favicon.ico',
            'content': '/favicon.ico',
            'learn': '/favicon.ico',
            'num': '/favicon.ico',
            'office': '/favicon.ico',
            'prompt': '/favicon.ico',
            'timer': '/favicon.ico',
            'agent': '/favicon.ico'
        };
        
        return faviconPaths[pageName] || '/favicon.ico';
    }

    setFavicon(logoContainer, faviconUrl) {
        const defaultIcon = logoContainer.querySelector('.nav-logo-default');
        if (!defaultIcon) return;

        // 创建图片元素
        const img = document.createElement('img');
        img.src = faviconUrl;
        img.alt = 'Page Logo';
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 2px;
            display: none;
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

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .nav-logo-container {
        transition: all 0.3s ease;
    }
    
    .nav-logo-container:hover {
        transform: scale(1.1);
    }
    
    .nav-logo-default {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// 初始化
new AdvancedNavLogoFetcher();
