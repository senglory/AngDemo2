$start = $(Get-Date)
$rootPath = $args[0]

#Files to wait for
$bundleFinished = $rootPath + "Scripts\finish.js"

#Delay 2 seconds to ensure the gulp tasks were started (ie. Make sure we aren't testing for files before they were deleted and regenerated)
Start-Sleep -Seconds 2
while(!((Test-Path $bundleFinished))) {
    Write-Output "Waiting for generated files"
    Start-Sleep -Seconds 2
    $elapsedTime = $(Get-Date) - $start
    #Wait a maximum of 180 seconds for the files to appear
    if ($elapsedTime.TotalSeconds -gt 180){
        Write-Error "Timed out while waiting for generated files"
        exit -2
    }
}
exit 0