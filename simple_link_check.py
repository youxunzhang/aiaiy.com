#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的链接检查工具
检查域名文件中的链接可访问性
"""

import os
import re
import urllib.request
import urllib.error
import socket
import time

def check_domain(domain):
    """检查单个域名的可访问性"""
    try:
        # 尝试连接域名
        socket.setdefaulttimeout(10)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((domain, 80))
        return True
    except:
        try:
            # 尝试HTTPS连接
            socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((domain, 443))
            return True
        except:
            return False

def extract_domains_from_file(file_path):
    """从文件中提取域名"""
    domains = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # 匹配域名模式
            domain_pattern = r'([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}'
            found_domains = re.findall(domain_pattern, content)
            for domain_tuple in found_domains:
                domain = domain_tuple[0]
                if domain and not domain.startswith('http'):
                    domains.append(domain)
    except Exception as e:
        print(f"读取文件时出错: {e}")
    return list(set(domains))  # 去重

def main():
    # 从文件读取域名
    file_path = r'c:\Users\YOUXUN\Desktop\我的域名 (2).txt'
    domains = extract_domains_from_file(file_path)
    
    print(f"从文件中提取到 {len(domains)} 个域名")
    
    accessible_domains = []
    inaccessible_domains = []
    
    print("开始检查域名可访问性...")
    for i, domain in enumerate(domains, 1):
        print(f"检查 {i}/{len(domains)}: {domain}")
        if check_domain(domain):
            accessible_domains.append(domain)
            print(f"  ✅ {domain} - 可访问")
        else:
            inaccessible_domains.append(domain)
            print(f"  ❌ {domain} - 不可访问")
        time.sleep(0.5)  # 避免请求过快
    
    print(f"\n检查完成!")
    print(f"可访问的域名: {len(accessible_domains)}")
    print(f"不可访问的域名: {len(inaccessible_domains)}")
    
    # 保存结果
    with open('accessible_domains.txt', 'w', encoding='utf-8') as f:
        for domain in accessible_domains:
            f.write(f"{domain}\n")
    
    with open('inaccessible_domains.txt', 'w', encoding='utf-8') as f:
        for domain in inaccessible_domains:
            f.write(f"{domain}\n")
    
    print(f"\n结果已保存到 accessible_domains.txt 和 inaccessible_domains.txt")
    
    return accessible_domains, inaccessible_domains

if __name__ == "__main__":
    main()
