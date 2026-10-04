/* @layer tooling-scripts @kind test */
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
});
