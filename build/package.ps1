Param($version)

#Get version number from user.
if ($version -Eq $null) {
    $version = Read-Host "Please provide a version number"
}

$jsPath = "..\js"
$stylePath = "..\css"
$imagesPath = "..\images"
$folderPath = "..\package"
$releasesPath = "..\releases"
$currentVPath = "$folderPath\$version"
$currentPath = (get-location).Path
$libPath = "$currentPath\lib"
 
#Create folder for version
if (!(test-path -path $currentVPath)) {
    New-Item $currentVPath -type directory
}

#Create the downloadable Zip in the releases folder (using 7za.exe)
set-alias zip "$libPath\7za.exe"
zip a "$releasesPath\jQuery.pinify.$version.zip" "$jsPath"
zip a "$releasesPath\jQuery.pinify.$version.zip" "$stylePath"
zip a "$releasesPath\jQuery.pinify.$version.zip" "$imagesPath"
zip a "$releasesPath\jQuery.pinify.$version.zip" "..\sample"

#Create content folder and copy in Scripts and CSS
$folders = Get-ChildItem -Path $folderPath
$lastVersionName = $folders[$folders.Length-2].Name
New-Item "$currentVPath\Content" -type directory
New-Item "$currentVPath\Content\Scripts" -type directory
New-Item "$currentVPath\Content\Content" -type directory
New-Item "$currentVPath\Content\Content\images" -type directory
Copy-Item "$jsPath\*" "$currentVPath\Content\Scripts"
Copy-Item "$stylePath\*" "$currentVPath\Content\Content"
Copy-Item "$imagesPath\*" "$currentVPath\Content\Content\images"

#Open and modify the .css files to use the correct path for images referenced in the file
$currentText = "../images/"
$newText = "images/"

$NuGetStylePath = "$currentVPath\Content\Content\*.css"
(Get-Content $NuGetStylePath) | 
Foreach-Object {$_ -replace $currentText, $newText} | 
Set-Content $NuGetStylePath

#Copy old nuspec, open and modify version number element to new version
Copy-Item "$folderPath\$lastVersionName\*.nuspec" $currentVPath
$nuspecContent = New-Object XML
$nuspecContent.Load("$currentVPath\jQuery.ie9ify.nuspec")
$nuspecContent.package.metadata.version = $version.ToString()
$nuspecContent.save("$currentVPath\jQuery.ie9ify.nuspec")

#Call Nuget.exe on the nuspec
set-alias nuget $libPath\NuGet.exe
nuget pack "$currentVPath\jQuery.ie9ify.nuspec" -OutputDirectory $currentVPath