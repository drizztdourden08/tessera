/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { hexHint } from '../src/composites/field-kits/hex-hint';
import { buildSchema } from '../src/data';

const RECORD = { id: 'room-1', flags: 260, door: 9, count: 3 };
const CONFIG = { formats: { flags: 'hex4', door: 'hex2' } };
const SCHEMA = buildSchema([RECORD], CONFIG);
const field = (path) => SCHEMA.find((each) => each.path === path);

describe('K1 the hex hint of a formatted number', { tags: ['critical'] }, () => {
  it('reads like the cell: 0x and the padded upper case digits', () => {
    expect(hexHint(field('flags'), 260)).toBe('0x0104');
    expect(hexHint(field('door'), '9')).toBe('0x09');
  });

  it('is left out for a plain number or a value that is not one', () => {
    expect(hexHint(field('count'), 3)).toBeUndefined();
    expect(hexHint(field('flags'), '')).toBeUndefined();
    expect(hexHint(field('flags'), null)).toBeUndefined();
  });
});
