# /supertutor

**English** | [한국어](README.ko.md)

**Teach anyone anything to genuine mastery - first-principles engineering as the flagship - via Feynman explain-back and Socratic hints, behind a gate the tutor cannot self-approve.**
No extra install: clone the repo, symlink it into your skills directory, then `/supertutor <topic>`.
Landing page: **[cskwork.github.io/supertutor-skill](https://cskwork.github.io/supertutor-skill/)**.

An agent skill for teaching where a normal "just explain it" pass is too easy to fool. Understanding is
what the learner can rebuild from memory and explain in their own words - not what sounds familiar when
they read it back. `/supertutor` makes the learner *generate*, exposes every gap, and ladders hints until
they cross it themselves. For a one-line fact the user just wants stated, skip the skill and answer plainly.

## What it adds over a plain chatbot

A plain chatbot will happily explain, agree it "makes sense," and move on - leaving the learner with the
illusion of knowing. `/supertutor` adds the five things a chatbot will not do for free:

- **Never-vague rule.** Every concept turn ships three things or the turn is incomplete: (1) a
  plain-language definition with zero unexplained jargon, (2) at least one concrete REAL worked example - a
  solved instance, not a hand-wavy analogy, and (3) a prompt that makes the learner restate it in their own
  words. Example: teaching bending stress, the definition is "force per unit area inside a beam that resists
  being bent," the worked example is a numeric `M*c/I` on a real 2 m shelf bracket, and the prompt is "say
  why the top fibres compress, in your own words."
- **Grade the explanation, not the nod.** After every restatement the tutor names the FIRST gap by a fixed
  6-type rubric - missing causal chain, circular definition, undefined jargon, missing boundary, missing
  concrete example, or broken analogy - and returns exactly ONE Socratic question targeting it. Never a
  multi-question dump, never "does that make sense?" (a recognition task that feeds the illusion of knowing).
- **Ladder hints, not answers.** Level 1 *point* ("look at the supports - what is different there?") ->
  Level 2 *teach* (state the principle, not the step) only after a genuine attempt -> Level 3 *bottom-out*
  (give the answer) only after Level 2 fails, then require "now explain why that is the answer." A real hint
  keeps the probability the learner just copies an answer below 1.
- **A deterministic gate with no self-approval.** The tutor (builder) never grades its own work. An
  independent **pedagogy-critic** role runs `lesson-gate.mjs` before any "mastered" claim.
- **Never fabricate.** Every factual claim, formula, or dated figure is sourced into `facts.json` or cut;
  unverifiable items become documented placeholders, never invented facts, citations, or dates.

The bar to beat is a strong model that reads the real material. `/supertutor` adds only what that bar
cannot do alone: it makes hidden gaps *visible* and *gated*, instead of trusting a confident restatement.

## Modes

State the mode in one line before teaching, e.g. `FIRST-PRINCIPLES - why a beam sags; learner is
Bloom-Apply / Dreyfus advanced-beginner`. The root `SKILL.md` is a router; each mode loads only the
reference it needs.

| Signal in the request | Mode | One-line use case |
|---|---|---|
| "from first principles", "break X down to fundamentals", an engineering/physics/systems concept | **FIRST-PRINCIPLES** (flagship) | Descend "why? / what is it made of?" to a bedrock law, classify physics vs convention, reject labels, rebuild from confirmed truths |
| "teach me X", "I'm new to X", "beginner to mastery", no stated misconception | **LEARN** | Show-then-name: concrete worked example first, then the jargon-free definition, then graded own-words restatement |
| "check my understanding", "let me explain it back", "am I getting this right" | **FEYNMAN-DRILL** | Learner explains to a smart 12-year-old; stop at the first undefined term, run the 4-step protocol + 6-type gap rubric |
| "I don't get why X", a stated wrong belief, "isn't it true that..." | **SOCRATIC-PROBE** | Elenchus: restate the belief, build a scenario that exposes the contradiction, let the puzzlement stand - never correct by telling |
| "quiz me", "drill me", "help me get fluent", learner already has the concept | **PRACTICE** | Deliberate practice on the highest-error subskill: isolate it, immediate binary feedback, hold the 40-70% difficulty band |
| "draw it", "give me a scenario", "walk me through a real case" | **REPRESENT** | Pick the representation the CONTENT needs (spatial->diagram, causal->cause-effect chain), NOT the learner's "style" |
| "make me a lesson on X", "build a study unit" | **LESSON-BUILD** | Author a structured lesson into the vault: Bloom objectives, key-terms pre-training, worked examples, spaced review; the critic gates it |
| "are you sure I've got it", end of a unit, before advancing | **MASTERY-CHECK** | The independent critic runs the interview gate: two novel transfers, never-vague check, hint-ladder compliance, no self-approval |

Tie-breaks: a stated wrong belief routes to SOCRATIC-PROBE even if phrased "teach me." "Quiz me on
something I haven't learned" -> LEARN first, PRACTICE after the concept exists.

## Default teach loop (role-separated)

The **tutor** teaches; an independent fresh-context **pedagogy-critic** runs the gate; a **researcher**
sources external facts only when a mode needs them. The builder never grades its own work.

The work lives in a **vault** = one directory per learner+topic, `.supertutor/<topic>/`, holding
`lesson-claims.json` (per turn: concept, definition, jargon terms, worked example, restatement prompt,
grading), `facts.json` (sourced facts, may be `[]`), and `ladder-state.json` (Bloom level, Dreyfus stage,
per-subskill accuracy, mastered concepts, review schedule). **No vault, no gate** - create it at step 1.

1. **Frame** (tutor). Classify into one mode in a single line. Create or locate the vault.
2. **Diagnose** (tutor). Probe prior knowledge with low-stakes openers - a define probe, an apply probe on
   a novel variant, an analyze probe - before teaching. Record the highest level passed *without hints*.
3. **Research** (researcher; only if external facts are needed). Verify every claim, formula, or dated
   figure into `facts.json` with source URLs. Unverifiable -> documented placeholder. Skip for pure reasoning.
4. **Teach** (tutor). Deliver the turn in the mode's shape, then ALWAYS prompt the learner to restate the
   definition in their own words. Write definition + worked example + restatement prompt into the vault.
5. **Explain-back + grade** (tutor). Find the FIRST gap by the 6-type rubric; return one Socratic question.
   On "I don't know", back up a level - drop to a prerequisite, never rephrase at the same level.
6. **Critique + gate** (pedagogy-critic, independent). Re-read the vault, run `lesson-gate.mjs`, and
   enumerate every violation as `file:line` back into the vault.
7. **Fix + re-run** (tutor). Address each violation with the minimal change; re-run the gate. Cap at 3
   critique->fix cycles; persistent failure reports "needs human teacher review", never a soft-pass.
8. **Advance or schedule** (tutor, gated). Only after the gate is green AND the learner passed two NOVEL
   transfers unprompted: mark the concept mastered, fade support one level, schedule spaced retrieval
   (1 day / 1 week / 1 month). On failure, re-teach through a *different* representation and return to step 5.

## Quickstart

```text
/supertutor teach me why a beam sags, from first principles
/supertutor check my understanding of recursion
/supertutor quiz me on thermodynamics
/supertutor I don't get why a heavier object doesn't fall faster
/supertutor make me a lesson on how a hash table works
```

## The gate

The certifying check is deterministic and the tutor cannot run it on its own output - only the
pedagogy-critic does:

```bash
node templates/lesson-gate.mjs .supertutor/<topic>
```

It reads the vault control files - never guesses - and runs six sub-gates IN ORDER; any FAIL = overall
FAIL, printed as `file:line` violations shown verbatim in the report. Exit 0 = mastery-certifiable.

1. **Never-vague** (flagship): each concept has a non-empty jargon-free `definition`, a concrete
   `workedExample` (not empty, not analogy-only, not a restated definition), and a `restatementPrompt`.
2. **Structure**: each graded restatement carries one `gapType` from the 6-type enum and exactly one
   follow-up question - no multi-question dumps, no ungraded restatements.
3. **Hint-ladder**: no Level-3 bottom-out before a recorded Level-1 and Level-2 attempt; every bottom-out
   is followed by a recovery "explain why" prompt; every "I don't know" drops a level next turn.
4. **Modality-not-style**: FAIL on learning-style language ("because you're a visual learner"); the chosen
   modality must carry a `contentStructure` justification.
5. **Mastery**: `mastered:true` requires >= 2 novel-transfer items `passed:true` and `unprompted:true`; a
   re-teach must use a *different* representation than the one that failed.
6. **Integrity**: every `factual:true` claim resolves to a `facts.json` source with a non-empty URL.

The same script checks HTML lessons (book layout, hydrated `.sg-quiz`, shared scaffold). NEVER weaken a
gate to pass a lesson - fix the lesson.

## House rules

- **Never vague.** Define every term in plain language; give a concrete real worked example, never a
  hand-wavy analogy.
- **Hints, not answers.** Point -> teach -> bottom-out; require a recovery explanation after any answer.
- **Back up on "I don't know."** Drop to a prerequisite the learner can stand on; never rephrase at the
  same level.
- **Content-driven modality, not learning styles.** Choose the representation by the concept's structure.
  Matching instruction to a learner's "style" has no adequate supporting evidence (Pashler et al. 2008;
  Willingham 2005) - never run a style questionnaire.
- **Mastery-gated advancement.** Advance only after two unprompted novel transfers, never after one
  correct answer (which can be a guess) and never on a timer.
- **Never fabricate.** Source every fact into `facts.json` or cut it; a missing tool yields a documented
  placeholder, never an invented fact, citation, or date.
- **Role-separated.** Tutor != critic; the builder never runs its own gate.
- **Output discipline.** Prose in the learner's language; keep identifiers, file paths, commands, JSON
  keys, and the gate's machine-checked anchors in canonical English. No emoji; strict CommonMark blank-line
  spacing; WCAG AA contrast on any HTML; report with the gate's command output.

## Install

This repo **is** the skill. Put it where your agent CLI finds skills:

```bash
git clone https://github.com/cskwork/supertutor-skill.git
cd supertutor-skill
SRC="$(pwd)"
mkdir -p ~/.claude/skills ~/.agents/skills ~/.codex/skills

# One canonical checkout, symlinked into each active agent.
# If a target exists, audit it first and preserve any local edits before replacing it.
ln -s "$SRC" ~/.claude/skills/supertutor
ln -s "$SRC" ~/.agents/skills/supertutor
ln -s "$SRC" ~/.codex/skills/supertutor

# Canonical repo verification:
bash tests/run-all.sh
```

Then in your agent CLI: `/supertutor <your topic>`.

### Windows

The skill runs on Windows; the gate and test scripts use `node` plus POSIX shell, so run them under **Git
Bash** or **WSL** (`node` must be on `PATH`). The repo pins `.gitattributes eol=lf`. Install by **copy** if
symlinks need admin rights (`cp -R` in Git Bash/WSL, or `mklink /D` from an elevated `cmd`), then run the
contract tests under WSL bash.

## Layout

```
SKILL.md            thin router: never-vague law, the 8 modes, the role-separated loop, the gate, the reference map
agents/             one persona per role: tutor.md (builder) - pedagogy-critic.md (independent gate) - researcher.md (facts)
reference/          pedagogy-core.md (always-on authority) - first-principles.md - feynman.md - socratic.md - modalities.md - mastery-ladder.md - cognitive-load.md - workspace.md - lessons.md - interview-check.md - review.md - sources.md
templates/          lesson-gate.mjs (the deterministic gate) - skill-frontmatter-gate.mjs - workspace/ (control-file examples) - teach/assets/ (HTML lesson scaffold)
tests/              contract tests + fixtures/ (pass-vault, fail-vault) + run-all.sh canonical verifier
docs/               index.html landing page + .nojekyll
```

The vault `.supertutor/<topic>/` is created per learner+topic at runtime, not committed.

## Evidence

Every empirical claim in the skill traces to `reference/sources.md`, the never-fabricate backstop; each
reference file cites its own load-bearing claims inline. Headline citations:

- **Feynman technique** - reconstructed from Gleick's *Genius* via the documented notebook method, plus the
  Farnam Street 4-step formalization (no single Feynman paper); see `feynman.md`.
- **Tutoring works** - one-to-one tutoring plus mastery learning moved the average learner to roughly the
  98th percentile of a conventionally taught class (Bloom 1984); the loop here chases that interaction
  structure, not an answer machine. See `socratic.md` and `mastery-ladder.md`.
- **Generation over recognition** - information the learner generates is retained far better than
  information re-read (Slamecka & Graf 1978), and taking a test beats restudying for long-term retention
  (Roediger & Karpicke 2006); this is why every turn ends in explain-back. See `cognitive-load.md`.
- **Learning-styles myth** - matching instruction to a learner's "style" has no adequate supporting
  evidence (Pashler et al. 2008; Willingham 2005), so modality is chosen by content structure. See
  `modalities.md`.

## Attribution

The gate `lesson-gate.mjs` is adapted from supergoal's `teach-lesson-gate.mjs` (HTML lesson structure) and
supercontent's `edu-gate.sh` (ordered sub-gate orchestrator), made English-first / language-agnostic and
vault-aware. The landing page (`docs/index.html`) follows the supergoal / superdesign `docs/index.html`
template.

## Currency

Current year: 2026. Every dated figure or external fact used in a live lesson is re-verified into the
vault's `facts.json`, not pulled from model memory.

## License

MIT. See [`LICENSE`](LICENSE).
