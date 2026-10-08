/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { useSpotHoles } from '../src/composites/GuidedTour/behavior/useSpotHoles';
import { watchSpot } from '../src/composites/GuidedTour/behavior/watch-spot';
import { mountHook } from './hook-harness.mjs';

vi.mock('react', async (importOriginal) => ({ ...(await importOriginal()), ...(await import('./hook-harness.mjs')).hooks }));

const listenerBag = () => {
  const added = new Map();
  return {
    added,
    addEventListener: (type, listener) => added.set(type, listener),
    removeEventListener: (type) => added.delete(type),
  };
};

const fakeView = () => {
  const frames = [];
  const observers = [];
  let fontsDone = () => undefined;
  const fonts = { ...listenerBag(), ready: new Promise((resolve) => { fontsDone = resolve; }) };
  const doc = { ...listenerBag(), body: { name: 'body' }, fonts };
  class FakeObserver {
    constructor(callback) {
      this.callback = callback;
      this.watched = [];
      this.live = true;
      observers.push(this);
    }

    observe(element) {
      this.watched.push(element);
    }

    disconnect() {
      this.live = false;
    }
  }
  const view = {
    ...listenerBag(),
    document: doc,
    ResizeObserver: FakeObserver,
    requestAnimationFrame: (callback) => frames.push(callback),
    cancelAnimationFrame: vi.fn(),
    getComputedStyle: () => ({ paddingTop: '8px', borderTopLeftRadius: '12px' }),
  };
  doc.defaultView = view;
  doc.body.ownerDocument = doc;
  const flush = () => frames.splice(0).forEach((frame) => frame());
  return { view, doc, fonts, observers, flush, fontsDone: () => fontsDone() };
};

const nodeIn = (doc, rect) => ({ ownerDocument: doc, isConnected: true, rect, getBoundingClientRect() { return this.rect; } });

const NONE = [];

const at = (top) => ({ left: 100, top, width: 200, height: 40 });

describe('watchSpot', () => {
  it('asks again on a resize of the nodes or the body, a window resize, a scroll, a font load and once the fonts are ready', async () => {
    const { view, doc, fonts, observers, fontsDone } = fakeView();
    const node = nodeIn(doc, at(0));
    const again = vi.fn();
    const stop = watchSpot(view, [node], again);
    expect(observers[0].watched).toEqual([node, doc.body]);
    observers[0].callback([]);
    view.added.get('resize')();
    doc.added.get('scroll')();
    fonts.added.get('loadingdone')();
    expect(again).toHaveBeenCalledTimes(4);
    fontsDone();
    await fonts.ready;
    expect(again).toHaveBeenCalledTimes(5);
    stop();
    expect(observers[0].live).toBe(false);
    expect([view.added.size, doc.added.size, fonts.added.size]).toEqual([0, 0, 0]);
  });

  it('stays quiet when the fonts get ready after it stopped, and works without a font set', async () => {
    const { view, doc, fonts, fontsDone } = fakeView();
    const again = vi.fn();
    watchSpot(view, [nodeIn(doc, at(0))], again)();
    fontsDone();
    await fonts.ready;
    expect(again).not.toHaveBeenCalled();
    delete doc.fonts;
    expect(() => watchSpot(view, [nodeIn(doc, at(0))], again)()).not.toThrow();
  });
});

describe('the spotlight hole', () => {
  const ring = { current: null };

  it('follows a target that moves without resizing once the fonts finish loading', async () => {
    const { doc, fonts, flush, fontsDone } = fakeView();
    const target = nodeIn(doc, at(100));
    const hook = mountHook(() => useSpotHoles(target, NONE, ring));
    flush();
    expect(hook.current.hole.y).toBe(100);
    target.rect = at(103);
    fontsDone();
    await fonts.ready;
    flush();
    hook.act(() => undefined);
    expect(hook.current.hole.y).toBe(103);
  });

  it('measures again when a new step settles on the same target', () => {
    const { doc, flush } = fakeView();
    const target = nodeIn(doc, at(100));
    let settled = '1 gear';
    const hook = mountHook(() => useSpotHoles(target, NONE, ring, settled));
    flush();
    target.rect = at(60);
    hook.rerender(() => useSpotHoles(target, NONE, ring, settled));
    expect(hook.current.hole.y).toBe(100);
    settled = '2 settings';
    hook.rerender(() => useSpotHoles(target, NONE, ring, settled));
    expect(hook.current.hole.y).toBe(60);
  });

  it('measures once more on the next frame, after effects of the step have run', () => {
    const { doc, flush } = fakeView();
    const target = nodeIn(doc, at(100));
    const hook = mountHook(() => useSpotHoles(target, NONE, ring));
    target.rect = at(120);
    flush();
    hook.act(() => undefined);
    expect(hook.current.hole.y).toBe(120);
  });
});
