#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速修复规范标记
"""

import re
from pathlib import Path

def fix_canonical_quick():
    """快速修复规范标记"""
    
    # 需要修复的文件和对应的规范URL
    files_to_fix = {
        'social.html': 'https://www.aiaiy.com/social/',
        'xiaohongshu.html': 'https://www.aiaiy.com/xiaohongshu/',
        'coding.html': 'https://www.aiaiy.com/coding/',
        'audio.html': 'https://www.aiaiy.com/audio/',
        'image.html': 'https://www.aiaiy.com/image/',
        'video.html': 'https://www.aiaiy.com/video/',
        'writing.html': 'https://www.aiaiy.com/writing/'
    }
    
    for filename, canonical_url in files_to_fix.items():
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 查找并替换现有的规范标记
            old_canonical_pattern = r'<link rel="canonical" href="[^"]*">'
            new_canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
            
            if re.search(old_canonical_pattern, content):
                content = re.sub(old_canonical_pattern, new_canonical_tag, content)
                print(f"✓ 修复 {filename}: {canonical_url}")
            else:
                # 在head标签中添加规范标记
                head_pattern = r'(<head[^>]*>)'
                head_match = re.search(head_pattern, content, re.IGNORECASE)
                if head_match:
                    head_start = head_match.end()
                    content = content[:head_start] + f'\n    {new_canonical_tag}' + content[head_start:]
                    print(f"✓ 添加 {filename}: {canonical_url}")
            
            # 添加robots标签
            if 'name="robots"' not in content:
                head_pattern = r'(<head[^>]*>)'
                head_match = re.search(head_pattern, content, re.IGNORECASE)
                if head_match:
                    head_start = head_match.end()
                    robots_tag = '\n    <meta name="robots" content="index, follow">'
                    content = content[:head_start] + robots_tag + content[head_start:]
                    print(f"✓ 添加robots标签到 {filename}")
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
                
        except Exception as e:
            print(f"✗ 处理 {filename} 时出错: {e}")

if __name__ == '__main__':
    print("快速修复规范标记...")
    fix_canonical_quick()
    print("完成！")
