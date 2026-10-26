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

  it('is at least 24 px across and along on every handle', () => {
    for (const { rect, along, end } of handles) {
      const hit = cornerHitOf(rect, along, end);
      expect(hit.width).toBeGreaterThanOrEqual(24);
      expect(hit.height).toBeGreaterThanOrEqual(24);
    }
  });

  it('never covers the header of its panel, where the buttons sit', () => {
    for (const { key, rect, along, end } of handles) {
      expect(cornerHitOf(rect, along, end).y).toBeGreaterThanOrEqual(leafOf(key).rect.y + CORNER_HEADER);
    }
  });

  it('stays on the edge of the panel it turns', () => {
    for (const { key, rect, along, end } of handles) {
      const hit = cornerHitOf(rect, along, end);
      const leaf = leafOf(key).rect;
      if (along === 'row') {
        expect(end === 'start' ? hit.x : hit.x + hit.width).toBeCloseTo(end === 'start' ? leaf.x : leaf.x + leaf.width, 9);
      } else {
        expect(hit.x).toBe(leaf.x);
        expect(hit.width).toBe(leaf.width);
      }
    }
  });

  it('puts the handle of a short panel below the header', () => {
    const hit = cornerHitOf({ x: 0, y: 100, width: 8, height: 40 }, 'row', 'end');
    expect(hit.y).toBe(130);
    expect(hit.height).toBe(24);
  });

  it('matches the hit area and titlebar tokens', () => {
    expect(CORNER_HIT).toBe(tokenPx('--hit-area-min'));
    expect(CORNER_HEADER).toBe(tokenPx('--widget-titlebar-h'));
  });
});
