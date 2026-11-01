/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { focusRowControl } from '../src/composites/FormRow/behavior/focus-row-control';

describe('K1 FormRow name', { tags: ['critical'] }, () => {
  it('focuses the first stop of a group control, which no label can reach', () => {
    const first = { nodeType: 1, offsetHeight: 20, tabIndex: 0, closest: () => null, getClientRects: () => [{}], focus: vi.fn() };
    const boxOf = (target) => ({ ownerDocument: { getElementById: () => target }, querySelectorAll: () => [first] });
    focusRowControl(boxOf(null), 'balancing');
    expect(first.focus).toHaveBeenCalledTimes(1);
    focusRowControl(boxOf({ labels: [] }), 'balancing');
    expect(first.focus).toHaveBeenCalledTimes(1);
  });
});
