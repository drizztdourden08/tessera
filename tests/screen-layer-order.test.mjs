/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { layerScope } from '../src/composites/ScreenLayer/behavior/layer-scope';

describe('K1 ScreenLayer floating', { tags: ['critical'] }, () => {
  it('keeps focus out of the room the layer covers, its parent', () => {
    const parent = { name: 'host' };
    const dialog = { closest: () => ({ parentElement: parent }), ownerDocument: { body: { name: 'body' } } };
    expect(layerScope(dialog)).toBe(parent);
    expect(layerScope({ closest: () => null, ownerDocument: { body: 'body' } })).toBe('body');
  });
});
