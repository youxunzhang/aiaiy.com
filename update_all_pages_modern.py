#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量更新所有页面，添加统一的导航栏和LOGO系统
"""

import os
import re
from pathlib import Path

def update_page_with_unified_navigation(file_path):
    """更新单个页面，添加统一的导航栏"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已经包含统一导航栏
    if 'navigation.js' in content:
        print(f"跳过 {file_path} - 已包含统一导航栏")
        return False
    
    # 移除旧的导航栏
    # 移除顶部导航栏
    content = re.sub(
        r'<nav[^>]*class="[^"]*navbar[^"]*"[^>]*>.*?</nav>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 移除移动端菜单
    content = re.sub(
        r'<div[^>]*id="mobileMenu"[^>]*>.*?</div>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 移除侧边栏切换按钮
    content = re.sub(
        r'<button[^>]*id="sidebarToggle"[^>]*>.*?</button>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 移除旧的侧边栏
    content = re.sub(
        r'<aside[^>]*class="[^"]*sidebar[^"]*"[^>]*>.*?</aside>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 在body标签后添加主要内容区域包装
    if '<main' not in content or 'class="main-content"' not in content:
        # 找到body标签后的第一个主要内容
        body_match = re.search(r'<body[^>]*>', content)
        if body_match:
            body_end = body_match.end()
            # 找到第一个主要内容元素
            main_start = content.find('<main', body_end)
            if main_start == -1:
                main_start = content.find('<div', body_end)
            
            if main_start != -1:
                # 在主要内容前添加main-content包装
                content = content[:main_start] + '    <!-- 主要内容区域 -->\n    <main class="main-content">\n        ' + content[main_start:]
                
                # 找到对应的结束标签
                tag_name = content[main_start:main_start+10].split()[0][1:]  # 提取标签名
                if tag_name == 'main':
                    # 找到main标签的结束位置
                    main_end = content.find('</main>', main_start)
                    if main_end != -1:
                        content = content[:main_end] + '\n    </main>\n' + content[main_end+7:]
                else:
                    # 对于div标签，在页面结束前添加结束标签
                    content = content.replace('</body>', '    </main>\n</body>')
    
    # 在head标签中添加现代化样式引用
    if 'modern-styles.css' not in content:
        head_end = content.find('</head>')
        if head_end != -1:
            style_link = '    <link rel="stylesheet" href="modern-styles.css">\n'
            content = content[:head_end] + style_link + content[head_end:]
    
    # 在body结束前添加脚本引用
    scripts_to_add = [
        '    <!-- 引入统一导航栏和LOGO系统 -->',
        '    <script src="navigation.js"></script>',
        '    <script src="logo-fetcher.js"></script>',
        '    <script src="static-icons.js"></script>'
    ]
    
    # 检查是否已经包含这些脚本
    if not any(script in content for script in ['navigation.js', 'logo-fetcher.js']):
        body_end = content.find('</body>')
        if body_end != -1:
            scripts_html = '\n'.join(scripts_to_add) + '\n'
            content = content[:body_end] + scripts_html + content[body_end:]
    
    # 保存更新后的内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"已更新 {file_path}")
    return True

def update_company_cards_with_logos(file_path):
    """为AI公司页面添加LOGO容器"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否是AI公司页面
    if 'ai-companies.html' not in file_path.name:
        return False
    
    # 为每个公司卡片添加LOGO容器
    # 查找公司标题div
    company_title_pattern = r'<div class="company-title">([^<]+)</div>'
    
    def add_logo_container(match):
        company_name = match.group(1)
        return f'''<div class="logo-container w-12 h-12 mb-3"></div>
                    <div class="company-title">{company_name}</div>'''
    
    content = re.sub(company_title_pattern, add_logo_container, content)
    
    # 保存更新后的内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"已为 {file_path} 添加LOGO容器")
    return True

def main():
    """主函数"""
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 要处理的HTML文件
    html_files = [
        'index.html',
        'ai-companies.html',
        'play-game.html',
        'ai-hotspots.html',
        'real-needs.html',
        'ai-ranking.html',
        'ai-overseas.html',
        'ai-ads.html',
        'trends.html',
        'ai-capabilities.html',
        'lunch-recommendations.html',
        'coding.html',
        'designer.html',
        'writing.html',
        'image.html',
        'video.html',
        'audio.html',
        'music.html',
        'social.html',
        'seo.html',
        'game.html',
        'prayer.html',
        'words.html',
        'xiaohongshu.html',
        'hanghai.html',
        'chuhai.html',
        'img.html',
        'links.html',
        'ailinks.html',
        'aicommunity.html',
        'aicontent.html',
        'ailearn.html',
        'ainum.html',
        'aioffice.html',
        'aiprompt.html',
        'aitimer.html',
        'aiagent.html',
        'gametest.html'
    ]
    
    updated_count = 0
    
    for html_file in html_files:
        file_path = current_dir / html_file
        if file_path.exists():
            try:
                # 更新导航栏
                if update_page_with_unified_navigation(file_path):
                    updated_count += 1
                
                # 为AI公司页面添加LOGO容器
                if 'ai-companies.html' in html_file:
                    update_company_cards_with_logos(file_path)
                    
            except Exception as e:
                print(f"更新 {html_file} 时出错: {e}")
        else:
            print(f"文件不存在: {html_file}")
    
    print(f"\n更新完成！共更新了 {updated_count} 个文件")
    print("\n更新内容包括：")
    print("1. 添加了统一的左侧导航栏")
    print("2. 引入了现代化样式文件")
    print("3. 添加了LOGO获取和存储系统")
    print("4. 为AI公司页面添加了LOGO容器")
    print("5. 移除了旧的导航栏代码")

if __name__ == "__main__":
    main()
