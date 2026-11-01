/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { rovingIndex } from '../src/primitives/field-control/roving-index';
import { STEP_BY_KEY } from '../src/primitives/Tabs/behavior/tab-steps.constants';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'controls', label: 'Controls', disabled: true, disabledReason: 'Connect a controller first.' },
  { id: 'saves', label: 'Saves' },
  { id: 'cheats', label: 'Cheats', disabled: true },
];
const ENABLED = TABS.map((tab) => tab.disabled !== true);

describe('K1 rovingIndex', { tags: ['critical'] }, () => {
  it('steps over disabled tabs and wraps round', () => {
    expect(rovingIndex('ArrowRight', 0, ENABLED, STEP_BY_KEY)).toBe(2);
    expect(rovingIndex('ArrowRight', 2, ENABLED, STEP_BY_KEY)).toBe(0);
    expect(rovingIndex('ArrowLeft', 0, ENABLED, STEP_BY_KEY)).toBe(2);
    expect(rovingIndex('ArrowLeft', 1, ENABLED, STEP_BY_KEY)).toBe(0);
  });

  it('sends Home and End to the first and last tab that can open', () => {
    expect(rovingIndex('Home', 2, [false, true, true], STEP_BY_KEY)).toBe(1);
    expect(rovingIndex('End', 0, ENABLED, STEP_BY_KEY)).toBe(2);
  });

  it('moves nowhere when no tab can open, or for a key that does not step', () => {
    expect(rovingIndex('ArrowRight', 0, [false, false], STEP_BY_KEY)).toBeNull();
    expect(rovingIndex('Enter', 0, ENABLED, STEP_BY_KEY)).toBeNull();
  });
});
