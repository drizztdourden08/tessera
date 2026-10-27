/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { menuClasses } from '../src/composites/DropdownMenu/behavior/menu-classes';
import { menuPlacement } from '../src/composites/DropdownMenu/behavior/menu-placement';
import { sideCorners } from '../src/composites/DropdownMenu/behavior/side-corners';
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

describe('a menu joins the bar it opens from, whatever the dock side', () => {
  const placeOf = (dock) => menuPlacement(toolMenuSide(dock === 'top' || dock === 'bottom' ? 'horizontal' : 'vertical', toolbarMenuSide(dock)), 'start');

  it('hangs from the trigger under a top bar and beside it on a left or right bar', () => {
    expect(placeOf('top')).toBe('bottom-start');
    expect(placeOf('left')).toBe('right-start');
    expect(placeOf('right')).toBe('left-start');
  });

  it('starts a side menu at the top of its button whatever the align of the item', () => {
    for (const popup of [false, true]) {
      const left = menuProps('vertical', 'right', { popup });
      const right = menuProps('vertical', 'left', { popup });
      expect(menuPlacement(left.side, left.align)).toBe('right-start');
      expect(menuPlacement(right.side, right.align)).toBe('left-start');
    }
  });

  it('joins on the right edge of a left bar and the left edge of a right bar', () => {
    const corners = { topLeft: 1, topRight: 2, bottomLeft: 3, bottomRight: 4 };
    expect(sideCorners({ parentCorners: corners }, 'right')).toEqual([2, 4]);
    expect(sideCorners({ parentCorners: corners }, 'left')).toEqual([1, 3]);
  });

  it('draws the same border, radius and shadow on every side and flows in away from the bar', () => {
    const css = readFileSync(new URL('../src/theme/dropdown-menu.css', import.meta.url), 'utf8');
    expect(css).toContain('border: var(--border-width-thin) solid var(--c-border);');
    expect(css).toContain('border-radius: var(--radius-md);');
    expect(css).not.toMatch(/data-anchor-place[^{]*\{[^}]*(border|radius|shadow)/);
    expect(css).toMatch(/\[data-anchor-place\^='right'\] \{\s+animation-name: dropdown-in-right;/);
    expect(css).toMatch(/\[data-anchor-place\^='left'\] \{\s+animation-name: dropdown-in-left;/);
    expect(css).toMatch(/@keyframes dropdown-in-right \{\s+from \{\s+opacity: 0;\s+transform: translateX\(calc\(-1 \* var\(--size-4\)\)\);/);
    expect(css).toMatch(/@keyframes dropdown-in-left \{\s+from \{\s+opacity: 0;\s+transform: translateX\(var\(--size-4\)\);/);
  });
});

describe('a side menu opens down from the top of its button in CSS', () => {
  const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

  it('tries the start-aligned place first and flips up only when it overflows', () => {
    const anchored = read('../src/primitives/Anchored/Anchored.css');
    expect(anchored).toMatch(/\.anchored\[data-anchor-place='right-start'\],\s+\.anchored\[data-anchor-place='left-start'\] \{\s+top: anchor\(top\);/);
    expect(anchored).toMatch(/\[data-anchor-place\^='left'\] \{\s+position-try-fallbacks: flip-inline, flip-block, flip-block flip-inline,/);
    expect(anchored).toContain('@position-try --anchored-fill-block');
  });

  it('does not pick the side with the most room when the menu fits below', () => {
    const css = read('../src/theme/dropdown-menu.css');
    expect(css).toMatch(/\[data-anchor-place='right-start'\], \[data-anchor-place='left-start'\]\) \{\s+max-block-size: none;\s+position-try-order: normal;/);
    expect(css).toMatch(/\.dropdown-menu\[data-anchored\] \{[^}]*position-try-order: most-height;/);
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
