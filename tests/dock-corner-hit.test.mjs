/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cornerEnds, layoutTree } from '../src/composites/DockLayout';
import { CORNER_HEADER, CORNER_HIT } from '../src/composites/DockLayout/behavior/corner.constants';
import { cornerHitOf } from '../src/composites/DockLayout/behavior/corner-hit-of';

const leaf = (key) => ({ kind: 'pane', key, widgets: [key], active: key, makeRoom: false });
const tree = {
  kind: 'split',
  axis: 'column',
  sizes: [0.7, 0.3],
  children: [
    { kind: 'split', axis: 'row', sizes: [0.25, 0.75], children: [leaf('L'), { kind: 'main', key: 'main' }] },
    leaf('B'),
  ],
};
const STAGE = { x: 0, y: 0, width: 1000, height: 800 };
const read = (file) => readFileSync(new URL(`../src/tokens/${file}`, import.meta.url), 'utf8');
const tokenPx = (name) => {
  const value = read('size.css').match(new RegExp(`${name}:\\s*([^;]+);`))?.[1] ?? '';
  const calc = value.match(/^calc\((\d+) \* var\(--size-1\)\)$/);
  if (calc) return Number(calc[1]);
  const ref = value.match(/^var\((--size-\d+)\)$/)?.[1];
  return ref ? Number(read('scale.css').match(new RegExp(`${ref}:\\s*(\\d+)px`))?.[1]) : Number.NaN;
};

describe('corner handle hit box', () => {
  const laid = layoutTree(tree, STAGE);
  const handles = cornerEnds(laid, tree);
  const leafOf = (key) => laid.leaves.find((item) => item.node.key === key);

  it('has handles to check', () => {
    expect(handles.length).toBeGreaterThan(0);
  });

  const cornerOf = (handle) => handle.takeCorner ?? handle.giveCorner;

  it('is a 24 by 24 square on every handle', () => {
    for (const handle of handles) {
      const hit = cornerHitOf(handle);
      expect(hit.width).toBe(24);
      expect(hit.height).toBe(24);
    }
  });

  it('never covers the header of its panel, where the buttons sit', () => {
    for (const handle of handles) {
      expect(cornerHitOf(handle).y).toBeGreaterThanOrEqual(leafOf(handle.key).rect.y + CORNER_HEADER);
    }
  });

  it('sits on the corner of the panel it turns', () => {
    for (const handle of handles) {
      const panel = leafOf(handle.key).rect;
      const corner = cornerOf(handle);
      const hit = cornerHitOf(handle);
      expect(hit.x).toBeCloseTo(corner.endsWith('left') ? panel.x : panel.x + panel.width - 24, 9);
      expect(hit.y).toBeCloseTo(corner.startsWith('top') ? panel.y + CORNER_HEADER : panel.y + panel.height - 24, 9);
    }
  });

  it('does not cover the middle of the panel edge', () => {
    for (const handle of handles) {
      const hit = cornerHitOf(handle);
      const panel = leafOf(handle.key).rect;
      const span = handle.along === 'row' ? panel.height : panel.width;
      const size = handle.along === 'row' ? hit.height : hit.width;
      expect(size).toBeLessThanOrEqual(span / 2);
    }
  });

  it('matches the hit area and titlebar tokens', () => {
    expect(CORNER_HIT).toBe(tokenPx('--hit-area-min'));
    expect(CORNER_HEADER).toBe(tokenPx('--widget-titlebar-h'));
  });
});

describe('corner handle hit placement', () => {
  it('puts the handle of a short panel below the header', () => {
    const short = { rect: { x: 0, y: 100, width: 8, height: 40 }, along: 'row', end: 'end', takeCorner: 'bottom-right', giveCorner: null };
    const hit = cornerHitOf(short);
    expect(hit.y).toBe(130);
    expect(hit.height).toBe(24);
  });

  it('places each end of each axis at its own corner', () => {
    const rect = { x: 10, y: 20, width: 300, height: 200 };
    const at = (along, end, takeCorner) => cornerHitOf({ rect, along, end, takeCorner, giveCorner: null });
    expect(at('row', 'start', 'top-left')).toEqual({ x: 10, y: 50, width: 24, height: 24 });
    expect(at('row', 'start', 'bottom-left')).toEqual({ x: 10, y: 196, width: 24, height: 24 });
    expect(at('row', 'end', 'top-right')).toEqual({ x: 286, y: 50, width: 24, height: 24 });
    expect(at('row', 'end', 'bottom-right')).toEqual({ x: 286, y: 196, width: 24, height: 24 });
    expect(at('column', 'start', 'top-left')).toEqual({ x: 10, y: 50, width: 24, height: 24 });
    expect(at('column', 'start', 'top-right')).toEqual({ x: 286, y: 50, width: 24, height: 24 });
    expect(at('column', 'end', 'bottom-left')).toEqual({ x: 10, y: 196, width: 24, height: 24 });
    expect(at('column', 'end', 'bottom-right')).toEqual({ x: 286, y: 196, width: 24, height: 24 });
  });
});
