/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { activeBoxOf } from '../src/primitives/dom/active-box-of';
import { sameActiveBox } from '../src/primitives/dom/same-active-box';
import { toggleValue } from '../src/primitives/field-control/toggle-value';

const trackIn = (direction, clientWidth) => ({ clientWidth, ownerDocument: { defaultView: { getComputedStyle: () => ({ direction }) } } });
const item = { offsetLeft: 30, offsetWidth: 50 };

describe('the sliding marker of SegmentedControl and FloatingSwitch', () => {
  it('measures the chosen item from the left and from the start of the track', () => {
    expect(activeBoxOf(trackIn('ltr', 200), item)).toEqual({ left: 30, start: 30, size: 50 });
    expect(activeBoxOf(trackIn('rtl', 200), item)).toEqual({ left: 30, start: 120, size: 50 });
    expect(activeBoxOf(trackIn('ltr', 200), null)).toBeNull();
  });

  it('keeps the same box when nothing moved', () => {
    expect(sameActiveBox({ left: 1, start: 1, size: 2 }, { left: 1, start: 1, size: 2 })).toBe(true);
    expect(sameActiveBox({ left: 1, start: 1, size: 2 }, { left: 1, start: 1, size: 3 })).toBe(false);
    expect(sameActiveBox(null, null)).toBe(true);
  });
});

describe('toggleValue', () => {
  it('adds a value that is out and takes out a value that is in, keeping the order', () => {
    expect(toggleValue(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
    expect(toggleValue(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
    expect(toggleValue([], 'a')).toEqual(['a']);
  });
});
