function Get-Header($file) {
    $lines = Get-Content $file
    $headerLines = @()
    $inHeader = $false
    foreach ($line in $lines) {
        if ($line -match "<header id=`"appHeader`"") { $inHeader = $true }
        if ($inHeader) { $headerLines += $line }
        if ($line -match "</header>") { $inHeader = $false }
    }
    return $headerLines -join "`n"
}

Write-Host "--- INDEX.HTML HEADER ---"
Write-Host (Get-Header "index.html")
Write-Host "`n--- DELIVERY.HTML HEADER ---"
Write-Host (Get-Header "delivery.html")
Write-Host "`n--- WISHLIST.HTML HEADER ---"
Write-Host (Get-Header "wishlist.html")
