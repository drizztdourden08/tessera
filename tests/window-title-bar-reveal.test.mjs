/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { altTap } from '../src/composites/WindowTitleBar/behavior/alt-tap';

const press = (keys) => keys.reduce((state, [type, key, repeat]) => {
  const tap = altTap(state.armed, { type, key, repeat });
  return { armed: tap.armed, fired: state.fired + (tap.fire ? 1 : 0) };
}, { armed: false, fired: 0 });

describe('K1 Alt reveals the concealed bar', { tags: ['critical'] }, () => {
  it('fires on Alt pressed and released alone', () => {
    expect(press([['keydown', 'Alt'], ['keyup', 'Alt']]).fired).toBe(1);
  });

  it('ignores Alt held with another key, and the key repeat', () => {
    expect(press([['keydown', 'Alt'], ['keydown', 'f'], ['keyup', 'f'], ['keyup', 'Alt']]).fired).toBe(0);
    expect(press([['keydown', 'Alt'], ['keydown', 'Alt', true], ['keyup', 'Alt']]).fired).toBe(0);
    expect(press([['keyup', 'Alt']]).fired).toBe(0);
  });
});
