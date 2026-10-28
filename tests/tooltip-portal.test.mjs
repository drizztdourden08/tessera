/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { TooltipBubble } from '../src/primitives/Tooltip/sub-components/TooltipBubble';

vi.mock('../src/primitives/Portal', async () => {
  const { createElement } = await import('react');
  return { Portal: ({ layer, children }) => createElement('div', { 'data-portal': layer }, children) };
});
vi.mock('../src/primitives/Anchored', async () => {
  const { createElement } = await import('react');
  return { Anchored: (props) => createElement('div', { id: props.id, role: props.role, 'data-portal-prop': String(props.portal) }, props.children) };
});

const bubble = (extra = {}) => renderToStaticMarkup(h(TooltipBubble, {
  atPointer: false, attach: () => undefined, bubbleRef: { current: null }, anchorRef: { current: null }, id: 'tip', placement: 'top', children: 'Opens above', ...extra,
}));

describe('Tooltip bubble', () => {
  it('draws the anchored bubble inside the portal, so it never sits inside its anchor', () => {
    const html = bubble();
    expect(html).toMatch(/^<div data-portal="tooltip"><div[^>]*role="tooltip"/);
    expect(html).toContain('id="tip"');
    expect(html).toContain('data-portal-prop="false"');
  });

  it('draws the pointer bubble inside the portal too', () => {
    expect(bubble({ atPointer: true })).toMatch(/^<div data-portal="tooltip"><div[^>]*role="tooltip"/);
  });
});
