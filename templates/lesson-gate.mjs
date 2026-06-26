#!/usr/bin/env node
// /supertutor gate -- the executable, no-self-approval exit check. SKILL.md promises that the tutor
// (builder) never grades its own work; only the independent pedagogy-critic runs THIS, and it either
// passes deterministically or it does not. Adapted from supergoal's teach-lesson-gate.mjs (HTML lesson
// structure) and supercontent's edu-gate.sh (ordered sub-gate orchestrator), made English-first /
// language-agnostic and vault-aware.
//
// Two inputs, dispatched automatically:
//   * a VAULT directory (.supertutor/<topic>/ holding lesson-claims.json [+ facts.json, ladder-state.json,
//     lessons/*.html]) -> runs the six ordered sub-gates on the control files, then the HTML check on any
//     lessons/.
//   * an HTML lesson file or a directory of them -> runs the lesson-structure check only.
//
// Sub-gates run IN ORDER; any FAIL => overall FAIL. Each violation prints as `file:locator - message`.
// NEVER weaken this script to make a failing lesson pass -- fix the lesson. Judgment a script cannot see
// (is the definition correct? is the worked example real?) is the pedagogy-critic's job on top of this.
//
// Usage: lesson-gate.mjs <vault-dir | lesson.html | lessons-dir> [more...]
//   Exit 0 = everything clears.   Exit 1 = at least one FAIL.   Exit 2 = usage error / nothing to check.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const GAP_TYPES = ["causal", "circular", "jargon", "boundary", "example", "analogy", "none"];
const BLOOM = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];
const DREYFUS = ["novice", "advanced-beginner", "competent", "proficient", "expert", "master"];
const CONTENT_STRUCTURE = ["spatial", "sequential", "causal", "quantitative", "phonological", "verbal"];
// Learning-style "meshing" language is forbidden (Pashler 2008; Willingham): the gate fails it outright.
const STYLE_RE =
  /\b(?:visual|auditory|verbal|kinesthetic|read[- ]?write)\s+learners?\b|\byour\s+learning\s+style\b|\bbecause\s+you(?:'re| are)\s+a\s+(?:visual|auditory|verbal|kinesthetic)\b/i;

function usage(message) {
  if (message) process.stderr.write(`lesson-gate: ${message}\n`);
  process.stderr.write("usage: lesson-gate.mjs <vault-dir | lesson.html | lessons-dir> [more...]\n");
  process.exit(2);
}

const args = process.argv.slice(2);
if (args.length === 0) usage("missing path");

// ---- collectors -------------------------------------------------------------
const failures = []; // {file, locator, message}
function fail(file, locator, message) { failures.push({ file, locator, message }); }

function loadJson(file) {
  try { return { ok: true, data: JSON.parse(readFileSync(file, "utf8")) }; }
  catch (e) { return { ok: false, error: e.message }; }
}
const isStr = (v) => typeof v === "string" && v.trim().length > 0;
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

// ---- HTML lesson check (a lesson is an interactive, never-vague, paged book) -------------------------
function checkHtmlLesson(file) {
  const html = readFileSync(file, "utf8");
  const count = (re) => (html.match(re) || []).length;
  if (!/<html[\s>]/i.test(html) || !/<\/html>/i.test(html)) fail(file, "doc", "not a complete HTML document");
  if (!/<html[^>]*\blang\s*=/i.test(html)) fail(file, "doc", "missing <html lang=...> (a11y / i18n)");
  if (!/<link\b[^>]*\blesson\.css\b[^>]*>/i.test(html))
    fail(file, "scaffold", "does not link assets/lesson.css -- build from templates/teach/assets");
  if (!/<script\b[^>]*\blesson-book\.js\b[^>]*>/i.test(html)) fail(file, "scaffold", "does not load assets/lesson-book.js");
  if (!/<script\b[^>]*\bquiz\.js\b[^>]*>/i.test(html)) fail(file, "scaffold", "does not load assets/quiz.js");
  if (!/<main\b[^>]*class\s*=\s*["'][^"']*\bbook\b/i.test(html)) fail(file, "shell", 'no <main class="book"> -- a lesson is a paged book, not a long scroll');
  if (!/\bpages-track\b/.test(html)) fail(file, "shell", "no .pages-track container");
  if (!/class\s*=\s*["'][^"']*\bpager\b/i.test(html)) fail(file, "shell", "no .pager navigation");
  const pages = count(/<section\b[^>]*\bdata-title\s*=/gi);
  if (pages < 2) fail(file, "shell", `only ${pages} <section data-title> page(s); need >= 2`);
  // never-vague: the lesson must explicitly DEFINE a term
  if (!(/<dfn[\s>]/i.test(html) || /<dl[\s>]/i.test(html) || /class\s*=\s*["'][^"']*\bsg-def\b/i.test(html)))
    fail(file, "never-vague", "defines no term -- use <dfn>, <dl>, or .sg-def (a lesson NAMES and DEFINES)");
  // active recall: a hydrated, answerable quiz
  const quizzes = count(/class\s*=\s*["'][^"']*\bsg-quiz\b/gi);
  if (quizzes === 0) fail(file, "active-recall", "no interactive .sg-quiz -- reading-only HTML is not a lesson");
  else {
    if (!/\bsg-options\b/.test(html)) fail(file, "active-recall", ".sg-quiz has no .sg-options list");
    if (count(/\bdata-correct\b/gi) === 0) fail(file, "active-recall", ".sg-quiz has no option marked data-correct");
  }
  if (STYLE_RE.test(html)) fail(file, "modality-not-style", "uses learning-style language (Pashler 2008: no evidence)");
}

// ---- vault sub-gates --------------------------------------------------------
function checkVault(dir) {
  const claimsFile = join(dir, "lesson-claims.json");
  const factsFile = join(dir, "facts.json");
  const ladderFile = join(dir, "ladder-state.json");

  const claimsRes = loadJson(claimsFile);
  if (!claimsRes.ok) { fail(claimsFile, "load", `unreadable lesson-claims.json (${claimsRes.error})`); return; }
  const claims = claimsRes.data || {};
  const concepts = Array.isArray(claims.concepts) ? claims.concepts : [];
  if (concepts.length === 0) fail(claimsFile, "concepts", "no concepts[] -- every teaching turn appends a concept");

  // facts (may be []), index by claim text
  let facts = [];
  if (existsSync(factsFile)) {
    const fr = loadJson(factsFile);
    if (!fr.ok) fail(factsFile, "load", `unreadable facts.json (${fr.error})`);
    else facts = Array.isArray(fr.data) ? fr.data : (fr.data.facts || []);
  }
  const factById = new Map();
  facts.forEach((f, i) => { if (f && (f.id || f.claim)) factById.set(String(f.id || f.claim), f); factById.set(`#${i}`, f); });

  // 1. NEVER-VAGUE (flagship) -------------------------------------------------
  for (const c of concepts) {
    const id = c.id || "(unnamed concept)";
    if (!isStr(c.definition)) { fail(claimsFile, id, "never-vague: empty definition"); }
    else {
      // circular: definition just repeats the id/term
      const defWords = norm(c.definition).split(" ").filter(Boolean);
      if (norm(c.definition) === norm(id) || defWords.length < 4)
        fail(claimsFile, id, "never-vague: definition is circular/too thin (restates the name, < 4 plain words)");
      // undefined jargon: every declared jargon term must be unpacked in the definition or unpacked{} map
      const unpacked = c.unpacked && typeof c.unpacked === "object" ? c.unpacked : {};
      for (const t of c.jargonTerms || []) {
        const inDef = norm(c.definition).includes(norm(t));
        const inMap = isStr(unpacked[t]);
        if (!inMap && !inDef) fail(claimsFile, id, `never-vague: jargon term "${t}" used but never unpacked`);
      }
    }
    const ex = c.workedExample;
    if (!ex || !isStr(ex.content)) fail(claimsFile, id, "never-vague: missing workedExample.content (a concrete real instance)");
    else {
      if (ex.type === "analogy") fail(claimsFile, id, `never-vague: workedExample.type="analogy" -- an analogy is not a worked example, give a concrete solved instance`);
      if (norm(ex.content) === norm(c.definition)) fail(claimsFile, id, "never-vague: worked example just restates the definition");
    }
    if (!isStr(c.restatementPrompt)) fail(claimsFile, id, "never-vague: missing restatementPrompt (learner must restate in their own words)");
    if (typeof c.factual !== "boolean") fail(claimsFile, id, "never-vague: missing factual:boolean flag");
    // style language anywhere in the concept
    const blob = JSON.stringify(c);
    if (STYLE_RE.test(blob)) fail(claimsFile, id, "modality-not-style: learning-style language present (forbidden)");
  }

  // 2. STRUCTURE: each grading carries one gapType + exactly one follow-up question --------------------
  for (const g of claims.gradings || []) {
    const loc = g.conceptId || "(grading)";
    if (!GAP_TYPES.includes(g.gapType)) fail(claimsFile, loc, `structure: gapType "${g.gapType}" not in ${GAP_TYPES.join("|")}`);
    if (g.gapType && g.gapType !== "none") {
      if (!isStr(g.followUpQuestion)) fail(claimsFile, loc, "structure: a gap was named but no follow-up question");
      else {
        const qs = (g.followUpQuestion.match(/\?/g) || []).length;
        if (qs > 1 || /\n\s*[-*\d]/.test(g.followUpQuestion)) fail(claimsFile, loc, "structure: return exactly ONE Socratic question, not a dump");
      }
    }
  }

  // 3. HINT-LADDER: no bottom-out before point+teach; recovery after bottom-out; level down on IDK -----
  const turns = Array.isArray(claims.turns) ? claims.turns : [];
  const seen = new Map(); // stuckPoint -> max level reached
  turns.forEach((t, i) => {
    const sp = t.stuckPoint || "(stuck)";
    const lvl = Number(t.hintLevel);
    if (lvl === 3) {
      if ((seen.get(sp) || 0) < 2) fail(claimsFile, `turns[${i}]`, `hint-ladder: Level-3 bottom-out on "${sp}" before a Level-1 and Level-2 attempt`);
      if (!isStr(t.recoveryPrompt)) fail(claimsFile, `turns[${i}]`, "hint-ladder: bottom-out without a 'now explain why' recovery prompt");
    }
    if (lvl) seen.set(sp, Math.max(seen.get(sp) || 0, lvl));
    if (t.learnerIDK === true) {
      const next = turns[i + 1];
      if (next && Number(next.hintLevel) >= lvl && (next.stuckPoint || "(stuck)") === sp)
        fail(claimsFile, `turns[${i + 1}]`, "hint-ladder: 'I don't know' must drop a level (back up to a prerequisite), not repeat the same level");
    }
  });

  // 4. MODALITY-NOT-STYLE: declared modality must justify by content structure ------------------------
  for (const c of concepts) {
    if (c.modality && !CONTENT_STRUCTURE.includes(c.modality.contentStructure))
      fail(claimsFile, c.id || "(concept)", `modality-not-style: modality declared without a valid contentStructure (${CONTENT_STRUCTURE.join("|")})`);
  }

  // 5. MASTERY: >=2 unprompted novel transfers before mastered; re-teach changes representation -------
  let ladder = {};
  if (existsSync(ladderFile)) {
    const lr = loadJson(ladderFile);
    if (!lr.ok) fail(ladderFile, "load", `unreadable ladder-state.json (${lr.error})`);
    else ladder = lr.data || {};
    if (ladder.bloomLevel && !BLOOM.includes(ladder.bloomLevel)) fail(ladderFile, "bloomLevel", `not in ${BLOOM.join("|")}`);
    if (ladder.dreyfusStage && !DREYFUS.includes(ladder.dreyfusStage)) fail(ladderFile, "dreyfusStage", `not in ${DREYFUS.join("|")}`);
    for (const m of ladder.masteredConcepts || []) {
      if (m.mastered !== true) continue;
      const clean = (m.novelTransfers || []).filter((t) => t && t.passed === true && t.unprompted === true);
      if (clean.length < 2) fail(ladderFile, m.id || "(mastered)", `mastery: mastered:true with only ${clean.length} clean novel transfer(s); need >= 2 (passed && unprompted)`);
      if (Array.isArray(m.reteachHistory) && m.reteachHistory.length >= 2) {
        const reps = m.reteachHistory.map((r) => r.representationId).filter(Boolean);
        if (new Set(reps).size < reps.length) fail(ladderFile, m.id || "(mastered)", "mastery: a re-teach reused the failed representation id -- re-teach via a DIFFERENT representation");
      }
    }
  }

  // 6. INTEGRITY: every factual concept resolves to a sourced fact -------------------------------------
  for (const c of concepts) {
    if (c.factual !== true) continue;
    const refs = c.factRefs || [];
    if (refs.length === 0) { fail(claimsFile, c.id || "(concept)", "integrity: factual:true but no factRefs -- source it in facts.json or set factual:false"); continue; }
    for (const r of refs) {
      const f = factById.get(String(r));
      if (!f) fail(factsFile, c.id || "(concept)", `integrity: factRef "${r}" not found in facts.json`);
      else if (!isStr(f.url)) fail(factsFile, String(r), "integrity: sourced fact has no url");
    }
  }
  // unmarked placeholders anywhere
  if (/\b(TODO|FIXME|FABRICATE|MADE[- ]?UP)\b/i.test(JSON.stringify(claims)))
    fail(claimsFile, "integrity", "unmarked placeholder/TODO in claims -- documented placeholder must say so, never leave an invented stand-in");

  // HTML lessons inside the vault
  const lessonsDir = join(dir, "lessons");
  if (existsSync(lessonsDir) && statSync(lessonsDir).isDirectory()) {
    for (const name of readdirSync(lessonsDir)) if (name.toLowerCase().endsWith(".html")) checkHtmlLesson(join(lessonsDir, name));
  }
}

// ---- dispatch ---------------------------------------------------------------
let checked = 0;
for (const arg of args) {
  if (!existsSync(arg)) usage(`path not found: ${arg}`);
  const st = statSync(arg);
  if (st.isDirectory()) {
    if (existsSync(join(arg, "lesson-claims.json"))) { checkVault(arg); checked++; }
    else {
      const htmls = readdirSync(arg).filter((n) => n.toLowerCase().endsWith(".html"));
      if (htmls.length === 0) usage(`directory has no lesson-claims.json and no *.html: ${arg}`);
      for (const n of htmls) { checkHtmlLesson(join(arg, n)); checked++; }
    }
  } else if (arg.toLowerCase().endsWith(".html")) { checkHtmlLesson(arg); checked++; }
  else usage(`not a vault dir or .html file: ${arg}`);
}
if (checked === 0) usage("nothing to check");

console.log("== /supertutor gate ==");
console.log(`checked: ${checked} target(s)`);
if (failures.length === 0) { console.log("== GATE PASS =="); process.exit(0); }

const byFile = new Map();
for (const f of failures) { if (!byFile.has(f.file)) byFile.set(f.file, []); byFile.get(f.file).push(f); }
for (const [file, fs2] of byFile) { console.log(`  FAIL  ${file}`); for (const f of fs2) console.log(`        - [${f.locator}] ${f.message}`); }
console.error(`\nGATE FAIL: ${failures.length} violation(s) across ${byFile.size} file(s) -- fix the lesson/vault; never weaken this gate.`);
process.exit(1);
