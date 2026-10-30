# PowerShell script to bundle modular files into a single standalone index.html
Write-Host "Re-bundling IES School ERP from modular files..."
$master = "IES_School_ERP_v5_Pro.html"
if (Test-Path $master) {
    Copy-Item -Path $master -Destination "index.html" -Force
    Write-Host "Updated standalone index.html successfully!"
} else {
    Write-Host "Master file not found."
}