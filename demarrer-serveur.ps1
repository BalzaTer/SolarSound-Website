param(
    [int]$Port = 8000
)

$ErrorActionPreference = 'Stop'
$siteRoot = $PSScriptRoot

if (-not (Test-Path -LiteralPath (Join-Path $siteRoot 'index.html'))) {
    throw "Le fichier index.html est introuvable dans le dossier du script: $siteRoot"
}

if ($Port -lt 1 -or $Port -gt 65535) {
    throw 'Le port doit etre compris entre 1 et 65535.'
}

$pythonLauncher = Get-Command py -ErrorAction SilentlyContinue
if (-not $pythonLauncher) {
    $pythonLauncher = Get-Command python -ErrorAction SilentlyContinue
}

if (-not $pythonLauncher) {
    throw 'Python est introuvable. Installez Python ou ajoutez py ou python au PATH.'
}

$serverCode = @'
import http.server
import socket
import sys

site_root = sys.argv[1]
port = int(sys.argv[2])

class SiteHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=site_root, **kwargs)

    def do_GET(self):
        if self.path.partition("?")[0] == "/favicon.ico":
            self.path = "/assets/images/solarsound.ico"
        super().do_GET()

network_ip = "localhost"
try:
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))
        network_ip = sock.getsockname()[0]
except OSError:
    pass

with http.server.ThreadingHTTPServer(("0.0.0.0", port), SiteHandler) as server:
    print(f"Le site est disponible sur http://127.0.0.1:{port}/", flush=True)
    if network_ip and network_ip != "127.0.0.1":
        print(f"Depuis un autre appareil du meme reseau Wi-Fi : http://{network_ip}:{port}/", flush=True)
    server.serve_forever()
'@

$siteUrl = "http://127.0.0.1:$Port/"
$networkIp = $null
$networkIp = Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
    Where-Object { $_.IPAddress -and $_.IPAddress -notmatch '^127\.' } |
    Select-Object -First 1 -ExpandProperty IPAddress

if (-not $networkIp) {
    $networkIp = (Get-CimInstance Win32_NetworkAdapterConfiguration |
        Where-Object { $_.IPEnabled -and $_.IPAddress } |
        Select-Object -ExpandProperty IPAddress |
        Where-Object { $_ -and $_ -notmatch '^127\.' } |
        Select-Object -First 1)
}

$networkUrl = if ($networkIp) { "http://$($networkIp):$Port/" } else { $siteUrl }

Write-Host "Dossier du site : $siteRoot"
Write-Host "Sur cette machine : $siteUrl"
if ($networkIp) {
    Write-Host "Sur un autre appareil du meme reseau Wi-Fi : $networkUrl"
}
Start-Process $siteUrl

$serverCode | & $pythonLauncher.Source - $siteRoot $Port
if ($LASTEXITCODE -ne 0) {
    throw "Le serveur s'est arrete avec le code $LASTEXITCODE."
}
