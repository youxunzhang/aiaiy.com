#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为每个页面添加介绍内容
在页面尾部添加类似Gamestudio.online风格的介绍
"""

import os
import re
import glob

def get_page_introduction(page_name):
    """根据页面名称返回相应的介绍内容"""
    introductions = {
        'index': {
            'title': '欢迎来到AIAIY.COM：AI工具导航平台',
            'description': 'AI工具导航是一个聚合平台，提供各种优质的AI工具和服务。它通常包含以下功能：',
            'features': [
                '工具多样化：涵盖文本生成、图像处理、视频制作、数据分析等多种类型，满足不同用户的需求。',
                '免费试用：大部分工具提供免费试用功能，方便用户体验，节省成本。',
                '分类导航：按照功能类别清晰分类，用户可以快速找到所需的AI工具。',
                '持续更新：定期更新新工具，保持平台的新鲜和实用。'
            ],
            'conclusion': 'AI工具导航为用户提供便捷高效的AI工具发现和使用体验。'
        },
        'ai-capabilities': {
            'title': 'AI能为我们做什么：智能技术应用指南',
            'description': '人工智能技术正在改变我们的工作和生活方式，以下是AI在各个领域的应用：',
            'features': [
                '内容创作：自动生成文章、设计图像、制作视频，提升创作效率。',
                '数据分析：智能分析海量数据，提供洞察和预测，辅助决策。',
                '客户服务：24/7智能客服，快速响应用户需求，提升服务质量。',
                '教育培训：个性化学习路径，智能题库生成，提升学习效果。'
            ],
            'conclusion': 'AI技术为各行各业带来革命性变化，让我们一起探索AI的无限可能。'
        },
        'lunch-recommendations': {
            'title': '中午吃什么：营养午餐推荐指南',
            'description': '营养午餐推荐平台为您提供科学的饮食建议，帮助您做出健康的选择：',
            'features': [
                '营养均衡：根据营养学原理，推荐营养搭配合理的午餐选择。',
                '多样化选择：涵盖中式、西式、素食等多种风格，满足不同口味需求。',
                '健康指导：提供详细的营养成分分析，帮助了解食物的营养价值。',
                '实用建议：结合季节、身体状况等因素，给出个性化的饮食建议。'
            ],
            'conclusion': '科学饮食是健康生活的基础，让我们一起享受美味又营养的午餐时光。'
        },
        'ai-ranking': {
            'title': 'AI工具排行榜：权威评测与推荐',
            'description': 'AI工具排行榜基于用户评价、功能特色、使用体验等多维度进行综合评估：',
            'features': [
                '权威评测：基于真实用户反馈和专业评测，确保排名的客观公正。',
                '分类排行：按照不同功能类别进行细分排行，方便用户对比选择。',
                '详细分析：提供每个工具的优势特点、适用场景、价格信息等详细分析。',
                '实时更新：定期更新排行榜，反映最新的市场变化和用户需求。'
            ],
            'conclusion': '选择最适合的AI工具，让科技为您的效率提升助力。'
        },
        'ai-hotspots': {
            'title': 'AI热点资讯：行业动态与趋势分析',
            'description': 'AI热点资讯平台为您提供最新的人工智能行业动态和发展趋势：',
            'features': [
                '实时资讯：及时报道AI领域的最新动态、技术突破和行业新闻。',
                '深度分析：提供专业的趋势分析和市场洞察，帮助了解行业走向。',
                '技术前沿：关注最新的AI技术发展，包括算法创新、应用突破等。',
                '商业应用：展示AI技术在各行业的实际应用案例和成功经验。'
            ],
            'conclusion': '掌握AI发展趋势，把握未来机遇，在智能化时代保持竞争优势。'
        },
        'ai-overseas': {
            'title': 'AI出海指南：国际市场拓展策略',
            'description': 'AI出海平台为国内AI企业提供国际市场拓展的全面指导和支持：',
            'features': [
                '市场分析：深入分析海外AI市场环境、竞争格局和机会点。',
                '策略指导：提供针对性的出海策略建议，包括产品定位、营销推广等。',
                '资源对接：连接海外合作伙伴、投资机构和客户资源。',
                '合规支持：提供海外法律法规、数据保护等合规性指导。'
            ],
            'conclusion': '助力中国AI企业走向世界，在全球市场中展现中国AI的实力。'
        },
        'ai-ads': {
            'title': 'AI广告营销：智能营销解决方案',
            'description': 'AI广告营销平台利用人工智能技术，为企业提供精准高效的营销服务：',
            'features': [
                '精准投放：基于用户画像和行为分析，实现广告的精准定向投放。',
                '智能优化：自动优化广告创意、投放时间和预算分配，提升ROI。',
                '效果分析：提供详细的广告效果数据分析和优化建议。',
                '创意生成：AI辅助生成广告创意和文案，提升创意效率。'
            ],
            'conclusion': '让AI为您的营销赋能，实现更精准、更高效的广告投放效果。'
        },
        'trends': {
            'title': 'AI趋势洞察：未来发展方向预测',
            'description': 'AI趋势分析平台深度解读人工智能技术的发展趋势和未来走向：',
            'features': [
                '技术趋势：分析AI技术发展方向，预测未来技术突破点。',
                '应用趋势：研究AI在各行业的应用趋势，发现新的商业机会。',
                '投资趋势：跟踪AI领域的投资动态，了解资本关注重点。',
                '政策趋势：关注各国AI政策法规变化，把握政策导向。'
            ],
            'conclusion': '洞察AI发展趋势，提前布局未来，在智能化浪潮中抢占先机。'
        },
        'real-needs': {
            'title': '真实需求分析：用户痛点与解决方案',
            'description': '真实需求分析平台深入挖掘用户痛点，提供针对性的解决方案：',
            'features': [
                '需求调研：通过大数据分析和用户调研，发现真实的用户需求。',
                '痛点识别：精准识别用户在使用AI工具过程中的痛点和难点。',
                '解决方案：基于需求分析，提供个性化的解决方案和产品推荐。',
                '效果验证：跟踪解决方案的实施效果，持续优化和改进。'
            ],
            'conclusion': '以用户需求为导向，提供真正有价值的AI工具和服务。'
        },
        'play-game': {
            'title': 'AI游戏体验：智能游戏娱乐平台',
            'description': 'AI游戏平台融合人工智能技术，为用户提供全新的游戏体验：',
            'features': [
                '智能对手：AI驱动的游戏对手，提供挑战性的游戏体验。',
                '个性化推荐：根据用户喜好，推荐最适合的游戏内容。',
                '智能辅助：AI辅助功能，帮助玩家提升游戏技能和体验。',
                '社交互动：基于AI的社交功能，连接志同道合的游戏玩家。'
            ],
            'conclusion': '在AI的陪伴下，享受更加智能、有趣、个性化的游戏体验。'
        },
        'friendship-links': {
            'title': '友情链接：优质网站资源导航',
            'description': '友情链接平台汇聚各类优质网站资源，为用户提供便捷的导航服务：',
            'features': [
                '资源丰富：涵盖游戏娱乐、生活服务、知识文化等多个领域的优质网站。',
                '分类清晰：按照功能类别进行清晰分类，方便用户快速找到所需资源。',
                '质量保证：严格筛选合作伙伴，确保链接网站的质量和安全性。',
                '持续更新：定期更新链接资源，保持平台的活跃和实用。'
            ],
            'conclusion': '发现更多优质网站资源，拓展您的网络世界，享受更丰富的在线体验。'
        }
    }
    
    # 从文件名中提取页面类型
    for key in introductions:
        if key in page_name.lower():
            return introductions[key]
    
    # 默认介绍
    return {
        'title': f'欢迎来到{page_name}：专业服务平台',
        'description': f'{page_name}是一个专业的服务平台，为用户提供优质的服务体验：',
        'features': [
            '专业服务：提供专业、可靠的服务，满足用户的各种需求。',
            '用户友好：界面简洁易用，操作便捷，提升用户体验。',
            '持续改进：不断优化服务内容，提升服务质量。',
            '安全可靠：注重用户隐私保护，提供安全可靠的服务环境。'
        ],
        'conclusion': f'选择{page_name}，享受专业、便捷、安全的服务体验。'
    }

def add_introduction_to_page(file_path):
    """为页面添加介绍内容"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经有介绍内容
        if '<!-- 页面介绍开始 -->' in content:
            print(f"跳过 {file_path} - 已有介绍内容")
            return
        
        # 获取页面名称
        page_name = os.path.splitext(os.path.basename(file_path))[0]
        intro = get_page_introduction(page_name)
        
        # 创建介绍HTML内容
        introduction_html = f'''
        <!-- 页面介绍开始 -->
        <section class="page-introduction bg-gradient-to-br from-blue-50 to-indigo-100 py-16 mt-16">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold text-gray-900 mb-6">{intro['title']}</h2>
                    <p class="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">{intro['description']}</p>
                </div>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
'''
        
        for i, feature in enumerate(intro['features']):
            introduction_html += f'''
                    <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="text-3xl mb-4">{"🔍📊💡🚀"[i % 4]}</div>
                        <p class="text-gray-700 leading-relaxed">{feature}</p>
                    </div>'''
        
        introduction_html += f'''
                </div>
                
                <div class="text-center">
                    <p class="text-lg text-gray-700 font-medium mb-6">{intro['conclusion']}</p>
                    <div class="flex justify-center space-x-4">
                        <a href="index.html" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            返回首页
                        </a>
                        <a href="ai-capabilities.html" class="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            了解更多
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <!-- 页面介绍结束 -->
'''
        
        # 在</body>标签前插入介绍内容
        if '</body>' in content:
            content = content.replace('</body>', introduction_html + '\n    </body>')
        else:
            # 如果没有</body>标签，在文件末尾添加
            content += introduction_html
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ 已为 {file_path} 添加介绍内容")
        
    except Exception as e:
        print(f"✗ 处理 {file_path} 时出错: {str(e)}")

def main():
    """主函数"""
    print("开始为页面添加介绍内容...")
    
    # 获取所有HTML文件
    html_files = glob.glob("*.html")
    
    # 过滤掉一些不需要添加介绍的文件
    exclude_files = ['index-bilingual.html', 'index-en.html']  # 多语言版本
    html_files = [f for f in html_files if f not in exclude_files]
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    # 为每个文件添加介绍
    for html_file in html_files:
        add_introduction_to_page(html_file)
    
    print("\n完成！所有页面已添加介绍内容。")

if __name__ == "__main__":
    main()
