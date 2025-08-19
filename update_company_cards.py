#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
批量更新AI公司页面，为所有公司卡片添加LOGO背景容器
"""

import re
from pathlib import Path

def update_company_cards():
    """更新AI公司页面的所有公司卡片"""
    
    file_path = Path('ai-companies.html')
    if not file_path.exists():
        print("ai-companies.html 文件不存在")
        return
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 公司域名映射
    company_domains = {
        'OpenAI': 'openai.com',
        'Anthropic': 'anthropic.com',
        'Google AI': 'ai.google',
        'Microsoft AI': 'microsoft.com',
        'Meta AI': 'ai.meta.com',
        'Cohere': 'cohere.ai',
        'Amazon AWS': 'aws.amazon.com',
        'Google Cloud': 'cloud.google.com',
        'Microsoft Azure': 'azure.microsoft.com',
        'IBM Watson': 'ibm.com',
        'Oracle AI': 'oracle.com',
        '阿里云': 'aliyun.com',
        'NVIDIA': 'nvidia.com',
        'Intel AI': 'intel.com',
        'AMD': 'amd.com',
        'Qualcomm': 'qualcomm.com',
        'Cerebras': 'cerebras.net',
        'Graphcore': 'graphcore.ai',
        'Midjourney': 'midjourney.com',
        'Stability AI': 'stability.ai',
        'Runway': 'runwayml.com',
        'Notion AI': 'notion.so',
        'Grammarly': 'grammarly.com',
        'Jasper': 'jasper.ai',
        'Tesla': 'tesla.com',
        'Waymo': 'waymo.com',
        'Cruise': 'getcruise.com',
        'Boston Dynamics': 'bostondynamics.com',
        'Figure AI': 'figure.ai',
        'Agility Robotics': 'agilityrobotics.com',
        'DeepMind Health': 'deepmind.com',
        'Tempus': 'tempus.com',
        'Insitro': 'insitro.com',
        'Atomwise': 'atomwise.com',
        'Butterfly Network': 'butterflynetwork.com',
        'Babylon Health': 'babylonhealth.com',
        'Palantir': 'palantir.com',
        'Databricks': 'databricks.com',
        'Snowflake': 'snowflake.com',
        'Stripe': 'stripe.com',
        'Plaid': 'plaid.com',
        'Affirm': 'affirm.com',
        'Duolingo': 'duolingo.com',
        'Coursera': 'coursera.org',
        'Khan Academy': 'khanacademy.org',
        'Chegg': 'chegg.com',
        'BYJU\'S': 'byjus.com',
        'VIPKid': 'vipkid.com',
        'Salesforce': 'salesforce.com',
        'HubSpot': 'hubspot.com',
        'Slack': 'slack.com',
        'Zoom': 'zoom.us',
        'Asana': 'asana.com',
        'Monday.com': 'monday.com',
        '百度': 'ai.baidu.com',
        '腾讯': 'ai.tencent.com',
        '字节跳动': 'volcengine.com',
        '商汤科技': 'sensetime.com',
        '旷视科技': 'megvii.com',
        '依图科技': 'yitutech.com'
    }
    
    # 更新每个公司卡片
    for company_name, domain in company_domains.items():
        # 查找公司卡片
        pattern = rf'<div class="company-card" data-name="{re.escape(company_name)}" data-category="[^"]*">'
        replacement = f'<div class="company-card" data-name="{company_name}" data-category="[^"]*" data-domain="{domain}">\n                    <div class="company-logo-bg"></div>\n                    <div class="company-content">'
        
        content = re.sub(pattern, replacement, content)
        
        # 查找对应的结束标签并添加内容包装
        # 需要找到每个公司卡片的结束位置
        card_pattern = rf'<div class="company-card" data-name="{re.escape(company_name)}"[^>]*>.*?<a class="company-link"[^>]*>访问官网</a>'
        
        def update_card(match):
            card_content = match.group(0)
            # 如果还没有company-content包装，添加它
            if 'company-content' not in card_content:
                # 在第一个div后添加company-content包装
                card_content = re.sub(
                    r'(<div class="company-card"[^>]*>)\s*<div class="company-logo-bg"></div>\s*',
                    r'\1\n                    <div class="company-logo-bg"></div>\n                    <div class="company-content">',
                    card_content
                )
                # 在访问官网链接后添加结束标签
                card_content = re.sub(
                    r'(<a class="company-link"[^>]*>访问官网</a>)\s*</div>',
                    r'\1\n                    </div>\n                </div>',
                    card_content
                )
            return card_content
        
        content = re.sub(card_pattern, update_card, content, flags=re.DOTALL)
    
    # 保存更新后的内容
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("已更新AI公司页面的所有公司卡片，添加了LOGO背景容器")

def main():
    """主函数"""
    print("开始更新AI公司页面的公司卡片...")
    update_company_cards()
    print("更新完成！")
    print("\n更新内容包括：")
    print("1. 为所有公司卡片添加了data-domain属性")
    print("2. 添加了company-logo-bg容器用于显示LOGO背景")
    print("3. 添加了company-content容器包装内容")
    print("4. 现在每个公司卡片都会自动获取并显示品牌LOGO作为背景")

if __name__ == "__main__":
    main()
