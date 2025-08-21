#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有HTML页面添加LOGO管理器
自动为网站的所有页面添加LOGO获取功能
"""

import os
import re
from pathlib import Path

def add_logo_manager_to_html_files():
    """为所有HTML文件添加LOGO管理器"""
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 查找所有HTML文件
    html_files = list(current_dir.glob('*.html'))
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    for html_file in html_files:
        print(f"处理文件: {html_file}")
        
        try:
            # 读取文件内容
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否已经包含LOGO管理器
            if 'universal-logo-manager.js' in content or 'auto-logo-loader.js' in content:
                print(f"  {html_file} 已经包含LOGO管理器，跳过")
                continue
            
            # 查找</head>标签的位置
            head_end_match = re.search(r'</head>', content, re.IGNORECASE)
            
            if head_end_match:
                # 在</head>之前插入LOGO管理器脚本
                logo_script = '''
    <!-- 自动LOGO管理器 -->
    <script src="auto-logo-loader.js"></script>
    <script src="universal-logo-manager.js"></script>
'''
                
                # 插入脚本
                new_content = content[:head_end_match.start()] + logo_script + content[head_end_match.start():]
                
                # 写回文件
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"  ✓ 成功为 {html_file} 添加LOGO管理器")
            else:
                print(f"  ✗ 在 {html_file} 中未找到</head>标签")
                
        except Exception as e:
            print(f"  ✗ 处理 {html_file} 时出错: {e}")

def add_logo_manager_to_specific_pages():
    """为特定页面添加专门的LOGO管理器"""
    
    # 首页添加首页LOGO管理器
    index_files = ['index.html', 'index-en.html', 'index-bilingual.html']
    
    for index_file in index_files:
        if os.path.exists(index_file):
            print(f"为首页 {index_file} 添加专门的LOGO管理器")
            
            try:
                with open(index_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # 检查是否已经包含首页LOGO管理器
                if 'homepage-logo-manager.js' in content:
                    print(f"  {index_file} 已经包含首页LOGO管理器，跳过")
                    continue
                
                # 查找</head>标签的位置
                head_end_match = re.search(r'</head>', content, re.IGNORECASE)
                
                if head_end_match:
                    # 在</head>之前插入首页LOGO管理器脚本
                    homepage_script = '''
    <!-- 首页LOGO管理器 -->
    <script src="homepage-logo-manager.js"></script>
'''
                    
                    # 插入脚本
                    new_content = content[:head_end_match.start()] + homepage_script + content[head_end_match.start():]
                    
                    # 写回文件
                    with open(index_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"  ✓ 成功为 {index_file} 添加首页LOGO管理器")
                else:
                    print(f"  ✗ 在 {index_file} 中未找到</head>标签")
                    
            except Exception as e:
                print(f"  ✗ 处理 {index_file} 时出错: {e}")
    
    # AI公司页面添加专门的LOGO管理器
    ai_companies_file = 'ai-companies.html'
    if os.path.exists(ai_companies_file):
        print(f"为AI公司页面 {ai_companies_file} 添加专门的LOGO管理器")
        
        try:
            with open(ai_companies_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否已经包含AI公司LOGO管理器
            if 'ai-companies-logos.js' in content:
                print(f"  {ai_companies_file} 已经包含AI公司LOGO管理器，跳过")
            else:
                # 查找</head>标签的位置
                head_end_match = re.search(r'</head>', content, re.IGNORECASE)
                
                if head_end_match:
                    # 在</head>之前插入AI公司LOGO管理器脚本
                    ai_companies_script = '''
    <!-- AI公司LOGO管理器 -->
    <script src="ai-companies-logos.js"></script>
'''
                    
                    # 插入脚本
                    new_content = content[:head_end_match.start()] + ai_companies_script + content[head_end_match.start():]
                    
                    # 写回文件
                    with open(ai_companies_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    print(f"  ✓ 成功为 {ai_companies_file} 添加AI公司LOGO管理器")
                else:
                    print(f"  ✗ 在 {ai_companies_file} 中未找到</head>标签")
                    
        except Exception as e:
            print(f"  ✗ 处理 {ai_companies_file} 时出错: {e}")

def create_logo_manager_summary():
    """创建LOGO管理器使用总结"""
    
    summary = """
# LOGO管理器使用总结

## 已创建的文件

1. **universal-logo-manager.js** - 通用LOGO管理器
   - 为所有页面的链接添加LOGO背景
   - 支持工具卡片、链接卡片、公司卡片
   - 自动缓存LOGO到本地存储

2. **homepage-logo-manager.js** - 首页专用LOGO管理器
   - 专门为首页的AI工具板块添加LOGO
   - 包含首页所有链接的LOGO映射

3. **ai-companies-logos.js** - AI公司页面LOGO管理器
   - 为AI公司页面添加品牌LOGO背景
   - 包含全球100家AI公司的LOGO映射

4. **auto-logo-loader.js** - 自动LOGO加载器
   - 自动检测页面类型并加载对应的LOGO管理器
   - 支持动态页面加载

## 功能特性

- ✅ 自动获取网站favicon作为LOGO
- ✅ 预定义大量知名网站的LOGO映射
- ✅ 智能fallback到emoji图标
- ✅ 本地缓存，提高加载速度
- ✅ 响应式设计，适配各种屏幕
- ✅ 悬停效果，增强用户体验

## 支持的页面类型

- 首页 (index.html)
- AI公司页面 (ai-companies.html)
- 链接导航页面 (ailinks.html)
- 所有其他包含链接的页面

## 使用方法

1. 页面会自动加载对应的LOGO管理器
2. LOGO会作为背景显示在卡片上
3. 鼠标悬停时LOGO会变得更加明显
4. 如果无法获取LOGO，会显示对应的emoji图标

## 技术实现

- 使用fetch API获取网站favicon
- 支持多种favicon格式 (ico, png, apple-touch-icon)
- 使用Google和Gstatic的favicon服务作为备选
- 本地存储缓存，避免重复请求
- 异步加载，不阻塞页面渲染
"""
    
    with open('LOGO管理器使用说明.md', 'w', encoding='utf-8') as f:
        f.write(summary)
    
    print("✓ 已创建LOGO管理器使用说明文档")

def main():
    """主函数"""
    print("开始为网站添加LOGO管理器...")
    print("=" * 50)
    
    # 为所有页面添加通用LOGO管理器
    add_logo_manager_to_html_files()
    
    print("\n" + "=" * 50)
    
    # 为特定页面添加专门的LOGO管理器
    add_logo_manager_to_specific_pages()
    
    print("\n" + "=" * 50)
    
    # 创建使用说明
    create_logo_manager_summary()
    
    print("\n" + "=" * 50)
    print("LOGO管理器添加完成！")
    print("\n现在所有页面的链接都会自动显示对应的LOGO背景。")
    print("LOGO会作为半透明背景显示在卡片上，鼠标悬停时会更加明显。")

if __name__ == "__main__":
    main()
