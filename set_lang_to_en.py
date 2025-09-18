import os
import re


def update_lang_attribute_in_file(file_path: str) -> bool:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content
        # Replace common zh language codes with en
        content = re.sub(r'lang\s*=\s*"zh-CN"', 'lang="en"', content, flags=re.IGNORECASE)
        content = re.sub(r'lang\s*=\s*"zh-cn"', 'lang="en"', content, flags=re.IGNORECASE)

        if content != original:
            with open(file_path, 'w', encoding='utf-8', newline='') as f:
                f.write(content)
            return True
        return False
    except Exception:
        return False


def main() -> None:
    project_root = os.path.dirname(os.path.abspath(__file__))
    changed = 0
    total = 0
    for root, _, files in os.walk(project_root):
        for name in files:
            if name.lower().endswith('.html'):
                total += 1
                path = os.path.join(root, name)
                if update_lang_attribute_in_file(path):
                    changed += 1
    print(f"Processed {total} HTML files. Updated lang attribute in {changed} files.")


if __name__ == '__main__':
    main()


