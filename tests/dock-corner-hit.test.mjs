/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { cornerEnds, layoutTree } from '../src/composites/DockLayout';
import { CORNER_BUTTON_GAP, CORNER_BUTTONS, CORNER_HEADER, CORNER_HIT, CORNER_TITLE_END } from '../src/composites/DockLayout/behavior/corner.constants';
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

const GAP = 8;
const overlaps = (one, two) => one.x < two.x + two.width && two.x < one.x + one.width && one.y < two.y + two.height && two.y < one.y + one.height;
const titlebarOf = (panel) => ({ x: panel.x, y: panel.y, width: panel.width, height: CORNER_HEADER });
const centreOf = (box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
const distanceTo = (point, box) => Math.hypot(Math.max(box.x - point.x, 0, point.x - box.x - box.width), Math.max(box.y - point.y, 0, point.y - box.y - box.height));
const buttonsOf = (panel) =>
  Array.from({ length: CORNER_BUTTONS }, (_, index) => ({
    x: panel.x + panel.width - CORNER_TITLE_END - (index + 1) * CORNER_HIT - index * CORNER_BUTTON_GAP,
    y: panel.y + (CORNER_HEADER - CORNER_HIT) / 2,
    width: CORNER_HIT,
    height: CORNER_HIT,
  }));

describe('corner handle hit box', () => {
  const laid = layoutTree(tree, STAGE);
  const handles = cornerEnds(laid, tree);
  const leafOf = (key) => laid.leaves.find((item) => item.node.key === key);

  it('has handles to check', () => {
    expect(handles.length).toBeGreaterThan(0);
  });

  const cornerOf = (handle) => handle.takeCorner ?? handle.giveCorner;

  const rows = handles.filter((handle) => handle.along === 'row');
  const columns = handles.filter((handle) => handle.along === 'column');

  it('has row and column handles to check', () => {
    expect(rows.length).toBeGreaterThan(0);
    expect(columns.length).toBeGreaterThan(0);
  });

  it('is a 24 by 24 square on every row handle', () => {
    for (const handle of rows) {
      const hit = cornerHitOf(handle);
      expect(hit.width).toBe(24);
      expect(hit.height).toBe(24);
    }
  });

  it('keeps a row handle below the header of its panel, on its corner', () => {
    for (const handle of rows) {
      const panel = leafOf(handle.key).rect;
      const corner = cornerOf(handle);
      const hit = cornerHitOf(handle);
      expect(hit.x).toBeCloseTo(corner.endsWith('left') ? panel.x : panel.x + panel.width - 24, 9);
      expect(hit.y).toBeCloseTo(corner.startsWith('top') ? panel.y + CORNER_HEADER : panel.y + panel.height - 24, 9);
    }
  });

  it('does not cover the middle of the panel edge', () => {
    for (const handle of rows) {
      expect(cornerHitOf(handle).height).toBeLessThanOrEqual(leafOf(handle.key).rect.height / 2);
    }
  });

  it('keeps a column handle in the seam, clear of every title bar', () => {
    for (const handle of columns) {
      const hit = cornerHitOf(handle);
      expect(hit.width).toBeGreaterThanOrEqual(24);
      expect(hit.height).toBeLessThanOrEqual(GAP);
      for (const item of laid.leaves) expect(overlaps(hit, titlebarOf(item.rect))).toBe(false);
    }
  });

  it('keeps a column handle at least 12 px from every title bar button', () => {
    for (const handle of columns) {
      const hit = cornerHitOf(handle);
      for (const item of laid.leaves) {
        for (const box of buttonsOf(item.rect)) expect(distanceTo(centreOf(hit), box)).toBeGreaterThanOrEqual(12);
      }
    }
  });

  it('matches the hit area and titlebar tokens', () => {
    expect(CORNER_HIT).toBe(tokenPx('--hit-area-min'));
    expect(CORNER_HEADER).toBe(tokenPx('--widget-titlebar-h'));
  });
});

describe('corner handle hit placement', () => {
  const rect = { x: 10, y: 20, width: 300, height: 200 };
  const at = (along, end, takeCorner, strip = rect) => cornerHitOf({ rect: strip, along, end, takeCorner, giveCorner: null });

  it('puts the row handle of a short panel below the header', () => {
    const hit = at('row', 'end', 'bottom-right', { x: 0, y: 100, width: 8, height: 40 });
    expect(hit.y).toBe(130);
    expect(hit.height).toBe(24);
  });

  it('places each row handle at its own corner', () => {
    expect(at('row', 'start', 'top-left')).toEqual({ x: 10, y: 50, width: 24, height: 24 });
    expect(at('row', 'start', 'bottom-left')).toEqual({ x: 10, y: 196, width: 24, height: 24 });
    expect(at('row', 'end', 'top-right')).toEqual({ x: 286, y: 50, width: 24, height: 24 });
    expect(at('row', 'end', 'bottom-right')).toEqual({ x: 286, y: 196, width: 24, height: 24 });
  });

  it('puts a column handle in the seam above or below the strip, whatever the panel height', () => {
    const strip = { x: 10, y: 100, width: 300, height: 8 };
    expect(at('column', 'start', 'top-left', strip)).toEqual({ x: 10, y: 92, width: 24, height: 8 });
    expect(at('column', 'end', 'bottom-left', strip)).toEqual({ x: 10, y: 108, width: 24, height: 8 });
  });

  it('insets a right column handle past the title bar buttons, clear of them by 12 px', () => {
    const below = { x: 10, y: 108, width: 300, height: 200 };
    for (const [end, corner, strip] of [['start', 'top-right', { ...below, height: 8 }], ['end', 'bottom-right', { x: 10, y: 92, width: 300, height: 8 }]]) {
      const hit = at('column', end, corner, strip);
      expect(hit.x + hit.width).toBeLessThan(below.x + below.width - CORNER_TITLE_END - CORNER_BUTTONS * CORNER_HIT);
      expect(overlaps(hit, titlebarOf(below))).toBe(false);
      for (const box of buttonsOf(below)) expect(distanceTo(centreOf(hit), box)).toBeGreaterThanOrEqual(12);
    }
  });

  it('never leaves the seam to the left of a narrow panel', () => {
    const hit = at('column', 'end', 'bottom-right', { x: 10, y: 92, width: 60, height: 8 });
    expect(hit.x).toBe(10);
  });
});
