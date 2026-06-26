#!/usr/bin/env bash
# Contract: every reference/*.md, agents/*.md, and templates/* path SKILL.md points at actually exists.
# A dangling pointer in the router means a mode loads nothing.
set -u
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
SKILL="$ROOT/SKILL.md"
fails=0

# pull `reference/x.md`, `agents/x.md`, `templates/x` tokens out of the router
mapfile -t paths < <(grep -oE '(reference|agents)/[A-Za-z0-9_-]+\.md|templates/[A-Za-z0-9_./-]+\.(mjs|sh|json|md|html)' "$SKILL" | sort -u)

if [ "${#paths[@]}" -eq 0 ]; then echo "  FAIL: no reference/agents paths found in SKILL.md"; exit 1; fi

for p in "${paths[@]}"; do
  if [ -e "$ROOT/$p" ]; then echo "  ok: $p"; else echo "  FAIL: SKILL.md references missing $p"; fails=$((fails+1)); fi
done

if [ "$fails" -eq 0 ]; then echo "reference-links-contract: PASS"; exit 0; else echo "reference-links-contract: $fails missing file(s)"; exit 1; fi
