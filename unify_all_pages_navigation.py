#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统一所有页面导航栏脚本
将所有页面的导航栏更新为首页的导航栏结构
"""

import os
import re
from pathlib import Path

# 首页导航栏HTML结构
HOME_NAVIGATION_HTML = '''    <!-- 顶部横向导航栏 -->
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

# 首页导航栏CSS样式
HOME_NAVIGATION_CSS = '''        /* 顶部横向导航栏 */
        .top-navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid #E5E7EB;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .nav-link-horizontal {
            color: #6B7280;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            display: inline-block;
        }

        .nav-link-horizontal:hover {
            color: #2563EB;
            background: #F9FAFB;
        }

        .nav-link-horizontal.active {
            color: #2563EB;
            background: #EFF6FF;
            border-bottom: 2px solid #2563EB;
        }

        /* 下拉菜单样式 */
        .dropdown {
            position: relative;
        }

        .dropdown-toggle {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            color: #6B7280;
            font-weight: 500;
            transition: all 0.2s ease;
        }

        .dropdown-toggle:hover {
            color: #2563EB;
            background: #F9FAFB;
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #E5E7EB;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            min-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1001;
        }

        .dropdown:hover .dropdown-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown-section {
            padding: 0.5rem;
        }

        .dropdown-section-title {
            font-size: 0.75rem;
            font-weight: 600;
            color: #9CA3AF;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.5rem 0.75rem;
            margin-bottom: 0.25rem;
        }

        .dropdown-item {
            display: block;
            padding: 0.75rem;
            color: #374151;
            text-decoration: none;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
            margin: 0.125rem 0;
        }

        .dropdown-item:hover {
            background: #F3F4F6;
            color: #2563EB;
        }

        .dropdown-divider {
            height: 1px;
            background: #E5E7EB;
            margin: 0.5rem 0;
        }

        /* 移动端菜单 */
        .mobile-menu-toggle {
            background: none;
            border: none;
            color: #6B7280;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
        }

        .mobile-menu-toggle:hover {
            background: #F9FAFB;
            color: #2563EB;
        }

        .mobile-nav-link {
            display: block;
            padding: 0.75rem 1rem;
            color: #374151;
            text-decoration: none;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
            background: #F3F4F6;
            color: #2563EB;
        }

        .mobile-nav-link.active {
            background: #EFF6FF;
            color: #2563EB;
        }

        .main-content {
            margin-left: 0;
            transition: margin-left 0.3s ease;
        }

        /* 移动端响应式 */
        @media (max-width: 768px) {
            .main-content {
                padding: 1rem;
            }
        }'''

# 首页JavaScript功能
HOME_NAVIGATION_JS = '''        // 移动端菜单控制
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
        });'''

def get_page_name_from_filename(filename):
    """根据文件名获取页面名称"""
    page_mapping = {
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
        'aiagent.html': 'AI代理',
        'ai-ads.html': 'AI ADS',
        'ai-overseas.html': 'AI出海',
        'ai-hotspots.html': 'AI热点',
        'real-needs.html': '真需求',
        'play-game.html': '游戏',
        'lunch-recommendations.html': '午餐推荐',
        'friendship-links.html': '友情链接'
    }
    return page_mapping.get(filename, filename.replace('.html', ''))

def update_navigation_for_page(filepath, page_name):
    """更新单个页面的导航栏"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. 移除旧的导航栏HTML
        # 移除各种可能的导航栏模式
        patterns_to_remove = [
            r'<!-- 顶部横向导航栏 -->.*?</header>',
            r'<header class="top-navbar">.*?</header>',
            r'<nav class=".*?">.*?</nav>',
            r'<!-- 导航栏 -->.*?</header>',
            r'<header.*?class=".*?navbar.*?">.*?</header>'
        ]
        
        for pattern in patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # 2. 在<body>标签后插入新的导航栏
        body_pattern = r'(<body[^>]*>)'
        if re.search(body_pattern, content):
            # 添加粒子效果容器（如果不存在）
            if 'particles' not in content:
                content = re.sub(body_pattern, r'\1\n    <!-- 粒子效果 -->\n    <div class="particles" id="particles"></div>', content)
            
            # 插入导航栏
            content = re.sub(body_pattern, r'\1\n    <!-- 粒子效果 -->\n    <div class="particles" id="particles"></div>\n' + HOME_NAVIGATION_HTML, content)
        
        # 3. 更新导航栏中的活动状态
        if page_name != '首页':
            # 将对应页面的链接设置为active
            content = content.replace(f'href="{filepath.name}" class="nav-link-horizontal">', f'href="{filepath.name}" class="nav-link-horizontal active">')
            content = content.replace(f'href="{filepath.name}" class="mobile-nav-link">', f'href="{filepath.name}" class="mobile-nav-link active">')
        else:
            # 首页设置为active
            content = content.replace('href="index.html" class="nav-link-horizontal">', 'href="index.html" class="nav-link-horizontal active">')
            content = content.replace('href="index.html" class="mobile-nav-link">', 'href="index.html" class="mobile-nav-link active">')
        
        # 4. 更新CSS样式
        # 移除旧的导航栏样式
        css_patterns_to_remove = [
            r'/\* 顶部横向导航栏 \*/.*?@media \(max-width: 768px\) \{.*?\}',
            r'\.top-navbar.*?@media \(max-width: 768px\) \{.*?\}',
            r'\.nav-link-horizontal.*?\.mobile-nav-link\.active.*?\}',
        ]
        
        for pattern in css_patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # 在</style>标签前插入新的CSS
        if '</style>' in content:
            content = content.replace('</style>', HOME_NAVIGATION_CSS + '\n    </style>')
        
        # 5. 更新JavaScript
        # 移除旧的导航栏JavaScript
        js_patterns_to_remove = [
            r'// 移动端菜单控制.*?document\.addEventListener\('DOMContentLoaded'.*?\}\);',
            r'// 设置当前页面的活动状态.*?navLinks\.forEach.*?\}\);',
        ]
        
        for pattern in js_patterns_to_remove:
            content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # 在</script>标签前插入新的JavaScript
        if '</script>' in content:
            content = content.replace('</script>', HOME_NAVIGATION_JS + '\n    </script>')
        
        # 6. 移除对navigation.js的引用（如果存在）
        content = re.sub(r'<script src="navigation\.js"></script>', '', content)
        
        # 7. 确保有必要的CSS变量
        if ':root' not in content:
            css_variables = '''        :root {
            --primary-color: #2563eb;
            --primary-hover: #1d4ed8;
            --secondary-color: #64748b;
            --accent-color: #0ea5e9;
            --background-color: #ffffff;
            --surface-color: #f8fafc;
            --border-color: #e2e8f0;
            --text-primary: #1e293b;
            --text-secondary: #64748b;
            --text-muted: #94a3b8;
            --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }'''
            if '<style>' in content:
                content = content.replace('<style>', '<style>\n' + css_variables)
        
        # 检查是否有变化
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        else:
            return False
            
    except Exception as e:
        print(f"更新 {filepath} 时出错: {e}")
        return False

def main():
    """主函数"""
    # 需要更新的HTML文件列表
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
        'ai-ads.html',
        'ai-overseas.html',
        'ai-hotspots.html',
        'real-needs.html',
        'play-game.html',
        'lunch-recommendations.html',
        'friendship-links.html'
    ]
    
    updated_count = 0
    total_count = 0
    
    print("开始统一所有页面的导航栏...")
    print("=" * 50)
    
    for filename in html_files:
        filepath = Path(filename)
        if filepath.exists():
            total_count += 1
            page_name = get_page_name_from_filename(filename)
            print(f"正在更新: {filename} ({page_name})")
            
            if update_navigation_for_page(filepath, page_name):
                print(f"✅ 成功更新: {filename}")
                updated_count += 1
            else:
                print(f"⚠️  无需更新: {filename}")
        else:
            print(f"❌ 文件不存在: {filename}")
    
    print("=" * 50)
    print(f"更新完成！")
    print(f"总计文件: {total_count}")
    print(f"成功更新: {updated_count}")
    print(f"无需更新: {total_count - updated_count}")

if __name__ == "__main__":
    main()
