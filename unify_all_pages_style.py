#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
统一所有页面风格脚本
为所有HTML页面添加现代化欧美风格，统一导航栏和样式
"""

import os
import re
from pathlib import Path

def get_html_files():
    """获取所有HTML文件"""
    html_files = []
    for file in os.listdir('.'):
        if file.endswith('.html') and file != 'index.html':  # 跳过首页，因为它已经有统一风格
            html_files.append(file)
    return html_files

def update_page_structure(file_path):
    """更新页面结构，添加统一风格"""
    print(f"正在更新: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. 移除旧的导航栏和样式
    content = remove_old_navigation(content)
    content = remove_old_styles(content)
    
    # 2. 添加现代化CSS引用
    content = add_modern_css(content)
    
    # 3. 包装主要内容
    content = wrap_main_content(content)
    
    # 4. 添加统一脚本
    content = add_unified_scripts(content)
    
    # 5. 更新body样式
    content = update_body_style(content)
    
    # 保存更新后的内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 完成更新: {file_path}")

def remove_old_navigation(content):
    """移除旧的导航栏"""
    # 移除常见的旧导航栏模式
    patterns = [
        r'<nav[^>]*class="[^"]*navbar[^"]*"[^>]*>.*?</nav>',
        r'<header[^>]*>.*?</header>',
        r'<div[^>]*class="[^"]*nav[^"]*"[^>]*>.*?</div>',
        r'<ul[^>]*class="[^"]*nav[^"]*"[^>]*>.*?</ul>',
        r'<div[^>]*id="[^"]*nav[^"]*"[^>]*>.*?</div>',
        r'<div[^>]*class="[^"]*header[^"]*"[^>]*>.*?</div>',
        r'<div[^>]*class="[^"]*menu[^"]*"[^>]*>.*?</div>'
    ]
    
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    return content

def remove_old_styles(content):
    """移除旧的样式引用"""
    # 移除旧的CSS引用
    patterns = [
        r'<link[^>]*href="[^"]*\.css"[^>]*>',
        r'<style[^>]*>.*?</style>',
        r'<script[^>]*src="[^"]*\.css"[^>]*></script>'
    ]
    
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    return content

def add_modern_css(content):
    """添加现代化CSS引用"""
    modern_css_link = '<link rel="stylesheet" href="modern-styles.css">'
    
    # 在head标签内添加CSS引用
    if '<head>' in content:
        content = re.sub(
            r'(<head[^>]*>)',
            r'\1\n    ' + modern_css_link,
            content,
            flags=re.IGNORECASE
        )
    else:
        # 如果没有head标签，在html标签后添加
        content = re.sub(
            r'(<html[^>]*>)',
            r'\1\n<head>\n    ' + modern_css_link + '\n</head>',
            content,
            flags=re.IGNORECASE
        )
    
    return content

def wrap_main_content(content):
    """包装主要内容"""
    # 查找body标签内的内容
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, flags=re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1).strip()
        
        # 如果内容还没有被包装，则包装它
        if not re.search(r'<main[^>]*class="[^"]*main-content[^"]*"[^>]*>', body_content):
            # 移除可能存在的旧包装
            body_content = re.sub(r'<div[^>]*class="[^"]*container[^"]*"[^>]*>', '', body_content)
            body_content = re.sub(r'</div>\s*$', '', body_content)
            
            # 添加新的包装
            wrapped_content = f'''    <main class="main-content">
        <div class="max-w-7xl mx-auto py-12 px-4">
{body_content}
        </div>
    </main>'''
            
            content = re.sub(
                r'<body[^>]*>(.*?)</body>',
                f'<body>\n{wrapped_content}\n</body>',
                content,
                flags=re.DOTALL | re.IGNORECASE
            )
    
    return content

def add_unified_scripts(content):
    """添加统一脚本"""
    scripts = '''    <!-- 引入统一导航栏和样式系统 -->
    <script src="navigation.js"></script>
    <script src="logo-fetcher.js"></script>
    <script src="static-icons.js"></script>'''
    
    # 在body结束标签前添加脚本
    if '</body>' in content:
        content = re.sub(
            r'(</body>)',
            f'{scripts}\n\\1',
            content,
            flags=re.IGNORECASE
        )
    
    return content

def update_body_style(content):
    """更新body样式"""
    # 确保body有正确的类名
    if '<body' in content:
        content = re.sub(
            r'<body([^>]*)>',
            r'<body\1 class="modern-body">',
            content,
            flags=re.IGNORECASE
        )
    else:
        content = re.sub(
            r'(<html[^>]*>)',
            r'\1\n<body class="modern-body">',
            content,
            flags=re.IGNORECASE
        )
        content = re.sub(
            r'(</html>)',
            r'</body>\n\\1',
            content,
            flags=re.IGNORECASE
        )
    
    return content

def main():
    """主函数"""
    print("🚀 开始统一所有页面风格...")
    
    # 获取所有HTML文件
    html_files = get_html_files()
    print(f"找到 {len(html_files)} 个HTML文件需要更新")
    
    # 更新每个文件
    for file_path in html_files:
        try:
            update_page_structure(file_path)
        except Exception as e:
            print(f"❌ 更新 {file_path} 时出错: {e}")
    
    print("\n🎉 所有页面风格统一完成！")
    print("\n更新内容包括：")
    print("1. ✅ 移除了旧的导航栏和样式")
    print("2. ✅ 添加了现代化CSS引用")
    print("3. ✅ 统一了页面结构")
    print("4. ✅ 添加了统一脚本系统")
    print("5. ✅ 应用了欧美流行色调")
    print("\n现在所有页面都拥有统一的现代化风格！")

if __name__ == "__main__":
    main()
