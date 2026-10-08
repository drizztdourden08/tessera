/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ListDetailLayout } from '../src/composites/ListDetailLayout';
import { layoutOptionsOf } from '../src/composites/ListDetailLayout/behavior/layout-options-of';

const draw = (extra = {}) => renderToString(h(ListDetailLayout, { list: h('p', null, 'Rows'), detail: h('p', null, 'Detail'), ...extra }));

afterEach(() => vi.unstubAllGlobals());

describe('the ListDetailLayout list width', () => {
  it('starts at a stored width, kept between its limits', () => {
    vi.stubGlobal('localStorage', { getItem: (name) => (name === 'presets.list' ? '999' : null) });
    expect(draw({ storageKey: 'presets.list' })).toContain('grid-template-columns:480px auto minmax(0, 1fr)');
  });
});

describe('ListDetailLayout', () => {
  it('draws the list pane, a gutter with the fold button and the divider, and the detail pane', () => {
    const html = draw();
    expect(html).toContain('grid-template-columns:320px auto minmax(0, 1fr)');
    expect(html).toMatch(/class="list-detail-layout__list".*class="list-detail-layout__gutter".*class="list-detail-layout__detail"/);
    expect(html).toMatch(/role="separator"[^>]*aria-valuenow="320" aria-valuemin="240" aria-valuemax="480" aria-controls=/);
    expect(html).toContain('aria-label="Resize list and details"');
    expect(draw({ resizable: false })).not.toContain('role="separator"');
  });

  it('folds the list with a button named for it, that controls the list pane', () => {
    const open = draw({ listLabel: 'presets' });
    const listId = /id="([^"]+)" class="list-detail-layout__list"/.exec(open)?.[1];
    expect(listId).toBeTruthy();
    expect(open).toContain(`aria-label="Hide presets" title="Hide presets" aria-expanded="true" aria-controls="${listId}"`);
    expect(draw({ collapsible: false })).not.toContain('list-detail-layout__toggle');
  });

  it('draws a folded list as a rail: no divider, the detail takes the room, the button shows the list again', () => {
    for (const html of [draw({ collapsed: true, listLabel: 'presets' }), draw({ defaultCollapsed: true, listLabel: 'presets' })]) {
      expect(html).toContain('class="list-detail-layout list-detail-layout--resizable list-detail-layout--collapsed"');
      expect(html).toContain('grid-template-columns:auto minmax(0, 1fr)');
      expect(html).toContain('aria-label="Show presets"');
      expect(html).toContain('aria-expanded="false"');
      expect(html).toMatch(/list-detail-layout__rail-label" aria-hidden="true">presets</);
      expect(html).not.toContain('role="separator"');
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
