/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { menuClasses } from '../src/composites/DropdownMenu/behavior/menu-classes';
import { menuLookClass } from '../src/composites/DropdownMenu/behavior/menu-look-class';
import { ToolbarContext } from '../src/composites/Toolbar/behavior/toolbar-context';
import { toolMenuSide } from '../src/composites/Toolbar/behavior/tool-menu-side';
import { toolOpenKey } from '../src/composites/Toolbar/behavior/tool-open-key';
import { ToolbarToolMenu } from '../src/composites/Toolbar/sub-components/ToolbarToolMenu';
import { toolbarMenuSide } from '../src/composites/ToolbarDock/behavior/toolbar-menu-side';

const seen = vi.hoisted(() => []);

vi.mock('../src/composites/DropdownMenu', () => ({
  DropdownMenu: (props) => {
    seen.push(props);
    return null;
  },
}));

const tool = { mode: 'focus', close: () => undefined, hover: {} };
const base = { groups: [], anchorRef: { current: null }, tool, label: 'Transform', hoverOpen: false, popup: false };
const context = (orientation, menuSide) => ({ orientation, menuSide, layout: 'bar', size: 'sm', stop: undefined, measure: false });

const menuProps = (orientation, menuSide, extra = {}) => {
  seen.length = 0;
  renderToString(h(ToolbarContext, { value: context(orientation, menuSide) }, h(ToolbarToolMenu, { ...base, ...extra })));
  return seen[0];
};

const withoutPlace = (props) => Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'side' && key !== 'align'));

describe('a toolbar menu on each side', () => {
  it('opens below a horizontal toolbar and beside a vertical one, to the right unless told otherwise', () => {
    expect(toolMenuSide('horizontal', 'right')).toBe('below');
    expect(toolMenuSide('horizontal', 'left')).toBe('below');
    expect(toolMenuSide('vertical', 'right')).toBe('right');
    expect(toolMenuSide('vertical', 'left')).toBe('left');
  });

  it('puts the menu of a left dock on its right and of a right dock on its left', () => {
    expect(toolbarMenuSide('left')).toBe('right');
    expect(toolbarMenuSide('right')).toBe('left');
    expect(toolbarMenuSide('top')).toBe('right');
    expect(toolbarMenuSide('bottom')).toBe('right');
  });

  it('opens the menu with the arrow that points at it', () => {
    expect(toolOpenKey('horizontal', 'right')).toBe('ArrowDown');
    expect(toolOpenKey('vertical', 'right')).toBe('ArrowRight');
    expect(toolOpenKey('vertical', 'left')).toBe('ArrowLeft');
  });

  it('hands a vertical toolbar menu the same props as a horizontal one but the side', () => {
    const top = menuProps('horizontal', 'right');
    const left = menuProps('vertical', 'right');
    const right = menuProps('vertical', 'left');
    expect([top.side, left.side, right.side]).toEqual(['below', 'right', 'left']);
    expect(withoutPlace(left)).toEqual(withoutPlace(top));
    expect(withoutPlace(right)).toEqual(withoutPlace(top));
  });

  it('draws every menu with the same classes whatever the side', () => {
    const look = menuLookClass('primary', 'strong');
    const classes = menuClasses(look, false, undefined);
    expect(classes).toBe('dropdown-menu dropdown-surface dropdown-look dropdown-look--primary dropdown-look--strong');
    expect(menuClasses(look, true, 'extra')).toBe(`${classes} dropdown-menu--inline extra`);
  });

  it('opens a click-open item through the same menu component as a hover-open one', () => {
    const hover = menuProps('vertical', 'right', { hoverOpen: true });
    const click = menuProps('vertical', 'right', { hoverOpen: false });
    expect(Object.keys(click)).toEqual(Object.keys(hover));
    expect(click.hover).toBeUndefined();
    expect(hover.hover).toBe(tool.hover);
    expect({ ...click, hover: undefined }).toEqual({ ...hover, hover: undefined });
  });
});

describe('menu width in CSS', () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

  it('caps the menu width with tokens and never scrolls sideways', () => {
    const css = read('../src/theme/dropdown-menu.css');
    expect(css).toContain('max-inline-size: min(var(--size-448), 100vw - 2 * var(--space-xs));');
    expect(css).toContain('overflow: hidden auto;');
  });

  it('wraps an item description inside the menu instead of overflowing', () => {
    const css = read('../src/composites/DropdownMenu/sub-components/MenuPanel.css');
    expect(css).toContain('minmax(0, 1fr)');
    expect(css).toMatch(/white-space: normal;\s+overflow-wrap: anywhere;/);
  });
});
