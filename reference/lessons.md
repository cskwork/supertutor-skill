# lessons.md - LESSON-BUILD: author a reusable lesson the gate cannot fault

Load this in **LESSON-BUILD** mode: the learner asked you to *make a lesson* or *build a study unit* -
a reusable artifact (HTML by default, markdown when no browser), not a single live turn. The artifact is
the deliverable; once it exists, **LEARN** or **FEYNMAN-DRILL** runs it turn by turn. Obey
`pedagogy-core.md` first - every rule here is that authority compiled into a file format. The tutor
*builds* the lesson; the independent **pedagogy-critic** *gates* it. No self-approval, no vault, no gate.

A lesson is a teaching unit, not an article. The test is unchanged: can the learner rebuild each concept
from memory and explain it in their own words? A page that reads beautifully and checks nothing has
taught nothing. Build difficulty and retrieval *into the file* so the learner produces, not re-reads.

## When this mode runs

- Signal: "make me a lesson on X", "build a study unit", "write a chapter on X", wants something reusable.
- Tie-break: "make a lesson AND teach it" -> LESSON-BUILD authors the artifact, then LEARN/FEYNMAN-DRILL
  runs it. A stated wrong belief still routes to SOCRATIC-PROBE first; a one-off explain-back stays inline.
- Scope rule: one tightly-bounded objective per lesson. A large topic becomes *more* lessons, never a
  thinner explanation per concept. Working memory holds ~4 items - teach fewer things, each one fully.

## The lesson skeleton (fixed order)

Author every lesson in this order. Each block has a job; skipping one is a defect.

1. **Objectives** - what the learner can DO afterward, as Bloom-cell action verbs.
2. **Key Terms box** - pre-training: name and define every term before it appears in prose.
3. **Concept sections** - one concept per section, each developed to textbook depth.
4. **Teach-It-Back** - a generation prompt closing every concept section, graded on a rubric.
5. **Spaced-review schedule** - retrieval questions dated for next session / 1 week / 1 month.

## Objectives = Bloom-cell action verbs

State each objective as "the learner can [verb] [object]", verb chosen from the target Bloom cell - never
"understand X" (untestable) (Anderson & Krathwohl 2001). The verb fixes the cognitive demand and tells
the gate what a passing answer looks like. See `mastery-ladder.md` for the full taxonomy.

| Bloom level | Action verb | Objective for a "why a beam sags" lesson |
|---|---|---|
| Remember | state, name | State the Euler-Bernoulli relation between bending moment and curvature. |
| Understand | explain | Explain why a loaded beam's bottom fibres stretch and top fibres compress. |
| Apply | compute, use | Compute a cantilever's tip deflection with delta = PL^3 / (3EI). |
| Analyze | predict, contrast | Predict how doubling beam depth changes deflection, and justify it from I = bh^3 / 12. |

Pick the highest cell the learner's ZPD can reach (set in `ladder-state.json`); write one objective per
cell up to it. Three to five objectives is a lesson; ten is a course.

## Key Terms pre-training box

Front-load the vocabulary in a box *before* any concept prose, so working memory spends on the idea, not
on decoding words mid-sentence (pre-training principle, Mayer 2009). Every row carries three columns: the
**term**, a **one-sentence jargon-free definition**, and **one concrete real example**. An example is a
solved instance with real values - not an analogy, not a restatement of the definition. This is the
never-vague rule applied to the glossary.

| Term | Plain definition (one sentence) | One concrete example |
|---|---|---|
| Bending moment | The turning effect of a load that tries to rotate one part of the beam against another, in newton-metres. | A 10 N weight on the end of a 2 m shelf bracket makes a 20 N*m moment at the wall. |
| Second moment of area (I) | A number for the cross-section shape saying how hard it is to bend; larger when material sits far from the centre line. | A floor joist stood on its 10-inch edge has about 25x the I of the same board laid flat. |
| Young's modulus (E) | How stiff the material itself is - the stress needed to stretch it by a given fraction. | Steel's E is about 200 GPa, roughly 20x stiffer than oak's ~10 GPa. |

The box is an **index, not the teaching**. It locates each concept; the concept sections develop them.
A term must not appear in prose before its row exists.

## Per-section structure (every concept page)

Develop each concept as a textbook section, in this order. Render diagrams with dual coding - a label
plus adjacent narration, never a redundant caption (see `modalities.md`).

1. **Overview sentence (signaling).** One sentence naming what this section establishes, bold first key
   term, so the reader knows the destination before the detail (signaling principle, Mayer 2009).
   - Example: "**Tip deflection** grows with the cube of length, so a beam twice as long sags eight times
     as far under the same load."
2. **Worked example with annotated reasoning.** A real solved instance, each step justified by *why*, not
   just *what* - worked examples beat unguided problem-solving for novices (Sweller 1988).
   - Example: "Cantilever, P = 100 N, L = 2 m, steel I = 5e-6 m^4, E = 200e9 Pa. delta = PL^3 / (3EI).
     The L^3 sits on top because bending angle accumulates along the length AND the lever arm grows - two
     length effects multiply. delta = (100 * 8) / (3 * 200e9 * 5e-6) = 2.7e-4 m = 0.27 mm."
3. **Faded practice.** Re-pose the same problem with one support removed - drop a number, then a step,
   then the formula - so the learner supplies the missing piece. Fade as accuracy rises; full worked
   examples help novices but *slow* experts (expertise-reversal, Kalyuga et al. 2003).
   - Example: "Now L doubles to 4 m, everything else fixed. delta scales by 2^3 = ___ . Solve for the new
     deflection." (Answer: 8x -> 2.16 mm.)
4. **One-sentence takeaway.** The single idea to keep, tied back to the overview.
   - Example: "Length dominates beam sag - it enters cubed, while stiffness and shape enter only linearly."

## Teach-It-Back prompt + grading rubric

Close every concept section with a generation prompt, not "does that make sense?" - generated answers
encode far more durably than re-read ones (generation effect, Slamecka & Graf 1978). The prompt must force
the learner to produce; grade the answer against a fixed bar so the gate can check it.

Prompt stem:

> Explain to a smart 12-year-old, in your own words, why [concept]. Give one real example, say *why* it
> works, and name one case where it does NOT hold.

| Verdict | What the answer contains | Action |
|---|---|---|
| Strong | A concrete instance + the causal *why* + a correct non-case/boundary. | Mark the concept ready for transfer; advance only after MASTERY-CHECK. |
| Weak | A reworded definition, or an example with no mechanism, or no boundary. | Name the FIRST gap by the 6-type rubric (see `feynman.md`); return ONE Socratic question. |

A boundary case for the beam lesson, for instance: "delta = PL^3/(3EI) is for a cantilever with a tip
*point* load - a uniformly spread load uses delta = wL^4/(8EI) instead." A learner who can state that
limit understands the formula; one who cannot has memorised it.

## Spaced-review schedule baked into the artifact

End the lesson with a dated retrieval schedule, not a "review the above" note. Spacing across sessions
beats massed study (Cepeda et al. 2006); the questions must be **retrieval** (recall from memory), never
re-reading (Roediger & Karpicke 2006). Write the dates into `ladder-state.json.reviewSchedule` so
`review.md` can drive the returning session.

| When | Format | Example question for the beam lesson |
|---|---|---|
| Next session (~1 day) | Free recall, closed-book | Without notes, write the cantilever deflection formula and say what each symbol does. |
| 1 week | Transfer + interleave a prior concept | A diving board and a balcony both stick out 2 m. Which sags more, and why? |
| 1 month | Apply / create | Design a shelf that sags under 1 mm at a 5 kg load; name the variable you'd change first and why. |

Interleave only concepts already individually learned, and make the learner name which approach applies
before solving (see `cognitive-load.md`). Treat "I already know this, skip it" as a cue to test, not skip.

## The HTML artifact: build from the scaffold, pass the structural gate

Default to an interactive HTML lesson. **Copy `templates/teach/assets/` once per workspace** and build
from `lesson-template.html` - one shared `lesson.css` + `lesson-book.js` + `quiz.js` so the whole course
looks like one thing. Do not hand-roll a one-off stylesheet. The blueprint sections map onto the scaffold
pages: `intro` (objectives hook), `terms` (Key Terms box), one `concept-N` page per concept, `trace`
(the worked example end-to-end), `play` (an optional simulator), `check` (the quiz), `wrap` (takeaway +
spaced-review + primary source).

`node templates/lesson-gate.mjs <lesson.html>` deterministically rejects a reading-only, off-scaffold, or
vague page. Required markup, all load-bearing:

| Gate check | Required markup |
|---|---|
| Complete, localized document | `<html lang="...">` ... `</html>` |
| On-scaffold (one course) | links `assets/lesson.css`, loads `assets/lesson-book.js` and `assets/quiz.js` |
| Paged book, not a scroll | `<main class="book">` with `.pages-track`, a `.pager`, and >= 2 `<section data-title="...">` |
| Never vague (defines a term) | at least one `<dfn>`, `<dl>`, or `.sg-def` |
| Interactive (learner DOES something) | at least one `.sg-quiz` with `.sg-options` and one `data-correct` option |

A markdown-only lesson skips the HTML checks but still faces the never-vague vault gate: every concept in
`lesson-claims.json` needs a jargon-free `definition`, a concrete `workedExample`, and a
`restatementPrompt` (see `workspace.md`). NEVER weaken the gate to pass a lesson - fix the lesson.

## Accessibility and media

- WCAG AA contrast on all text; the shipped `lesson.css` carries visible focus, >= 44px tap targets, and
  `color-scheme` - keep them when you adapt.
- Honor `prefers-reduced-motion`; any animation must have a static fallback.
- Captions/transcript for every audio or video element.
- Diagrams use dual coding (Paivio): a labelled figure with adjacent narrating text, not a decorative
  image and not a caption that just repeats the prose (redundancy principle, Mayer 2009).

## Integrity: every fact sourced or cut

Every claim tagged `factual:true` (a dated figure, a formula constant, a citation, an empirical number)
must resolve to a `facts.json` entry with a non-empty `url`, verified by the **researcher** role, not
pulled from memory. The beam numbers above (steel E ~200 GPa, etc.) are factual and must be sourced before
they ship. Unverifiable -> a documented placeholder, never an invented fact, citation, or date. See
`sources.md` for the evidence base and the never-fabricate backstop.

## Pitfalls

- **Beautiful but inert.** Polished prose with a promised "check your understanding" that never renders -
  the gate flags it; ship a hydrated `.sg-quiz`.
- **Index mistaken for teaching.** A Key Terms table followed by one-line concept "explanations". Develop
  each concept: definition, why, how, worked example, boundary.
- **Analogy as the worked example.** "Sagging like a hammock" is not a solved instance. Anchor on one real
  case with real values, traced end to end.
- **"Understand X" objectives.** Untestable. Use a Bloom action verb the gate and the learner can both check.
- **Massed re-reading dressed as review.** "Read the summary again" is not retrieval. Schedule closed-book
  recall and transfer at 1 day / 1 week / 1 month.
- **Self-approval.** The tutor that wrote the lesson cannot certify it. Hand off to the pedagogy-critic;
  report the gate's command output verbatim.

**Done =** one objective per lesson stated as Bloom verbs; Key Terms box with definition + real example per
term; each concept developed (overview -> worked example -> faded practice -> takeaway) with a graded
Teach-It-Back; a dated spaced-review schedule of retrieval (not re-reading) questions; built from the
shared scaffold; every fact sourced or cut; and the independent critic's `lesson-gate.mjs` green before it
is called done.
