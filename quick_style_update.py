#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速风格统一脚本
为重要页面添加现代化风格
"""

import re

def update_page(file_path):
    """更新单个页面"""
    print(f"正在更新: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 添加现代化CSS引用
        if 'modern-styles.css' not in content:
            if '<head>' in content:
                content = re.sub(
                    r'(<head[^>]*>)',
                    r'\1\n    <link rel="stylesheet" href="modern-styles.css">',
                    content,
                    flags=re.IGNORECASE
                )
        
        # 包装主要内容
        if '<main class="main-content">' not in content:
            body_match = re.search(r'<body[^>]*>(.*?)</body>', content, flags=re.DOTALL | re.IGNORECASE)
            if body_match:
                body_content = body_match.group(1).strip()
                if not body_content.startswith('<main'):
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
        
        # 添加统一脚本
        if 'navigation.js' not in content:
            scripts = '''    <!-- 引入统一导航栏和样式系统 -->
    <script src="navigation.js"></script>
    <script src="logo-fetcher.js"></script>
    <script src="static-icons.js"></script>'''
            
            if '</body>' in content:
                content = re.sub(
                    r'(</body>)',
                    f'{scripts}\n\\1',
                    content,
                    flags=re.IGNORECASE
                )
        
        # 保存更新
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ 完成更新: {file_path}")
        
    except Exception as e:
        print(f"❌ 更新 {file_path} 时出错: {e}")

def main():
    """主函数"""
    print("🚀 快速统一重要页面风格...")
    
    # 重要页面列表
    important_pages = [
        'ai-capabilities.html',
        'ai-hotspots.html',
        'ai-ranking.html',
        'ai-overseas.html',
        'trends.html',
        'social.html',
        'video.html',
        'image.html',
        'audio.html',
        'music.html',
        'writing.html',
        'coding.html',
        'designer.html',
        'game.html',
        'seo.html'
    ]
    
    for page in important_pages:
        try:
            update_page(page)
        except:
            pass
    
    print("\n🎉 重要页面风格统一完成！")

if __name__ == "__main__":
    main()
