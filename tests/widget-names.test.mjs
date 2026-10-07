/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { heroBrand } from '../src/composites/Hero/behavior/hero-brand';
import { DockPanes } from '../src/composites/DockLayout/sub-components/DockPanes';
import { Widget, WidgetOptions } from '../src/composites/Widget';

const widget = (extra = {}) => renderToString(h(Widget, {
  id: 'players', tabs: [{ id: 'players', label: 'Players' }], activeId: 'players', paneKey: 'p1', opacity: 1,
  onActivateTab: () => undefined, onClose: () => undefined, onPopOut: () => undefined, ...extra,
}, h('p', null, 'Four online')));

describe('the widget title bar buttons', () => {
  it('carry the widget name, so six open widgets read apart', () => {
    const html = widget();
    expect(html).toContain('aria-label="Close Players"');
    expect(html).toContain('aria-label="Pop out Players"');
    expect(widget({ mode: 'out' })).toContain('aria-label="Pop in Players"');
  });

  it('name the options trigger after the widget', () => {
    const options = h(WidgetOptions, {
      title: 'Players', placement: 'dock', makeRoom: true, opacity: 1, show: 'always',
      onDock: () => undefined, onFloat: () => undefined, onMakeRoomChange: () => undefined, onOpacityChange: () => undefined, onShowChange: () => undefined, onReset: () => undefined,
    });
    expect(widget({ options })).toContain('aria-label="Players options"');
  });
});

describe('test hooks', () => {
  it('mark each widget with data-widget-id and each dock pane with data-pane-id', () => {
    expect(widget()).toContain('data-widget-id="players"');
    const laid = { leaves: [{ node: { kind: 'pane', key: 'p1', widgets: ['players'], active: 'players', makeRoom: true }, rect: { x: 0, y: 0, width: 200, height: 100 } }] };
    const html = renderToString(h(DockPanes, { laid, renderPane: () => h('span', null, 'pane') }));
    expect(html).toContain('data-pane-id="p1"');
  });
});

describe('the widget region', () => {
  it('makes the widget a region named by its title, or by its open tab in a tabbed pane', () => {
    const one = widget();
    const titleId = one.match(/<span class="[^"]*widget__title" id="([^"]+)">Players</)?.[1];
    expect(titleId).toMatch(/\S/);
    expect(one).toMatch(new RegExp(`<div[^>]*role="region"[^>]*aria-labelledby="${titleId}"`));
    const tabbed = widget({ tabs: [{ id: 'players', label: 'Players' }, { id: 'hints', label: 'Hints' }], activeId: 'hints' });
    expect(tabbed).toMatch(/<div[^>]*role="region"[^>]*aria-label="Hints"/);
    expect(tabbed).not.toContain('aria-labelledby');
  });
});

describe('the Hero brand', () => {
  it('takes its own brand, else the nearest palette when it names a brand, else tessera', () => {
    expect(heroBrand('rotp', 'brock')).toBe('rotp');
    expect(heroBrand(undefined, 'brock')).toBe('brock');
    expect(heroBrand(undefined, 'sunset')).toBe('tessera');
    expect(heroBrand(undefined, null)).toBe('tessera');
  });
});
