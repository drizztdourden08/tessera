/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { layoutTree, mainRectOf } from '../src/composites/DockLayout';
import { FLOAT_MIN, NO_MODIFIERS } from '../src/composites/DockLayout/DockLayout.constants';
import { RESIZE_SIDES } from '../src/composites/rect-drag/rect-drag.constants';
import { dockSettings } from '../src/composites/DockLayout/behavior/dock-settings';
import { floatTargets } from '../src/composites/DockLayout/behavior/float-targets';
import { snapEdgesOf } from '../src/composites/DockLayout/behavior/snap-edges';
import { snapGuidesOf } from '../src/composites/DockLayout/behavior/snap-guides';
import { snapLinesOf } from '../src/composites/DockLayout/behavior/snap-lines';
import { snapMove } from '../src/composites/DockLayout/behavior/snap-move';
import { snapResize } from '../src/composites/DockLayout/behavior/snap-resize';
import { snapResizeOf } from '../src/composites/DockLayout/behavior/snap-resize-of';
import { viewFor } from '../src/composites/DockLayout/behavior/view-for';
import { createDefaultLayout } from '../src/composites/Widget/behavior/create-default-layout';

const STAGE = { x: 0, y: 0, width: 1000, height: 700 };
const MAIN = { x: 8, y: 8, width: 984, height: 684 };
const OTHER = { x: 600, y: 100, width: 200, height: 150 };
const LINES = snapLinesOf([STAGE, MAIN, OTHER]);

describe('a floating widget moved near an edge', () => {
  it('snaps its nearest edge onto the edge within the distance, on each axis', () => {
    expect(snapMove({ x: 395, y: 13, width: 200, height: 100 }, LINES, 8)).toEqual({ x: 400, y: 8, width: 200, height: 100 });
    expect(snapMove({ x: 805, y: 300, width: 100, height: 100 }, LINES, 8)).toEqual({ x: 800, y: 300, width: 100, height: 100 });
  });

  it('stays where the pointer puts it past the distance, or with snapping off', () => {
    const far = { x: 380, y: 300, width: 200, height: 100 };
    expect(snapMove(far, LINES, 8)).toEqual(far);
    expect(snapMove({ x: 395, y: 13, width: 200, height: 100 }, LINES, 0)).toEqual({ x: 395, y: 13, width: 200, height: 100 });
  });

  it('draws a guide along each edge it sits on, as long as both boxes', () => {
    const rect = { x: 400, y: 100, width: 200, height: 100 };
    expect(snapGuidesOf(rect, LINES, snapEdgesOf(rect))).toEqual([
      { axis: 'x', at: 600, from: 100, to: 250 },
      { axis: 'y', at: 100, from: 400, to: 800 },
    ]);
  });

  it('never moves the other widgets', () => {
    const targets = floatTargets(STAGE, MAIN, [{ id: 'log', x: 0.6, y: 0.1, width: 200, height: 150 }], 'console');
    const before = JSON.stringify(targets);
    snapMove({ x: 395, y: 13, width: 200, height: 100 }, snapLinesOf(targets), 8);
    expect(JSON.stringify(targets)).toBe(before);
    expect(targets.slice(0, 2)).toEqual([STAGE, MAIN]);
  });
});

describe('a floating widget resized near an edge', () => {
  const limits = { bounds: MAIN, min: FLOAT_MIN };

  it('snaps only the edge it is held by', () => {
    const rect = { x: 300, y: 300, width: 296, height: 200 };
    expect(snapResize(rect, LINES, 8, { sides: RESIZE_SIDES.e, ...limits })).toEqual({ x: 300, y: 300, width: 300, height: 200 });
    expect(snapResize(rect, LINES, 8, { sides: RESIZE_SIDES.w, ...limits })).toEqual(rect);
    const west = { x: 804, y: 300, width: 180, height: 200 };
    expect(snapResize(west, LINES, 8, { sides: RESIZE_SIDES.w, ...limits })).toEqual({ x: 800, y: 300, width: 184, height: 200 });
  });

  it('never snaps below the minimum size or out of the main view', () => {
    const narrow = { x: 603 - FLOAT_MIN.width - 2, y: 300, width: FLOAT_MIN.width + 2, height: 200 };
    expect(snapResize(narrow, LINES, 8, { sides: RESIZE_SIDES.e, ...limits })).toEqual(narrow);
    const edge = { x: 700, y: 300, width: 288, height: 200 };
    expect(snapResize(edge, LINES, 8, { sides: RESIZE_SIDES.e, ...limits })).toEqual({ ...edge, width: 292 });
  });

  it('hands the live box its guides, and none with snapping off', () => {
    const snap = snapResizeOf({ distance: 8, targets: [STAGE, MAIN, OTHER] }, 'e', limits);
    const live = snap({ x: 300, y: 300, width: 296, height: 200 });
    expect(live.rect.width).toBe(300);
    expect(live.guides).toEqual([{ axis: 'x', at: 600, from: 100, to: 500 }]);
    expect(snapResizeOf(null, 'e', limits)({ x: 1, y: 2, width: 3, height: 4 })).toEqual({ rect: { x: 1, y: 2, width: 3, height: 4 }, guides: [] });
  });
});

describe('a floating widget dragged on the stage', () => {
  const layout = { ...createDefaultLayout(), floating: [{ id: 'console', x: 0.3, y: 0.3, width: 200, height: 120 }] };
  const laid = layoutTree(layout.dock, MAIN);
  const strings = { dragSwapLabel: (s) => s, dragOverlayLabel: (s) => s };
  const VIEW = { innerWidth: 1000, innerHeight: 700, screen: { width: 4000, height: 3000, availLeft: 0, availTop: 0 } };
  const ctx = (floatSnap) => ({
    laid, layout, mainRect: mainRectOf(laid), stage: STAGE, modifiers: NO_MODIFIERS, labelOf: (id) => id, mainLabel: 'Main view',
    strings, canPopOut: () => false, floatSnap,
  });
  const source = {
    id: 'console', isMain: false, fromKey: null, fromTab: false, floating: layout.floating[0], loneWidget: false,
    start: { x: 0, y: 0 }, grab: { x: 20, y: 10 }, size: { width: 200, height: 120 },
  };
  const place = (x, y) => ({ pointer: { x, y }, client: { x, y }, onScreen: { x: x + 500, y: y + 500 }, view: VIEW });

  it('snaps the live box and the landing box to the main view, with guides', () => {
    const view = viewFor(ctx(10), source, place(32, 300), { shift: false, ctrl: false });
    expect(view.floatingRect).toMatchObject({ x: 8 });
    expect(view.preview).toMatchObject({ x: 8 });
    expect(view.guides).toEqual([{ axis: 'x', at: 8, from: 8, to: 692 }]);
  });

  it('is off by default and moves exactly with the pointer', () => {
    expect(dockSettings({}, { mainView: 'Main view', gripLabel: 'Main' }).floatSnap).toBe(0);
    const view = viewFor(ctx(0), source, place(32, 300), { shift: false, ctrl: false });
    expect(view.floatingRect).toEqual({ x: 12, y: 290, width: 200, height: 120 });
    expect(view.guides).toEqual([]);
  });
});
