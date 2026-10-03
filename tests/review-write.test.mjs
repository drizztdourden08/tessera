/* @layer tooling-scripts @kind test */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { sameOrigin } from '../.storylite/review-origin';
import { reviewPost } from '../.storylite/review-post';
import { reviewRequest } from '../.storylite/review-request';
import { setReview } from '../.storylite/review-set';

const ROOT = mkdtempSync(join(tmpdir(), 'tessera-review-'));
const TITLE = 'Primitives · Actions/Button';
const TITLES = [TITLE];
const STORY = `const meta = {\n  title: '${TITLE}',\n};\n\nexport { Overview };\n`;
const REGISTRY = join(ROOT, '.storylite/review.json');

mkdirSync(join(ROOT, 'stories/primitives'), { recursive: true });
mkdirSync(join(ROOT, '.storylite'));
writeFileSync(join(ROOT, 'stories/primitives/Button.stories.tsx'), STORY);

afterAll(() => rmSync(ROOT, { recursive: true }));

const entry = () => JSON.parse(readFileSync(REGISTRY, 'utf8'))['Primitives · Actions'].Button;
const only = (pages) => pages.filter((page) => page.title === TITLE);
const unknown = () => {
  throw new Error('"Nope" matches no page.');
};

describe('the review write route', () => {
  it('takes writes only from the dev server origin', () => {
    const urls = ['http://localhost:4400/', 'http://192.168.0.4:4400/'];
    expect(sameOrigin('http://localhost:4400', urls)).toBe(true);
    expect(sameOrigin('http://192.168.0.4:4400', urls)).toBe(true);
    expect(sameOrigin('http://localhost:4410', urls)).toBe(false);
    expect(sameOrigin('https://evil.example', urls)).toBe(false);
    expect(sameOrigin('null', urls)).toBe(false);
    expect(sameOrigin(undefined, urls)).toBe(false);
  });

  it('accepts a known title with a status, or a known title with a note text', () => {
    expect(reviewRequest('set', { title: TITLE, status: 'ok' }, TITLES)).toEqual({ kind: 'set', title: TITLE, status: 'ok' });
    expect(reviewRequest('note', { title: TITLE, text: '' }, TITLES)).toEqual({ kind: 'note', title: TITLE, text: '' });
  });

  it('refuses unknown titles, unknown statuses, missing text and bodies that are not objects', () => {
    expect(reviewRequest('set', { title: 'Nope/Page', status: 'ok' }, TITLES)).toMatchObject({ code: 404 });
    expect(reviewRequest('set', { title: TITLE, status: 'great' }, TITLES)).toMatchObject({ code: 400 });
    expect(reviewRequest('note', { title: TITLE, text: 3 }, TITLES)).toMatchObject({ code: 400 });
    expect(reviewRequest('note', { title: TITLE, text: 'x'.repeat(5000) }, TITLES)).toMatchObject({ code: 413 });
    expect(reviewRequest('set', [TITLE], TITLES)).toMatchObject({ code: 400 });
    expect(reviewRequest('set', null, TITLES)).toMatchObject({ code: 400 });
  });

  it('answers a malformed body or an unknown page without writing anything', () => {
    expect(reviewPost(ROOT, 'set', '{not json')).toMatchObject({ code: 400 });
    expect(reviewPost(ROOT, 'set', JSON.stringify({ title: 'Nope/Page', status: 'ok' }))).toMatchObject({ code: 404 });
    expect(existsSync(REGISTRY)).toBe(false);
  });

  it('stamps a status with the page hash and answers the fresh state', () => {
    const reply = reviewPost(ROOT, 'set', JSON.stringify({ title: TITLE, status: 'ok' }));
    expect(reply.code).toBe(200);
    expect(entry()).toMatchObject({ status: 'ok', hash: expect.stringMatching(/^[0-9a-f]{16}$/), at: expect.any(String) });
    expect(reply.state.pages[TITLE]).toBe('green');
    expect(reply.state.marks[TITLE]).toEqual({ status: 'ok', changed: false });
  });
});

describe('the shared status logic', () => {
  it('keeps an approved page green with a changed mark once its files change, and approving again takes the new hash', () => {
    setReview(ROOT, 'ok', only);
    const first = entry().hash;
    writeFileSync(join(ROOT, 'stories/primitives/Button.stories.tsx'), `${STORY}// changed\n`);
    const stale = reviewPost(ROOT, 'note', JSON.stringify({ title: TITLE, text: '' })).state;
    expect(stale.pages[TITLE]).toBe('green');
    expect(stale.marks[TITLE]).toEqual({ status: 'ok', changed: true });
    expect(setReview(ROOT, 'ok', only).map((page) => page.title)).toEqual([TITLE]);
    expect(entry().hash).not.toBe(first);
  });

  it('shows feedback with nothing changed yet as red, and a flagged page as yellow until reviewed', () => {
    setReview(ROOT, 'seen', only);
    expect(reviewPost(ROOT, 'note', JSON.stringify({ title: TITLE, text: '' })).state.pages[TITLE]).toBe('red');
    setReview(ROOT, 'flag', only);
    expect(entry().status).toBe('seen');
    expect(reviewPost(ROOT, 'note', JSON.stringify({ title: TITLE, text: '' })).state.pages[TITLE]).toBe('yellow');
  });

  it('forgets the hash and date when a page goes back to not reviewed', () => {
    setReview(ROOT, 'new', only);
    expect(entry()).toEqual({ status: 'new' });
  });

  it('writes nothing when the pick throws, as pnpm review does for an unknown name', () => {
    const before = readFileSync(REGISTRY, 'utf8');
    expect(() => setReview(ROOT, 'ok', unknown)).toThrow('matches no page');
    expect(readFileSync(REGISTRY, 'utf8')).toBe(before);
  });
});
