#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量获取favicon工具
用于获取网站favicon并生成静态资源
"""

import os
import requests
import json
import time
from urllib.parse import urlparse
from pathlib import Path
import base64
from PIL import Image
import io

class BatchFaviconFetcher:
    def __init__(self):
        self.cache_file = 'favicon_cache.json'
        self.output_dir = 'favicons'
        self.cache = self.load_cache()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        
        # 创建输出目录
        Path(self.output_dir).mkdir(exist_ok=True)
    
    def load_cache(self):
        """加载缓存"""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except:
                pass
        return {}
    
    def save_cache(self):
        """保存缓存"""
        with open(self.cache_file, 'w', encoding='utf-8') as f:
            json.dump(self.cache, f, indent=2, ensure_ascii=False)
    
    def get_domain(self, url):
        """获取域名"""
        try:
            parsed = urlparse(url)
            domain = parsed.netloc
            if domain.startswith('www.'):
                domain = domain[4:]
            return domain
        except:
            return url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0]
    
    def get_favicon_urls(self, domain):
        """获取可能的favicon URL列表"""
        base_url = f"https://{domain}"
        return [
            # 标准favicon路径
            f"{base_url}/favicon.ico",
            f"{base_url}/favicon.png",
            f"{base_url}/favicon.jpg",
            
            # Logo路径
            f"{base_url}/logo.png",
            f"{base_url}/logo.jpg",
            f"{base_url}/logo.ico",
            
            # Apple touch icon
            f"{base_url}/apple-touch-icon.png",
            f"{base_url}/apple-touch-icon-precomposed.png",
            
            # 通用图标路径
            f"{base_url}/icon.png",
            f"{base_url}/icon.jpg",
            f"{base_url}/icon.ico",
            
            # 其他常见路径
            f"{base_url}/assets/favicon.ico",
            f"{base_url}/assets/logo.png",
            f"{base_url}/images/favicon.ico",
            f"{base_url}/images/logo.png",
            f"{base_url}/static/favicon.ico",
            f"{base_url}/static/logo.png",
            
            # 第三方服务
            f"https://www.google.com/s2/favicons?domain={domain}&sz=64",
            f"https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url={base_url}&size=64",
            f"https://icons.duckduckgo.com/ip3/{domain}.ico",
            f"https://favicon.yandex.net/favicon/{domain}",
            f"https://api.faviconkit.com/{domain}/64"
        ]
    
    def check_url(self, url):
        """检查URL是否可访问"""
        try:
            response = self.session.head(url, timeout=5, allow_redirects=True)
            return response.status_code == 200
        except:
            return False
    
    def get_favicon_url(self, domain):
        """获取favicon URL"""
        # 检查缓存
        if domain in self.cache:
            return self.cache[domain]
        
        favicon_urls = self.get_favicon_urls(domain)
        
        for url in favicon_urls:
            if self.check_url(url):
                self.cache[domain] = url
                self.save_cache()
                return url
        
        return None
    
    def download_favicon(self, domain):
        """下载favicon"""
        favicon_url = self.get_favicon_url(domain)
        if not favicon_url:
            return None
        
        try:
            response = self.session.get(favicon_url, timeout=10)
            if response.status_code == 200:
                return {
                    'url': favicon_url,
                    'data': response.content,
                    'content_type': response.headers.get('content-type', 'image/png')
                }
        except Exception as e:
            print(f"下载favicon失败 {domain}: {e}")
        
        return None
    
    def save_favicon(self, domain, favicon_data):
        """保存favicon文件"""
        if not favicon_data:
            return None
        
        try:
            # 确定文件扩展名
            content_type = favicon_data['content_type']
            if 'ico' in content_type:
                ext = '.ico'
            elif 'png' in content_type:
                ext = '.png'
            elif 'jpg' in content_type or 'jpeg' in content_type:
                ext = '.jpg'
            else:
                ext = '.png'
            
            filename = f"{domain}{ext}"
            filepath = os.path.join(self.output_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(favicon_data['data'])
            
            return filepath
        except Exception as e:
            print(f"保存favicon失败 {domain}: {e}")
            return None
    
    def generate_base64(self, favicon_data):
        """生成base64编码"""
        if not favicon_data:
            return None
        
        try:
            content_type = favicon_data['content_type']
            base64_data = base64.b64encode(favicon_data['data']).decode('utf-8')
            return f"data:{content_type};base64,{base64_data}"
        except Exception as e:
            print(f"生成base64失败: {e}")
            return None
    
    def resize_favicon(self, favicon_data, size=(32, 32)):
        """调整favicon大小"""
        if not favicon_data:
            return None
        
        try:
            image = Image.open(io.BytesIO(favicon_data['data']))
            
            # 如果是ICO文件，转换为PNG
            if image.format == 'ICO':
                # 获取最大尺寸的图标
                image = image.images[0] if hasattr(image, 'images') else image
            
            # 调整大小
            image = image.resize(size, Image.Resampling.LANCZOS)
            
            # 转换为PNG
            output = io.BytesIO()
            image.save(output, format='PNG')
            output.seek(0)
            
            return {
                'url': favicon_data['url'],
                'data': output.getvalue(),
                'content_type': 'image/png'
            }
        except Exception as e:
            print(f"调整favicon大小失败: {e}")
            return favicon_data
    
    def batch_fetch(self, domains):
        """批量获取favicon"""
        results = {}
        
        for i, domain in enumerate(domains, 1):
            print(f"[{i}/{len(domains)}] 处理域名: {domain}")
            
            try:
                # 下载favicon
                favicon_data = self.download_favicon(domain)
                
                if favicon_data:
                    # 调整大小
                    resized_data = self.resize_favicon(favicon_data)
                    
                    # 保存文件
                    filepath = self.save_favicon(domain, resized_data)
                    
                    # 生成base64
                    base64_data = self.generate_base64(resized_data)
                    
                    results[domain] = {
                        'url': favicon_data['url'],
                        'filepath': filepath,
                        'base64': base64_data,
                        'success': True
                    }
                    
                    print(f"  ✓ 成功获取favicon")
                else:
                    results[domain] = {
                        'success': False,
                        'error': '未找到favicon'
                    }
                    print(f"  ✗ 未找到favicon")
                
                # 添加延迟避免请求过于频繁
                time.sleep(0.5)
                
            except Exception as e:
                results[domain] = {
                    'success': False,
                    'error': str(e)
                }
                print(f"  ✗ 错误: {e}")
        
        return results
    
    def generate_js_mapping(self, results):
        """生成JavaScript映射文件"""
        js_content = "// 自动生成的favicon映射\n"
        js_content += "window.faviconMapping = {\n"
        
        for domain, result in results.items():
            if result.get('success') and result.get('base64'):
                js_content += f"    '{domain}': '{result['base64']}',\n"
        
        js_content += "};\n"
        
        with open('favicon-mapping.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print("已生成 favicon-mapping.js")
    
    def generate_html_report(self, results):
        """生成HTML报告"""
        html_content = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favicon获取报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .favicon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .favicon-item { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
        .favicon-item.success { background: #d4edda; }
        .favicon-item.error { background: #f8d7da; }
        .favicon-img { width: 32px; height: 32px; border: 1px solid #ccc; border-radius: 4px; margin: 10px 0; }
        .domain { font-weight: bold; margin-bottom: 5px; }
        .status { font-size: 12px; }
    </style>
</head>
<body>
    <h1>Favicon获取报告</h1>
    <div class="favicon-grid">
"""
        
        for domain, result in results.items():
            status_class = 'success' if result.get('success') else 'error'
            status_text = '成功' if result.get('success') else '失败'
            
            if result.get('success') and result.get('base64'):
                img_src = result['base64']
            else:
                img_src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><rect width='32' height='32' fill='%23f0f0f0'/><text x='16' y='20' text-anchor='middle' font-size='12' fill='%23999'>?</text></svg>"
            
            html_content += f"""
        <div class="favicon-item {status_class}">
            <div class="domain">{domain}</div>
            <img class="favicon-img" src="{img_src}" alt="{domain}">
            <div class="status">{status_text}</div>
        </div>
"""
        
        html_content += """
    </div>
</body>
</html>
"""
        
        with open('favicon-report.html', 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print("已生成 favicon-report.html")

def main():
    # 测试域名列表
    test_domains = [
        'deepseek.com',
        'chat.deepseek.com',
        'google.com',
        'gemini.google.com',
        'perplexity.ai',
        'www.perplexity.ai',
        'chatbot.app',
        'chat.chatbot.app',
        'claude.ai',
        'openai.com',
        'chat.openai.com',
        'cloudflare.com',
        'vercel.com',
        'domain.com',
        'github.com',
        'adsense.google.com',
        'analytics.google.com',
        'trends.google.com',
        'search.google.com',
        'spaceship.com',
        'similarweb.com',
        'x.com',
        'instagram.com',
        'facebook.com',
        'monetag.com',
        'propellerads.com',
        'media.net',
        'adsterra.com'
    ]
    
    fetcher = BatchFaviconFetcher()
    
    print("开始批量获取favicon...")
    results = fetcher.batch_fetch(test_domains)
    
    # 生成报告
    fetcher.generate_js_mapping(results)
    fetcher.generate_html_report(results)
    
    # 统计结果
    success_count = sum(1 for r in results.values() if r.get('success'))
    total_count = len(results)
    
    print(f"\n获取完成！")
    print(f"成功: {success_count}/{total_count}")
    print(f"成功率: {success_count/total_count*100:.1f}%")

if __name__ == "__main__":
    main()
