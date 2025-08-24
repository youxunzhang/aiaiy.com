#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复网站SEO问题
1. 统一规范标记指向正确的域名
2. 修复重复内容问题
3. 优化页面结构
"""

import os
import re
from pathlib import Path

def fix_canonical_tags():
    """修复所有页面的规范标记"""
    
    # 获取当前目录
    current_dir = Path('.')
    
    # 查找所有HTML文件
    html_files = list(current_dir.glob('*.html'))
    
    print(f"找到 {len(html_files)} 个HTML文件")
    
    # 需要跳过的文件（测试文件）
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
            
            # 确定正确的规范URL
            if filename == 'index.html':
                canonical_url = 'https://www.aiaiy.com/'
            elif filename == 'index-en.html':
                canonical_url = 'https://www.aiaiy.com/en/'
            elif filename == 'index-bilingual.html':
                canonical_url = 'https://www.aiaiy.com/bilingual/'
            else:
                # 其他页面
                page_name = filename.replace('.html', '')
                canonical_url = f'https://www.aiaiy.com/{page_name}/'
            
            # 查找并替换现有的规范标记
            old_canonical_pattern = r'<link rel="canonical" href="[^"]*">'
            new_canonical_tag = f'<link rel="canonical" href="{canonical_url}">'
            
            if re.search(old_canonical_pattern, content):
                # 替换现有的规范标记
                content = re.sub(old_canonical_pattern, new_canonical_tag, content)
                print(f"  ✓ 更新规范标记: {canonical_url}")
            else:
                # 在head标签中添加规范标记
                head_pattern = r'(<head[^>]*>)'
                head_match = re.search(head_pattern, content, re.IGNORECASE)
                if head_match:
                    head_start = head_match.end()
                    content = content[:head_start] + f'\n    {new_canonical_tag}' + content[head_start:]
                    print(f"  ✓ 添加规范标记: {canonical_url}")
                else:
                    print(f"  ✗ 未找到head标签")
                    skipped_count += 1
                    continue
            
            # 更新meta标签中的URL
            # 更新og:url
            og_url_pattern = r'<meta property="og:url" content="[^"]*">'
            new_og_url = f'<meta property="og:url" content="{canonical_url}">'
            if re.search(og_url_pattern, content):
                content = re.sub(og_url_pattern, new_og_url, content)
                print(f"  ✓ 更新og:url")
            
            # 更新twitter:url
            twitter_url_pattern = r'<meta name="twitter:url" content="[^"]*">'
            new_twitter_url = f'<meta name="twitter:url" content="{canonical_url}">'
            if re.search(twitter_url_pattern, content):
                content = re.sub(twitter_url_pattern, new_twitter_url, content)
                print(f"  ✓ 更新twitter:url")
            
            # 更新JSON-LD中的URL
            json_ld_url_pattern = r'"url":\s*"[^"]*"'
            new_json_ld_url = f'"url": "{canonical_url}"'
            if re.search(json_ld_url_pattern, content):
                content = re.sub(json_ld_url_pattern, new_json_ld_url, content)
                print(f"  ✓ 更新JSON-LD URL")
            
            # 写回文件
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            processed_count += 1
                
        except Exception as e:
            print(f"  ✗ 处理 {filename} 时出错: {e}")
            skipped_count += 1
    
    print(f"\n规范标记修复完成:")
    print(f"  成功处理: {processed_count} 个文件")
    print(f"  跳过文件: {skipped_count} 个文件")

def add_meta_robots_tags():
    """为所有页面添加meta robots标签"""
    
    current_dir = Path('.')
    html_files = list(current_dir.glob('*.html'))
    
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
    
    for html_file in html_files:
        filename = html_file.name
        
        if filename in skip_files:
            continue
            
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查是否已有robots标签
            if 'name="robots"' in content:
                continue
            
            # 在head标签中添加robots标签
            head_pattern = r'(<head[^>]*>)'
            head_match = re.search(head_pattern, content, re.IGNORECASE)
            if head_match:
                head_start = head_match.end()
                robots_tag = '\n    <meta name="robots" content="index, follow">'
                content = content[:head_start] + robots_tag + content[head_start:]
                
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                processed_count += 1
                
        except Exception as e:
            print(f"处理 {filename} 时出错: {e}")
    
    print(f"添加robots标签完成: {processed_count} 个文件")

def optimize_page_structure():
    """优化页面结构，减少重复内容"""
    
    # 检查index.html和index-bilingual.html的重复内容
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            index_content = f.read()
        
        with open('index-bilingual.html', 'r', encoding='utf-8') as f:
            bilingual_content = f.read()
        
        # 如果两个页面内容相似，建议合并或明确区分
        if len(index_content) > 0 and len(bilingual_content) > 0:
            print("检测到index.html和index-bilingual.html可能存在重复内容")
            print("建议:")
            print("1. 确保两个页面有明显不同的内容")
            print("2. 使用正确的规范标记指向主要版本")
            print("3. 考虑使用hreflang标签区分语言版本")
    
    except Exception as e:
        print(f"检查页面结构时出错: {e}")

def create_sitemap():
    """创建或更新sitemap.xml"""
    
    current_dir = Path('.')
    html_files = [f.name for f in current_dir.glob('*.html') 
                  if not f.name.startswith('test-') 
                  and not f.name.startswith('debug-')
                  and not f.name.startswith('simple-')
                  and not f.name.startswith('favicon-')
                  and not f.name.startswith('logo-')]
    
    sitemap_content = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'''
    
    for html_file in html_files:
        page_name = html_file.replace('.html', '')
        
        if page_name == 'index':
            url = 'https://www.aiaiy.com/'
        elif page_name == 'index-en':
            url = 'https://www.aiaiy.com/en/'
        elif page_name == 'index-bilingual':
            url = 'https://www.aiaiy.com/bilingual/'
        else:
            url = f'https://www.aiaiy.com/{page_name}/'
        
        sitemap_content += f'''  <url>
    <loc>{url}</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
'''
    
    sitemap_content += '</urlset>'
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap_content)
    
    print("已创建sitemap.xml")

def create_robots_txt():
    """创建或更新robots.txt"""
    
    robots_content = '''User-agent: *
Allow: /

# 禁止访问测试文件
Disallow: /test-*.html
Disallow: /debug-*.html
Disallow: /simple-*.html
Disallow: /favicon-*.html
Disallow: /logo-*.html

# Sitemap
Sitemap: https://www.aiaiy.com/sitemap.xml
'''
    
    with open('robots.txt', 'w', encoding='utf-8') as f:
        f.write(robots_content)
    
    print("已创建robots.txt")

if __name__ == '__main__':
    print("开始修复SEO问题...")
    
    print("\n1. 修复规范标记...")
    fix_canonical_tags()
    
    print("\n2. 添加robots标签...")
    add_meta_robots_tags()
    
    print("\n3. 优化页面结构...")
    optimize_page_structure()
    
    print("\n4. 创建sitemap.xml...")
    create_sitemap()
    
    print("\n5. 创建robots.txt...")
    create_robots_txt()
    
    print("\nSEO问题修复完成！")
    print("\n建议后续操作:")
    print("1. 在Google Search Console中重新提交sitemap.xml")
    print("2. 请求重新抓取受影响的页面")
    print("3. 确保所有页面都有独特的内容")
    print("4. 检查并移除不必要的重定向")
