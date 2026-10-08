/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { pickerTop } from '../src/composites/ColorPickerPopover/behavior/picker-top';

const VIEW = { top: 0, right: 1000, bottom: 800, left: 0 };

describe('ColorPickerPopover placed by script', () => {
  it('keeps a panel that opens up with its bottom edge above the swatch', () => {
    expect(pickerTop(594, 360, true, VIEW)).toBe(594);
  });

  it('keeps a panel that opens up inside the window, its top 8 px from the edge', () => {
    expect(pickerTop(200, 360, true, VIEW)).toBe(368);
  });

  it('keeps a panel that opens down inside the window, its bottom 8 px from the edge', () => {
    expect(pickerTop(130, 360, false, VIEW)).toBe(130);
    expect(pickerTop(600, 360, false, VIEW)).toBe(432);
  });

  it('pins a panel taller than the window to the top edge', () => {
    expect(pickerTop(130, 900, false, VIEW)).toBe(8);
    expect(pickerTop(594, 900, true, VIEW)).toBe(908);
  });

  it('lifts a panel that opens up by its own height', () => {
    const css = readFileSync(new URL('../src/composites/ColorPickerPopover/ColorPickerPopover.css', import.meta.url), 'utf8');
    expect(css).toMatch(/\.color-picker-popover\.anchored-fallback\[data-drop-up='true'\] \{\s*transform: translateY\(-100%\);/);
  });
});
