/**
 * 简化Favicon获取器
 * 专门获取网站的favicon图标，使用准确的图片路径
 */

document.addEventListener('DOMContentLoaded', function() {
    // 为所有导航链接添加favicon
    addFaviconsToLinks('.nav-link-horizontal');
    addFaviconsToLinks('.dropdown-item');
    addFaviconsToLinks('.mobile-nav-link');
    
    function addFaviconsToLinks(selector) {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#')) {
                const pageInfo = getPageInfo(href);
                if (pageInfo) {
                    const faviconContainer = createFaviconContainer(pageInfo);
                    link.insertBefore(faviconContainer, link.firstChild);
                    fetchFavicon(pageInfo, faviconContainer);
                }
            }
        });
    }
    
    function getPageInfo(href) {
        // 页面信息映射
        const pageMapping = {
            'index.html': {
                name: 'home',
                domain: 'aiaiy.com',
                title: 'AI工具导航'
            },
            'ai-companies.html': {
                name: 'ai-companies',
                domain: 'aiaiy.com',
                title: 'AI公司'
            },
            'ai-ranking.html': {
                name: 'ai-ranking',
                domain: 'aiaiy.com',
                title: 'AI榜单'
            },
            'trends.html': {
                name: 'trends',
                domain: 'aiaiy.com',
                title: 'AI趋势'
            },
            'ai-capabilities.html': {
                name: 'ai-capabilities',
                domain: 'aiaiy.com',
                title: 'AI功能'
            },
            'coding.html': {
                name: 'coding',
                domain: 'github.com',
                title: '编程工具'
            },
            'designer.html': {
                name: 'designer',
                domain: 'figma.com',
                title: '设计师工具'
            },
            'writing.html': {
                name: 'writing',
                domain: 'notion.so',
                title: '写作工具'
            },
            'image.html': {
                name: 'image',
                domain: 'canva.com',
                title: '图像处理'
            },
            'video.html': {
                name: 'video',
                domain: 'youtube.com',
                title: '视频制作'
            },
            'audio.html': {
                name: 'audio',
                domain: 'spotify.com',
                title: '音频处理'
            },
            'ailinks.html': {
                name: 'ai-links',
                domain: 'openai.com',
                title: 'AI链接'
            },
            'aicommunity.html': {
                name: 'ai-community',
                domain: 'discord.com',
                title: 'AI社区'
            },
            'aicontent.html': {
                name: 'ai-content',
                domain: 'medium.com',
                title: 'AI内容'
            },
            'ailearn.html': {
                name: 'ai-learning',
                domain: 'coursera.org',
                title: 'AI学习'
            },
            'ainum.html': {
                name: 'ai-numbers',
                domain: 'kaggle.com',
                title: 'AI数字'
            },
            'aioffice.html': {
                name: 'ai-office',
                domain: 'microsoft.com',
                title: 'AI办公'
            },
            'aiprompt.html': {
                name: 'ai-prompts',
                domain: 'prompthero.com',
                title: 'AI提示'
            },
            'aitimer.html': {
                name: 'ai-timer',
                domain: 'toggl.com',
                title: 'AI计时器'
            },
            'aiagent.html': {
                name: 'ai-agents',
                domain: 'zapier.com',
                title: 'AI代理'
            }
        };
        
        return pageMapping[href] || null;
    }
    
    function createFaviconContainer(pageInfo) {
        const container = document.createElement('span');
        container.className = 'simple-favicon-container';
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
        defaultIcon.className = 'favicon-default';
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
    
    async function fetchFavicon(pageInfo, faviconContainer) {
        try {
            // 使用准确的favicon路径
            const faviconUrls = getFaviconUrls(pageInfo.domain);
            
            for (const url of faviconUrls) {
                try {
                    const exists = await checkFaviconExists(url);
                    if (exists) {
                        setFavicon(faviconContainer, url);
                        return;
                    }
                } catch (error) {
                    continue;
                }
            }
        } catch (error) {
            console.warn(`Failed to fetch favicon for ${pageInfo.name}:`, error);
        }
    }
    
    function getFaviconUrls(domain) {
        const baseUrl = `https://${domain}`;
        return [
            // 标准favicon路径 - 按优先级排序
            `${baseUrl}/favicon.ico`,
            `${baseUrl}/favicon.png`,
            `${baseUrl}/favicon.jpg`,
            
            // Logo路径
            `${baseUrl}/logo.png`,
            `${baseUrl}/logo.jpg`,
            
            // 第三方服务 - 作为备用方案
            `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
            `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=32`
        ];
    }
    
    async function checkFaviconExists(url) {
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
    
    function setFavicon(faviconContainer, faviconUrl) {
        const defaultIcon = faviconContainer.querySelector('.favicon-default');
        if (!defaultIcon) return;

        // 创建图片元素
        const img = document.createElement('img');
        img.src = faviconUrl;
        img.alt = 'Website Favicon';
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
        
        faviconContainer.appendChild(img);
    }
});

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .simple-favicon-container {
        transition: all 0.3s ease;
    }
    
    .simple-favicon-container:hover {
        transform: scale(1.1);
    }
    
    .simple-favicon-container img {
        transition: all 0.3s ease;
    }
    
    .simple-favicon-container:hover img {
        transform: scale(1.1);
    }
    
    .favicon-default {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
