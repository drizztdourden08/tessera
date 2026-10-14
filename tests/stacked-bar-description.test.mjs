/* @layer tooling-scripts @kind test */
import { createElement as h, Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { StackedBar } from '../src/primitives/StackedBar';

vi.mock('../src/primitives/Tooltip', () => ({
  Tooltip: ({ content, children }) => h(Fragment, null, children, h('output', null, content)),
}));

const segments = [
  { id: 'items', label: 'Items', value: 6, description: 'Placed by the shuffle' },
  { id: 'filler', label: 'Filler', value: 3 },
  { id: 'fixed', label: 'Fixed', value: 1, description: 'Settled before the shuffle' },
];

const tips = (html) => [...html.matchAll(/<output>(.*?)<\/output>/g)].map((match) => match[1]);

describe('a description on a StackedBar segment', () => {
  it('shows under the name, value and share in the tooltip of that segment only', () => {
    const [items, filler, fixed] = tips(renderToString(h(StackedBar, { segments })));
    expect(items).toBe('<span class="text-el text-el--span stacked-bar__tip">Items: 6, 60%</span><span class="text-el text-el--span stacked-bar__about">Placed by the shuffle</span>');
    expect(filler).toBe('Filler: 3, 30%');
    expect(fixed).toContain('Settled before the shuffle');
  });

  it('drops the descriptions of parts grouped into Other', () => {
    const html = renderToString(h(StackedBar, { segments, limit: 2 }));
    expect(html).toContain('Placed by the shuffle');
    expect(html).not.toContain('Settled before the shuffle');
  });
});
