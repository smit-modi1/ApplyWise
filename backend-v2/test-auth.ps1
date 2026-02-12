$ErrorActionPreference = "Stop"

$baseUrl = "http://localhost:3001/api/auth"
$email = "testuser" + (Get-Random) + "@example.com"
$password = "password123"

Write-Host "1. Testing Registration for $email..."
$registerBody = @{
    email = $email
    password = $password
    firstName = "Test"
    lastName = "User"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host "✅ Registration Successful!"
    # Write-Host ($registerResponse | ConvertTo-Json -Depth 5)
} catch {
    Write-Error "❌ Registration Failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "`n2. Testing Login..."
$loginBody = @{
    email = $email
    password = $password
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Login Successful!"
    $accessToken = $loginResponse.data.tokens.accessToken
    Write-Host "Tk: $accessToken"
} catch {
    Write-Error "❌ Login Failed: $($_.Exception.Message)"
    exit 1
}

if (-not $accessToken) {
    Write-Error "❌ No access token received!"
    exit 1
}

Write-Host "`n3. Testing Protected Route (Get Me)..."
try {
    $headers = @{
        Authorization = "Bearer $accessToken"
    }
    $meResponse = Invoke-RestMethod -Uri "$baseUrl/me" -Method Get -Headers $headers
    Write-Host "✅ Protected Route Access Successful!"
    Write-Host "User: $($meResponse.status)"
} catch {
    Write-Error "❌ Protected Route Access Failed: $($_.Exception.Message)"
    exit 1
}

Write-Host "`n🎉 All Auth Tests Passed!"
