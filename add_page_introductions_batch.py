#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量添加页面介绍组件
为所有HTML页面添加页面介绍和FAQ功能
"""

import os
import re
from pathlib import Path

def add_introduction_to_page(file_path):
    """为单个页面添加介绍组件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经添加了介绍组件
        if 'page-introductions.js' in content:
            print(f"✓ {file_path} 已包含介绍组件，跳过")
            return False
        
        # 查找合适的位置添加script标签
        # 优先在</body>标签前添加
        if '</body>' in content:
            script_tag = '    <!-- 引入页面介绍组件 -->\n    <script src="page-introductions.js"></script>\n    \n</body>'
            new_content = content.replace('</body>', script_tag)
        # 如果没有</body>标签，在</html>标签前添加
        elif '</html>' in content:
            script_tag = '    <!-- 引入页面介绍组件 -->\n    <script src="page-introductions.js"></script>\n    \n</html>'
            new_content = content.replace('</html>', script_tag)
        else:
            print(f"⚠ {file_path} 无法找到合适的位置添加script标签")
            return False
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✓ {file_path} 已添加介绍组件")
        return True
        
    except Exception as e:
        print(f"✗ {file_path} 处理失败: {e}")
        return False

def main():
    """主函数"""
    print("🚀 开始批量添加页面介绍组件...")
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 需要添加介绍组件的页面列表
    target_pages = [
        'aioffice.html',
        'aiprompt.html', 
        'aitimer.html',
        'aicommunity.html',
        'words.html',
        'img.html',
        'music.html',
        'video.html',
        'audio.html',
        'designer.html',
        'coding.html',
        'game.html',
        'social.html',
        'seo.html',
        'sitemap.html',
        'trends.html',
        'real-needs.html',
        'ai-hotspots.html',
        'ai-ranking.html',
        'ai-ads.html',
        'ai-overseas.html',
        'ai-capabilities.html',
        'ai-companies.html',
        'ailinks.html',
        'links.html',
        'xiaohongshu.html',
        'chuhai.html',
        'hanghai.html',
        'prayer.html',
        'lunch-recommendations.html'
    ]
    
    success_count = 0
    total_count = len(target_pages)
    
    for page in target_pages:
        file_path = current_dir / page
        if file_path.exists():
            if add_introduction_to_page(file_path):
                success_count += 1
        else:
            print(f"⚠ {page} 文件不存在，跳过")
    
    print(f"\n📊 处理完成！")
    print(f"成功: {success_count}/{total_count}")
    print(f"失败: {total_count - success_count}")
    
    if success_count > 0:
        print("\n✨ 页面介绍组件已成功添加到以下页面:")
        print("每个页面现在都包含:")
        print("• 📖 详细的页面介绍")
        print("• ❓ 常见问题解答")
        print("• 💡 使用建议")
        print("• 📞 联系方式")
        print("\n用户现在可以更好地了解每个页面的作用和功能！")

if __name__ == "__main__":
    main()
