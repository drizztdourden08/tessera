/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { ColorSwatch } from '../src/primitives/ColorSwatch';

vi.mock('../src/primitives/field-control/useControlSize', () => ({ useControlSize: () => 'md' }));

describe('ColorSwatch ref', () => {
  it('hands the ref to its button, so a popover can anchor to it', () => {
    const ref = { current: null };
    const element = ColorSwatch.render({ color: '#ff0000' }, ref);
    expect(element.type).toBe('button');
    expect(element.ref ?? element.props.ref).toBe(ref);
  });
});
