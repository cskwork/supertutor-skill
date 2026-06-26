# feynman.md - FEYNMAN-DRILL: the explain-back engine

Load this in **FEYNMAN-DRILL** mode (learner says "check my understanding", "let me explain it
back", "am I getting this right", or offers their own explanation). It is also the grading engine the
**LEARN** mode borrows for step 5 of the teach loop. The contract lives in `SKILL.md`; the always-on
rules live in `pedagogy-core.md`. This file makes one job operational: make the learner explain,
grade the explanation against a fixed rubric, and return one Socratic question per gap - never the
answer.

The Feynman Technique is a four-step self-testing loop drawn from Feynman's documented study habit -
a "Notebook of Things I Don't Know About" in which he disassembled each branch of physics until he
could rebuild it in plain words (Gleick 1993, via calnewport.com/the-feynman-notebook-method). It
works because explanation is **retrieval under output pressure**, and retrieval exposes the exact
boundary between "I recognize this" and "I can produce this."

## Why it works (state it, do not over-explain it)

- **Generation effect.** Producing an explanation from memory encodes far more durably than re-reading
  it. Across 86 studies the generation advantage is about half a standard deviation (d ≈ 0.40, Bertsch et
  al. 2007 meta-analysis); the phenomenon was first delineated by Slamecka & Graf 1978, and in one fMRI
  study generated items hit 87% recall versus 65% for read items (Rosner et al. 2013). So: never hand the
  learner a statement to nod at - make them generate it.
- **Protege effect.** Believing you must teach someone primes deeper processing - you hunt causal
  links, anticipate questions, and monitor your own gaps - even if you never actually teach anyone
  (Chase et al. 2009). So: install the teaching frame before the first word.
- **Illusion of knowing.** Familiar text reads fluently, and the brain mistakes that fluency for stored
  knowledge - "foresight bias", because the answer is present at study but absent at test (Koriat &
  Bjork 2005). So: a failed explanation is the data, not an embarrassment. Make the gap concrete.
- **Self-explanation.** Generating inferences about *why* and *how* (not paraphrasing) drives
  understanding; prompted self-explanation runs g=0.55 across 64 studies (Chi 1994; Bisra et al. 2018).
  So: every prompt should force a causal inference, not a recall of wording.

## Set the frame before any explanation (protege effect)

Two moves, in order, before the learner explains a single thing.

1. **Install the teaching frame.** Say: "Teach this to an imaginary student who has never heard of it.
   Your goal is to explain it so well they could answer a test question on their own." This framing
   alone changes how they encode (Chase et al. 2009). Reinforce after: "What would your student ask
   you first - and how would you answer it?"
2. **Take the confidence reading.** Ask: "On a scale of 1 to 5, how sure are you that you understand
   [concept] right now?" Record the number. This is the *before* half of the confidence-delta.

## The 4-step protocol (run it verbatim)

| Step | Tutor move | Exact stem | What you are doing |
|---|---|---|---|
| 1. Choose | Pin one specific concept, not a topic | "Which one thing do you want to nail - [concept], not the whole subject?" | Scope to a single concept (working memory ~4 items; see `cognitive-load.md`) |
| 2. Explain simply | Force a from-memory explanation, no notes, zero jargon | "Close your notes. Explain [concept] to me as if I am a smart 12-year-old who has never heard of it." | Trigger generation + retrieval, not re-reading |
| 3. Find gaps | Mark every stumble, undefined term, circular line, missing link | (you mark silently, then grade - see rubric) | Surface the exact boundary of real knowledge |
| 4. Simplify + analogize | Return to source ONLY for the marked gaps, then rebuild with a *predictive* analogy | "Now give me an analogy - and one I could use to predict what happens in a new case." | Consolidate; test that the analogy makes predictions, not decoration |

Hard rules on the protocol:

- **Closed book at step 2.** If the learner reads from notes or a textbook, stop: "Close it - explain
  from memory. Reading it back is copying, not learning." Open-book explanation is a copying task; it
  triggers neither the generation effect nor gap exposure.
- **Stop at the first undefined term.** Do not let a jargon word pass. "You said [term] - what does that
  mean in plain language?" Do not proceed until they unpack it *without* using the original word.
- **At least two to three passes.** The first pass exposes only surface gaps. Each pass resolves the
  surface layer and reveals a deeper missing causal link or boundary. One pass is never enough.

## The 6-type gap rubric (the canonical gate enum)

After each explanation, find the **first** gap present, name its `gapType`, and return **exactly one**
Socratic question - the `followUpQuestion`. Never dump the whole list; that overwhelms and discourages.
These six strings are the enum the `STRUCTURE` sub-gate checks in `lesson-claims.json`; use them
verbatim.

| `gapType` | Plain meaning | Tell-tale sign | The fix-question (`followUpQuestion`) |
|---|---|---|---|
| `missing causal chain` | Says *what* happens but not *why* or *how* | "It just sinks." / states the outcome, skips the mechanism | "What causes X to happen - walk me through it in order?" |
| `circular definition` | Uses the target word to define itself | "Osmosis is when osmotic pressure causes osmosis." | "Explain that without using the word [term]." |
| `undefined jargon` | Drops a technical term without unpacking it | "Because of buoyancy." (term, not mechanism) | "What does [term] mean in plain language?" |
| `missing boundary` | Cannot say where the concept stops applying | Treats the rule as universal | "Give me one example where this would NOT be true." |
| `missing concrete example` | States the rule only in the abstract | All principle, no instance | "Give me one real instance of this you could point to." |
| `broken analogy` | Analogy fails under a specific new scenario | "It's like a sponge." (does not predict) | "If your analogy holds, what happens when [modified scenario]?" |

Selection rule when several gaps coexist: grade the **most foundational** first. A `circular
definition` or `undefined jargon` blocks everything above it, so clear those before `missing boundary`
or `broken analogy`. The rubric grades the *thinking*, not the prose - never interrupt for phrasing.

## The grading loop (one gap, one question, ladder the hints)

1. **One gap per turn.** Name the first gap, ask its one fix-question, wait. Silence is fine.
2. **Acknowledge each fix before the next.** "Good - now I have the causal link." Then move to the next
   gap. Naming the win makes the progress concrete and keeps the loop motivating.
3. **Ladder hints, never leap** (VanLehn 2006; see `socratic.md`). Level 1 *point* ("look at what
   changes between the start and the end - what do you notice?") -> Level 2 *teach* the principle (not
   the step) only after a genuine attempt -> Level 3 *bottom-out* (give the answer) only after Level 2
   fails. A real hint keeps the probability of a correct answer below 1.
4. **Answer only after two failed retrieval attempts**, and never as a clean correction. Give it, then
   immediately: "Here is the answer - now explain back to me in your own words why it is the answer."
   Handing the answer early re-establishes the illusion of knowing (the learner reads it, it feels
   right, confidence returns without knowledge).
5. **On "I don't know", back up a level** - never rephrase the same question. Drop to a prerequisite
   they can stand on, probe what they *do* know that is related, then climb back (see `mastery-ladder.md`
   for ZPD calibration).
6. **Close the confidence-delta.** After the explanation - stumbles and all - ask: "Now that you have
   tried to explain it, how would you revise your 1-to-5 rating?" If they stay overconfident after a
   visible failure, make it concrete: "You rated yourself a 4, but you could not define [term] or say
   why [step] leads to [step]. What does that tell you about what re-reading actually teaches you?"
7. **Stop at gap-free, max 3 passes per concept.** Persistent failure is not a soft pass - re-teach
   through a *different* representation (see `modalities.md`), never by repeating the same words.

## Worked example: "why does ice float on water"

Concept chosen (step 1): ice floats on liquid water. Frame installed, confidence = 4/5.

- **Learner (step 2):** "Ice floats because it's lighter than water."
- **Gap = `missing causal chain`.** A 1 cm cube of ice is not lighter than an ocean. Tutor: "A whole
  iceberg is far heavier than a cup of water, yet it floats. What actually decides whether something
  floats - walk me through it?"
- **Learner:** "Oh - density. Ice is less dense, so it floats. It's about buoyancy."
- **Gap = `undefined jargon` (buoyancy).** Tutor: "You said buoyancy - what is that, in plain words,
  with no physics terms?"
- **Learner:** "The water pushes up on the ice... because the ice pushes the water out of the way."
- **Gap = `missing causal chain` again, deeper.** Tutor (Level 1 point): "Right - it pushes water out
  of the way. Compare the weight of the water it shoves aside to the weight of the ice. Which wins?"
- **Learner:** "The water it pushes aside weighs more than the ice, so there's a net push up. And ice
  is less dense because water expands when it freezes."
- **Acknowledge:** "Good - that is the whole causal chain: water expands on freezing -> ice is less
  dense -> the displaced water outweighs the ice -> net upward push." Now probe `missing boundary`:
  "Give me one liquid where ice would NOT float."
- **Learner (after a Level-1 hint - "think of a liquid less dense than ice"):** "Pure alcohol - ice
  sinks in ethanol because the alcohol is less dense than the ice."
- **Step 4, analogy, test it is predictive:** "Analogy?" - "A beach ball held underwater." Tutor: "If
  that analogy holds, what happens to the upward push as I push the ball deeper?" If they answer "it
  stays the same once fully submerged, because the displaced volume stops changing," the analogy is
  predictive and earned. If they cannot, it is decoration - send them back to the displaced-weight idea.

Confidence-delta closed: re-rate dropped from 4 to 2 after the buoyancy stumble, then recovered to 4
on a clean re-explanation. The drop is the illusion of knowing made visible.

## Wire it into the vault

Every graded restatement writes one entry into `lesson-claims.json` (schema in `workspace.md`):

- `definition` - jargon-free, no term it cannot also unpack in the same entry (the `NEVER-VAGUE` and
  `circular definition` checks key off this).
- `workedExample` - a concrete solved instance like the ice case, not an analogy and not a restated
  definition.
- `restatementPrompt` - the own-words prompt you ended on.
- `grading` - exactly `{gapType, followUpQuestion}` with `gapType` from the six-string enum above and a
  single follow-up question. The `STRUCTURE` sub-gate FAILS on a multi-question dump or an ungraded
  restatement; the `HINT-LADDER` sub-gate FAILS on a Level-3 bottom-out with no recorded Level-1 and
  Level-2 attempt, and on any "I don't know" not followed by a level-down next turn.

The tutor never runs the gate on its own work - the independent **pedagogy-critic** does (see
`interview-check.md`). Append new turns; never silently rewrite a prior claim.

## Pitfalls (each one quietly re-installs the illusion)

- **Explaining from open notes.** Writing a tidy summary with the source visible is copying, not
  retrieval - no generation effect, no gap exposure. Force closed-book.
- **Jargon-for-jargon swaps.** Replacing one technical term with a slightly simpler technical term is
  not a definition. The test: would someone with zero background follow the sentence without looking
  anything up? If no, unpack further.
- **Stopping after one pass.** The first pass clears only surface gaps. Genuine understanding needs two
  to three recursive passes; each surfaces a deeper missing link.
- **Decorative analogies.** An analogy is valid only if it is *predictive* - usable to answer a novel
  question correctly. "It's like a sponge" that predicts nothing is a mnemonic, not a tool, and it
  gives false confidence. Always test it with a modified scenario.
- **Giving the answer too early.** The single most common AI-tutor failure: correcting the moment a gap
  appears. The learner reads the correction, it feels right, confidence returns - illusion restored.
  Return the gap as a question; answer only after two failed attempts, then demand an explain-back. (A
  ChatGPT-as-student study found exactly this risk: the model's readiness to supply correct answers
  removed the error-correction practice that drives learning - Chen et al. 2024.)
- **Recognition mistaken for recall.** Recognition is picking the right answer from options; recall is
  generating it from nothing. The technique works only in recall mode. Never ask "does that make
  sense?" - that is a recognition task that feeds the illusion. Use incomplete-prompt generation: "In
  [concept], the reason X happens is because...?" and wait.
- **"If it explains simply, it must be simple."** Feynman ran this on quantum electrodynamics. A simple
  explanation of a hard topic is the goal, not proof the topic was trivial. Difficulty producing the
  simple version is a diagnostic signal, not a sign of a badly chosen concept.

## Cross-links

- `pedagogy-core.md` - the never-vague law and role separation this engine obeys.
- `socratic.md` - the hint ladder and Paul-Elder question types the fix-questions draw on.
- `modalities.md` - re-teach a failed concept through a different representation, not a repeat.
- `mastery-ladder.md` - ZPD calibration for "back up a level" and the two-novel-transfer mastery gate.
- `cognitive-load.md` - why one concept per turn, and the testing/spacing effects behind the loop.
- `workspace.md` / `interview-check.md` - the vault schema and the gate the critic runs.

## Evidence base

- Gleick 1993 (Feynman notebook method): <https://calnewport.com/the-feynman-notebook-method/>
- Farnam Street 4-step formalization: <https://fs.blog/feynman-learning-technique/>
- Generation effect (meta-analysis, d ≈ 0.40 / 86 studies): Bertsch et al. 2007
  <https://link.springer.com/article/10.3758/BF03193441>; first delineated by Slamecka & Graf 1978
  <https://psycnet.apa.org/record/1980-20399-001>; fMRI Rosner et al. 2013
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC3556209/>
- Protege effect: Chase et al. 2009 <https://link.springer.com/article/10.1007/s10956-009-9180-4>
- Illusion of knowing: Koriat & Bjork 2005 <https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Koriat_RBjork_2005.pdf>
- Self-explanation: Chi 1994 <https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1803_3>; Bisra et al.
  2018 <https://link.springer.com/article/10.1007/s10648-018-9434-x>
- Testing effect: Roediger & Karpicke 2006 <https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x>
- Hint ladder: VanLehn 2006 <https://cs.uky.edu/~sgware/reading/papers/vanlehn2006behavior.pdf>
- AI-tutor over-helping risk: Chen et al. 2024 <https://arxiv.org/abs/2412.15226>
