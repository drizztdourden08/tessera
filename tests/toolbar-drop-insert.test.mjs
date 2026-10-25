/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { FRAME } from './fixtures/toolbar-dock/toolbar-dock-frame.mjs';
import { MIN_BAR_PX, createToolbarLayout, toolbarIdsOf } from '../src/composites/ToolbarDock';
import { toolbarDropAt } from '../src/composites/ToolbarDock/behavior/toolbar-drop-at';
import { toolbarDropLayout } from '../src/composites/ToolbarDock/behavior/toolbar-drop-layout';
import { toolbarKeyStart } from '../src/composites/ToolbarDock/behavior/toolbar-key-start';
import { toolbarKeyStep } from '../src/composites/ToolbarDock/behavior/toolbar-key-step';
import { toolbarLaneSlots } from '../src/composites/ToolbarDock/behavior/toolbar-lane-slots';
import { toolbarPickSlots } from '../src/composites/ToolbarDock/behavior/toolbar-pick-slots';
import { toolbarPickTarget } from '../src/composites/ToolbarDock/behavior/toolbar-pick-target';
import { toolbarPlaceAt } from '../src/composites/ToolbarDock/behavior/toolbar-place-at';
import { toolbarSnapAt } from '../src/composites/ToolbarDock/behavior/toolbar-snap-at';

const def = (id, defaultSide) => ({ id, label: `Label ${id}`, defaultSide });

const BASE = createToolbarLayout([def('a', 'top'), def('x', 'left')]);

const METRICS = { spans: { top: [1000, 1000], bottom: [1000, 1000], left: [600, 600], right: [600, 600] } };

const place = (id, start, size) => ({ id, start, size });

const layoutWith = (top, left = [[place('x', 0, 0.5)]]) => ({ ...BASE, sides: { top, left, right: [], bottom: [] } });

const THREE = layoutWith([[place('a', 0, 0.2), place('b', 0.3, 0.2), place('c', 0.6, 0.2)]]);

const spot = (at, over = {}) => ({ side: 'top', lane: 0, index: 0, at, ...over });

const shape = (placed, lane = 0) => placed.layout.sides.top[lane].map(({ id, start, size }) => [id, Number(start.toFixed(4)) + 0, Number(size.toFixed(4)) + 0]);

describe('toolbarPlaceAt, insertion point', () => {
  it.each([
    ['the lane start', 0, [['x', 0, 0.3], ['a', 0.3, 0.2], ['b', 0.5, 0.2], ['c', 0.7, 0.2]]],
    ['between two bars', 0.2, [['a', 0, 0.2], ['x', 0.2, 0.3], ['b', 0.5, 0.2], ['c', 0.7, 0.2]]],
    ['a gap', 0.5, [['a', 0, 0.2], ['b', 0.3, 0.2], ['x', 0.5, 0.3], ['c', 0.8, 0.2]]],
    ['the lane end', 1, [['a', 0, 0.2], ['b', 0.3, 0.2], ['c', 0.5, 0.2], ['x', 0.7, 0.3]]],
  ])('lands at %s and pushes its neighbours', (_, at, expected) => {
    const placed = toolbarPlaceAt(THREE, METRICS, 'x', spot(at));
    expect(shape(placed)).toEqual(expected);
    expect(placed.layout.sides.left).toEqual([]);
  });

  it('keeps the pixel size of the bar when it changes side', () => {
    const placed = toolbarPlaceAt(THREE, METRICS, 'x', spot(0.5));
    expect(placed.size).toBeCloseTo(0.3, 6);
    expect(placed.span).toBe(1000);
  });

  it('shrinks the bar to the room left', () => {
    const wide = layoutWith(THREE.sides.top, [[place('x', 0, 0.9)]]);
    const placed = toolbarPlaceAt(wide, METRICS, 'x', spot(0));
    expect(placed.size).toBeCloseTo(0.4, 6);
    expect(shape(placed).map(([, , size]) => size)).toEqual([0.4, 0.2, 0.2, 0.2]);
  });

  it('never goes below the minimum size', () => {
    const tiny = layoutWith(THREE.sides.top, [[place('x', 0, 0.01)]]);
    const placed = toolbarPlaceAt(tiny, METRICS, 'x', spot(0));
    expect(placed.size * 1000).toBeCloseTo(MIN_BAR_PX, 6);
  });

  it('refuses the drop when even the minimum does not fit', () => {
    const packed = layoutWith([[place('a', 0, 0.5), place('b', 0.5, 0.49)]]);
    expect(toolbarPlaceAt(packed, METRICS, 'x', spot(0.5))).toBeNull();
  });

  it('accepts the drop when exactly the minimum fits', () => {
    const snug = layoutWith([[place('a', 0, 0.5), place('b', 0.5, 0.468)]]);
    expect(toolbarPlaceAt(snug, METRICS, 'x', spot(0.5)).size * 1000).toBeCloseTo(MIN_BAR_PX, 6);
  });

  it('refuses a lane that does not exist and a third lane', () => {
    expect(toolbarPlaceAt(THREE, METRICS, 'x', spot(0, { lane: 1, index: 1 }))).toBeNull();
    const two = layoutWith([[place('a', 0, 0.2)], [place('b', 0, 0.2)]]);
    expect(toolbarPlaceAt(two, METRICS, 'x', spot(0, { lane: 'new', index: 2 }))).toBeNull();
  });

  it('opens a new lane with the bar alone in it', () => {
    const placed = toolbarPlaceAt(THREE, METRICS, 'x', spot(0.4, { lane: 'new', index: 1 }));
    expect(placed.lane).toBe(1);
    expect(shape(placed, 0)).toEqual([['a', 0, 0.2], ['b', 0.3, 0.2], ['c', 0.6, 0.2]]);
    expect(shape(placed, 1)).toEqual([['x', 0.4, 0.3]]);
  });

  it('remembers the new spot of the bar', () => {
    const placed = toolbarPlaceAt(THREE, METRICS, 'x', spot(0.2));
    expect(placed.layout.last.x).toMatchObject({ side: 'top', lane: 0, start: 0.2 });
  });

  it('knows no bar that is not shown', () => {
    expect(toolbarPlaceAt(THREE, METRICS, 'nope', spot(0))).toBeNull();
  });
});

describe('toolbarSnapAt', () => {
  const PLACES = [place('a', 0, 0.2), place('b', 0.3, 0.2)];

  it.each([
    ['the lane start', 0.006, 0],
    ['the lane end', 0.994, 1],
    ['the start of a neighbour', 0.295, 0.3],
    ['the end of a neighbour', 0.205, 0.2],
    ['the nearer of two ends', 0.203, 0.2],
    ['nothing past 8px', 0.25, 0.25],
    ['nothing just past the reach', 0.209, 0.209],
    ['the lane start for a point before it', -0.2, 0],
    ['the lane end for a point past it', 1.4, 1],
  ])('snaps to %s', (_, raw, expected) => {
    expect(toolbarSnapAt(PLACES, 1000, raw)).toBeCloseTo(expected, 9);
  });

  it('widens the reach in fractions on a short lane', () => {
    expect(toolbarSnapAt(PLACES, 200, 0.26)).toBe(0.3);
  });

  it('only clamps when the lane has no span', () => {
    expect(toolbarSnapAt(PLACES, 0, 0.26)).toBe(0.26);
  });
});

describe('toolbarLaneSlots', () => {
  it.each([
    ['an empty lane', [], undefined, [0]],
    ['one full bar', [place('a', 0, 1)], undefined, [0, 1]],
    ['bars with gaps', [place('a', 0, 0.2), place('b', 0.3, 0.2)], undefined, [0, 0.2, 0.5, 1]],
    ['bars side by side', [place('a', 0, 0.5), place('b', 0.5, 0.5)], undefined, [0, 0.5, 1]],
    ['a bar that stays', [place('a', 0, 0.2), place('b', 0.3, 0.2)], 0.1, [0, 0.1, 0.2, 0.5, 1]],
    ['a stay on an existing slot', [place('a', 0, 0.2)], 0.2, [0, 0.2, 1]],
  ])('lists the slots of %s from start to end', (_, places, keep, expected) => {
    expect(toolbarLaneSlots(places, keep)).toEqual(expected);
  });

  it('lists the slots of the lane the picked bar is dropped into', () => {
    expect(toolbarPickSlots(THREE, 'x', 'top', 0)).toEqual([0, 0.2, 0.5, 0.8, 1]);
    expect(toolbarPickSlots(THREE, 'x', 'top', 'new')).toEqual([0]);
    expect(toolbarPickSlots(THREE, 'b', 'top', 0)).toEqual([0, 0.2, 0.3, 0.8, 1]);
  });
});

describe('slot keys in pick mode', () => {
  const pick = (slot) => ({ kind: 'lane', side: 'top', lane: 0, index: 0, slot });

  const press = (from, key) => toolbarKeyStep(THREE, 'x', pick(from), key);

  it.each([
    ['PageDown', 0, 1],
    ['PageDown', 4, 4],
    ['PageUp', 3, 2],
    ['PageUp', 0, 0],
    ['Home', 3, 0],
    ['End', 1, 4],
  ])('%s from slot %i goes to slot %i', (key, from, to) => {
    const result = press(from, key);
    expect(result.pick.slot).toBe(to);
    expect(result.note).toEqual({ kind: 'slot', slot: to + 1, count: 5 });
    expect(result.end).toBeNull();
  });

  it('leaves the basket alone', () => {
    expect(toolbarKeyStep(THREE, 'x', { kind: 'basket' }, 'PageDown')).toBeNull();
  });

  it('starts on the slot the bar already holds', () => {
    expect(toolbarKeyStart(THREE, 'b')).toMatchObject({ lane: 0, slot: 2 });
  });

  it('drops at the picked slot and pushes the neighbours', () => {
    const target = toolbarPickTarget(FRAME, THREE, 'x', pick(1));
    expect(target).toMatchObject({ kind: 'lane', lane: 0, at: 0.2 });
    expect(toolbarIdsOf(toolbarDropLayout(THREE, 'x', target), 'top')).toEqual(['a', 'x', 'b', 'c']);
  });

  it('drops at the end slot flush with the lane end', () => {
    const target = toolbarPickTarget(FRAME, THREE, 'x', pick(4));
    expect(target.start + target.size).toBeCloseTo(1, 9);
  });

  it('keeps the layout when a bar is dropped on its own slot', () => {
    const own = toolbarKeyStart(THREE, 'b');
    expect(toolbarDropLayout(THREE, 'b', toolbarPickTarget(FRAME, THREE, 'b', own))).toBe(THREE);
  });
});

describe('toolbarDropAt with a pointer', () => {
  const at = (id, layout, x, y) => toolbarDropAt(FRAME, layout, id, { x, y });

  it('turns the pointer into a fraction of the lane and previews the computed placement', () => {
    const target = at('x', THREE, 400, 10);
    expect(target).toMatchObject({ kind: 'lane', side: 'top', lane: 0, index: 0, at: 0.5 });
    expect(target.start).toBeCloseTo(0.425, 6);
    expect(target.size).toBeCloseTo(0.375, 6);
    expect(target.rect.x).toBeCloseTo(340, 6);
    expect(target.rect).toMatchObject({ y: 0, width: 300, height: 40 });
  });

  it('lands the bar mid-lane and pushes its neighbours when dropped', () => {
    const next = toolbarDropLayout(THREE, 'x', at('x', THREE, 400, 10));
    expect(toolbarIdsOf(next, 'top')).toEqual(['a', 'b', 'x', 'c']);
    expect(toolbarIdsOf(next, 'left')).toEqual([]);
    const lane = next.sides.top[0];
    for (let index = 1; index < lane.length; index += 1) {
      expect(lane[index].start).toBeGreaterThanOrEqual(lane[index - 1].start + lane[index - 1].size - 1e-9);
    }
    expect(lane.at(-1).start + lane.at(-1).size).toBeLessThanOrEqual(1 + 1e-9);
  });

  it('snaps the pointer to the end of a neighbour', () => {
    expect(at('x', THREE, 164, 10)).toMatchObject({ kind: 'lane', at: 0.2 });
    expect(at('x', THREE, 150, 10)).toMatchObject({ kind: 'lane', at: 0.1875 });
  });

  it('snaps the pointer to the lane ends', () => {
    expect(at('x', THREE, 5, 10)).toMatchObject({ kind: 'lane', at: 0 });
    expect(at('x', THREE, 793, 4)).toMatchObject({ kind: 'lane', at: 1 });
  });

  it('opens a new lane when the lane under the pointer has no room', () => {
    const packed = layoutWith([[place('a', 0, 0.5), place('b', 0.5, 0.5)]]);
    expect(at('x', packed, 400, 5)).toMatchObject({ kind: 'lane', lane: 'new', index: 0 });
    expect(at('x', packed, 400, 30)).toMatchObject({ kind: 'lane', lane: 'new', index: 1 });
  });

  it('refuses a side with two lanes and no room in the lane under the pointer', () => {
    const full = layoutWith([[place('a', 0, 0.99)], [place('b', 0, 1)]]);
    const target = at('x', full, 400, 10);
    expect(target).toMatchObject({ kind: 'refused', side: 'top' });
    expect(toolbarDropLayout(full, 'x', target)).toBe(full);
  });

  it('joins the inner lane of a full side when it has room', () => {
    const half = layoutWith([[place('a', 0, 1)], [place('b', 0, 0.4)]]);
    expect(at('x', half, 600, 50)).toMatchObject({ kind: 'lane', lane: 1, index: 1 });
  });
});
