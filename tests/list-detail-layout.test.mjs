/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { layoutOptionsOf } from '../src/composites/ListDetailLayout/behavior/layout-options-of';

const draw = (extra = {}) => renderToString(h(ListDetailLayout, { listContainers: [{ title: 'Rows', content: h('p', null, 'Rows') }], detail: h('p', null, 'Detail'), ...extra }));

afterEach(() => vi.unstubAllGlobals());

describe('the ListDetailLayout list width', () => {
  it('starts at a stored width, kept between its limits', () => {
    vi.stubGlobal('localStorage', { getItem: (name) => (name === 'presets.list' ? '999' : null) });
    expect(draw({ storageKey: 'presets.list' })).toContain('grid-template-columns:480px 0 minmax(0, 1fr)');
  });
});

describe('ListDetailLayout', () => {
  it('draws the list pane, the pane edge with the divider and the fold button, and the detail pane', () => {
    const html = draw();
    expect(html).toContain('grid-template-columns:320px 0 minmax(0, 1fr)');
    expect(html).toMatch(/class="box--sunken list-detail-layout__list".*class="pane-edge pane-edge--horizontal pane-edge--edge-start list-detail-layout__edge".*class="list-detail-layout__detail"/);
    expect(html.match(/role="separator"/g)).toHaveLength(1);
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="320" aria-valuemin="0" aria-valuemax="480" aria-controls=/);
    expect(html).toContain('aria-label="Resize list and details"');
    expect(draw({ collapsible: false })).toMatch(/role="separator"[^>]*aria-valuenow="320" aria-valuemin="240" aria-valuemax="480"/);
  });

  it('folds the list with a button named for it, that controls the list pane', () => {
    const open = draw({ listLabel: 'presets' });
    const listId = /id="([^"]+)" class="box--sunken list-detail-layout__list"/.exec(open)?.[1];
    expect(listId).toBeTruthy();
    expect(open).toContain(`aria-label="Hide presets" title="Hide presets" aria-expanded="true" aria-controls="${listId}"`);
    expect(draw({ collapsible: false })).not.toContain('pane-edge__toggle');
  });

  it('draws a folded list as a rail in its pane: the one divider stays, the detail takes the room, the button shows the list again', () => {
    for (const html of [draw({ collapsed: true, listLabel: 'presets' }), draw({ defaultCollapsed: true, listLabel: 'presets' })]) {
      expect(html).toContain('class="list-detail-layout list-detail-layout--collapsed"');
      expect(html).toContain('grid-template-columns:var(--side-nav-w) 0 minmax(0, 1fr)');
      expect(html).toContain('pane-rail pane-rail--folded pane-rail--start');
      expect(html).toContain('aria-label="Show presets"');
      expect(html).toContain('aria-expanded="false"');
      expect(html).toMatch(/pane-rail__label" aria-hidden="true">presets</);
      expect(html.match(/role="separator"/g)).toHaveLength(1);
      expect(html).toMatch(/role="separator"[^>]*aria-valuenow="0" aria-valuemin="0"/);
    }
    expect(draw({ collapsed: true, collapsible: false })).not.toContain('list-detail-layout--collapsed');
  });

  it('keeps the fold under its own name beside the stored width', () => {
    const options = layoutOptionsOf({ list: null, storageKey: 'presets.list' });
    expect(options.width.storageKey).toBe('presets.list');
    expect(options.collapse.storageKey).toBe('presets.list:collapsed');
    expect(layoutOptionsOf({ list: null }).collapse.storageKey).toBeUndefined();
  });

  it('reads a folded list from storage', () => {
    vi.stubGlobal('localStorage', { getItem: (name) => (name === 'presets.list:collapsed' ? 'true' : null) });
    expect(draw({ storageKey: 'presets.list' })).toContain('list-detail-layout--collapsed');
  });

  it('shows emptyDetail, or Pick an item, when there is no detail, and names the view a small window shows', () => {
    expect(draw()).toContain('data-view="both"');
    expect(draw()).not.toContain('list-detail-layout__back');
    const empty = draw({ onBack: () => undefined, detail: null });
    expect(empty).toContain('data-view="list"');
    expect(empty).toContain('list-detail-layout__detail list-detail-layout__detail--empty');
    expect(empty).toContain('Pick an item from the list.');
    expect(draw({ detail: false, emptyDetail: h('p', null, 'Pick a session.') })).toContain('<p>Pick a session.</p>');
    const picked = draw({ onBack: () => undefined, backLabel: 'All servers' });
    expect(picked).toContain('data-view="detail"');
    expect(picked).toMatch(/list-detail-layout__back.*All servers.*Detail/);
  });
});

describe('ListDetailLayout columns by share', () => {
  it('gives the list a share of the room, and the divider drags it in percent between 20 and 80', () => {
    const html = draw({ listRatio: 0.6 });
    expect(html).toContain('grid-template-columns:minmax(0, 60fr) 0 minmax(0, 40fr)');
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="60" aria-valuemin="0" aria-valuemax="80"/);
    expect(draw({ listRatio: 0.6, collapsible: false })).toMatch(/role="separator"[^>]*aria-valuenow="60" aria-valuemin="20" aria-valuemax="80"/);
    expect(draw({ listRatio: 0.95 })).toContain('grid-template-columns:minmax(0, 80fr) 0 minmax(0, 20fr)');
  });

  it('keeps a stored share apart from a stored width', () => {
    const options = layoutOptionsOf({ list: null, storageKey: 'records', listRatio: 0.6 });
    expect(options.width).toEqual({ initial: 60, min: 20, max: 80, storageKey: 'records:ratio', fine: true });
    expect(options.ratio).toBe(true);
    expect(layoutOptionsOf({ list: null, storageKey: 'records' }).width.storageKey).toBe('records');
    vi.stubGlobal('localStorage', { getItem: (name) => (name === 'records:ratio' ? '70' : null) });
    expect(draw({ storageKey: 'records', listRatio: 0.6 })).toContain('minmax(0, 70fr) 0 minmax(0, 30fr)');
  });
});

describe('ListDetailLayout detail fold', () => {
  it('draws no detail fold button unless detailCollapsible is set', () => {
    expect(draw()).not.toContain('Hide details');
    const open = draw({ detailCollapsible: true, detailLabel: 'record' });
    const detailId = /id="([^"]+)" class="list-detail-layout__detail"/.exec(open)?.[1];
    expect(detailId).toBeTruthy();
    expect(open).toContain(`aria-label="Hide record" title="Hide record" aria-expanded="true" aria-controls="${detailId}"`);
    expect(open).toContain('aria-label="Hide list"');
  });

  it('draws a folded detail as a rail in its pane: the one divider stays, the list takes the room, the button shows the detail again', () => {
    const folded = [
      draw({ detailCollapsible: true, detailCollapsed: true, detailLabel: 'record' }),
      draw({ detailCollapsible: true, defaultDetailCollapsed: true, detailLabel: 'record' }),
    ];
    for (const html of folded) {
      expect(html).toContain('list-detail-layout--detail-collapsed');
      expect(html).toContain('grid-template-columns:minmax(0, 1fr) 0 var(--side-nav-w)');
      expect(html).toContain('aria-label="Show record"');
      expect(html).not.toContain('aria-label="Hide list"');
      expect(html).toMatch(/pane-rail__label" aria-hidden="true">record</);
      expect(html).toContain('list-detail-layout__detail list-detail-layout__detail--folded');
      expect(html).toContain('box--sunken pane-rail pane-rail--folded pane-rail--end');
      expect(html.match(/role="separator"/g)).toHaveLength(1);
      expect(html).toMatch(/role="separator"[^>]*aria-valuenow="480"/);
    }
    expect(draw({ detailCollapsed: true })).not.toContain('list-detail-layout--detail-collapsed');
  });

  it('keeps the list fold when both are folded, and the detail fold under its own name', () => {
    const both = draw({ collapsed: true, detailCollapsible: true, detailCollapsed: true });
    expect(both).toContain('list-detail-layout--collapsed');
    expect(both).not.toContain('list-detail-layout--detail-collapsed');
    expect(both).toContain('grid-template-columns:var(--side-nav-w) 0 minmax(0, 1fr)');
    expect(layoutOptionsOf({ list: null, storageKey: 'records' }).detailCollapse.storageKey).toBe('records:detail-collapsed');
    vi.stubGlobal('localStorage', { getItem: (name) => (name === 'records:detail-collapsed' ? 'true' : null) });
    expect(draw({ storageKey: 'records', detailCollapsible: true })).toContain('list-detail-layout--detail-collapsed');
  });
});

describe('ListDetailLayout pane scroll', () => {
  it('lets a pane clip so its content scrolls by itself', () => {
    expect(draw()).not.toContain('--clip');
    const html = draw({ listScroll: false, detailScroll: false });
    expect(html).toContain('class="box--sunken list-detail-layout__list list-detail-layout__list--clip"');
    expect(html).toContain('class="list-detail-layout__detail list-detail-layout__detail--clip"');
  });
});

describe('ListDetailLayout seam with both panes foldable', () => {
  const paired = 'list-detail-layout--paired';

  it('marks the layout paired only while both panes are foldable and open', () => {
    expect(draw({ detailCollapsible: true })).toContain(paired);
    expect(draw()).not.toContain(paired);
    expect(draw({ collapsible: false, detailCollapsible: true })).not.toContain(paired);
    expect(draw({ detailCollapsible: true, collapsed: true })).not.toContain(paired);
    expect(draw({ detailCollapsible: true, detailCollapsed: true })).not.toContain(paired);
  });

  it('puts the detail button and dashed line on the detail edge, one seam space from the list edge', () => {
    const list = fs.readFileSync('src/composites/ListDetailLayout/ListDetailLayout.css', 'utf8');
    const edge = fs.readFileSync('src/composites/pane-edge/PaneEdge.css', 'utf8');
    expect(list).toMatch(/--list-detail-seam: var\(--space-2xl\)/);
    expect(list).toMatch(/\.list-detail-layout--paired [^{]*\.list-detail-layout__detail \{[^}]*margin-inline-start: var\(--list-detail-seam\);[^}]*border-inline-start: var\(--list-detail-fold-line\)/);
    expect(edge).toMatch(/\.list-detail-layout--paired [^{]*\.pane-edge__toggle--end \{[^}]*inset-inline-start: var\(--list-detail-seam\)/);
  });
});
