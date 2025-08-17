#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速更新重要页面为现代化欧美风格
"""

import os
import re

def update_page_modern_style(file_path):
    """快速更新页面为现代化风格"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. 更新body背景和颜色
        content = re.sub(
            r'background:\s*(?:var\([^)]+\)|linear-gradient\([^)]+\)|rgba?\([^)]+\)|#[0-9a-fA-F]{3,6})',
            'background: #FAFAFA',
            content
        )
        
        content = re.sub(
            r'color:\s*(?:var\([^)]+\)|#[0-9a-fA-F]{3,6})',
            'color: #111827',
            content
        )
        
        # 2. 更新导航栏
        content = re.sub(
            r'background:\s*rgba\(0,\s*0,\s*0,\s*[^)]+\)',
            'background: rgba(255, 255, 255, 0.95)',
            content
        )
        
        content = re.sub(
            r'border-bottom:\s*1px solid rgba\(255,\s*255,\s*255,\s*[^)]+\)',
            'border-bottom: 1px solid #E5E7EB',
            content
        )
        
        # 3. 更新玻璃态效果为现代化卡片
        glass_pattern = r'\.glass\s*{[^}]*}'
        modern_card_css = '''.glass {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .glass:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            border-color: #D1D5DB;
        }'''
        
        if re.search(glass_pattern, content):
            content = re.sub(glass_pattern, modern_card_css, content)
        
        # 4. 添加现代化字体渲染
        if 'font-family' in content and 'webkit-font-smoothing' not in content:
            content = re.sub(
                r'(font-family:[^;]+;)',
                r'\1\n            -webkit-font-smoothing: antialiased;\n            -moz-osx-font-smoothing: grayscale;',
                content
            )
        
        # 5. 移除复杂的背景动画
        content = re.sub(r'body::before\s*{[^}]*}', '', content)
        content = re.sub(r'@keyframes backgroundShift\s*{[^}]*}', '', content)
        
        # 保存更新后的文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ 已更新: {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ 更新失败 {file_path}: {e}")
        return False

def main():
    """主函数：更新重要页面"""
    print("🚀 开始快速更新重要页面为现代化欧美风格...")
    
    # 重要页面列表
    important_pages = [
        'index.html',
        'ai-overseas.html',
        'ai-ranking.html',
        'ai-companies.html',
        'ai-hotspots.html',
        'ai-ads.html',
        'real-needs.html',
        'social.html',
        'video.html',
        'writing.html',
        'image.html',
        'audio.html',
        'coding.html',
        'designer.html',
        'trends.html',
        'seo.html',
        'sitemap.html',
        'prayer.html',
        'words.html',
        'music.html',
        'game.html',
        'xiaohongshu.html',
        'chuhai.html',
        'hanghai.html',
        'links.html',
        'friendship-links.html'
    ]
    
    success_count = 0
    failed_count = 0
    
    for page in important_pages:
        if os.path.exists(page):
            if update_page_modern_style(page):
                success_count += 1
            else:
                failed_count += 1
        else:
            print(f"⚠️  文件不存在: {page}")
    
    print(f"\n📊 更新完成!")
    print(f"✅ 成功更新: {success_count} 个文件")
    print(f"❌ 更新失败: {failed_count} 个文件")
    
    if success_count > 0:
        print(f"\n🎉 重要页面已更新为现代化欧美风格!")
        print("✨ 主要更新内容:")
        print("   - 简洁的白色背景 (#FAFAFA)")
        print("   - 现代化的深色文字 (#111827)")
        print("   - 半透明白色导航栏")
        print("   - 现代化卡片设计")
        print("   - 优雅的悬停效果")
        print("   - 平滑的字体渲染")

if __name__ == "__main__":
    main()
