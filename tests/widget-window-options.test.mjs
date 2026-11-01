/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { windowRowsFor } from '../src/composites/Widget/behavior/window-rows-for';

describe('K1 the window rows WidgetManager hands to WidgetOptions', { tags: ['critical'] }, () => {
  it('gives no rows when the host has no window options for the widget', () => {
    expect(windowRowsFor({ windowOptions: () => undefined, onWindowOptionsChange: vi.fn() }, 'log')).toEqual({});
    expect(windowRowsFor({ windowOptions: () => ({ sync: true }) }, 'log')).toEqual({});
  });

  it('reports a sync change with the widget id, and hands over no group row', () => {
    const change = vi.fn();
    const rows = windowRowsFor({ windowOptions: () => ({ sync: true }), onWindowOptionsChange: change }, 'log');
    expect(Object.keys(rows).sort()).toEqual(['onSyncChange', 'sync']);
    rows.onSyncChange(false);
    expect(change.mock.calls).toEqual([['log', { sync: false }]]);
  });
});
