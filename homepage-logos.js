class HomepageLogoManager {
    constructor() {
        this.logoCache = this.loadFromLocalStorage();
        this.foundationModelsMappings = {
            'chat.deepseek.com': {
                url: 'https://chat.deepseek.com/favicon.ico',
                fallback: '🤖',
                name: 'Deepseek'
            },
            'gemini.google.com': {
                url: 'https://gemini.google.com/favicon.ico',
                fallback: '🔍',
                name: 'Google Gemini'
            },
            'www.perplexity.ai': {
                url: 'https://www.perplexity.ai/favicon.ico',
                fallback: '🧠',
                name: 'Perplexity'
            },
            'chat.chatbot.app': {
                url: 'https://chat.chatbot.app/favicon.ico',
                fallback: '💬',
                name: 'ChatBot'
            },
            'claude.ai': {
                url: 'https://claude.ai/favicon.ico',
                fallback: '🤖',
                name: 'Claude'
            }
        };
    }

    loadFromLocalStorage() {
        try {
            const cached = localStorage.getItem('homepageLogoCache');
            return cached ? JSON.parse(cached) : {};
        } catch (error) {
            console.warn('Failed to load logo cache from localStorage:', error);
            return {};
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('homepageLogoCache', JSON.stringify(this.logoCache));
        } catch (error) {
            console.warn('Failed to save logo cache to localStorage:', error);
        }
    }

    async getLogo(domain) {
        // 检查缓存
        if (this.logoCache[domain]) {
            return this.logoCache[domain];
        }

        const mapping = this.foundationModelsMappings[domain];
        if (!mapping) {
            return { type: 'fallback', content: '🔗' };
        }

        try {
            // 尝试获取favicon
            const logoData = await this.fetchLogo(mapping.url, domain);
            if (logoData) {
                this.logoCache[domain] = logoData;
                this.saveToLocalStorage();
                return logoData;
            }
        } catch (error) {
            console.warn(`Failed to fetch logo for ${domain}:`, error);
        }

        // 返回fallback
        const fallback = { type: 'fallback', content: mapping.fallback };
        this.logoCache[domain] = fallback;
        this.saveToLocalStorage();
        return fallback;
    }

    async fetchLogo(url, domain) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'image/*'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const reader = new FileReader();
            
            return new Promise((resolve, reject) => {
                reader.onload = () => {
                    resolve({
                        type: 'image',
                        content: reader.result,
                        domain: domain
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn(`Failed to fetch logo from ${url}:`, error);
            return null;
        }
    }

    createLogoHtml(logoData, domain) {
        const mapping = this.foundationModelsMappings[domain];
        const name = mapping ? mapping.name : domain;

        if (logoData.type === 'image') {
            return `
                <div class="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-sm">
                    <img src="${logoData.content}" alt="${name} logo" 
                         class="w-8 h-8 object-contain" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded flex items-center justify-center text-white font-bold text-sm" style="display: none;">
                        ${name.substring(0, 2).toUpperCase()}
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    ${logoData.content}
                </div>
            `;
        }
    }

    async updateFoundationModelsLogos() {
        const foundationModelsSection = document.querySelector('a[href*="deepseek.com"], a[href*="gemini.google.com"], a[href*="perplexity.ai"], a[href*="chatbot.app"], a[href*="claude.ai"]');
        
        if (!foundationModelsSection) {
            console.log('Foundation Models section not found');
            return;
        }

        // 找到AI Foundation Models板块的所有链接
        const links = document.querySelectorAll('a[href*="deepseek.com"], a[href*="gemini.google.com"], a[href*="perplexity.ai"], a[href*="chatbot.app"], a[href*="claude.ai"]');
        
        for (const link of links) {
            const href = link.getAttribute('href');
            const domain = this.extractDomain(href);
            
            if (domain && this.foundationModelsMappings[domain]) {
                const logoData = await this.getLogo(domain);
                const logoHtml = this.createLogoHtml(logoData, domain);
                
                const logoContainer = link.querySelector('.tool-logo');
                if (logoContainer) {
                    logoContainer.innerHTML = logoHtml;
                }
            }
        }
    }

    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (error) {
            console.warn('Invalid URL:', url);
            return null;
        }
    }

    async batchFetchAllLogos() {
        console.log('开始批量获取AI Foundation Models的LOGO...');
        
        const promises = Object.keys(this.foundationModelsMappings).map(async (domain) => {
            try {
                const logoData = await this.getLogo(domain);
                console.log(`✅ ${domain}: ${logoData.type === 'image' ? '图片' : 'fallback'}`);
                return { domain, logoData };
            } catch (error) {
                console.error(`❌ ${domain}: 获取失败`, error);
                return { domain, logoData: null };
            }
        });

        await Promise.all(promises);
        console.log('AI Foundation Models LOGO获取完成');
    }

    clearCache() {
        this.logoCache = {};
        localStorage.removeItem('homepageLogoCache');
        console.log('首页LOGO缓存已清除');
    }

    exportCache() {
        console.log('当前LOGO缓存:', this.logoCache);
        return this.logoCache;
    }
}

// 初始化并运行
document.addEventListener('DOMContentLoaded', async () => {
    const homepageLogoManager = new HomepageLogoManager();
    
    // 更新AI Foundation Models板块的LOGO
    await homepageLogoManager.updateFoundationModelsLogos();
    
    // 可选：批量预获取所有LOGO
    // await homepageLogoManager.batchFetchAllLogos();
    
    console.log('首页AI Foundation Models LOGO系统已初始化');
});
