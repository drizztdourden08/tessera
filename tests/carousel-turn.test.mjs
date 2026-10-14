/* @layer tooling-scripts @kind test */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useCarousel } from '../src/composites/Carousel/behavior/useCarousel';
import { mountHook } from './hook-harness.mjs';

const view = { inView: true, visible: true, reduced: false };

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));
vi.mock('../src/primitives/dom/useInView', () => ({ useInView: () => view.inView }));
vi.mock('../src/primitives/dom/usePageVisible', () => ({ usePageVisible: () => view.visible }));
vi.mock('../src/primitives/dom/useReducedMotion', () => ({ useReducedMotion: () => view.reduced }));

const EVERY = 8000;

const mount = (extra = {}) => mountHook(() => useCarousel({ count: 3, defaultIndex: 0, turnEvery: EVERY, ref: { current: null }, ...extra }));

const wait = (carousel, ms) => carousel.act(() => vi.advanceTimersByTime(ms));

beforeEach(() => {
  Object.assign(view, { inView: true, visible: true, reduced: false });
  vi.useFakeTimers();
  vi.stubGlobal('window', globalThis);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('a carousel that turns by itself', () => {

  it('moves to the next slide after turnEvery, and wraps round after the last', () => {
    const carousel = mount();
    expect(carousel.current.turning).toBe(true);
    wait(carousel, EVERY - 1);
    expect(carousel.current.index).toBe(0);
    wait(carousel, 1);
    expect(carousel.current.index).toBe(1);
    wait(carousel, EVERY);
    wait(carousel, EVERY);
    expect(carousel.current.index).toBe(0);
  });

  it('holds still under the pointer and turns again when it leaves', () => {
    const carousel = mount();
    carousel.act((c) => c.hold.onMouseEnter());
    expect(carousel.current.turning).toBe(false);
    wait(carousel, EVERY * 2);
    expect(carousel.current.index).toBe(0);
    carousel.act((c) => c.hold.onMouseLeave());
    wait(carousel, EVERY);
    expect(carousel.current.index).toBe(1);
  });

  it('holds still while focus is inside, even as it moves between its buttons', () => {
    const carousel = mount();
    const inside = {};
    const box = { contains: (node) => node === inside };
    carousel.act((c) => c.hold.onFocus());
    carousel.act((c) => c.hold.onBlur({ currentTarget: box, relatedTarget: inside }));
    wait(carousel, EVERY);
    expect(carousel.current.index).toBe(0);
    carousel.act((c) => c.hold.onBlur({ currentTarget: box, relatedTarget: null }));
    expect(carousel.current.turning).toBe(true);
  });

});

describe('a carousel that holds still', () => {
  it('holds still on a hidden tab and off screen', () => {
    view.visible = false;
    const hidden = mount();
    wait(hidden, EVERY * 2);
    expect(hidden.current.index).toBe(0);
    view.visible = true;
    view.inView = false;
    const away = mount();
    wait(away, EVERY * 2);
    expect(away.current.index).toBe(0);
    expect(away.current.canTurn).toBe(true);
  });

  it('never turns with reduced motion, and then shows no stop button', () => {
    view.reduced = true;
    const carousel = mount();
    expect(carousel.current.canTurn).toBe(false);
    wait(carousel, EVERY * 2);
    expect(carousel.current.index).toBe(0);
  });

  it('stops for good with the stop button, and starts again with it', () => {
    const carousel = mount();
    carousel.act((c) => c.toggleStopped());
    expect(carousel.current.stopped).toBe(true);
    wait(carousel, EVERY * 2);
    expect(carousel.current.index).toBe(0);
    carousel.act((c) => c.toggleStopped());
    wait(carousel, EVERY);
    expect(carousel.current.index).toBe(1);
  });

  it('starts the wait again after a move by hand', () => {
    const carousel = mount();
    wait(carousel, EVERY - 100);
    carousel.act((c) => c.step(1));
    wait(carousel, EVERY - 100);
    expect(carousel.current.index).toBe(1);
    wait(carousel, 100);
    expect(carousel.current.index).toBe(2);
  });
});

describe('a carousel turned by hand', () => {
  it('cannot turn without turnEvery or with one slide', () => {
    expect(mount({ turnEvery: null }).current.canTurn).toBe(false);
    expect(mount({ count: 1 }).current.canTurn).toBe(false);
  });

  it('steps both ways and wraps round', () => {
    const carousel = mount({ turnEvery: null });
    carousel.act((c) => c.step(-1));
    expect(carousel.current.index).toBe(2);
    carousel.act((c) => c.go(4));
    expect(carousel.current.index).toBe(1);
  });

  it('asks the app when it holds the place', () => {
    const onIndexChange = vi.fn();
    const carousel = mount({ turnEvery: null, index: 1, onIndexChange });
    carousel.act((c) => c.step(1));
    expect(onIndexChange).toHaveBeenCalledWith(2);
    expect(carousel.current.index).toBe(1);
    carousel.act((c) => c.go(1));
    expect(onIndexChange).toHaveBeenCalledOnce();
  });
});
