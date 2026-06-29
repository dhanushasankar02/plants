$indexLines = Get-Content "index.html"

# Extract header from index.html
$indexHeaderLines = @()
$inHeader = $false
for ($i = 0; $i -lt $indexLines.Length; $i++) {
    if ($indexLines[$i] -match "<header id=`"appHeader`"") { $inHeader = $true }
    if ($inHeader) { $indexHeaderLines += $indexLines[$i] }
    if ($indexLines[$i] -match "</header>") { $inHeader = $false }
}
$indexHeaderStr = ($indexHeaderLines -join "`n").Trim()

# Extract footer from index.html
$indexFooterLines = @()
$inFooter = $false
for ($i = 0; $i -lt $indexLines.Length; $i++) {
    if ($indexLines[$i] -match "<footer class=`"app-footer`"") { $inFooter = $true }
    if ($inFooter) { $indexFooterLines += $indexLines[$i] }
    if ($indexLines[$i] -match "</footer>") { $inFooter = $false }
}
$indexFooterStr = ($indexFooterLines -join "`n").Trim()

# Subpages to check
$subpages = @("delivery.html", "wishlist.html", "subscription.html", "about.html", "collections.html", "gallery.html", "guides.html", "plants.html", "contact.html", "navbar.html")

foreach ($page in $subpages) {
    Write-Host "=================== $page ==================="
    $pageLines = Get-Content $page
    
    # Extract header from subpage
    $pageHeaderLines = @()
    $inHeader = $false
    for ($i = 0; $i -lt $pageLines.Length; $i++) {
        if ($pageLines[$i] -match "<header id=`"appHeader`"") { $inHeader = $true }
        if ($inHeader) { $pageHeaderLines += $pageLines[$i] }
        if ($pageLines[$i] -match "</header>") { $inHeader = $false }
    }
    $pageHeaderStr = ($pageHeaderLines -join "`n").Trim()
    
    # Extract footer from subpage
    $pageFooterLines = @()
    $inFooter = $false
    for ($i = 0; $i -lt $pageLines.Length; $i++) {
        if ($pageLines[$i] -match "<footer class=`"(app-footer|premium-footer)`"") { $inFooter = $true }
        if ($inFooter) { $pageFooterLines += $pageLines[$i] }
        if ($pageLines[$i] -match "</footer>") { $inFooter = $false }
    }
    $pageFooterStr = ($pageFooterLines -join "`n").Trim()
    
    if ($indexHeaderStr -eq $pageHeaderStr) {
        Write-Host "  Header: MATCHES EXACTLY"
    } else {
        Write-Host "  Header: DOES NOT MATCH"
        # Output lengths to show diff size
        Write-Host "    index.html header length: $($indexHeaderStr.Length), $page header length: $($pageHeaderStr.Length)"
    }
    
    if ($indexFooterStr -eq $pageFooterStr) {
        Write-Host "  Footer: MATCHES EXACTLY"
    } else {
        Write-Host "  Footer: DOES NOT MATCH"
        Write-Host "    index.html footer length: $($indexFooterStr.Length), $page footer length: $($pageFooterStr.Length)"
    }
}
