/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { mascotFor } from '../src/brand/ChosenMascot/behavior/mascot-for';
import { mascotForBrand } from '../src/brand/ChosenMascot/behavior/mascot-for-brand';

describe('mascotForBrand', () => {
  it('names the mascot of each family app', () => {
    expect(mascotForBrand('rotp')).toBe('sentri');
    expect(mascotForBrand('brock')).toBe('flint');
    expect(mascotForBrand('archipelia')).toBe('pelago');
  });

  it('gives none for a brand without a mascot', () => {
    expect(mascotForBrand('tessera')).toBeNull();
    expect(mascotForBrand(undefined)).toBeNull();
  });
});

describe('mascotFor with auto', () => {
  it('never falls back to another app\'s mascot', () => {
    expect(mascotFor('auto', 'tessera', 'tessera')).toBeNull();
    expect(mascotFor('auto')).toBeNull();
    expect(mascotFor('auto', 'tessera', 'brock')).toBe('flint');
  });
});
