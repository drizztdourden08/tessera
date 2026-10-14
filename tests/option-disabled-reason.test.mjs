/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { SettingsRow } from '../src/composites/SettingsRow';
import { RadioGroup } from '../src/primitives/RadioGroup';
import { SegmentedControl } from '../src/primitives/SegmentedControl';
import { segmentKeys } from '../src/primitives/SegmentedControl/behavior/segment-keys';
import { ToggleGroup } from '../src/primitives/ToggleGroup';
import { itemDisabled } from '../src/primitives/listbox/item-disabled';
import { itemReason } from '../src/primitives/listbox/item-reason';

const noop = () => undefined;
const WHY = 'This display tops out at 120 Hz.';
const TIP = '<span class="tooltip-anchor reason-tip">';
const RATES = [
  { value: '60', label: '60 Hz' },
  { value: '144', label: '144 Hz', disabled: WHY },
  { value: '120', label: '120 Hz' },
  { value: '240', label: '240 Hz', disabled: true },
];

describe('a segmented option that is off', () => {
  const html = renderToString(h(SegmentedControl, { value: '60', options: RATES, onChange: noop }));

  it('is a disabled radio with its reason in a tooltip and as its description', () => {
    expect(html).toContain(`${TIP}<button type="button" role="radio" aria-checked="false" aria-description="${WHY}" tabindex="-1"`);
    expect(html).toMatch(/aria-description="This display tops out at 120 Hz\."[^>]*disabled=""/);
  });

  it('without a reason gets no tooltip, and the picked option is the one Tab stop', () => {
    expect(html.match(/reason-tip/g)).toHaveLength(1);
    expect(html.match(/tabindex="0"/g)).toHaveLength(1);
    expect(html).toMatch(/aria-checked="true" tabindex="0"/);
  });

  it('hands the Tab stop to the first open option when the value is off', () => {
    const off = renderToString(h(SegmentedControl, { value: '144', options: RATES, onChange: noop }));
    expect(off).toMatch(/aria-checked="false" tabindex="0"[^>]*>60 Hz/);
  });
});

describe('the segmented arrow keys', () => {
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

describe('a radio option that is off', () => {
  const html = renderToString(h(RadioGroup, { value: '60', options: RATES, onChange: noop }));

  it('greys its line out, wraps it in the reason tooltip and disables the input', () => {
    expect(html).toContain(`${TIP}<label class="radio-group__option radio-group__option--disabled"`);
    expect(html).toMatch(/disabled="" aria-description="This display tops out at 120 Hz\." name="[^"]+" value="144"/);
    expect(html).toMatch(/disabled="" name="[^"]+" value="240"/);
    expect(html.match(/reason-tip/g)).toHaveLength(1);
  });
});

describe('a toggle option that is off', () => {
  const html = renderToString(h(ToggleGroup, { value: [], options: RATES, onChange: noop }));

  it('is disabled with its reason, and the ends of the row are marked, not found by position', () => {
    expect(html).toMatch(/<span class="tooltip-anchor reason-tip"><button type="button" aria-pressed="false" aria-description="This display tops out at 120 Hz\."[^>]*disabled=""/);
    expect(html).toMatch(/data-first="true"[^>]*>60 Hz/);
    expect(html).toMatch(/data-last="true"[^>]*>240 Hz/);
  });
});

describe('a select option that is off', () => {
  it('reads a string disabled as off, with the string as its reason', () => {
    expect(itemDisabled({ disabled: WHY })).toBe(true);
    expect(itemDisabled({ disabled: true })).toBe(true);
    expect(itemDisabled({ disabled: false })).toBe(false);
    expect(itemReason({ disabled: WHY })).toBe(WHY);
    expect(itemReason({ disabled: true })).toBeUndefined();
  });
});

describe('a settings choice with an option that is off', () => {
  const row = (kind, value = '60') => renderToString(h(SettingsRow, {
    id: 'rate', title: 'Rate', hint: 'Pick one.', noDescription: true, input: { kind, value, onChange: noop, options: RATES },
  }));

  it('passes the reason to each control the choice can draw as', () => {
    for (const kind of ['segmented', 'radio']) expect(row(kind)).toContain(`aria-description="${WHY}"`);
    expect(row('multi', [])).toContain(`aria-description="${WHY}"`);
  });
});
