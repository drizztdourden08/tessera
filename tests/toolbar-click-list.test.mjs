/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { foldedGroups } from '../src/composites/Toolbar/behavior/folded-groups';
import { toolButtonProps } from '../src/composites/Toolbar/behavior/tool-button-props';
import { shortcutRows } from '../src/primitives/Shortcut';

const ignore = () => undefined;
const SIZE_KEYS = [{ label: 'Smaller', keys: '[' }, { label: 'Larger', keys: ']' }];
const toggle = (id, extra = {}) => ({ kind: 'toggle', id, label: id, icon: 'eraser', pressed: false, onChange: ignore, ...extra });
const button = (id, extra = {}) => ({ kind: 'button', id, label: id, icon: 'pencil', onSelect: ignore, ...extra });

const tool = { toggle: vi.fn(), hover: { onMouseEnter: ignore, onMouseLeave: ignore }, onKeyDown: ignore, open: false };

describe('K1 Toolbar openOn click', { tags: ['critical'] }, () => {
  it('runs the item and toggles its menu on a press', () => {
    const onPress = vi.fn();
    const props = { stopId: 'p', icon: 'pencil', label: 'p', tip: null, onPress, hoverOpen: false, clickOpen: true };
    toolButtonProps(props, tool, true).onClick();
    expect(onPress).toHaveBeenCalledOnce();
    expect(tool.toggle).toHaveBeenCalledOnce();
  });

  it('leaves a press to the item, and opens nothing on a press, when the menu opens on hover', () => {
    const onPress = vi.fn();
    const props = { stopId: 'p', icon: 'pencil', label: 'p', tip: null, onPress, hoverOpen: true };
    const built = toolButtonProps(props, tool, true);
    expect(built.onClick).toBe(onPress);
    expect(built.hover).toBe(tool.hover);
  });

  it('listens for hover only when the menu opens on hover', () => {
    const base = { stopId: 'p', icon: 'pencil', label: 'p', tip: null };
    expect(toolButtonProps({ ...base, hoverOpen: false, clickOpen: true }, tool, true).hover).toEqual({});
    expect(toolButtonProps({ ...base, hoverOpen: true }, tool, true).hover).toBe(tool.hover);
  });
});

describe('K1 Toolbar two shortcuts', { tags: ['critical'] }, () => {
  it('reads a labelled list as one row for each shortcut', () => {
    expect(shortcutRows(SIZE_KEYS)).toEqual([{ label: 'Smaller', keys: ['['] }, { label: 'Larger', keys: [']'] }]);
    expect(shortcutRows('Ctrl+Z')).toEqual([{ keys: ['ctrl', 'Z'] }]);
    expect(shortcutRows(['ctrl', 'Z'])).toEqual([{ keys: ['ctrl', 'Z'] }]);
  });

  it('folds a labelled list into the first shortcut of the menu item', () => {
    const [entry] = foldedGroups([button('size', { shortcut: SIZE_KEYS })])[0].items;
    expect(entry.shortcut).toBe('[');
    expect(foldedGroups([button('undo', { shortcut: 'Ctrl+Z' })])[0].items[0].shortcut).toBe('Ctrl+Z');
  });
});
});
