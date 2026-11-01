/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { heroBrand } from '../src/composites/Hero/behavior/hero-brand';

describe('K1 the Hero brand', { tags: ['critical'] }, () => {
  it('takes its own brand, else the nearest palette when it names a brand, else tessera', () => {
    expect(heroBrand('rotp', 'brock')).toBe('rotp');
    expect(heroBrand(undefined, 'brock')).toBe('brock');
    expect(heroBrand(undefined, 'sunset')).toBe('tessera');
    expect(heroBrand(undefined, null)).toBe('tessera');
  });
});
