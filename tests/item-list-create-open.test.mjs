/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { focusLost } from '../src/composites/ItemList/behavior/focus-lost';
import { openChange } from '../src/composites/ItemList/behavior/open-change';

describe('K1 ItemList createOpen', { tags: ['critical'] }, () => {
  it('asks the app through onCreateOpenChange, and tracks the state itself only without createOpen', () => {
    const setOwn = vi.fn();
    const onChange = vi.fn();
    openChange(true, setOwn, onChange)(false);
    expect(setOwn).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
    openChange(undefined, setOwn, onChange)(true);
    expect(setOwn).toHaveBeenCalledWith(true);
    expect(onChange).toHaveBeenLastCalledWith(true);
    openChange(undefined, setOwn)(false);
    expect(setOwn).toHaveBeenLastCalledWith(false);
  });

  it('moves focus after the app closes the form only when focus went down with it', () => {
    const body = {};
    expect(focusLost({ body, activeElement: body })).toBe(true);
    expect(focusLost({ body, activeElement: null })).toBe(true);
    expect(focusLost({ body, activeElement: {} })).toBe(false);
  });
});
