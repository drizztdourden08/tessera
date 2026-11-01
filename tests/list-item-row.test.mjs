/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { rowActivate } from '../src/composites/ListItemRow/behavior/row-activate';

const KEYBOARD = 0;
const MOUSE = 1;

describe('K1 ListItemRow keys', { tags: ['critical'] }, () => {
  it('runs onClick for Enter and Space as for a click, never onDoubleClick', () => {
    const onClick = vi.fn();
    const onDoubleClick = vi.fn();
    rowActivate({ onClick, onDoubleClick }, KEYBOARD);
    rowActivate({ onClick, onDoubleClick }, MOUSE);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onDoubleClick).not.toHaveBeenCalled();
  });

  it('opens a row that has only onDoubleClick from the keyboard, but not on a single click', () => {
    const onDoubleClick = vi.fn();
    rowActivate({ onDoubleClick }, MOUSE);
    expect(onDoubleClick).not.toHaveBeenCalled();
    rowActivate({ onDoubleClick }, KEYBOARD);
    expect(onDoubleClick).toHaveBeenCalledTimes(1);
  });
});
