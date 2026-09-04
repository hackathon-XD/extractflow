@echo off
title ExtractFlow AI
color 0A
echo.
echo   ========================================
echo      ExtractFlow AI - Starting...
echo   ========================================
echo.

cd /d "%~dp0"

:: Check Python — auto-install if missing
python --version >nul 2>&1
if errorlevel 1 (
    echo   Python not found. Installing via winget...
    winget install Python.Python.3.12 --accept-source-agreements --accept-package-agreements
    if errorlevel 1 (
        echo   [!] winget failed. Trying direct download...
        curl -L -o "%TEMP%\python-installer.exe" https://www.python.org/ftp/python/3.12.4/python-3.12.4-amd64.exe
        "%TEMP%\python-installer.exe" /quiet InstallAllUsers=1 PrependPath=1
        del "%TEMP%\python-installer.exe"
    )
    :: Refresh PATH
    set "PATH=%LocalAppData%\Programs\Python\Python312;%LocalAppData%\Programs\Python\Python312\Scripts;%PATH%"
    python --version >nul 2>&1
    if errorlevel 1 (
        echo   [ERROR] Python install failed. Install manually from python.org
        pause
        exit /b 1
    )
    echo   Python installed successfully!
)

:: Install Python deps
if not exist "venv" (
    echo   Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate.bat

echo   Installing Python packages...
pip install -r requirements.txt -q

:: Check Node — auto-install if missing
node --version >nul 2>&1
if errorlevel 1 (
    echo   Node.js not found. Installing via winget...
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    set "PATH=%ProgramFiles%\nodejs;%LocalAppData%\npm;%PATH%"
    node --version >nul 2>&1
    if errorlevel 1 (
        echo   [ERROR] Node.js install failed. Install from nodejs.org
        pause
        exit /b 1
    )
    echo   Node.js installed successfully!
)

:: Install frontend deps
if not exist "frontend\node_modules" (
    echo   Installing frontend packages...
    cd frontend && npm install && cd ..
)

echo.
echo   Starting ExtractFlow AI...
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:4000
echo.

:: Start backend in background
start "ExtractFlow Backend" cmd /k "call venv\Scripts\activate.bat && python server/main.py"

:: Wait for backend
timeout /t 3 /nobreak >nul

:: Start frontend
cd frontend && npm run dev
