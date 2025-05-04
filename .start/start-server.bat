@echo off
title Starting Smart HTTP Server...

:: Get the directory the .bat file is in
set "scriptDir=%~dp0"

:: Run the PowerShell script from the same folder
echo Attempting to start the server. Do not close this window, as doing so will stop the server.
echo If you want to stop the server, it is much safer to use the keyboard shortcut Ctrl+C before closing this window.
powershell -ExecutionPolicy Bypass -File "%scriptDir%local-server-manager-windows.ps1"
if %errorlevel% neq 0 (
    echo Failed to start the server.
    pause
    exit /b %errorlevel%
)
echo Server started successfully.