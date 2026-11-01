/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { formatDate } from '../src/primitives/date-format';
import { valueText } from '../src/primitives/listbox/value-text';

describe('K1 a Date in a list', { tags: ['critical'] }, () => {
  it('is written the way the date format does', () => {
    const at = new Date(2026, 9, 16, 21, 40, 12);
    expect(valueText(at)).toBe(formatDate(at, 'date'));
    expect(valueText([at, 'Saved'])).toBe(`${formatDate(at, 'date')}, Saved`);
  });
});
