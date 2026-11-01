/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { segmentKeys } from '../src/primitives/SegmentedControl/behavior/segment-keys';
import { itemDisabled } from '../src/primitives/listbox/item-disabled';
import { itemReason } from '../src/primitives/listbox/item-reason';

const WHY = 'This display tops out at 120 Hz.';
const RATES = [
  { value: '60', label: '60 Hz' },
  { value: '144', label: '144 Hz', disabled: WHY },
  { value: '120', label: '120 Hz' },
  { value: '240', label: '240 Hz', disabled: true },
];

describe('K1 the segmented arrow keys', { tags: ['critical'] }, () => {
  const setup = () => {
    const buttons = RATES.map(() => ({ focus: vi.fn() }));
    const picked = [];
    const track = { current: { querySelectorAll: () => buttons } };
    const keys = segmentKeys({ trackRef: track, options: RATES, enabled: [true, false, true, false], value: '60', pick: (value) => picked.push(value) });
    const press = (key, from) => {
      const event = { key, target: buttons[from], preventDefault: vi.fn() };
      keys.onKeyDown(event);
      return event;
    };
    return { buttons, picked, press };
  };

  it('pick the next open option and skip the ones that are off', () => {
    const { buttons, picked, press } = setup();
    expect(press('ArrowRight', 0).preventDefault).toHaveBeenCalled();
    expect(picked).toEqual(['120']);
    expect(buttons[2].focus).toHaveBeenCalled();
    press('ArrowDown', 2);
    press('ArrowUp', 0);
    expect(picked).toEqual(['120', '60', '120']);
  });

  it('take Home and End to the first and last open option, and leave other keys alone', () => {
    const { picked, press } = setup();
    press('End', 0);
    press('Home', 2);
    expect(picked).toEqual(['120', '60']);
    expect(press('Enter', 0).preventDefault).not.toHaveBeenCalled();
  });
});

describe('K1 a select option that is off', { tags: ['critical'] }, () => {
  it('reads a string disabled as off, with the string as its reason', () => {
    expect(itemDisabled({ disabled: WHY })).toBe(true);
    expect(itemDisabled({ disabled: true })).toBe(true);
    expect(itemDisabled({ disabled: false })).toBe(false);
    expect(itemReason({ disabled: WHY })).toBe(WHY);
    expect(itemReason({ disabled: true })).toBeUndefined();
  });
});
