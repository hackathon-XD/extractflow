@echo off
title ExtractFlow AI
color 0A
echo.
echo   ============================================
echo      ExtractFlow AI — Full Stack Launcher
echo   ============================================
echo.

cd /d "%~dp0"

:: ── Check Python ──
python --version >nul 2>&1
if errorlevel 1 (
    echo   [!] Python not found. Installing...
    winget install Python.Python.3.12 --accept-source-agreements --accept-package-agreements 2>nul
    if errorlevel 1 (
        echo   [!] winget failed. Downloading Python...
        curl -L -o "%TEMP%\python-installer.exe" https://www.python.org/ftp/python/3.12.4/python-3.12.4-amd64.exe
        "%TEMP%\python-installer.exe" /quiet InstallAllUsers=1 PrependPath=1
        del "%TEMP%\python-installer.exe" 2>nul
    )
    set "PATH=%LocalAppData%\Programs\Python\Python312;%LocalAppData%\Programs\Python\Python312\Scripts;%PATH%"
    python --version >nul 2>&1
    if errorlevel 1 (
        echo   [ERROR] Install Python from python.org
        pause
        exit /b 1
    )
    echo   [OK] Python installed
)

:: ── Check Node ──
node --version >nul 2>&1
if errorlevel 1 (
    echo   [!] Node.js not found. Installing...
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements 2>nul
    set "PATH=%ProgramFiles%\nodejs;%LocalAppData%\npm;%PATH%"
    node --version >nul 2>&1
    if errorlevel 1 (
        echo   [ERROR] Install Node.js from nodejs.org
        pause
        exit /b 1
    )
    echo   [OK] Node.js installed
)

:: ── Setup Python venv ──
if not exist "venv" (
    echo   Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat
echo   Installing Python packages...
pip install -r requirements.txt -q 2>nul

:: ── Build Frontend ──
if not exist "frontend\node_modules" (
    echo   Installing frontend packages...
    cd frontend && npm install && cd ..
)
echo   Building frontend...
cd frontend && npx vite build 2>nul && cd ..
echo   [OK] Frontend built

:: ── Build Website ──
if not exist "website\node_modules" (
    echo   Installing website packages...
    cd website && npm install 2>nul && cd ..
)
echo   Building website...
cd website && npx vite build 2>nul && cd ..
echo   [OK] Website built

:: ── Launch Server ──
echo.
echo   ============================================
echo      Launching ExtractFlow AI...
echo      App:    http://localhost:4000
echo      Site:   http://localhost:4000/site/
echo   ============================================
echo.

:: Serve website from output dir
if not exist "output\site" mkdir output\site
xcopy /E /I /Y "website\dist\*" "output\site\" >nul 2>&1

:: Start backend (serves everything)
python server/main.py
