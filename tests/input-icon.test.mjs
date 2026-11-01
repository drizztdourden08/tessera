/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { gamepadInputIcon, inputIconData, isInputIconName } from '../src/primitives/InputIcon';

describe('K1 InputIcon data', { tags: ['critical'] }, () => {
  it('gives one object per glyph, so the effect samples stay cached', () => {
    expect(inputIconData({ family: 'switch', name: 'zl' })).toBe(inputIconData({ family: 'switch', name: 'zl' }));
    expect(inputIconData({ family: 'switch', name: 'nope' })).toBeNull();
  });
});

describe('K1 the list of accepted names', { tags: ['critical'] }, () => {
  it('checks a name against its own family only', () => {
    expect(isInputIconName('xbox', 'lb')).toBe(true);
    expect(isInputIconName('playstation', 'lb')).toBe(false);
    expect(isInputIconName('keyboard', 'question')).toBe(true);
    expect(isInputIconName('xbox', 'toString')).toBe(false);
    expect(isInputIconName('atari', 'a')).toBe(false);
  });
});

describe('K1 matching a device id to a glyph', { tags: ['critical'] }, () => {
  it('reads SDL ids as positions', () => {
    expect(gamepadInputIcon('xbox', 'a')).toEqual({ family: 'xbox', name: 'a' });
    expect(gamepadInputIcon('switch', 'a')).toEqual({ family: 'switch', name: 'b' });
    expect(gamepadInputIcon('playstation', 'y')).toEqual({ family: 'playstation', name: 'triangle' });
    expect(gamepadInputIcon('gamecube', 'b')).toEqual({ family: 'gamecube', name: 'x' });
    expect(gamepadInputIcon('xbox', 'dpleft')).toEqual({ family: 'xbox', name: 'dpad-left' });
    expect(gamepadInputIcon('playstation', 'guide')).toBeNull();
    expect(gamepadInputIcon('generic', 'dpup')).toEqual({ family: 'generic', name: 'dpad-up' });
    expect(gamepadInputIcon('generic', 'dpright')).toEqual({ family: 'generic', name: 'dpad-right' });
  });

  it('reads KeyboardEvent.code for the keyboard', () => {
    expect(gamepadInputIcon('keyboard', 'KeyW')).toEqual({ family: 'keyboard', name: 'w' });
    expect(gamepadInputIcon('keyboard', 'Digit7')).toEqual({ family: 'keyboard', name: '7' });
    expect(gamepadInputIcon('keyboard', 'F11')).toEqual({ family: 'keyboard', name: 'f11' });
    expect(gamepadInputIcon('keyboard', 'ShiftRight')).toEqual({ family: 'keyboard', name: 'shift-icon' });
    expect(gamepadInputIcon('keyboard', 'IntlRo')).toBeNull();
  });
});
