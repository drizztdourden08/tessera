/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DynamicInput, parsePattern } from '../src/composites/DynamicInput';
import { applyRules } from '../src/composites/DynamicInput/behavior/apply-rules';
import { checkPattern } from '../src/composites/DynamicInput/behavior/check-pattern';
import { separatorKey } from '../src/composites/DynamicInput/behavior/separator-key';
import { textKind } from '../src/composites/DynamicInput/behavior/text-kind';
import { Field } from '../src/primitives/Field';

const noop = () => undefined;
const ruled = (pattern, setup = {}) => applyRules(parsePattern(pattern), setup).slots[0];
const typed = (slot, keys) => [...keys].reduce((text, key) => textKind.clean(text + key, slot), '');

const HOST = { host: { chars: 'abcdefghijklmnopqrstuvwxyz0123456789.-' } };
const LOBBY_CHARS = 'ABCDEFGHJKLMNOPQRSTVWXYZ0123456789';
const LOBBY_ALIASES = { I: '1', L: '1', O: '0' };

describe('custom characters', () => {
  it('keeps only the listed characters of a string or a set', () => {
    const host = ruled('{host:text}', { slots: HOST });
    expect(textKind.clean('my_host.net#', host)).toBe('myhost.net');
    const dashes = ruled('{host:text}', { slots: { host: { chars: new Set(['a', '-']) } } });
    expect(textKind.clean('a-b-c', dashes)).toBe('a--');
  });

  it('replaces the kind of the slot and still takes the length limit', () => {
    const slot = ruled('{host:text digits max5}', { slots: HOST });
    expect(textKind.clean('ab.cd-1234', slot)).toBe('ab.cd');
  });

  it('follows the case of the slot, whichever case the list is written in', () => {
    const upper = ruled('{code:text upper}', { slots: { code: { chars: 'abc' } } });
    expect(textKind.clean('aXbc', upper)).toBe('ABC');
    const lower = ruled('{code:text lower}', { slots: { code: { chars: 'ABC' } } });
    expect(textKind.clean('AxbC', lower)).toBe('abc');
  });

  it('leaves slots without chars as they were', () => {
    const plain = ruled('{code:text alnum}', { slots: { other: { chars: 'ab' } } });
    expect(plain.allowed).toBeUndefined();
    expect(textKind.clean('a-1 b', plain)).toBe('a1b');
  });
});

describe('aliases', () => {
  const lobby = ruled('{code:text len6 upper}', { slots: { code: { chars: LOBBY_CHARS, aliases: LOBBY_ALIASES } } });

  it('maps typed characters before the check, key by key', () => {
    expect(typed(lobby, 'ilo')).toBe('110');
    expect(typed(lobby, 'AU7')).toBe('A7');
  });

  it('maps a pasted text the same way as typing it', () => {
    expect(textKind.clean('il-oUB2x9', lobby)).toBe('110B2X');
    expect(textKind.clean('Lobby', lobby)).toBe('10BBY');
    expect(typed(lobby, 'il-oUB2x9')).toBe(textKind.clean('il-oUB2x9', lobby));
  });

  it('takes pattern aliases, and a slot alias wins over them', () => {
    const slots = { code: { aliases: { O: 'Q' } } };
    const slot = ruled('{code:text upper}', { aliases: LOBBY_ALIASES, slots });
    expect(textKind.clean('loi', slot)).toBe('1Q1');
    const other = ruled('{name:text upper}', { aliases: LOBBY_ALIASES, slots });
    expect(textKind.clean('loi', other)).toBe('101');
  });

  it('never reads a key such as constructor from the prototype', () => {
    const slot = ruled('{code:text}', { aliases: { a: 'b' } });
    expect(textKind.clean('constructor', slot)).toBe('constructor');
  });

  it('warns when an alias would be mapped again, and when the slot is not text', () => {
    const chained = parsePattern('{code:text} {n:number}');
    const setup = { slots: { code: { aliases: { a: 'b', b: 'c' } }, n: { chars: '12' } } };
    const problems = checkPattern(applyRules(chained, setup), setup);
    expect(problems).toHaveLength(2);
    expect(problems.join('\n')).toMatch(/mapped again/);
    expect(problems.join('\n')).toMatch(/not a text slot/);
  });
});

describe('validation', () => {
  const render = (props) => renderToString(h(DynamicInput, { pattern: '{code:text len4}', onChange: noop, 'aria-label': 'Code', ...props }));
  const noU = (value) => (typeof value === 'string' && value.includes('U') ? 'No U in lobby codes.' : undefined);

  it('stays valid while every rule is satisfied', () => {
    const html = render({ value: { code: 'ABCD' }, slots: { code: { validate: noU } }, validate: () => null });
    expect(html).not.toContain('aria-invalid');
    expect(html).not.toContain('dynamic-input__error');
  });

  it('turns invalid on a slot rule and shows the message where the errors go', () => {
    const html = render({ value: { code: 'ABUD' }, slots: { code: { validate: noU } } });
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('dynamic-input--invalid');
    expect(html).toContain('No U in lobby codes.');
    const id = /id="([^"]+-error)"/.exec(html)?.[1];
    expect(id).toBeDefined();
    expect(html).toContain(`aria-describedby="${id}"`);
  });

  it('turns invalid on a pattern rule, after the slot rules', () => {
    const pattern = '{a:text} {b:text}';
    const rule = (value) => (value.a === value.b ? 'Both are the same.' : undefined);
    const same = render({ pattern, value: { a: 'x', b: 'x' }, validate: rule });
    expect(same).toContain('Both are the same.');
    expect(render({ pattern, value: { a: 'x', b: 'y' }, validate: rule })).not.toContain('Both are the same.');
    const both = render({ pattern, value: { a: 'x', b: 'x' }, validate: rule, slots: { a: { validate: () => 'A is wrong.' } } });
    expect(both).toContain('A is wrong.');
    expect(both).not.toContain('Both are the same.');
  });

  it('hands an empty slot to the rule as null', () => {
    const seen = [];
    render({ value: {}, slots: { code: { validate: (value) => { seen.push(value); } } } });
    expect(seen).toEqual([null]);
  });

  it('lets the invalid prop win, either way', () => {
    const rules = { value: { code: 'ABUD' }, slots: { code: { validate: noU } } };
    const off = render({ ...rules, invalid: false });
    expect(off).not.toContain('aria-invalid');
    expect(off).not.toContain('No U in lobby codes.');
    const on = render({ value: { code: 'ABCD' }, slots: { code: { validate: noU } }, invalid: true });
    expect(on).toContain('aria-invalid="true"');
    expect(on).not.toContain('dynamic-input__error');
  });

  it('leaves the message to the Field when the Field has an error', () => {
    const html = renderToString(h(Field, { label: 'Code', error: 'Taken.' },
      h(DynamicInput, { pattern: '{code:text}', value: { code: 'U' }, onChange: noop, slots: { code: { validate: noU } } })));
    expect(html).toContain('Taken.');
    expect(html).not.toContain('No U in lobby codes.');
  });
});

const press = (pattern, key, { setup = {}, index = 0, typedSome = true, draft = 'ab' } = {}) => {
  const parsed = applyRules(parsePattern(pattern), setup);
  const moves = [];
  const event = { key, ctrlKey: false, metaKey: false, altKey: false, prevented: false, preventDefault() { this.prevented = true; } };
  const slot = parsed.slots[index];
  const field = { parsed, moveTo: (to, place) => { moves.push([to, place]); return true; } };
  const context = { field, slot, kind: textKind, index, draftRef: { current: draft }, typedRef: { current: typedSome } };
  const handled = separatorKey(context, event);
  return { handled, moves, prevented: event.prevented };
};

describe('keys the slot rejects', () => {
  const setup = { slots: HOST };

  it('ignores a rejected key without moving the focus', () => {
    const result = press('{host:text}.{port:number}', '_', { setup });
    expect(result).toEqual({ handled: true, moves: [], prevented: true });
    expect(press('{host:text} {port:number}', '#', { setup }).moves).toEqual([]);
  });

  it('moves on only for the literal that follows the slot', () => {
    expect(press('{host:text}:{port:number}', ':', { setup }).moves).toEqual([[1, 'all']]);
    expect(press('{host:text} to {port:number}', ' ', { setup }).moves).toEqual([[1, 'all']]);
    expect(press('{host:text}:{port:number}', '/', { setup }).moves).toEqual([]);
  });

  it('does not take the literal of another slot', () => {
    const pattern = '{a:text digits}:{b:text digits}/{c:text digits}';
    expect(press(pattern, '/', { index: 0 }).moves).toEqual([]);
    expect(press(pattern, ':', { index: 1 }).moves).toEqual([]);
    expect(press(pattern, '/', { index: 1 }).moves).toEqual([[2, 'all']]);
  });

  it('keeps a separator inert in an empty slot and lets accepted keys through', () => {
    expect(press('{host:text}:{port:number}', ':', { setup, typedSome: false }).moves).toEqual([]);
    expect(press('{host:text}:{port:number}', ':', { setup, draft: '' }).moves).toEqual([]);
    expect(press('{host:text}.{port:number}', 'a', { setup }).handled).toBe(false);
    expect(press('{host:text}.{port:number}', '.', { setup }).handled).toBe(false);
  });

  it('still moves on from a digits slot at its separator', () => {
    expect(press('{h:text digits}:{m:text digits}', ':').moves).toEqual([[1, 'all']]);
    expect(press('{h:text digits}:{m:text digits}', 'x').moves).toEqual([]);
  });
});

describe('a partly filled text slot', () => {
  const lobby = ruled('{code:text len6 upper}', { slots: { code: { chars: LOBBY_CHARS } } });

  it('keeps what was typed when it settles', () => {
    expect(textKind.settle('AB1', lobby)).toBe('AB1');
    expect(textKind.settle('AB1C2D', lobby)).toBe('AB1C2D');
    expect(textKind.settle('', lobby)).toBeNull();
  });

  const render = (props) => renderToString(h(DynamicInput, { pattern: '{code:text len6}', onChange: noop, 'aria-label': 'Code', ...props }));

  it('shows the incomplete message and the invalid state for a fixed length', () => {
    const html = render({ value: { code: 'AB1' } });
    expect(html).toContain('aria-invalid="true"');
    expect(html).toContain('Enter all 6 characters.');
    expect(render({ value: { code: 'AB1C2D' } })).not.toContain('aria-invalid');
    expect(render({ value: { code: null } })).not.toContain('aria-invalid');
  });

  it('shows the minimum message for a minimum length', () => {
    expect(render({ pattern: '{code:text min4}', value: { code: 'AB' } })).toContain('Enter at least 4 characters.');
  });

  it('lets the slot rule speak first', () => {
    const html = render({ value: { code: 'AB1' }, slots: { code: { validate: () => 'Not that.' } } });
    expect(html).toContain('Not that.');
    expect(html).not.toContain('Enter all 6 characters.');
  });
});
