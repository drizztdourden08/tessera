/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Widget } from '../src/composites/Widget';

const TABS = [{ id: 'hints', label: 'Hints', icon: 'circle-help' }, { id: 'players', label: 'Players', icon: 'users' }];

const widget = (tabs, activeId) => renderToString(h(Widget, {
  id: activeId, tabs, activeId, paneKey: 'p1', opacity: 1,
  onActivateTab: () => undefined, onClose: () => undefined,
}, h('p', null, 'Body')));

const before = (html, label) => {
  const at = html.indexOf(`${label}<`);
  const svg = html.lastIndexOf('<svg', at);
  return { at, svg, hidden: html.slice(svg, at).includes('aria-hidden="true"') };
};

describe('the widget title bar icon', () => {
  it('draws before the title of a single widget, hidden from the tree', () => {
    const { at, svg, hidden } = before(widget([TABS[0]], 'hints'), 'Hints');
    expect(svg).toBeGreaterThan(-1);
    expect(svg).toBeLessThan(at);
    expect(hidden).toBe(true);
  });

  it('draws before each tab label of a tabbed pane', () => {
    const html = widget(TABS, 'hints');
    for (const label of ['Hints', 'Players']) {
      const { at, svg, hidden } = before(html, label);
      expect(svg).toBeGreaterThan(-1);
      expect(svg).toBeLessThan(at);
      expect(hidden).toBe(true);
    }
  });

  it('is absent when no icon is given', () => {
    expect(widget([{ id: 'hints', label: 'Hints' }], 'hints')).not.toContain('widget__icon');
    expect(widget(TABS.map((tab) => ({ id: tab.id, label: tab.label })), 'hints')).not.toContain('widget__icon');
  });
});
