# first-principles.md - descend to bedrock, then rebuild

Loaded in **FIRST-PRINCIPLES** mode (signals: "explain X from first principles", "break X down to
fundamentals", "really understand how X works"; any engineering, physics, or systems concept). This is the
flagship loop. It overlays `pedagogy-core.md`, never overrides it: still one concept per turn, still
definition + concrete worked example + own-words restatement, still hints that ladder, all self-checked
inline - the independent critic runs the gate only to certify mastery or gate a built lesson.

The loop has two phases. **Descend:** ask "why? / what is this made of?" until the learner reaches a named
physical law or an honest "I don't know." **Ascend:** rebuild the solution using only the confirmed truths,
admitting no inherited convention as an input. Decomposition without reconstruction is just critique; the
engineering value is in the rebuild.

## What a first principle is (and is not)

A **first principle** is a claim that is (a) true, (b) not derivable from any more-basic claim *within its
domain*, and (c) the thing all other knowledge in that domain derives from. Aristotle called these *archai*
and called them "true, primary, immediate, prior, and explanatory" (Posterior Analytics 71b19-25,
https://plato.stanford.edu/entries/aristotle-logic/). Descartes reached the same shape by stripping every
doubtable belief until only the indubitable `cogito` remained, then rebuilding from it
(https://plato.stanford.edu/entries/descartes-epistemology/).

The single test, run on any claim the learner states: **can you derive this from something deeper in the
same domain?** If yes, it is a derived result, not a first principle - and the learner should be able to
derive it. If no, it is bedrock.

| Claim | Derivable from? | Verdict |
|---|---|---|
| `F = ma` (Newton's second law) | nothing more basic in classical mechanics | first principle |
| beam deflection `d = PL^3 / 48EI` | `F = ma` + Euler-Bernoulli kinematics + Hooke's law, via calculus | derived result |
| conservation of energy | nothing more basic in thermodynamics | first principle |
| Carnot efficiency `1 - Tc/Th` | the second law, via a reversible cycle | derived result |

Simplicity is **not** the test. "F = ma" is simple and fundamental; "energy makes it move" is simple and is
a label (see the Feynman test below). Indemonstrability within the domain is the test, not how short the
sentence is.

## Phase 1 - Descend to bedrock

### The descent protocol

When the learner explains something, reply with one descent question and nothing else. Accept no label, no
"because that's how it works." Keep going until the learner either names a specific law (with a name and,
where it exists, an equation) or says "I don't know why at that level." Both are valid termini: the first is
bedrock, the second is a gap to fill - mark it, do not paper over it.

| Situation | Exact stem |
|---|---|
| learner states a mechanism | "Why? / What makes that happen?" |
| learner states a thing/product | "What is this made of? What are its parts?" |
| learner names a category ("chemistry", "physics") | "Which law exactly, and what does it state?" |
| learner reaches a named law | "Good - now reason forward from it. What does it predict here?" |
| learner stalls genuinely | back up one level (see below), do not rephrase the same question |

Distinguish two "I don't know"s. **In descent**, "I don't know why at that level" is an honest terminus -
record it as a gap, then either route to the researcher for the law or teach the prerequisite. **In the
explain-back grade** (`pedagogy-core.md`), "I don't know" triggers the back-up-a-level rule: drop to a
prerequisite the learner can stand on, probe what they DO know that is related, then climb back. Never
re-ask the same question at the same altitude.

### Worked descent: why a beam sags

A real chain, run one "why?" at a time:

1. "Why does a loaded beam sag?" -> "Loads create bending moments."
2. "Why does a bending moment cause deflection?" -> "It creates a strain gradient through the cross-section
   - the top fibers shorten, the bottom fibers stretch."
3. "Why does a strain gradient cause curvature?" -> "Because of how strain is defined and the geometry of
   the cross-section: plane sections stay plane."
4. Bedrock: Euler-Bernoulli kinematics + Hooke's law + `F = ma`
   (https://en.wikipedia.org/wiki/Euler%E2%80%93Bernoulli_beam_theory). Now ascend: derive `d = PL^3/48EI`,
   do not look it up.

### Worked descent: Five Whys (Ohno)

The same protocol on a failure (https://en.wikipedia.org/wiki/Five_whys):

1. The machine stopped. Why? -> a fuse blew.
2. Why? -> the bearing was not lubricated enough, causing overload.
3. Why? -> the lubrication pump was not pumping enough.
4. Why? -> the pump shaft was worn.
5. Why? -> no strainer was fitted, so metal scrap got in.

Bedrock = the missing strainer: the one physical state that, if changed, propagates a fix up every layer.
Replacing the fuse fixes the symptom; fitting a strainer fixes the cause. Teach the learner to notice the
difference - that is what descent buys.

## Classify every claim: physics-necessity vs inherited convention

The highest-value tutor move. Every claim a learner treats as fixed is either (a) forced by a physical law
or (b) an inherited convention, market price, or rule of thumb that *could be otherwise*. Optimizing inside
a convention you mistook for a law is the central engineering failure first-principles thinking prevents.

Run two questions on every component the learner lists:

1. "What law of physics governs how this component behaves?" (If they cannot answer, dig deeper - they are
   not at bedrock yet.)
2. "Is the current cost or form of this set by that law, or by manufacturing history?" (If "history," mark
   it a redesign target.)

Worked decomposition - Musk on battery packs. The inherited price was about $600/kWh and "everyone knew"
batteries were expensive. Decompose the pack to its commodity materials (cobalt, nickel, aluminum, carbon,
polymers, steel) priced at the metal exchange:

| Layer | Value | Physics or convention? |
|---|---|---|
| market price of a pack | ~$600/kWh | inherited convention |
| raw constituent materials at spot price | ~$80/kWh | physics floor (set by materials) |
| the gap between them | ~$520/kWh | manufacturing structure + supply chain - the redesign target |

The same move on a rocket: aerospace-grade aluminum, titanium, copper, carbon fiber at spot price are about
2% of a ~$65M launch price; the other ~98% is structure and convention, not physical necessity. That gap is
where first-principles engineering lives. (Figures from Musk via
https://www.startuparchive.org/p/elon-musk-explains-first-principles-thinking-and-uses-it-to-predict-80-decline-in-battery-prices
and https://jamesclear.com/first-principles; battery materials were ~$128/kWh in actual 2023 prices.) Any
such dated figure used in a live lesson is `factual:true` and the researcher must re-verify it into
`facts.json` with a URL, or it is cut - the integrity sub-gate fails on an unsourced number.

## The Feynman label-vs-thing test

A technical word (energy, stress, momentum, intelligence) *packages* a phenomenon without explaining its
mechanism. The learner knows the thing only when they can describe what physically happens - what moves,
what pushes what, what flows where, what force acts on what object - **without using the word**. Feynman:
knowing the name of a bird in every language tells you nothing about the bird
(https://fs.blog/richard-feynman-knowing-something/).

The move: when a learner explains with a technical term, say **"Explain that to me without using that
word."**

- Label (fails): "Energy makes the cart move."
- Mechanism (passes): "The compressed spring pushes on the cart through the contact point, so the cart
  speeds up in the direction of the net force."

If they cannot drop the word, they know the label, not the thing. Then work backward together: "What is
actually happening at the most concrete level you can describe - what objects are there, what acts on them,
what changes over time?" Repeat until they are describing a mechanism, not naming a category. The mechanism
transfers to new problems; the label does not. Watch for jargon-for-jargon swaps ("momentum" -> "inertia of
motion") - that is the same gap renamed, not closed. Per `feynman.md`, this is the `circular-definition` and
`undefined-jargon` gap from the 6-type rubric; return exactly one question, then re-test.

## Phase 2 - Ascend: rebuild from confirmed truths

Once descent reaches verified principles, construct the solution from *only* those truths, admitting no
"how it's usually done" as an input. This is where mastery becomes visible: a learner who can decompose but
not reconstruct can critique but not design.

Worked ascent - the heat-engine ceiling. Bedrock: the maximum efficiency of any engine between a hot and a
cold reservoir is `1 - Tc/Th` (Carnot). Then:

1. "Given only this, what is the maximum possible efficiency for an engine running between 300K (cold) and
   600K (hot)?" -> `1 - 300/600 = 0.5`, i.e. 50%. No real engine can beat this.
2. "Now look up a real diesel engine - roughly 40%. What accounts for the gap between 50% and 40%?" ->
   friction, incomplete combustion, heat lost through walls, non-reversible (fast, not quasi-static)
   strokes.
3. "If you were designing the engine, which of those losses are physically irreducible and which are
   engineering artifacts you could attack?" -> the Carnot ceiling is irreducible; the rest are targets.

That sequence forces reconstruction *before* comparison to existing designs, which is the whole point.
Same structure rebuilds the battery case: from a ~$80/kWh materials floor, design a factory that combines
those materials into cells efficiently, and the achievable cost is roughly $80-$150/kWh, not $600/kWh - the
Gigafactory was that reconstruction made physical.

## Analogy: candidate, not truth

Analogical reasoning ("do it the way X does it") is fast and usually accurate, but it inherits every
constraint of the source - it freezes you at the current frontier. First-principles reasoning asks "what
must be true here regardless of precedent?" and makes step-changes possible. Analogy is not wrong; treating
it as a *source of truth* rather than a candidate to test is wrong.

When a learner proposes a solution by analogy, run two follow-ups:

1. "What problem is X actually solving - is it the same physical problem you have?"
2. "What physical law requires doing it X's way? Can you write it down?"

If they cannot answer (2) with a specific equation or constraint, the analogy is a heuristic, not a ground
truth: treat it as an option to verify, not a solution to copy.

When is first-principles reasoning worth its cost? It is cognitively expensive. Spend it when you suspect an
inherited assumption is wrong, when you need a step-change, or when you are pressed against a physical limit.
For routine decisions where existing solutions are demonstrably near-optimal, analogy is the correct, cheap
tool. Teach both, in that order: analogy generates options fast; first principles tests which are
physically necessary.

## Pitfalls

- **Stopping at a category, not a law.** "Because chemistry" / "because physics" names a bucket, not a
  principle. A first principle names a specific relation - `ΔG = ΔH − TΔS`, not "thermodynamics". Keep
  asking "which law exactly, and what does it state?"
- **Treating a rule of thumb as bedrock.** "Span-to-depth ratio for beams is about 20:1" is a derived
  convention under specific loading and material assumptions, not a law. The first principle is the
  Euler-Bernoulli relation (`EI d^4w/dx^4 = q(x)`); the 20:1 is one consequence of it. When constraints
  change, the heuristic breaks and the principle does not.
- **Confusing simple expression with foundational status.** Re-run the derivability test, not a vibe check.
- **Dismissing analogy entirely.** It is a fast approximation and the right tool for most decisions; the
  error is only in treating it as truth. Use it to generate, then test against principles.
- **Memorized derivation mistaken for understanding.** A learner can recite the steps of a proof without
  grasping the physics behind each. After any derivation, apply the Feynman test: "explain in plain words
  what is physically happening at each step, no equations." If they cannot, they have a procedure, not
  understanding - re-teach through a different representation (`mastery-ladder.md`), never by repeating the
  same explanation.
- **Decompose-only.** Skipping the ascent leaves analysis without synthesis. Always close with a rebuild.

## Vault wiring and what the gate checks

Write every turn into the vault (`reference/workspace.md`); no vault, no gate. For this mode specifically:

- `lesson-claims.json` - the `definition` is jargon-free (the law named *and* unpacked, not just cited); the
  `workedExample` is a real descent chain or a real reconstruction (the beam, the Five Whys, the Carnot
  derivation), never an analogy-only and never a restated definition; the `restatementPrompt` makes the
  learner re-explain the mechanism in their own words. Missing any one fails the **never-vague** sub-gate.
- `grading` carries one `gapType` from the 6-type enum and exactly one follow-up question (**structure**
  sub-gate). Content here is causal, so set the modality `contentStructure` to `causal` (cause-effect
  chain), never a learner-style label (**modality-not-style** sub-gate).
- `ladder-state.json` - record placement (e.g. Bloom-Apply / Dreyfus advanced-beginner) and require two
  novel-transfer items, passed unprompted, before `mastered:true` (**mastery** sub-gate). A natural transfer
  pair: "decompose a system you have not seen (a drug tablet, a smartphone) and tell me which costs are
  physics and which are convention."
- Every dated figure (battery $/kWh, the 2% launch fraction) is `factual:true` and resolves to a
  `facts.json` URL (**integrity** sub-gate). Numbers from this file are illustrative; the researcher
  re-verifies them current before any live lesson uses them.

## Done

- Mode stated in one line, learner placed on the Bloom/Dreyfus ladder.
- Descent reached a named law or an honest, recorded gap - not a category word.
- Every fixed-seeming claim classified physics-necessity vs inherited convention.
- Feynman test passed: the learner re-explained the mechanism without the technical word.
- Ascent done: the solution rebuilt from confirmed truths, then compared to the real design.
- Vault written; the independent critic's `lesson-gate.mjs` is green; two unprompted transfers before
  advancing.

Cross-links: `pedagogy-core.md` (the law every mode obeys), `feynman.md` (the explain-back loop and 6-type
gap rubric), `socratic.md` (one-question-per-turn elenchus), `mastery-ladder.md` (placement and re-teach via
a different representation), `cognitive-load.md` (protect ~4 working-memory items during descent),
`sources.md` (the cited evidence base; re-verify every live figure into `facts.json`).
