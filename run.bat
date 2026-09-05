@echo off
setlocal enabledelayedexpansion

:: ============================================================================
:: Mazhi Sheti - Windows Command Prompt (CMD) Runner
:: ============================================================================
:: Usage:
::   run.bat          -> Install deps + start dev server
::   run.bat --fresh  -> Clean install
::   run.bat --build  -> Production build + start
::   run.bat --seed   -> Seed database before start
::   run.bat --migrate-> Run Prisma migrations before start
::   run.bat --test   -> Run test suites
:: ============================================================================

echo.
echo ========================================================
echo          Mazhi Sheti - Smart Agriculture Platform
echo ========================================================
echo.

set FLAG_FRESH=0
set FLAG_BUILD=0
set FLAG_SEED=0
set FLAG_MIGRATE=0
set FLAG_TEST=0

:parse_args
if "%~1"=="" goto end_args
if /i "%~1"=="--fresh"   set FLAG_FRESH=1
if /i "%~1"=="--build"   set FLAG_BUILD=1
if /i "%~1"=="--seed"    set FLAG_SEED=1
if /i "%~1"=="--migrate" set FLAG_MIGRATE=1
if /i "%~1"=="--test"    set FLAG_TEST=1
if /i "%~1"=="--help"    goto show_help
if /i "%~1"=="-h"        goto show_help
shift
goto parse_args

:show_help
echo Usage: run.bat [OPTIONS]
echo.
echo Options:
echo   --fresh     Clean install (deletes node_modules and .next)
echo   --build     Build for production and start
echo   --seed      Seed database
echo   --migrate   Run Prisma migrations
echo   --test      Run test suites
echo   --help      Show this help message
exit /b 0

:end_args

:: Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERR] Node.js is not installed or not in PATH.
    echo Please install Node.js 18+ from https://nodejs.org
    exit /b 1
)

:: Check environment file
if not exist ".env" (
    if not exist ".env.local" (
        echo [WARN] Neither .env nor .env.local was found!
        echo Copy the template using: copy .env.example .env.local
    )
)

:: Clean install
if "%FLAG_FRESH%"=="1" (
    echo [WARN] Removing node_modules and .next...
    if exist "node_modules" rmdir /s /q "node_modules"
    if exist ".next" rmdir /s /q ".next"
    echo [OK]   Cleaned up existing builds.
)

:: Install dependencies
if not exist "node_modules" (
    echo [INFO] Installing npm dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
)

:: Generate Prisma Client
echo [INFO] Generating Prisma client...
call npx prisma generate
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

:: Migrations
if "%FLAG_MIGRATE%"=="1" (
    echo [INFO] Running Prisma migrations...
    call npx prisma migrate dev
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
)

:: Seed
if "%FLAG_SEED%"=="1" (
    echo [INFO] Seeding database...
    call npm run db:seed
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
)

:: Test
if "%FLAG_TEST%"=="1" (
    echo [INFO] Running tests...
    call npm run test
    exit /b %ERRORLEVEL%
)

:: Start App
if "%FLAG_BUILD%"=="1" (
    echo [INFO] Building for production...
    call npm run build
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
    echo [INFO] Starting production server at http://localhost:3000
    call npm run start
) else (
    echo [INFO] Starting development server at http://localhost:3000
    call npm run dev
)
