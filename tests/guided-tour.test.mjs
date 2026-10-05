/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { GuidedTour, useGuidedTour } from '../src/composites/GuidedTour';
import { enterStep } from '../src/composites/GuidedTour/behavior/enter-step';
import { findTarget } from '../src/composites/GuidedTour/behavior/find-target';
import { holeClip } from '../src/composites/GuidedTour/behavior/hole-clip';
import { inertOutside } from '../src/composites/GuidedTour/behavior/inert-outside';
import { mascotSpot } from '../src/composites/GuidedTour/behavior/mascot-spot';
import { tourKeyAction } from '../src/composites/GuidedTour/behavior/tour-key-action';
import { tourMove } from '../src/composites/GuidedTour/behavior/tour-move';
import { restoreFocus } from '../src/composites/DialogShell/behavior/restore-focus';

const STEPS = [
  { id: 'welcome', title: 'Welcome', body: 'Hello' },
  { id: 'nav', title: 'Pages', body: 'Here', target: { tour: 'nav' } },
  { id: 'gear', title: 'Gear', body: 'Click', target: { tour: 'gear' }, advance: 'click' },
];

describe('the steps of a tour', () => {
  const open = { open: true, index: 0 };

  it('starts at a step, kept inside the list', () => {
    expect(tourMove({ open: false, index: 2 }, { type: 'start', at: 0 }, 3)).toEqual({ open: true, index: 0, finished: false });
    expect(tourMove({ open: false, index: 0 }, { type: 'start', at: 9 }, 3)).toMatchObject({ open: true, index: 2 });
  });

  it('goes on and back, and stays on the first step on back', () => {
    expect(tourMove(open, { type: 'next' }, 3)).toMatchObject({ open: true, index: 1 });
    expect(tourMove({ open: true, index: 1 }, { type: 'back' }, 3)).toMatchObject({ index: 0 });
    expect(tourMove(open, { type: 'back' }, 3)).toMatchObject({ index: 0, open: true });
  });

  it('closes and finishes on next from the last step', () => {
    expect(tourMove({ open: true, index: 2 }, { type: 'next' }, 3)).toEqual({ open: false, index: 2, finished: true });
  });

  it('closes at any step and keeps where it was', () => {
    expect(tourMove({ open: true, index: 1 }, { type: 'close' }, 3)).toEqual({ open: false, index: 1, finished: false });
  });

  it('ignores next and back while closed, and goes to a step in range', () => {
    expect(tourMove({ open: false, index: 1 }, { type: 'next' }, 3)).toMatchObject({ open: false, index: 1 });
    expect(tourMove(open, { type: 'go', index: -4 }, 3)).toMatchObject({ index: 0 });
    expect(tourMove(open, { type: 'next' }, 0)).toMatchObject({ open: false });
  });
});

describe('the controller', () => {
  const Probe = (props) => {
    const tour = useGuidedTour({ steps: STEPS, ...props });
    return h('output', null, `${tour.open}:${tour.index}:${tour.current?.id ?? '-'}:${tour.shortcuts.length}`);
  };

  it('starts closed with the shortcuts listed for a ShortcutList', () => {
    expect(renderToString(h(Probe))).toContain('false:0:-:4');
  });

  it('draws the step and the open state the app holds', () => {
    expect(renderToString(h(Probe, { open: true, step: 1 }))).toContain('true:1:nav:4');
    expect(renderToString(h(Probe, { open: true, step: 7 }))).toContain('true:2:gear:4');
  });

  it('draws nothing while closed', () => {
    const Closed = () => h(GuidedTour, { tour: useGuidedTour({ steps: STEPS }) });
    expect(renderToString(h(Closed))).toBe('');
  });
});

describe('the keys', () => {
  const plain = { modified: false, editable: false, interactive: false, clickStep: false };

  it('goes on with Right or Enter, back with Left and closes with Escape', () => {
    expect(tourKeyAction('ArrowRight', plain)).toBe('next');
    expect(tourKeyAction('Enter', plain)).toBe('next');
    expect(tourKeyAction('ArrowLeft', plain)).toBe('back');
    expect(tourKeyAction('Escape', plain)).toBe('close');
    expect(tourKeyAction('a', plain)).toBeNull();
  });

  it('leaves Enter to a focused button and the arrows to a field', () => {
    expect(tourKeyAction('Enter', { ...plain, interactive: true })).toBeNull();
    expect(tourKeyAction('ArrowRight', { ...plain, interactive: true })).toBe('next');
    expect(tourKeyAction('ArrowLeft', { ...plain, editable: true })).toBeNull();
    expect(tourKeyAction('Escape', { ...plain, editable: true })).toBe('close');
  });

  it('waits for the click on a click step, while Back and Escape still work', () => {
    const click = { ...plain, clickStep: true };
    expect(tourKeyAction('ArrowRight', click)).toBeNull();
    expect(tourKeyAction('Enter', click)).toBeNull();
    expect(tourKeyAction('ArrowLeft', click)).toBe('back');
    expect(tourKeyAction('Escape', click)).toBe('close');
  });

  it('lets a key with a modifier through', () => {
    expect(tourKeyAction('ArrowRight', { ...plain, modified: true })).toBeNull();
  });
});

describe('entering a step', () => {
  const frame = () => Promise.resolve();

  it('waits for an async onEnter before it looks for the target', async () => {
    const order = [];
    const step = { ...STEPS[1], onEnter: async () => { await Promise.resolve(); order.push('enter'); } };
    const found = await enterStep({ step, find: () => { order.push('find'); return 'panel'; }, frame, tries: 3 });
    expect(found).toBe('panel');
    expect(order).toEqual(['enter', 'find']);
  });

  it('looks again each frame until the target shows', async () => {
    const find = vi.fn().mockReturnValueOnce(null).mockReturnValueOnce(null).mockReturnValue('late');
    expect(await enterStep({ step: STEPS[1], find, frame, tries: 5 })).toBe('late');
    expect(find).toHaveBeenCalledTimes(3);
  });

  it('shows the step in the middle when the target never shows or onEnter fails', async () => {
    const warn = vi.fn();
    const step = { ...STEPS[1], onEnter: () => { throw new Error('closed'); } };
    expect(await enterStep({ step, find: () => null, frame, tries: 2, warn })).toBeNull();
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it('skips the search for a step with no target', async () => {
    const find = vi.fn();
    const onEnter = vi.fn();
    expect(await enterStep({ step: { ...STEPS[0], onEnter }, find, frame, tries: 2 })).toBeNull();
    expect(onEnter).toHaveBeenCalledOnce();
    expect(find).not.toHaveBeenCalled();
  });

  it('finds a target by its data-tour name, a selector or a ref', () => {
    const node = { nodeType: 1, offsetHeight: 10 };
    const doc = { querySelector: vi.fn(() => node) };
    expect(findTarget(doc, { tour: 'nav' })).toBe(node);
    expect(doc.querySelector).toHaveBeenLastCalledWith('[data-tour="nav"]');
    findTarget(doc, { selector: '#side .list' });
    expect(doc.querySelector).toHaveBeenLastCalledWith('#side .list');
    expect(findTarget(doc, { current: node })).toBe(node);
    expect(findTarget(doc, undefined)).toBeNull();
  });
});

describe('focus and the rest of the page', () => {
  const el = (name, children = []) => {
    const node = { name, nodeType: 1, offsetHeight: 1, inert: false, parentElement: null, children };
    children.forEach((child) => { child.parentElement = node; });
    return node;
  };

  it('makes everything inert but the tour and the target of a click step', () => {
    const target = el('gear');
    const header = el('header', [el('title'), target]);
    const app = el('app', [el('nav'), header]);
    const tour = el('tour', [el('bubble')]);
    const body = el('body', [app, tour]);
    const undo = inertOutside([tour, target], body);
    const inert = (node) => node.inert;
    expect([app, tour, target, header].map(inert)).toEqual([false, false, false, false]);
    expect(app.children[0].inert).toBe(true);
    expect(header.children[0].inert).toBe(true);
    expect(tour.children[0].inert).toBe(false);
    undo();
    expect(app.children[0].inert).toBe(false);
    const all = inertOutside([tour], body);
    expect(app.inert).toBe(true);
    all();
  });

  it('gives focus back to the opener when the tour held it at close', () => {
    const opener = { nodeType: 1, offsetHeight: 1, isConnected: true, focus: vi.fn() };
    const bubble = {};
    const root = { contains: (node) => node === bubble };
    restoreFocus({ activeElement: bubble, body: {} }, root, opener);
    expect(opener.focus).toHaveBeenCalledOnce();
    restoreFocus({ activeElement: { other: true }, body: {} }, root, opener);
    expect(opener.focus).toHaveBeenCalledOnce();
  });
});

describe('the spotlight and the mascot', () => {
  const view = { width: 1000, height: 800 };

  it('cuts a rounded hole with the same number of points for any target, so it can glide', () => {
    const count = (clip) => clip.split(',').length;
    const near = holeClip({ x: 10, y: 20, width: 100, height: 50, radius: 8 }, view);
    const far = holeClip({ x: 500, y: 300, width: 300, height: 200, radius: 12 }, view);
    expect(near.startsWith('polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ')).toBe(true);
    expect(count(near)).toBe(count(far));
    expect(count(holeClip(null, view))).toBe(count(far));
    expect(far).toContain('500px 312px');
  });

  it('stands beside the bubble, clear of the lit part, and faces the lit part', () => {
    const box = { width: 80, height: 80 };
    const bubble = { x: 400, y: 100, width: 300, height: 150 };
    expect(mascotSpot({ bubble, hole: { x: 800, y: 40, width: 50, height: 50 } }, view, box, 10)).toEqual({ x: 350, y: 170, face: 'right' });
    expect(mascotSpot({ bubble, hole: { x: 200, y: 40, width: 200, height: 400 } }, view, box, 10)).toEqual({ x: 750, y: 170, face: 'left' });
    expect(mascotSpot({ bubble, hole: null }, view, box, 10)).toMatchObject({ x: 350, face: 'right' });
  });

  it('goes under the bubble when neither side has room', () => {
    const wide = { x: 20, y: 100, width: 960, height: 100 };
    expect(mascotSpot({ bubble: wide, hole: null }, view, { width: 80, height: 80 }, 10)).toMatchObject({ x: 60, y: 210 });
  });

  it('draws the mascot and the ring above the dim layer, and the centred bubble above both', () => {
    const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
    const tokens = Object.fromEntries([...read('../src/tokens/z-index.css').matchAll(/--(z-[a-z-]+):\s*(\d+);/g)].map((m) => [m[1], Number(m[2])]));
    const zOf = (css, selector) => {
      const block = css.slice(css.indexOf(`${selector} {`));
      const name = /z-index:\s*var\(--(z-[a-z-]+)\)/.exec(block.slice(0, block.indexOf('}')))?.[1];
      return tokens[name] ?? 0;
    };
    const tour = read('../src/composites/GuidedTour/GuidedTour.css');
    const veil = zOf(read('../src/primitives/Overlay/Overlay.css'), '.overlay');
    expect(veil).toBeGreaterThan(0);
    expect(zOf(tour, '.guided-tour__mascot')).toBeGreaterThan(veil);
    expect(zOf(tour, '.guided-tour__ring')).toBeGreaterThan(veil);
    expect(zOf(tour, '.guided-tour__bubble--center')).toBeGreaterThan(zOf(tour, '.guided-tour__mascot'));
    expect(tour.slice(tour.indexOf('.guided-tour {'), tour.indexOf('}'))).toContain('isolation: isolate');
  });
});
