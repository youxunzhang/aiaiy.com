#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为所有页面添加静态图标脚本引用
"""

import os
import re
import glob

def add_static_icons_script(file_path):
    """为页面添加静态图标脚本引用"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已经有静态图标脚本
        if 'static-icons.js' in content:
            print(f"跳过 {file_path} - 已有静态图标脚本")
            return
        
        # 检查是否有logo-fetcher.js，如果有则替换
        if 'logo-fetcher.js' in content:
            content = content.replace('logo-fetcher.js', 'static-icons.js')
            print(f"✓ 已替换 {file_path} 的图标脚本")
        else:
            # 在</body>标签前添加脚本引用
            script_tag = '    <!-- 引入静态图标管理脚本 -->\n    <script src="static-icons.js"></script>'
            
            if '</body>' in content:
                content = content.replace('</body>', script_tag + '\n</body>')
            else:
                content += '\n' + script_tag
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ 已为 {file_path} 添加静态图标脚本")
        
    except Exception as e:
        print(f"✗ 处理 {file_path} 时出错: {str(e)}")

def main():
    """主函数"""
    print("开始为所有页面添加静态图标脚本...")
    
    # 获取所有HTML文件
    html_files = glob.glob("*.html")
    
    # 过滤掉一些不需要处理的文件
    exclude_files = ['index-bilingual.html', 'index-en.html']
    html_files = [f for f in html_files if f not in exclude_files]
    
    print(f"处理 {len(html_files)} 个HTML文件")
    
    # 为每个文件添加静态图标脚本
    for html_file in html_files:
        add_static_icons_script(html_file)
    
    print("\n完成！所有页面已添加静态图标脚本。")

if __name__ == "__main__":
    main()
