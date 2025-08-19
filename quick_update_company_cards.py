#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
快速更新AI公司页面的公司卡片结构
"""

import re

def quick_update():
    """快速更新公司卡片"""
    
    # 读取文件
    with open('ai-companies.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 公司域名映射
    domains = {
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
    for company, domain in domains.items():
        # 查找并替换公司卡片结构
        old_pattern = rf'<div class="company-card" data-name="{re.escape(company)}" data-category="([^"]*)">\s*<div class="company-title">([^<]*)</div>\s*<div class="company-desc">([^<]*)</div>\s*<a class="company-link" href="([^"]*)" target="_blank">([^<]*)</a>\s*</div>'
        
        new_structure = f'''                <div class="company-card" data-name="{company}" data-category="\\1" data-domain="{domain}">
                    <div class="company-logo-bg"></div>
                    <div class="company-content">
                        <div class="company-title">\\2</div>
                        <div class="company-desc">\\3</div>
                        <a class="company-link" href="\\4" target="_blank">\\5</a>
                    </div>
                </div>'''
        
        content = re.sub(old_pattern, new_structure, content, flags=re.DOTALL)
    
    # 保存文件
    with open('ai-companies.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("已快速更新所有公司卡片结构！")

if __name__ == "__main__":
    quick_update()
