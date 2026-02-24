@echo off

start "" cmd /c "python -m http.server"

timeout /t 1 /nobreak >nul

start "" "http://localhost:8000"
