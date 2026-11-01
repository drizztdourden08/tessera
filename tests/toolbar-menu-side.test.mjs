/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { menuPlacement } from '../src/composites/DropdownMenu/behavior/menu-placement';
import { sideCorners } from '../src/composites/DropdownMenu/behavior/side-corners';
import { toolMenuSide } from '../src/composites/Toolbar/behavior/tool-menu-side';
import { toolOpenKey } from '../src/composites/Toolbar/behavior/tool-open-key';
import { toolbarMenuSide } from '../src/composites/ToolbarDock/behavior/toolbar-menu-side';

describe('K1 a toolbar menu on each side', { tags: ['critical'] }, () => {
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
});

describe('K1 a menu joins the bar it opens from, whatever the dock side', { tags: ['critical'] }, () => {
  const placeOf = (dock) => menuPlacement(toolMenuSide(dock === 'top' || dock === 'bottom' ? 'horizontal' : 'vertical', toolbarMenuSide(dock)), 'start');

  it('hangs from the trigger under a top bar and beside it on a left or right bar', () => {
    expect(placeOf('top')).toBe('bottom-start');
    expect(placeOf('left')).toBe('right-start');
    expect(placeOf('right')).toBe('left-start');
  });

  it('joins on the right edge of a left bar and the left edge of a right bar', () => {
    const corners = { topLeft: 1, topRight: 2, bottomLeft: 3, bottomRight: 4 };
    expect(sideCorners({ parentCorners: corners }, 'right')).toEqual([2, 4]);
    expect(sideCorners({ parentCorners: corners }, 'left')).toEqual([1, 3]);
  });
});
