#!/usr/bin/env node
// Frontmatter + size gate for a generated SKILL.md (portable agentskills.io limits).
// Usage: node skill-frontmatter-gate.mjs <skill-dir>
// Exits 0 only when name/description/body satisfy the portable limits; warnings do not fail.

import fs from "node:fs";
import path from "node:path";

const RESERVED = ["anthropic", "claude"];
const NAME_RE = /^[a-z0-9-]+$/;
const COMBINED_CAP = 1536; // description + when_to_use truncation cap in the skill listing
const BODY_WARN = 20000;   // ~5k tokens; the body should stay small (progressive disclosure)

function fail(msg) { console.error(`FAIL: ${msg}`); process.exitCode = 1; }
function warn(msg) { console.error(`WARN: ${msg}`); }

function unquote(value) {
  return value.replace(/^["']|["']$/g, "").trim();
}

// Minimal frontmatter reader: top-level `key: value` lines plus YAML block scalars
// (`key: >-` / `key: |`) between the first --- pair.
function parseFrontmatter(text) {
  text = text.replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: null, body: text };
  const fm = {};
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const mm = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!mm) continue;
    const key = mm[1];
    const raw = mm[2].trim();
    if (/^[>|][-+]?$/u.test(raw)) {
      const folded = raw.startsWith(">");
      const block = [];
      i += 1;
      for (; i < lines.length; i += 1) {
        const next = lines[i];
        if (/^[A-Za-z0-9_-]+:\s*/.test(next)) {
          i -= 1;
          break;
        }
        if (/^\s*$/.test(next)) {
          block.push("");
          continue;
        }
        const indented = next.match(/^\s+(.*)$/);
        if (!indented) {
          i -= 1;
          break;
        }
        block.push(indented[1]);
      }
      fm[key] = folded
        ? block.join(" ").replace(/[ \t]+/g, " ").trim()
        : block.join("\n").trim();
    } else {
      fm[key] = unquote(raw);
    }
  }
  return { fm, body: m[2] };
}

function checkName(name, dirName) {
  if (!name) { warn("no name field (directory name will be used as the command)"); return; }
  if (name.length > 64) fail(`name >64 chars (${name.length})`);
  if (!NAME_RE.test(name)) fail(`name must be lowercase letters/digits/hyphens: "${name}"`);
  if (RESERVED.includes(name)) fail(`name is the reserved word "${name}"`);
  else if (RESERVED.some((w) => name.includes(w))) warn(`name contains reserved word; some agents may reject "${name}"`);
  if (name !== dirName) warn(`name "${name}" != directory "${dirName}" (command name comes from the directory)`);
}

function main() {
  const dir = process.argv[2];
  if (!dir) { fail("usage: skill-frontmatter-gate.mjs <skill-dir>"); return; }
  const file = path.join(dir, "SKILL.md");
  if (!fs.existsSync(file)) { fail(`no SKILL.md in ${dir}`); return; }
  const { fm, body } = parseFrontmatter(fs.readFileSync(file, "utf8"));
  if (!fm) { fail("missing YAML frontmatter (--- ... ---)"); return; }

  checkName(fm.name, path.basename(path.resolve(dir)));

  const desc = fm.description || "";
  if (!desc.trim()) fail("description is empty (it is the entire discovery mechanism)");
  const combined = desc.length + (fm.when_to_use ? fm.when_to_use.length : 0);
  if (combined > COMBINED_CAP) fail(`description + when_to_use = ${combined} chars > ${COMBINED_CAP} cap`);
  if (body.length > BODY_WARN) warn(`body ${body.length} chars (>~5k tokens); push reference to bundled files`);

  if (!process.exitCode) {
    console.log(`OK: ${file} (name="${fm.name || path.basename(path.resolve(dir))}", combined desc ${combined}/${COMBINED_CAP}, body ${body.length} chars)`);
  }
}

main();
