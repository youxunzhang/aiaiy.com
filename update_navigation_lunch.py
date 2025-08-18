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
        
        # 检查是否已经包含午餐推荐链接
        if 'lunch-recommendations.html' in content:
            print(f"跳过 {file_path} - 已包含午餐推荐链接")
            return False
        
        updated = False
        
        # 模式1: 在AI功能之后插入（如果有友情链接）
        pattern1 = r'(<a href="ai-capabilities\.html" class="nav-link">AI功能</a>\s*<a href="friendship-links\.html" class="nav-link">友情链接</a>)'
        replacement1 = r'<a href="ai-capabilities.html" class="nav-link">AI功能</a>\n                    <a href="lunch-recommendations.html" class="nav-link">午餐推荐</a>\n                    <a href="friendship-links.html" class="nav-link">友情链接</a>'
        
        # 模式2: 在AI功能之后插入（如果没有友情链接）
        pattern2 = r'(<a href="ai-capabilities\.html" class="nav-link">AI功能</a>\s*</div>)'
        replacement2 = r'<a href="ai-capabilities.html" class="nav-link">AI功能</a>\n                    <a href="lunch-recommendations.html" class="nav-link">午餐推荐</a>\n                </div>'
        
        # 模式3: 移动端菜单中的AI功能之后插入
        pattern3 = r'(<a href="ai-capabilities\.html" class="block text-white text-lg font-semibold py-2">AI功能</a>\s*</div>)'
        replacement3 = r'<a href="ai-capabilities.html" class="block text-white text-lg font-semibold py-2">AI功能</a>\n                    <a href="lunch-recommendations.html" class="block text-white text-lg font-semibold py-2">午餐推荐</a>\n                </div>'
        
        # 尝试模式1
        if re.search(pattern1, content):
            content = re.sub(pattern1, replacement1, content)
            updated = True
            print(f"更新 {file_path} - 在AI功能和友情链接之间插入")
        # 尝试模式2
        elif re.search(pattern2, content):
            content = re.sub(pattern2, replacement2, content)
            updated = True
            print(f"更新 {file_path} - 在AI功能后插入")
        # 尝试模式3
        elif re.search(pattern3, content):
            content = re.sub(pattern3, replacement3, content)
            updated = True
            print(f"更新 {file_path} - 在移动端菜单AI功能后插入")
        
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
    exclude_files = ['lunch-recommendations.html', 'google-index-check.html']
    html_files = [f for f in html_files if f not in exclude_files]
    
    print(f"找到 {len(html_files)} 个HTML文件需要更新")
    
    updated_count = 0
    for file_path in html_files:
        if update_navigation_in_file(file_path):
            updated_count += 1
    
    print(f"\n更新完成！共更新了 {updated_count} 个文件")
    print("午餐推荐页面已添加到所有页面的导航栏中")

if __name__ == "__main__":
    main()
