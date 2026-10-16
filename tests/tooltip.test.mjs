/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Tooltip } from '../src/primitives/Tooltip';

describe('Tooltip', () => {
  it('leaves a focusable child as the Tab stop, and draws no bubble while closed', () => {
    const html = renderToString(h(Tooltip, { content: 'Opens above' }, h('button', null, 'Top')));
    expect(html).not.toContain('tabindex');
    expect(html).not.toContain('role="tooltip"');
  });

  it('puts plain text in the Tab order with focusable', () => {
    const html = renderToString(h(Tooltip, { content: 'Seed 48213', focusable: true }, 'Seed info'));
    expect(html).toMatch(/<span class="tooltip-anchor" tabindex="0">Seed info<\/span>/);
  });

  it('wraps a long note inside its 256 px box, and sizes a short one to its text', () => {
    const css = readFileSync(new URL('../src/primitives/Tooltip/Tooltip.css', import.meta.url), 'utf8');
    const box = css.slice(css.indexOf('.tooltip {'), css.indexOf('}', css.indexOf('.tooltip {')));
    expect(box).toContain('width: max-content;');
    expect(box).toContain('max-width: var(--size-256);');
    expect(box).toContain('overflow-wrap: anywhere;');
    expect(box).not.toContain('nowrap');
  });
});
