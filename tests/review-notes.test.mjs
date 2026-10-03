/* @layer tooling-scripts @kind test */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import { setNote } from '../.storylite/review-note-set';
import { readNotes } from '../.storylite/review-notes-read';
import { writeNotes } from '../.storylite/review-notes-write';
import { reviewPost } from '../.storylite/review-post';
import { reviewNotes } from '../scripts/review/review-notes.mjs';

const ROOT = mkdtempSync(join(tmpdir(), 'tessera-notes-'));
const FILE = join(ROOT, '.storylite/review-notes.json');
const STORE = { readNotes, writeNotes, setNote };
const LOGO = 'Core · Brand/Logo';
const BUTTON = 'Primitives · Actions/Button';

mkdirSync(join(ROOT, '.storylite'));
mkdirSync(join(ROOT, 'stories'));
writeFileSync(join(ROOT, 'stories/Button.stories.tsx'), `const meta = {\n  title: '${BUTTON}',\n};\n`);

afterEach(() => writeNotes(ROOT, {}));
afterAll(() => rmSync(ROOT, { recursive: true }));

const run = (...args) => {
  const lines = [];
  const spy = vi.spyOn(console, 'log').mockImplementation((line) => lines.push(line));
  try {
    reviewNotes(ROOT, STORE, args);
  } finally {
    spy.mockRestore();
  }
  return lines;
};

describe('the review notes store', () => {
  it('reads no notes when the file is missing or broken', () => {
    expect(readNotes(ROOT)).toEqual({});
    writeFileSync(FILE, '{ broken');
    expect(readNotes(ROOT)).toEqual({});
  });

  it('keeps one trimmed note per page with its time, and a blank text deletes it', () => {
    setNote(ROOT, LOGO, '  Check the spacing.  ');
    setNote(ROOT, LOGO, 'Check the spacing again.');
    expect(readNotes(ROOT)).toEqual({ [LOGO]: { text: 'Check the spacing again.', at: expect.stringMatching(/^\d{4}-\d\d-\d\dT/) } });
    setNote(ROOT, LOGO, '   ');
    expect(readNotes(ROOT)).toEqual({});
    expect(existsSync(FILE)).toBe(false);
  });

  it('drops entries that are not notes', () => {
    writeFileSync(FILE, JSON.stringify({ 'A/B': { text: 'Fine.', at: '2026-10-03' }, 'A/C': 'loose text', 'A/D': { text: 4 } }));
    expect(Object.keys(readNotes(ROOT))).toEqual(['A/B']);
  });

  it('takes notes from the write route for known pages only', () => {
    expect(reviewPost(ROOT, 'note', JSON.stringify({ title: BUTTON, text: 'Hover colour.' }))).toMatchObject({ code: 200 });
    expect(reviewPost(ROOT, 'note', JSON.stringify({ title: 'Nope/Page', text: 'Lost.' }))).toMatchObject({ code: 404 });
    expect(JSON.parse(readFileSync(FILE, 'utf8'))).toEqual({ [BUTTON]: { text: 'Hover colour.', at: expect.any(String) } });
  });

  it('answers the notes with the review state, for the sidebar marks', () => {
    const reply = reviewPost(ROOT, 'note', JSON.stringify({ title: BUTTON, text: 'Spacing.' }));
    expect(reply.state.notes[BUTTON].text).toBe('Spacing.');
  });
});

describe('pnpm review notes', () => {
  it('lists every note with its title, time and text', () => {
    expect(run()).toEqual(['No notes.']);
    setNote(ROOT, LOGO, 'First line.\nSecond line.');
    const [head, ...body] = run();
    expect(head).toMatch(/^Core · Brand\/Logo {2}\(\d{4}-/);
    expect(body).toEqual(['  First line.', '  Second line.']);
  });

  it('clears one note by its full title or bare page name', () => {
    setNote(ROOT, LOGO, 'One.');
    setNote(ROOT, BUTTON, 'Two.');
    expect(run('clear', 'Logo')).toEqual([`cleared ${LOGO}`]);
    expect(run('clear', BUTTON)).toEqual([`cleared ${BUTTON}`]);
    expect(readNotes(ROOT)).toEqual({});
    expect(() => run('clear', 'Nope')).toThrow('matches no page');
  });

  it('clears every note with --all, and the file goes with them', () => {
    setNote(ROOT, LOGO, 'One.');
    setNote(ROOT, BUTTON, 'Two.');
    expect(run('clear', '--all')).toEqual(['cleared 2 notes']);
    expect(existsSync(FILE)).toBe(false);
  });

  it('refuses an unknown action', () => {
    expect(() => run('wipe')).toThrow('Usage');
    expect(() => run('clear')).toThrow('Usage');
  });
});
