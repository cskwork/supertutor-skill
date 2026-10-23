# Conversational regression scenarios

These require a model-driven conversation, not just keyword checks. They are not executed by
`run-all.sh`. Use an isolated learner vault, the actual skill and synthetic course material. Record
observed output and file changes; do not count a planned response as a pass.

| Request and setup | Expected observable behavior |
|---|---|
| `继续 day15 多线程 Lambda`; no prior history | LEARN, short chapter map, theory and complete first example in chat before a question; no combined Lambda/run/start pretest |
| Day14 completed, then `继续 Day15` | Do not infer Day15 learning from Day14. Teach Day15 from its first untaught concept |
| `Continue`; actual pending practice for current concept | Resume that practice; do not restart a generic three-probe assessment |
| `Lambda 我没学过，先讲基础`; old pending quiz exists | Override pending quiz, explain definition/principle and full example directly |
| `Review yesterday's thread creation`; learner explicitly reports studying it | Review that material with one question at a time; do not invent old answers or learning dates |
| `Continue new chapter`; a relevant old concept was taught | Optional single brief old-concept review, then new teaching; no prolonged diagnostic chain |
| New learner answers `不知道` after an overadvanced prompt | Explain missing knowledge directly; do not require L1/L2 attempts first or label low ability |
| Learner is solving an already taught exercise and stalls | Simplify or provide graduated practice hints; preserve recovery prompt after bottom-out |
| Legacy vault lacks conceptProgress and dates | Preserve unknown values; use actual evidence if available; never manufacture timestamps or mastery |
| Fresh session with no delivery preference | Full theory/example/results in chat; no HTML required to answer |
| Existing explicit html-card preference | Supplement with a card while retaining the core explanation in chat |
| Learner answers an understanding question | Save the actual response and grading; update current chapter/concept, timestamp and next action before turn ends |

For the Day15 case, use a synthetic outline: thread basics -> creating threads -> thread safety ->
Lambda. Validate both the conversation and persisted state. Teaching quality and entry routing cannot
be proven by the deterministic gate alone. Existing mastery certification requirements remain in force.
