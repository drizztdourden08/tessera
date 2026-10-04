/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { widgetOptionsMenu } from '../src/composites/Widget/behavior/widget-options-menu';
import { COMMON_STRINGS } from '../src/primitives/strings/common-strings.constants';
import { WIDGET_STRINGS } from '../src/primitives/strings/widgets-strings.constants';

const WORDS = { widgets: WIDGET_STRINGS, common: COMMON_STRINGS };

const input = (patch = {}) => ({
  placement: 'docked', dockEdge: 'right', makeRoom: true, opacity: 0.9, show: 'context-only',
  onDock: vi.fn(), onFloat: vi.fn(), onPopOut: vi.fn(), onMakeRoomChange: vi.fn(), onOpacityChange: vi.fn(), onShowChange: vi.fn(), onReset: vi.fn(),
  ...patch,
});

const item = (groups, id) => groups.flatMap((group) => group.items).find((node) => node.id === id);

describe('the widget gear menu', () => {
  it('holds placement, main view, show and opacity, then shortcuts and reset, for a docked widget', () => {
    const groups = widgetOptionsMenu(input(), WORDS);
    expect(groups.map((group) => group.id)).toEqual(['layout', 'more']);
    expect(groups[0].items.map((node) => [node.label, node.description])).toEqual([
      ['Placement', 'Dock right'], ['Main view', 'Make room'], ['Show', 'In context'], ['Opacity', '90%'],
    ]);
    expect(groups[1].items.map((node) => node.label)).toEqual(['Shortcuts', 'Reset this widget']);
  });

  it('draws every choice as a radio with its hint, and the current one checked', () => {
    const placement = item(widgetOptionsMenu(input(), WORDS), 'placement');
    expect(placement.children.map((node) => [node.label, node.kind, node.checked])).toEqual([
      ['Dock left', 'radio', false], ['Dock right', 'radio', true], ['Dock top', 'radio', false],
      ['Dock bottom', 'radio', false], ['Float', 'radio', false], ['Own window', 'radio', false],
    ]);
    expect(placement.children[4].description).toBe('Hovers over the main view, free to move');
  });

  it('reports each pick', () => {
    const options = input();
    const groups = widgetOptionsMenu(options, WORDS);
    item(groups, 'placement').children[0].onSelect();
    item(groups, 'placement').children[4].onSelect();
    item(groups, 'placement').children[5].onSelect();
    item(groups, 'main-view').children[1].onSelect();
    item(groups, 'opacity').children[3].onSelect();
    item(groups, 'reset').onSelect();
    expect(options.onDock).toHaveBeenCalledWith('left');
    expect(options.onFloat).toHaveBeenCalled();
    expect(options.onPopOut).toHaveBeenCalled();
    expect(options.onMakeRoomChange).toHaveBeenCalledWith(false);
    expect(options.onOpacityChange).toHaveBeenCalledWith(0.5);
    expect(options.onReset).toHaveBeenCalled();
  });

  it('gives a widget in its own window pin, snap and sync, as a radio sub-menu and two checks', () => {
    const onSnapChange = vi.fn();
    const groups = widgetOptionsMenu(input({ placement: 'popped', pin: 'top', onPinChange: vi.fn(), snap: false, onSnapChange, sync: true, onSyncChange: vi.fn() }), WORDS);
    expect(groups.map((group) => group.id)).toEqual(['layout', 'window', 'more']);
    expect(groups[1].items.map((node) => [node.id, node.kind ?? 'menu', node.checked])).toEqual([['pin', 'menu', undefined], ['snap', 'check', false], ['sync', 'check', true]]);
    expect(item(groups, 'pin').children.map((node) => node.checked)).toEqual([false, true]);
    expect(item(groups, 'placement').children.at(-1).label).toBe('Pop in');
    item(groups, 'snap').onSelect();
    expect(onSnapChange).toHaveBeenCalledWith(true);
    expect(item(groups, 'show')).toBeUndefined();
  });

  it('adds the groups of the widget before shortcuts and reset', () => {
    const own = [{ id: 'players', label: 'Players', items: [{ id: 'compact', label: 'Compact rows', kind: 'check', checked: false }] }];
    expect(widgetOptionsMenu(input({ placement: 'floating', own }), WORDS).map((group) => group.id)).toEqual(['layout', 'players', 'more']);
  });

  it('leaves out the own window choice when the widget cannot pop out', () => {
    const placement = item(widgetOptionsMenu(input({ canPopOut: false }), WORDS), 'placement');
    expect(placement.children.map((node) => node.label)).not.toContain('Own window');
  });
});
