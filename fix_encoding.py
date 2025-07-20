#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def fix_encoding_issues():
    """修复HTML文件中的乱码字符"""
    
    # 读取文件
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 定义需要修复的字符映射
    replacements = {
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
    
    # 执行替换
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # 写回文件
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("编码问题修复完成！")

if __name__ == "__main__":
    fix_encoding_issues() 