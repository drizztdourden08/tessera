/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { nextTooltipState } from '../src/primitives/Tooltip/behavior/next-tooltip-state';
import { TOOLTIP_CLOSED } from '../src/primitives/Tooltip/behavior/tooltip-state.constants';
import { useTooltipOpen } from '../src/primitives/Tooltip/behavior/useTooltipOpen';
import { mountHook } from './hook-harness.mjs';

const dismiss = { params: null };

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/Portal/behavior/useDismissListeners', () => ({ useDismissListeners: (params) => { dismiss.params = params; } }));
vi.mock('../src/primitives/hint/keyboard-focus', () => ({ keyboardFocus: (target) => target?.keyboard === true }));

const POINTER = { clientX: 4, clientY: 8 };
const KEYBOARD = { target: { keyboard: true }, relatedTarget: null, currentTarget: { contains: () => false } };
const MOUSE_FOCUS = { target: { keyboard: false }, relatedTarget: null, currentTarget: { contains: () => false } };
const AWAY = { relatedTarget: null, currentTarget: { contains: () => false } };

const mount = () => {
  const ref = { current: null };
  return mountHook(() => useTooltipOpen(ref, ref, true));
};

const clicked = () => {
  const view = mount();
  view.act((tip) => tip.handlers.onMouseEnter(POINTER));
  view.act((tip) => tip.handlers.onMouseDown(POINTER));
  view.act((tip) => tip.handlers.onFocus(MOUSE_FOCUS));
  return view;
};

describe('nextTooltipState', () => {
  const held = { hover: true, focus: true, dismissed: false };

  it('closes on pointer leave and on blur, whatever held it open', () => {
    expect(nextTooltipState(held, 'leave')).toEqual(TOOLTIP_CLOSED);
    expect(nextTooltipState(held, 'blur')).toEqual(TOOLTIP_CLOSED);
  });

  it('shows on a click without holding it by focus', () => {
    expect(nextTooltipState({ hover: false, focus: true, dismissed: true }, 'press')).toEqual({ hover: true, focus: false, dismissed: false });
  });

  it('stays dismissed after Escape or an outside click until the pointer and focus both leave', () => {
    expect(nextTooltipState(held, 'dismiss')).toEqual({ ...held, dismissed: true });
    expect(nextTooltipState({ ...held, dismissed: true }, 'enter').dismissed).toBe(true);
  });
});

describe('a hint shown by a click', () => {
  it('opens while the pointer is over it and closes on pointer leave', () => {
    const view = clicked();
    expect(view.current.open).toBe(true);
    view.act((tip) => tip.handlers.onMouseLeave(POINTER));
    expect(view.current.open).toBe(false);
  });

  it('closes on blur even with the pointer still over it', () => {
    const view = clicked();
    view.act((tip) => tip.handlers.onBlur(AWAY));
    expect(view.current.open).toBe(false);
  });

  it('closes on Escape and on an outside click', () => {
    const view = clicked();
    expect(dismiss.params.open).toBe(true);
    view.act(() => dismiss.params.onClose());
    expect(view.current.open).toBe(false);
    expect(dismiss.params.open).toBe(false);
  });

  it('opens again on the next click after a dismissal', () => {
    const view = clicked();
    view.act(() => dismiss.params.onClose());
    view.act((tip) => tip.handlers.onMouseDown(POINTER));
    expect(view.current.open).toBe(true);
  });
});

describe('a hint shown by focus', () => {
  it('opens for keyboard focus only, not for focus a click gave', () => {
    const mouse = mount();
    mouse.act((tip) => tip.handlers.onFocus(MOUSE_FOCUS));
    expect(mouse.current.open).toBe(false);
    const keys = mount();
    keys.act((tip) => tip.handlers.onFocus(KEYBOARD));
    expect(keys.current.open).toBe(true);
  });

  it.each([
    ['blur', (tip) => tip.handlers.onBlur(AWAY)],
    ['Escape or an outside click', () => dismiss.params.onClose()],
    ['pointer leave', (tip) => tip.handlers.onMouseLeave(POINTER)],
  ])('closes on %s', (_way, close) => {
    const view = mount();
    view.act((tip) => tip.handlers.onFocus(KEYBOARD));
    expect(view.current.open).toBe(true);
    view.act(close);
    expect(view.current.open).toBe(false);
  });
});
