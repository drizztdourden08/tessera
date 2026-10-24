/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { menuPlacement } from '../src/composites/DropdownMenu/behavior/menu-placement';
import { resolveSide } from '../src/composites/DropdownMenu/behavior/resolve-side';
import { SIDE_ROOM } from '../src/composites/DropdownMenu/DropdownMenu.constants';

const rect = (left, right) => ({ left, right });

describe('DropdownMenu side placement', () => {
  it('keeps below and above under or over the anchor on the chosen edge', () => {
    expect(menuPlacement('below', 'start')).toBe('bottom-start');
    expect(menuPlacement('below', 'end')).toBe('bottom-end');
    expect(menuPlacement('above', 'start')).toBe('top-start');
    expect(menuPlacement('above', 'end')).toBe('top-end');
  });

  it('opens right and left beside the anchor, lined up with its top, whatever the align', () => {
    expect(menuPlacement('right', 'start')).toBe('right-start');
    expect(menuPlacement('right', 'end')).toBe('right-start');
    expect(menuPlacement('left', 'start')).toBe('left-start');
    expect(menuPlacement('left', 'end')).toBe('left-start');
  });

  it('stays on the right when there is room there', () => {
    expect(resolveSide('right', rect(10, 50), 1000)).toBe('right');
    expect(resolveSide('left', rect(500, 540), 1000)).toBe('left');
  });

  it('flips right to left when the right is short and the left has more room', () => {
    expect(resolveSide('right', rect(900, 940), 1000)).toBe('left');
    expect(resolveSide('left', rect(10, 50), 1000)).toBe('right');
  });

  it('stays put when the other side has even less room', () => {
    expect(resolveSide('right', rect(10, 1000 - SIDE_ROOM + 20), 1000)).toBe('right');
    expect(resolveSide('left', rect(SIDE_ROOM - 20, 990), 1000)).toBe('left');
  });

  it('leaves below and above to the vertical flip', () => {
    expect(resolveSide('below', rect(990, 1000), 1000)).toBe('below');
    expect(resolveSide('above', rect(0, 10), 1000)).toBe('above');
  });
});
