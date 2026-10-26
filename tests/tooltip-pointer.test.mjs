/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { pointerPlacement } from '../src/primitives/Tooltip/behavior/pointer-placement';
import { POINTER_OFFSET, VIEWPORT_EDGE } from '../src/primitives/Tooltip/behavior/pointer-placement.constants';
import { usePointerFollow } from '../src/primitives/Tooltip/behavior/usePointerFollow';
import { useTooltipOpen } from '../src/primitives/Tooltip/behavior/useTooltipOpen';
import { mountHook } from './hook-harness.mjs';
import { fakeAnchor } from './tooltip-document.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/Portal/behavior/useDismissListeners', () => ({ useDismissListeners: () => undefined }));

const view = { width: 800, height: 600 };
const bubble = { width: 200, height: 80 };

describe('a tooltip placed by the pointer', () => {
  it('sits below and after the pointer when there is room', () => {
    expect(pointerPlacement({ pointer: { x: 100, y: 100 }, bubble, view })).toEqual({ x: 100 + POINTER_OFFSET, y: 100 + POINTER_OFFSET });
  });

  it('moves before or above the pointer near the right or bottom edge', () => {
    const spot = pointerPlacement({ pointer: { x: 700, y: 560 }, bubble, view });
    expect(spot).toEqual({ x: 700 - 200 - POINTER_OFFSET, y: 560 - 80 - POINTER_OFFSET });
  });

  it('stays inside the window when the bubble is wider than the room on either side', () => {
    const spot = pointerPlacement({ pointer: { x: 120, y: 40 }, bubble: { width: 760, height: 80 }, view });
    expect(spot.x).toBe(VIEWPORT_EDGE);
  });
});

const fakeBubble = () => {
  const doc = { defaultView: { innerWidth: 800, innerHeight: 600 } };
  return { offsetWidth: 200, offsetHeight: 80, ownerDocument: doc, style: {} };
};

describe('usePointerFollow', () => {
  it('places the bubble when it mounts and again on every move', () => {
    const bubbleRef = { current: null };
    const view = mountHook(() => usePointerFollow(bubbleRef));
    const node = fakeBubble();
    view.current.track({ clientX: 50, clientY: 60 });
    view.current.attach(node);
    expect(node.style).toEqual({ left: `${50 + POINTER_OFFSET}px`, top: `${60 + POINTER_OFFSET}px` });
    view.current.track({ clientX: 790, clientY: 60 });
    expect(node.style.left).toBe(`${790 - 200 - POINTER_OFFSET}px`);
  });
});

describe('useTooltipOpen with a pointer', () => {
  it('passes the entering and moving pointer on, and reports the hover', () => {
    const onPointer = vi.fn();
    const ref = fakeAnchor();
    const view = mountHook(() => useTooltipOpen(ref, ref, true, onPointer));
    const event = { clientX: 5, clientY: 6 };
    view.act((tip) => tip.handlers.onMouseEnter(event));
    expect(view.current.hover).toBe(true);
    expect(view.current.open).toBe(true);
    view.act((tip) => tip.handlers.onMouseMove(event));
    expect(onPointer).toHaveBeenCalledTimes(2);
    expect(onPointer).toHaveBeenCalledWith(event);
  });

  it('takes a move handler that needs no follower when the tooltip stays on its anchor', () => {
    const ref = fakeAnchor();
    const view = mountHook(() => useTooltipOpen(ref, ref, true));
    expect(() => view.current.handlers.onMouseMove({ clientX: 1, clientY: 2 })).not.toThrow();
  });
});
