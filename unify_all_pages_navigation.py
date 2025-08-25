#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统一所有页面的导航栏脚本
将所有页面的导航栏更新为首页的统一样式
"""

import os
import re
from pathlib import Path

# 首页的导航栏HTML结构
UNIFIED_NAVIGATION = '''    <!-- 顶部横向导航栏 -->
    <header class="top-navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <!-- Logo区域 -->
                <div class="flex items-center space-x-3">
                    <a href="index.html" class="flex items-center space-x-3">
                        <span class="block">
                          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="ai-logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#00f2fe"/>
                                <stop offset="1" stop-color="#764ba2"/>
                              </linearGradient>
                            </defs>
                            <circle cx="24" cy="24" r="22" fill="url(#ai-logo-gradient)" stroke="#222" stroke-width="2"/>
                            <rect x="14" y="14" width="20" height="20" rx="6" fill="#18181b" stroke="url(#ai-logo-gradient)" stroke-width="2"/>
                            <path d="M20 30V18M28 30V18M20 24H28" stroke="#00f2fe" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="24" cy="24" r="3.5" fill="#00f2fe" fill-opacity="0.7"/>
                          </svg>
                        </span>
                        <span class="text-xl font-bold text-gray-900">AIAIY</span>
                    </a>
                </div>

                <!-- 桌面导航菜单 -->
                <nav class="hidden lg:flex space-x-8">
                    <a href="index.html" class="nav-link-horizontal">🏠 首页</a>
                    <a href="ai-companies.html" class="nav-link-horizontal">🏢 AI公司</a>
                    <a href="ai-ranking.html" class="nav-link-horizontal">📊 AI榜单</a>
                    <a href="trends.html" class="nav-link-horizontal">📈 趋势</a>
                    <a href="ai-capabilities.html" class="nav-link-horizontal">⚡ AI功能</a>
                    
                    <!-- 工具下拉菜单 -->
                    <div class="relative dropdown">
                        <button class="nav-link-horizontal dropdown-toggle">🛠️ 工具</button>
                        <div class="dropdown-menu">
                            <div class="dropdown-section">
                                <div class="dropdown-section-title">常用工具</div>
                                <a href="coding.html" class="dropdown-item">💻 编程工具</a>
                                <a href="designer.html" class="dropdown-item">🎨 设计师工具</a>
                                <a href="writing.html" class="dropdown-item">✍️ 写作工具</a>
                                <a href="image.html" class="dropdown-item">🖼️ 图像处理</a>
                                <a href="video.html" class="dropdown-item">🎬 视频制作</a>
                                <a href="audio.html" class="dropdown-item">🎵 音频处理</a>
                            </div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-section">
                                <div class="dropdown-section-title">AI工具</div>
                                <a href="ailinks.html" class="dropdown-item">🤖 AI链接</a>
                                <a href="aicommunity.html" class="dropdown-item">👥 AI社区</a>
                                <a href="aicontent.html" class="dropdown-item">📄 AI内容</a>
                                <a href="ailearn.html" class="dropdown-item">📚 AI学习</a>
                                <a href="ainum.html" class="dropdown-item">🔢 AI数字</a>
                                <a href="aioffice.html" class="dropdown-item">💼 AI办公</a>
                                <a href="aiprompt.html" class="dropdown-item">💡 AI提示</a>
                                <a href="aitimer.html" class="dropdown-item">⏰ AI计时器</a>
                                <a href="aiagent.html" class="dropdown-item">🤖 AI代理</a>
                            </div>
                        </div>
                    </div>
                </nav>

                <!-- 移动端菜单按钮 -->
                <button class="mobile-menu-toggle lg:hidden" id="mobileMenuToggle">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- 移动端导航菜单 -->
            <div class="mobile-menu lg:hidden hidden" id="mobileMenu">
                <div class="py-4 space-y-2">
                    <a href="index.html" class="mobile-nav-link">🏠 首页</a>
                    <a href="ai-companies.html" class="mobile-nav-link">🏢 AI公司</a>
                    <a href="ai-ranking.html" class="mobile-nav-link">📊 AI榜单</a>
                    <a href="trends.html" class="mobile-nav-link">📈 趋势</a>
                    <a href="ai-capabilities.html" class="mobile-nav-link">⚡ AI功能</a>
                    
                    <!-- 工具分组 -->
                    <div class="pt-2 border-t border-gray-200 mt-2">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">常用工具</div>
                        <a href="coding.html" class="mobile-nav-link">💻 编程工具</a>
                        <a href="designer.html" class="mobile-nav-link">🎨 设计师工具</a>
                        <a href="writing.html" class="mobile-nav-link">✍️ 写作工具</a>
                        <a href="image.html" class="mobile-nav-link">🖼️ 图像处理</a>
                        <a href="video.html" class="mobile-nav-link">🎬 视频制作</a>
                        <a href="audio.html" class="mobile-nav-link">🎵 音频处理</a>
                    </div>
                    
                    <!-- AI工具分组 -->
                    <div class="pt-2 border-t border-gray-200 mt-2">
                        <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">AI工具</div>
                        <a href="ailinks.html" class="mobile-nav-link">🤖 AI链接</a>
                        <a href="aicommunity.html" class="mobile-nav-link">👥 AI社区</a>
                        <a href="aicontent.html" class="mobile-nav-link">📄 AI内容</a>
                        <a href="ailearn.html" class="mobile-nav-link">📚 AI学习</a>
                        <a href="ainum.html" class="mobile-nav-link">🔢 AI数字</a>
                        <a href="aioffice.html" class="mobile-nav-link">💼 AI办公</a>
                        <a href="aiprompt.html" class="mobile-nav-link">💡 AI提示</a>
                        <a href="aitimer.html" class="mobile-nav-link">⏰ AI计时器</a>
                        <a href="aiagent.html" class="mobile-nav-link">🤖 AI代理</a>
                    </div>
                </div>
            </div>
        </div>
    </header>'''

# 移动端菜单JavaScript
MOBILE_MENU_SCRIPT = '''    <script>
        // 移动端菜单控制
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            
            // 移动端菜单切换功能
            if (mobileMenuToggle && mobileMenu) {
                mobileMenuToggle.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
                
                // 点击菜单外部关闭菜单
                document.addEventListener('click', function(event) {
                    if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
                        mobileMenu.classList.add('hidden');
                    }
                });
            }
            
            // 设置当前页面的活动状态
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('.nav-link-horizontal, .mobile-nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        });
    </script>'''

def get_page_name(filename):
    """根据文件名确定页面名称"""
    name_mapping = {
        'index.html': '首页',
        'ai-companies.html': 'AI公司',
        'ai-ranking.html': 'AI榜单',
        'trends.html': '趋势',
        'ai-capabilities.html': 'AI功能',
        'coding.html': '编程工具',
        'designer.html': '设计师工具',
        'writing.html': '写作工具',
        'image.html': '图像处理',
        'video.html': '视频制作',
        'audio.html': '音频处理',
        'ailinks.html': 'AI链接',
        'aicommunity.html': 'AI社区',
        'aicontent.html': 'AI内容',
        'ailearn.html': 'AI学习',
        'ainum.html': 'AI数字',
        'aioffice.html': 'AI办公',
        'aiprompt.html': 'AI提示',
        'aitimer.html': 'AI计时器',
        'aiagent.html': 'AI代理'
    }
    return name_mapping.get(filename, '其他')

def update_navigation_for_page(content, filename):
    """为特定页面更新导航栏"""
    page_name = get_page_name(filename)
    
    # 根据页面名称设置active状态
    active_nav = UNIFIED_NAVIGATION
    if page_name == '首页':
        active_nav = active_nav.replace('href="index.html" class="nav-link-horizontal">🏠 首页', 'href="index.html" class="nav-link-horizontal active">🏠 首页')
        active_nav = active_nav.replace('href="index.html" class="mobile-nav-link">🏠 首页', 'href="index.html" class="mobile-nav-link active">🏠 首页')
    elif page_name == 'AI公司':
        active_nav = active_nav.replace('href="ai-companies.html" class="nav-link-horizontal">🏢 AI公司', 'href="ai-companies.html" class="nav-link-horizontal active">🏢 AI公司')
        active_nav = active_nav.replace('href="ai-companies.html" class="mobile-nav-link">🏢 AI公司', 'href="ai-companies.html" class="mobile-nav-link active">🏢 AI公司')
    elif page_name == 'AI榜单':
        active_nav = active_nav.replace('href="ai-ranking.html" class="nav-link-horizontal">📊 AI榜单', 'href="ai-ranking.html" class="nav-link-horizontal active">📊 AI榜单')
        active_nav = active_nav.replace('href="ai-ranking.html" class="mobile-nav-link">📊 AI榜单', 'href="ai-ranking.html" class="mobile-nav-link active">📊 AI榜单')
    elif page_name == '趋势':
        active_nav = active_nav.replace('href="trends.html" class="nav-link-horizontal">📈 趋势', 'href="trends.html" class="nav-link-horizontal active">📈 趋势')
        active_nav = active_nav.replace('href="trends.html" class="mobile-nav-link">📈 趋势', 'href="trends.html" class="mobile-nav-link active">📈 趋势')
    elif page_name == 'AI功能':
        active_nav = active_nav.replace('href="ai-capabilities.html" class="nav-link-horizontal">⚡ AI功能', 'href="ai-capabilities.html" class="nav-link-horizontal active">⚡ AI功能')
        active_nav = active_nav.replace('href="ai-capabilities.html" class="mobile-nav-link">⚡ AI功能', 'href="ai-capabilities.html" class="mobile-nav-link active">⚡ AI功能')
    
    # 移除旧的导航栏
    # 移除各种可能的旧导航栏模式
    patterns_to_remove = [
        r'<!-- 顶部横向导航栏 -->.*?</header>',
        r'<header class="top-navbar">.*?</header>',
        r'<nav class="navbar.*?</nav>',
        r'<nav class=".*?navbar.*?</nav>',
        r'<!-- 导航栏 -->.*?</nav>',
        r'<div class="navbar.*?</div>',
        r'<div class="nav.*?</div>'
    ]
    
    for pattern in patterns_to_remove:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # 在<body>标签后插入新的导航栏
    body_pattern = r'(<body[^>]*>)'
    if re.search(body_pattern, content):
        content = re.sub(body_pattern, r'\1\n' + active_nav, content, count=1)
    
    # 添加移动端菜单JavaScript
    # 检查是否已经有移动端菜单脚本
    if 'mobileMenuToggle' not in content:
        # 在</body>前添加脚本
        content = re.sub(r'(</body>)', MOBILE_MENU_SCRIPT + '\n\\1', content)
    
    return content

def process_html_file(filepath):
    """处理单个HTML文件"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经包含modern-styles.css
        if 'modern-styles.css' not in content:
            # 在head中添加modern-styles.css
            head_pattern = r'(</head>)'
            modern_styles_link = '    <link rel="stylesheet" href="modern-styles.css">\n'
            content = re.sub(head_pattern, modern_styles_link + r'\1', content)
        
        # 更新导航栏
        updated_content = update_navigation_for_page(content, filepath.name)
        
        # 写回文件
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ 已更新: {filepath.name}")
        return True
        
    except Exception as e:
        print(f"❌ 处理 {filepath.name} 时出错: {e}")
        return False

def main():
    """主函数"""
    print("🚀 开始统一所有页面的导航栏...")
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 要处理的HTML文件列表
    html_files = [
        'ai-companies.html',
        'ai-ranking.html', 
        'trends.html',
        'ai-capabilities.html',
        'coding.html',
        'designer.html',
        'writing.html',
        'image.html',
        'video.html',
        'audio.html',
        'ailinks.html',
        'aicommunity.html',
        'aicontent.html',
        'ailearn.html',
        'ainum.html',
        'aioffice.html',
        'aiprompt.html',
        'aitimer.html',
        'aiagent.html',
        'ai-tools-landing.html',
        'lunch-recommendations.html',
        'real-needs.html',
        'ai-hotspots.html',
        'ai-overseas.html',
        'ai-ads.html',
        'prayer.html',
        'seo.html',
        'sitemap.html',
        'social.html',
        'chuhai.html',
        'hanghai.html',
        'xiaohongshu.html',
        'words.html',
        'music.html',
        'img.html',
        'links.html',
        'play-game.html',
        'gametest.html',
        'game.html'
    ]
    
    success_count = 0
    total_count = len(html_files)
    
    for filename in html_files:
        filepath = current_dir / filename
        if filepath.exists():
            if process_html_file(filepath):
                success_count += 1
        else:
            print(f"⚠️  文件不存在: {filename}")
    
    print(f"\n📊 处理完成!")
    print(f"✅ 成功更新: {success_count}/{total_count} 个文件")
    
    if success_count < total_count:
        print(f"⚠️  有 {total_count - success_count} 个文件未处理")

if __name__ == "__main__":
    main()
