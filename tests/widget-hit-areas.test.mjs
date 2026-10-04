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

describe('the widget title strip as a drag region', () => {
  const draw = (extra) => renderToString(h(Widget, {
    id: 'log', tabs: [{ id: 'log', label: 'Log' }], activeId: 'log', paneKey: null, opacity: 1, mode: 'out',
    onActivateTab: () => undefined, onClose: () => undefined, ...extra,
  }, h('p', null, 'Started')));

  it('marks the strip drag and its buttons no-drag with dragRegion', () => {
    const html = draw({ dragRegion: true });
    expect(html).toMatch(/class="widget__titlebar"[^>]*data-app-region="drag"/);
    expect(html).toMatch(/class="widget__titlebar-actions" data-app-region="no-drag"/);
  });

  it('leaves the strip unmarked by default', () => {
    expect(draw({})).not.toContain('data-app-region');
  });
});

describe('a FactsPanel value cut short', () => {
  it('is focusable, so the keyboard reaches its tooltip', () => {
    const html = renderToString(h(FactsPanel, { groups: [[{ label: 'ROM', value: 'A Link to the Past.sfc', title: 'C:/roms/A Link to the Past.sfc' }]] }));
    expect(html).toContain('tabindex="0"');
  });
});
