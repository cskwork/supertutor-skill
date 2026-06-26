# cognitive-load - sequence difficulty so encoding actually happens

Load this in PRACTICE and any time you decide *how hard* to make the next step, *what order* to teach
sub-parts in, or *when* to test versus re-show. `pedagogy-core.md` is the authority; this file is the
engine room for difficulty. Two failures live here: overload (so much at once that nothing encodes) and
under-difficulty (so smooth that nothing sticks). Both feel fine in the moment. Neither builds memory.

The one rule everything below serves: **strip extraneous load, sequence intrinsic load, protect the
capacity that is left for germane load.**

## Working memory and the three loads

**Working memory** is the small mental workspace where active thinking happens - where you hold the
pieces you are reasoning about *right now*. It holds roughly four independent pieces at once and empties
fast (Sweller 1988). Exceed it and **schema formation stops**: the learner can copy steps from in front
of them but encodes no reusable pattern. Every downstream technique on this page fails if encoding never
happened because working memory was full.

A **schema** is a mental chunk that groups several related pieces into one retrievable unit. "A list of
five resistors in series" is five pieces for a novice and one piece for someone who has the schema.
Building schemas is the entire job; they are how a finite workspace handles infinite complexity.

Three things compete for the four slots (Sweller 1988):

| Load | Plain meaning | Concrete example | Tutor move |
|---|---|---|---|
| **Intrinsic** | Inherent difficulty = how many elements *interact* and must be held at once | Balancing a chemical equation needs reactants, products, and stoichiometry held together; reading one vocabulary word does not | Cannot delete. Lower it by pre-teaching each sub-part separately, then combining |
| **Extraneous** | Wasted effort from poor presentation | A diagram on the left and its caption far on the right (the learner mentally hauls one to the other); narration read aloud *and* shown as identical on-screen text | Delete it. This is the enemy: it burns slots and builds nothing |
| **Germane** | The productive effort of building the schema itself | Noticing that all three of these problems reduce to "force / area"; self-explaining why a step works | Protect the slots for this. It is the only load that becomes long-term knowledge |

Operational consequences, applied every turn:

- **One new concept per turn.** Two interacting new ideas for a learner who has a schema for neither
  exceeds capacity. Teach part A, confirm it, then part B, then the interaction.
- **Pre-teach the parts before the whole.** Before "compute the bending stress," make sure *bending
  moment*, *section modulus*, and *stress = moment / section modulus* each exist as their own chunk.
- **Integrate, do not split.** Put the label *on* the diagram element, not in a separate legend. A
  separate legend forces the learner to hold "label 3 = flange" in working memory while looking
  elsewhere - pure extraneous load (this is the split-attention effect; see `modalities.md`).

## Worked examples and faded support (for novices)

A **worked example** is a fully solved problem shown for study, every step visible and annotated with a
one-line reason. For a novice, *studying* a worked example beats *attempting* the same problem
(Sweller 1988; the effect originates with Cooper and Sweller 1987). Why: a novice with no schema solves
by **means-ends analysis** - repeatedly asking "what sub-goal gets me closer to the answer?" - which
consumes every slot on search and leaves none to notice the pattern. The worked example removes the
search, freeing capacity to encode the structure. The common classroom default ("here is one example,
now do 20") skips exactly the support novices need.

**Faded-example protocol** - withdraw support one rung at a time:

1. **Full worked example.** Every step shown and annotated.
2. **Completion problem.** First half solved, learner finishes the rest.
3. **Independent problem.** Learner does all of it, minimal prompt.

Move the starting rung toward 3 as accuracy climbs. After *each* step of a worked example, prompt
self-explanation before the next step: **"Why is this step necessary here?"** Self-explanation turns
passive watching into schema-building (germane load), and combines the worked-example effect with
elaboration for extra gain.

Real worked example (the thing the learner studies, then fades from):

> A 12 V battery drives two resistors in series: 4 Ω and 2 Ω. Find the current, then the voltage across
> the 4 Ω resistor.
> Step 1 - series resistances add: R_total = 4 + 2 = 6 Ω. *(Why? In series the same current passes
> through both, so their oppositions sum.)*
> Step 2 - Ohm's law gives current: I = V / R = 12 / 6 = 2 A.
> Step 3 - voltage across the 4 Ω part: V = I × R = 2 × 4 = 8 V.

- **Fade to completion:** show Step 1, then ask: "Same circuit. I've added the resistances for you -
  6 Ω. You take it from there: what is the current, and why that formula?"
- **Fade to independent:** "New numbers: 9 V, resistors 1 Ω and 2 Ω. Walk me through it. Self-explain
  each step as you go."

## Expertise-reversal: the same scaffold that helps a novice harms an expert

Detailed worked examples and step-by-step guidance help novices and **actively slow learners who already
have the schema** (Kalyuga, Ayres, Chandler and Sweller 2003). Shown a full solution, an expert must
process the external steps *and* hold their own internal method, and the two conflict - extraneous load
where there was none. In Kalyuga et al.'s electrical-trade apprentices, integrated text-and-diagram
instruction beat diagram-alone early in training; later the relationship reversed and diagram-alone was
faster and more accurate. **What helped three sessions ago can hurt now.**

Therefore, probe expertise *before* you choose the support level:

- Ask one or two quick target-concept probes: **"What would you try first?"** / "What does this problem
  reduce to?"
- **Answers fast and correct** -> skip or compress the worked example; hand over the problem with a
  one-line prompt.
- **Cannot answer** -> give the full worked example.
- Keep updating the estimate: as practice accuracy rises, fade guidance. Record the moving estimate in
  `ladder-state.json` so the next turn pitches right (see `mastery-ladder.md` for the Dreyfus/ZPD read).

## Retrieval practice: make them produce it, do not re-show it

**Retrieval practice** = pulling information out of memory with the source hidden, instead of re-reading
it. The act of retrieval is what strengthens the memory, not the time spent looking at the material. In
Roediger and Karpicke (2006), students who studied a passage then took a recall test recalled *less*
immediately than re-readers, but about **50% more after one week** - the durable measure. Retrieval also
beats elaborate study like concept-mapping on both recall and transfer (Karpicke and Blunt 2011).
Dunlosky et al. (2013) rated practice testing one of only two techniques with *high* utility across ages
and subjects; re-reading - the most common student habit - was rated *low*.

Operational moves:

- After teaching X, close the material: **"Without looking, tell me everything you can about X."** Wait
  for the *full* attempt before any correction.
- **Production over recognition.** Use open prompts ("how does a series circuit split voltage?"), not
  multiple choice with the answer visible. Recognizing the right option is far easier than producing the
  concept under test conditions, and only production transfers.
- **Feedback after the whole attempt, not mid-sentence.** Then correct every error immediately;
  unresolved errors re-encode the misconception.
- **Do not test before first encoding.** There must be something to retrieve - give at least one study
  pass, then test. (Generation *before* instruction is different and is covered under desirable
  difficulties below, with its own caveat.)
- Keep it low-stakes. Surprise high-stakes testing triggers anxiety that impairs retrieval and erases
  the benefit.

## Spacing: distribute the retrievals across sessions

**Spaced practice** spreads the same practice over time gaps instead of cramming it into one sitting
(**massed practice**). Cepeda, Pashler, Vul, Wixted and Rohrer (2006) found spaced beat massed in **259
of 271 comparisons** across 317 experiments. Mechanism (Bjork 1994, below): returning after a delay,
the memory has partly faded, so retrieving it is *harder*, and harder successful retrieval deposits more
durable strength than retrieving something still fresh.

- **Schedule the return points: 1 day, 1 week, 1 month.** Use each return to *test*, not to re-read.
  Write the schedule into `ladder-state.json`; run the sessions per `review.md`.
- **Interval scales with how long you need it.** To hold something a week, review after ~a day; to hold
  it a year, the gaps stretch to weeks and months (Cepeda et al. 2006; 2008).
- **Do not over-space.** If the gap is so long the learner retrieves *nothing*, the effort has nothing
  to build on. Some residual trace must remain.
- One clean retrieval is not enough. Plan for at least three spaced retrievals before treating storage
  as robust.

## Interleaving: mix the types so the learner must choose

**Interleaved practice** mixes problem types within a session (A, C, B, A, ...) instead of finishing all
of one type before the next (**blocked practice**). Rohrer and Taylor (2007) found interleaved learners
scored *lower during practice* (60% vs 89% blocked) yet *substantially higher on a delayed test*.
Why: blocked practice hands the method away - every problem in the block is the same kind, so the learner
drills execution but never **discrimination** (choosing *which* method applies). Real tests and real
problems never announce their type; selection has to happen first.

- **Interleave only after each type has had at least one successful blocked session.** Mixing types the
  learner has never solved individually is confusion, not desirable difficulty - there is no basis to
  discriminate.
- Before each mixed problem, force the selection step: **"Before you solve it - which method applies, and
  how do you know?"** Give feedback on the *category call* before they compute.
- Expect and normalize the lower in-session accuracy; it is the signal interleaving is working.

## Desirable difficulties: storage strength vs retrieval strength

Bjork (1994) splits memory into two independent dimensions:

- **Storage strength** = how deeply the memory is embedded. It only accumulates, never decays, and grows
  most when retrieval was *effortful*.
- **Retrieval strength** = how easily the memory surfaces *right now*. It peaks during and just after
  practice and drops with time.

During practice they trade off: when retrieval is easy (just studied), successful retrieval adds little
storage; when retrieval is hard (after a delay or a context change), success adds a lot. The **fluency
illusion** is reading current ease as proof of durable learning - the single most common error of both
learners and tutors. As Bjork and Soderstrom (2015) put it, *performance* (what you can do right now) and
*learning* (the lasting change) can be fully dissociated. **Desirable difficulties** - spacing,
interleaving, generation, reduced feedback, varied conditions - deliberately lower retrieval strength so
effort is high and storage gains are large.

Operational moves:

- **"I already know this, skip it" is a cue to test, not skip.** High retrieval strength is exactly the
  fluency illusion. Reply: "Then this will be quick - without looking, give me X." A correct fast answer
  costs seconds; a stumble just found a gap.
- **Generation before telling.** Before explaining a new step, ask for an attempt or a guess; even a
  wrong attempt the learner then corrects builds more storage than reading the answer outright (the
  generation effect).
- **Reduce hints as competence rises.** Resist completing the sentence. Struggle inside the learner's
  reach is the work; see the hint ladder in `pedagogy-core.md`.
- **Caveat - difficulty must be reachable.** Generation with *zero* prior foothold produces nothing, or
  produces errors that entrench. Apply desirable difficulty only when the learner can make a *plausible*
  attempt. Confusing wording, missing prerequisite vocabulary, or raw overload is *undesirable*
  difficulty - it yields frustration, not storage. When the learner cannot start, that is the signal to
  back up a level (`mastery-ladder.md`), not to push harder.

## Dual coding (the load reason behind modality choices)

Two memory channels exist: a **verbal** channel (words, processed in sequence) and a **visual/imagery**
channel (pictures, spatial layout, processed in parallel) (Paivio 1971, 1986). Encoding a concept through
both gives two independent retrieval routes - either can rebuild the other - so the memory is harder to
lose. The load consequences (Mayer 2001/2009) are sequencing rules:

- **Modality:** a diagram with *spoken* narration beats the same diagram with on-screen text - speech uses
  the verbal channel, the diagram uses the visual one, so they do not compete.
- **Redundancy:** a complex diagram plus narration plus the *same words* on screen is *worse* than
  narration alone - two identical visual sources fight for one channel.
- **Coherence:** cut decorative elements; a stock photo that maps to nothing adds extraneous load and no
  second route.

This is the load-budget rationale; the full content-driven selection table (spatial -> diagram,
sequential -> numbered steps, causal -> cause-effect chain) and the learning-styles-myth refutation live
in `modalities.md`. Pick the representation by the *content's structure*, never by a claimed learner
"style."

## Elaborative interrogation (after encoding, not before)

**Elaboration** connects new information to prior knowledge by explaining *why* it is true, not by
restating it. **Elaborative interrogation** is the specific move of prompting "why" - **"Why would that
be true?"** / **"Why does X cause Y?"** Pressley et al. (1988) found roughly **27% better recall** than
passive study. Mechanism: memory is a web of associations; a fact tied to causes, consequences,
contrasts, and examples has many retrieval paths, an isolated fact has one.

- After a fact or a worked example: **"Tell me why that's the case"** or **"How does this connect to
  [something the learner already knows]?"** Wait for their explanation; accept a partial one and press:
  "Right - say more about why."
- **Prior-knowledge caveat.** With true novices who cannot build any plausible explanation, "why" prompts
  generate confident wrong stories that entrench (re-reading outperforms elaboration in that condition;
  Woloshyn, Pressley and Schneider 1992). Reserve elaborative interrogation for consolidation and
  extension - it works on causal/relational knowledge, not first exposure to a bare definition.

## Pitfalls (the load traps that look like teaching)

- **Fluency illusion.** Smooth, fast in-session recall is not durable learning. Retrieval strength and
  storage strength are independent; cramming maximizes the first and barely touches the second.
- **Re-reading as the main strategy.** Rated low utility (Dunlosky et al. 2013). It builds familiarity
  (recognition), which feels like learning and is not retrievability (recall).
- **Worked examples for experts.** Once the schema exists, a full solution forces reconciliation with
  internal knowledge - extraneous load. Probe first, fade as accuracy rises (expertise-reversal).
- **Interleaving before competence.** Mixing types the learner has never solved blocked is confusing, not
  challenging. One successful blocked session per type first.
- **Decorative images.** Any visual that does not map to the explanation adds split-attention load with no
  second retrieval route. The image must carry the *same* meaning as the words.
- **Redundancy.** Reading text aloud while showing the identical text on screen is worse than narration
  alone; two same-channel sources compete.
- **Generation with zero prior knowledge.** No foothold -> nothing generated, or entrenched errors. The
  generation effect needs enough prior knowledge to attempt.
- **Treating all difficulty as desirable.** Effortful *retrieval* is desirable; an unreadable problem,
  missing vocabulary, or overload is just undesirable difficulty - frustration, not storage.
- **Over-long spacing.** Gaps so wide nothing retrieves lose the benefit; keep a residual trace.
- **Surprise high-stakes testing.** Anxiety impairs retrieval and cancels the testing effect; keep it
  low-stakes with immediate corrective feedback.

## Sequencing protocol (read the learner state, set the next step)

Apply in order on every PRACTICE or sequencing decision; write the resulting placement to
`ladder-state.json` (schema in `workspace.md`).

| Learner state (per subskill) | Difficulty setting | Concrete next move |
|---|---|---|
| New concept, no schema | Lowest viable; full support | One concept this turn; pre-teach parts; full worked example + self-explain each step |
| Worked example understood, ~40-70% accuracy | The ZPD band; partial support | Completion problems, one hint at a time, blocked within the type |
| ~70-80% and climbing | Fade support | Independent problems; begin spacing the retrievals (1 day) |
| Each type individually solid | Add desirable difficulty | Interleave the learned types; "name the method first"; space at 1 week, then 1 month |
| "I already know this" / high fluency | Test, do not skip | Closed-book production retrieval; if it stumbles, a gap was hiding behind fluency |
| Cannot make any attempt | Back up, do not push | Drop to a prerequisite (`mastery-ladder.md`); this is undesirable difficulty, not effort |

Target the subskill at **40-70% accuracy** - hard enough to force retrieval, easy enough to succeed - and
fade guidance as accuracy rises toward 80%. Mastery is gated by two unprompted novel transfers, never by
time on task; the certifying interview is in `interview-check.md` and the deterministic mastery sub-gate
runs from `pedagogy-core.md`'s loop.

## Sources

- Sweller, J. (1988). Cognitive Load During Problem Solving. *Cognitive Science* 12(2). <https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1202_4>
- Kalyuga, Ayres, Chandler and Sweller (2003). The Expertise Reversal Effect. *Educational Psychologist* 38(1). <https://www.tandfonline.com/doi/abs/10.1207/S15326985EP3801_4>
- Roediger and Karpicke (2006). Test-Enhanced Learning. *Psychological Science* 17(3). <https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x>
- Karpicke and Blunt (2011). Retrieval Practice Produces More Learning than Concept Mapping. *Science* 331(6018). <https://www.science.org/doi/10.1126/science.1199327>
- Cepeda, Pashler, Vul, Wixted and Rohrer (2006). Distributed Practice in Verbal Recall. *Psychological Bulletin* 132(3). <https://pubmed.ncbi.nlm.nih.gov/16719566/>
- Rohrer and Taylor (2007). The Shuffling of Mathematics Problems Boosts Learning. *Instructional Science* 35(6). <http://uweb.cas.usf.edu/~drohrer/pdfs/Interleaved_Mathematics_Practice_Guide.pdf>
- Bjork (1994). Memory and Metamemory Considerations in Training. In *Metacognition: Knowing About Knowing*, MIT Press. <https://www.structural-learning.com/post/robert-bjork-teachers-guide-desirable>
- Paivio (1971; 1986). Dual Coding Theory. <https://en.wikipedia.org/wiki/Dual-coding_theory>
- Mayer (2001; 2009). Multimedia Learning, Cambridge University Press. <https://www.digitallearninginstitute.com/blog/mayers-principles-multimedia-learning>
- Dunlosky et al. (2013). Improving Students' Learning with Effective Techniques. *PSPI* 14(1). <https://journals.sagepub.com/doi/abs/10.1177/1529100612453266>
- Pressley, Symons, McDaniel, Snyder and Turnure (1988). Elaborative Interrogation. *Journal of Educational Psychology* 80(3). <https://www.learningscientists.org/learning-scientists-podcast/2017/11/1/episode-6-elaborative-interrogation>

Full evidence base and the never-fabricate backstop: `sources.md`.
