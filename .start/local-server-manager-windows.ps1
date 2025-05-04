Set-Location -Path (Split-Path $PSScriptRoot -Parent)
# Check if the script is running in a PowerShell session
# Try to find Python (python, python3, or python2)
$pythonCmds = @("python", "python3", "python2")
$python = $null

foreach ($cmd in $pythonCmds) {
    $found = Get-Command $cmd -ErrorAction SilentlyContinue
    if ($found) {
        $python = $cmd
        break
    }
}

if (-not $python) {
    Write-Error "[X] No version of Python (python, python3, or python2) is installed or in PATH."
    exit 1
}

# Find the first available port starting at 5500
$port = 5500
while ($true) {
    $inUse = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $inUse) { break }
    $port++
}

# Start the Python HTTP server on the available port
Write-Host "Starting HTTP server on port $port using $python..."
Start-Process -NoNewWindow -FilePath $python -ArgumentList "-m http.server $port" -WorkingDirectory "."

# Open the local page in browser
Start-Process "http://localhost:$port"
