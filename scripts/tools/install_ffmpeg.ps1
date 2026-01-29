Param()

Set-StrictMode -Version Latest

if (-not (Test-Path "scripts/tools")) {
    New-Item -ItemType Directory -Path "scripts/tools" -Force | Out-Null
}

$out = "scripts/tools/ffmpeg.zip"
$url = 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip'
Write-Host "Downloading ffmpeg from $url ..."
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing

Write-Host "Extracting $out ..."
Expand-Archive -LiteralPath $out -DestinationPath 'scripts/tools' -Force
Remove-Item $out -Force

$dir = Get-ChildItem 'scripts/tools' -Directory | Where-Object { $_.Name -like 'ffmpeg*' } | Select-Object -First 1
if ($null -ne $dir) {
    Write-Host "Found extracted folder: $($dir.FullName)"
    if (-not (Test-Path 'scripts/tools/bin')) { New-Item -ItemType Directory -Path 'scripts/tools/bin' -Force | Out-Null }
    $ff = Join-Path $dir.FullName 'bin\ffmpeg.exe'
    $fp = Join-Path $dir.FullName 'bin\ffprobe.exe'
    if (Test-Path $ff) { Copy-Item -Path $ff -Destination 'scripts/tools/bin' -Force }
    if (Test-Path $fp) { Copy-Item -Path $fp -Destination 'scripts/tools/bin' -Force }
    Write-Host 'Portable ffmpeg ready at scripts/tools/bin'
} else {
    Write-Host 'Could not find extracted ffmpeg directory. Check archive content.'
    exit 1
}
