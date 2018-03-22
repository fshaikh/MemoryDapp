REM 4. Copy to Build folder under DappUI
REM 5. Copy Build folder to Public folder for App Server ()

set workingDirectory=%~dp0
@ECHO *** Changing directory to Smart Contracts ***
cd Code/Smart Contracts/

@ECHO *** Building smart contracts. If compile error, exit ***
truffle compile

@ECHO *** Copying Smart Contracts JSON to Build folder ***
del %workingDirectory%\Build\SmartContracts
mkdir %workingDirectory%\Build\SmartContracts
XCOPY %workingDirectory%\Code\Smart Contracts\build\contracts %workingDirectory%\Build\SmartContracts /S /R /I /Y

