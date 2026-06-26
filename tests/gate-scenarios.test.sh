#!/usr/bin/env bash
# Contract: templates/lesson-gate.mjs PASSES a clean vault and FAILS a broken one, naming each sub-gate.
# The gate is the no-self-approval enforcement; if this drifts, the skill's central promise is hollow.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
GATE="$ROOT/templates/lesson-gate.mjs"
fails=0

echo "[1] clean vault must PASS (exit 0)"
out_pass="$(node "$GATE" "$HERE/fixtures/pass-vault" 2>&1)"; rc_pass=$?
if [ "$rc_pass" -eq 0 ]; then echo "  ok"; else echo "  FAIL: clean vault did not pass (exit $rc_pass)"; echo "$out_pass" | sed 's/^/    /'; fails=$((fails+1)); fi

echo "[2] broken vault must FAIL (exit 1)"
out_fail="$(node "$GATE" "$HERE/fixtures/fail-vault" 2>&1)"; rc_fail=$?
if [ "$rc_fail" -eq 1 ]; then echo "  ok (exit 1)"; else echo "  FAIL: expected exit 1, got $rc_fail"; fails=$((fails+1)); fi

echo "[3] broken vault must flag every sub-gate"
for token in "never-vague" "structure" "hint-ladder" "modality-not-style" "mastery" "integrity"; do
  if printf '%s' "$out_fail" | grep -qi "$token"; then echo "  ok: $token flagged"; else echo "  FAIL: $token not flagged"; fails=$((fails+1)); fi
done

if [ "$fails" -eq 0 ]; then echo "gate-scenarios: PASS"; exit 0; else echo "gate-scenarios: $fails failure(s)"; exit 1; fi
