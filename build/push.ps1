Param($version)

#Get version number from user, if not provided.
if ($version -Eq $null) {
    $version = Read-Host "Which version would you like to deploy"
}

#Get nuget key from user
$key = Read-Host "Please provide your Nuget.org API Key"

#open package folder for provided version numer and call nuget push on nupkg file provided
$folderPath = "..\package\$version"
$nupkg = "$folderPath\jquery.ie9ify.$version.nupkg"

$currentPath = (get-location).Path
$libPath = "$currentPath\lib"
set-alias nuget $libPath\NuGet.exe

nuget push -source http://packages.nuget.org/v1/ $nupkg $key #-CreateOnly