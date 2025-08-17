#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量更新所有HTML页面为现代化欧美风格
"""

import os
import re
import glob

def update_html_file(file_path):
    """更新单个HTML文件为现代化风格"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换旧的样式为现代化样式
        updated_content = content
        
        # 1. 更新body样式
        old_body_style = r'body\s*{[^}]*}'
        new_body_style = '''body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    background: #FAFAFA;
    color: #111827;
    line-height: 1.6;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}'''
        
        if re.search(old_body_style, content):
            updated_content = re.sub(old_body_style, new_body_style, updated_content)
        
        # 2. 更新渐变背景为简洁背景
        gradient_bg_patterns = [
            r'background:\s*linear-gradient\([^)]+\)',
            r'background:\s*gradient\([^)]+\)',
            r'background:\s*url\([^)]+\)'
        ]
        
        for pattern in gradient_bg_patterns:
            if re.search(pattern, content):
                updated_content = re.sub(pattern, 'background: #FAFAFA', updated_content)
        
        # 3. 更新玻璃效果为现代化卡片
        glass_patterns = [
            r'\.glass-effect\s*{[^}]*}',
            r'backdrop-filter:\s*blur\([^)]+\)',
            r'background:\s*rgba\([^)]+\)'
        ]
        
        for pattern in glass_patterns:
            if re.search(pattern, content):
                updated_content = re.sub(pattern, '', updated_content)
        
        # 4. 添加现代化卡片样式
        if '.modern-card' not in content:
            modern_card_css = '''
        .modern-card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }
        
        .modern-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            border-color: #D1D5DB;
        }
        
        .link-item {
            background: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            transition: all 0.2s ease;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .link-item:hover {
            background: #F3F4F6;
            border-color: #D1D5DB;
            transform: translateY(-1px);
            text-decoration: none;
            color: inherit;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #2563EB, #7C3AED);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .category-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .stats-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .modern-button {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            transition: all 0.2s ease;
            color: #374151;
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .modern-button:hover {
            background: #F9FAFB;
            border-color: #D1D5DB;
            transform: translateX(-2px);
            text-decoration: none;
            color: #374151;
        }
        
        .link-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .link-grid {
                grid-template-columns: 1fr;
            }
        }
        
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }'''
            
            # 在</style>标签前插入新样式
            if '</style>' in updated_content:
                updated_content = updated_content.replace('</style>', modern_card_css + '\n    </style>')
        
        # 5. 更新类名
        class_replacements = {
            'glass-effect': 'modern-card',
            'back-button': 'modern-button',
            'link-card': 'modern-card'
        }
        
        for old_class, new_class in class_replacements.items():
            updated_content = updated_content.replace(old_class, new_class)
        
        # 6. 更新颜色变量
        color_updates = {
            '--primary-blue': '#2563EB',
            '--primary-indigo': '#4F46E5',
            '--primary-purple': '#7C3AED',
            '--primary-pink': '#EC4899',
            '--primary-rose': '#F43F5E',
            '--primary-orange': '#F97316',
            '--primary-amber': '#F59E0B',
            '--primary-yellow': '#EAB308',
            '--primary-lime': '#84CC16',
            '--primary-green': '#22C55E',
            '--primary-emerald': '#10B981',
            '--primary-teal': '#14B8A6',
            '--primary-cyan': '#06B6D4',
            '--primary-sky': '#0EA5E9'
        }
        
        for color_var, color_value in color_updates.items():
            updated_content = updated_content.replace(color_var, color_value)
        
        # 7. 更新Tailwind CSS链接为最新版本
        tailwind_pattern = r'https://cdn\.tailwindcss\.com'
        if re.search(tailwind_pattern, content):
            updated_content = re.sub(tailwind_pattern, 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio', updated_content)
        
        # 8. 添加现代化字体
        if 'Inter' not in content and 'font-family' in content:
            font_pattern = r'font-family:\s*[^;]+;'
            modern_font = "font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;"
            updated_content = re.sub(font_pattern, modern_font, updated_content)
        
        # 保存更新后的文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"✅ 已更新: {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ 更新失败 {file_path}: {e}")
        return False

def main():
    """主函数：批量更新所有HTML文件"""
    print("🚀 开始批量更新所有HTML页面为现代化欧美风格...")
    
    # 获取所有HTML文件
    html_files = glob.glob("*.html")
    
    if not html_files:
        print("❌ 未找到HTML文件")
        return
    
    print(f"📁 找到 {len(html_files)} 个HTML文件")
    
    success_count = 0
    failed_count = 0
    
    for html_file in html_files:
        if update_html_file(html_file):
            success_count += 1
        else:
            failed_count += 1
    
    print(f"\n📊 更新完成!")
    print(f"✅ 成功更新: {success_count} 个文件")
    print(f"❌ 更新失败: {failed_count} 个文件")
    
    if success_count > 0:
        print(f"\n🎉 所有页面已更新为现代化欧美风格!")
        print("✨ 主要更新内容:")
        print("   - 采用简洁的白色背景")
        print("   - 现代化卡片设计")
        print("   - 优雅的悬停效果")
        print("   - 响应式布局")
        print("   - 现代化字体")
        print("   - 流畅的动画效果")

if __name__ == "__main__":
    main()
