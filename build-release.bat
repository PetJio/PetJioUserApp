@echo off
echo =========================================
echo PetJio User App - Release Build Script
echo =========================================
echo.

echo Step 1: Cleaning previous builds...
cd android
call gradlew clean
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Clean failed!
    pause
    exit /b 1
)

echo.
echo Step 2: Building Release AAB...
call gradlew bundleRelease
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo =========================================
echo SUCCESS! Release AAB created
echo =========================================
echo.
echo Location: android\app\build\outputs\bundle\release\app-release.aab
echo.
echo Next steps:
echo 1. Test the release build
echo 2. Upload to Play Store Console
echo 3. Fill in store listing details
echo.
pause
