set workingDirectory=%~dp0
@ECHO *** Changing directory to Smart Contracts ***
cd Code/Smart Contracts/

@ECHO *** Building smart contracts. If compile error, exit ***
truffle compile


