/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { windowRowsFor } from '../src/composites/Widget/behavior/window-rows-for';
import { groupOptions } from '../src/composites/Widget/sub-components/WidgetOptions/behavior/group-options';
import { NO_GROUP } from '../src/composites/Widget/sub-components/WidgetOptions/WidgetOptions.constants';
import { guideHints } from '../src/composites/WindowGuideOverlay/behavior/guide-hints';
import { WIDGET_STRINGS } from '../src/primitives/strings/widgets-strings.constants';

describe('the window rows WidgetManager hands to WidgetOptions', () => {
  it('gives no rows when the host has no window options for the widget', () => {
    expect(windowRowsFor({ windowOptions: () => undefined, onWindowOptionsChange: vi.fn() }, 'log')).toEqual({});
    expect(windowRowsFor({ windowOptions: () => ({ sync: true }) }, 'log')).toEqual({});
  });

  it('reports each change with the widget id and only the field that changed', () => {
    const change = vi.fn();
    const groups = [{ id: 'left', label: 'Left screen' }];
    const rows = windowRowsFor({ windowOptions: () => ({ sync: true, group: null }), windowGroups: groups, onWindowOptionsChange: change }, 'log');
    expect(rows).toMatchObject({ sync: true, group: null, groups });
    rows.onSyncChange(false);
    rows.onGroupChange('left');
    expect(change.mock.calls).toEqual([['log', { sync: false }], ['log', { group: 'left' }]]);
  });
});

describe('the window group choices', () => {
  it('lists None, then Group 1 to Group 4 by default', () => {
    expect(groupOptions(undefined, WIDGET_STRINGS).map((o) => [o.value, o.label])).toEqual([
      [NO_GROUP, 'None'], ['group-1', 'Group 1'], ['group-2', 'Group 2'], ['group-3', 'Group 3'], ['group-4', 'Group 4'],
    ]);
  });

  it('lists the host groups in place of the numbered ones', () => {
    const options = groupOptions([{ id: 'stream', label: 'Stream' }], WIDGET_STRINGS);
    expect(options.map((o) => o.label)).toEqual(['None', 'Stream']);
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
