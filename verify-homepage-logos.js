/**
 * 首页LOGO功能验证脚本
 * 用于验证首页各个板块的LOGO背景功能是否正常工作
 */

class HomepageLogoVerifier {
    constructor() {
        this.results = {
            total: 0,
            success: 0,
            failed: 0,
            details: []
        };
    }

    /**
     * 验证首页LOGO功能
     */
    async verifyHomepageLogos() {
        console.log('🔍 开始验证首页LOGO功能...');
        
        // 等待页面加载完成
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                window.addEventListener('load', resolve);
            });
        }

        // 等待LOGO管理器初始化
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 查找所有工具卡片
        const toolCards = document.querySelectorAll('.tool-card, .modern-card');
        this.results.total = toolCards.length;

        console.log(`📊 找到 ${this.results.total} 个工具卡片`);

        // 检查每个卡片
        toolCards.forEach((card, index) => {
            const href = card.getAttribute('href') || (card.querySelector('a') ? card.querySelector('a').getAttribute('href') : null);
            const logoBg = card.querySelector('.tool-logo-bg');
            
            if (href) {
                const domain = this.extractDomain(href);
                
                if (logoBg) {
                    this.results.success++;
                    this.results.details.push({
                        domain: domain,
                        status: 'success',
                        message: 'LOGO背景已添加'
                    });
                    console.log(`✅ ${domain} - LOGO背景已添加`);
                } else {
                    this.results.failed++;
                    this.results.details.push({
                        domain: domain,
                        status: 'failed',
                        message: 'LOGO背景未找到'
                    });
                    console.log(`❌ ${domain} - LOGO背景未找到`);
                }
            }
        });

        // 输出结果
        this.printResults();
        return this.results;
    }

    /**
     * 验证特定板块的LOGO
     */
    async verifySectionLogos(sectionTitle) {
        console.log(`🔍 验证 ${sectionTitle} 板块的LOGO功能...`);
        
        // 查找板块标题
        const sectionHeaders = Array.from(document.querySelectorAll('h2, h3')).filter(h => 
            h.textContent.includes(sectionTitle)
        );

        if (sectionHeaders.length === 0) {
            console.log(`❌ 未找到 ${sectionTitle} 板块`);
            return null;
        }

        const section = sectionHeaders[0].closest('section') || sectionHeaders[0].parentElement;
        const cards = section.querySelectorAll('.tool-card, .modern-card');
        
        console.log(`📊 ${sectionTitle} 板块找到 ${cards.length} 个卡片`);
        
        const results = {
            section: sectionTitle,
            total: cards.length,
            success: 0,
            failed: 0,
            details: []
        };

        cards.forEach(card => {
            const href = card.getAttribute('href') || (card.querySelector('a') ? card.querySelector('a').getAttribute('href') : null);
            const logoBg = card.querySelector('.tool-logo-bg');
            
            if (href) {
                const domain = this.extractDomain(href);
                
                if (logoBg) {
                    results.success++;
                    results.details.push({
                        domain: domain,
                        status: 'success',
                        message: 'LOGO背景已添加'
                    });
                } else {
                    results.failed++;
                    results.details.push({
                        domain: domain,
                        status: 'failed',
                        message: 'LOGO背景未找到'
                    });
                }
            }
        });

        console.log(`📊 ${sectionTitle} 板块结果: ${results.success}/${results.total} 成功`);
        return results;
    }

    /**
     * 手动触发LOGO加载
     */
    async triggerLogoLoading() {
        console.log('🔄 手动触发LOGO加载...');
        
        if (window.homepageToolLogoManager) {
            await window.homepageToolLogoManager.addLogosToToolCards();
            console.log('✅ LOGO加载完成');
        } else {
            console.log('❌ LOGO管理器未找到');
        }
    }

    /**
     * 清除LOGO缓存并重新加载
     */
    async reloadLogos() {
        console.log('🔄 清除缓存并重新加载LOGO...');
        
        if (window.homepageToolLogoManager) {
            window.homepageToolLogoManager.clearCache();
            await window.homepageToolLogoManager.addLogosToToolCards();
            console.log('✅ LOGO重新加载完成');
        } else {
            console.log('❌ LOGO管理器未找到');
        }
    }

    /**
     * 提取域名
     */
    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname;
        } catch (error) {
            return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        }
    }

    /**
     * 输出验证结果
     */
    printResults() {
        const successRate = this.results.total > 0 ? (this.results.success / this.results.total * 100).toFixed(1) : 0;
        
        console.log('\n📊 首页LOGO功能验证结果:');
        console.log(`总卡片数: ${this.results.total}`);
        console.log(`成功: ${this.results.success}`);
        console.log(`失败: ${this.results.failed}`);
        console.log(`成功率: ${successRate}%`);
        
        if (this.results.success === this.results.total) {
            console.log('🎉 所有LOGO功能正常工作！');
        } else if (this.results.success > 0) {
            console.log('⚠️ 部分LOGO功能需要检查');
        } else {
            console.log('❌ LOGO功能未正常工作');
        }
        
        // 输出详细信息
        console.log('\n📋 详细信息:');
        this.results.details.forEach(detail => {
            const icon = detail.status === 'success' ? '✅' : '❌';
            console.log(`${icon} ${detail.domain} - ${detail.message}`);
        });
    }

    /**
     * 生成HTML报告
     */
    generateHTMLReport() {
        const successRate = this.results.total > 0 ? (this.results.success / this.results.total * 100).toFixed(1) : 0;
        
        let html = `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
                <h3 style="margin: 0 0 1rem 0; color: #1f2937;">首页LOGO功能验证报告</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    <div style="background: white; padding: 0.5rem; border-radius: 4px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #1f2937;">${this.results.total}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">总卡片数</div>
                    </div>
                    <div style="background: white; padding: 0.5rem; border-radius: 4px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #22c55e;">${this.results.success}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">成功</div>
                    </div>
                    <div style="background: white; padding: 0.5rem; border-radius: 4px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ef4444;">${this.results.failed}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">失败</div>
                    </div>
                    <div style="background: white; padding: 0.5rem; border-radius: 4px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #3b82f6;">${successRate}%</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">成功率</div>
                    </div>
                </div>
                <div style="background: white; border-radius: 4px; padding: 1rem;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #1f2937;">详细信息:</h4>
                    <div style="font-size: 0.875rem;">
        `;
        
        this.results.details.forEach(detail => {
            const icon = detail.status === 'success' ? '✅' : '❌';
            const color = detail.status === 'success' ? '#22c55e' : '#ef4444';
            html += `<div style="color: ${color}; margin: 0.25rem 0;">${icon} ${detail.domain} - ${detail.message}</div>`;
        });
        
        html += `
                    </div>
                </div>
            </div>
        `;
        
        return html;
    }
}

// 创建全局验证器实例
window.homepageLogoVerifier = new HomepageLogoVerifier();

// 页面加载完成后自动验证
document.addEventListener('DOMContentLoaded', async function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        console.log('🚀 首页LOGO功能验证器已加载');
        
        // 等待一段时间后自动验证
        setTimeout(async () => {
            await window.homepageLogoVerifier.verifyHomepageLogos();
        }, 3000);
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HomepageLogoVerifier;
}
