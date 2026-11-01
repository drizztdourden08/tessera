/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { ANCHORS } from '../src/composites/AnchorPicker/AnchorPicker.constants';
import { anchorCell } from '../src/composites/AnchorPicker/behavior/anchor-cell';
import { arrowAway } from '../src/composites/AnchorPicker/behavior/arrow-away';
import { moveAnchor } from '../src/composites/AnchorPicker/behavior/move-anchor';

describe('K1 AnchorPicker grid', { tags: ['critical'] }, () => {
  it('maps every anchor to its row and column', () => {
    expect(ANCHORS).toHaveLength(9);
    expect(anchorCell('top-left')).toEqual({ row: 0, col: 0 });
    expect(anchorCell('right')).toEqual({ row: 1, col: 2 });
    expect(anchorCell('bottom')).toEqual({ row: 2, col: 1 });
  });
});

describe('K1 AnchorPicker keys', { tags: ['critical'] }, () => {
  it('moves one cell with the arrow keys in both dimensions', () => {
    expect(moveAnchor('ArrowUp', 'center')).toBe('top');
    expect(moveAnchor('ArrowDown', 'center')).toBe('bottom');
    expect(moveAnchor('ArrowLeft', 'center')).toBe('left');
    expect(moveAnchor('ArrowRight', 'top-left')).toBe('top');
    expect(moveAnchor('ArrowDown', 'top-right')).toBe('right');
  });

  it('stops at the edges of the grid', () => {
    expect(moveAnchor('ArrowUp', 'top')).toBe('top');
    expect(moveAnchor('ArrowLeft', 'bottom-left')).toBe('bottom-left');
    expect(moveAnchor('ArrowRight', 'right')).toBe('right');
    expect(moveAnchor('ArrowDown', 'bottom-right')).toBe('bottom-right');
  });

  it('goes to the ends of the row with Home and End, and of the grid with the whole flag', () => {
    expect(moveAnchor('Home', 'right')).toBe('left');
    expect(moveAnchor('End', 'left')).toBe('right');
    expect(moveAnchor('Home', 'bottom', true)).toBe('top-left');
    expect(moveAnchor('End', 'top', true)).toBe('bottom-right');
  });

  it('leaves other keys alone', () => {
    expect(moveAnchor('Enter', 'center')).toBeNull();
    expect(moveAnchor('a', 'center')).toBeNull();
  });
});

describe('K1 AnchorPicker arrows', { tags: ['critical'] }, () => {
  it('points away from the chosen cell', () => {
    expect(arrowAway('center', 'top')).toBe('up');
    expect(arrowAway('center', 'bottom-right')).toBe('down-right');
    expect(arrowAway('top-left', 'top-right')).toBe('right');
    expect(arrowAway('top-left', 'bottom-left')).toBe('down');
    expect(arrowAway('bottom-right', 'top-left')).toBe('up-left');
  });

  it('has no arrow on the chosen cell', () => {
    expect(arrowAway('left', 'left')).toBeNull();
  });
});
