/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const area = readFileSync('src/primitives/ScrollArea/ScrollArea.css', 'utf8');
const widget = readFileSync('src/composites/Widget/Widget.css', 'utf8');
const sizes = readFileSync('src/tokens/size.css', 'utf8');

describe('ScrollArea slim gutter', () => {
  it('reserves the inline end for a slim area that scrolls down', () => {
    expect(area).toMatch(/:where\(\.scroll-area\[data-scrollbar='slim'\]:not\(\[data-axis='x'\]\)\) \{\s*padding-inline-end: var\(--scrollbar-slim-gutter\);/);
  });

  it('sizes the gutter from the thumb track tokens', () => {
    expect(sizes).toContain('--scrollbar-slim-gutter: calc(2 * var(--size-2) + var(--scrollbar-slim-active));');
  });

  it('leaves Widget to the shared gutter instead of its own copy of the sum', () => {
    expect(widget).not.toContain('--scroll-thumb-edge');
    expect(widget).not.toMatch(/\.widget__content \{[^}]*padding-right/);
  });
});

describe('ScrollArea native gutter', () => {
  it('keeps the width of a page that scrolls down, so a scrollbar that comes and goes cannot flip its columns', () => {
    expect(area).toMatch(/\.scroll-area\[data-axis='y'\] \{\s*overflow: hidden auto;\s*scrollbar-gutter: stable;/);
    expect(area).toMatch(/\.scroll-area\[data-axis='both'\] \{\s*overflow: auto;\s*scrollbar-gutter: stable;/);
  });
});
