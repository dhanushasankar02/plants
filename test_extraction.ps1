$index = Get-Content "index.html" -Raw

function Test-Regex($name, $pattern) {
    if ($index -match $pattern) {
        Write-Host "MATCH SUCCESS: $name"
        Write-Host "Length: $($Matches[1].Length)"
        Write-Host "First line: $( ($Matches[1] -split '`n')[0] )"
        Write-Host "Last line: $( ($Matches[1] -split '`n')[-1] )"
    } else {
        Write-Warning "MATCH FAILED: $name"
    }
}

Test-Regex "Header" "(?s)(<header id=`"appHeader`"[^>]*>.*?</header>)"
Test-Regex "Overlay" "(?s)(<div id=`"drawerOverlay`"[^>]*>\s*</div>)"
Test-Regex "Drawer" "(?s)(<div id=`"mobileDrawer`"[^>]*>.*?</div>\s*</div>)"
# Wait, let's check if mobileDrawer has a double closing div or single.
# Let's write a regex that matches from <div id="mobileDrawer" to </div> but handles nesting.
# Or since we know it ends right before the next section/comment, let's write:
Test-Regex "Drawer simpler" "(?s)(<div id=`"mobileDrawer`"[^>]*>.*?</div>\s*)(?=\s*<!--)"
Test-Regex "Footer" "(?s)(<footer[^>]*class=`"app-footer`"[^>]*>.*?</footer>)"
