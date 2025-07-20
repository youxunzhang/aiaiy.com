#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

def fix_all_issues():
    """综合修复所有问题"""
    
    # 获取所有HTML文件
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        print(f"正在处理: {filename}")
        
        # 读取文件
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 1. 修复乱码字符
        replacements = {
            '大模?': '大模型',
            '全球趋势与热度分?': '全球趋势与热度分析',
            '网页历史快照与归?': '网页历史快照与归档',
            '网站SEO与流量分析工?': '网站SEO与流量分析工具',
            '出海板块 - 市场与数据分?': '出海板块 - 市场与数据分析',
            '网站流量与数据分析平?': '网站流量与数据分析平台',
            '网站变现与广告平?': '网站变现与广告平台',
            '网站流量分析与竞争对手研究平?': '网站流量分析与竞争对手研究平台',
            '提升开发效?': '提升开发效率',
            '为您的网站保驾护?': '为您的网站保驾护航',
            '简化您的在线业?': '简化您的在线业务',
            '提升您的工作效?': '提升您的工作效率',
            '联系我?wx': '联系我：wx',
            'AI设计?': 'AI设计师',
            'AI数字?': 'AI数字人',
            'AI提示?': 'AI提示词',
            'AI智能?': 'AI智能体',
            'AI计时?': 'AI计时器',
            '智能体创建平?': '智能体创建平台',
            '免费图片素材?': '免费图片素材库',
            '高质量图片素?': '高质量图片素材',
            'AI代码编辑?': 'AI代码编辑器',
            '专业代码编辑?': '专业代码编辑器',
            '单页网站构建?': '单页网站构建器',
            'AI工具排行?': 'AI工具排行榜',
            '全球最大开源协作平?': '全球最大开源协作平台'
        }
        
        # 执行乱码修复
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # 2. 修改域名从seodog.cn到aiaiy.com
        content = content.replace('seodog.cn', 'aiaiy.com')
        content = content.replace('www.seodog.cn', 'www.aiaiy.com')
        
        # 3. 统一导航栏（使用首页的导航栏）
        home_nav = '''                <div class="hidden md:flex items-center space-x-4 desktop-menu">
                    <a href="https://www.aiaiy.com" class="text-blue-600 hover:underline text-sm font-semibold">首页</a>
                    <a href="chuhai.html" class="text-blue-600 hover:underline text-sm font-semibold">AI出海</a>
                    <a href="game.html" class="text-blue-600 hover:underline text-sm font-semibold">游戏</a>
                    <a href="hanghai.html" class="text-blue-600 hover:underline text-sm font-semibold">AI web航海</a>
                    <a href="words.html" class="text-blue-600 hover:underline text-sm font-semibold">AI文字</a>
                    <a href="img.html" class="text-blue-600 hover:underline text-sm font-semibold">AI图片</a>
                    <a href="music.html" class="text-blue-600 hover:underline text-sm font-semibold">AI音乐</a>
                    <a href="designer.html" class="text-blue-600 hover:underline text-sm font-semibold">AI设计师</a>
                    <a href="ainum.html" class="text-blue-600 hover:underline text-sm font-semibold">AI数字人</a>
                    <a href="aiprompt.html" class="text-blue-600 hover:underline text-sm font-semibold">AI提示词</a>
                    <a href="ailearn.html" class="text-blue-600 hover:underline text-sm font-semibold">AI学习</a>
                    <a href="aioffice.html" class="text-blue-600 hover:underline text-sm font-semibold">AI办公</a>
                    <a href="aiagent.html" class="text-blue-600 hover:underline text-sm font-semibold">AI智能体</a>
                    <a href="aicontent.html" class="text-blue-600 hover:underline text-sm font-semibold">AI内容</a>
                    <a href="aitimer.html" class="text-blue-600 hover:underline text-sm font-semibold">AI计时器</a>
                    <a href="aicommunity.html" class="text-blue-600 hover:underline text-sm font-semibold">AI社群</a>
                    <a href="social.html" class="text-blue-600 hover:underline text-sm font-semibold">社交媒体</a>
                    <a href="xiaohongshu.html" class="text-blue-600 hover:underline text-sm font-semibold">小红书</a>
                    <a href="ailinks.html" class="text-blue-600 hover:underline text-sm font-semibold">AI外链</a>
                    <a href="seo.html" class="text-blue-600 hover:underline text-sm font-semibold">SEO工具</a>
                    <a href="sitemap.html" class="text-blue-600 hover:underline text-sm font-semibold">网站地图</a>
                </div>'''
        
        # 查找并替换导航栏
        nav_pattern = r'<div class="hidden md:flex items-center space-x-4 desktop-menu">.*?</div>'
        content = re.sub(nav_pattern, home_nav, content, flags=re.DOTALL)
        
        # 4. 优化SEO - 添加更多meta标签
        if filename == 'index.html':
            # 为首页添加更多SEO优化
            seo_meta = '''
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">
    <meta name="author" content="AI工具导航">
    <meta name="copyright" content="AI工具导航">
    <meta name="language" content="zh-CN">
    <meta name="revisit-after" content="7 days">
    <meta name="distribution" content="global">
    <meta name="rating" content="general">
    <meta name="theme-color" content="#3B82F6">
    <meta name="msapplication-TileColor" content="#3B82F6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="AI工具导航">
    <meta name="application-name" content="AI工具导航">
    <meta name="msapplication-TileImage" content="/favicon-144x144.png">
    <meta name="msapplication-config" content="/browserconfig.xml">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3B82F6">
    <meta name="msapplication-TileColor" content="#3B82F6">
    <meta name="theme-color" content="#3B82F6">'''
            
            # 在head标签中添加SEO meta
            content = content.replace('<meta name="theme-color" content="#3B82F6">', seo_meta)
        
        # 写回文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"完成处理: {filename}")
    
    print("所有文件处理完成！")

if __name__ == "__main__":
    fix_all_issues() 