#!/usr/bin/env python3
"""Fix canonical and social URL tags pointing to trailing-slash paths."""
from __future__ import annotations

import re
from pathlib import Path

def main() -> None:
    root = Path(__file__).parent
    html_files = sorted(root.glob('*.html'))

    # Regex matching URLs like https://www.aiaiy.com/page/
    url_pattern = re.compile(r'https://www\.aiaiy\.com/([a-z0-9-]+)/')

    updated_files = 0
    total_replacements = 0

    for html_path in html_files:
        original = html_path.read_text(encoding='utf-8')
        modified = original

        def replace(match: re.Match[str]) -> str:
            nonlocal total_replacements
            slug = match.group(1)
            candidate = root / f'{slug}.html'
            if candidate.exists():
                total_replacements += 1
                return f'https://www.aiaiy.com/{slug}.html'
            return match.group(0)

        modified = url_pattern.sub(replace, modified)

        if modified != original:
            html_path.write_text(modified, encoding='utf-8')
            updated_files += 1
            print(f'Updated canonical URLs in {html_path.name}')

    print(f"Processed {len(html_files)} HTML files.")
    print(f"Updated {updated_files} files with {total_replacements} replacements.")

if __name__ == '__main__':
    main()
