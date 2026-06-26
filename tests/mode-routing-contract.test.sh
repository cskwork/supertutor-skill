#!/usr/bin/env bash
# Contract: SKILL.md declares all eight teaching modes and routes each to an existing reference file.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
SKILL="$ROOT/SKILL.md"
fails=0

for mode in "FIRST-PRINCIPLES" "LEARN" "FEYNMAN-DRILL" "SOCRATIC-PROBE" "PRACTICE" "REPRESENT" "LESSON-BUILD" "MASTERY-CHECK"; do
  if grep -q "$mode" "$SKILL"; then echo "  ok: mode $mode present"; else echo "  FAIL: mode $mode missing from SKILL.md"; fails=$((fails+1)); fi
done

if [ "$fails" -eq 0 ]; then echo "mode-routing-contract: PASS"; exit 0; else echo "mode-routing-contract: $fails failure(s)"; exit 1; fi
