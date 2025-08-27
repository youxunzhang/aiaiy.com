// 导航栏LOGO获取器
class NavLogoFetcher {
    constructor() {
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

        const logo = this.createLogo(pageName);
        link.insertBefore(logo, link.firstChild);
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

    createLogo(pageName) {
        const logo = document.createElement('span');
        logo.className = 'nav-logo';
        logo.style.cssText = `
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 2px;
            color: white;
            font-size: 8px;
            font-weight: bold;
            text-align: center;
            line-height: 16px;
            text-transform: uppercase;
        `;
        logo.textContent = pageName.charAt(0).toUpperCase();
        return logo;
    }
}

// 初始化
new NavLogoFetcher();
