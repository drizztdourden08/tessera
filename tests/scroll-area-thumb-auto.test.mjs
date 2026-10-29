/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ScrollArea } from '../src/primitives/ScrollArea';
import { slimThumbIdleMs } from '../src/primitives/ScrollArea/behavior/slim-thumb-idle-ms';
import { slimThumbSpan } from '../src/primitives/ScrollArea/behavior/slim-thumb-span';

const area = readFileSync('src/primitives/ScrollArea/ScrollArea.css', 'utf8');
const motion = readFileSync('src/tokens/motion.css', 'utf8');

const nodeWith = (value) => ({ ownerDocument: { defaultView: { getComputedStyle: () => ({ getPropertyValue: () => value }) } } });

describe('ScrollArea thumb auto', () => {
  it('marks only a slim area that asks for auto', () => {
    expect(renderToString(h(ScrollArea, { scrollbar: 'slim', thumb: 'auto' }, 'x'))).toContain('data-thumb="auto"');
    expect(renderToString(h(ScrollArea, { scrollbar: 'slim' }, 'x'))).not.toContain('data-thumb');
    expect(renderToString(h(ScrollArea, { scrollbar: 'slim', thumb: 'always' }, 'x'))).not.toContain('data-thumb');
    expect(renderToString(h(ScrollArea, { thumb: 'auto' }, 'x'))).not.toContain('data-thumb');
  });

  it('hides the thumb at rest and shows it on hover, focus, scroll or drag', () => {
    expect(area).toMatch(/\[data-thumb='auto'\]:not\(:hover, :focus-within, \[data-scrolling\], \[data-scroll-thumb\]\) \{\s*--scroll-thumb-w: var\(--scrollbar-slim-rest\);/);
  });

  it('adds no fade of its own, so reduced motion only has the width change to switch off', () => {
    expect(area).toMatch(/prefers-reduced-motion: reduce\) \{[\s\S]*\[data-scrollbar='slim'\] \{\s*transition: none;/);
  });

  it('leaves the hit strip to the script, so a thumb hidden at rest keeps its full hit area', () => {
    expect(readFileSync('src/primitives/ScrollArea/behavior/slim-thumb-hit.ts', 'utf8')).not.toContain('data-thumb');
  });

  it('reads the idle delay from the duration token in seconds or milliseconds', () => {
    expect(motion).toContain('--duration-scrollbar-idle:');
    expect(slimThumbIdleMs(nodeWith(' 0.9s'))).toBe(900);
    expect(slimThumbIdleMs(nodeWith('600ms'))).toBe(600);
    expect(slimThumbIdleMs(nodeWith(''))).toBe(0);
  });

  it('draws no thumb when the content fits, even by a pixel of slack', () => {
    expect(slimThumbSpan(200, 200, 0)).toBeNull();
    expect(slimThumbSpan(200, 201, 0)).toBeNull();
    expect(area).toMatch(/var\(--scroll-thumb-y-w, 0\) min\(/);
  });
});
