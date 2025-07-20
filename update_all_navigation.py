#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

def update_all_navigation():
    """统一所有子页面的导航栏为首页导航栏"""
    
    # 首页的导航栏模板
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
                    <a href="index-en.html" class="text-red-600 hover:underline text-sm font-semibold">English</a>
                </div>'''
    
    # 移动端导航栏模板
    mobile_nav = '''                <div class="md:hidden">
                    <a href="https://www.aiaiy.com" onclick="closeMobileMenu()">首页</a>
                    <a href="chuhai.html" onclick="closeMobileMenu()">AI出海</a>
                    <a href="game.html" onclick="closeMobileMenu()">游戏</a>
                    <a href="hanghai.html" onclick="closeMobileMenu()">AI web航海</a>
                    <a href="words.html" onclick="closeMobileMenu()">AI文字</a>
                    <a href="img.html" onclick="closeMobileMenu()">AI图片</a>
                    <a href="music.html" onclick="closeMobileMenu()">AI音乐</a>
                    <a href="designer.html" onclick="closeMobileMenu()">AI设计师</a>
                    <a href="ainum.html" onclick="closeMobileMenu()">AI数字人</a>
                    <a href="aiprompt.html" onclick="closeMobileMenu()">AI提示词</a>
                    <a href="ailearn.html" onclick="closeMobileMenu()">AI学习</a>
                    <a href="aioffice.html" onclick="closeMobileMenu()">AI办公</a>
                    <a href="aiagent.html" onclick="closeMobileMenu()">AI智能体</a>
                    <a href="aicontent.html" onclick="closeMobileMenu()">AI内容</a>
                    <a href="aitimer.html" onclick="closeMobileMenu()">AI计时器</a>
                    <a href="aicommunity.html" onclick="closeMobileMenu()">AI社群</a>
                    <a href="social.html" onclick="closeMobileMenu()">社交媒体</a>
                    <a href="xiaohongshu.html" onclick="closeMobileMenu()">小红书</a>
                    <a href="ailinks.html" onclick="closeMobileMenu()">AI外链</a>
                    <a href="seo.html" onclick="closeMobileMenu()">SEO工具</a>
                    <a href="sitemap.html" onclick="closeMobileMenu()">网站地图</a>
                    <a href="index-en.html" onclick="closeMobileMenu()">English</a>
                </div>'''
    
    # 获取所有HTML文件（除了首页和英文首页）
    html_files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ['index.html', 'index-en.html']]
    
    for filename in html_files:
        print(f"正在处理: {filename}")
        
        # 读取文件
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换桌面端导航栏
        desktop_pattern = r'<div class="hidden md:flex items-center space-x-4 desktop-menu">.*?</div>'
        content = re.sub(desktop_pattern, home_nav, content, flags=re.DOTALL)
        
        # 替换移动端导航栏
        mobile_pattern = r'<div class="md:hidden">.*?</div>'
        content = re.sub(mobile_pattern, mobile_nav, content, flags=re.DOTALL)
        
        # 写回文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"完成处理: {filename}")
    
    print("所有导航栏更新完成！")

if __name__ == "__main__":
    update_all_navigation() 