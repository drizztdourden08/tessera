/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { parsePattern } from '../src/composites/DynamicInput';
import { applyRules } from '../src/composites/DynamicInput/behavior/apply-rules';
import { splitPasted } from '../src/composites/DynamicInput/behavior/split-pasted';

const COUNTRIES = [{ value: 'US', label: 'United States' }, { value: 'CA', label: 'Canada' }, { value: 'CAN', label: 'Cannes' }];
const none = () => [];
const split = (pattern, text, setup = {}, choices = none) => splitPasted(applyRules(parsePattern(pattern), setup), text, choices);

const CODE = '{head:text len4 upper}-{tail:number 0..9999 pad4}';
const ADDRESS = '{a:number 0..255}.{b:number 0..255}.{c:number 0..255}.{d:number 0..255}:{port:number 1..65535}';

describe('I-96 paste into a code', { tags: ['critical'] }, () => {
  it('splits a full value at its separator and ignores the case', () => {
    expect(split(CODE, 'ABCD-1234')).toEqual({ head: 'ABCD', tail: 1234 });
    expect(split(CODE, 'abcd-1234')).toEqual({ head: 'ABCD', tail: 1234 });
  });

  it('fills by length when the text has no separator', () => {
    expect(split(CODE, 'abcd1234')).toEqual({ head: 'ABCD', tail: 1234 });
    expect(split(CODE, ' abcd 1234 ')).toEqual({ head: 'ABCD', tail: 1234 });
  });

  it('does not fit a value a slot rejects', () => {
    expect(split(CODE, 'ABCDE-1234')).toBeUndefined();
    expect(split(CODE, 'AB-1234')).toBeUndefined();
    expect(split(CODE, 'ABCD-12X4')).toBeUndefined();
    expect(split(CODE, 'ABCD1234567')).toBeUndefined();
  });

  it('does not fit an empty text or a single slot', () => {
    expect(split(CODE, '   ')).toBeUndefined();
    expect(split('{code:text len6 upper}', 'ABCDEF')).toBeUndefined();
  });

  it('keeps the characters and aliases of the slots', () => {
    const setup = { slots: { head: { chars: 'ABCDEFGHJKLMNOPQRSTVWXYZ0123456789', aliases: { I: '1', O: '0' } } } };
    expect(split(CODE, 'oi1b-0042', setup)).toEqual({ head: '011B', tail: 42 });
    expect(split(CODE, 'ABCU-0042', setup)).toBeUndefined();
  });
});

describe('I-96 paste into an address', { tags: ['critical'] }, () => {
  it('splits an ip with its port', () => {
    expect(split(ADDRESS, '192.168.0.1:8080')).toEqual({ a: 192, b: 168, c: 0, d: 1, port: 8080 });
  });

  it('rejects a part out of its range', () => {
    expect(split(ADDRESS, '192.168.0.256:8080')).toBeUndefined();
    expect(split(ADDRESS, '192.168.0.1:70000')).toBeUndefined();
    expect(split(ADDRESS, '192.168.0.1')).toBeUndefined();
  });

  it('skips the pattern lead and a trailing literal', () => {
    expect(split('Seed {a:text len3 upper} {b:text len3 upper}', 'seed abc def')).toEqual({ a: 'ABC', b: 'DEF' });
    expect(split('{h:number 0..99}h {m:number 0..59}m {s:number 0..59}s', '1H 42M 7S')).toEqual({ h: 1, m: 42, s: 7 });
  });

  it('splits at a blank between slots', () => {
    expect(split('{hh:number 1..12}:{mm:number 0..59} {part:choice AM|PM}', '12:30 pm', {}, (slot) => (slot.name === 'part' ? [{ value: 'AM' }, { value: 'PM' }] : []))).toEqual({ hh: 12, mm: 30, part: 'PM' });
  });
});

describe('I-96 paste into choices', { tags: ['critical'] }, () => {
  const pattern = '{phone:number 100..999}-{country:choice @countries}';
  const choices = () => COUNTRIES;

  it('matches an option by value or by label, in any case', () => {
    expect(split(pattern, '555-us', {}, choices)).toEqual({ phone: 555, country: 'US' });
    expect(split(pattern, '555-Canada', {}, choices)).toEqual({ phone: 555, country: 'CA' });
    expect(split(pattern, '555-united states', {}, choices)).toEqual({ phone: 555, country: 'US' });
  });

  it('does not fit an unknown option', () => {
    expect(split(pattern, '555-France', {}, choices)).toBeUndefined();
  });

  it('reads the options a list offers from the slots taken before', () => {
    const seen = [];
    const byFirst = (slot, value) => {
      seen.push(value);
      return value.phone === 555 ? COUNTRIES : [];
    };
    expect(split(pattern, '555-CA', {}, byFirst)).toEqual({ phone: 555, country: 'CA' });
    expect(seen.at(-1)).toEqual({ phone: 555 });
  });

  it('fills a choice that follows a slot without a separator', () => {
    expect(split('{phone:number 100..999}{country:choice @countries}', '555Cannes', {}, choices)).toEqual({ phone: 555, country: 'CAN' });
  });
});

describe('I-96 optional slots', { tags: ['critical'] }, () => {
  it('lets an optional slot stay empty', () => {
    expect(split('{a:text len2 upper}-{b:number? 0..99}', 'ab-')).toEqual({ a: 'AB', b: null });
    expect(split('{a:text len2 upper}-{b:number 0..99}', 'ab-')).toBeUndefined();
  });
});
