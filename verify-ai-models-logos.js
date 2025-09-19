/**
 * AI Foundation Models LOGO 功能验证脚本
 * 用于验证AI Foundation Models板块的LOGO功能是否正常工作
 */

class AIModelsLogoVerifier {
    constructor() {
        this.aiModels = [
            {
                name: 'Deepseek',
                url: 'https://chat.deepseek.com/',
                expectedDomain: 'chat.deepseek.com'
            },
            {
                name: 'Google Gemini',
                url: 'https://gemini.google.com/app',
                expectedDomain: 'gemini.google.com'
            },
            {
                name: 'Perplexity',
                url: 'https://www.perplexity.ai/',
                expectedDomain: 'www.perplexity.ai'
            },
            {
                name: 'Grok',
                url: 'https://grok.com/',
                expectedDomain: 'grok.com'
            },
            {
                name: 'ChatBot',
                url: 'https://chat.chatbot.app/',
                expectedDomain: 'chat.chatbot.app'
            },
            {
                name: 'Claude',
                url: 'https://claude.ai/',
                expectedDomain: 'claude.ai'
            }
        ];
    }

    /**
     * 验证AI Foundation Models板块的LOGO功能
     */
    async verifyAIModelsLogos() {
        console.log('🔍 开始验证AI Foundation Models板块的LOGO功能...');
        
        const results = {
            total: this.aiModels.length,
            success: 0,
            failed: 0,
            details: []
        };

        // 等待页面加载完成
        await this.waitForPageLoad();

        // 检查每个AI模型的LOGO
        for (const model of this.aiModels) {
            const result = await this.verifySingleModel(model);
            results.details.push(result);
            
            if (result.status === 'success') {
                results.success++;
            } else {
                results.failed++;
            }
        }

        // 输出验证结果
        this.outputResults(results);
        
        return results;
    }

    /**
     * 验证单个AI模型的LOGO
     */
    async verifySingleModel(model) {
        const result = {
            name: model.name,
            url: model.url,
            expectedDomain: model.expectedDomain,
            status: 'unknown',
            message: '',
            logoFound: false,
            logoUrl: null
        };

        try {
            // 查找对应的卡片
            const card = this.findCardByUrl(model.url);
            if (!card) {
                result.status = 'failed';
                result.message = '未找到对应的卡片';
                return result;
            }

            // 检查LOGO背景元素
            const logoBg = card.querySelector('.tool-logo-bg');
            if (!logoBg) {
                result.status = 'failed';
                result.message = '未找到LOGO背景元素';
                return result;
            }

            result.logoFound = true;

            // 检查LOGO样式
            const backgroundImage = logoBg.style.backgroundImage;
            if (backgroundImage && backgroundImage !== 'none') {
                result.logoUrl = backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
                result.status = 'success';
                result.message = 'LOGO加载成功';
            } else {
                // 检查是否有emoji fallback
                const emojiElement = logoBg.querySelector('div');
                if (emojiElement && emojiElement.textContent) {
                    result.status = 'success';
                    result.message = '使用Emoji fallback';
                } else {
                    result.status = 'failed';
                    result.message = 'LOGO样式未正确应用';
                }
            }

        } catch (error) {
            result.status = 'failed';
            result.message = `验证过程中出错: ${error.message}`;
        }

        return result;
    }

    /**
     * 根据URL查找卡片
     */
    findCardByUrl(url) {
        const cards = document.querySelectorAll('.tool-card');
        for (const card of cards) {
            const link = card.querySelector('a') || card;
            const href = link.getAttribute('href');
            if (href === url) {
                return card;
            }
        }
        return null;
    }

    /**
     * 等待页面加载完成
     */
    async waitForPageLoad() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }

    /**
     * 输出验证结果
     */
    outputResults(results) {
        console.log('\n📊 AI Foundation Models LOGO 验证结果:');
        console.log('=' .repeat(50));
        
        results.details.forEach((detail, index) => {
            const status = detail.status === 'success' ? '✅' : '❌';
            console.log(`${index + 1}. ${status} ${detail.name}`);
            console.log(`   URL: ${detail.url}`);
            console.log(`   状态: ${detail.message}`);
            if (detail.logoUrl) {
                console.log(`   LOGO: ${detail.logoUrl}`);
            }
            console.log('');
        });

        console.log('📈 总体统计:');
        console.log(`   总数: ${results.total}`);
        console.log(`   成功: ${results.success}`);
        console.log(`   失败: ${results.failed}`);
        console.log(`   成功率: ${((results.success / results.total) * 100).toFixed(1)}%`);

        if (results.success === results.total) {
            console.log('\n🎉 所有AI Foundation Models的LOGO功能都正常工作！');
        } else {
            console.log('\n⚠️  部分AI Foundation Models的LOGO功能需要检查。');
        }
    }

    /**
     * 手动触发LOGO重新加载
     */
    async reloadLogos() {
        console.log('🔄 重新加载AI Foundation Models的LOGO...');
        
        if (window.homepageLogoManager) {
            // 清除缓存
            window.homepageLogoManager.clearCache();
            
            // 重新添加LOGO
            await window.homepageLogoManager.addLogosToHomepageCards();
            
            console.log('✅ LOGO重新加载完成');
        } else {
            console.log('❌ 未找到homepageLogoManager');
        }
    }
}

// 创建全局验证器实例
window.aiModelsLogoVerifier = new AIModelsLogoVerifier();

// 页面加载完成后自动验证
document.addEventListener('DOMContentLoaded', async function() {
    // 等待LOGO管理器完成初始化
    setTimeout(async () => {
        await window.aiModelsLogoVerifier.verifyAIModelsLogos();
    }, 3000);
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIModelsLogoVerifier;
}
