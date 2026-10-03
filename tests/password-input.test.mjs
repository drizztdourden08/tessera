/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Field } from '../src/primitives/Field';
import { PasswordInput } from '../src/primitives/PasswordInput';
import { capsLockOf } from '../src/primitives/PasswordInput/behavior/caps-lock-of';
import { cellsFor } from '../src/primitives/PasswordInput/behavior/cells-for';
import { checkRules } from '../src/primitives/PasswordInput/behavior/check-rules';
import { describeChange } from '../src/primitives/PasswordInput/behavior/describe-change';
import { maskCount } from '../src/primitives/PasswordInput/behavior/mask-count';
import { scoreOf } from '../src/primitives/PasswordInput/behavior/score-of';
import { PASSWORD_STRINGS } from '../src/primitives/strings/password-strings.constants';

const noop = () => undefined;
const RULES = [
  { id: 'length', label: 'At least 8 characters', test: (value) => value.length >= 8 },
  { id: 'number', label: 'One number', test: (value) => /\d/.test(value) },
];
const FACE = String.fromCodePoint(0x1f600);
const ACCENT = 'é';

const render = (props) => renderToString(h(PasswordInput, { value: '', onChange: noop, ...props }));
const cellsIn = (html) => [...html.matchAll(/class="password-input__cell">([^<]*)</g)].map((match) => match[1]);

describe('Caps Lock detection', () => {
  it('reads the CapsLock modifier from the key event', () => {
    expect(capsLockOf({ getModifierState: (key) => key === 'CapsLock' })).toBe(true);
    expect(capsLockOf({ getModifierState: () => false })).toBe(false);
  });

  it('says nothing when the event cannot tell', () => {
    expect(capsLockOf({})).toBeNull();
  });
});

describe('mask overlay', () => {
  it('draws one mask character per character typed', () => {
    const cells = cellsIn(render({ value: 'secret', maskChar: '*' }));
    expect(cells).toEqual(['*', '*', '*', '*', '*', '*']);
  });

  it('draws an emoji mask as given', () => {
    expect(cellsIn(render({ value: 'abc', maskChar: FACE }))).toEqual([FACE, FACE, FACE]);
  });

  it('keeps the real password input under the mask, in the mono font', () => {
    const html = render({ value: 'abc', maskChar: '*' });
    expect(html).toContain('type="password"');
    expect(html).toContain('password-input--mono password-input--masked');
    expect(html).toMatch(/class="password-input__mask" aria-hidden="true"/);
  });

  it('draws no mask with the native dots, or once the password shows', () => {
    expect(render({ value: 'abc' })).not.toContain('password-input__mask');
    expect(render({ value: 'abc', maskChar: '*', defaultRevealed: true })).not.toContain('password-input__mask');
  });

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

describe('reveal button and attributes', () => {
  it('is a hidden current password with a toggle button', () => {
    const html = render({});
    expect(html).toContain('autoComplete="current-password"');
    expect(html).toContain('spellCheck="false"');
    expect(html).toContain('autoCapitalize="off"');
    expect(html).toContain('autoCorrect="off"');
    expect(html).toContain('aria-label="Password"');
    expect(html).toMatch(/<button[^>]*aria-label="Show password"[^>]*aria-pressed="false"/);
  });

  it('shows the password as text with the button pressed', () => {
    const html = render({ defaultRevealed: true });
    expect(html).toContain('type="text"');
    expect(html).toMatch(/<button[^>]*aria-pressed="true"/);
  });

  it('follows a controlled revealed value', () => {
    expect(render({ revealed: true, defaultRevealed: false })).toContain('type="text"');
  });

  it('asks for a new password in new mode', () => {
    expect(render({ mode: 'new' })).toContain('autoComplete="new-password"');
  });

  it('disables the button of a disabled field', () => {
    expect(render({ disabled: true })).toMatch(/<button[^>]*disabled/);
  });

  it('takes its name, id and error from a Field', () => {
    const html = renderToString(h(Field, { label: 'Room password', error: 'Too short' }, h(PasswordInput, { value: 'a', onChange: noop })));
    expect(html).not.toContain('aria-label="Password"');
    expect(html).toContain('aria-invalid="true"');
    expect(html).toMatch(/aria-describedby="field-[^"]*-note"/);
  });
});

describe('rules and strength', () => {
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

  it('links the checklist to the input and ticks the rules met', () => {
    const html = render({ value: 'abcdefgh', rules: RULES });
    const id = /<ul id="([^"]+)"/.exec(html)?.[1];
    expect(id).toBeTruthy();
    expect(html).toContain(`aria-describedby="${id}"`);
    expect(html).toContain('At least 8 characters, met');
    expect(html).toContain('One number, not met');
  });

  it('shows the meter by default for a new password with rules', () => {
    expect(render({ mode: 'new', rules: RULES, value: 'abcdefgh' })).toMatch(/role="meter"[^>]*aria-valuetext="Fair"/);
    expect(render({ rules: RULES, value: 'abcdefgh' })).not.toContain('role="meter"');
    expect(render({ mode: 'new', rules: RULES, strength: false })).not.toContain('role="meter"');
  });

  it('announces only the rules that flipped and a new strength word', () => {
    const checks = checkRules(RULES, 'abcdefgh');
    const text = describeChange({ met: [], level: null }, { met: ['length'], level: 'fair' }, checks, PASSWORD_STRINGS);
    expect(text).toBe('At least 8 characters, met. Strength: Fair');
    expect(describeChange({ met: ['length'], level: 'fair' }, { met: ['length'], level: 'fair' }, checks, PASSWORD_STRINGS)).toBe('');
  });
});
