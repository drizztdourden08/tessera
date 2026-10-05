/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import * as composites from '../src/composites';
import { enterStep } from '../src/composites/GuidedTour/behavior/enter-step';
import { entryState } from '../src/composites/GuidedTour/behavior/entry-state';
import { findTarget } from '../src/composites/GuidedTour/behavior/find-target';
import { holeClip } from '../src/composites/GuidedTour/behavior/hole-clip';
import { inertOutside } from '../src/composites/GuidedTour/behavior/inert-outside';
import { seekTarget } from '../src/composites/GuidedTour/behavior/seek-target';
import { stageOf } from '../src/composites/GuidedTour/behavior/stage-of';
import { stepCue } from '../src/composites/GuidedTour/behavior/step-cue';
import { tourReach } from '../src/composites/GuidedTour/behavior/tour-reach';
import { TourBubbleCard } from '../src/composites/GuidedTour/sub-components/TourBubbleCard';

const el = (name, children = []) => {
  const node = { name, nodeType: 1, offsetHeight: 1, inert: false, parentElement: null, children };
  children.forEach((child) => { child.parentElement = node; });
  node.contains = (other) => {
    for (let at = other; at; at = at.parentElement) if (at === node) return true;
    return false;
  };
  return node;
};

const STEPS = [
  { id: 'welcome', title: 'Welcome', body: 'Hello' },
  { id: 'nav', title: 'Pages', body: 'Here', target: { tour: 'nav' } },
];
describe('parts kept live', () => {
  const view = { width: 1000, height: 800 };

  it('keeps a part inside the app root live while the rest of the root goes inert', () => {
    const titlebar = el('titlebar', [el('pin')]);
    const main = el('main');
    const app = el('app', [titlebar, main]);
    const body = el('body', [app, el('tour')]);
    const undo = inertOutside([body.children[1], titlebar], body);
    expect([app.inert, titlebar.inert, titlebar.children[0].inert, main.inert]).toEqual([false, false, false, true]);
    undo();
    expect(main.inert).toBe(false);
  });

  it('keeps every entry of a lit menu live when one entry is the click target', () => {
    const entry = el('settings');
    const menu = el('menu', [el('home'), entry]);
    const app = el('app', [menu, el('page')]);
    const body = el('body', [app, el('tour')]);
    inertOutside([body.children[1], menu, entry], body);
    expect(menu.children.map((child) => child.inert)).toEqual([false, false]);
    expect(app.children[1].inert).toBe(true);
  });

  it('cuts one more hole per kept part, and clears the part it shares with the lit hole', () => {
    const count = (clip) => clip.split(',').length;
    const bar = { x: 0, y: 0, width: 1000, height: 40, radius: 0 };
    const far = { x: 500, y: 300, width: 300, height: 200, radius: 12 };
    const near = { x: 100, y: 30, width: 200, height: 300, radius: 12 };
    const single = holeClip(far, view);
    const kept = holeClip(far, view, [bar]);
    expect(kept.startsWith(single.slice(0, -1))).toBe(true);
    expect(kept).toContain('1000px 40px');
    expect(count(holeClip(near, view, [bar]))).toBe(count(kept));
    const shared = holeClip(near, view, [bar]).split(', 0 0, ').at(-1);
    expect(shared).toMatch(/px 40px/);
    expect(new Set(shared.split(', ')).size).toBeGreaterThan(4);
    expect(new Set(kept.split(', 0 0, ').at(-1).split(', ').slice(0, -1)).size).toBe(1);
  });

});

describe('a wait step and a click target', () => {
  it('reaches the lit part on click and wait steps, and opens a hole for a click target outside it', () => {
    const entry = el('entry');
    const lit = el('menu', [entry]);
    const bar = el('bar');
    const far = el('far');
    const stage = { target: lit, step: null, click: true, waits: true, cue: { clip: 'idle' } };
    expect(tourReach(stage, [bar], entry)).toEqual({ reachable: [bar, lit, entry], holes: [bar] });
    expect(tourReach(stage, [], far).holes).toEqual([far]);
    expect(tourReach({ ...stage, click: false, waits: false }, [], null)).toEqual({ reachable: [], holes: [] });
  });

  it('marks a wait step as waiting, not as a click', () => {
    const step = { id: 'name', title: 'Name', body: 'Type', advance: 'wait' };
    const tour = { shown: true, current: step, steps: [step], index: 0 };
    expect(stageOf(tour, { index: 0, id: 'name', target: null })).toMatchObject({ step, click: false, waits: true });
    expect(stageOf({ ...tour, shown: false }, null)).toMatchObject({ step: null, waits: false, target: null });
  });

  it('shows the hint in place of the click line and hides Next on a click or wait step', () => {
    const tour = { index: 0, total: 2, close: vi.fn(), back: vi.fn(), next: vi.fn() };
    const draw = (step) => renderToString(h(TourBubbleCard, { tour, step: { id: 's', title: 'Step', body: 'Body', ...step }, id: 't' }));
    const wait = draw({ advance: 'wait', hint: 'Type a name, then press Save.' });
    expect(wait).toContain('Type a name, then press Save.');
    expect(wait).not.toContain('>Next<');
    expect(draw({ advance: 'wait' })).toContain('Do what this step asks to go on.');
    expect(draw({ advance: 'click' })).toContain('Click the highlighted part to go on.');
    expect(draw({})).toContain('>Next<');
  });
});

describe('step events, abort and the spot alone', () => {
  const frame = () => Promise.resolve();

  it('says whether a step is entering or shown, and which element it lit', () => {
    const step = STEPS[1];
    const target = { nodeType: 1 };
    expect(entryState(null, 1, step)).toEqual({ entering: true, shown: false, target: null });
    expect(entryState({ index: 1, id: 'nav', target }, 1, step)).toEqual({ entering: false, shown: true, target });
    expect(entryState({ index: 0, id: 'welcome', target: null }, 1, step)).toMatchObject({ entering: true, shown: false });
    expect(entryState(null, 1, null)).toEqual({ entering: false, shown: false, target: null });
  });

  it('passes onEnter a signal and skips the search once the step is left', async () => {
    const control = new globalThis.AbortController();
    const find = vi.fn(() => 'panel');
    let seen = null;
    const step = { ...STEPS[1], onEnter: ({ signal }) => { seen = signal; control.abort(); } };
    expect(await enterStep({ step, find, frame, tries: 3, signal: control.signal })).toBeNull();
    expect(seen).toBe(control.signal);
    expect(seen.aborted).toBe(true);
    expect(find).not.toHaveBeenCalled();
  });

  it('stops looking for a target once aborted', async () => {
    const control = new globalThis.AbortController();
    const find = vi.fn(() => null);
    const later = () => { control.abort(); return Promise.resolve(); };
    expect(await seekTarget({ find, frame: later, tries: 10, signal: control.signal })).toBeNull();
    expect(find).toHaveBeenCalledOnce();
  });

  it('takes an element as is, for TourSpot', () => {
    const node = { nodeType: 1, offsetHeight: 10 };
    expect(findTarget({ querySelector: vi.fn() }, node)).toBe(node);
    expect(findTarget({ querySelector: vi.fn() }, null)).toBeNull();
  });

  it('exports TourSpot, drawn by GuidedTour through the same spotlight part', () => {
    const read = (path) => readFileSync(new URL(`../src/composites/GuidedTour/${path}`, import.meta.url), 'utf8');
    expect(typeof composites.TourSpot).toBe('function');
    ['sub-components/TourLayer.tsx', 'sub-components/TourSpot.tsx'].forEach((file) => expect(read(file)).toContain('<TourSpotlight spot={'));
    expect(read('behavior/useTourStage.ts')).toContain('useSpotlight(');
    expect(read('sub-components/TourSpot.tsx')).toContain('useSpotlight(');
  });

  it('plays the arrive clip of a step, and walks with its walk clip', () => {
    expect(stepCue({ ...STEPS[0], mascot: 'happy' }, null)).toEqual({ clip: 'happy' });
    expect(stepCue({ ...STEPS[0], mascot: { walk: 'move-wobble', arrive: 'success' } }, null)).toEqual({ clip: 'success', walk: 'move-wobble' });
    expect(stepCue(STEPS[1], { nodeType: 1 })).toEqual({ clip: 'point' });
    expect(stepCue(null, null)).toEqual({ clip: 'idle' });
  });
});
