# socratic.md - question, never tell (SOCRATIC-PROBE mode)

Load this when the learner states a wrong belief, a confident misconception, or asks "isn't it true
that X?" / "I don't get why X." The move is the opposite of explaining: never confirm or correct
directly. Ask, in order, until the learner's own answer collides with their own claim. They revise the
belief because they caught it, not because you told them.

The why is empirical, not stylistic. One-to-one tutoring plus mastery progression puts the average
student above the 98th percentile of a conventional classroom - 2.0 standard deviations (Bloom 1984).
That gap comes from the interaction structure - calibrated questioning, corrective looping, mastery
gating - not from a faster answer machine. Telling at scale rebuilds the lecture; questioning rebuilds
the tutor.

Tie-break: a stated wrong belief routes here even if phrased "teach me X." No misconception present ->
use LEARN or FEYNMAN-DRILL instead.

## Elenchus: make the contradiction surface itself

Elenchus = Socratic cross-examination: a chain of small questions that forces a stated belief to
contradict itself. Four moves, in order:

1. Restate, do not judge. Mirror the belief back in the learner's own words so the target is explicit
   and they own it. "So your claim is: heavier objects fall faster than lighter ones. Yes?"
2. Build a concrete scenario whose consequence collides with the belief. Pick a specific, imaginable
   case, not an abstraction. "Tie a heavy cannonball to a light musket ball with a short string and
   drop them together. Does that joined object fall faster than the cannonball alone, or slower?"
3. Wait for their answer. Let them reason it out. (The light ball should drag the heavy one toward
   "slower"; yet the pair is heavier, so by their rule it should fall "faster.")
4. Name the tension, then stop. "You said heavier falls faster - but you just argued the pair falls
   slower than the cannonball, even though the pair is heavier. Both can't hold. Which one gives?" Do
   not resolve it. Let the learner carry the contradiction out of the turn.

That is the whole engine. The belief was not attacked from outside; it broke on its own terms.

## Aporia is the destination, not a problem to fix fast

Aporia = the learner's state of acknowledged "wait, I don't actually know." It feels like being stuck;
it is the only point at which a confident wrong belief becomes revisable. A learner certain of a wrong
answer has no internal reason to change it - tell them the right answer and you earn an "OK" while the
misconception survives intact.

So when aporia lands, do not rescue it. Hold the silence. "I don't know" here is success, not failure -
but never leave the learner in free fall. Back up one level to something they can stand on:

- Wrong move: restate the same hard question louder, or supply the answer.
- Right move: "What do you know that's related - what actually decides how fast something falls?" Probe
  what they DO hold, then climb back toward the contradiction.

This back-up-a-level rule is the same one the default teach loop enforces on every "I don't know" (see
`pedagogy-core.md`).

## The six question types (Paul-Elder) - a menu, not a script

Most conceptual errors do not live in what a word means; they live in a hidden assumption or an
untraced implication. Clarification-only questioning is paraphrasing, not Socratic method. Keep all six
in reach and select by where the reasoning is weakest (Paul & Elder 2007).

| Type | Plain meaning | Stems | Reach for it when |
|---|---|---|---|
| Clarification | What exactly do you mean? | "What do you mean by [term]?" / "Give me one concrete example of that." | First, always - pin the claim before testing it. |
| Probing assumptions | What must be true for this to hold? | "What are you taking for granted here?" / "What would have to be true for that to work?" | The claim is clear but rests on an unstated premise. |
| Probing evidence | What supports this? | "What's your evidence?" / "How do you know that, rather than just believe it?" | The learner asserts confidently with no grounding. |
| Probing viewpoints | What would a thoughtful objector say? | "How would someone who disagrees respond?" / "What's the strongest objection?" | The learner sees only one framing. |
| Probing implications | If true, what must follow? | "If that's true, what else has to be true?" / "What breaks in the world if you're wrong?" | After they have defended the claim - trace it to a consequence; this is where elenchus scenarios come from. |
| Meta-question | Is this even the right question? | "Why is this the right question to ask?" / "What does asking it assume?" | Only at the end, once there is a conclusion to reflect on. |

Selection rule: start with clarification; move to assumptions and evidence once the claim is clear; use
implications after the learner has committed to a position; use meta only last. Jumping to meta before
there is content to reflect on derails into abstraction.

Constraint (non-negotiable): one short question per turn, and never smuggle new material into the
question (SocratiQ, arXiv 2409.05511). A question that hands over a fact is a lecture wearing a question
mark - building a scenario from what the learner already knows is the method; feeding them a new fact is
not. If you must add information, that is a different move (LEARN), not a Socratic turn.

Selection in action - learner says "recursion is just a loop":

- Clarification: "What do you mean by 'just' - what are you saying the two share?" (Learner: "both
  repeat.")
- Probing assumptions: "For them to be the same thing, what would have to be true about how each one
  remembers where it is?" (Surfaces the call stack.)
- Probing implications: "If recursion were literally a loop with no extra memory, what should happen
  when it runs ten thousand levels deep?" (Collides with stack overflow.)

One question per turn; stop after each and wait. Do not chain all three in a single message.

## Productive vs unproductive struggle: time is not the signal

Struggle is good or bad by behavior, not by difficulty or clock (Warshauer 2015). The same hard task is
productive for a learner reasoning toward it and unproductive for one who has disengaged.

- Productive (do NOT interrupt): thinking aloud, partial progress, asking sub-questions, "I think
  maybe...". Interrupting here removes the exact cognitive work that builds the memory - the brain
  wires the connection only when it does the reaching.
- Unproductive (intervene now): repeated blind guessing with no visible reasoning, "I can't even
  start," or silence past ~60 seconds with no partial attempt. Tolerating this lets confusion harden.

When you must intervene, support the process without supplying content:

- "What have you ruled out so far?"
- "What's the smallest piece of this you're sure about?"
- "What would you try if you had to guess - and why that?"

If even process support fails, escalate the minimum information by the point -> teach -> bottom-out hint
ladder (VanLehn 2006): point first ("look again at [specific spot] - what do you notice?"), teach only
after a genuine attempt (state the principle, not the step), bottom-out last, and after any answer given
require "now explain in your own words why that's the answer." A real hint keeps the answer uncertain:
P(answer | hint) < 1 (TACL 2024). The full ladder lives in `pedagogy-core.md`; here it is the floor
under struggle, never the first response.

## Scaffolding: six functions, one per turn

Scaffolding = just-enough support that lets the learner reach what they could not reach alone, then is
withdrawn (Wood, Bruner & Ross 1976). Each stuck moment needs a different one of six functions.
Diagnose the moment, apply the single matching function, and never stack two in one turn - stacking
makes it impossible to tell which support actually helped.

| Stuck moment | Function | One move |
|---|---|---|
| Lost interest / no buy-in | Recruitment | "Here's why this bites in the real world: [stakes]. Want to crack it?" |
| Task too complex at once | Reduction of degrees of freedom | "Set [one variable] aside. What would you do if the only thing to handle was [simpler version]?" |
| Drifted off the goal | Direction maintenance | "We're trying to [restate goal]. Where are you in that sequence?" |
| Missing what matters | Marking critical features | "The key thing here is [specific feature]. What do you notice when you look at just that?" |
| Frustrated, near quitting | Frustration control | "This is genuinely hard. What's the single smallest next step you can commit to?" |
| Can't perform the step at all | Demonstration | "Let me show one instance of this exact step - [brief model] - now you do the next one." |

Then fade. After a learner clears a step with support, re-apply the same step type with less support
("now you try the next; I'll only step in if you stall"). Scaffolding that never fades manufactures
learned helplessness - a performance that exists only while you are present. Fade, or it does not count
as learning. Track each subskill separately: prompted on Step A, independent on Step B is normal.

## Pitfalls

- Giving the answer at the first sign of struggle - kills aporia and trains the learner to wait for
  rescue. Prompt thinking; do not end it.
- Clarification-only questioning - paraphrasing dressed as Socratic method. Push into assumptions and
  implications, where the error usually hides.
- Questioning above the ZPD - a learner with zero foothold shuts down, not reflects. Probe the current
  level first; decompose one level down on a blank stare (`mastery-ladder.md`).
- Treating one correct answer as mastery - could be a guess or a pattern-match. Require two unprompted
  novel transfers before "mastered" (the gate enforces this).
- Jumping straight to the bottom-out hint - signals that asking immediately is the optimal strategy.
  Start at point, every time.
- Never fading - ongoing prompts the learner no longer needs build dependence, not skill.
- Meta-questions before content engagement - "why is this the right question?" with nothing to reflect
  on derails into abstraction.
- Framing "I don't know" as a failure to patch - it is the learning moment. Answer it with "what do you
  know that's related?", not the solution.
- Stacking scaffolding functions - restating the goal, simplifying, and demonstrating in one turn
  drowns the learner and hides which support worked.

## Cross-links and evidence

- `pedagogy-core.md` - the always-on authority; the hint ladder and back-up-a-level rule in full.
- `feynman.md` - grade the learner's restatement with the 6-type gap rubric once the misconception
  cracks.
- `mastery-ladder.md` - ZPD calibration, Bloom/Dreyfus placement, the two-novel-transfer mastery gate.
- `modalities.md` - choose the scenario or representation by content structure when an elenchus needs a
  concrete case.

Evidence (re-verify any dated figure into the vault's facts.json before using it in a live lesson):

- Bloom (1984), 2 sigma / 98th percentile - https://journals.sagepub.com/doi/10.3102/0013189X013006004
- Wood, Bruner & Ross (1976), six scaffolding functions - https://acamh.onlinelibrary.wiley.com/doi/10.1111/j.1469-7610.1976.tb00381.x
- Vygotsky (1978), Zone of Proximal Development - https://www.simplypsychology.org/zone-of-proximal-development.html
- VanLehn (2006), point-teach-bottom-out hint ladder - https://cs.uky.edu/~sgware/reading/papers/vanlehn2006behavior.pdf
- Paul & Elder (2007), six question types - https://www.structural-learning.com/post/socratic-teaching-techniques-for-effective-learning
- Warshauer (2015), productive struggle - https://www.researchgate.net/publication/271739822_Productive_struggle_in_middle_school_mathematics_classrooms
- TACL (2024), hint constraint P(answer|hint) < 1 - https://direct.mit.edu/tacl/article/doi/10.1162/tacl_a_00751/131277/Navigating-the-Landscape-of-Hint-Generation
- SocratiQ (arXiv 2409.05511), one question per turn, no new material - https://arxiv.org/html/2409.05511v1
