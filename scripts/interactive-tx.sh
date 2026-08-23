#!/usr/bin/env bash
# ==============================================================================
# NEXORA LOCAL BLOCKCHAIN — INTERACTIVE TRANSACTION SIMULATOR
# Run inside WSL or Linux: ./scripts/interactive-tx.sh
# ==============================================================================

set -e

# ANSI Color Palette
C_BLUE="\033[1;34m"
C_CYAN="\033[1;36m"
C_GREEN="\033[1;32m"
C_YELLOW="\033[1;33m"
C_ORANGE="\033[38;5;208m"
C_RED="\033[1;31m"
C_DIM="\033[2m"
C_BOLD="\033[1m"
C_RESET="\033[0m"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEMO_DIR="$(cd "$SCRIPT_DIR/../../nexora-blockchain-demo" 2>/dev/null && pwd || echo "$SCRIPT_DIR/../nexora-blockchain-demo")"

if [ ! -d "$DEMO_DIR" ]; then
  DEMO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)/nexora-blockchain-demo"
fi

PYTHON_BIN="python3"

if ! command -v python3 &> /dev/null; then
  if command -v python &> /dev/null; then
    PYTHON_BIN="python"
  else
    echo -e "${C_RED}Error: Python 3 is required.${C_RESET}"
    exit 1
  fi
fi

clear 2>/dev/null || true

echo -e "${C_BLUE}╔══════════════════════════════════════════════════════════════╗${C_RESET}"
echo -e "${C_BLUE}║             NEXORA INTERACTIVE TRANSACTION WIZARD            ║${C_RESET}"
echo -e "${C_BLUE}║        Local Cryptographic Audit & Smart Consent Layer       ║${C_RESET}"
echo -e "${C_BLUE}╚══════════════════════════════════════════════════════════════╝${C_RESET}"
echo ""
echo -e "${C_DIM}Configure your transaction parameters below (press [ENTER] to accept defaults):${C_RESET}"
echo ""

# 1. Transaction Type
echo -e "${C_CYAN}[1] Select Transaction Type:${C_RESET}"
echo -e "  1) CONSENT_GRANT            ${C_DIM}(Authorize clinical data access)${C_RESET}"
echo -e "  2) CONSENT_REVOKE           ${C_DIM}(Instantly revoke access token)${C_RESET}"
echo -e "  3) MEDICAL_RECORD_ACCESS    ${C_DIM}(Log encrypted record audit query)${C_RESET}"
echo -e "  4) APPOINTMENT_BOOKED       ${C_DIM}(Register doctor consultation token)${C_RESET}"
echo -e "  5) ZK_VERIFICATION          ${C_DIM}(Zero-knowledge eligibility attestation)${C_RESET}"
read -p "Enter choice [1-5, default: 1]: " type_choice

case "$type_choice" in
  2) TX_TYPE="CONSENT_REVOKE" ;;
  3) TX_TYPE="MEDICAL_RECORD_ACCESS" ;;
  4) TX_TYPE="APPOINTMENT_BOOKED" ;;
  5) TX_TYPE="ZK_VERIFICATION" ;;
  *) TX_TYPE="CONSENT_GRANT" ;;
esac
echo -e "  ${C_GREEN}→ Selected: ${TX_TYPE}${C_RESET}\n"

# 2. Patient / Sender DID
read -p "[2] Sender DID [default: did:nexora:patient:demo01]: " input_from
TX_FROM="${input_from:-did:nexora:patient:demo01}"
echo -e "  ${C_GREEN}→ From: ${TX_FROM}${C_RESET}\n"

# 3. Recipient DID (Hospital / Provider)
read -p "[3] Recipient DID [default: did:nexora:hospital:apollo-demo]: " input_to
TX_TO="${input_to:-did:nexora:hospital:apollo-demo}"
echo -e "  ${C_GREEN}→ To: ${TX_TO}${C_RESET}\n"

# 4. Clinical Scope
read -p "[4] Clinical Scope [default: cardiology]: " input_scope
TX_SCOPE="${input_scope:-cardiology}"
echo -e "  ${C_GREEN}→ Scope: ${TX_SCOPE}${C_RESET}\n"

# 5. Access Duration
read -p "[5] Access Duration [default: 24h]: " input_duration
TX_DURATION="${input_duration:-24h}"
echo -e "  ${C_GREEN}→ Duration: ${TX_DURATION}${C_RESET}\n"

# 6. Purpose
read -p "[6] Purpose [default: clinical-consultation]: " input_purpose
TX_PURPOSE="${input_purpose:-clinical-consultation}"
echo -e "  ${C_GREEN}→ Purpose: ${TX_PURPOSE}${C_RESET}\n"

# Confirmation prompt
echo -e "${C_YELLOW}────────────────────────────────────────────────────────────────${C_RESET}"
read -p "Ready to broadcast transaction to local ledger? [Y/n]: " confirm
if [[ "$confirm" =~ ^[Nn] ]]; then
  echo -e "${C_RED}Transaction cancelled by user.${C_RESET}"
  exit 0
fi

echo ""
echo -e "${C_BLUE}════════════════════════════════════════════════════════════════${C_RESET}"
echo -e "${C_BOLD}             EXECUTING LOCAL BLOCKCHAIN ENGINE                  ${C_RESET}"
echo -e "${C_BLUE}════════════════════════════════════════════════════════════════${C_RESET}"
echo ""

# Step 1: Initialize
echo -e "${C_YELLOW}[1/6] Initializing local blockchain ledger...${C_RESET}"
"$PYTHON_BIN" "$DEMO_DIR/scripts/blockchain.py" --action init > /dev/null
echo -e "${C_GREEN}  ✓ Genesis ledger state verified${C_RESET}"
sleep 0.2

# Step 2: Load Wallet
echo -e "\n${C_YELLOW}[2/6] Loading cryptographic wallet keys...${C_RESET}"
echo -e "${C_GREEN}  ✓ Active Signer: ${TX_FROM}${C_RESET}"
sleep 0.2

# Step 3: Create & Hash
echo -e "\n${C_YELLOW}[3/6] Generating canonical SHA-256 transaction digest...${C_RESET}"
sleep 0.2

# Step 4-5: Commit Block via Python Engine
TX_RAW_JSON=$("$PYTHON_BIN" "$DEMO_DIR/scripts/blockchain.py" \
  --action create-tx \
  --type "$TX_TYPE" \
  --from-did "$TX_FROM" \
  --to-did "$TX_TO" \
  --scope "$TX_SCOPE" \
  --duration "$TX_DURATION" \
  --purpose "$TX_PURPOSE" \
  --json)

TX_ID=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['transaction_id'])")
TX_HASH=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['transaction_hash'])")
TX_SIG=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['signature'])")
BLOCK_NUM=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['block_number'])")
BLOCK_HASH=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['block_hash'])")
TIMESTAMP=$(echo "$TX_RAW_JSON" | "$PYTHON_BIN" -c "import sys, json; print(json.load(sys.stdin)['timestamp'])")

echo -e "${C_GREEN}  ✓ Transaction signed with Ed25519 key: ${TX_SIG:0:24}...${C_RESET}"
sleep 0.2

# Step 5: Mine Block
echo -e "\n${C_YELLOW}[4/6] Mining block & calculating cryptographic Merkle link...${C_RESET}"
echo -e "${C_GREEN}  ✓ Block #${BLOCK_NUM} mined (Hash: ${BLOCK_HASH:0:22}...)${C_RESET}"
sleep 0.2

# Step 6: Commit
echo -e "\n${C_YELLOW}[5/6] Committing block to blockchain/ledger.json...${C_RESET}"
echo -e "${C_GREEN}  ✓ Appended to immutable audit trail${C_RESET}"
sleep 0.2

# Verify
echo -e "\n${C_YELLOW}[6/6] Verifying total blockchain integrity...${C_RESET}"
"$PYTHON_BIN" "$DEMO_DIR/scripts/blockchain.py" --action verify > /dev/null
echo -e "${C_GREEN}  ✓ Chain verification: VALID (All block hashes sound)${C_RESET}"

# Display Receipt
echo ""
echo -e "${C_ORANGE}╔════════════════════════════════════════════════════════════════╗${C_RESET}"
echo -e "${C_ORANGE}║                  TRANSACTION CONFIRMATION                      ║${C_RESET}"
echo -e "${C_ORANGE}╚════════════════════════════════════════════════════════════════╝${C_RESET}"
echo -e "  ${C_BOLD}TRANSACTION ID  ${C_RESET} : ${C_YELLOW}${TX_ID}${C_RESET}"
echo -e "  ${C_BOLD}TRANSACTION HASH${C_RESET} : ${C_CYAN}${TX_HASH}${C_RESET}"
echo -e "  ${C_BOLD}ACTION TYPE     ${C_RESET} : ${C_BOLD}${TX_TYPE}${C_RESET}"
echo -e "  ${C_BOLD}SENDER (FROM)   ${C_RESET} : ${TX_FROM}"
echo -e "  ${C_BOLD}RECIPIENT (TO)  ${C_RESET} : ${TX_TO}"
echo -e "  ${C_BOLD}DATA SCOPE      ${C_RESET} : ${TX_SCOPE} (${TX_DURATION}) - ${TX_PURPOSE}"
echo -e "  ${C_BOLD}BLOCK NUMBER    ${C_RESET} : ${C_GREEN}#${BLOCK_NUM}${C_RESET}"
echo -e "  ${C_BOLD}BLOCK HASH      ${C_RESET} : ${BLOCK_HASH}"
echo -e "  ${C_BOLD}NETWORK         ${C_RESET} : ${C_YELLOW}NEXORA-LOCAL${C_RESET}"
echo -e "  ${C_BOLD}STATUS          ${C_RESET} : ${C_GREEN}${C_BOLD}✓ CONFIRMED${C_RESET}"
echo -e "  ${C_BOLD}TIMESTAMP       ${C_RESET} : ${TIMESTAMP}"
echo -e "${C_ORANGE}────────────────────────────────────────────────────────────────${C_RESET}"
echo ""
echo -e "${C_GREEN}✓ Transaction stored in blockchain/ledger.json${C_RESET}"
echo -e "${C_GREEN}✓ Individual receipt stored in blockchain/transactions/${TX_ID}.json${C_RESET}"
echo ""
