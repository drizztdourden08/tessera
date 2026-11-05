/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { toggleAria } from '../src/primitives/Toggle/behavior/toggle-aria';

const base = { checked: false, mixed: false, label: undefined, labelId: undefined, labelledBy: undefined, ariaLabel: undefined, hintLabel: undefined };

describe('K1 Toggle name', { tags: ['critical'] }, () => {
  it('lets an explicit aria-label win over the shown label', () => {
    const aria = toggleAria({ ...base, label: 'Toast', labelId: 'toast-label', ariaLabel: 'Ping toast' });
    expect(aria['aria-label']).toBe('Ping toast');
    expect(aria['aria-labelledby']).toBeUndefined();
  });

  it('keeps the name from the label when there is no aria-label', () => {
    const aria = toggleAria({ ...base, label: 'Toast', labelId: 'toast-label' });
    expect(aria['aria-label']).toBeUndefined();
    expect(aria['aria-labelledby']).toBe('toast-label');
  });

  it('keeps aria-labelledby when it is given without a label', () => {
    const aria = toggleAria({ ...base, labelledBy: 'row-name' });
    expect(aria['aria-label']).toBeUndefined();
    expect(aria['aria-labelledby']).toBe('row-name');
  });
});
