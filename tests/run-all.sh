#!/usr/bin/env bash
# Canonical verifier for the supertutor skill. Run before any commit or release.
# Requires node on PATH; run under Git Bash or WSL on Windows.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
fails=0
run() { echo; echo "=== $1 ==="; shift; if "$@"; then :; else fails=$((fails+1)); fi; }

run "skill frontmatter + size gate" node "$ROOT/templates/skill-frontmatter-gate.mjs" "$ROOT"
run "gate scenarios (pass/fail vault)" bash "$HERE/gate-scenarios.test.sh"
run "mode routing contract" bash "$HERE/mode-routing-contract.test.sh"
run "reference links contract" bash "$HERE/reference-links-contract.test.sh"

echo
if [ "$fails" -eq 0 ]; then echo "== run-all: ALL GREEN =="; exit 0; else echo "== run-all: $fails suite(s) failed =="; exit 1; fi
