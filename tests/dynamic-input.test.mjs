/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { DynamicInput, escapePatternText, parsePattern } from '../src/composites/DynamicInput';
import { checkPattern } from '../src/composites/DynamicInput/behavior/check-pattern';
import { decimalKind } from '../src/composites/DynamicInput/behavior/decimal-kind';
import { flagGlyph } from '../src/composites/DynamicInput/behavior/flag-glyph';
import { hexKind } from '../src/composites/DynamicInput/behavior/hex-kind';
import { numberKind } from '../src/composites/DynamicInput/behavior/number-kind';
import { textKind } from '../src/composites/DynamicInput/behavior/text-kind';
import { Field } from '../src/primitives/Field';
import { positionPattern } from '../src/composites/RecordEditor/behavior/position-pattern';
import { PositionFieldEditor } from '../src/composites/RecordEditor/sub-components/PositionFieldEditor';

const noop = () => undefined;
const slotsOf = (pattern) => parsePattern(pattern).slots;
const only = (pattern) => slotsOf(pattern)[0];

const EXAMPLES = [
  'X {x:number 0..1920 "X position"}  Y {y:number 0..1080 "Y position"}',
  '[icon:clock] {hh:hour 12h}:{mm:minute step5} {ampm:choice AM|PM muted "Half of day"}',
  '{country:choice @countries flag} {=country.dial} {phone:text digits max10 "Phone number"}',
  '[icon:wallet] {amount:decimal 2 group "Amount"} [spacer] {currency:choice USD|EUR|CAD "Currency"}',
  '{comment:text max100 fill "Comment"} [action:send]',
  '[icon:calendar] {day:number 1..31 pad2 stepper "Day"} {month:choice @months "Month"} {year:number 1900..2100 "Year"}',
  '{h:number 0..99 "Hours"}h {m:minute "Minutes"}m {s:number 0..59 pad2 wrap "Seconds"}s',
  '[icon:server] {a:number 0..255}.{b:number 0..255}.{c:number 0..255}.{d:number 0..255}:{port:number 1..65535 "Port"}',
  '[icon:monitor] {w:number 320..7680 "Width"} × {h:number 240..4320 "Height"} px',
  '[icon:palette] {color:hex "Colour"}',
];

describe('parsePattern', () => {
  it('reads all ten gallery patterns without a problem', () => {
    for (const pattern of EXAMPLES) expect(parsePattern(pattern).problems).toEqual([]);
    expect(EXAMPLES.map((pattern) => slotsOf(pattern).length)).toEqual([2, 3, 2, 2, 1, 3, 3, 5, 2, 1]);
  });

  it('splits literals, slots, echoes and adornments in order', () => {
    const { parts } = parsePattern(EXAMPLES[2]);
    expect(parts.map((part) => part.kind)).toEqual(['slot', 'literal', 'echo', 'literal', 'slot']);
    expect(parts[2]).toEqual({ kind: 'echo', name: 'country', field: 'dial' });
    const wallet = parsePattern(EXAMPLES[3]).parts.map((part) => part.kind);
    expect(wallet).toEqual(['icon', 'literal', 'slot', 'literal', 'spacer', 'literal', 'slot']);
  });

  it('reads ranges, padding, steps, labels and flags into the slot', () => {
    expect(only('{hh:number 1..12 pad2 wrap "Hour"}')).toMatchObject({ type: 'number', min: 1, max: 12, pad: 2, wrap: true, label: 'Hour' });
    expect(only('{v:number ..10 step2.5}')).toMatchObject({ max: 10, step: 2.5 });
    expect(only('{v:number -5..}').min).toBe(-5);
    expect(only('{v:decimal 3 group}')).toMatchObject({ places: 3, group: true, step: 1 });
    expect(only('{t:text len8 alnum upper}')).toMatchObject({ length: 8, chars: 'alnum', letterCase: 'upper' });
    expect(only('{c:choice A|B|C}').choices).toEqual(['A', 'B', 'C']);
    expect(only('{c:choice @places flag}')).toMatchObject({ list: 'places', flag: true });
  });

  it('gives hour and minute their clock ranges', () => {
    expect(only('{h:hour}')).toMatchObject({ min: 0, max: 23, pad: 2, wrap: true });
    expect(only('{h:hour 12h}')).toMatchObject({ min: 1, max: 12 });
    expect(only('{m:minute step15}')).toMatchObject({ min: 0, max: 59, step: 15 });
  });

  it('treats escaped braces and brackets as text', () => {
    const { parts, problems } = parsePattern('\\{a\\} \\[b\\] \\\\ {x:number}');
    expect(problems).toEqual([]);
    expect(parts[0]).toEqual({ kind: 'literal', text: '{a} [b] \\ ' });
    expect(parsePattern(escapePatternText('Size {w} [px]')).parts).toEqual([{ kind: 'literal', text: 'Size {w} [px]' }]);
  });

  it('keeps a closing brace inside a quoted label', () => {
    expect(only('{x:number "Left } edge"}').label).toBe('Left } edge');
  });

  it('reports bad patterns in plain words and shows the bad part as text', () => {
    const { parts, slots, problems } = parsePattern('{a:nubmer} {b:number 5..1 slider foo} {c:choice} {d:number} {d:text} {=zz} [bad] {oops');
    expect(slots.map((slot) => slot.name)).toEqual(['b', 'd']);
    expect(slots[0]).toMatchObject({ control: 'stepper', min: undefined, max: undefined });
    expect(problems).toHaveLength(9);
    expect(problems.join('\n')).toMatch(/unknown type "nubmer"/);
    expect(problems.join('\n')).toMatch(/does not take "foo"/);
    expect(problems.join('\n')).toMatch(/used twice/);
    expect(problems.join('\n')).toMatch(/has no "}"/);
    expect(parts.some((part) => part.kind === 'literal' && part.text.includes('{a:nubmer}'))).toBe(true);
  });

  it('never throws, whatever it is given', () => {
    const junk = ['', '{', '}', '[', ']', '{:}', '{x:}', '{x:number ..}', '[icon:]', '{=}', '\\', '{x:choice |}', '"{x:text "', '{{x:number}}'];
    for (const pattern of junk) expect(() => parsePattern(pattern)).not.toThrow();
  });
});

describe('checkPattern', () => {
  it('names lists, actions, icons and counters the props do not supply', () => {
    const parsed = parsePattern('{c:choice @countries} [action:send] [icon:nope] [icon:clock] {n:number}');
    const problems = checkPattern(parsed, { counter: 'n' });
    expect(problems).toHaveLength(4);
    expect(checkPattern(parsed, {
      lists: { countries: [] }, actions: { send: { label: 'Send', onPress: noop } }, icons: { nope: { body: '' } },
    })).toEqual([]);
  });
});

describe('slot kinds', () => {
  const hh = only('{hh:hour 12h}');
  const octet = only('{a:number 0..255}');
  const open = only('{v:number 0..}');

  it('keeps only what a number slot can take, and moves on once it is complete', () => {
    expect(numberKind.clean('1a2b3', octet)).toBe('123');
    expect(numberKind.clean('-4', octet)).toBe('4');
    expect(numberKind.full('1', hh)).toBe(false);
    expect(numberKind.full('2', hh)).toBe(true);
    expect(numberKind.full('05', hh)).toBe(true);
    expect(numberKind.full('25', octet)).toBe(false);
    expect(numberKind.full('26', octet)).toBe(true);
    expect(numberKind.full('0', octet)).toBe(true);
    expect(numberKind.full('123456', open)).toBe(false);
  });

  it('reads only values in range, and settles the rest into it', () => {
    expect(numberKind.read('0', hh)).toBeUndefined();
    expect(numberKind.read('', hh)).toBeNull();
    expect(numberKind.read('7', hh)).toBe(7);
    expect(numberKind.settle('300', octet)).toBe(255);
    expect(numberKind.show(5, hh)).toBe('05');
  });

  it('steps and wraps', () => {
    expect(numberKind.step(12, hh, 1)).toBe(1);
    expect(numberKind.step(1, hh, -1)).toBe(12);
    expect(numberKind.step(255, octet, 1)).toBe(255);
    expect(numberKind.step(null, octet, 1)).toBe(0);
  });

  it('formats decimals with grouping and fixed places', () => {
    const amount = only('{a:decimal 2 group}');
    expect(decimalKind.show(18742.05, amount)).toBe('18,742.05');
    expect(decimalKind.edit(18742.05, amount)).toBe('18742.05');
    expect(decimalKind.clean('1,8742.0599', amount)).toBe('18742.05');
    expect(decimalKind.full('12.3', amount)).toBe(false);
    expect(decimalKind.full('12.34', amount)).toBe(true);
    expect(decimalKind.read('.', amount)).toBeUndefined();
  });

  it('limits text by length and characters, and reads it only once long enough', () => {
    const seed = only('{s:text len4 alnum upper}');
    expect(textKind.clean('ab-c12', seed)).toBe('ABC1');
    expect(textKind.read('AB', seed)).toBeUndefined();
    expect(textKind.read('ABCD', seed)).toBe('ABCD');
    expect(textKind.full('ABCD', seed)).toBe(true);
  });

  it('reads hex colours, short ones too', () => {
    const color = only('{c:hex}');
    expect(hexKind.clean('#FF88zz00', color)).toBe('ff8800');
    expect(hexKind.read('ff8800', color)).toBe('#ff8800');
    expect(hexKind.settle('f80', color)).toBe('#ff8800');
    expect(hexKind.show('#FF8800', color)).toBe('ff8800');
  });

  it('turns a region code into a flag', () => {
    expect([...flagGlyph('ie')].length).toBe(2);
    expect(flagGlyph('IRL')).toBe('');
  });
});

describe('DynamicInput', () => {
  const COUNTRIES = { countries: [{ value: 'IE', label: 'Ireland', flag: 'IE', dial: '+353' }] };

  it('draws one labelled control per slot inside a Field', () => {
    const html = renderToString(h(Field, { label: 'Phone number', htmlFor: 'phone' },
      h(DynamicInput, { pattern: EXAMPLES[2], value: { country: 'IE', phone: '12345' }, onChange: noop, lists: COUNTRIES })));
    expect(html).toContain('role="group"');
    expect(html).toContain('aria-labelledby="phone-label"');
    expect(html).toContain('id="phone"');
    expect(html).toContain('role="combobox"');
    expect(html).toContain('aria-label="Phone number"');
    expect(html).toContain('+353');
    expect(html).toContain('value="12345"');
  });

  it('shows the counter, takes the size of its Field, and keeps a bad pattern on screen', () => {
    const comment = renderToString(h(Field, { label: 'Comment', size: 'sm' },
      h(DynamicInput, { pattern: EXAMPLES[4], value: { comment: 'Hello there.' }, onChange: noop, counter: 'comment' })));
    expect(comment).toContain('12 / 100');
    expect(comment).toContain('control-size--sm');
    const broken = renderToString(h(DynamicInput, { pattern: 'Size {w:nubmer}', value: {}, onChange: noop, 'aria-label': 'Size' }));
    expect(broken).toContain('{w:nubmer}');
  });
});

describe('RecordEditor position pairs', () => {
  const field = { path: 'spawn', label: 'Spawn', kind: 'object', optional: false };
  const pair = {
    x: { path: 'spawn.gridX', label: 'Column "A"', kind: 'number', optional: false },
    y: { path: 'spawn.gridY', label: 'Row', kind: 'number', optional: false },
    xKey: 'gridX', yKey: 'gridY', others: [],
  };
  const BOUNDS = { 'spawn.gridX': { min: 0, max: 63 }, 'spawn.gridY': { min: 0, max: 1, step: 0.05 } };

  it('builds a pattern from the labels and bounds', () => {
    const pattern = positionPattern(pair, BOUNDS['spawn.gridX'], BOUNDS['spawn.gridY']);
    const { slots, problems } = parsePattern(pattern);
    expect(problems).toEqual([]);
    expect(slots[0]).toMatchObject({ name: 'x', type: 'number', min: 0, max: 63, label: 'Column "A"' });
    expect(slots[1]).toMatchObject({ name: 'y', type: 'decimal', places: 2, min: 0, max: 1, step: 0.05, label: 'Row' });
  });

  it('draws the pair as one DynamicInput', () => {
    const values = { 'spawn.gridX': 12, 'spawn.gridY': 0.25, spawn: { gridX: 12, gridY: 0.25 } };
    const binding = { value: (path) => values[path], onChange: noop, isDirty: () => false, disabled: false, bounds: (path) => BOUNDS[path] };
    const html = renderToString(h(PositionFieldEditor, { field, pair, binding }));
    expect(html).toContain('dynamic-input');
    expect(html).toContain('value="12"');
    expect(html).toContain('value="0.25"');
    expect(html).toContain('aria-label="Spawn"');
  });
});

