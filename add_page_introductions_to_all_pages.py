#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有HTML页面添加页面介绍功能
批量处理所有HTML文件，在页面尾部添加页面介绍和FAQ
"""

import os
import re
from pathlib import Path

def add_page_introductions_to_html_files():
    """为所有HTML文件添加页面介绍脚本"""
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 查找所有HTML文件
    html_files = list(current_dir.glob('*.html'))
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    # 需要跳过的文件（测试文件或特殊文件）
    skip_files = {
        'test-homepage-logos.html',
        'test-page-introductions.html',
        'debug-logo-simple.html',
        'debug-logo-issue.html',
        'simple-logo-test.html',
        'favicon-test.html',
        'debug-logos.html',
        'logo-test.html',
        'test-ai-models-logos.html'
    }
    
    processed_count = 0
    skipped_count = 0
    
    for html_file in html_files:
        filename = html_file.name
        
        # 跳过测试文件
        if filename in skip_files:
            print(f"跳过测试文件: {filename}")
            skipped_count += 1
            continue
            
        print(f"处理文件: {filename}")
        
        try:
            # 读取文件内容
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否已经包含页面介绍脚本
            if 'page-introductions.js' in content:
                print(f"  ✓ {filename} 已包含页面介绍脚本")
                skipped_count += 1
                continue
            
            # 查找插入位置（在</body>标签之前）
            body_end_pattern = r'(\s*</body>\s*</html>\s*)$'
            match = re.search(body_end_pattern, content, re.MULTILINE)
            
            if match:
                # 准备要插入的脚本标签
                script_tags = '''
    <!-- 引入页面介绍组件 -->
    <script src="page-introductions.js"></script>
    
'''
                
                # 替换</body>标签
                new_content = re.sub(body_end_pattern, script_tags + match.group(1), content)
                
                # 写回文件
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                print(f"  ✓ {filename} 已添加页面介绍脚本")
                processed_count += 1
            else:
                print(f"  ✗ {filename} 未找到</body>标签")
                skipped_count += 1
                
        except Exception as e:
            print(f"  ✗ 处理 {filename} 时出错: {e}")
            skipped_count += 1
    
    print(f"\n处理完成:")
    print(f"  成功处理: {processed_count} 个文件")
    print(f"  跳过文件: {skipped_count} 个文件")
    print(f"  总计文件: {len(html_files)} 个文件")

def update_page_introductions_js():
    """更新page-introductions.js文件，添加更多页面的介绍内容"""
    
    # 获取所有HTML文件名（排除测试文件）
    current_dir = Path('.')
    html_files = [f.stem for f in current_dir.glob('*.html') 
                  if not f.name.startswith('test-') 
                  and not f.name.startswith('debug-')
                  and not f.name.startswith('simple-')
                  and not f.name.startswith('favicon-')
                  and not f.name.startswith('logo-')]
    
    print(f"找到 {len(html_files)} 个主要HTML文件")
    
    # 读取现有的page-introductions.js文件
    try:
        with open('page-introductions.js', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("page-introductions.js 文件不存在")
        return
    
    # 检查哪些页面还没有介绍内容
    existing_pages = re.findall(r"'([^']+\.html)':", content)
    missing_pages = [f"{page}.html" for page in html_files if f"{page}.html" not in existing_pages]
    
    if not missing_pages:
        print("所有页面都已包含介绍内容")
        return
    
    print(f"需要添加介绍的页面: {missing_pages}")
    
    # 为缺失的页面生成默认介绍内容
    default_introductions = {}
    
    for page in missing_pages:
        page_name = page.replace('.html', '')
        
        # 根据页面名称生成相应的介绍内容
        if 'ai' in page_name.lower():
            if 'capabilities' in page_name.lower():
                title = 'AI能力展示'
                description = '展示各种AI技术的能力和应用场景'
            elif 'companies' in page_name.lower():
                title = 'AI公司导航'
                description = '收录主流AI公司和技术企业'
            elif 'overseas' in page_name.lower():
                title = '海外AI工具导航'
                description = '收录海外主流AI工具和平台'
            elif 'ranking' in page_name.lower():
                title = 'AI工具排行榜'
                description = 'AI工具排名和评测'
            elif 'hotspots' in page_name.lower():
                title = 'AI热点导航'
                description = 'AI行业热点和趋势'
            elif 'community' in page_name.lower():
                title = 'AI社区导航'
                description = 'AI技术社区和交流平台'
            elif 'links' in page_name.lower():
                title = 'AI链接导航'
                description = 'AI相关链接和资源'
            elif 'timer' in page_name.lower():
                title = 'AI计时器工具'
                description = 'AI辅助的时间管理工具'
            else:
                title = f'{page_name.upper()} - AI工具导航'
                description = f'{page_name}相关的AI工具和资源导航'
        elif 'social' in page_name.lower():
            title = '社交媒体工具导航'
            description = '社交媒体相关的工具和平台'
        elif 'seo' in page_name.lower():
            title = 'SEO工具导航'
            description = '搜索引擎优化相关工具'
        elif 'video' in page_name.lower():
            title = '视频制作工具导航'
            description = '视频制作和编辑工具'
        elif 'audio' in page_name.lower():
            title = '音频处理工具导航'
            description = '音频制作和处理工具'
        elif 'image' in page_name.lower() or 'img' in page_name.lower():
            title = '图片处理工具导航'
            description = '图片编辑和处理工具'
        elif 'music' in page_name.lower():
            title = '音乐制作工具导航'
            description = '音乐创作和制作工具'
        elif 'writing' in page_name.lower():
            title = '写作工具导航'
            description = '写作辅助和内容创作工具'
        elif 'coding' in page_name.lower():
            title = '编程工具导航'
            description = '编程和开发相关工具'
        elif 'designer' in page_name.lower():
            title = '设计师工具导航'
            description = '设计师常用工具和资源'
        elif 'game' in page_name.lower():
            title = '游戏工具导航'
            description = '游戏开发和游戏相关工具'
        elif 'prayer' in page_name.lower():
            title = '祈祷工具导航'
            description = '祈祷和宗教相关工具'
        elif 'lunch' in page_name.lower():
            title = '午餐推荐导航'
            description = '午餐选择和推荐工具'
        elif 'trends' in page_name.lower():
            title = '趋势分析工具导航'
            description = '趋势分析和预测工具'
        elif 'real-needs' in page_name.lower():
            title = '真实需求工具导航'
            description = '满足真实需求的工具和平台'
        elif 'xiaohongshu' in page_name.lower():
            title = '小红书工具导航'
            description = '小红书相关的工具和资源'
        elif 'words' in page_name.lower():
            title = '文字处理工具导航'
            description = '文字处理和文本分析工具'
        elif 'chuhai' in page_name.lower():
            title = '出海工具导航'
            description = '海外业务和出海相关工具'
        elif 'hanghai' in page_name.lower():
            title = '航海工具导航'
            description = '航海和船舶相关工具'
        elif 'sitemap' in page_name.lower():
            title = '网站地图导航'
            description = '网站地图和SEO相关工具'
        elif 'ads' in page_name.lower():
            title = '广告工具导航'
            description = '广告投放和营销工具'
        else:
            title = f'{page_name.upper()} - 工具导航'
            description = f'{page_name}相关的工具和资源导航'
        
        default_introductions[page] = {
            'title': title,
            'description': description,
            'features': [
                f'🔧 {title}的核心功能',
                f'📚 丰富的工具资源',
                f'💡 实用的使用技巧',
                f'🔄 持续更新维护',
                f'📱 支持多平台使用'
            ],
            'faq': [
                {
                    'question': f'如何使用{title}？',
                    'answer': f'浏览页面中的工具列表，点击感兴趣的工具链接即可访问。每个工具都有详细说明和使用指南。'
                },
                {
                    'question': f'{title}收录了多少个工具？',
                    'answer': '具体数量请查看页面内容，我们会持续更新和添加新的优质工具。'
                },
                {
                    'question': f'如何推荐新的工具到{title}？',
                    'answer': '如果您发现优秀的工具，欢迎通过社交媒体联系我们，我们会认真评估后添加到导航中。'
                },
                {
                    'question': f'{title}的工具都是免费的吗？',
                    'answer': '网站收录的工具包括免费和付费版本，具体费用请查看各工具的官方网站。'
                }
            ]
        }
    
    # 在content中找到introductions对象的位置
    introductions_start = content.find("this.introductions = {")
    if introductions_start == -1:
        print("未找到introductions对象")
        return
    
    # 找到introductions对象的结束位置
    brace_count = 0
    introductions_end = introductions_start
    
    for i in range(introductions_start, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                introductions_end = i
                break
    
    # 生成新的介绍内容
    new_introductions = []
    for page, intro in default_introductions.items():
        intro_str = f"""            '{page}': {{
                title: '{intro['title']}',
                description: '{intro['description']}',
                features: [
                    '{intro['features'][0]}',
                    '{intro['features'][1]}',
                    '{intro['features'][2]}',
                    '{intro['features'][3]}',
                    '{intro['features'][4]}'
                ],
                faq: [
                    {{
                        question: '{intro['faq'][0]['question']}',
                        answer: '{intro['faq'][0]['answer']}'
                    }},
                    {{
                        question: '{intro['faq'][1]['question']}',
                        answer: '{intro['faq'][1]['answer']}'
                    }},
                    {{
                        question: '{intro['faq'][2]['question']}',
                        answer: '{intro['faq'][2]['answer']}'
                    }},
                    {{
                        question: '{intro['faq'][3]['question']}',
                        answer: '{intro['faq'][3]['answer']}'
                    }}
                ]
            }}"""
        new_introductions.append(intro_str)
    
    # 插入新的介绍内容
    insert_position = introductions_end
    insert_content = ',\n' + ',\n'.join(new_introductions)
    
    new_content = content[:insert_position] + insert_content + content[insert_position:]
    
    # 写回文件
    with open('page-introductions.js', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"已为 {len(missing_pages)} 个页面添加介绍内容")

if __name__ == '__main__':
    print("开始为所有HTML页面添加页面介绍功能...")
    
    # 第一步：为所有HTML文件添加脚本引用
    print("\n1. 为HTML文件添加页面介绍脚本...")
    add_page_introductions_to_html_files()
    
    # 第二步：更新page-introductions.js文件
    print("\n2. 更新页面介绍内容...")
    update_page_introductions_js()
    
    print("\n完成！所有页面现在都包含页面介绍功能。")
