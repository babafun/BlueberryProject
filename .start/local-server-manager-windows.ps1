# Move to the parent directory of the .start folder
Set-Location -Path (Split-Path $PSScriptRoot -Parent)

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

# Find the first available port starting at 5500, up to 65535
$port = 5500
$maxPort = 65535
while ($port -le $maxPort) {
    $inUse = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if (-not $inUse) { break }
    $port++
}

if ($port -gt $maxPort) {
    Write-Error "[X] No available ports. All ports are in use."
    exit 1
}

# Start the Python HTTP server on the available port
Write-Host "Starting HTTP server on port $port using $python..."
Start-Process -NoNewWindow -FilePath $python -ArgumentList "-m http.server $port" -WorkingDirectory "."

# Open the local page in browser
Start-Process "http://localhost:$port"
