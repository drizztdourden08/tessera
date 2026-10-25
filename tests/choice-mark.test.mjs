/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ChoiceMark } from '../src/composites/DropdownMenu/sub-components/ChoiceMark';
import { CommandPaletteRowEnd } from '../src/composites/CommandPalette/sub-components/CommandPaletteRowEnd';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const CSS = read('src/composites/DropdownMenu/sub-components/ChoiceMark.css');
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const rule = (selector) => CSS.match(new RegExp(`(?<=(?:\\*/|\\})\\n\\n?)${escape(selector)} \\{[^}]*`))?.[0] ?? '';

describe('ChoiceMark', () => {
  it('draws a centred dot and the mark it turns into, for a check and for a radio', () => {
    const check = renderToString(h(ChoiceMark, { kind: 'check', checked: false }));
    expect(check).toMatch(/^<svg class="choice-mark choice-mark--check" viewBox="0 0 16 16" aria-hidden="true"/);
    expect(check).toContain('<circle class="choice-mark__dot" cx="8" cy="8" r="2">');
    expect(check).toMatch(/<path class="choice-mark__line" d="[^"]+" pathLength="1"/);
    const radio = renderToString(h(ChoiceMark, { kind: 'radio', checked: true }));
    expect(radio).toContain('class="choice-mark choice-mark--radio" data-on=""');
    expect(radio).toMatch(/<circle class="choice-mark__line" cx="8" cy="8" r="5.5" pathLength="1"/);
  });

  it('keeps the same parts on and off, so a change morphs in place instead of swapping elements', () => {
    const parts = (checked) => renderToString(h(ChoiceMark, { kind: 'check', checked })).replace(' data-on=""', '');
    expect(parts(true)).toBe(parts(false));
  });

  it('shows the dot faint when off and draws the line in the item colour when on', () => {
    expect(rule('.choice-mark__dot')).toContain('fill: var(--c-text-disabled)');
    expect(rule('.choice-mark__line')).toContain('stroke: currentcolor');
    expect(rule('.choice-mark__line')).toContain('stroke-dashoffset: 1');
    expect(rule('.choice-mark[data-on] .choice-mark__line')).toContain('stroke-dashoffset: 0');
    expect(rule('.choice-mark--check[data-on] .choice-mark__dot')).toContain('transform: scale(0)');
    expect(rule('.choice-mark--radio[data-on] .choice-mark__dot')).toContain('fill: currentcolor');
  });

  it('morphs with the motion tokens on paint-only properties and switches at once under reduced motion', () => {
    const transitions = [...CSS.matchAll(/^\s+([a-z-]+) var\(--duration-(fast|normal)\) var\(--ease-out\)/gm)].map(([, prop]) => prop);
    expect(new Set(transitions)).toEqual(new Set(['transform', 'fill', 'opacity', 'stroke-dashoffset']));
    expect(CSS).toMatch(/@media \(prefers-reduced-motion: reduce\) \{\s*\.choice-mark__dot,\s*\.choice-mark__line \{\s*transition: none;/);
    expect(rule('.choice-mark')).toContain('width: var(--size-16)');
    expect(rule('.choice-mark')).toContain('height: var(--size-16)');
  });

  it('is the one mark every menu draws: DropdownMenu, the command palette and the video speed menu', () => {
    expect(read('src/composites/DropdownMenu/sub-components/MenuMark.tsx')).toContain('<ChoiceMark kind={kind} checked={checked} />');
    expect(read('src/composites/Video/sub-components/VideoRateMenu.tsx')).toContain('<ChoiceMark kind="radio" checked={value === rate} />');
    const palette = renderToString(h(CommandPaletteRowEnd, { item: { id: 'grid', label: 'Grid', checked: false } }));
    expect(palette).toContain('class="choice-mark choice-mark--check command-palette-row__check"');
  });
});
