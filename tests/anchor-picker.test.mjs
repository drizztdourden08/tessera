/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { AnchorPicker } from '../src/composites/AnchorPicker';
import { ANCHORS } from '../src/composites/AnchorPicker/AnchorPicker.constants';
import { anchorCell } from '../src/composites/AnchorPicker/behavior/anchor-cell';
import { arrowAway } from '../src/composites/AnchorPicker/behavior/arrow-away';
import { moveAnchor } from '../src/composites/AnchorPicker/behavior/move-anchor';

const picker = (props = {}) => renderToString(h(AnchorPicker, { value: 'center', onChange: () => undefined, ...props }));

describe('AnchorPicker grid', () => {
  it('maps every anchor to its row and column', () => {
    expect(ANCHORS).toHaveLength(9);
    expect(anchorCell('top-left')).toEqual({ row: 0, col: 0 });
    expect(anchorCell('right')).toEqual({ row: 1, col: 2 });
    expect(anchorCell('bottom')).toEqual({ row: 2, col: 1 });
  });
});

describe('AnchorPicker keys', () => {
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

describe('AnchorPicker arrows', () => {
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

describe('AnchorPicker render', () => {
  it('is a radio group of nine named cells with one chosen and one tab stop', () => {
    const html = picker({ value: 'top-right' });
    expect(html).toContain('role="radiogroup"');
    expect(html.match(/role="radio"/g)).toHaveLength(9);
    expect(html.match(/aria-checked="true"/g)).toHaveLength(1);
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    expect(html).toContain('aria-label="Top right"');
  });

  it('shows no arrows in the dots variant', () => {
    expect(picker()).not.toContain('data-direction');
  });

  it('shows an arrow in each other cell in the arrows variant', () => {
    const html = picker({ variant: 'arrows', value: 'bottom-left' });
    expect(html.match(/data-direction/g)).toHaveLength(8);
    expect(html).toContain('data-direction="up-right"');
  });

  it('uses the label it is given', () => {
    expect(picker({ label: 'Keep this edge' })).toContain('aria-label="Keep this edge"');
  });
});

describe('AnchorPicker custom point and xs size', () => {
  it('chooses no cell for a custom point, dashes the outline and keeps one tab stop on the centre', () => {
    const html = picker({ value: 'custom', customLabel: 'Custom point' });
    expect(html).toContain('data-custom="true"');
    expect(html).toContain('aria-description="Custom point"');
    expect(html.match(/aria-checked="true"/g)).toBeNull();
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    expect(html).toMatch(/data-anchor="center"[^>]*tabindex="0"|tabindex="0"[^>]*data-anchor="center"/);
  });

  it('shows no arrows for a custom point in the arrows variant', () => {
    expect(picker({ value: 'custom', variant: 'arrows' })).not.toContain('data-direction');
  });

  it('draws the xs size and leaves a chosen anchor without the custom mark', () => {
    expect(picker({ size: 'xs' })).toContain('anchor-picker--xs');
    expect(picker({ size: 'xs', variant: 'arrows' })).toContain('width="10"');
    expect(picker()).not.toContain('data-custom');
  });
});
