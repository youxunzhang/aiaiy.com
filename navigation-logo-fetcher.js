/**
 * 导航栏LOGO获取器
 * 为首页导航栏的链接获取对应网站的LOGO
 */

class NavigationLogoFetcher {
    constructor() {
        this.logoCache = new Map();
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLogoFetching());
        } else {
            this.setupLogoFetching();
        }
    }

    setupLogoFetching() {
        this.addLogosToNavigationLinks();
        this.addLogosToDropdownItems();
        this.addLogosToMobileMenuItems();
    }

    addLogosToNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-link-horizontal');
        navLinks.forEach(link => this.addLogoToLink(link));
    }

    addLogosToDropdownItems() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => this.addLogoToLink(item));
    }

    addLogosToMobileMenuItems() {
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => this.addLogoToLink(link));
    }

    addLogoToLink(linkElement) {
        const href = linkElement.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
            return;
        }

        const pageName = this.getPageNameFromHref(href);
        if (!pageName) return;

        const logoContainer = this.createLogoContainer();
        linkElement.insertBefore(logoContainer, linkElement.firstChild);
        this.fetchAndSetLogo(pageName, logoContainer);
    }

    createLogoContainer() {
        const logoContainer = document.createElement('span');
        logoContainer.className = 'nav-logo-container';
        logoContainer.style.cssText = `
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: middle;
            position: relative;
        `;
        
        logoContainer.innerHTML = `
            <div class="nav-logo-loading" style="
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: navLogoLoading 1.5s infinite;
                border-radius: 2px;
            "></div>
        `;
        
        return logoContainer;
    }

    getPageNameFromHref(href) {
        const pageMapping = {
            'index.html': 'homepage',
            'ai-companies.html': 'ai-companies',
            'ai-ranking.html': 'ai-ranking',
            'trends.html': 'trends',
            'ai-capabilities.html': 'ai-capabilities',
            'coding.html': 'coding-tools',
            'designer.html': 'designer-tools',
            'writing.html': 'writing-tools',
            'image.html': 'image-tools',
            'video.html': 'video-tools',
            'audio.html': 'audio-tools',
            'ailinks.html': 'ai-links',
            'aicommunity.html': 'ai-community',
            'aicontent.html': 'ai-content',
            'ailearn.html': 'ai-learning',
            'ainum.html': 'ai-numbers',
            'aioffice.html': 'ai-office',
            'aiprompt.html': 'ai-prompts',
            'aitimer.html': 'ai-timer',
            'aiagent.html': 'ai-agents'
        };
        
        return pageMapping[href] || null;
    }

    async fetchAndSetLogo(pageName, logoContainer) {
        try {
            if (this.logoCache.has(pageName)) {
                this.setLogo(logoContainer, this.logoCache.get(pageName));
                return;
            }

            const response = await fetch(pageName);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            const html = await response.text();
            const logoInfo = this.extractLogoFromHTML(html, pageName);
            
            this.logoCache.set(pageName, logoInfo);
            this.setLogo(logoContainer, logoInfo);
            
        } catch (error) {
            console.warn(`Failed to fetch logo for ${pageName}:`, error);
            this.setDefaultLogo(logoContainer, pageName);
        }
    }

    extractLogoFromHTML(html, pageName) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const favicon = this.getFaviconFromDocument(doc, pageName);
        const title = doc.querySelector('title')?.textContent || pageName;
        
        return { favicon, title, pageName };
    }

    getFaviconFromDocument(doc, pageName) {
        const faviconSelectors = [
            'link[rel="icon"][href]',
            'link[rel="shortcut icon"][href]',
            'link[rel="apple-touch-icon"][href]'
        ];
        
        for (const selector of faviconSelectors) {
            const link = doc.querySelector(selector);
            if (link) {
                const href = link.getAttribute('href');
                if (href) return this.resolveFaviconUrl(href, pageName);
            }
        }
        
        return this.getDefaultFaviconUrl(pageName);
    }

    resolveFaviconUrl(href, pageName) {
        if (href.startsWith('http://') || href.startsWith('https://')) {
            return href;
        }
        
        if (href.startsWith('/')) {
            return window.location.origin + href;
        }
        
        return window.location.origin + '/' + pageName.replace('.html', '') + '/' + href;
    }

    getDefaultFaviconUrl(pageName) {
        return '/favicon.ico';
    }

    setLogo(logoContainer, logoInfo) {
        const loadingElement = logoContainer.querySelector('.nav-logo-loading');
        if (loadingElement) loadingElement.remove();
        
        if (logoInfo.favicon) {
            const img = document.createElement('img');
            img.src = logoInfo.favicon;
            img.alt = logoInfo.title;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 2px;
            `;
            
            img.onerror = () => this.setDefaultLogo(logoContainer, logoInfo.pageName);
            logoContainer.appendChild(img);
        } else {
            this.setDefaultLogo(logoContainer, logoInfo.pageName);
        }
    }

    setDefaultLogo(logoContainer, pageName) {
        const loadingElement = logoContainer.querySelector('.nav-logo-loading');
        if (loadingElement) loadingElement.remove();
        
        const defaultIcon = document.createElement('div');
        defaultIcon.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
        `;
        
        const iconText = this.getDefaultIconText(pageName);
        defaultIcon.textContent = iconText;
        logoContainer.appendChild(defaultIcon);
    }

    getDefaultIconText(pageName) {
        const defaultTexts = {
            'homepage': 'H',
            'ai-companies': 'A',
            'ai-ranking': 'R',
            'trends': 'T',
            'ai-capabilities': 'C',
            'coding-tools': 'C',
            'designer-tools': 'D',
            'writing-tools': 'W',
            'image-tools': 'I',
            'video-tools': 'V',
            'audio-tools': 'A',
            'ai-links': 'L',
            'ai-community': 'C',
            'ai-content': 'C',
            'ai-learning': 'L',
            'ai-numbers': 'N',
            'ai-office': 'O',
            'ai-prompts': 'P',
            'ai-timer': 'T',
            'ai-agents': 'A'
        };
        
        return defaultTexts[pageName] || '?';
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes navLogoLoading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .nav-logo-container {
        transition: all 0.3s ease;
    }
    
    .nav-logo-container:hover {
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);

// 初始化LOGO获取器
const navigationLogoFetcher = new NavigationLogoFetcher();
