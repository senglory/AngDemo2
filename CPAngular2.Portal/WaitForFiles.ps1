$start = $(Get-Date)
$rootPath = $args[0]

#Files to wait for
$bootstrapBundle = $rootPath + "Scripts\bootstrap-bundle.min.js"
$jqueryBundle = $rootPath + "Scripts\jquery-bundle.min.js"
$modernizer = $rootPath + "Scripts\modernizer-min.js"
$css = $rootPath + "Content\dist\css\app.min.css"
$glyphicons = $rootPath + "Content\dist\fonts\glyphicons-halflings-regular.*"

#Delay 2 seconds to ensure the gulp tasks were started (ie. Make sure we aren't testing for files before they were deleted and regenerated)
Start-Sleep -Seconds 2
while(!((Test-Path $bootstrapBundle) -and (Test-Path $jqueryBundle) -and (Test-Path $modernizer) -and (Test-Path $css) -and (Test-Path $glyphicons))) {
    Write-Output "Waiting for generated files"
    Start-Sleep -Seconds 2
    $elapsedTime = $(Get-Date) - $start
   #Wait a maximum of 60 seconds for the files to appear
    if ($elapsedTime.TotalSeconds -gt 60){
        Write-Error "Timed out while waiting for generated files"
        exit -2
    }
}
exit 0