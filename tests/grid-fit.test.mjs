/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { templateFor } from '../src/primitives/Grid/behavior/template-for';

describe('Grid fit', () => {
  it('keeps empty tracks by default', () => {
    expect(templateFor(undefined, 288)).toEqual({ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 288px), 1fr))' });
  });

  it('collapses empty tracks with fit', () => {
    expect(templateFor(undefined, 288, true)).toEqual({ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 288px), 1fr))' });
  });

  it('leaves a fixed column count alone', () => {
    expect(templateFor(3, undefined, true)).toEqual({ gridTemplateColumns: 'repeat(3, 1fr)' });
  });
});
