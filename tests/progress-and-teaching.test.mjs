// Exercise the real gate against legacy and extended vaults, without editing fixtures.
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = dirname(dirname(fileURLToPath(import.meta.url)));
let checks = 0;
function scenario(name, mutate, expected = 0, message = '') {
  const dir = mkdtempSync(join(tmpdir(), 'supertutor-progress-'));
  try {
    cpSync(join(root, 'tests/fixtures/pass-vault'), dir, { recursive: true });
    const claims = JSON.parse(readFileSync(join(dir, 'lesson-claims.json')));
    const ladder = JSON.parse(readFileSync(join(dir, 'ladder-state.json')));
    mutate(claims, ladder);
    writeFileSync(join(dir, 'lesson-claims.json'), JSON.stringify(claims));
    writeFileSync(join(dir, 'ladder-state.json'), JSON.stringify(ladder));
    const result = spawnSync(process.execPath, [join(root, 'templates/lesson-gate.mjs'), dir], { encoding: 'utf8' });
    assert.equal(result.status, expected, `${name}\n${result.stdout}\n${result.stderr}`);
    if (message) assert.ok(result.stdout.includes(message), `${name}: expected diagnostic ${message}`);
    console.log(`ok: ${name}`); checks++;
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
const timestamp = '2026-10-16T10:00:00+08:00';
const progress = (ladder, status = 'taught') => Object.assign(ladder, {
  delivery: 'terminal-text', currentChapter: 'chapter-one', currentConcept: 'bending-stress',
  lastInteractionAt: timestamp, nextAction: status === 'not-started' ? 'teach' : 'check-understanding',
  conceptProgress: [{ id: 'bending-stress', status, lastTaughtAt: status === 'not-started' ? null : timestamp,
    lastResponse: null, nextAction: status === 'not-started' ? 'teach' : 'check-understanding' }]
});
scenario('legacy vault remains valid and unmodified', () => {});
scenario('new empty progress seed works with recorded teaching', (_, l) => {
  Object.assign(l, JSON.parse(readFileSync(join(root, 'templates/workspace/ladder-state.example.json'))));
});
scenario('not-started is separate from taught', (_, l) => progress(l, 'not-started'));
scenario('taught but not mastered is valid', (_, l) => { progress(l); l.masteredConcepts = []; });
scenario('learner report supports unknown historical timestamp', (_, l) => {
  progress(l); l.conceptProgress[0].lastTaughtAt = null;
  l.conceptProgress[0].learningEvidence = { source: 'learner-report', detail: 'Learner says this concept was studied yesterday.' };
});
scenario('legacy unknown stays null', (_, l) => {
  progress(l); Object.assign(l.conceptProgress[0], { status: null, lastTaughtAt: null, nextAction: null }); l.nextAction = null;
});
scenario('taught cannot be fabricated without evidence', (_, l) => {
  progress(l); l.conceptProgress[0].lastTaughtAt = null;
}, 1, 'learned status needs');
scenario('not-started cannot schedule review', (_, l) => {
  progress(l, 'not-started'); l.nextAction = l.conceptProgress[0].nextAction = 'review';
}, 1, 'not-started cannot');
scenario('progress cannot bypass mastery certification', (_, l) => {
  progress(l, 'mastered'); l.masteredConcepts = [];
}, 1, 'matching mastery record');
scenario('mastered progress still requires two transfers', (_, l) => {
  progress(l, 'mastered'); l.masteredConcepts[0].novelTransfers = [];
}, 1, 'mastery:');
scenario('resume pointer must reference actual concept', (_, l) => {
  progress(l); l.currentConcept = 'missing';
}, 1, 'does not reference');
scenario('resume action must match current concept', (_, l) => {
  progress(l); l.nextAction = 'practice';
}, 1, 'disagrees');
scenario('invalid date is rejected', (_, l) => {
  progress(l); l.lastInteractionAt = 'yesterday';
}, 1, 'ISO timestamp');
scenario('duplicate concepts are rejected', (_, l) => {
  progress(l); l.conceptProgress.push({...l.conceptProgress[0]});
}, 1, 'duplicate');
scenario('untaught gap can receive direct teaching without failed hints', (c) => {
  c.turns = [{ index: 0, phase: 'teach', conceptId: 'bending-stress', stuckPoint: 'new-concept' }];
});
scenario('IDK can switch from practice to evidenced teaching', (c) => {
  c.turns = [{ index: 0, hintLevel: 1, learnerIDK: true, stuckPoint: 'new-concept' },
    { index: 1, phase: 'teach', conceptId: 'bending-stress', stuckPoint: 'new-concept' }];
});
scenario('teach phase cannot hide a bottom-out hint', (c) => {
  c.turns = [{ index: 0, phase: 'teach', conceptId: 'bending-stress', hintLevel: 3 }];
}, 1, 'must omit hintLevel');
scenario('teaching event needs actual recorded explanation', (c) => {
  c.turns = [{ index: 0, phase: 'teach', conceptId: 'absent' }];
}, 1, 'recorded conceptId');
scenario('practice still rejects a premature answer', (c) => {
  c.turns = [{ index: 0, phase: 'practice', hintLevel: 3, stuckPoint: 'x', recoveryPrompt: 'Explain why.' }];
}, 1, 'before a Level-1');
scenario('teaching resets prior hint sequence', (c) => {
  c.turns = [{ index: 0, hintLevel: 2, stuckPoint: 'x' },
    { index: 1, phase: 'teach', conceptId: 'bending-stress', stuckPoint: 'x' },
    { index: 2, hintLevel: 3, stuckPoint: 'x', recoveryPrompt: 'Explain why.' }];
}, 1, 'before a Level-1');
console.log(`progress-and-teaching: ${checks} scenarios passed`);
