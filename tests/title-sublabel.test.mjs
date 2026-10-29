/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { PanelContainer } from '../src/composites/PanelContainer';
import { Widget } from '../src/composites/Widget';

const TABS = [{ id: 'hints', label: 'Hints', sublabel: 'Race 4' }, { id: 'players', label: 'Players' }];

const widget = (tabs, activeId) => renderToString(
  h(Widget, { id: activeId, tabs, activeId, paneKey: null, opacity: 1, onClose: () => undefined, onActivateTab: () => undefined }, 'Body'),
);

describe('the title strip sublabel', () => {
  it('draws after the title of a single widget', () => {
    const html = widget([TABS[0]], 'hints');
    expect(html).toContain('title-strip__sublabel');
    expect(html.indexOf('Race 4')).toBeGreaterThan(html.indexOf('Hints'));
  });

  it('is absent without one', () => {
    expect(widget([TABS[1]], 'players')).not.toContain('title-strip__sublabel');
  });

  it('stays out of the tab chips of a tabbed pane', () => {
    expect(widget(TABS, 'hints')).not.toContain('Race 4');
  });

  it('draws in a PanelContainer title', () => {
    const html = renderToString(h(PanelContainer, { title: 'Laps', sublabel: 'Monza' }, 'Body'));
    expect(html).toContain('title-strip__sublabel');
    expect(html).toContain('Monza');
    expect(renderToString(h(PanelContainer, { title: 'Laps' }, 'Body'))).not.toContain('title-strip');
  });
});
