/**
 * 自动LOGO加载器
 * 自动为所有页面加载对应的LOGO管理器
 */

(function() {
    'use strict';

    // 检查是否已经加载了LOGO管理器
    if (window.universalLogoManager) {
        console.log('Universal logo manager already loaded');
        return;
    }

    // 动态加载通用LOGO管理器
    function loadUniversalLogoManager() {
        const script = document.createElement('script');
        script.src = 'universal-logo-manager.js';
        script.async = true;
        script.onload = function() {
            console.log('Universal logo manager loaded successfully');
        };
        script.onerror = function() {
            console.warn('Failed to load universal logo manager');
        };
        document.head.appendChild(script);
    }

    // 根据当前页面加载特定的LOGO管理器
    function loadPageSpecificLogoManager() {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('index.html') || currentPath === '/') {
            // 首页 - 加载首页LOGO管理器
            if (!window.homepageLogoManager) {
                const script = document.createElement('script');
                script.src = 'homepage-logo-manager.js';
                script.async = true;
                script.onload = function() {
                    console.log('Homepage logo manager loaded successfully');
                };
                script.onerror = function() {
                    console.warn('Failed to load homepage logo manager');
                };
                document.head.appendChild(script);
            }
        } else if (currentPath.includes('ai-companies.html')) {
            // AI公司页面 - 加载AI公司LOGO管理器
            if (!window.aiCompaniesLogoManager) {
                const script = document.createElement('script');
                script.src = 'ai-companies-logos.js';
                script.async = true;
                script.onload = function() {
                    console.log('AI companies logo manager loaded successfully');
                };
                script.onerror = function() {
                    console.warn('Failed to load AI companies logo manager');
                };
                document.head.appendChild(script);
            }
        }
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadUniversalLogoManager();
            loadPageSpecificLogoManager();
        });
    } else {
        loadUniversalLogoManager();
        loadPageSpecificLogoManager();
    }

    // 监听页面变化（SPA应用）
    let currentUrl = window.location.href;
    const observer = new MutationObserver(function() {
        if (currentUrl !== window.location.href) {
            currentUrl = window.location.href;
            setTimeout(function() {
                loadPageSpecificLogoManager();
            }, 100);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
