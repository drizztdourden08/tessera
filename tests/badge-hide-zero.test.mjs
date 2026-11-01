/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { badgeText } from '../src/primitives/Badge/behavior/badge-text';

describe('K1 hideZero', { tags: ['critical'] }, () => {
  it('turns a count that reads 0 into no text, and leaves every other count alone', () => {
    expect(badgeText(0, undefined, true)).toBe('');
    expect(badgeText('0', undefined, true)).toBe('');
    expect(badgeText(0.4, undefined, true)).toBe('');
    expect(badgeText(0, undefined)).toBe('0');
    expect(badgeText(3, undefined, true)).toBe('3');
    expect(badgeText(120, 99, true)).toBe('99+');
    expect(badgeText('10', undefined, true)).toBe('10');
  });
});
