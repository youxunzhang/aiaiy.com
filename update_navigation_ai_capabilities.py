#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import glob

def update_navigation_in_file(file_path):
    """更新单个文件中的导航栏"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经包含AI功能链接
        if 'ai-capabilities.html' in content:
            print(f"跳过 {file_path} - 已包含AI功能链接")
            return False
        
        # 查找导航栏中的友情链接位置
        # 模式1: 在友情链接之前插入
        pattern1 = r'(<a href="friendship-links\.html" class="nav-link">友情链接</a>)'
        replacement1 = r'<a href="ai-capabilities.html" class="nav-link">AI功能</a>\n                    <a href="friendship-links.html" class="nav-link">友情链接</a>'
        
        # 模式2: 在趋势之后插入（如果没有友情链接）
        pattern2 = r'(<a href="trends\.html" class="nav-link">趋势</a>)'
        replacement2 = r'<a href="trends.html" class="nav-link">趋势</a>\n                    <a href="ai-capabilities.html" class="nav-link">AI功能</a>'
        
        # 模式3: 在最后一个导航链接后插入
        pattern3 = r'(<a href="[^"]+\.html" class="nav-link">[^<]+</a>\s*)(</div>)'
        replacement3 = r'\1                    <a href="ai-capabilities.html" class="nav-link">AI功能</a>\n\2'
        
        updated = False
        
        # 尝试模式1
        if re.search(pattern1, content):
            content = re.sub(pattern1, replacement1, content)
            updated = True
            print(f"更新 {file_path} - 在友情链接前插入")
        # 尝试模式2
        elif re.search(pattern2, content):
            content = re.sub(pattern2, replacement2, content)
            updated = True
            print(f"更新 {file_path} - 在趋势后插入")
        # 尝试模式3
        else:
            # 查找导航栏的结束位置
            nav_end_pattern = r'(</div>\s*<!-- 导航栏结束 -->)'
            if re.search(nav_end_pattern, content):
                # 在导航栏结束前插入
                content = re.sub(nav_end_pattern, r'                    <a href="ai-capabilities.html" class="nav-link">AI功能</a>\n\1', content)
                updated = True
                print(f"更新 {file_path} - 在导航栏结束前插入")
            else:
                # 查找最后一个导航链接
                last_nav_pattern = r'(<a href="[^"]+\.html" class="nav-link">[^<]+</a>)(\s*</div>)'
                if re.search(last_nav_pattern, content):
                    content = re.sub(last_nav_pattern, r'\1\n                    <a href="ai-capabilities.html" class="nav-link">AI功能</a>\2', content)
                    updated = True
                    print(f"更新 {file_path} - 在最后一个导航链接后插入")
        
        if updated:
            # 保存更新后的内容
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        else:
            print(f"无法更新 {file_path} - 未找到合适的插入位置")
            return False
            
    except Exception as e:
        print(f"处理 {file_path} 时出错: {e}")
        return False

def main():
    """主函数"""
    # 获取所有HTML文件
    html_files = glob.glob('*.html')
    
    # 排除一些不需要更新的文件
    exclude_files = ['ai-capabilities.html', 'google-index-check.html']
    html_files = [f for f in html_files if f not in exclude_files]
    
    print(f"找到 {len(html_files)} 个HTML文件需要更新")
    
    updated_count = 0
    for file_path in html_files:
        if update_navigation_in_file(file_path):
            updated_count += 1
    
    print(f"\n更新完成！共更新了 {updated_count} 个文件")
    print("AI功能页面已添加到所有页面的导航栏中")

if __name__ == "__main__":
    main()
