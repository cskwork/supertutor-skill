# review.md - returning sessions: spaced retrieval + interleaving

Load this when a learner comes back after a gap, or when `interview-check.md` schedules the next
visit. Its job: consolidate prior concepts and kill the fluency illusion before a single line of new
content. The illusion is the enemy here - smooth, fast recall during a session feels like mastery and
is not (Bjork 1994). A returning session that opens with new material instead of retrieval wastes the
one moment when forgetting can be measured and reversed.

This mode reads and writes the vault (`workspace.md`): `ladder-state.json` holds `reviewSchedule`,
`masteredConcepts`, and per-subskill accuracy; every review outcome updates them. No vault, no gate.

## Open closed-book, every time

`Closed-book retrieval` = the learner answers from memory with all notes, the prior lesson, and this
chat history hidden. `Fluency illusion` = mistaking how easily something comes to mind right now
(retrieval strength) for how deeply it is learned (storage strength) - the two are independent, and
re-reading inflates the first while barely moving the second (Bjork 1994; Roediger & Karpicke 2006).

So the first move of any returning session is a production question on prior material, before anything
new. Never open with "last time we covered X, remember?" - that is recognition, and recognition feeds
the illusion (Koriat & Bjork 2005).

Exact opening stems (pick the angle, keep it to one):

- Free recall: "Close everything. In your own words, tell me everything you remember about why a beam
  sags more when it gets longer."
- Short answer: "Without looking - what single property of the cross-section did we say resists
  bending, and what happens to the sag if you double the beam's depth?"
- Apply on a fresh case: "Same idea, new beam: I swap a solid bar for a hollow tube of the same
  weight. More sag or less? Why?"

Worked example. Last session taught recursion (Bloom-Apply). This session opens:

> "Notes closed. What are the two parts every recursive function must have, and what breaks if one is
> missing?"

The learner says "a base case and... it calls itself." That is a partial retrieval, not a pass - the
"what breaks" half is missing. Grade it on the 6-type rubric (`feynman.md`), return one question
("right - now what specifically happens at runtime if the base case never fires?"), and only then move
on. A correct, complete, unprompted answer is what counts toward the schedule.

## Schedule by target retention, not by the calendar

`Spaced practice` = the same total practice split across sessions with gaps between them; it beats the
same practice crammed into one sitting (`massed practice`) on long-term retention - 259 of 271
comparisons in the meta-analysis (Cepeda et al. 2006). Mechanism: returning after a delay lets
retrieval strength decay, so the effort of pulling the memory back deposits more storage strength than
retrieving it while still fresh (Bjork 1994).

The interval scales with how long you need to keep it: to hold something for a week, review after
about a day; to hold it for a year, review after weeks to months (Cepeda et al. 2008). Default ladder
when the goal is durable mastery:

| Goal: retain for | First review | Then | Then |
|---|---|---|---|
| this unit / ~1 week | next session (~1 day) | - | - |
| a course / ~1 month | ~1 day | ~1 week | - |
| long term / months+ | ~1 day | ~1 week | ~1 month |

Adapt, do not freeze it: a clean unprompted pass expands the next gap; a miss contracts it back to the
next session. Write the resulting due-dates into `reviewSchedule` so the next session knows what is owed.

Hard limit: do not stretch the gap so far that the learner can retrieve nothing. Some encoding must
remain accessible for the retrieval effort to build on - a session that returns only blank stares is
re-teaching from zero, not review. If a concept comes back empty, shorten its interval next time.

## Interleave once each piece is individually learned

`Blocked practice` = all problems of one type in a row (every item is a beam-deflection problem).
`Interleaved practice` = mixed types in random order (beam, then thermal expansion, then beam, then
buckling). Blocked feels better and scores higher during the session; interleaved scores lower in the
moment - 60% vs 89% in the study - yet wins decisively on the delayed test (Rohrer & Taylor 2007).

Why: blocked practice hands the learner the method for free (everything in this set is the same kind),
so they drill execution but never the harder step - deciding *which* method applies. Real problems do
not announce their type. Interleaving forces that discrimination.

The load-bearing move: before the learner solves an interleaved item, make them **name the approach
first**.

> Tutor: "Here's a mixed set. Item 1: a shaft transmits torque and you need the angle of twist. Don't
> solve yet - which concept does this call for, and how do you know it isn't a bending problem?"

Confirm the category before they compute. Naming the wrong approach is the failure to catch; a wrong
number after the right category is a smaller, separate issue.

Constraint: interleave only concepts the learner has each cleared in their own blocked introduction.
Mixing in a type they have never practiced alone is confusing, not desirable - it removes the basis for
discrimination (see `cognitive-load.md`, `mastery-ladder.md`). Two mastered concepts minimum before
you shuffle.

## "I already know this, skip it" is a test trigger, not a skip

`Storage strength` = how deeply a memory is embedded; it only grows and never decays. `Retrieval
strength` = how easily it surfaces right now; it peaks just after study and drops with time. A learner
who says "I've got this, skip the quiz" is reporting high retrieval strength - which is exactly the
fluency illusion, and says nothing about storage (Bjork 1994).

So treat the claim as the cue to test, never as permission to skip:

> Learner: "I already know spacing vs massing, move on."
> Tutor: "Perfect - then this is quick. Notes closed: define each in one sentence, and tell me which
> one cramming is and why it fails on a re-test a week later."

If they pass clean and unprompted, you have confirmed it and lost thirty seconds. If they stumble, you
caught a concept that was about to evaporate. Either way the test was worth it; the skip never is.

## Ask in production format; feedback only after the full attempt

`Production format` = the learner generates the answer from memory (free recall, short answer, "work
it out"). `Recognition format` = the answer is on screen to be picked (multiple choice, true/false).
Production drives far stronger long-term retention; recognition lets familiarity pass for knowledge
(Roediger & Karpicke 2006). For review, prefer production. Re-reading the old lesson is the weakest
option of all - high familiarity, low retrievability (Dunlosky et al. 2013).

Rules for the asking:

- Wait for the whole attempt before any hint or correction. Interrupting mid-retrieval replaces the
  learner's effort with yours and erases the benefit. Let the silence sit.
- Give immediate, specific corrective feedback *after* the attempt closes - unresolved errors at
  review time reinforce the misconception instead of fixing it.
- Frame it low-stakes out loud: "this is practice, not a grade." Anxiety impairs retrieval; a surprise
  high-stakes quiz removes the very gain you are reviewing for.

Vary the angle across a review set so the learner reconstructs the concept, not one rehearsed
sentence:

- Recall: "Define [term] without using [the word it is usually defined by]."
- Why: "Why does [step] exist - what fails without it?"
- Apply/transfer: "New case: [one-line novel scenario]. What happens?"
- Edge/boundary: "Give me one situation where this rule does NOT hold."

A transfer item that the learner has not seen before and answers unprompted is the gold standard - it
is also what `interview-check.md` records as a `novelTransfers` entry toward `mastered:true`.

## Score every item back into the vault

Review is not just rehearsal; it is fresh evidence about the ladder. After each item, update the vault
(append, never silently overwrite a prior entry - `workspace.md`):

1. Record the outcome and refresh the subskill's accuracy in `ladder-state.json` `subskills`.
2. On a clean unprompted pass, expand that concept's `reviewSchedule` interval to the next rung.
3. On a failed spaced retrieval of a `masteredConcepts[]` entry, **demote it**: remove it from
   `masteredConcepts`, lower its accuracy and Bloom/Dreyfus placement to match what they actually
   showed, reset its interval to next-session, and re-enter the teach loop at step 4-5
   (`pedagogy-core.md`).
4. A demoted concept must be re-taught through a *different* representation than the one that failed
   (the mastery sub-gate rejects a re-teach that reuses the prior representation id) - swap the
   diagram for a scenario, the formula derivation for a worked case (`modalities.md`).

Worked example. `ladder-state.json` lists `second-moment-of-area` in `masteredConcepts`, scheduled for
its 1-week review. Closed-book, the learner cannot say why depth matters more than width. That is a
failed spaced retrieval: drop it from `masteredConcepts`, set its subskill accuracy down, reschedule to
next session, and re-teach - this time with a hands-on case (a ruler bent flat-side vs edge-on) rather
than the cross-section integral that failed. The change is written, so the independent critic's gate
sees the demotion instead of a stale `mastered:true`.

## Pitfalls

- Opening with new content. The decay since last session is exactly what review exists to catch; new
  material before retrieval throws it away.
- Recognition disguised as retrieval. "Remember when we said...?", a multiple-choice prompt, or
  re-reading the old lesson all let familiarity masquerade as recall (Koriat & Bjork 2005).
- Feedback before the attempt closes. Jumping in with the answer the moment the learner pauses cancels
  the generation effect (Slamecka & Graf 1978) and the retrieval benefit.
- Spacing so far that nothing comes back. An empty retrieval is re-teaching, not review - shorten the
  interval next time; some residual encoding must remain.
- Interleaving untaught types. Shuffling in a concept the learner never cleared in isolation removes
  the basis for discrimination and produces confusion, not desirable difficulty.
- Re-teaching a demoted concept with the same explanation that just failed. Repetition is not a
  corrective; change the representation.
- Skipping review on the learner's say-so. "I know this" is high retrieval strength reporting itself -
  test it, do not trust it.
- Not updating the vault. A pass or a demotion that never reaches `ladder-state.json` is invisible to
  the gate; the schedule and the mastery record drift out of sync with reality.

## Sources

Load-bearing claims trace to `sources.md`; the URLs below appear in the skill's cited evidence base.

- Roediger & Karpicke (2006), retrieval beats restudy on delayed recall:
  https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x
- Cepeda et al. (2006), spacing meta-analysis (259/271):
  https://pubmed.ncbi.nlm.nih.gov/16719566/
- Rohrer & Taylor (2007), interleaving (60% vs 89%, delayed-test win):
  http://uweb.cas.usf.edu/~drohrer/pdfs/Interleaved_Mathematics_Practice_Guide.pdf
- Bjork (1994), storage vs retrieval strength, desirable difficulties, fluency illusion:
  https://www.structural-learning.com/post/robert-bjork-teachers-guide-desirable
- Koriat & Bjork (2005), illusions of competence during study:
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Koriat_RBjork_2005.pdf
- Slamecka & Graf (1978), the generation effect:
  https://psycnet.apa.org/record/1980-20399-001
- Dunlosky et al. (2013), practice testing + distributed practice rated high-utility:
  https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
