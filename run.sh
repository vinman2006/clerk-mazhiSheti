#!/usr/bin/env bash
# ==============================================================================
# Mazhi Sheti (माझी शेती) — Project Runner
# ==============================================================================
# Usage:
#   ./run.sh              → Install deps + start dev server
#   ./run.sh --fresh      → Clean install (removes node_modules & .next)
#   ./run.sh --build      → Production build + start
#   ./run.sh --seed       → Seed the database before starting
#   ./run.sh --migrate    → Run Prisma migrations before starting
#   ./run.sh --test       → Run test suites instead of starting the server
# ==============================================================================

set -euo pipefail

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ── Helpers ───────────────────────────────────────────────────────────────────
info()    { echo -e "${CYAN}ℹ ${NC}${1}"; }
success() { echo -e "${GREEN}✔ ${NC}${1}"; }
warn()    { echo -e "${YELLOW}⚠ ${NC}${1}"; }
error()   { echo -e "${RED}✖ ${NC}${1}"; }

# ── Banner ────────────────────────────────────────────────────────────────────
echo -e "${BOLD}${GREEN}"
echo "  ╔══════════════════════════════════════════╗"
echo "  ║        🌾  माझी शेती — Mazhi Sheti       ║"
echo "  ║         Smart Agriculture Platform        ║"
echo "  ╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ── Parse flags ───────────────────────────────────────────────────────────────
FLAG_FRESH=false
FLAG_BUILD=false
FLAG_SEED=false
FLAG_MIGRATE=false
FLAG_TEST=false

for arg in "$@"; do
  case "$arg" in
    --fresh)   FLAG_FRESH=true   ;;
    --build)   FLAG_BUILD=true   ;;
    --seed)    FLAG_SEED=true    ;;
    --migrate) FLAG_MIGRATE=true ;;
    --test)    FLAG_TEST=true    ;;
    --help|-h)
      echo "Usage: ./run.sh [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --fresh      Clean install (removes node_modules & .next)"
      echo "  --build      Production build and start"
      echo "  --seed       Seed the database before starting"
      echo "  --migrate    Run Prisma migrations before starting"
      echo "  --test       Run test suites instead of starting the server"
      echo "  --help, -h   Show this help message"
      exit 0
      ;;
    *)
      error "Unknown option: $arg"
      echo "Run './run.sh --help' for usage."
      exit 1
      ;;
  esac
done

# ── Step 1: Check prerequisites ──────────────────────────────────────────────
info "Checking prerequisites..."

# Node.js
if ! command -v node &>/dev/null; then
  error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
  exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  error "Node.js 18+ is required (found v$(node -v)). Please upgrade."
  exit 1
fi
success "Node.js $(node -v) detected"

# npm
if ! command -v npm &>/dev/null; then
  error "npm is not installed. It usually ships with Node.js."
  exit 1
fi
success "npm $(npm -v) detected"

# ── Step 2: Check environment files ──────────────────────────────────────────
info "Checking environment configuration..."

if [ ! -f ".env" ] && [ ! -f ".env.local" ]; then
  warn "No .env or .env.local file found!"
  echo ""
  echo "  Copy the example and fill in your credentials:"
  echo "    cp .env.example .env.local"
  echo ""
  echo "  Required at minimum:"
  echo "    • NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
  echo "    • CLERK_SECRET_KEY"
  echo "    • DATABASE_URL"
  echo "    • DIRECT_URL"
  echo ""
  read -rp "  Continue without env files? (y/N): " confirm
  if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    info "Exiting. Set up your .env.local and try again."
    exit 0
  fi
else
  success "Environment file(s) found"
fi

# ── Step 3: Clean install (if --fresh) ────────────────────────────────────────
if [ "$FLAG_FRESH" = true ]; then
  warn "Fresh install requested — cleaning up..."
  rm -rf node_modules .next
  success "Removed node_modules/ and .next/"
fi

# ── Step 4: Install dependencies ─────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  info "Installing dependencies..."
  npm install
  success "Dependencies installed"
else
  info "node_modules/ exists — skipping install (use --fresh to reinstall)"
fi

# ── Step 5: Generate Prisma client ───────────────────────────────────────────
info "Generating Prisma client..."
npx prisma generate
success "Prisma client generated"

# ── Step 6: Run migrations (if --migrate) ────────────────────────────────────
if [ "$FLAG_MIGRATE" = true ]; then
  info "Running Prisma migrations..."
  npx prisma migrate dev
  success "Migrations applied"
fi

# ── Step 7: Seed database (if --seed) ────────────────────────────────────────
if [ "$FLAG_SEED" = true ]; then
  info "Seeding the database..."
  npm run db:seed
  success "Database seeded"
fi

# ── Step 8: Run tests (if --test) ────────────────────────────────────────────
if [ "$FLAG_TEST" = true ]; then
  info "Running test suites..."
  echo ""
  npm run test
  echo ""
  success "All tests completed"
  exit 0
fi

# ── Step 9: Start the application ────────────────────────────────────────────
if [ "$FLAG_BUILD" = true ]; then
  info "Building for production..."
  npm run build
  success "Production build complete"
  echo ""
  info "Starting production server..."
  echo -e "${BOLD}${GREEN}  → http://localhost:3000${NC}"
  echo ""
  npm run start
else
  echo ""
  info "Starting development server..."
  echo -e "${BOLD}${GREEN}  → http://localhost:3000${NC}"
  echo ""
  npm run dev
fi
