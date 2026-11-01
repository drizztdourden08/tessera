/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { growClass } from '../src/primitives/field-control/grow-class';

describe('K1 grow on a field control', { tags: ['critical'] }, () => {
  it('adds control-inline only for grow={false}', () => {
    expect(growClass(undefined)).toBe('');
    expect(growClass(true, 'search-input')).toBe('search-input');
    expect(growClass(false)).toBe('control-inline');
    expect(growClass(false, 'search-input ')).toBe('control-inline search-input');
  });
});
