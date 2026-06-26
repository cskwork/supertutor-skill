# sources.md - the evidence base + the never-fabricate backstop

Every method claim in this skill traces to a source here. This file is the bibliography of *why the tutor
teaches the way it does* - not the place for the *domain facts inside a lesson*. Open it when you need to
cite a research-backed move to a learner, when the integrity sub-gate flags an unsourced claim, or when a
reviewer asks "where does this number come from?". The rule under everything: cite it or cut it.

## When to open this file

- About to tell a learner *why* a move works ("generation beats re-reading") - pull the inline cite from here.
- The pedagogy-critic's integrity sub-gate (gate 6) FAILed a `factual:true` claim - find or add its source.
- Writing a lesson that states an effect size, a percentile, or a dated figure - confirm the number below first.
- Auditing the skill for fabrication - this is the master list every method claim must resolve to.

## The never-fabricate protocol (law)

- **Cite as `(Author Year)` inline; never invent a number, date, or citation.** If a figure is not in this
  file or in the topic vault's `facts.json`, you may not state it. A confident guess is a defect, not a hint.
- **Method evidence vs domain fact - do not confuse them.** This file covers the *teaching method* (stable;
  re-read, don't re-fetch). A *domain fact in lesson content* (a beam's modulus, a 2026 price, a half-life)
  is volatile and MUST be re-verified by the researcher into `.supertutor/<topic>/facts.json` as
  `{claim, url, retrievedDate}` - see `workspace.md`. Today is 2026; model memory of any dated figure is
  presumed stale until re-fetched.
- **The integrity gate resolves, it does not trust.** Every claim tagged `factual:true` in
  `lesson-claims.json` must resolve to a `facts.json` entry with a non-empty `url`; no url = FAIL. The method
  cites here go in `facts.json` too when a lesson states them to the learner.
- **A dead or paywalled source is not a license to guess.** If a url 404s, keep the claim only if a second
  listed source confirms it; otherwise mark a documented placeholder and report it - never paper over the gap.
- **Don't inflate.** State the canonical number below at its published magnitude. Rounding `d ≈ 0.40` up to
  "huge" or "doubles your memory" is fabrication by exaggeration.

## Two kinds of claim - route each correctly

| Claim type | Example | Where it is sourced | Re-verify per lesson? |
|---|---|---|---|
| Method evidence | "Explaining it back encodes better than re-reading" | this file (`sources.md`) | No - stable findings |
| Domain fact in content | "Steel's Young's modulus is ~200 GPa" | topic vault `facts.json` | Yes - researcher fetches |
| Pedagogy heuristic | "One new concept per turn" | `pedagogy-core.md` + this file | No |
| Dated / priced figure | "A 2026 pack costs ~$X/kWh" | `facts.json`, with `retrievedDate` | Yes - always |

## Canonical numbers - state these verbatim, never inflate

| Claim the tutor may state | Number | Source |
|---|---|---|
| Generating an answer beats re-reading it | d ≈ 0.40 (86-study meta-analysis) | Bertsch et al. 2007 |
| Self-explanation prompts raise understanding | g ≈ 0.55 | Bisra et al. 2018 |
| Testing vs restudy, 1-week delayed recall | ~50% more retained | Roediger & Karpicke 2006 |
| 1:1 mastery tutoring vs conventional class | ~2 SD, ~98th percentile | Bloom 1984 |
| Spacing beats massing | 259 of 271 comparisons favored spacing | Cepeda et al. 2006 |
| Deliberate practice's share of skill variance | ~18-26% (not the popular ~48%) | Macnamara et al. 2014 |
| Mastery-learning formative threshold | 80-90% correct before advancing | Guskey 2007; Bloom |
| Working-memory capacity to protect | ~4 elements | Sweller 1988; Mayer 2009 |
| Learning-style "meshing" studies meeting the evidence bar | 0 | Pashler et al. 2008 |
| EV battery pack: market price vs raw-material cost | ~$600 vs ~$80 per kWh | Musk via James Clear |
| SpaceX rocket raw materials as share of launch price | ~2% | Musk via James Clear |
| Carnot ceiling at Tc=300K, Th=600K | 50% (1 - Tc/Th) | see `first-principles.md` |

## Feynman lineage - the technique is a reconstruction

There is **no single Feynman paper** naming a "Feynman technique"; the named four-step method is a later
formalization of his documented teaching and study habits. Say so when asked for the primary source.

- **Notebook method, extracted from Gleick's biography.** Feynman kept a notebook titled "things I don't
  know" and rebuilt fields from scratch until each was clear. (Gleick 1993, via Newport) -
  https://calnewport.com/the-feynman-notebook-method/ . Governs: `feynman.md`, `first-principles.md`.
- **The 4-step formalization (concept -> teach simply -> find gaps -> simplify with analogy).** A modern
  reconstruction, not Feynman's own wording. (Farnam Street) - https://fs.blog/feynman-learning-technique/ .
  Governs: `feynman.md`.
- **Name-of-a-thing vs the thing itself.** Knowing a bird's name in five languages tells you nothing about
  the bird; reject labels. (Feynman, via Farnam Street) -
  https://fs.blog/richard-feynman-knowing-something/ . Governs: `first-principles.md`, `feynman.md`.

## The explain-back engine - generation, retrieval, self-explanation, teaching

- **Generation effect: producing an answer beats reading it (d ≈ 0.40 across 86 studies).** The
  meta-analytic magnitude over 445 effect sizes. (Bertsch, Pesta, Wiscott & McDaniel 2007) -
  https://link.springer.com/article/10.3758/BF03193441 . The phenomenon was first delineated by (Slamecka
  & Graf 1978) - https://psycnet.apa.org/record/1980-20399-001 . Governs: `pedagogy-core.md`, `feynman.md`.
- **Generation recruits broad encoding circuitry**, explaining its durability; in this fMRI study generated
  items hit 87% recall versus 65% for read items. (Rosner, Elman & Shimamura 2013) -
  https://pmc.ncbi.nlm.nih.gov/articles/PMC3556209/ . Governs: `feynman.md`.
- **Protege effect: learners work harder and learn more for a "student" they teach than for themselves.**
  (Chase, Chin, Oppezzo & Schwartz 2009) - https://link.springer.com/article/10.1007/s10956-009-9180-4 .
  Governs: `feynman.md`, `modalities.md` (role-play / teach-back).
- **Teachable agents transfer to AI tutoring**: a teachable chatbot raised programming learning vs a
  standard assistant. (Chen, Wei, Le & Zhang 2024) - https://arxiv.org/abs/2412.15226 . Governs:
  `modalities.md`.
- **Illusion of knowing: fluency during study is mistaken for competence.** The basis for "never ask 'does
  that make sense?'". (Koriat & Bjork 2005) -
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Koriat_RBjork_2005.pdf . The illusion
  is reduced when study conditions mimic test conditions (Koriat & Bjork 2006) -
  https://pubmed.ncbi.nlm.nih.gov/17128596/ . Governs: `feynman.md`, `pedagogy-core.md`.
- **Self-explanation improves understanding (meta-analysis g ≈ 0.55).** Prompt "why is this step
  necessary?" after each worked step. (Chi 1994) -
  https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1803_3 ; (Bisra, Liu, Nesbit, Salimi & Winne 2018)
  - https://link.springer.com/article/10.1007/s10648-018-9434-x . Governs: `feynman.md`, `cognitive-load.md`.
- **Testing effect: a retrieval attempt beats restudy, ~50% more retained at a 1-week delay.** (Roediger &
  Karpicke 2006) - https://journals.sagepub.com/doi/10.1111/j.1467-9280.2006.01693.x . Retrieval also beats
  elaborative concept-mapping (Karpicke & Blunt 2011) - https://www.science.org/doi/10.1126/science.1199327 .
  Governs: `cognitive-load.md`, `review.md`, `interview-check.md`.

## Tutoring, scaffolding, ZPD, hints, and Socratic questioning

- **Bloom's 2-sigma: 1:1 mastery tutoring puts the average student near the 98th percentile of a
  conventional class (~2 SD).** The reason this skill exists; it requires interaction structure, not an
  answer machine. (Bloom 1984) - https://journals.sagepub.com/doi/10.3102/0013189X013006004 . Governs:
  `socratic.md`, `pedagogy-core.md`.
- **Scaffolding's six functions** (recruitment, reducing degrees of freedom, direction maintenance, marking
  critical features, frustration control, demonstration) - map one per stuck moment, never stack. (Wood,
  Bruner & Ross 1976) - https://acamh.onlinelibrary.wiley.com/doi/10.1111/j.1469-7610.1976.tb00381.x .
  Governs: `socratic.md`.
- **Zone of Proximal Development: teach at the edge of what the learner can do with support.** Sets the
  40-70% difficulty band. (Vygotsky 1978, via Simply Psychology) -
  https://www.simplypsychology.org/zone-of-proximal-development.html . Governs: `mastery-ladder.md`,
  `socratic.md`.
- **Hint ladder: point -> teach -> bottom-out.** Real tutoring systems escalate, never leap. (VanLehn 2006)
  - https://cs.uky.edu/~sgware/reading/papers/vanlehn2006behavior.pdf . Governs: `socratic.md`,
  `interview-check.md`.
- **Six Socratic question types** (clarification, assumptions, evidence, viewpoints, implications,
  meta). (Paul 1990; Paul & Elder 2007, via Structural Learning) -
  https://www.structural-learning.com/post/socratic-teaching-techniques-for-effective-learning . Governs:
  `socratic.md`.
- **Productive struggle is behavioral, not time-based**: support the *process* without supplying content.
  (Warshauer 2015) -
  https://www.researchgate.net/publication/271739822_Productive_struggle_in_middle_school_mathematics_classrooms
  . Governs: `socratic.md`.

## First-principles thinking

- **First principle = a truth indemonstrable within its domain, from which the rest derives** (Aristotle's
  *archai*). (Stanford Encyclopedia) - https://plato.stanford.edu/entries/aristotle-logic/ ; definitional
  overview - https://en.wikipedia.org/wiki/First_principle . Governs: `first-principles.md`.
- **Descartes' method: doubt everything derivable, stop at the indubitable (cogito).** The descent-to-bedrock
  template. (Stanford Encyclopedia) - https://plato.stanford.edu/entries/descartes-epistemology/ ;
  https://en.wikipedia.org/wiki/Meditations_on_First_Philosophy . Governs: `first-principles.md`.
- **Musk battery decomposition: pack ~$600/kWh on the market vs ~$80/kWh in raw materials**; SpaceX raw
  materials ~2% of launch price - cost is convention, not physics. (Musk, via James Clear) -
  https://jamesclear.com/first-principles ;
  https://www.startuparchive.org/p/elon-musk-explains-first-principles-thinking-and-uses-it-to-predict-80-decline-in-battery-prices
  . Governs: `first-principles.md`.
- **Euler-Bernoulli beam theory is derived, not fundamental** - it rests on deeper elasticity assumptions, so
  beam-deflection is not a first principle. (Wikipedia) -
  https://en.wikipedia.org/wiki/Euler%E2%80%93Bernoulli_beam_theory . Governs: `first-principles.md`.
- **Five Whys: iterate "why?" to the root cause** (Ohno's engineering descent). (Wikipedia) -
  https://en.wikipedia.org/wiki/Five_whys . Governs: `first-principles.md`.

## Mastery and skill progression

- **Revised Bloom taxonomy** (Remember -> Understand -> Apply -> Analyze -> Evaluate -> Create) as
  cognitive-demand descriptors, not lesson stages. (Anderson & Krathwohl 2001; Krathwohl 2002) -
  https://cmapspublic2.ihmc.us/rid=1Q2PTM7HL-26LTFBX-9YN8/Krathwohl%202002.pdf . Governs: `mastery-ladder.md`.
- **Dreyfus five stages** (novice -> advanced beginner -> competent -> proficient -> expert): rules for
  novices, judgment cases for proficients. (Dreyfus & Dreyfus 1980) -
  https://www.semanticscholar.org/paper/A-Five-Stage-Model-of-the-Mental-Activities-in-Dreyfus-Dreyfus/efa296060526e40fb81b7498786aba72d546e555
  . Governs: `mastery-ladder.md`.
- **Deliberate practice = targeted weak subskill + stretch difficulty + immediate feedback + repetition;
  ceiling ~1-2h/day.** (Ericsson, Krampe & Tesch-Romer 1993) - https://eric.ed.gov/?id=EJ471947 . Governs:
  `mastery-ladder.md`.
- **Honest variance limit: deliberate practice explains ~18-26% of skill differences, not ~48%.** Do not
  promise "anyone can master anything with enough hours." (Macnamara, Hambrick & Oswald 2014) -
  https://journals.sagepub.com/doi/abs/10.1177/0956797614535810 . Governs: `mastery-ladder.md`.
- **Mastery learning: 80-90% formative threshold, corrective loop re-teaches differently.** (Guskey 2007) -
  https://files.eric.ed.gov/fulltext/ED490412.pdf . Governs: `pedagogy-core.md`, `mastery-ladder.md`,
  `interview-check.md`.

## Cognitive load, spacing, interleaving, desirable difficulty

- **Worked-example effect: novices learn more from studying a solved example than from solving cold.**
  (Sweller 1988) - https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog1202_4 . Governs:
  `cognitive-load.md`, `lessons.md`.
- **Expertise-reversal: scaffolding that helps novices harms experts** - fade guidance as accuracy rises.
  (Kalyuga, Ayres, Chandler & Sweller 2003) -
  https://www.tandfonline.com/doi/abs/10.1207/S15326985EP3801_4 . Governs: `cognitive-load.md`,
  `mastery-ladder.md`.
- **Spacing: distributed practice beat massed in 259 of 271 comparisons; interval scales with target
  retention.** (Cepeda, Pashler, Vul, Wixted & Rohrer 2006) - https://pubmed.ncbi.nlm.nih.gov/16719566/ .
  Governs: `cognitive-load.md`, `review.md`.
- **Interleaving: mixing problem types boosts learning - but only after each type is individually learned.**
  (Rohrer & Taylor 2007) -
  http://uweb.cas.usf.edu/~drohrer/pdfs/Interleaved_Mathematics_Practice_Guide.pdf . Governs:
  `cognitive-load.md`, `review.md`.
- **Desirable difficulties: storage vs retrieval strength; effortful retrieval builds durable learning.**
  (Bjork 1994) - https://www.structural-learning.com/post/robert-bjork-teachers-guide-desirable . Governs:
  `cognitive-load.md`.
- **Practice testing and distributed practice are the two highest-utility techniques reviewed.** (Dunlosky,
  Rawson, Marsh, Nathan & Willingham 2013) -
  https://journals.sagepub.com/doi/abs/10.1177/1529100612453266 . Governs: `cognitive-load.md`, `review.md`.

## Modality selection and the learning-styles myth

- **Learning-styles meshing hypothesis: zero studies meet the evidence bar.** Never run a style
  questionnaire; never route all content through one channel. (Pashler, McDaniel, Rohrer & Bjork 2008) -
  https://journals.sagepub.com/doi/full/10.1111/j.1539-6053.2009.01038.x . Governs: `modalities.md`,
  `pedagogy-core.md`.
- **Teach in the content's best modality, not the child's "style."** (Willingham 2005) -
  https://www.aft.org/ae/summer2005/willingham ; reaffirmed (Willingham 2018) -
  https://www.aft.org/ae/summer2018/willingham . Governs: `modalities.md`.
- **Multimedia principles** (modality, coherence, redundancy, signaling, segmenting, pre-training) - protect
  working memory. (Mayer 2009) -
  https://assets.cambridge.org/97805217/35353/frontmatter/9780521735353_frontmatter.pdf . Governs:
  `modalities.md`, `lessons.md`.
- **Dual coding: pair a precise verbal definition with a concrete visual/structural anchor.** (Paivio;
  Clark & Paivio 1991) - https://en.wikipedia.org/wiki/Dual-coding_theory ;
  https://nschwartz.yourweb.csuchico.edu/Clark%20&%20Paivio.pdf . Governs: `modalities.md`.
- **ICAP: Interactive > Constructive > Active > Passive** - pick the most engaging viable representation.
  (Chi & Wylie 2014) - https://www.tandfonline.com/doi/abs/10.1080/00461520.2014.965823 . Governs:
  `modalities.md`.

## Cross-links - which file leans on which evidence

| Reference file | Leans hardest on |
|---|---|
| `pedagogy-core.md` | Bloom 1984, generation/testing effects, Guskey 2007, Pashler 2008 |
| `feynman.md` | Gleick/Newport, Farnam Street, Bertsch 2007 / Slamecka & Graf 1978, Chase 2009, Chi 1994 / Bisra 2018, Koriat & Bjork 2005 |
| `socratic.md` | Paul-Elder, Wood/Bruner/Ross 1976, VanLehn 2006, Warshauer 2015, Bloom 1984 |
| `first-principles.md` | Aristotle, Descartes, Musk via Clear, Euler-Bernoulli, Five Whys, Feynman name-vs-thing |
| `modalities.md` | Pashler 2008, Willingham 2005/2018, Mayer 2009, Paivio, Chi & Wylie 2014 |
| `mastery-ladder.md` | Krathwohl 2002, Dreyfus 1980, Ericsson 1993, Macnamara 2014, Guskey 2007 |
| `cognitive-load.md` | Sweller 1988, Kalyuga 2003, Cepeda 2006, Rohrer 2007, Bjork 1994, Dunlosky 2013 |
| `workspace.md` / `interview-check.md` | this file feeds `facts.json`; integrity gate resolves every url |

**Currency note (2026):** the method findings above are stable and re-read, not re-fetched. Any dated,
priced, or measured figure that reaches a learner - including the Musk decomposition prices if a lesson
states them as current - is re-verified by the researcher into the topic vault's `facts.json` before use.
Memory is not a source.
