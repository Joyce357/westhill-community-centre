# Simple PowerShell Static File Server
Add-Type -AssemblyName System.Web

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "PowerShell Web Server running on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) { $localPath = "index.html" }
        
        # Decode URL encoding (like spaces %20)
        $decodedPath = [System.Web.HttpUtility]::UrlDecode($localPath)
        $filePath = Join-Path "c:\Westhill Community Center\westhill-static" $decodedPath
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Simple content types
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($filePath.EndsWith(".jpeg") -or $filePath.EndsWith(".jpg")) { $response.ContentType = "image/jpeg" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($filePath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $errMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errMsg, 0, $errMsg.Length)
        }
        $response.OutputStream.Close()
    }
} finally {
    $listener.Stop()
}
