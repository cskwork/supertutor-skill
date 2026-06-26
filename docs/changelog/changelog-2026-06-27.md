# Changelog 2026-06-27 - supertutor v0.1.0

Initial build of `/supertutor`: a standalone agent skill that teaches anyone anything to genuine mastery
via the Feynman technique and Socratic method, with first-principles thinking + engineering mastery
(beginner to expert) as the flagship domain.

## What was built

- `SKILL.md` - thin router: 8 modes (FIRST-PRINCIPLES, LEARN, FEYNMAN-DRILL, SOCRATIC-PROBE, PRACTICE,
  REPRESENT, LESSON-BUILD, MASTERY-CHECK), the role-separated teach loop, the deterministic gate, the
  reference map, and a final checklist.
- 12 `reference/*.md` load-on-demand docs and 3 `agents/*.md` personas (tutor, pedagogy-critic, researcher).
- `templates/lesson-gate.mjs` - the executable, no-self-approval gate (six ordered sub-gates) plus the HTML
  lesson check; `templates/workspace/*.example.json` seed vault; `tests/` contract suite (`run-all.sh`).
- Bilingual `README.md` / `README.ko.md` and a self-contained `docs/index.html` GitHub Pages landing.

## Decisions and the reasoning behind them

- **The gate is the source of truth, not prose.** A skill that only *describes* good teaching drifts back
  to plausible-sounding mush. So the central artifact is a deterministic Node gate the *tutor cannot run on
  its own work*; an independent pedagogy-critic role runs it. The six sub-gates (never-vague, structure,
  hint-ladder, modality-not-style, mastery, integrity) each map to a vault control file, so "no vault, no
  gate". Rejected alternative: a prose checklist the model self-grades - that is exactly the self-approval
  failure the role separation exists to prevent.
- **Never-vague as an enforced contract.** Every concept turn must carry a jargon-free definition + a
  concrete real worked example (an analogy is explicitly rejected) + an own-words restatement prompt. This
  is enforced in JSON (lesson-claims) and in HTML lessons (`<dfn>`/`<dl>`/`.sg-def`), not left to taste.
- **Multimodal != learning styles.** The research consensus is that matching instruction to a learner's
  "style" has no empirical support (Pashler et al. 2008; Willingham). The skill therefore selects visual /
  verbal / scenario / role-play representations by *content structure*, and the gate FAILS style-matching
  language. We keep multiple representations and Mayer's multimedia principles; we drop the myth.
- **Mastery is gated, not timed.** Advancement requires two unprompted novel-transfer passes; a failed
  concept is re-taught through a *different* representation, never a repeat.
- **Reused proven infrastructure.** The lesson scaffold (lesson.css / lesson-book.js / quiz.js) and the
  gate/orchestrator pattern are adapted from `supergoal` (teach-lesson-gate.mjs) and `supercontent`
  (edu-gate.sh), made English-first and vault-aware; the landing template follows `supergoal`/`superdesign`.

## Build process

Two background multi-agent workflows: (1) deep research across six pedagogy pillars + house-style mining
-> a build blueprint (8 agents, 107 cited sources); (2) parallel authoring of the 12 reference docs, 3
personas, bilingual README, and landing page, then an adversarial review (21 agents).

## Review fixes applied (adversarial pass)

- **Citation integrity (CRITICAL).** The generation-effect figure d ≈ 0.40 across 86 studies was miscited
  to Slamecka & Graf 1978 (a single study). Re-attributed to the actual meta-analysis - Bertsch, Pesta,
  Wiscott & McDaniel (2007), *Memory & Cognition* 35(2), 201-210 - verified by web search; Slamecka & Graf
  kept only as the originating delineation. An unverified course-score statistic was cut.
- **Schema drift (CRITICAL).** `reference/workspace.md` and the personas described a vault schema that
  disagreed with the executable gate on nearly every field (bare array vs object, embedded vs top-level
  gradings, long vs short gapType enum, turnLog location, novelTransfers nesting, representationId). All
  docs were reconciled to the gate + seed, since the gate is the source of truth.
- Landing polish: proof examples made fully bilingual; the "five things" section now renders all five cards.

Verification: `bash tests/run-all.sh` is all green (frontmatter+size gate, gate pass/fail scenarios with
every sub-gate firing, mode-routing contract, reference-link contract); no emoji; EN/KO landing spans balanced.

## Revision - scope the critic to artifact + certification boundaries

- **Problem.** The role-separated loop, inherited from `supergoal`/`supercontent` (artifact-building
  workflows), ran an independent pedagogy-critic round-trip per concept. For live tutoring that is wasted
  latency: the learner's explain-back already exposes gaps in real time, so the human IS the per-turn
  verifier. Self-approval bias only bites where no human is in the loop.
- **Decision.** The critic now runs at exactly two no-human-in-the-loop boundaries: a **LESSON-BUILD**
  artifact (others reuse it) and a **MASTERY-CHECK** "mastered" certification (a claim with consequences).
  Live LEARN / FEYNMAN-DRILL / SOCRATIC-PROBE / PRACTICE / FIRST-PRINCIPLES / REPRESENT turns run inline:
  the tutor teaches, grades restatements, ladders hints, and fades support itself. The `mastered` stamp
  stays critic-only, so "no self-approval" is intact where it matters; in-session advancement is inline.
- **Touched.** `SKILL.md` (principle, teach loop steps 6-8, gate intro, Done), `reference/pedagogy-core.md`
  (role-separation section), `reference/first-principles.md`, `agents/tutor.md` (hand-off scoped to the two
  boundaries), `README.md` / `README.ko.md` loop mirrors, and `docs/index.html` (role-separated-loop section:
  step 6 scoped, step 8 fade made inline, intro clarified). The gate script, sub-gates, vault schema, and
  personas are unchanged - only *when* the gate runs is narrowed.
- **Rejected alternative.** Remove the critic entirely (fastest). Rejected because it lets the tutor
  self-stamp `mastered` and self-approve a reusable lesson - exactly the self-approval failure the role
  separation exists to prevent, with no human to catch a fabricated fact or an unearned mastery claim in a
  durable artifact.

Verification: `bash tests/run-all.sh` still all green; frontmatter gate OK (combined desc 757/1536).

## Revision - HTML cards as the default live-teaching delivery

- **Problem / request.** Live turns dumped the whole explanation (definition + worked example) as terminal
  prose, mixed with the questions. The user wanted the *explanation* rendered as readable HTML while the
  *dialogue* (questions, grading, hints) stayed in the terminal where the back-and-forth happens.
- **Decision.** Make an HTML "card" the **default** delivery for every live concept turn: the tutor renders
  the concept's `definition` + `workedExample` into `material/concept-NN.html` (built from the shared
  `templates/teach/assets/` scaffold so cards match the LESSON-BUILD look) and hands the learner a path; the
  one-line mode, `restatementPrompt`, one-gap grading, and hint ladder stay in the terminal. The never-vague
  triple still lands in `lesson-claims.json` every turn - the card is the *rendering*, the vault is the
  *record*. Opt out per-topic with `ladder-state.json.delivery: "terminal-text"` ("text only" / "터미널로").
- **Why cards are NOT gated.** `lesson-gate.mjs` scans `lessons/` (reusable book artifacts) only - it never
  walks `material/`. That matches the existing rule that *live turns skip the gate*; the learner's
  explain-back is the live verifier. So a card needs no book scaffold (no TOC/pager/`.sg-quiz`) - questions
  live in the terminal, not the card. The deterministic gate and its six sub-gates are unchanged.
- **Touched.** `SKILL.md` (new "Output and delivery" section, vault contents, teach-loop step 4, Done line);
  `templates/teach/assets/material-card.html` (new single-concept card template, non-book); `lesson.css`
  (additive `.sg-def` definition box + jargon `<dl>` styling - safe, never touches the book layout);
  `reference/workspace.md` (new "Live HTML cards" section, `material/`+`assets/` in the layout, `delivery`
  field in the ladder-state schema); `templates/workspace/ladder-state.example.json` (`delivery` seed).
- **Rejected alternative.** Ship it as an opt-in mode triggered only on request, default staying terminal
  prose. Rejected by the user in favor of a global default (terminal prose becomes the explicit opt-out), so
  every topic gets the card unless the learner asks for text.

Verification: frontmatter gate OK (body 17100 chars, under the 20000 warn; combined desc 757/1536);
`node templates/lesson-gate.mjs .supertutor/kafka` -> GATE PASS; all vault/seed JSON parses clean.
