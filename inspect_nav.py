import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for fname in html_files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"=== {fname} ===")
    
    # Find headers
    # Look for <header id="appHeader" ... </header>
    header_matches = list(re.finditer(r'<header\b[^>]*>.*?</header>', content, re.DOTALL))
    if header_matches:
        for idx, match in enumerate(header_matches):
            start_line = content[:match.start()].count('\n') + 1
            end_line = content[:match.end()].count('\n') + 1
            # print first and last few lines of match
            lines = match.group(0).split('\n')
            preview = lines[0] + " ... " + lines[-1] if len(lines) > 1 else lines[0]
            print(f"  Header {idx+1}: lines {start_line}-{end_line} | {preview}")
    else:
        print("  No <header> found")
        
    # Find footers
    footer_matches = list(re.finditer(r'<footer\b[^>]*>.*?</footer>', content, re.DOTALL))
    if footer_matches:
        for idx, match in enumerate(footer_matches):
            start_line = content[:match.start()].count('\n') + 1
            end_line = content[:match.end()].count('\n') + 1
            lines = match.group(0).split('\n')
            preview = lines[0] + " ... " + lines[-1] if len(lines) > 1 else lines[0]
            print(f"  Footer {idx+1}: lines {start_line}-{end_line} | {preview}")
    else:
        print("  No <footer> found")
    
    # Also find script tags at the end that contain header/theme handlers
    # let's look for themeToggle or mobileDrawer in scripts
    script_matches = list(re.finditer(r'<script\b[^>]*>.*?</script>', content, re.DOTALL))
    if script_matches:
        for idx, match in enumerate(script_matches):
            script_text = match.group(0)
            if 'themeToggle' in script_text or 'mobileDrawer' in script_text:
                start_line = content[:match.start()].count('\n') + 1
                end_line = content[:match.end()].count('\n') + 1
                print(f"  Theme/Drawer Script: lines {start_line}-{end_line}")
