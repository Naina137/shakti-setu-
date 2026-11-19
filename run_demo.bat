@echo off
TITLE SHAKTI SETU AI - Startup
color 0E

echo ========================================================
echo        SHAKTI SETU AI - GAVS HACKATHON PROTOTYPE
echo   Rural Women Entrepreneurship & Safe Fulfilment Grid
echo ========================================================
echo.
echo [1/2] Starting FastAPI Multi-Agent Server...
start "" python server\main.py

echo [2/2] Opening Interactive Web Application...
timeout /t 2 /nobreak > nul
start http://localhost:8000

echo.
echo Application is now live at: http://localhost:8000
echo If server does not start, you can directly open: client\index.html
echo.
echo Press any key to exit this launcher window...
pause > nul
