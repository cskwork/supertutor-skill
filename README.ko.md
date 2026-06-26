# /supertutor

[English](README.md) | **한국어**

**누구에게든 무엇이든 진짜 숙달 수준까지 가르칩니다 - first-principles 엔지니어링을 대표 사례로 - Feynman 설명-되돌리기와 Socratic 힌트를 통해, 그리고 튜터가 스스로 승인할 수 없는 gate 뒤에서.**
별도 설치는 없습니다. 저장소를 클론하고 스킬 디렉터리에 심링크한 뒤 `/supertutor <주제>`.
랜딩 페이지: **[cskwork.github.io/supertutor-skill](https://cskwork.github.io/supertutor-skill/)**.

일반적인 "그냥 설명해줘" 방식으로는 너무 쉽게 속는 교육 상황을 위한 agent 스킬입니다. 이해란 학습자가 기억에서 다시 만들어 자기 말로 설명할 수 있는 것이지, 되읽었을 때 익숙하게 들리는 것이 아닙니다. `/supertutor`는 학습자가 직접 *생성*하게 하고, 모든 빈틈을 드러내며, 학습자가 스스로 넘어설 때까지 힌트를 사다리처럼 올립니다. 사용자가 한 줄 사실만 듣고 싶어 하는 경우라면, 스킬을 건너뛰고 평이하게 답하세요.

## 일반 챗봇보다 더해지는 것

일반 챗봇은 기꺼이 설명하고, "말이 되네"라며 동의한 뒤 넘어가, 학습자에게 안다는 착각만 남깁니다. `/supertutor`는 챗봇이 거저 해주지 않는 다섯 가지를 더합니다:

- **절대-모호 금지 규칙.** 모든 개념 턴은 세 가지를 함께 내놓아야 하며, 그렇지 않으면 미완성입니다: (1) 설명되지 않은 전문 용어가 전혀 없는 평이한 정의, (2) 손짓 같은 비유가 아니라 풀어낸 사례, 즉 최소 하나의 구체적인 REAL worked example, (3) 학습자가 자기 말로 다시 설명하게 만드는 프롬프트. 예: 휨 응력을 가르칠 때 정의는 "빔이 휘는 데 저항하는, 빔 내부의 단위 면적당 힘"이고, worked example은 실제 2 m 선반 브래킷에 대한 수치 `M*c/I`이며, 프롬프트는 "왜 윗면 섬유가 압축되는지 자기 말로 말해보세요"입니다.
- **끄덕임이 아니라 설명을 채점.** 매 재진술 뒤에 튜터는 고정된 6유형 루브릭으로 FIRST 빈틈을 짚습니다 - 인과 사슬 누락, 순환 정의, 정의되지 않은 전문 용어, 경계 조건 누락, 구체적 예시 누락, 깨진 비유 - 그리고 그것을 겨냥한 단 하나의 Socratic 질문을 돌려줍니다. 여러 질문을 한꺼번에 쏟지 않고, "이해되나요?"(안다는 착각을 키우는 재인 과제)도 묻지 않습니다.
- **힌트 사다리, 답이 아니라.** Level 1 *짚기*("받침대를 보세요 - 거기서 무엇이 다른가요?") -> Level 2 *가르치기*(단계가 아니라 원리를 진술, 진짜 시도가 있은 뒤에만) -> Level 3 *바닥치기*(답을 줌, Level 2가 실패한 뒤에만), 그다음 "이제 왜 그것이 답인지 설명하세요"를 요구합니다. 진짜 힌트는 학습자가 그냥 답을 베낄 확률을 1 미만으로 유지합니다.
- **자기 승인이 없는 결정적 gate.** 튜터(builder)는 자기 작업을 절대 스스로 채점하지 않습니다. 독립적인 **pedagogy-critic** 역할이 "mastered" 주장을 하기 전에 `lesson-gate.mjs`를 실행합니다.
- **절대 날조 금지.** 모든 사실 주장, 공식, 날짜가 있는 수치는 `facts.json`에 출처를 달거나 잘라냅니다. 검증할 수 없는 항목은 문서화된 placeholder가 되며, 지어낸 사실, 인용, 날짜가 되지 않습니다.

넘어야 할 기준선은 실제 자료를 읽는 강한 모델입니다. `/supertutor`는 그 기준선이 혼자 할 수 없는 것만 더합니다: 자신 있는 재진술을 믿는 대신, 숨은 빈틈을 *보이게* 만들고 *gate로* 막습니다.

## 모드

가르치기 전에 모드를 한 줄로 밝히세요. 예: `FIRST-PRINCIPLES - 왜 빔이 처지는가; 학습자는 Bloom-Apply / Dreyfus advanced-beginner`. 루트 `SKILL.md`는 라우터이며, 각 모드는 필요한 reference만 로드합니다.

| 요청 속 신호 | 모드 | 한 줄 용례 |
|---|---|---|
| "from first principles", "X를 근본 원리로 분해", 엔지니어링/물리/시스템 개념 | **FIRST-PRINCIPLES** (대표) | "왜? / 무엇으로 이루어졌나?"를 따라 기반 법칙까지 내려가, 물리인지 관습인지 분류하고, 라벨을 거부하며, 확인된 진실에서 다시 쌓아 올림 |
| "X를 가르쳐줘", "X는 처음이야", "초보에서 숙달까지", 명시된 오개념 없음 | **LEARN** | 보여주고-나서-이름붙이기: 먼저 구체적 worked example, 그다음 전문 용어 없는 정의, 그다음 채점되는 자기 말 재진술 |
| "내 이해를 점검해줘", "설명해서 되돌려볼게", "이거 맞게 이해한 거야" | **FEYNMAN-DRILL** | 학습자가 똑똑한 12살에게 설명; 정의되지 않은 첫 용어에서 멈추고, 4단계 프로토콜 + 6유형 빈틈 루브릭 실행 |
| "왜 X인지 모르겠어", 명시된 잘못된 믿음, "사실 ...아니야?" | **SOCRATIC-PROBE** | Elenchus: 믿음을 재진술하고, 모순을 드러내는 시나리오를 짜고, 당혹감이 남도록 둠 - 말로 바로잡지 않음 |
| "퀴즈 내줘", "훈련시켜줘", "유창해지게 도와줘", 학습자가 이미 개념을 앎 | **PRACTICE** | 오류율이 가장 높은 하위 기능에 대한 의도적 연습: 그것만 분리, 즉각적 이진 피드백, 40-70% 난이도 구간 유지 |
| "그려줘", "시나리오를 줘", "실제 사례를 짚어줘" | **REPRESENT** | 학습자의 "스타일"이 아니라 CONTENT가 요구하는 표현을 고름(공간적->다이어그램, 인과적->원인-결과 사슬) |
| "X에 대한 레슨을 만들어줘", "학습 단원을 구성해줘" | **LESSON-BUILD** | 구조화된 레슨을 vault에 작성: Bloom 목표, 핵심 용어 사전 훈련, worked example, 분산 복습; critic이 gate함 |
| "내가 제대로 이해한 거 맞아", 단원 끝, 진도 나가기 전 | **MASTERY-CHECK** | 독립 critic이 인터뷰 gate를 실행: 새로운 전이 2개, 절대-모호 점검, 힌트 사다리 준수, 자기 승인 없음 |

타이브레이크: 명시된 잘못된 믿음은 "가르쳐줘"라고 표현되어도 SOCRATIC-PROBE로 보냅니다. "아직 안 배운 것에 대해 퀴즈 내줘" -> 먼저 LEARN, 개념이 생긴 뒤 PRACTICE.

## 기본 teach loop (역할 분리)

**tutor**가 가르치고 인라인으로 자가 점검하며, **researcher**는 모드가 필요로 할 때만 외부 사실의 출처를 댑니다. 라이브 대화 턴은 인라인으로 진행됩니다 - 학습자의 explain-back이 그 턴의 검증자입니다. 독립적이고 신선한 컨텍스트의 **pedagogy-critic**은 두 경계에서만 gate를 실행합니다: LESSON-BUILD 산출물과 MASTERY-CHECK "mastered" 주장. builder는 자기 숙달을 절대 스스로 인증하지 않습니다.

작업은 **vault** = 학습자+주제당 하나의 디렉터리 `.supertutor/<topic>/`에 담기며, 여기에는 `lesson-claims.json`(턴마다: 개념, 정의, 전문 용어, worked example, 재진술 프롬프트, 채점), `facts.json`(출처가 달린 사실, `[]`일 수 있음), `ladder-state.json`(Bloom 레벨, Dreyfus 단계, 하위 기능별 정확도, 숙달한 개념, 복습 일정)이 들어갑니다. **vault 없으면 gate 없음** - 1단계에서 만드세요.

1. **Frame** (tutor). 한 줄로 한 모드를 분류합니다. vault를 만들거나 찾습니다.
2. **Diagnose** (tutor). 가르치기 전에 부담 낮은 도입 질문으로 선행 지식을 탐색합니다 - 정의 probe, 새로운 변형에 대한 적용 probe, 분석 probe. *힌트 없이* 통과한 최고 레벨을 기록합니다.
3. **Research** (researcher; 외부 사실이 필요할 때만). 모든 주장, 공식, 날짜가 있는 수치를 출처 URL과 함께 `facts.json`에 검증합니다. 검증 불가 -> 문서화된 placeholder. 순수 추론이면 건너뜁니다.
4. **Teach** (tutor). 모드의 형식대로 턴을 전달한 뒤, 항상 학습자에게 정의를 자기 말로 재진술하도록 프롬프트합니다. 정의 + worked example + 재진술 프롬프트를 vault에 씁니다.
5. **Explain-back + grade** (tutor). 6유형 루브릭으로 FIRST 빈틈을 찾아 Socratic 질문 하나를 돌려줍니다. "모르겠어요"에는 한 레벨 내려가 - 선행 개념으로 떨어뜨리고, 같은 레벨에서 다시 표현하지 않습니다.
6. **Critique + gate** (pedagogy-critic, 독립 - LESSON-BUILD와 MASTERY-CHECK에서만). vault를 다시 읽고 `lesson-gate.mjs`를 실행하며, 모든 위반을 `file:line`으로 적습니다. 라이브 턴은 이 단계를 건너뜁니다 - 튜터가 인라인으로 자가 점검합니다.
7. **Fix + re-run** (tutor; 6단계가 실행됐을 때만). 각 위반을 최소 변경으로 처리하고 gate를 다시 실행합니다. critique->fix 사이클은 3회로 제한하며, 계속 실패하면 "needs human teacher review"로 보고하고 절대 soft-pass하지 않습니다.
8. **Advance or schedule** (tutor). 학습자가 힌트 없이 깔끔하게 답하면 지원을 한 레벨 줄이는 것은 인라인입니다. 개념을 `mastered`로 찍는 것은 MASTERY-CHECK 경계입니다 - 힌트 없는 새로운 전이 두 개 AND critic의 gate green - 그 뒤 분산 인출을 예약합니다(1일 / 1주 / 1개월). 실패하면 *다른* 표현으로 다시 가르치고 5단계로 돌아갑니다.

## Quickstart

```text
/supertutor teach me why a beam sags, from first principles
/supertutor check my understanding of recursion
/supertutor quiz me on thermodynamics
/supertutor I don't get why a heavier object doesn't fall faster
/supertutor make me a lesson on how a hash table works
```

## gate

인증 검사는 결정적이며, 튜터는 자기 출력에 대해 이를 실행할 수 없습니다 - pedagogy-critic만 실행합니다:

```bash
node templates/lesson-gate.mjs .supertutor/<topic>
```

이 스크립트는 vault 제어 파일을 읽고 - 절대 추측하지 않음 - 여섯 개의 하위 gate를 순서대로 실행합니다. 하나라도 FAIL이면 전체 FAIL이며, 리포트에 그대로 표시되는 `file:line` 위반으로 출력됩니다. Exit 0 = 숙달 인증 가능.

1. **Never-vague** (대표): 각 개념은 비어 있지 않고 전문 용어 없는 `definition`, 구체적인 `workedExample`(비어 있지 않고, 비유만이 아니며, 정의를 다시 진술한 것이 아님), 그리고 `restatementPrompt`를 가집니다.
2. **Structure**: 채점된 각 재진술은 6유형 enum에서 하나의 `gapType`와 정확히 하나의 후속 질문을 가집니다 - 여러 질문 쏟기 없음, 채점되지 않은 재진술 없음.
3. **Hint-ladder**: 기록된 Level-1과 Level-2 시도 전에 Level-3 바닥치기 없음; 모든 바닥치기 뒤에는 복구용 "왜 그런지 설명" 프롬프트가 따름; 모든 "모르겠어요"는 다음 턴에 한 레벨을 내림.
4. **Modality-not-style**: 학습 스타일 표현("당신은 시각 학습자니까")이면 FAIL; 선택한 표현 방식은 `contentStructure` 근거를 가져야 함.
5. **Mastery**: `mastered:true`는 `passed:true`이고 `unprompted:true`인 새로운 전이 항목 >= 2개를 요구함; 다시 가르칠 때는 실패한 것과 *다른* 표현을 써야 함.
6. **Integrity**: 모든 `factual:true` 주장은 비어 있지 않은 URL을 가진 `facts.json` 출처로 연결됨.

같은 스크립트가 HTML 레슨(book 레이아웃, 하이드레이션된 `.sg-quiz`, 공유 scaffold)도 검사합니다. 레슨을 통과시키려고 gate를 절대 약화하지 마세요 - 레슨을 고치세요.

## 운영 규칙

- **절대 모호하지 않게.** 모든 용어를 평이한 말로 정의하고, 손짓 같은 비유가 아니라 구체적인 실제 worked example을 주세요.
- **힌트, 답이 아니라.** 짚기 -> 가르치기 -> 바닥치기; 어떤 답 뒤에도 복구 설명을 요구하세요.
- **"모르겠어요"에 한 단계 내려가기.** 학습자가 디딜 수 있는 선행 개념으로 떨어뜨리고, 같은 레벨에서 다시 표현하지 마세요.
- **콘텐츠 주도 표현, 학습 스타일 아님.** 개념의 구조로 표현을 고르세요. 학습자의 "스타일"에 맞춘 교수법은 충분한 근거가 없습니다(Pashler et al. 2008; Willingham 2005) - 스타일 설문을 절대 돌리지 마세요.
- **숙달 gate 통과 후 진도.** 한 번 맞춘 답(추측일 수 있음) 뒤가 아니라, 힌트 없는 새로운 전이 두 개 뒤에만 진도를 나가고, 타이머로 나가지 마세요.
- **절대 날조 금지.** 모든 사실을 `facts.json`에 출처를 달거나 잘라내세요. 도구가 없으면 문서화된 placeholder가 되며, 지어낸 사실, 인용, 날짜가 되지 않습니다.
- **역할 분리.** Tutor != critic; builder는 자기 gate를 절대 실행하지 않습니다.
- **출력 규율.** 산문은 학습자의 언어로; identifier, 파일 경로, 명령, JSON 키, gate가 머신으로 검사하는 anchor는 표준 영어로 유지하세요. 이모지 금지; 엄격한 CommonMark 빈 줄 간격; HTML이면 WCAG AA 대비; gate의 명령 출력과 함께 리포트.

## 설치

이 저장소가 곧 스킬입니다. 사용하는 agent CLI가 스킬을 찾는 위치에 두세요:

```bash
git clone https://github.com/cskwork/supertutor-skill.git
cd supertutor-skill
SRC="$(pwd)"
mkdir -p ~/.claude/skills ~/.agents/skills ~/.codex/skills

# One canonical checkout, symlinked into each active agent.
# If a target exists, audit it first and preserve any local edits before replacing it.
ln -s "$SRC" ~/.claude/skills/supertutor
ln -s "$SRC" ~/.agents/skills/supertutor
ln -s "$SRC" ~/.codex/skills/supertutor

# Canonical repo verification:
bash tests/run-all.sh
```

이후 사용하는 agent CLI에서: `/supertutor <당신의 주제>`.

### Windows

스킬은 Windows에서 동작합니다. 다만 gate와 test 스크립트는 `node`와 POSIX 셸을 쓰므로 **Git Bash** 또는 **WSL**에서 실행하세요(`node`가 `PATH`에 있어야 합니다). 저장소는 `.gitattributes eol=lf`로 줄바꿈을 고정합니다. 심링크에 관리자 권한이 필요하면 **복사**로 설치하세요(Git Bash/WSL의 `cp -R`, 또는 관리자 `cmd`의 `mklink /D`). 그다음 컨트랙트 테스트는 WSL bash에서 실행하세요.

## 레이아웃

```
SKILL.md            얇은 라우터: never-vague 법칙, 8개 모드, 역할 분리 루프, gate, reference 맵
agents/             역할별 페르소나 하나씩: tutor.md (builder) - pedagogy-critic.md (독립 gate) - researcher.md (사실)
reference/          pedagogy-core.md (상시 권위) - first-principles.md - feynman.md - socratic.md - modalities.md - mastery-ladder.md - cognitive-load.md - workspace.md - lessons.md - interview-check.md - review.md - sources.md
templates/          lesson-gate.mjs (결정적 gate) - skill-frontmatter-gate.mjs - workspace/ (제어 파일 예시) - teach/assets/ (HTML 레슨 scaffold)
tests/              컨트랙트 테스트 + fixtures/ (pass-vault, fail-vault) + run-all.sh 표준 검증기
docs/               index.html 랜딩 페이지 + .nojekyll
```

vault `.supertutor/<topic>/`는 학습자+주제당 런타임에 생성되며, 커밋되지 않습니다.

## 근거

스킬의 모든 경험적 주장은 never-fabricate 보루인 `reference/sources.md`로 추적되며, 각 reference 파일은 자신의 핵심 주장을 본문에 인용합니다. 대표 인용:

- **Feynman technique** - 단일 Feynman 논문이 아니라, 문서화된 노트 방법을 통해 Gleick의 *Genius*에서 재구성하고 Farnam Street의 4단계 형식화를 더한 것; `feynman.md` 참고.
- **튜터링은 효과가 있다** - 일대일 튜터링과 mastery learning은 평균 학습자를 전통적으로 가르친 학급의 약 98백분위로 끌어올렸습니다(Bloom 1984). 여기 루프는 답 기계가 아니라 그 상호작용 구조를 좇습니다. `socratic.md`와 `mastery-ladder.md` 참고.
- **재인보다 생성** - 학습자가 생성한 정보는 다시 읽은 정보보다 훨씬 잘 유지되며(Slamecka & Graf 1978), 시험을 보는 것이 재학습보다 장기 기억에 더 낫습니다(Roediger & Karpicke 2006). 그래서 모든 턴이 설명-되돌리기로 끝납니다. `cognitive-load.md` 참고.
- **학습 스타일 신화** - 학습자의 "스타일"에 맞춘 교수법은 충분한 근거가 없으므로(Pashler et al. 2008; Willingham 2005), 표현 방식은 콘텐츠 구조로 고릅니다. `modalities.md` 참고.

## 출처 표기

gate `lesson-gate.mjs`는 supergoal의 `teach-lesson-gate.mjs`(HTML 레슨 구조)와 supercontent의 `edu-gate.sh`(순서 있는 하위 gate 오케스트레이터)를 각색하여, English-first / 언어 비의존적이고 vault를 인식하도록 만든 것입니다. 랜딩 페이지(`docs/index.html`)는 supergoal / superdesign의 `docs/index.html` 템플릿을 따릅니다.

## 최신성

올해: 2026. 라이브 레슨에 쓰이는 모든 날짜 수치나 외부 사실은 모델 기억이 아니라 vault의 `facts.json`에 다시 검증합니다.

## 라이선스

MIT. [`LICENSE`](LICENSE) 참고.
