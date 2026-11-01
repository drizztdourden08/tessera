/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { backdropStyle } from '../src/primitives/BackdropLayer';

describe('K1 backdropStyle', { tags: ['critical'] }, () => {
  it('sizes a tile from tileSize and leaves a covering image to the stylesheet', () => {
    expect(backdropStyle({ kind: 'image', src: 'a.svg', fit: 'tile', tileSize: '48px' }).backgroundSize).toBe('48px');
    expect(backdropStyle({ kind: 'image', src: 'a.svg', tileSize: '48px' }).backgroundSize).toBeUndefined();
  });

  it('paints a colour, reading a name that starts with -- as a token', () => {
    expect(backdropStyle({ kind: 'color', color: '--c-tag-violet-dim' })).toEqual({ backgroundColor: 'var(--c-tag-violet-dim)' });
    expect(backdropStyle({ kind: 'color', color: '#123456' })).toEqual({ backgroundColor: '#123456' });
  });

  it('gives a node no style of its own', () => {
    expect(backdropStyle({ kind: 'node', node: null })).toEqual({});
  });
});
