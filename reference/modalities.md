# modalities.md - REPRESENT: pick the representation the CONTENT needs

Loaded in **REPRESENT** mode ("draw it", "give me a scenario", "walk me through a real case") and
borrowed by **LEARN** when a concept is spatial, procedural, or applied. One job: choose visual /
verbal / scenario / role-play by the *structure of the concept*, never by the learner's "style". This
overlays `pedagogy-core.md`; it never overrides the never-vague law (definition + concrete worked
example + own-words restatement still ship every turn).

The gate's **modality-not-style** sub-gate enforces this file: any style-matching phrase fails, and
every chosen representation must carry a `contentStructure` tag from the enum
`spatial | sequential | causal | quantitative | phonological`.

## The rule, stated as law

Match the modality to the content, not to the child. (Willingham 2005): "Teaching the child in his
best modality doesn't affect his educational achievement. What does matter is whether the child is
taught in the content's best modality." Decide representation by asking *what is this concept made
of*, then reach for the channel that carries that structure with the least translation cost.

## Why "learning styles" is a myth (and what the gate rejects)

VARK (Visual / Auditory / Read-write / Kinesthetic) "meshing" claims a learner retains more when
instruction matches their self-reported preference. To be true it needs a **crossover interaction**:
self-labeled visual learners must beat verbal learners *under visual instruction* AND lose to them
*under verbal instruction*. Across fifty-plus years that crossover has not been shown; some studies
found the opposite (Pashler 2008): "there is no adequate evidence base to justify incorporating
learning-styles assessments into general educational practice." Preference is real; it does not
predict retention - a self-described "visual" learner does not remember a diagram any better than a
"verbal" one given the same diagram.

Operational bans:

- Never open with a style questionnaire. Do not ask "are you more visual or verbal?".
- Never route all content through one channel because of a learner label.
- Never write the gate-failing sentences: "because you're a visual learner", "to match your learning
  style", "you're an auditory type so...". The gate FAILs on these strings.
- Do diagnose *prior knowledge* and *content structure* instead - those drive the choice.

## Content-driven selection table (the core protocol)

Before drafting any explanation, name the concept's inherent structure, then pick its row. The
`contentStructure` tag is the justification the gate looks for.

| If the content is... | Tag | Use this representation | Concrete tutor move |
|---|---|---|---|
| Spatial / structural - parts arranged in space (anatomy, a circuit, a binary tree, a beam cross-section) | `spatial` | Labeled diagram with 2-5 word labels, plus an adjacent prose block narrating it | "Three boxes left to right: Input, Transform, Output; an arrow joins each adjacent pair." |
| Sequential - steps in a fixed order (an algorithm, a deploy pipeline, a recipe, a timeline) | `sequential` | Numbered steps or a flowchart, one annotation per step | Number every step; never prose-chain "then... after that... next..." |
| Causal - one thing forces another (a feedback loop, a market mechanism, a biological cascade) | `causal` | Cause-effect chain A -> B -> C, each link explained in one sentence | "Higher rates -> borrowing costs rise -> firms invest less -> hiring slows." |
| Quantitative - magnitudes being compared (trade-offs, growth, distributions) | `quantitative` | Table or graph with labeled axes and a one-sentence reading | State the takeaway the numbers show, not just the numbers. |
| Phonological / rhythmic - sound or pattern (pronunciation, meter, a chord progression) | `phonological` | Audio example plus phonetic/notational transcription | Give the transcription so the pattern is inspectable, not only heard. |

Mismatch is the cost to avoid: explaining a spatial concept in words alone forces the learner to
*build* the picture from text, burning working-memory capacity (~4 items) that should go to the
concept itself. The reverse - a verbal rule shown only as an image - is equally wasteful. See
`cognitive-load.md`.

## Dual coding: one verbal anchor + one concrete visual anchor

Memory runs two interconnected stores - a verbal system (words) and an imagistic system (pictures,
layouts) - and a concept encoded in both has two retrieval hooks instead of one (Clark & Paivio
1991). Single-channel encoding is fragile: a words-only concept is not reliably cued by a diagram on
an exam, and vice versa.

Moves:

- Pair every abstract definition with one concrete structural anchor. Not decoration - a *second
  retrieval hook*. Example: "A hash table is a post-office wall of numbered mailboxes; the hash
  function is the box number that sends you straight to one box, so you never scan them all."
- In text-only replies, **narrate the diagram in words** with precise spatial language: "Picture a
  triangle. Vertex A on top, B bottom-left, C bottom-right. The base is the side B-to-C; the height
  h is the perpendicular dropped from A to that base." That is dual coding without a canvas.
- Abstract-only concepts (no natural picture) get a concrete analogy as the imagistic anchor - but an
  analogy is a *candidate*, not the teaching. Require the learner to restate the mechanism, not the
  metaphor (see `feynman.md`).

## Mayer's principles, applied as a build checklist

Adding a channel helps only when it respects working memory; otherwise it harms (Mayer 2009).

| Principle | Plain rule | Do this |
|---|---|---|
| Modality | Diagram + spoken/prose narration beats diagram + on-screen sentences | In HTML, narrate the diagram in an adjacent prose block; keep only 2-5 word labels *on* the figure. |
| Coherence | Cut every element not required by this section's objective | No background images, no "fun facts", no tangential anecdote or seductive statistic. Test each sentence: skip it - is understanding harmed? If no, cut it. |
| Signaling | Tell the learner what matters and how parts connect | Open each section with one overview sentence; bold the first use of each key term; number every step; close with a one-line takeaway. |
| Redundancy | Do not duplicate narration as full on-screen text | Diagram + narration is enough; do not paste the narration as a verbatim caption too. |
| Segmenting | Break a multi-step system into learner-paced chunks | After every ~third step: "In your own words, what did step 2 accomplish?" - do not proceed until correct. |
| Pre-training | Teach the component names before the whole system | Lead with a Key Terms box (term, one-sentence definition, one example) so labels are ready when the system arrives. |

These are the same signals `lessons.md` bakes into a built artifact; apply them live in chat too.

## Scenario-based learning: situation before rule

Embed the concept in a realistic, decision-forcing situation *before* you state the abstract rule.
Learning happens *during* the scenario engagement, not only in the debrief (Battista 2017). The
situation becomes a retrieval cue: the rule is recalled later when a similar situation appears.

Protocol:

1. Pose a decision the scenario forces. "A crash report fires only when users type a negative
   number. What could cause that?"
2. Introduce the concept as the *answer* to that decision (integer underflow; missing input
   validation).
3. Hand the learner a *new* scenario and do not name which concept applies.
4. Debrief with three stems, always: "Name the principle. When would you use it? Name a case where
   you would NOT use it."

Keep the scenario lean - it must illuminate the concept, not compete with it for working memory.

## Role-play and the teachable agent (the protege effect)

Make the learner the teacher. Preparing to teach forces them to find and repair gaps that re-reading
hides; learners who expect to teach recall more and win specifically on the hardest transfer items
(Chase 2009). This is the most cognitively engaging viable move (Interactive, below).

Two stances:

- **Teach-back:** "Explain this to a classmate who's never seen it - plain words, no jargon."
- **Deliberate novice (you play it):** "I read the steps, but I don't see why step 3 is needed - step
  2 already solved it. What's the difference?" Pick a real seam in the concept, not a fake one.

Then probe the gap they expose, one question at a time: "You said X causes Y - what makes X happen in
the first place?" Hard requirement: **do not accept a restated definition as a teaching explanation.**
A pass needs an *example, a non-example, or a real application* - the same bar the gate's never-vague
check applies to a worked example. A clean teach-back is two of the never-vague three (real instance +
own words); add the boundary case and it becomes a mastery transfer.

## ICAP: rank the candidate representations

When several representations fit the content, pick the one that drives the most learner generation
(Chi & Wylie 2014). Engagement ranks **Interactive > Constructive > Active > Passive**.

| Mode | What the learner does | Example representation | Reach for it when |
|---|---|---|---|
| Interactive | Co-constructs with another, builds on responses | Teach-back, deliberate-novice role-play, Socratic dialogue | The concept is learned enough to defend - highest payoff. |
| Constructive | Generates new output from the material | Self-explanation prompts, drawing the diagram, predicting before reveal | A worked example exists and you want a schema, not mimicry. |
| Active | Manipulates given material | Stepping a simulator, highlighting, reordering steps | Building familiarity with parts before reasoning over them. |
| Passive | Receives only | Reading prose, watching a clip | Pure pre-training of names; never the resting state of a turn. |

Climb the ladder: if a passive explanation would do, ask whether a constructive prompt ("predict what
step 3 returns before I show you") or an interactive teach-back fits the same content. Generation
beats recognition every turn (see `pedagogy-core.md`).

## Pitfalls

- **Style-labeling.** Categorizing a learner "visual/auditory" from a quiz and routing all content
  one way - no empirical support, and it starves them of the representation the content actually
  needs (Pashler 2008). The gate FAILs the language.
- **Multimodal for its own sake.** Adding visuals, audio, or animation that the objective does not
  require, to "be multimodal" - violates coherence; every non-essential element costs working memory.
- **Redundancy.** Same narration shown as prose *and* full on-screen text beside a diagram - three
  competing visual streams; performance drops versus two.
- **Decorative visuals.** A picture that labels nothing and carries no structure is coherence cost
  with zero dual-coding benefit. A real diagram earns its place by encoding the spatial relation.
- **One-block dumps.** A whole system explained without pre-training the component names or segmenting
  - overloads before any schema exists to catch the pieces.
- **Cold problems for novices.** Asking a beginner to solve an unseen problem type with no worked
  example first - they fall into means-ends search and learn the answer, not the method (Sweller
  1988). Worked example first, then fade (see `cognitive-load.md`).
- **Cosmetic scenarios.** Naming a character but forcing no decision - a distraction, not situated
  knowledge.
- **Unprobed teach-back.** Accepting the learner's first explanation without follow-up - the protege
  effect needs the gap-detection that only targeted questions trigger.

## Evidence

- Pashler, McDaniel, Rohrer & Bjork (2008), learning-styles myth: https://journals.sagepub.com/doi/full/10.1111/j.1539-6053.2009.01038.x
- Willingham (2005), content's best modality: https://www.aft.org/ae/summer2005/willingham
- Mayer (2009), Multimedia Learning principles: https://assets.cambridge.org/97805217/35353/frontmatter/9780521735353_frontmatter.pdf
- Clark & Paivio (1991), dual coding: https://nschwartz.yourweb.csuchico.edu/Clark%20&%20Paivio.pdf
- Sweller (1988), worked-example effect: https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1202_4
- Chi & Wylie (2014), ICAP framework: https://www.tandfonline.com/doi/abs/10.1080/00461520.2014.965823
- Battista (2017), scenario-based simulation: https://pmc.ncbi.nlm.nih.gov/articles/PMC5806455/
- Chase, Chin, Oppezzo & Schwartz (2009), protege effect: https://link.springer.com/article/10.1007/s10956-009-9180-4

Full evidence base and the never-fabricate rule live in `sources.md`.
