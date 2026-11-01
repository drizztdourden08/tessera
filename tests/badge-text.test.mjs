/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { badgeText } from '../src/primitives/Badge/behavior/badge-text';
import { sanitiseBadgeText } from '../src/primitives/Badge/behavior/sanitise-badge-text';

describe('K1 sanitiseBadgeText', { tags: ['critical'] }, () => {
  it('keeps letters, digits and a trailing + after digits', () => {
    expect(sanitiseBadgeText('7')).toBe('7');
    expect(sanitiseBadgeText('NEW')).toBe('NEW');
    expect(sanitiseBadgeText('99+')).toBe('99+');
    expect(sanitiseBadgeText('é5')).toBe('é5');
  });

  it('drops spaces and symbols', () => {
    expect(sanitiseBadgeText('A B')).toBe('AB');
    expect(sanitiseBadgeText('v1.2')).toBe('v12');
    expect(sanitiseBadgeText('#3!')).toBe('3');
    expect(sanitiseBadgeText(' \t\n')).toBe('');
  });

  it('keeps the trailing + only after digits', () => {
    expect(sanitiseBadgeText('1,000+')).toBe('1000+');
    expect(sanitiseBadgeText('A+')).toBe('A');
    expect(sanitiseBadgeText('+')).toBe('');
    expect(sanitiseBadgeText('1+2')).toBe('12');
    expect(sanitiseBadgeText('9++')).toBe('9+');
  });
});

describe('K1 badgeText', { tags: ['critical'] }, () => {
  it('caps a count at max', () => {
    expect(badgeText(120, 99)).toBe('99+');
    expect(badgeText(99, 99)).toBe('99');
  });

  it('shows a number as a whole count, and nothing below 0', () => {
    expect(badgeText(-5, undefined)).toBe('');
    expect(badgeText(-0.5, undefined)).toBe('');
    expect(badgeText(0, undefined)).toBe('0');
    expect(badgeText(2.7, undefined)).toBe('2');
    expect(badgeText(Number.NaN, undefined)).toBe('');
    expect(badgeText(Number.POSITIVE_INFINITY, 99)).toBe('');
  });

  it('sanitises a dynamic string', () => {
    expect(badgeText('4 new', undefined)).toBe('4new');
    expect(badgeText(undefined, undefined)).toBe('');
  });
});
