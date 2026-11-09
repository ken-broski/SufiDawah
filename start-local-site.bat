@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python 3 was not found. Install Python or open this folder with the VS Code Live Server extension.
  pause
  exit /b 1
)

start "The Sufi Dawah local website" /D "%~dp0" python -m http.server 8000 --bind 127.0.0.1 --directory "%~dp0"
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8000/"

echo The site is running at http://127.0.0.1:8000/
echo Keep the server window open while browsing. Close it to stop the local site.
