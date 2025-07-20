#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

def fix_domain():
    """修改所有HTML文件中的域名从seodog.cn到aiaiy.com"""
    
    # 获取所有HTML文件
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    for filename in html_files:
        print(f"正在处理: {filename}")
        
        # 读取文件
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换域名
        content = content.replace('seodog.cn', 'aiaiy.com')
        content = content.replace('www.seodog.cn', 'www.aiaiy.com')
        content = content.replace('contact@seodog.cn', 'contact@aiaiy.com')
        
        # 写回文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"完成处理: {filename}")
    
    print("所有域名修改完成！")

if __name__ == "__main__":
    fix_domain() 