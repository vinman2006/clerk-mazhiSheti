# ==============================================================================
# Mazhi Sheti - PowerShell Project Runner
# ==============================================================================
# Usage:
#   .\run.ps1              -> Install deps + start dev server
#   .\run.ps1 -Fresh       -> Clean install (removes node_modules & .next)
#   .\run.ps1 -Build       -> Production build + start
#   .\run.ps1 -Seed        -> Seed the database before starting
#   .\run.ps1 -Migrate     -> Run Prisma migrations before starting
#   .\run.ps1 -Test        -> Run test suites instead of starting the server
# ==============================================================================

param(
    [switch]$Fresh,
    [switch]$Build,
    [switch]$Seed,
    [switch]$Migrate,
    [switch]$Test,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

if ($Help) {
    Write-Host "Usage: .\run.ps1 [OPTIONS]"
    Write-Host ""
    Write-Host "Options:"
    Write-Host "  -Fresh      Clean install (removes node_modules and .next)"
    Write-Host "  -Build      Production build and start"
    Write-Host "  -Seed       Seed the database before starting"
    Write-Host "  -Migrate    Run Prisma migrations before starting"
    Write-Host "  -Test       Run test suites instead of starting the server"
    Write-Host "  -Help       Show this help message"
    exit 0
}

# Helpers
function Write-Info($msg)    { Write-Host "[INFO] $msg" -ForegroundColor Cyan }
function Write-Success($msg) { Write-Host "[OK]   $msg" -ForegroundColor Green }
function Write-Warn($msg)    { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err($msg)     { Write-Host "[ERR]  $msg" -ForegroundColor Red }

# Banner
Write-Host ""
Write-Host "  ============================================" -ForegroundColor Green
Write-Host "         Mazhi Sheti - Smart Agriculture      " -ForegroundColor Green
Write-Host "  ============================================" -ForegroundColor Green
Write-Host ""

# Step 1: Check prerequisites
Write-Info "Checking prerequisites..."

$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCmd) {
    Write-Err "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
}

$nodeVerString = node -v
$nodeMajor = [int]($nodeVerString.TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 18) {
    Write-Err "Node.js 18+ is required (found $nodeVerString). Please upgrade."
    exit 1
}
Write-Success "Node.js $nodeVerString detected"

$npmCmd = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCmd) {
    Write-Err "npm is not installed."
    exit 1
}
$npmVer = npm -v
Write-Success "npm v$npmVer detected"

# Step 2: Check environment files
Write-Info "Checking environment configuration..."
if (-not (Test-Path ".env") -and -not (Test-Path ".env.local")) {
    Write-Warn "No .env or .env.local file found!"
    Write-Host "  Copy template: Copy-Item .env.example .env.local"
} else {
    Write-Success "Environment file found"
}

# Step 3: Fresh cleanup
if ($Fresh) {
    Write-Warn "Fresh install requested - cleaning up..."
    if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
    if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
    Write-Success "Removed node_modules\ and .next\"
}

# Step 4: Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Info "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Success "Dependencies installed"
} else {
    Write-Info "node_modules exists - skipping install (use -Fresh to reinstall)"
}

# Step 5: Generate Prisma Client
Write-Info "Generating Prisma client..."
npx prisma generate
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Success "Prisma client generated"

# Step 6: Migrations
if ($Migrate) {
    Write-Info "Running Prisma migrations..."
    npx prisma migrate dev
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Success "Migrations applied"
}

# Step 7: Seed
if ($Seed) {
    Write-Info "Seeding the database..."
    npm run db:seed
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Success "Database seeded"
}

# Step 8: Run Tests
if ($Test) {
    Write-Info "Running test suites..."
    npm run test
    exit $LASTEXITCODE
}

# Step 9: Start server
if ($Build) {
    Write-Info "Building for production..."
    npm run build
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Success "Production build complete"
    Write-Info "Starting production server at http://localhost:3000"
    npm run start
} else {
    Write-Info "Starting development server at http://localhost:3000"
    npm run dev
}
