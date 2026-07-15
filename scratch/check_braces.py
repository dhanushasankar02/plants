import re

def check_braces(path):
    print(f"Checking braces in {path}:")
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL | re.IGNORECASE)
    if not style_match:
        print("  No style tag found!")
        return
    
    style_content = style_match.group(1)
    
    # Track braces
    stack = []
    line_num = 1
    for char_idx, char in enumerate(style_content):
        if char == '\n':
            line_num += 1
        elif char == '{':
            stack.append((line_num, char_idx))
        elif char == '}':
            if not stack:
                print(f"  Unmatched closing brace at line {line_num}!")
                return
            stack.pop()
            
    if stack:
        print(f"  Unmatched opening braces! Leftovers: {stack}")
    else:
        print("  All braces are perfectly balanced!")

check_braces('plants.html')
check_braces('collections.html')
