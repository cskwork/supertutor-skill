# interview-check - the certifying mastery interview (MASTERY-CHECK)

Load this in **MASTERY-CHECK** mode: "are you sure I've got it", end of a unit, before advancing, "test
if I really know this". This is the human-facing face of the deterministic gate. It does two jobs: (1)
runs a short, live **certifying interview** that forces the learner to retrieve and transfer, and (2)
invokes `templates/lesson-gate.mjs` to machine-check the vault. Both must clear before any concept is
marked `mastered:true`. Obeys `pedagogy-core.md`; pairs with `review.md` on a pass and `modalities.md`
on a fail. One confident answer is not mastery - the warm feeling of "I knew that" is the illusion of
knowing, and it dissolves under a novel item (Koriat & Bjork 2005).

## No self-approval - who runs this

- The **tutor** (builder) who taught the concept may NOT run this check on its own work. A builder
  grading itself always passes itself.
- Only the independent **pedagogy-critic** runs MASTERY-CHECK, in fresh context, re-reading the vault
  control files without trusting the tutor's narrative. See `agents/pedagogy-critic.md`.
- "Fresh context" = the critic reads `lesson-claims.json`, `ladder-state.json`, and `facts.json` from
  `.supertutor/<topic>/` as primary evidence, not the tutor's chat summary. No vault, no gate.

## Preconditions (refuse to certify without these)

- A vault exists at `.supertutor/<topic>/` with a non-empty `lesson-claims.json` for the concept.
- The concept ran the teach loop at least once (a definition, a worked example, and a graded
  explain-back are on record).
- The tutor has NOT already written `mastered:true`. If it has, treat that as a self-approval violation,
  strip it, and certify from scratch.

## The certifying interview - five steps, in order

Run these on the live learner before touching the gate. Stop at the first hard failure, name it, and
route to the fail action - do not push through.

1. **Re-read the vault.** Pull the concept's definition, jargon terms, worked example, and the prior
   grading from `lesson-claims.json`; pull the Bloom/Dreyfus placement and the hint log from
   `ladder-state.json`. These tell you what was taught and what counts as "novel".
2. **Two novel transfers.** Pose two items the learner has NOT seen (see protocol below). Each must be
   answered correctly AND unprompted. A hinted, guessed, or previously-seen win does not count.
3. **Never-vague final explanation.** Ask the learner to explain the concept once more, cold. Score it
   on the four-point rubric below; the explanation must clear all four.
4. **Hint-ladder audit.** Read the turn log and confirm the teaching that earned this check obeyed the
   ladder - no premature bottom-out, every "I don't know" met with a level-down.
5. **Run the deterministic gate.** `node templates/lesson-gate.mjs .supertutor/<topic>`; read its
   ordered PASS/FAIL output verbatim into the report. Any sub-gate FAIL = overall FAIL.

## Two novel transfers (the mastery requirement)

Advance only after the learner performs correctly and **unprompted** on at least **two** transfer items
they have not seen. Definitions, in plain words:

- **Novel** = the surface (numbers, context, wording, direction) is new; the underlying principle is the
  one just taught. A re-run of a worked example is not novel - it tests recall of an answer, not the
  idea.
- **Unprompted** = solved with zero hint-ladder support. If you gave a Level-1 point, a Level-2 teach,
  or a Level-3 bottom-out to get there, the item is hinted and does not count toward the two.
- **Correct** = the answer AND the reason are right. A right number with a wrong "why" is a pattern-match
  (Bloom 1984; retrieval that exercises reasoning is what sticks - Roediger & Karpicke 2006).

Construct each transfer by varying ONE surface dimension while holding the deep structure fixed:

| Vary this | Hold this | Example (concept: cantilever tip deflection grows with length^3) |
|---|---|---|
| Surface context | the principle | Taught with a steel rod; ask about a diving board bolted at one end |
| Direction / inverse | the relation | Taught "longer -> more droop"; ask "halve the length -> droop becomes?" |
| Numeric regime | the mechanism | Taught a mid value; ask a boundary (length -> 0, or load at the wall) |
| Representation | the structure | Taught from a diagram; ask from a plain word description, no picture |

Worked pair for the beam concept:

- **Transfer 1 (new surface).** "A diving board is bolted at one end; a swimmer stands at the tip.
  Compare a 2 m board to a 4 m board - does the tip drop twice as far, or more, and why?" Pass = "about
  8 times as far, because deflection scales with length cubed (2 cubed = 8)." A "twice" answer fails -
  the learner has the direction but not the cube.
- **Transfer 2 (inverse regime).** "Keep everything the same but halve the length. Tip deflection
  becomes...?" Pass = "one eighth, same length-cubed reason." Two clean, unprompted passes here, plus a
  rubric-clean explanation, clear the mastery requirement.

Record these inside the concept's `masteredConcepts[]` entry in `ladder-state.json`:
`"novelTransfers": [ { "passed": true, "unprompted": true }, ... ]`. The **mastery** sub-gate FAILS
`mastered:true` unless at least two entries are both `passed:true` and `unprompted:true`.

## Never-vague final explanation - four-point rubric

Ask: "Explain it to me one more time, cold, as if to a smart 12-year-old." Score on four checks. All
four must pass. Surface only the FIRST failing check as one question (one gap per turn, per
`feynman.md`); do not dump all four.

| Check | Passes when | Fails when (real example) | Disqualifying probe |
|---|---|---|---|
| Jargon-free definition | every term is unpacked in plain words | "It's the moment of inertia times..." (undefined term) | "Say it again without 'moment of inertia'." |
| Concrete example | one real instance with actual values | "like, when stuff bends" (no instance) | "Give one real case with numbers." |
| The why (mechanism) | names the force/law/cause | "because that's the formula" (label, not cause) | "What physically causes that?" |
| Boundary / non-case | names where it does NOT hold | cannot name any limit | "Give a case where this is NOT true." |

Pass example (beam): "Push down on the free end of a stuck-out bar and it droops. Triple the stick-out
and the droop grows about 27 times, because length acts on it three times over - how far the load
reaches, how the bend builds along the bar, and how it piles up to the tip. A 1 m steel rod with a 10 N
end load drops a few mm; a 2 m rod drops about 8x that. It stops holding once the bar bends so far the
small-angle assumption breaks or the steel yields." All four checks clear.

Fail example: "A cantilever deflects per the standard beam equation; it depends on the moment of inertia
and Young's modulus." First gap = undefined jargon -> "Say it again without 'moment of inertia' or
'Young's modulus'." Do not certify; return to the explain-back loop.

These four map directly onto the 6-type gap rubric in `feynman.md`: undefined jargon, missing concrete
example, missing causal chain, missing boundary (plus circular definition and broken analogy, which a
cold explanation also exposes).

## Hint-ladder audit

Read the concept's turn log in `ladder-state.json`. The teaching that earned this check must satisfy all
three, or the **hint-ladder** sub-gate fails with the offending turn index:

- **No premature bottom-out.** No Level-3 (give-the-answer) hint may appear before a recorded Level-1
  (point: "look at X - what do you notice?") AND a Level-2 (teach: state the principle, not the step)
  attempt for the same stuck point. A real hint keeps P(answer) < 1 (VanLehn 2006).
- **Recovery after every answer.** Every bottom-out is followed by "now explain why that is the answer
  in your own words." A handed answer with no recovery prompt is a leak, not a hint.
- **Level-down on shutdown.** Every learner "I don't know" is met, on the next tutor turn, by a drop to a
  prerequisite the learner can stand on - a measurable level decrease in `ladder-state.json` - never a
  same-level rephrase of the same question.

Violation example to flag: turn 7 = learner "I don't know"; turn 8 = tutor re-asks the same question
with new words at the same level. Report as `ladder-state.json:turn[8] - same-level rephrase after "I
don't know"; required a level-down to a prerequisite`.

## The deterministic gate - invoke and read verbatim

The critic runs the gate, never eyeballs a checklist:

```bash
node templates/lesson-gate.mjs .supertutor/<topic>
```

It reads the vault control files (or an HTML lesson path) - never guesses - and runs the six sub-gates
IN ORDER. Any FAIL = overall FAIL, printed as `file:line` violations. Copy the ordered PASS/FAIL lines
verbatim into the report; do not paraphrase or soften them.

| Order | Sub-gate | Asserts (control file) |
|---|---|---|
| 1 | never-vague | every concept has a jargon-free `definition`, a concrete `workedExample` (not empty, not analogy-only, not a restated definition), and a `restatementPrompt` (`lesson-claims.json`) |
| 2 | structure | each graded restatement carries one `gapType` from the 6-type enum and exactly one follow-up question - no multi-question dumps, no ungraded restatements (`lesson-claims.json`) |
| 3 | hint-ladder | no bottom-out before a recorded point + teach; every bottom-out has a recovery prompt; every "I don't know" drops a level (`ladder-state.json`) |
| 4 | modality-not-style | no style-matching language ("because you're a visual learner"); the chosen modality carries a `contentStructure` justification (`lesson-claims.json`) |
| 5 | mastery | `mastered:true` requires >= 2 novel transfers `passed:true` and `unprompted:true`; a re-teach uses a different representation id than the one that failed (`ladder-state.json`) |
| 6 | integrity | every `factual:true` claim resolves to a `facts.json` source with a non-empty url; FAIL on any unsourced fact, fabricated citation, or unmarked placeholder |

NEVER weaken or edit the gate to make a concept pass - fix the lesson, not the gate.

## Decision - pass vs fail

**PASS requires ALL of:** gate exit 0 (every sub-gate PASS) AND two unprompted novel transfers AND the
four-point never-vague explanation clean AND the hint-ladder audit clean.

- **On pass:** write `mastered:true` for the concept in `ladder-state.json`; fade support one level
  (worked example -> faded -> independent; rules -> judgment cases as Dreyfus stage rises); schedule
  spaced retrieval at 1 day / 1 week / 1 month and hand off to `review.md`. Spacing the retrieval is what
  converts a fresh pass into durable storage (Cepeda et al. 2006).
- **On fail:** do NOT mark mastered. Name the FIRST failing criterion (a sub-gate or a rubric check) as
  the single actionable gap. Re-teach the concept through a **different representation** than the one
  that failed - never repeat the same explanation louder (`modalities.md` selects by content structure,
  not learner style). Then return to the explain-back loop (`feynman.md`) and re-certify.
- **Cap:** at most 3 critique -> fix cycles. If a criterion still fails after the third, report honestly
  "needs human teacher review" and stop - never soft-pass, never lower the bar to clear it.

## Pitfalls

- **Self-certification.** The tutor running this on its own concept. Only the pedagogy-critic certifies.
- **One-answer mastery.** Accepting a single correct response - it can be a guess or a pattern-match.
  Require two, novel, unprompted.
- **Fake-novel item.** Re-using a worked example or a number the learner already saw; that tests recall
  of an answer, not transfer of the idea.
- **Counting a hinted win.** Any answer reached after a point/teach/bottom-out is prompted - it does not
  count toward the two.
- **Confidence as evidence.** "Sounds sure" is the illusion of knowing (Koriat & Bjork 2005), not
  mastery. Score the explanation, not the tone.
- **Same-representation re-teach.** Re-explaining a failed concept the identical way; the mastery
  sub-gate rejects a re-teach that reuses the failed representation id.
- **Soft-passing at the cap.** Declaring "close enough" instead of "needs human teacher review".
- **Weakening the gate.** Editing `lesson-gate.mjs` to clear a stubborn lesson. Fix the lesson.

## See also

- `pedagogy-core.md` - the always-on teaching authority this check enforces.
- `feynman.md` - the explain-back loop and 6-type gap rubric the rubric draws on.
- `mastery-ladder.md` - Bloom/Dreyfus placement, the two-novel-transfer mastery gate, faded support.
- `modalities.md` - choosing the different representation for a fail-driven re-teach.
- `review.md` - the spaced-retrieval schedule a pass triggers.
- `workspace.md` - the vault control-file schemas the critic reads.
- `sources.md` - full evidence base: Bloom 1984, Koriat & Bjork 2005, Roediger & Karpicke 2006, VanLehn
  2006, Cepeda et al. 2006.
