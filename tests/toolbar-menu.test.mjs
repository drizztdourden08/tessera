/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { DEFS, LAYOUT } from './fixtures/toolbar-dock/toolbar-dock-frame.mjs';
import { createToolbarLayout, hideToolbar, toolbarMenuGroups } from '../src/composites/ToolbarDock';
import { TOOLBARS_STRINGS } from '../src/primitives/strings/toolbars-strings.constants';

const def = (id, defaultSide) => ({ id, label: `Label ${id}`, defaultSide });

const itemsOf = (groups) => groups[0].items;

describe('toolbarMenuGroups', () => {
  it('lists one check item per toolbar, checked when shown', () => {
    const hidden = hideToolbar(LAYOUT, 'b');
    const groups = toolbarMenuGroups(DEFS, hidden, vi.fn(), TOOLBARS_STRINGS);
    expect(groups[0].label).toBe('Toolbars');
    expect(itemsOf(groups).map((item) => [item.id, item.label, item.kind, item.checked])).toEqual([
      ['a', 'Label a', 'check', true],
      ['b', 'Label b', 'check', false],
      ['c', 'Label c', 'check', true],
      ['d', 'Label d', 'check', true],
    ]);
  });

  it('disables a hidden toolbar when no lane is free, never a shown one', () => {
    const defs = [def('a', 'top'), def('b', 'top'), def('c', 'left'), def('d', 'left'), def('e', 'right'), def('f', 'right'), def('g', 'bottom'), def('h', 'bottom')];
    const full = { ...createToolbarLayout(defs), hidden: ['x'] };
    const items = itemsOf(toolbarMenuGroups([...defs, def('x', 'top')], full, vi.fn(), TOOLBARS_STRINGS));
    expect(items.find((item) => item.id === 'x').disabled).toBe(true);
    expect(items.filter((item) => item.id !== 'x').every((item) => item.disabled === false)).toBe(true);
    const free = itemsOf(toolbarMenuGroups(DEFS, hideToolbar(LAYOUT, 'b'), vi.fn(), TOOLBARS_STRINGS));
    expect(free.find((item) => item.id === 'b').disabled).toBe(false);
  });

  it('toggles the toolbar that is selected', () => {
    const toggle = vi.fn();
    itemsOf(toolbarMenuGroups(DEFS, LAYOUT, toggle, TOOLBARS_STRINGS))[2].onSelect();
    expect(toggle).toHaveBeenCalledOnce();
    expect(toggle).toHaveBeenCalledWith('c');
  });

  it('adds a Reset toolbars item that calls onReset, and none without it', () => {
    const reset = vi.fn();
    const groups = toolbarMenuGroups(DEFS, LAYOUT, vi.fn(), { ...TOOLBARS_STRINGS, onReset: reset });
    expect(groups).toHaveLength(2);
    const [item] = groups[1].items;
    expect(item.label).toBe('Reset toolbars');
    item.onSelect();
    expect(reset).toHaveBeenCalledOnce();
    expect(toolbarMenuGroups(DEFS, LAYOUT, vi.fn(), TOOLBARS_STRINGS)).toHaveLength(1);
  });
});
