// 简单导航栏LOGO获取器
document.addEventListener('DOMContentLoaded', function() {
    // 为所有导航链接添加LOGO
    addLogosToLinks('.nav-link-horizontal');
    addLogosToLinks('.dropdown-item');
    addLogosToLinks('.mobile-nav-link');
    
    function addLogosToLinks(selector) {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                const logo = createLogo(href);
                link.insertBefore(logo, link.firstChild);
            }
        });
    }
    
    function createLogo(href) {
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
            vertical-align: middle;
        `;
        
        const pageName = getPageName(href);
        logo.textContent = pageName.charAt(0).toUpperCase();
        
        return logo;
    }
    
    function getPageName(href) {
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
        return mapping[href] || 'page';
    }
});
