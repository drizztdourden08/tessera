/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { windowRowsFor } from '../src/composites/Widget/behavior/window-rows-for';
import { guideHints } from '../src/composites/WindowGuideOverlay/behavior/guide-hints';
import { WIDGET_STRINGS } from '../src/primitives/strings/widgets-strings.constants';

describe('the window rows WidgetManager hands to WidgetOptions', () => {
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

describe('the built-in guide rows', () => {
  it('names Ctrl for a free move, and for a free or lone resize', () => {
    expect(guideHints('moving', WIDGET_STRINGS)).toEqual([{ keys: ['ctrl'], label: 'Move without snapping' }]);
    expect(guideHints('resizing', WIDGET_STRINGS).map((h) => h.label)).toEqual([
      'Resize without snapping', 'On a shared edge: resize this window only',
    ]);
  });
});
