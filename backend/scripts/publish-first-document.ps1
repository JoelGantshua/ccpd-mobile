$ErrorActionPreference = "Stop"
$base = "http://127.0.0.1:3000"

$docJson = & npx tsx ".\scripts\verify-first-publication.ts"

if ($LASTEXITCODE -ne 0) {
    throw "Vérification du document échouée."
}

$doc = $docJson | ConvertFrom-Json

if (
    $doc.type -ne "DOCUMENT" -or
    $doc.status -ne "DRAFT" -or
    $doc.integritePdf -ne "OK"
) {
    throw "Le document n'est pas prêt à être publié."
}

Write-Host ""
Write-Host "=== DOCUMENT À PUBLIER ==="
Write-Host "Titre : $($doc.title)"
Write-Host "Fichier : $($doc.fileName)"
Write-Host "Identifiant : $($doc.id)"
Write-Host "Statut : $($doc.status)"
Write-Host "Intégrité PDF : $($doc.integritePdf)"

Write-Host ""
Write-Host "IMPORTANT : ce PDF deviendra accessible au public."
Write-Host "Confirmez uniquement après validation éditoriale."

$confirmation = Read-Host "Tapez PUBLIER pour confirmer"

if ($confirmation -cne "PUBLIER") {
    Write-Host "Publication annulée. Aucun changement."
    exit
}

$password = Read-Host "Mot de passe administrateur" -AsSecureString

try {
    $credential = [System.Net.NetworkCredential]::new(
        "",
        $password
    )

    $body = @{
        email = "ccpdblocest@gmail.com"
        password = $credential.Password
    } | ConvertTo-Json

    $login = Invoke-RestMethod `
        -Uri "$base/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body ([Text.Encoding]::UTF8.GetBytes($body)) `
        -ErrorAction Stop

    $headers = @{
        Authorization = "Bearer $($login.accessToken)"
    }

    $me = Invoke-RestMethod `
        -Uri "$base/auth/me" `
        -Headers $headers `
        -ErrorAction Stop

    if ($me.role -ne "ADMIN") {
        throw "Accès réservé aux administrateurs."
    }

    $result = Invoke-RestMethod `
        -Uri "$base/admin/publications/$($doc.id)/publish" `
        -Method PATCH `
        -Headers $headers `
        -ErrorAction Stop

    if (
        $result.success -ne $true -or
        $result.publication.status -ne "PUBLISHED" -or
        $result.publication.id -ne $doc.id
    ) {
        throw "Réponse de publication inattendue."
    }

    Write-Host ""
    Write-Host "PUBLICATION RÉUSSIE !" -ForegroundColor Green

    $result | ConvertTo-Json -Depth 5
}
finally {
    Remove-Variable password, credential, body, login, headers, me -ErrorAction SilentlyContinue
}
