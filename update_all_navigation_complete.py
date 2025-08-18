#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有页面添加完整的导航栏
包含所有页面的链接
"""

import os
import re
import glob

def get_all_pages():
    """获取所有HTML页面"""
    html_files = glob.glob("*.html")
    # 过滤掉一些不需要在导航中显示的文件
    exclude_files = ['index-bilingual.html', 'index-en.html', 'sitemap.html']
    pages = []
    
    for file in html_files:
        if file not in exclude_files:
            name = os.path.splitext(file)[0]
            # 根据文件名生成显示名称
            display_names = {
                'index': '首页',
                'ai-companies': 'AI公司',
                'play-game': '游戏',
                'ai-hotspots': 'AI热点',
                'real-needs': '真需求',
                'ai-ranking': 'AI榜单',
                'ai-overseas': 'AI出海',
                'ai-ads': 'AI ADS',
                'trends': '趋势',
                'ai-capabilities': 'AI功能',
                'lunch-recommendations': '午餐推荐',
                'friendship-links': '友情链接',
                'coding': '编程工具',
                'designer': '设计师工具',
                'writing': '写作工具',
                'image': '图像处理',
                'video': '视频制作',
                'audio': '音频处理',
                'music': '音乐创作',
                'social': '社交媒体',
                'seo': 'SEO工具',
                'game': '游戏开发',
                'prayer': '祈祷工具',
                'words': '词汇工具',
                'xiaohongshu': '小红书工具',
                'hanghai': '航海工具',
                'chuhai': '出海工具',
                'img': '图片工具',
                'links': '链接工具',
                'ailinks': 'AI链接',
                'aicommunity': 'AI社区',
                'aicontent': 'AI内容',
                'ailearn': 'AI学习',
                'ainum': 'AI数字',
                'aioffice': 'AI办公',
                'aiprompt': 'AI提示',
                'aitimer': 'AI计时器',
                'aiagent': 'AI代理',
                'gametest': '游戏测试'
            }
            display_name = display_names.get(name, name.replace('-', ' ').title())
            pages.append({
                'file': file,
                'name': name,
                'display_name': display_name
            })
    
    return pages

def create_navigation_html(pages):
    """创建导航栏HTML"""
    # 桌面端导航
    desktop_nav = '''                <div class="hidden md:flex items-center space-x-8">'''
    for page in pages:
        if page['name'] == 'index':
            desktop_nav += f'''
                    <a href="{page['file']}" class="nav-link">Home</a>'''
        else:
            desktop_nav += f'''
                    <a href="{page['file']}" class="nav-link">{page['display_name']}</a>'''
    desktop_nav += '''
                    <button class="language-switch" onclick="switchLanguage('en')">English</button>
                </div>'''
    
    # 移动端导航
    mobile_nav = '''                <div class="mt-12 space-y-4">'''
    for page in pages:
        if page['name'] == 'index':
            mobile_nav += f'''
                    <a href="{page['file']}" class="block text-white text-lg font-semibold py-2">Home</a>'''
        else:
            mobile_nav += f'''
                    <a href="{page['file']}" class="block text-white text-lg font-semibold py-2">{page['display_name']}</a>'''
    mobile_nav += '''
                    <button class="block text-white text-lg font-semibold py-2 w-full text-left" onclick="switchLanguage('en')">English</button>
                </div>'''
    
    return desktop_nav, mobile_nav

def update_page_navigation(file_path, desktop_nav, mobile_nav):
    """更新页面的导航栏"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否有导航栏
        if '<nav class="navbar">' not in content:
            print(f"跳过 {file_path} - 没有导航栏")
            return
        
        # 更新桌面端导航
        desktop_pattern = r'(<div class="hidden md:flex items-center space-x-8">).*?(<button class="language-switch" onclick="switchLanguage\(''en''\)">English</button>\s*</div>)'
        if re.search(desktop_pattern, content, re.DOTALL):
            content = re.sub(desktop_pattern, r'\1' + desktop_nav.replace(r'\1', '').replace(r'\2', '') + r'\2', content, flags=re.DOTALL)
        
        # 更新移动端导航
        mobile_pattern = r'(<div class="mt-12 space-y-4">).*?(<button class="block text-white text-lg font-semibold py-2 w-full text-left" onclick="switchLanguage\(''en''\)">English</button>\s*</div>)'
        if re.search(mobile_pattern, content, re.DOTALL):
            content = re.sub(mobile_pattern, r'\1' + mobile_nav.replace(r'\1', '').replace(r'\2', '') + r'\2', content, flags=re.DOTALL)
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ 已更新 {file_path} 的导航栏")
        
    except Exception as e:
        print(f"✗ 处理 {file_path} 时出错: {str(e)}")

def add_navigation_to_page_without_nav(file_path, desktop_nav, mobile_nav):
    """为没有导航栏的页面添加导航栏"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经有导航栏
        if '<nav class="navbar">' in content:
            return
        
        # 创建完整的导航栏HTML
        navigation_html = f'''
    <!-- 导航栏 -->
    <nav class="navbar">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="index.html" class="flex items-center space-x-3">
                        <span class="block">
                          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </a>
                </div>{desktop_nav}
                <button class="md:hidden tech-button" id="mobileMenuButton">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- 移动端菜单 -->
    <div class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 hidden" id="mobileMenu">
        <div class="absolute top-0 right-0 w-64 h-full glass">
            <div class="p-6">
                <button class="absolute top-4 right-4 text-white" id="closeMenu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>{mobile_nav}
            </div>
        </div>
    </div>'''
        
        # 在<body>标签后插入导航栏
        if '<body>' in content:
            content = content.replace('<body>', '<body>\n' + navigation_html)
        else:
            # 如果没有<body>标签，在文件开头添加
            content = navigation_html + '\n' + content
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ 已为 {file_path} 添加导航栏")
        
    except Exception as e:
        print(f"✗ 处理 {file_path} 时出错: {str(e)}")

def main():
    """主函数"""
    print("开始更新所有页面的导航栏...")
    
    # 获取所有页面
    pages = get_all_pages()
    print(f"找到 {len(pages)} 个页面")
    
    # 创建导航栏HTML
    desktop_nav, mobile_nav = create_navigation_html(pages)
    
    # 获取所有HTML文件
    html_files = glob.glob("*.html")
    
    # 过滤掉一些不需要处理的文件
    exclude_files = ['index-bilingual.html', 'index-en.html']
    html_files = [f for f in html_files if f not in exclude_files]
    
    print(f"处理 {len(html_files)} 个HTML文件")
    
    # 为每个文件更新或添加导航栏
    for html_file in html_files:
        if '<nav class="navbar">' in open(html_file, 'r', encoding='utf-8').read():
            update_page_navigation(html_file, desktop_nav, mobile_nav)
        else:
            add_navigation_to_page_without_nav(html_file, desktop_nav, mobile_nav)
    
    print("\n完成！所有页面的导航栏已更新。")

if __name__ == "__main__":
    main()
