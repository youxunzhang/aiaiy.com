#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import os

def extract_links_from_html(html_file):
    """从HTML文件中提取所有链接"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取所有href链接
    link_pattern = r'href="(https://[^"]+)"'
    links = re.findall(link_pattern, content)
    
    # 提取域名和描述
    link_info = []
    for link in links:
        domain = link.replace('https://', '').replace('http://', '')
        # 从HTML中提取对应的描述
        desc_pattern = rf'href="{re.escape(link)}"[^>]*>.*?<div[^>]*>([^<]+)</div>'
        desc_match = re.search(desc_pattern, content, re.DOTALL)
        description = desc_match.group(1) if desc_match else domain
        
        link_info.append({
            'url': link,
            'domain': domain,
            'description': description
        })
    
    return link_info

def create_google_index_page(links):
    """创建谷歌收录检查页面"""
    html_content = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>友情链接谷歌收录检查 - AI工具导航</title>
    <meta name="description" content="检查友情链接的谷歌收录情况，快速了解网站SEO表现。">
    <meta name="keywords" content="友情链接,谷歌收录,SEO检查,网站优化">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --primary-blue: #2563EB;
            --primary-indigo: #4F46E5;
            --primary-purple: #7C3AED;
            --primary-pink: #EC4899;
            --primary-rose: #F43F5E;
            --primary-orange: #F97316;
            --primary-amber: #F59E0B;
            --primary-yellow: #EAB308;
            --primary-lime: #84CC16;
            --primary-green: #22C55E;
            --primary-emerald: #10B981;
            --primary-teal: #14B8A6;
            --primary-cyan: #06B6D4;
            --primary-sky: #0EA5E9;
            --gray-50: #F9FAFB;
            --gray-100: #F3F4F6;
            --gray-200: #E5E7EB;
            --gray-300: #D1D5DB;
            --gray-400: #9CA3AF;
            --gray-500: #6B7280;
            --gray-600: #4B5563;
            --gray-700: #374151;
            --gray-800: #1F2937;
            --gray-900: #111827;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
            background: #FAFAFA;
            color: var(--gray-900);
            line-height: 1.6;
            min-height: 100vh;
        }
        
        .modern-card {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
        }
        
        .link-item:hover {
            background: #F3F4F6;
            border-color: #D1D5DB;
            transform: translateY(-1px);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #2563EB, #7C3AED);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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
        }
        
        .back-button {
            background: #FFFFFF;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            transition: all 0.2s ease;
            color: #374151;
            font-weight: 500;
        }
        
        .back-button:hover {
            background: #F9FAFB;
            border-color: #D1D5DB;
            transform: translateX(-2px);
        }
        
        .google-search-btn {
            background: #4285F4;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .google-search-btn:hover {
            background: #3367D6;
            transform: translateY(-1px);
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
        }
        
        .animate-stagger {
            animation-delay: calc(var(--stagger-index) * 0.1s);
        }
    </style>
</head>
<body>
    <div class="min-h-screen py-8 px-4">
        <div class="max-w-7xl mx-auto">
            <!-- 头部导航 -->
            <div class="flex items-center justify-between mb-8 animate-fade-in">
                <a href="index.html" class="back-button flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    <span>返回首页</span>
                </a>
                <div class="text-center">
                    <h1 class="text-4xl font-bold gradient-text mb-2">谷歌收录检查</h1>
                    <p class="text-gray-600 text-lg">检查友情链接的谷歌收录情况</p>
                </div>
                <div class="w-32"></div>
            </div>

            <!-- 统计信息 -->
            <div class="stats-card mb-8 animate-fade-in">
                <div class="flex flex-wrap justify-center gap-8 text-center">
                    <div>
                        <div class="text-4xl font-bold mb-1">''' + str(len(links)) + '''</div>
                        <div class="text-blue-100">总链接数</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold mb-1">100%</div>
                        <div class="text-blue-100">可检查</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold mb-1">实时</div>
                        <div class="text-blue-100">数据更新</div>
                    </div>
                </div>
            </div>

            <!-- 友情链接网格 -->
            <div class="link-grid">'''

    # 按域名分组
    categories = {}
    for link in links:
        domain = link['domain']
        category = get_category_from_domain(domain)
        if category not in categories:
            categories[category] = []
        categories[category].append(link)
    
    # 生成分类内容
    category_icons = {
        '游戏娱乐': '🎮',
        '生活服务': '🏠', 
        '知识文化': '📚',
        '健康养生': '💪',
        '时尚购物': '🛍️',
        '实用工具': '🛠️',
        '金融服务': '💰',
        '创意设计': '🎨',
        '时间管理': '⏰',
        '食品饮料': '🍽️',
        '园艺种植': '🌱',
        '其他服务': '🔧',
        '音乐娱乐': '🎵',
        '健康养生扩展': '💪'
    }
    
    category_colors = {
        '游戏娱乐': 'bg-blue-100 text-blue-800',
        '生活服务': 'bg-green-100 text-green-800',
        '知识文化': 'bg-purple-100 text-purple-800',
        '健康养生': 'bg-red-100 text-red-800',
        '时尚购物': 'bg-pink-100 text-pink-800',
        '实用工具': 'bg-yellow-100 text-yellow-800',
        '金融服务': 'bg-emerald-100 text-emerald-800',
        '创意设计': 'bg-indigo-100 text-indigo-800',
        '时间管理': 'bg-cyan-100 text-cyan-800',
        '食品饮料': 'bg-orange-100 text-orange-800',
        '园艺种植': 'bg-lime-100 text-lime-800',
        '其他服务': 'bg-gray-100 text-gray-800',
        '音乐娱乐': 'bg-violet-100 text-violet-800',
        '健康养生扩展': 'bg-red-100 text-red-800'
    }
    
    for i, (category, category_links) in enumerate(categories.items(), 1):
        icon = category_icons.get(category, '🔗')
        color = category_colors.get(category, 'bg-gray-100 text-gray-800')
        
        html_content += f'''
                <!-- {category} -->
                <div class="modern-card p-6 animate-fade-in" style="--stagger-index: {i}">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-bold text-gray-900">{icon} {category}</h3>
                        <span class="category-badge {color}">{category[:2]}</span>
                    </div>
                    <div class="space-y-3">'''
        
        for link in category_links:
            google_search_url = f"https://www.google.com/search?q=site:{link['domain']}"
            html_content += f'''
                        <div class="link-item block p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <div class="font-semibold text-gray-900 mb-1">{link['domain']}</div>
                                    <div class="text-sm text-gray-600">{link['description']}</div>
                                </div>
                                <div class="flex space-x-2">
                                    <a href="{link['url']}" target="_blank" rel="noopener noreferrer" class="google-search-btn">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        访问
                                    </a>
                                    <a href="{google_search_url}" target="_blank" rel="noopener noreferrer" class="google-search-btn">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                        </svg>
                                        收录
                                    </a>
                                </div>
                            </div>
                        </div>'''
        
        html_content += '''
                    </div>
                </div>'''

    html_content += '''
            </div>

            <!-- 底部信息 -->
            <div class="modern-card p-8 mt-8 text-center animate-fade-in">
                <p class="text-gray-600 mb-6 text-lg">点击"收录"按钮查看谷歌收录情况</p>
                <div class="flex justify-center space-x-6">
                    <a href="index.html" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">返回首页</a>
                    <a href="friendship-links.html" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">友情链接</a>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 添加点击统计
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', function() {
                console.log('点击链接:', this.href);
            });
        });

        // 添加页面加载动画
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    </script>
</body>
</html>'''

    return html_content

def get_category_from_domain(domain):
    """根据域名判断分类"""
    domain_lower = domain.lower()
    
    # 游戏娱乐类
    if any(keyword in domain_lower for keyword in ['game', 'pokee', 'zmr', 'crossword', 'fruitconnect', 'magiccube', 'hotspotgame']):
        return '游戏娱乐'
    
    # 生活服务类
    elif any(keyword in domain_lower for keyword in ['xingxingren', 'airconditioner', 'tvrepair', 'suitcase', 'chongdianzhan', 'kuaididelevery', 'waimaiai']):
        return '生活服务'
    
    # 知识文化类
    elif any(keyword in domain_lower for keyword in ['tushuguan', 'citylibrary', 'zhuangzi', 'zengguofan', 'zhiyu', 'taoteching', 'chinesecharacters', 'traditionalchinesemedicine']):
        return '知识文化'
    
    # 健康养生类
    elif any(keyword in domain_lower for keyword in ['baduanjin', 'zhanzhuang', 'jinganggong', 'chinaspa', 'kongfutime', 'babujinganggong']):
        return '健康养生'
    
    # 时尚购物类
    elif any(keyword in domain_lower for keyword in ['watchbrands', 'rollingsuitcase', 'roujiamodaizi', 'phonecar']):
        return '时尚购物'
    
    # 实用工具类
    elif any(keyword in domain_lower for keyword in ['aiwebsiteprompt', 'picturesize', 'postcode', 'webintimer', 'veimg', 'randomfunction', 'countdown', 'topicture']):
        return '实用工具'
    
    # 金融服务类
    elif any(keyword in domain_lower for keyword in ['yinhangka']):
        return '金融服务'
    
    # 创意设计类
    elif any(keyword in domain_lower for keyword in ['dreamlist', 'youxistudio', 'aiagentbox']):
        return '创意设计'
    
    # 时间管理类
    elif any(keyword in domain_lower for keyword in ['shijian1']):
        return '时间管理'
    
    # 食品饮料类
    elif any(keyword in domain_lower for keyword in ['foodpairing', 'mollytea', 'wahaha']):
        return '食品饮料'
    
    # 园艺种植类
    elif any(keyword in domain_lower for keyword in ['growgarden']):
        return '园艺种植'
    
    # 音乐娱乐类
    elif any(keyword in domain_lower for keyword in ['yinyuejia', 'bgmme', 'obgm']):
        return '音乐娱乐'
    
    # 其他服务类
    else:
        return '其他服务'

def main():
    """主函数"""
    # 从friendship-links.html提取链接
    links = extract_links_from_html('friendship-links.html')
    
    # 创建谷歌收录检查页面
    html_content = create_google_index_page(links)
    
    # 保存到文件
    with open('google-index-check.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"成功创建谷歌收录检查页面: google-index-check.html")
    print(f"共处理 {len(links)} 个链接")

if __name__ == "__main__":
    main()

