/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const area = readFileSync('src/primitives/ScrollArea/ScrollArea.css', 'utf8');
const component = readFileSync('src/primitives/ScrollArea/ScrollArea.tsx', 'utf8') + readFileSync('src/primitives/ScrollArea/behavior/scroll-area-class.ts', 'utf8');
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
  it('takes no room by default, so dialogs, drawers and palettes keep their width', () => {
    expect(area).not.toMatch(/\.scroll-area\[data-axis='(y|both)'\] \{[^}]*scrollbar-gutter/);
    expect(component).toContain("gutter = 'auto'");
  });

  it('keeps room for the scrollbar with gutter stable, so a page that reflows with width cannot flip its columns', () => {
    expect(area).toMatch(/\.scroll-area--stable-gutter \{\s*scrollbar-gutter: stable;\s*\}/);
    expect(component).toContain("gutter === 'stable' ? 'scroll-area--stable-gutter'");
  });
});
