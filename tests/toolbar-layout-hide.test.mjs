/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import {
  canShowToolbar, createToolbarLayout, hideToolbar, isToolbarShown, migrateToolbarLayout, showToolbar, toggleToolbar, toolbarIdsOf,
} from '../src/composites/ToolbarDock';
import { DEFS, bar, def, fullDefs, v2 } from './fixtures/toolbar-dock/toolbar-layout-kit.mjs';

describe('hideToolbar', () => {
  it('records the spot, drops the emptied lane and its corner claim', () => {
    const layout = createToolbarLayout(DEFS);
    const hidden = hideToolbar(layout, 'a');
    expect(hidden.sides.top).toEqual([[bar('b')]]);
    expect(hidden.hidden).toContain('a');
    expect(hidden.last.a).toEqual({ side: 'top', lane: 0, start: 0, size: 1 });
    expect(hidden.corners['top-left']).toEqual(['h', 'v']);
    expect(hidden.corners['top-right']).toEqual(['h']);
  });

  it('hides the last toolbar of a side and leaves the side empty', () => {
    const hidden = hideToolbar(createToolbarLayout(DEFS), 'c');
    expect(hidden.sides.left).toEqual([]);
    expect(hidden.corners['top-left']).toEqual(['h', 'h']);
    expect(hidden.corners['bottom-left']).toEqual([]);
  });

  it('keeps a lane that still holds another toolbar', () => {
    const defs = [def('a', 'top'), def('b', 'top')];
    const layout = migrateToolbarLayout(v2({ top: [[bar('a', 0, 0.4), bar('b', 0.5, 0.5)]] }), defs);
    const hidden = hideToolbar(layout, 'a');
    expect(hidden.sides.top).toEqual([[bar('b', 0.5, 0.5)]]);
    expect(hidden.last.a).toEqual({ side: 'top', lane: 0, start: 0, size: 0.4 });
    expect(hidden.corners['top-left']).toEqual(['h']);
  });

  it('removes the claim of the dropped lane, not the last one', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'left')];
    const layout = migrateToolbarLayout(v2({ top: [[bar('a')], [bar('b')]], left: [[bar('c')]] }, { corners: { 'top-left': ['h', 'v', 'h'] } }), defs);
    expect(layout.corners['top-left']).toEqual(['h', 'v', 'h']);
    expect(hideToolbar(layout, 'a').corners['top-left']).toEqual(['v', 'h']);
    expect(hideToolbar(layout, 'b').corners['top-left']).toEqual(['h', 'v']);
  });

  it('returns the same object when hidden or unknown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(hideToolbar(layout, 'd')).toBe(layout);
    expect(hideToolbar(layout, 'zzz')).toBe(layout);
  });
});

describe('showToolbar', () => {
  it('hide then show returns to last', () => {
    const layout = createToolbarLayout(DEFS);
    const back = showToolbar(hideToolbar(layout, 'a'), 'a', DEFS);
    expect(back.sides.top).toEqual([[bar('a')], [bar('b')]]);
    expect(back.hidden).not.toContain('a');
    expect(back.corners).toEqual(layout.corners);
  });

  it('shows on the default side when there is no last', () => {
    expect(showToolbar(createToolbarLayout(DEFS), 'd', DEFS).sides.bottom).toEqual([[bar('d')]]);
  });

  it('falls back in the order top, left, right, bottom', () => {
    const four = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'left'), def('e', 'right'), def('f', 'right')];
    const right = [...four.slice(0, 4), def('x', 'top', { hiddenByDefault: true })];
    expect(toolbarIdsOf(showToolbar(createToolbarLayout(right), 'x', right), 'right')).toEqual(['x']);
    const bottom = [...four, def('y', 'top', { hiddenByDefault: true })];
    expect(toolbarIdsOf(showToolbar(createToolbarLayout(bottom), 'y', bottom), 'bottom')).toEqual(['y']);
  });

  it('falls back to left once top is full', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'top', { hiddenByDefault: true })];
    expect(toolbarIdsOf(showToolbar(createToolbarLayout(defs), 'c', defs), 'left')).toEqual(['c']);
  });

  it('refuses when every lane is full', () => {
    const defs = [...fullDefs(), def('extra', 'top')];
    const layout = createToolbarLayout(defs);
    expect(showToolbar(layout, 'extra', defs)).toBe(layout);
    expect(canShowToolbar(layout, 'extra', defs)).toBe(false);
  });

  it('returns the same object when already shown or unknown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(showToolbar(layout, 'a', DEFS)).toBe(layout);
    expect(showToolbar(layout, 'zzz', DEFS)).toBe(layout);
  });

  it('toggles and reports shown', () => {
    const layout = createToolbarLayout(DEFS);
    expect(isToolbarShown(layout, 'a')).toBe(true);
    expect(isToolbarShown(layout, 'd')).toBe(false);
    const off = toggleToolbar(layout, 'a', DEFS);
    expect(isToolbarShown(off, 'a')).toBe(false);
    expect(toolbarIdsOf(toggleToolbar(off, 'a', DEFS), 'top')).toEqual(['a', 'b']);
    expect(canShowToolbar(layout, 'd', DEFS)).toBe(true);
  });
});
