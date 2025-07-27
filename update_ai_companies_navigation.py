#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新所有HTML页面的导航菜单，添加AI公司页面链接
确保整个网站导航的一致性
"""

import os
import re
from pathlib import Path

def update_navigation_with_ai_companies():
    """更新所有HTML页面的导航菜单，添加AI公司链接"""
    
    # 获取当前目录下所有HTML文件
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        print(f"正在处理: {filename}")
        
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            updated = False
            
            # 1. 更新桌面端导航菜单
            # 查找包含"首页"或"Home"的导航菜单
            nav_patterns = [
                r'(<div class="flex items-center space-x-4">.*?<a href="index\.html"[^>]*>.*?</a>.*?</div>)',
                r'(<div class="hidden md:flex items-center space-x-8">.*?<a href="index\.html"[^>]*>.*?</a>.*?</div>)',
                r'(<div class="flex items-center space-x-4">.*?<a href="index\.html"[^>]*>首页</a>.*?</div>)',
                r'(<div class="flex items-center space-x-4">.*?<a href="index\.html"[^>]*>Home</a>.*?</div>)'
            ]
            
            for pattern in nav_patterns:
                match = re.search(pattern, content, re.DOTALL)
                if match:
                    nav_content = match.group(1)
                    # 检查是否已经包含AI公司链接
                    if 'ai-companies.html' not in nav_content:
                        # 在首页链接后添加AI公司链接
                        if '首页' in nav_content:
                            new_nav = nav_content.replace(
                                '<a href="index.html"',
                                '<a href="index.html" class="language-switch">首页</a>\n            <a href="ai-companies.html" class="language-switch">AI公司</a>'
                            )
                        elif 'Home' in nav_content:
                            new_nav = nav_content.replace(
                                '<a href="index.html"',
                                '<a href="index.html" class="nav-link">Home</a>\n                    <a href="ai-companies.html" class="nav-link">AI公司</a>'
                            )
                        else:
                            # 通用替换
                            new_nav = nav_content.replace(
                                '</a>',
                                '</a>\n            <a href="ai-companies.html" class="language-switch">AI公司</a>'
                            )
                        
                        content = content.replace(nav_content, new_nav)
                        updated = True
                        break
            
            # 2. 更新移动端导航菜单
            mobile_patterns = [
                r'(<div class="mt-12 space-y-4">.*?<a href="index\.html"[^>]*>.*?</a>.*?</div>)',
                r'(<div class="mt-12 space-y-4">.*?<a href="index\.html"[^>]*>Home</a>.*?</div>)'
            ]
            
            for pattern in mobile_patterns:
                match = re.search(pattern, content, re.DOTALL)
                if match:
                    mobile_content = match.group(1)
                    if 'ai-companies.html' not in mobile_content:
                        new_mobile = mobile_content.replace(
                            '<a href="index.html"',
                            '<a href="index.html" class="block text-white text-lg font-semibold py-2">Home</a>\n                    <a href="ai-companies.html" class="block text-white text-lg font-semibold py-2">AI公司</a>'
                        )
                        content = content.replace(mobile_content, new_mobile)
                        updated = True
                        break
            
            # 3. 如果内容有变化，写回文件
            if content != original_content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ 已更新: {filename}")
            else:
                print(f"⏭️  无需更新: {filename}")
                
        except Exception as e:
            print(f"❌ 处理失败 {filename}: {str(e)}")

def main():
    """主函数"""
    print("开始更新所有页面的导航菜单...")
    update_navigation_with_ai_companies()
    print("导航菜单更新完成！")

if __name__ == "__main__":
    main() 