import os
import re

def fix_logos():
    files = [f for f in os.listdir('.') if f.endswith('.html')]
    for fname in files:
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # Replacement 1: Navbar and Footer standard logo
        content = re.sub(
            r'<a href="index\.html" class="logo"><img src="images/logo\.png" alt="Greenery" class="logo-img"></a>',
            '<a href="index.html" class="logo"><img src="images/logo.png" alt="Greenery" class="logo-img">Greenery</a>',
            content
        )
        
        # Replacement 2: Mobile drawer logo
        content = re.sub(
            r'<a href="index\.html" class="logo"><img src="images/logo\.png" alt="Greenery" class="logo-img" style="height: 28px;"></a>',
            '<a href="index.html" class="logo"><img src="images/logo.png" alt="Greenery" class="logo-img" style="height: 28px;">Greenery</a>',
            content
        )
        
        # Replacement 3: Login/Register logo
        content = re.sub(
            r'<a href="index\.html" class="login-logo"><img src="images/logo\.png" alt="Greenery" class="logo-img" style="height: 26px;"></a>',
            '<a href="index.html" class="login-logo"><img src="images/logo.png" alt="Greenery" class="logo-img" style="height: 26px;">Greenery</a>',
            content
        )
        
        if content != original_content:
            with open(fname, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed logo name in {fname}")

fix_logos()
