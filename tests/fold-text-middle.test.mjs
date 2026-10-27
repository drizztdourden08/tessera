/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FoldText } from '../src/primitives/FoldText/FoldText';
import { cutMiddle } from '../src/primitives/FoldText/behavior/cut-middle';
import { fitMiddle } from '../src/primitives/FoldText/behavior/fit-middle';

const PATH = 'C:/Users/mira/projects/tessera/src/primitives/FoldText/FoldText.tsx';

describe('cutMiddle', () => {
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

describe('fitMiddle', () => {
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

describe('FoldText fill and middle truncation', () => {
  it('adds the fill class only when asked', () => {
    expect(renderToStaticMarkup(h(FoldText, { fill: true }, 'text'))).toContain('fold-text fold-text--fill');
    expect(renderToStaticMarkup(h(FoldText, null, 'text'))).not.toContain('fold-text--fill');
  });

  it('draws a middle truncated string whole before it is measured, with the full text for readers', () => {
    const html = renderToStaticMarkup(h(FoldText, { truncate: 'middle' }, PATH));
    expect(html).toContain('fold-text--fill');
    expect(html).toContain('fold-text__text--middle');
    expect(html).toContain(`<span class="visually-hidden">${PATH}</span>`);
    expect(html).toContain(`aria-hidden="true">${PATH}</span>`);
  });

  it('ignores middle truncation for text that is not a string', () => {
    const html = renderToStaticMarkup(h(FoldText, { truncate: 'middle' }, h('b', null, 'x')));
    expect(html).not.toContain('fold-text__text--middle');
  });
});
