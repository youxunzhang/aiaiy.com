#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
网站链接检查工具
检查所有HTML文件中的外部链接可访问性
"""

import os
import re
import requests
import time
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import json

class LinkChecker:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.timeout = 10
        self.results = {
            'accessible': [],
            'inaccessible': [],
            'errors': []
        }
        
    def extract_links_from_html(self, file_path):
        """从HTML文件中提取所有外部链接"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 匹配href属性中的链接
            href_pattern = r'href=["\'](https?://[^"\']+)["\']'
            href_links = re.findall(href_pattern, content)
            
            # 匹配src属性中的链接
            src_pattern = r'src=["\'](https?://[^"\']+)["\']'
            src_links = re.findall(src_pattern, content)
            
            all_links = list(set(href_links + src_links))
            return all_links
        except Exception as e:
            print(f"读取文件 {file_path} 时出错: {e}")
            return []
    
    def check_link(self, url):
        """检查单个链接的可访问性"""
        try:
            response = self.session.head(url, timeout=self.timeout, allow_redirects=True)
            if response.status_code < 400:
                return {'url': url, 'status': 'accessible', 'code': response.status_code}
            else:
                return {'url': url, 'status': 'inaccessible', 'code': response.status_code}
        except requests.exceptions.RequestException as e:
            return {'url': url, 'status': 'error', 'error': str(e)}
    
    def check_all_links(self, directory='.'):
        """检查目录中所有HTML文件的链接"""
        html_files = []
        
        # 查找所有HTML文件
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.html'):
                    html_files.append(os.path.join(root, file))
        
        print(f"找到 {len(html_files)} 个HTML文件")
        
        all_links = set()
        file_links = {}
        
        # 提取所有链接
        for file_path in html_files:
            links = self.extract_links_from_html(file_path)
            file_links[file_path] = links
            all_links.update(links)
        
        print(f"找到 {len(all_links)} 个唯一的外部链接")
        
        # 检查链接可访问性
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(self.check_link, url): url for url in all_links}
            
            for future in as_completed(future_to_url):
                result = future.result()
                if result['status'] == 'accessible':
                    self.results['accessible'].append(result)
                elif result['status'] == 'inaccessible':
                    self.results['inaccessible'].append(result)
                else:
                    self.results['errors'].append(result)
        
        # 生成报告
        self.generate_report(file_links)
        
    def generate_report(self, file_links):
        """生成检查报告"""
        print("\n" + "="*60)
        print("链接检查报告")
        print("="*60)
        
        print(f"\n✅ 可访问的链接 ({len(self.results['accessible'])}):")
        for link in self.results['accessible']:
            print(f"  - {link['url']} (状态码: {link['code']})")
        
        print(f"\n❌ 不可访问的链接 ({len(self.results['inaccessible'])}):")
        for link in self.results['inaccessible']:
            print(f"  - {link['url']} (状态码: {link['code']})")
        
        print(f"\n⚠️  检查出错的链接 ({len(self.results['errors'])}):")
        for link in self.results['errors']:
            print(f"  - {link['url']} (错误: {link['error']})")
        
        # 保存详细报告
        report_data = {
            'summary': {
                'total_links': len(self.results['accessible']) + len(self.results['inaccessible']) + len(self.results['errors']),
                'accessible': len(self.results['accessible']),
                'inaccessible': len(self.results['inaccessible']),
                'errors': len(self.results['errors'])
            },
            'file_links': file_links,
            'results': self.results
        }
        
        with open('link_check_report.json', 'w', encoding='utf-8') as f:
            json.dump(report_data, f, ensure_ascii=False, indent=2)
        
        print(f"\n📄 详细报告已保存到: link_check_report.json")
        
        # 生成需要修复的链接列表
        broken_links = [link['url'] for link in self.results['inaccessible'] + self.results['errors']]
        if broken_links:
            print(f"\n🔧 需要修复的链接:")
            for link in broken_links:
                print(f"  - {link}")
            
            # 保存需要修复的链接
            with open('broken_links.txt', 'w', encoding='utf-8') as f:
                for link in broken_links:
                    f.write(f"{link}\n")
            print(f"\n📝 需要修复的链接已保存到: broken_links.txt")

def main():
    checker = LinkChecker()
    print("开始检查网站链接...")
    checker.check_all_links()
    print("\n检查完成!")

if __name__ == "__main__":
    main()
