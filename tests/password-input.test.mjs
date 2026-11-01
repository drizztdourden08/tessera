/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { capsLockOf } from '../src/composites/PasswordInput/behavior/caps-lock-of';
import { cellsFor } from '../src/composites/PasswordInput/behavior/cells-for';
import { checkRules } from '../src/composites/PasswordInput/behavior/check-rules';
import { describeChange } from '../src/composites/PasswordInput/behavior/describe-change';
import { maskCount } from '../src/composites/PasswordInput/behavior/mask-count';
import { scoreOf } from '../src/composites/PasswordInput/behavior/score-of';
import { PASSWORD_STRINGS } from '../src/primitives/strings/password-strings.constants';

const RULES = [
  { id: 'length', label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { id: 'number', label: 'One number', test: (value) => /\d/.test(value) },
];
const FACE = String.fromCodePoint(0x1f600);
const ACCENT = 'é';

describe('K1 Caps Lock detection', { tags: ['critical'] }, () => {
  it('reads the CapsLock modifier from the key event', () => {
    expect(capsLockOf({ getModifierState: (key) => key === 'CapsLock' })).toBe(true);
    expect(capsLockOf({ getModifierState: () => false })).toBe(false);
  });

  it('says nothing when the event cannot tell', () => {
    expect(capsLockOf({})).toBeNull();
  });
});

describe('K1 mask overlay', { tags: ['critical'] }, () => {
  it('counts graphemes, or UTF-16 units where the browser masks by unit', () => {
    expect(maskCount(`a${FACE}${ACCENT}`, 'grapheme')).toBe(3);
    expect(maskCount(`a${FACE}${ACCENT}`, 'code-unit')).toBe(5);
    expect(maskCount('', 'grapheme')).toBe(0);
  });

  it('widens each cell to fit a wide mask character', () => {
    expect(cellsFor(1)).toBe(1);
    expect(cellsFor(1.02)).toBe(1);
    expect(cellsFor(1.61)).toBe(2);
    expect(cellsFor(2.5)).toBe(3);
    expect(cellsFor(9)).toBe(3);
    expect(cellsFor(Number.NaN)).toBe(1);
  });
});

describe('K1 rules and strength', { tags: ['critical'] }, () => {
  it('checks each rule against the value', () => {
    expect(checkRules(RULES, 'abc12345').map((check) => check.met)).toEqual([true, true]);
    expect(checkRules(RULES, 'abc').map((check) => check.met)).toEqual([false, false]);
  });

  it('scores from the rules, from a number or from a host function', () => {
    const checks = checkRules(RULES, 'abcdefgh');
    expect(scoreOf('rules', 'abcdefgh', checks)).toBe(2);
    expect(scoreOf(3, '', [])).toBe(3);
    expect(scoreOf((value) => value.length, 'abcdefghij', [])).toBe(4);
    expect(scoreOf(false, 'abc', checks)).toBeNull();
  });

  it('announces only the rules that flipped and a new strength word', () => {
    const checks = checkRules(RULES, 'abcdefgh');
    const text = describeChange({ met: [], level: null }, { met: ['length'], level: 'fair' }, checks, PASSWORD_STRINGS);
    expect(text).toBe('At least 8 characters, met. Strength: Fair');
    expect(describeChange({ met: ['length'], level: 'fair' }, { met: ['length'], level: 'fair' }, checks, PASSWORD_STRINGS)).toBe('');
  });
});
