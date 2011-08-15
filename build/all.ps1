[string]$version = Read-Host "Please provide a version number"

.\build.ps1 -version $version
.\package.ps1 -version $version
.\push.ps1 -version $version