$htmlFiles = Get-ChildItem -Filter *.html

foreach ($file in $htmlFiles) {
    Write-Host "=== $($file.Name) ==="
    $lines = Get-Content $file.FullName
    
    # Find headers
    $inHeader = $false
    $headerStart = 0
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        if ($line -match "<header\b") {
            $inHeader = $true
            $headerStart = $i + 1
        }
        if ($line -match "</header>") {
            if ($inHeader) {
                Write-Host "  Header: lines $headerStart-$($i + 1) | $($lines[$headerStart-1].Trim()) ... $($line.Trim())"
                $inHeader = $false
            }
        }
    }
    
    # Find footers
    $inFooter = $false
    $footerStart = 0
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        if ($line -match "<footer\b") {
            $inFooter = $true
            $footerStart = $i + 1
        }
        if ($line -match "</footer>") {
            if ($inFooter) {
                Write-Host "  Footer: lines $footerStart-$($i + 1) | $($lines[$footerStart-1].Trim()) ... $($line.Trim())"
                $inFooter = $false
            }
        }
    }

    # Find mobileDrawer
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match "id=`"mobileDrawer`"") {
            Write-Host "  mobileDrawer found near line $($i + 1)"
        }
        if ($lines[$i] -match "id=`"drawerOverlay`"") {
            Write-Host "  drawerOverlay found near line $($i + 1)"
        }
    }

    # Find Theme/Drawer Script block
    $inScript = $false
    $scriptStart = 0
    $hasThemeOrDrawer = $false
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        if ($line -match "<script\b") {
            $inScript = $true
            $scriptStart = $i + 1
            $hasThemeOrDrawer = $false
        }
        if ($inScript) {
            if ($line -match "themeToggle" -or $line -match "mobileDrawer") {
                $hasThemeOrDrawer = $true
            }
        }
        if ($line -match "</script>") {
            if ($inScript) {
                if ($hasThemeOrDrawer) {
                    Write-Host "  Theme/Drawer Script: lines $scriptStart-$($i + 1)"
                }
                $inScript = $false
            }
        }
    }
}
