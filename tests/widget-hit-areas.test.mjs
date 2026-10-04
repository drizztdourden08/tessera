/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FactsPanel } from '../src/composites/FactsPanel';
import { Widget } from '../src/composites/Widget';

describe('the widget title bar buttons', () => {
  it('take the hit-area class', () => {
    const html = renderToString(h(Widget, {
      id: 'players', tabs: [{ id: 'players', label: 'Players' }], activeId: 'players', paneKey: null, opacity: 1, mode: 'out',
      onActivateTab: () => undefined, onClose: () => undefined, onPopOut: () => undefined, onPinChange: () => undefined,
    }, h('p', null, 'Four online')));
    const buttons = html.match(/<button[^>]*>/g) ?? [];
    expect(buttons.length).toBeGreaterThanOrEqual(3);
    for (const button of buttons) expect(button).toMatch(/class="[^"]*widget__btn[^"]*hit-area/);
  });
});

describe('a FactsPanel value cut short', () => {
  it('is focusable, so the keyboard reaches its tooltip', () => {
    const html = renderToString(h(FactsPanel, { groups: [[{ label: 'ROM', value: 'A Link to the Past.sfc', title: 'C:/roms/A Link to the Past.sfc' }]] }));
    expect(html).toContain('tabindex="0"');
  });
});
