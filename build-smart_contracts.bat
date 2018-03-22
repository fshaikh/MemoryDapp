set workingDirectory=%~dp0
START CALL compile-smart_contracts.bat && ECHO Complete

@ECHO *** Copying Smart Contracts JSON to Build folder ***
del %workingDirectory%\Build\SmartContracts
mkdir %workingDirectory%\Build\SmartContracts
XCOPY %workingDirectory%\Code\Smart Contracts\build\contracts %workingDirectory%\Build\SmartContracts /S /R /I /Y

