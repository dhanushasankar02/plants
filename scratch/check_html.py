import os
import re

def check_file(path):
    print(f"Checking {path}:")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if header.catalog-hero exists
    if 'class="catalog-hero"' in content or "class='catalog-hero'" in content:
        print("  FOUND: class=\"catalog-hero\"")
    else:
        print("  ERROR: class=\"catalog-hero\" not found!")
        
    # Check style tag containing .catalog-hero
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL | re.IGNORECASE)
    if style_match:
        style_content = style_match.group(1)
        if '.catalog-hero' in style_content:
            print("  FOUND: .catalog-hero in <style>")
            # print snippet
            idx = style_content.find('.catalog-hero')
            snippet = style_content[idx:idx+400]
            print("  SNIPPET:")
            print(snippet)
        else:
            print("  ERROR: .catalog-hero not found in <style>!")
    else:
        print("  ERROR: No <style> tag found!")

check_file('plants.html')
check_file('collections.html')
