/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { SidePanel } from '../src/composites/SidePanel';
import { sidePanelOptionsOf } from '../src/composites/SidePanel/behavior/side-panel-options-of';
import { SplitPane } from '../src/composites/SplitPane';

const source = (file) => fs.readFileSync(`src/composites/${file}`, 'utf8');
const panel = (extra = {}) => renderToString(h(SidePanel, { title: 'Sprites', ...extra }, 'Rows'));
const list = (extra = {}) => renderToString(h(ListDetailLayout, { list: 'rows', detail: 'detail', ...extra }));
const split = (extra = {}) => renderToString(h(SplitPane, { start: 'a', end: 'b', ...extra }));
const range = (min, max) => new RegExp(`role="separator"[^>]*aria-valuemin="${min}" aria-valuemax="${max}"`);

describe('every pane resizes', () => {
  it('drops the resizable and snapAt props, and gives SplitPane collapsible instead', () => {
    expect(source('SidePanel/SidePanel.type.ts')).not.toContain('resizable');
    expect(source('ListDetailLayout/ListDetailLayout.type.ts')).not.toContain('resizable');
    expect(source('SplitPane/SplitPane.type.ts')).not.toContain('snapAt');
    expect(source('SplitPane/SplitPane.type.ts')).toMatch(/collapsible\?: boolean;/);
    expect(list()).not.toContain('list-detail-layout--resizable');
  });

  it('keeps the separator of a SidePanel that cannot fold, between its own limits', () => {
    const html = panel({ collapsible: false });
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-valuenow="288" aria-valuemin="224" aria-valuemax="448"/);
    expect(panel({ collapsible: false, side: 'end' }).match(/role="separator"/g)).toHaveLength(1);
  });

  it('lets a narrow panel start at its own width, with no minWidth', () => {
    expect(sidePanelOptionsOf({ title: 'Profiles', width: 192 }).width).toMatchObject({ initial: 192, min: 192, max: 448 });
    expect(sidePanelOptionsOf({ title: 'Profiles', width: 600 }).width).toMatchObject({ initial: 600, min: 224, max: 600 });
    const html = panel({ collapsible: false, width: 192 });
    expect(html).toMatch(/aria-valuenow="192" aria-valuemin="192" aria-valuemax="448"/);
    expect(html).toContain('--side-panel-width:192px');
  });

  it('still draws the separator when the minimum equals the maximum', () => {
    const fixed = panel({ collapsible: false, width: 300, minWidth: 300, maxWidth: 300 });
    expect(fixed.match(/role="separator"/g)).toHaveLength(1);
    expect(fixed).toMatch(/aria-valuenow="300" aria-valuemin="300" aria-valuemax="300"/);
    expect(panel({ width: 300, minWidth: 300, maxWidth: 300 })).toMatch(range(0, 300));
    const rows = list({ listWidth: 320, minListWidth: 320, maxListWidth: 320, collapsible: false });
    expect(rows.match(/role="separator"/g)).toHaveLength(1);
    expect(rows).toMatch(range(320, 320));
    expect(split({ collapsible: false, minRatio: 0.5, maxRatio: 0.5 })).toMatch(range(50, 50));
  });
});

describe('dragging a pane to nothing folds it', () => {
  it('lets a SidePanel fold: the separator starts at 0, and sits at 0 while folded', () => {
    expect(panel()).toMatch(/aria-valuenow="288" aria-valuemin="0" aria-valuemax="448"/);
    [panel({ defaultCollapsed: true }), panel({ defaultCollapsed: true, side: 'end' }), panel({ collapsed: true })].forEach((html) => {
      expect(html.match(/role="separator"/g)).toHaveLength(1);
      expect(html).toMatch(/aria-valuenow="0" aria-valuemin="0" aria-valuemax="448"/);
    });
  });

  it('draws a folded ListDetailLayout list as a rail inside the list pane, with the one separator kept', () => {
    const html = list({ defaultCollapsed: true });
    expect(html).toContain('list-detail-layout__list list-detail-layout__list--folded');
    expect(html).toMatch(/list-detail-layout__list--folded"[^>]*><div class="box--sunken pane-rail pane-rail--folded pane-rail--start">/);
    expect(html.indexOf('pane-rail--folded')).toBeLessThan(html.indexOf('class="pane-edge '));
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toContain('grid-template-columns:auto auto minmax(0, 1fr)');
  });

  it('draws a folded SplitPane pane as a rail inside the first pane, in three columns', () => {
    const html = split({ defaultCollapsed: 'start' });
    expect(html).toMatch(/split-pane__pane split-pane__pane--folded"[^>]*><div class="box--sunken pane-rail pane-rail--folded pane-rail--start">/);
    expect(html).toMatch(/class="split-pane__pane">b<\/div>/);
    expect(html).toContain('grid-template-columns:auto auto minmax(0, 1fr)');
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-valuenow="0" aria-valuemin="0" aria-valuemax="80"/);
  });

  it('folds the second pane of a SplitPane at the high end, with the value at its maximum', () => {
    const html = split({ defaultCollapsed: 'end' });
    expect(html).toContain('grid-template-columns:minmax(0, 1fr) auto auto');
    expect(html).toMatch(/aria-valuenow="80" aria-valuemin="0" aria-valuemax="80"/);
    expect(html).toMatch(/split-pane__pane--folded"[^>]*><div class="box--sunken pane-rail pane-rail--folded pane-rail--end">/);
  });

  it('lays a vertical SplitPane out in rows, and folds it into the auto row', () => {
    const open = split({ orientation: 'vertical' });
    expect(open).toContain('style="grid-template-rows:minmax(0, 58fr) auto minmax(0, 42fr)"');
    expect(open).not.toContain('grid-template-columns');
    const folded = split({ orientation: 'vertical', defaultCollapsed: 'start' });
    expect(folded).toContain('style="grid-template-rows:auto auto minmax(0, 1fr)"');
    expect(folded).toContain('pane-rail--across');
    expect(folded.match(/role="separator"/g)).toHaveLength(1);
  });
});
