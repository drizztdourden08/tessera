/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { enterStep } from '../src/composites/GuidedTour/behavior/enter-step';
import { INTRO_MASCOT_BOX } from '../src/composites/GuidedTour/GuidedTour.constants';
import { scrollToTarget } from '../src/composites/GuidedTour/behavior/scroll-to-target';

const sequence = (given, found = 'panel') => {
  const order = [];
  const step = typeof given === 'function' ? given(order) : given;
  const control = new globalThis.AbortController();
  const entry = {
    step: { id: 's', title: 'S', body: 'B', target: { tour: 'deep' }, ...step },
    find: () => { order.push('find'); return found; },
    frame: () => { order.push('frame'); return Promise.resolve(); },
    scroll: (target) => order.push(`scroll ${target}`),
    tries: 3,
    signal: control.signal,
    warn: vi.fn(),
  };
  return { order, control, entry };
};

describe('K1 scrolling before measuring', { tags: ['critical'] }, () => {
  it('runs onEnter, reveal, a frame, the search, the scroll and a last frame, in that order', async () => {
    const { order, entry } = sequence((log) => ({
      onEnter: () => { log.push('enter'); },
      reveal: async () => { await Promise.resolve(); log.push('reveal'); },
    }));
    expect(await enterStep(entry)).toBe('panel');
    expect(order).toEqual(['enter', 'reveal', 'frame', 'find', 'scroll panel', 'frame']);
  });

  it('shows the step only after the frame that follows the scroll, so the hole is measured after layout', async () => {
    const { order, entry } = sequence({});
    let released = () => undefined;
    entry.frame = () => {
      order.push('frame');
      return new Promise((resolve) => { released = resolve; });
    };
    let shown = false;
    const entering = enterStep(entry).then(() => { shown = true; });
    await new Promise((resolve) => { setTimeout(resolve, 0); });
    expect(order).toEqual(['find', 'scroll panel', 'frame']);
    expect(shown).toBe(false);
    released();
    await entering;
    expect(shown).toBe(true);
  });

  it('skips the extra frame when the step has no reveal, and the scroll when no target shows', async () => {
    const plain = sequence({});
    await enterStep(plain.entry);
    expect(plain.order).toEqual(['find', 'scroll panel', 'frame']);
    const missing = sequence({}, null);
    expect(await enterStep(missing.entry)).toBeNull();
    expect(missing.order.some((line) => line.startsWith('scroll'))).toBe(false);
    expect(missing.entry.warn).toHaveBeenCalledOnce();
  });

  it('warns when reveal fails and still looks for the target', async () => {
    const { order, entry } = sequence({ reveal: () => { throw new Error('gone'); } });
    expect(await enterStep(entry)).toBe('panel');
    expect(entry.warn).toHaveBeenCalledWith(expect.stringContaining('reveal of step s failed'));
    expect(order).toContain('find');
  });

  it('never scrolls once the step is left during reveal', async () => {
    const { order, control, entry } = sequence({ reveal: () => control.abort() });
    expect(await enterStep(entry)).toBeNull();
    expect(order).toEqual([]);
    expect(entry.warn).not.toHaveBeenCalled();
  });

  it('centres the target in every scrolling ancestor at once', () => {
    const scrollIntoView = vi.fn();
    const view = { innerWidth: 1280, innerHeight: 720 };
    scrollToTarget({ scrollIntoView, ownerDocument: { defaultView: view }, getBoundingClientRect: () => ({ width: 420, height: 259 }) });
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center', inline: 'center', behavior: 'instant' });
  });
});

describe('K1 the intro step', { tags: ['critical'] }, () => {
  it('skips the target search and the scroll, even when a target is given', async () => {
    const { order, entry } = sequence({ intro: true });
    expect(await enterStep(entry)).toBeNull();
    expect(order).toEqual([]);
  });

  it('puts the large mascot beside the panel, stacks it above or below on a narrow window, and hides it when nothing fits', () => {
    const panel = (view) => ({ x: (view.width - 640) / 2, y: 200, width: 640, height: 300 });
    const wide = { width: 1400, height: 800 };
    const beside = mascotSpot({ bubble: panel(wide), hole: null }, wide, INTRO_MASCOT_BOX, 12);
    expect(beside.x).toBeLessThan(panel(wide).x);
    const narrow = { width: 700, height: 900 };
    const stacked = mascotSpot({ bubble: panel(narrow), hole: null }, narrow, INTRO_MASCOT_BOX, 12);
    expect(stacked.x).toBe(158);
    expect(stacked.y).toBeGreaterThan(panel(narrow).y + 300);
    const short = { width: 700, height: 520 };
    expect(mascotSpot({ bubble: panel(short), hole: null }, short, INTRO_MASCOT_BOX, 12)).toBeNull();
  });
});
