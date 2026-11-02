/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { cutMiddle } from '../src/primitives/FoldText/behavior/cut-middle';
import { cutPath } from '../src/primitives/FoldText/behavior/cut-path';
import { fitMiddle } from '../src/primitives/FoldText/behavior/fit-middle';

const PATH = 'C:/Users/mira/projects/tessera/src/primitives/FoldText/FoldText.tsx';

describe('K1 cutMiddle', { tags: ['critical'] }, () => {
  it('keeps the start and the end with an ellipsis between, the end getting the odd character', () => {
    expect(cutMiddle('abcdefghij', 5)).toBe('ab...hij');
    expect(cutMiddle('abcdefghij', 4)).toBe('ab...ij');
  });

  it('returns the text whole when everything is kept', () => {
    expect(cutMiddle('abc', 3)).toBe('abc');
    expect(cutMiddle('abc', 10)).toBe('abc');
  });

  it('leaves only the ellipsis for nothing kept', () => {
    expect(cutMiddle('abcdef', 0)).toBe('...');
    expect(cutMiddle('abcdef', -2)).toBe('...');
  });

  it('never splits a character made of two code units', () => {
    expect(cutMiddle('\u{1F600}\u{1F601}\u{1F602}\u{1F603}', 2)).toBe('\u{1F600}...\u{1F603}');
  });
});

describe('K1 fitMiddle', { tags: ['critical'] }, () => {
  const within = (width) => (candidate) => candidate.length <= width;

  it('returns the text whole when it fits', () => {
    expect(fitMiddle(PATH, within(PATH.length))).toBe(PATH);
  });

  it('keeps the most characters that fit and the start and end of the path', () => {
    const shown = fitMiddle(PATH, within(23));
    expect(shown).toHaveLength(23);
    expect(shown.startsWith('C:/Users/m')).toBe(true);
    expect(shown.endsWith('ldText.tsx')).toBe(true);
  });

  it('falls back to the ellipsis when nothing fits', () => {
    expect(fitMiddle(PATH, () => false)).toBe('...');
  });
});

describe('K1 cutPath', { tags: ['critical'] }, () => {
  it('keeps the last segment whole and cuts the middle of what comes before it', () => {
    expect(cutPath('C:/Users/mira/notes.txt', 6)).toBe('C:/...ra/notes.txt');
  });

  it('splits on a backslash as well', () => {
    expect(cutPath('C:\Users\mira\notes.txt', 4)).toBe('C:...a\notes.txt');
  });

  it('cuts the whole text when there is no separator', () => {
    expect(cutPath('abcdefghij', 5)).toBe(cutMiddle('abcdefghij', 5));
  });

  it('leaves only the ellipsis before the last segment for nothing kept, and falls back to it when nothing fits', () => {
    expect(cutPath('a/b/c/file.txt', 0)).toBe('...file.txt');
    expect(fitMiddle('a/b/c/file.txt', () => false, cutPath)).toBe('...file.txt');
  });
});
