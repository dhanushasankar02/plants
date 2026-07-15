import os
import re
from collections import defaultdict

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
img_counts = defaultdict(list)

# Regex to find img src or CSS url
img_pattern = re.compile(r'src=["\']([^"\']+?)["\']|url\([\'"]?([^\'")\s]+?)[\'"]?\)', re.IGNORECASE)

for hf in html_files:
    with open(hf, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        for match in img_pattern.findall(content):
            img = match[0] or match[1]
            if 'images/' in img:
                # normalize path
                normalized = img.replace('./', '').strip()
                # Remove query parameters or hash if any
                normalized = normalized.split('#')[0].split('?')[0]
                img_counts[normalized].append(hf)

# Sort and print
print("IMAGE USAGE STATISTICS:")
for img, files in sorted(img_counts.items(), key=lambda x: len(x[1]), reverse=True):
    print(f'{img}: {len(files)} times - {sorted(list(set(files)))}')
