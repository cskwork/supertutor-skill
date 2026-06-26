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
