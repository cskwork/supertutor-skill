# mastery-ladder - place the learner, pick the just-reachable step, gate the advance

Loaded in PRACTICE mode and in the DIAGNOSE step of every mode. It answers three questions: where is
the learner now (a Bloom cell plus a Dreyfus stage), what is the next task that just fits (the Zone of
Proximal Development), and when may they advance (the mastery gate). `pedagogy-core.md` is the law this
obeys; this file is the placement-and-progression instrument. For load sequencing and worked examples
read `cognitive-load.md`; for the certifying interview read `interview-check.md`.

You read and write one control file here: `ladder-state.json` in the vault (`reference/workspace.md`).

## The state you maintain per learner+topic

Every field below lives in `ladder-state.json`. Diagnose writes it; every turn updates it; the gate's
MASTERY and HINT-LADDER sub-gates read it.

- `bloomLevel` - the highest cognitive operation the learner performs unaided (Remember .. Create).
- `dreyfusStage` - their relationship to the rules (novice .. expert/master).
- `subskills` - a map of `{name: accuracy}`, the rolling correct-rate of each drillable piece.
- `zpdTarget` - the one subskill you are currently training (the one in the 40-70% band).
- `masteredConcepts` - concepts that cleared the gate; only set after two clean transfers.
- `reviewSchedule` - spaced-retrieval dates (1 day / 1 week / 1 month); see `review.md`.

## Placement: the three-probe diagnostic (run this before you teach)

Probe prior knowledge with low-stakes questions, ascending in demand. Record the highest level passed
WITHOUT a hint. A hesitation past ~60 seconds with no partial attempt marks the ZPD boundary - give a
worked example and stop climbing (Vygotsky 1978; Wood, Bruner & Ross 1976). Running example: simple DC
circuits.

1. **Define probe** (Remember/Understand). "State Ohm's law and what each letter means." Pass = they
   give V = I x R and name voltage, current, resistance in their own words.
2. **Apply probe** on a NOVEL variant (Apply). "A 12 V source drives a single 4 ohm resistor - what
   current flows?" Pass = 3 A, computed, not recalled from a seen example.
3. **Analyze probe** (Analyze). "Two resistors in parallel - explain why the total resistance is LESS
   than either one, and where that reasoning would break." Pass = a causal account, not a restated rule.

Write the highest clean pass to `bloomLevel`, the Dreyfus read (below) to `dreyfusStage`, and seed
`subskills` with the pieces the probes exposed. Do not teach above the next rung or below the passed one.

## Bloom ladder (revised 2001) - a cognitive-demand descriptor, not a lesson stage

Six ordered operations; each one presupposes the ones beneath it (Anderson & Krathwohl 2001). It
classifies the demand of the QUESTION you ask, not the phase of the lesson - one lesson can touch
several rungs. To step demand up one rung, switch to the next row's verbs.

| Rung | Plain meaning | One-question probe (circuits) | Verbs that step demand up |
|---|---|---|---|
| Remember | Retrieve a fact unchanged | "Write the formula for power." | define, list, name, recall |
| Understand | Restate the meaning in new words | "Explain why current is the same everywhere in a series loop." | explain, summarize, classify |
| Apply | Run a known procedure on an unseen but recognizable case | "Solve this 2-resistor circuit you have not seen." | use, solve, compute, execute |
| Analyze | Break a whole into parts and relate them | "Which resistor runs hottest, and why?" | compare, distinguish, categorize |
| Evaluate | Judge against explicit criteria and defend it | "Is a 0.25 W resistor safe here? Justify." | judge, critique, justify, defend |
| Create | Produce something that did not exist | "Design a divider that outputs 5 V from 12 V." | design, construct, formulate |

Rule of thumb: if the learner passes Apply, your next probe uses an Analyze verb ("compare", "distinguish").
Asking a Remember-level learner to Evaluate demoralizes; asking an Analyze-level learner only to Remember
bores - both produce no durable learning.

## The four knowledge types (the second axis)

A learning objective is a CELL - a cognitive rung crossed with a knowledge type - not just a level
(Anderson & Krathwohl 2001). A learner can be Apply-Procedural yet only Understand-Conceptual on the
same topic, so probe both axes.

- **Factual** - isolated facts. "1 A = 1 coulomb per second."
- **Conceptual** - how facts form categories and principles. "Series vs parallel and why they differ."
- **Procedural** - step-by-step methods. "How to collapse a parallel pair into one resistance."
- **Metacognitive** - awareness of one's own thinking. "When do I check my answer against a sanity bound?"

## Dreyfus ladder - the shift from following rules to acting on intuition

Five stages (plus master) describing how the learner's relationship to rules changes as skill grows
(Dreyfus & Dreyfus 1980). Detect the stage with three probes, then match the instruction to it -
explicit rules help a novice and actively HARM an expert by forcing automatic skill back into slow
deliberation.

Detection probes: (1) "Explain the last decision you made." (2) Hand them an edge case that breaks a
common rule. (3) "What would you do differently next time?"

| Stage | Plain meaning | What the probes reveal | Match instruction to it |
|---|---|---|---|
| Novice | Follows context-free rules step by step; cannot adapt | Recites a rule ("step 3 because the sheet says so"); freezes on the edge case; no answer to "differently" | Give explicit worked examples and one rule at a time |
| Advanced beginner | Starts noticing situation patterns ("if it looks like X, do Y") | Cites a maxim; mis-applies the rule on the edge case | Add more situational maxims; label which cue triggers which move |
| Competent | Picks a goal to organize action; feels ownership (pride, regret) | Describes a plan; pauses and deliberates on the edge case | Give cases that force goal-selection and trade-offs |
| Proficient | Reads the whole situation intuitively, still deliberates the move | Names the pattern fast; flags when a standard rule is wrong here | Give ambiguous situations that require judgment, not recipes |
| Expert | Perceives and acts as one fluid motion; struggles to explain it | "I just knew"; adapts to the edge case instantly | Give reflection and a teaching role; do NOT re-impose rules |
| Master | Experiments with the repertoire to extend the domain itself | Invents a new approach and can say when the field's rule fails | Co-investigate; surface and test their tacit model |

## Deliberate practice - the PRACTICE micro-loop

Practice that improves skill is not volume; it is targeted, effortful, and fed back (Ericsson, Krampe &
Tesch-Romer 1993). Four required conditions:

1. **Targeted weak subskill** - the single bottleneck that, if fixed, most improves the whole. Pick the
   entry in `subskills` with the highest recent error rate, not a general "do more problems".
2. **Stretch-zone difficulty** - just beyond reliable performance, achievable with effort (the ZPD).
3. **Immediate specific feedback** - binary correct/incorrect within seconds, plus a one-sentence name
   for the error type ("you added the parallel resistances instead of using the reciprocal sum").
4. **Repetition with refinement** - run the same isolated subskill again with the correction applied.

The loop: isolate one subskill, strip every other demand, run 10-25 minutes, give binary feedback after
each attempt, reflect ("what changed?"), repeat. Effective deliberate practice is rarely enjoyable;
1-2 hours per day is near the ceiling and more than ~4 hours yields diminishing returns (Ericsson et al.
1993). Set honest expectations: deliberate practice is necessary but not sufficient. A meta-analysis of
88 studies put its share of performance variance at ~26% for games, 21% for music, 18% for sports, and
4% for education (Macnamara, Hambrick & Oswald 2014); a 2019 replication cut the headline estimate from
48% down to ~26% (Macnamara & Maitra 2019). Never promise that hours alone guarantee mastery.

## ZPD next-step selection - the core PRACTICE algorithm

The Zone of Proximal Development is the gap between what the learner does alone and what they do with
support. Tasks below it only consolidate; tasks above it frustrate. Aim every exercise INTO the band.

1. **Target the 40-70% subskill.** Pick the `subskills` entry whose accuracy sits between 40 and 70
   percent. Below ~30% is above the ZPD (back up one prerequisite); above ~80% is below it (it is already
   learned - move on or schedule review).
2. **Give the task with no help first.** Observe: attempts it / partially right / abandons.
3. **On a stall, add ONE hint, then pause.** Use the hint ladder from `feynman.md`: Level 1 point
   ("look at the two resistors - are they on the same two nodes?"), then Level 2 teach (state the
   principle, not the step) only after a real attempt, then Level 3 bottom-out only after Level 2 fails.
   If one hint unblocks them, you are in the ZPD. If the maximum budget (3-4 hints) still fails, the task
   is above the ZPD - step back a level. After any bottom-out require "now explain why that is the
   answer in your own words", and on the next turn drop a level (the HINT-LADDER sub-gate checks this).
4. **Fade as accuracy rises toward 80%.** Withdraw hints, then withdraw the worked example, then
   interleave with other subskills (`cognitive-load.md`). Scaffolding that never fades breeds dependency.

Concrete pass: "combine parallel resistances" sits at 0.55 in `subskills`. Task: "6 ohm and 3 ohm in
parallel - total?" Learner writes 9. Level 1 hint: "Is parallel resistance bigger or smaller than the
smallest resistor?" They self-correct toward the reciprocal sum and get 2 ohm. One hint unblocked them -
squarely in the ZPD. Log the attempt; accuracy ticks up.

## The mastery gate - when the learner may advance

Do not gate on time; gate on demonstrated performance (Bloom 1984; Guskey 2007). After a teaching unit,
run a 5-10 item formative probe.

- **Threshold 80-90%.** Below it, do NOT repeat the same explanation - re-teach through a qualitatively
  DIFFERENT representation (analogy -> diagram, verbal -> worked example; see `modalities.md`), then
  re-probe. The corrective-and-retest loop, not the threshold alone, is what mastery learning buys you.
  Calibrate the bar to stakes: safety-critical procedural skills want 90-95%; conceptual understanding
  tolerates more ambiguity. One blanket threshold across all knowledge types is an error.
- **Two clean transfers.** `mastered:true` is allowed only after >= 2 `novelTransfers` items the learner
  has never seen, each `passed:true` AND `unprompted:true`. One correct answer can be a guess or a
  pattern-match. The MASTERY sub-gate also rejects any re-teach that reuses the prior representation id.
- **Effect floor.** One-to-one tutoring plus mastery learning produced ~2 standard deviations over
  conventional instruction in Bloom's studies (Bloom 1984); classroom mastery learning lands near
  0.5-0.6 SD (Guskey 2007). This is the ceiling the role-separated loop reaches for.

On a clean pass: set `mastered`, fade support one level, and write the 1 day / 1 week / 1 month dates
into `reviewSchedule`. The independent `pedagogy-critic` runs the actual gate (`interview-check.md`); the
tutor never certifies its own work.

## Pitfalls

| Pitfall | Why it is wrong | Do this instead |
|---|---|---|
| Counting hours as deliberate practice | Volume without the four conditions plateaus skill; practice explains well under half of variance (Macnamara et al. 2014) | Target the highest-error subskill with immediate feedback, not time-on-task |
| One mastery threshold for everything | Procedural safety skills need 90-95%; concepts tolerate ambiguity | Set the threshold by knowledge type and stakes |
| Re-teaching a failed concept the same way | The explanation already failed once; repetition is the top mastery-learning error | Switch representation (`modalities.md`) before the retest |
| Treating Bloom levels as lesson stages | The taxonomy classifies the demand of a question, not a phase | Use the verbs to set each probe's demand; mix rungs in one lesson |
| Treating Dreyfus as a static scorecard | Its authors built it as an acquisition model; stage is context-bound | Re-detect per sub-domain; a person can be expert at one part, novice at the next |
| Giving an expert more explicit rules | Forces automatic skill back into slow deliberation and degrades it | Give experts reflection and teaching, novices explicit worked examples |
| Calling one correct answer mastery | It may be a guess or a memorized path | Require two unseen, unprompted transfers before `mastered:true` |
| Handing over the answer when they stall | Collapses the ZPD and kills the learning | One hint, then pause and observe; ladder up only on genuine attempts |

## When this governs

DIAGNOSE (placement, every mode) and PRACTICE (the deliberate-practice loop). It sets `zpdTarget` and
`bloomLevel`/`dreyfusStage` that every other mode reads. Sequencing of the chosen step is in
`cognitive-load.md`; the explain-back grading is in `feynman.md`; the advance is certified in
`interview-check.md`; spaced retrieval of mastered concepts is in `review.md`. Evidence base and full
citations: `sources.md`.
