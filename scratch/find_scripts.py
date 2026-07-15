with open('collections.html', 'r', encoding='utf-8') as f:
    content = f.read()

import re
scripts = re.findall(r'<script.*?>.*?</script>', content, re.DOTALL | re.IGNORECASE)
print(f"Found {len(scripts)} scripts:")
for s in scripts:
    print(s)
