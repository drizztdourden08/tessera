/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { enterStep } from '../src/composites/GuidedTour/behavior/enter-step';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { scrollToCenter } from '../src/composites/GuidedTour/behavior/scroll-to-center';
import { INTRO_MASCOT_BOX, INTRO_MASCOT_HEIGHT } from '../src/composites/GuidedTour/GuidedTour.constants';
import { TourBubble } from '../src/composites/GuidedTour/sub-components/TourBubble';
import { TourBubbleCard } from '../src/composites/GuidedTour/sub-components/TourBubbleCard';

const read = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');

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

describe('scrolling before measuring', () => {
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
    scrollToCenter({ scrollIntoView });
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'center', inline: 'center', behavior: 'instant' });
  });
});

describe('the intro step', () => {
  const tour = { index: 0, total: 3, close: vi.fn(), back: vi.fn(), next: vi.fn() };
  const intro = { id: 'welcome', title: 'Welcome', body: 'Hello', intro: true, art: h('i', { id: 'logo' }) };

  it('skips the target search and the scroll, even when a target is given', async () => {
    const { order, entry } = sequence({ intro: true });
    expect(await enterStep(entry)).toBeNull();
    expect(order).toEqual([]);
  });

  it('draws the art above the title, with the same controls as other steps', () => {
    const html = renderToString(h(TourBubbleCard, { tour, step: intro, id: 't' }));
    expect(html.indexOf('id="logo"')).toBeGreaterThan(-1);
    expect(html.indexOf('id="logo"')).toBeLessThan(html.indexOf('Welcome'));
    expect(html).toContain('>Next<');
    expect(html).toContain('Step 1 of 3');
  });

  it('leaves the art out of a step that is not an intro', () => {
    expect(renderToString(h(TourBubbleCard, { tour, step: { ...intro, intro: false }, id: 't' }))).not.toContain('id="logo"');
  });

  it('is a centred dialog named by its title, wide only for an intro', () => {
    const draw = (step) => renderToString(h(TourBubble, { tour, step, place: null, centred: true, nodeRef: () => undefined }));
    const wide = draw(intro);
    expect(wide).toContain('guided-tour__bubble--intro');
    expect(wide).toContain('role="dialog"');
    expect(wide).toMatch(/aria-labelledby="[^"]+-title"/);
    expect(draw({ ...intro, intro: false })).not.toContain('guided-tour__bubble--intro');
  });

  it('sizes the panel and the large mascot from tokens', () => {
    expect(INTRO_MASCOT_HEIGHT).toBe(256);
    expect(INTRO_MASCOT_BOX).toEqual({ width: 256, height: 256 });
    const tokens = read('../src/tokens/size.css');
    expect(tokens).toContain('--tour-intro-mascot: var(--size-256);');
    expect(tokens).toContain('--tour-intro-w: var(--size-640);');
    const css = read('../src/composites/GuidedTour/GuidedTour.css');
    expect(css).toContain('inline-size: var(--tour-intro-w);');
    expect(css).toMatch(/\.guided-tour__bubble--intro \{[^}]*min\(calc\(100vw/);
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
