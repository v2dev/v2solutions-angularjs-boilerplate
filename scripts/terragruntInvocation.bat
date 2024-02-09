@echo off

set access_key=%1
set secret_key=%2
set region=%3
set workspace=%4

set AWS_ACCESS_KEY_ID=%access_key%
set AWS_SECRET_ACCESS_KEY=%secret_key%
set AWS_DEFAULT_REGION=%region%

echo Current Directory: %CD%
echo Workspace is: %workspace%
cd ..
@REM cd %workspace%\environments\poc_angularjs_boilerplate
echo Current Directory after cd: %CD%
terragrunt run-all apply --terragrunt-non-interactive