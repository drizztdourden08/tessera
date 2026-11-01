/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { foldState } from '../src/primitives/FoldText/behavior/fold-state';

describe('K1 foldState', { tags: ['critical'] }, () => {
  it('in more mode folds until opened and offers More only when cut or open', () => {
    expect(foldState(2, 'more', false, false)).toEqual({ clamp: 2, more: false, hint: false });
    expect(foldState(2, 'more', false, true)).toEqual({ clamp: 2, more: true, hint: false });
    expect(foldState(2, 'more', true, false)).toEqual({ clamp: undefined, more: true, hint: false });
  });

  it('in hint mode always clamps, never offers More and hints only when cut', () => {
    expect(foldState(2, 'hint', false, false)).toEqual({ clamp: 2, more: false, hint: false });
    expect(foldState(2, 'hint', false, true)).toEqual({ clamp: 2, more: false, hint: true });
    expect(foldState(2, 'hint', true, true)).toEqual({ clamp: 2, more: false, hint: true });
  });

  it('in clip mode always clamps and offers neither More nor a hint', () => {
    expect(foldState(1, 'clip', false, true)).toEqual({ clamp: 1, more: false, hint: false });
    expect(foldState(1, 'clip', true, true)).toEqual({ clamp: 1, more: false, hint: false });
  });

  it('does nothing without lines', () => {
    expect(foldState(undefined, 'hint', false, true)).toEqual({ clamp: undefined, more: false, hint: false });
    expect(foldState(0, 'hint', false, true)).toEqual({ clamp: undefined, more: false, hint: false });
  });
});
