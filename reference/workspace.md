# workspace - the vault contract

Load this in any mode that writes state - LESSON-BUILD, the default teach loop, MASTERY-CHECK. The
**vault** is one work directory per learner+topic that holds the control files the deterministic gate
reads. The gate never guesses from chat; it reads these files. So: **no vault, no gate** - and a tutor
with no gate cannot certify mastery. Create the vault at step 1 of the loop, before teaching.

A *control file* is a small JSON file the tutor and researcher write and the pedagogy-critic reads. A
*sub-gate* is one of the six ordered checks in `lesson-gate.mjs` (never-vague, structure, hint-ladder,
modality-not-style, mastery, integrity). This doc defines the files, their EXACT schemas, and which
sub-gate each field feeds. The schemas here are authoritative against the gate and the seed files in
`templates/workspace/` - if this doc and the gate ever disagree, the gate wins and this doc is the bug.
It does not re-teach the pedagogy - see `pedagogy-core.md` for that.

## Path and layout

One vault per learner+topic. `<topic>` is a kebab-case slug of the subject (`beam-deflection`,
`recursion`, `thermodynamics-entropy`). A second, unrelated subject is a second vault, never a second
section of the first.

```
.supertutor/<topic>/
  lesson-claims.json   # OBJECT: { topic, concepts[], gradings[], turns[] }
  facts.json           # ARRAY: sourced external facts (may be []); placeholders marked
  ladder-state.json    # OBJECT: Bloom/Dreyfus placement + mastery + review schedule
  lessons/*.html       # optional: LESSON-BUILD artifacts, gated by the same script
  gate-report.md       # critic output: each violation as file:locator + one fix (the critic writes this)
```

Seed the vault by copying `templates/workspace/*.example.json` into the three filenames above. Vaults
are personal learning data and are git-ignored; only the `templates/` seed is committed (see
`.gitignore`). Never commit a learner's claims, state, or facts.

Who writes what: the **tutor** writes `lesson-claims.json` and updates `ladder-state.json` every turn;
the **researcher** writes `facts.json` only when a mode needs external facts; the **pedagogy-critic**
only reads - it never edits a claim, it writes violations back as `file:line`.

## lesson-claims.json

A single OBJECT (not a bare array) with three top-level arrays. Each teaching turn appends one entry to
`concepts`, one to `gradings`, and the hint trail to `turns`. Schema:

```json
{
  "topic": "beam-deflection",
  "concepts": [
    {
      "id": "bending-stress",
      "definition": "A loaded beam bends because the load squeezes the top fibers shorter and stretches the bottom fibers longer; the internal push-back per unit of cross-section area that resists this is the bending stress.",
      "jargonTerms": ["bending stress"],
      "unpacked": { "bending stress": "internal push-back force spread over each bit of cross-section area" },
      "workedExample": {
        "type": "worked",
        "content": "A 2 m steel ruler clamped at one end with a 1 kg mass on the tip: the top fibers measurably shorten, the bottom lengthen, and the stress is largest at the clamped end where the bending is greatest."
      },
      "restatementPrompt": "In your own words, what is physically happening inside the beam that makes it curve, and where is the stress largest?",
      "modality": { "contentStructure": "spatial" },
      "factual": false
    }
  ],
  "gradings": [
    { "conceptId": "bending-stress", "gapType": "causal", "followUpQuestion": "What makes the bottom fibers stretch rather than squeeze?" }
  ],
  "turns": [
    { "index": 0, "stuckPoint": "why-edge-is-stiffer", "hintLevel": 1, "learnerIDK": false },
    { "index": 1, "stuckPoint": "why-edge-is-stiffer", "hintLevel": 2, "learnerIDK": false },
    { "index": 2, "stuckPoint": "why-edge-is-stiffer", "hintLevel": 3, "recoveryPrompt": "Now explain, in your own words, why distance from the middle line raises stiffness.", "learnerIDK": false }
  ]
}
```

### concepts[] field rules (each one is a sub-gate trip-wire)

- `id` - stable kebab-case concept id; `gradings`, `turns`, `factRefs`, and `masteredConcepts` reference it.
- `definition` - plain language, jargon-free, at least four ordinary words (a one-word restatement of the
  `id` FAILs as circular). The never-vague sub-gate FAILs a definition that uses a listed `jargonTerms`
  value it cannot also find unpacked.
- `jargonTerms` - every term here MUST be unpacked, either inline in `definition` OR in the `unpacked` map
  (below). An unpacked-nowhere term FAILs never-vague as undefined jargon.
- `unpacked` - optional `{ "<jargonTerm>": "<plain gloss>" }` map; the second accepted way (besides inline
  glossing) to satisfy the undefined-jargon check. Use it when a gloss would clutter the definition prose.
- `workedExample.type` - any concrete-instance label (`worked`, `solved`, `case`...). The single rejected
  value is `analogy`: an analogy is a candidate, not a worked example. Keep analogies in a separate optional
  `analogy` field; they never satisfy this requirement.
- `workedExample.content` - the actual solved instance with real values, not a restatement of the
  definition. Empty or a definition-echo FAILs never-vague.
- `restatementPrompt` - forces the learner to regenerate the idea in their own words, encoded far more
  durably than re-reading (generation effect; see `sources.md`). Missing it = incomplete turn = FAIL.
- `modality.contentStructure` - optional, but when a representation is declared it must justify by content:
  one of `spatial | sequential | causal | quantitative | phonological | verbal`. The modality-not-style
  sub-gate FAILs on style-matching language ("because you're a visual learner") anywhere in the entry, and
  on a declared `modality` with no valid `contentStructure`. See `modalities.md`.
- `factual` - boolean, required. `true` if the entry states an external fact, formula, or dated figure; a
  `true` entry must carry `factRefs` resolving into `facts.json`, or the integrity sub-gate FAILs.
- `factRefs` - array of `facts.json` ids, present when `factual` is `true`.

A factual concept adds `factRefs`:

```json
{
  "id": "cantilever-deflection-scaling",
  "definition": "The tip sag of a loaded beam grows fast with length and shrinks as the material gets stiffer and the cross-section spreads its material farther out.",
  "jargonTerms": ["deflection"],
  "unpacked": { "deflection": "how far the beam moves from its straight resting position" },
  "workedExample": {
    "type": "worked",
    "content": "For a cantilever with a tip load, sag = F*L^3/(3*E*I): doubling the length makes it sag 8x more (2^3), while doubling I halves the sag."
  },
  "restatementPrompt": "Without using the formula, explain why a beam twice as long sags far more than just twice as much.",
  "modality": { "contentStructure": "quantitative" },
  "factual": true,
  "factRefs": ["euler-bernoulli"]
}
```

### gradings[] field rules (the structure sub-gate)

A top-level array, one entry per graded restatement (NOT embedded inside a concept). Each entry:

- `conceptId` - the `concepts[].id` this grading is for.
- `gapType` - exactly one value from the 6-type enum, in the gate's short form:
  `causal | circular | jargon | boundary | example | analogy | none`. (`none` = the restatement was
  gap-free.) The long descriptive names live in `feynman.md`; the JSON uses these short strings.
- `followUpQuestion` - exactly ONE Socratic question targeting that gap. A multi-question dump (more than
  one `?`, or a bulleted list) FAILs the structure sub-gate. Use `""` when `gapType` is `none`.

### turns[] field rules (the hint-ladder sub-gate)

A top-level array, the append-only hint trail. Each entry:

- `index` - turn number.
- `stuckPoint` - kebab-case label for what the learner is stuck on; hint levels are tracked per stuckPoint.
- `hintLevel` - `1` (point), `2` (teach the principle), or `3` (bottom-out / give the answer).
- `recoveryPrompt` - REQUIRED on every `hintLevel: 3`: the "now explain why that is the answer" prompt.
- `learnerIDK` - `true` if the learner said "I don't know" this turn. The next turn for the SAME
  `stuckPoint` must drop to a LOWER `hintLevel` (back up to a prerequisite), never repeat the level.

The hint-ladder sub-gate FAILs a `hintLevel: 3` that has no recorded `1` and `2` for the same `stuckPoint`,
a bottom-out missing its `recoveryPrompt`, and an `learnerIDK: true` not followed by a level-down.

## facts.json

An ARRAY of sourced facts, written by the researcher. May be `[]` for a pure-reasoning topic. Schema:

```json
[
  {
    "id": "euler-bernoulli",
    "claim": "Cantilever tip deflection under a point load is F*L^3/(3*E*I) (Euler-Bernoulli beam theory).",
    "url": "https://en.wikipedia.org/wiki/Deflection_(engineering)",
    "retrievedDate": "2026-06-26"
  },
  {
    "id": "PLACEHOLDER-grid-storage-2026",
    "claim": "[PLACEHOLDER -- needs verification] 2026 utility-scale battery storage installed cost.",
    "url": "",
    "retrievedDate": null,
    "status": "placeholder"
  }
]
```

Rules:

- `id` - the stable key a concept's `factRefs` points at; the integrity sub-gate resolves a `factRef` to the
  fact whose `id` (or `claim`) matches. Every `factRefs` id in a `factual:true` concept must resolve to an
  entry here whose `url` is non-empty.
- `retrievedDate` - ISO `YYYY-MM-DD` the source was checked (`null` for a placeholder). Dated figures are
  re-verified against the current year, never pulled from model memory - see `sources.md`.
- **Placeholder format** (the only honest way to record an unverified fact): `id` prefixed `PLACEHOLDER-`,
  `claim` wrapped `[PLACEHOLDER -- needs verification]`, empty `url`, `retrievedDate: null`,
  `status: "placeholder"`. A concept may point at a placeholder, but because the `url` is empty the integrity
  sub-gate keeps that concept blocked until a real source replaces it. The gate FAILs an *unmarked*
  placeholder or a fabricated citation - never invent a fact, URL, or date to clear it.

## ladder-state.json

A single OBJECT: the learner's current placement plus the mastery and review records. Schema:

```json
{
  "learner": "alex",
  "topic": "beam-deflection",
  "bloomLevel": "Analyze",
  "dreyfusStage": "advanced-beginner",
  "subskills": {
    "identify-tension-compression-sides": 0.85,
    "predict-stiffer-orientation": 0.55,
    "deflection-scaling": 0.40
  },
  "zpdTarget": "predict-stiffer-orientation",
  "masteredConcepts": [
    {
      "id": "bending-stress",
      "mastered": true,
      "representationId": "ruler-cantilever",
      "novelTransfers": [
        { "passed": true, "unprompted": true },
        { "passed": true, "unprompted": true }
      ],
      "reteachHistory": []
    }
  ],
  "reviewSchedule": [
    { "conceptId": "bending-stress", "due": "1d" },
    { "conceptId": "bending-stress", "due": "1w" }
  ]
}
```

Field rules:

- `bloomLevel` - the cognitive-demand rung (`Remember | Understand | Apply | Analyze | Evaluate | Create`).
  `dreyfusStage` - the skill stage (`novice | advanced-beginner | competent | proficient | expert | master`).
  Both are defined in `mastery-ladder.md`; set them in DIAGNOSE from the highest probe passed without hints.
- `subskills` - a map of subskill name to current accuracy (0-1). `zpdTarget` names the subskill in the
  40-70% band - the just-reachable next step the tutor works.
- `masteredConcepts[]` - one entry per concept that has reached mastery. Each carries:
  - `mastered` - `true` only when the gate below is satisfied.
  - `representationId` - the representation id that worked.
  - `novelTransfers` - the novel-transfer attempts NESTED here. The mastery sub-gate requires **>= 2** with
    `passed:true` AND `unprompted:true` before `mastered:true` is allowed.
  - `reteachHistory` - optional `[ { "representationId": "..." } ]`; a re-teach after failure must use a
    DIFFERENT `representationId` than the one that failed, or the mastery sub-gate FAILs.
- `reviewSchedule` - `[ { "conceptId", "due" } ]` retrieval due-markers at `1d` / `1w` / `1m`, consumed by
  `review.md`.

## Which file feeds which sub-gate

| Control file | Fields read | Sub-gate | What it proves |
|---|---|---|---|
| lesson-claims.json | `concepts[].definition / jargonTerms / unpacked / workedExample / restatementPrompt / factual` | never-vague | every concept turn ships the jargon-free triple; no circular/undefined jargon |
| lesson-claims.json | `gradings[].gapType / followUpQuestion` | structure | one named gap + exactly one question per graded restatement |
| lesson-claims.json | `turns[].stuckPoint / hintLevel / recoveryPrompt / learnerIDK` | hint-ladder | no premature bottom-out; recovery after any answer; back-up on "I don't know" |
| lesson-claims.json | `concepts[].modality.contentStructure` + style-language scan | modality-not-style | representation chosen by content, no learning-style language |
| lesson-claims.json + facts.json | `concepts[].factual / factRefs` -> `facts.json[].id / url` | integrity | every factual claim resolves to a real sourced url |
| ladder-state.json | `masteredConcepts[].novelTransfers / representationId / reteachHistory` | mastery | >= 2 unprompted novel transfers before mastered; re-teach changes representation |

In one line: **claims -> never-vague / structure / hint-ladder / modality (and integrity with facts);
ladder-state -> mastery; facts -> integrity.**

## Append discipline

- **Append, never silently rewrite.** Each new turn appends a new entry to `concepts`, `gradings`, and
  `turns`; you never edit or delete a prior claim. The gate audits the full history - quietly rewriting a
  claim that failed hides the violation and breaks the no-self-approval rule.
- **Correct by superseding.** To fix a wrong earlier claim, append a new concept entry carrying
  `"supersedes": "<old-id>"`. The old entry stays as the record of what was taught.
- **Re-teach appends a new representation.** A failed concept is re-taught as a new entry with a different
  `representationId`, logged in `reteachHistory`; the mastery sub-gate confirms the ids differ.
- **ladder-state pointers update in place; records append.** `bloomLevel`, `zpdTarget`, and `subskills`
  accuracy are current-state and may be overwritten as the learner moves; `masteredConcepts`,
  `novelTransfers`, and `reviewSchedule` only grow. A failed spaced retrieval demotes a concept out of
  `masteredConcepts` and re-enters the teach loop (`review.md`).

## Running the gate

The critic - never the tutor - runs:

```
node templates/lesson-gate.mjs .supertutor/<topic>
```

It reads the control files, runs the six sub-gates in order, and prints ordered PASS/FAIL lines with
`file:line` violations shown verbatim in the report. Any FAIL = overall FAIL. A LESSON-BUILD artifact under
`lessons/` (`lessons.md`) is gated by the same script against its HTML. Cap at 3 critique->fix cycles;
persistent failure reports "needs human teacher review" rather than soft-passing. Never weaken the gate to
pass a lesson - fix the lesson. The mastery interview the critic runs on top of this is in
`interview-check.md`.

## Pitfalls

- **No vault, then "trust me, they got it."** Without the files there is nothing to gate; the critic must
  refuse. Create the vault first.
- **lesson-claims.json as a bare array.** The gate reads `claims.concepts`; a top-level array has no
  `.concepts` and FAILs "no concepts[]". It is one object with `concepts` / `gradings` / `turns` arrays.
- **An analogy in `workedExample`.** It reads as teaching but FAILs never-vague; supply a real solved
  instance and keep the analogy in its own field.
- **`factual:true` with no `factRefs`, or a `factRefs` pointing at a placeholder.** Both block on integrity
  until the researcher lands a real `url`. Do not invent one to clear it.
- **One vault for two topics.** Mixed concepts corrupt `zpdTarget` and the review schedule. One topic, one vault.
