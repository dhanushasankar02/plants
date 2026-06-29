$indexContent = Get-Content "index.html" -Raw

# Helper to find css block or text related to header/footer in style
# Let's extract style tag content
$styleRegex = "(?s)<style>(.*?)</style>"
if ($indexContent -match $styleRegex) {
    $indexStyle = $Matches[1]
    
    # We want to check if certain classes like .app-header, .app-footer exist and are similar
    # Let's find rules for .app-header and .app-footer
    # A simple way is to search for references to .app-header and print the rule
    $rules = @(".app-header", ".navbar", ".logo", ".nav-menu", ".nav-item", ".nav-link", ".dropdown-menu", ".nav-utilities", ".icon-btn", ".login-btn", ".hamburger-toggle", ".mobile-drawer", ".app-footer", ".footer-container")
    
    $subpages = @("delivery.html", "wishlist.html", "subscription.html", "about.html", "collections.html", "gallery.html", "guides.html", "plants.html")
    
    foreach ($page in $subpages) {
        Write-Host "Checking CSS in $page"
        $pageContent = Get-Content $page -Raw
        if ($pageContent -match $styleRegex) {
            $pageStyle = $Matches[1]
            
            # Let's check size of styles or presence of key classes
            foreach ($rule in $rules) {
                $inIndex = $indexStyle.Contains($rule)
                $inPage = $pageStyle.Contains($rule)
                if ($inIndex -ne $inPage) {
                    Write-Host "  Discrepancy for rule '$rule': index.html has it = $inIndex, $page has it = $inPage"
                }
            }
        } else {
            Write-Host "  No style block found in $page!"
        }
    }
}
