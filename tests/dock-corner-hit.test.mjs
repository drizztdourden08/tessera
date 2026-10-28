/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { cornerEnds, GAP, layoutTree } from '../src/composites/DockLayout';
import { CORNER_HIT, INWARD, OUTWARD } from '../src/composites/DockLayout/behavior/corner.constants';
import { cornerSeamOf } from '../src/composites/DockLayout/behavior/corner-seam-of';
import { cornerZones } from '../src/composites/DockLayout/behavior/corner-zones';
import { turnOfDrag } from '../src/composites/DockLayout/behavior/turn-of-drag';
import { turnOfKey } from '../src/composites/DockLayout/behavior/turn-of-key';
import { DockCornerHandle } from '../src/composites/DockLayout/sub-components/DockCornerHandle';
import { DockCornerZone } from '../src/composites/DockLayout/sub-components/DockCornerZone';

const leaf = (key) => ({ kind: 'pane', key, widgets: [key], active: key, makeRoom: true });
const main = { kind: 'main', key: 'main' };
const split = (axis, children, sizes) => ({ kind: 'split', axis, sizes: sizes ?? children.map(() => 1 / children.length), children });
const LAYOUTS = {
  oneCorner: split('column', [split('row', [leaf('L'), main], [0.26, 0.74]), leaf('B')], [0.74, 0.26]),
  sideAndStack: split('row', [leaf('L'), split('column', [leaf('T'), main, leaf('B')], [0.22, 0.52, 0.26])], [0.24, 0.76]),
  giveToMain: split('row', [leaf('L'), split('column', [leaf('X'), main], [0.4, 0.6])], [0.3, 0.7]),
  nested: split('row', [leaf('L'), split('column', [split('row', [leaf('P'), main], [0.4, 0.6]), leaf('B')], [0.7, 0.3]), leaf('R')], [0.2, 0.6, 0.2]),
};
const SIZE = { width: 1000, height: 800 };
const INNER = { x: GAP, y: GAP, width: SIZE.width - GAP * 2, height: SIZE.height - GAP * 2 };
const TITLEBAR = 30;
const noop = () => {};
const css = readFileSync(new URL('../src/composites/DockLayout/sub-components/DockCornerHandle.css', import.meta.url), 'utf8');

const overlaps = (one, two) => one.x < two.x + two.width && two.x < one.x + one.width && one.y < two.y + two.height && two.y < one.y + one.height;
const inside = (inner, outer) =>
  inner.x >= outer.x - 0.5 && inner.y >= outer.y - 0.5 && inner.x + inner.width <= outer.x + outer.width + 0.5 && inner.y + inner.height <= outer.y + outer.height + 0.5;
const titlebarOf = (panel) => ({ x: panel.x, y: panel.y, width: panel.width, height: TITLEBAR });
const contentOf = (panel) => ({ x: panel.x, y: panel.y + TITLEBAR, width: panel.width, height: panel.height - TITLEBAR });
const cornerButtonsOf = (panel) => [
  { x: panel.x, y: panel.y + panel.height - CORNER_HIT, width: CORNER_HIT, height: CORNER_HIT },
  { x: panel.x + panel.width - CORNER_HIT, y: panel.y + panel.height - CORNER_HIT, width: CORNER_HIT, height: CORNER_HIT },
];
const isBottomOfLeft = (pull) => pull.handle.key === 'L' && pull.handle.end === 'end';
const sameHandle = (one, two) => one.key === two.key && one.along === two.along && one.end === two.end;

describe.each(Object.entries(LAYOUTS))('corner turn on the seam, %s', (_, tree) => {
  const laid = layoutTree(tree, INNER);
  const handles = cornerEnds(laid, tree);
  const zones = cornerZones(laid, tree, handles);
  const panels = laid.leaves.map((item) => item.rect);

  it('has handles and zones to check', () => {
    expect(handles.length).toBeGreaterThan(0);
    expect(zones.length).toBeGreaterThan(0);
  });

  it('gives every handle a pointer route through a seam zone', () => {
    for (const handle of handles) {
      const pull = zones.flatMap((zone) => zone.pulls).find((item) => sameHandle(item.handle, handle));
      expect(pull).toBeDefined();
      if (handle.take !== null) expect(pull.take).toBe(handle.take);
      if (handle.give !== null) expect(pull.give).not.toBeNull();
    }
  });

  it('keeps every zone inside the seam of its divider, so the divider stays one target', () => {
    for (const zone of zones) {
      const divider = laid.dividers[zone.divider];
      expect(inside(zone.rect, divider.rect)).toBe(true);
      expect(zone.axis).toBe(divider.node.axis);
      expect(Math.min(zone.rect.width, zone.rect.height)).toBe(GAP);
      expect(Math.max(zone.rect.width, zone.rect.height)).toBeLessThanOrEqual(CORNER_HIT);
    }
  });

  it('covers no title bar, no content and no button in a panel corner, in either panel', () => {
    for (const zone of zones) {
      for (const panel of panels) {
        expect(overlaps(zone.rect, titlebarOf(panel))).toBe(false);
        expect(overlaps(zone.rect, contentOf(panel))).toBe(false);
        for (const button of cornerButtonsOf(panel)) expect(overlaps(zone.rect, button)).toBe(false);
      }
    }
  });

  it('draws each keyboard handle in the seam or the stage gutter, clear of every panel', () => {
    for (const handle of handles) {
      const spot = cornerSeamOf(handle);
      expect(Math.min(spot.width, spot.height)).toBe(GAP);
      expect(inside(spot, { x: 0, y: 0, ...SIZE })).toBe(true);
      for (const panel of panels) expect(overlaps(spot, panel)).toBe(false);
    }
  });

  it('reaches every turn by keyboard: outward arrow takes, inward arrow gives', () => {
    for (const handle of handles) {
      expect(turnOfKey(OUTWARD[handle.along][handle.end], handle)).toBe(handle.take === null ? null : 'take');
      expect(turnOfKey(INWARD[handle.along][handle.end], handle)).toBe(handle.give === null ? null : 'give');
    }
  });
});

describe('seam zone pulls', () => {
  const zonesOf = (tree) => {
    const laid = layoutTree(tree, INNER);
    return { laid, zones: cornerZones(laid, tree, cornerEnds(laid, tree)) };
  };
  const firstTurn = (zone, moved) => {
    for (const pull of zone.pulls) {
      const turn = turnOfDrag(moved * pull.outward, pull);
      if (turn) return { key: pull.handle.key, turn };
    }
    return null;
  };

  it('turns the bottom left corner from the left end of the seam below the side panel', () => {
    const { laid, zones } = zonesOf(LAYOUTS.oneCorner);
    const zone = zones.find((item) => item.axis === 'column');
    const left = laid.leaves.find((item) => item.node.key === 'L').rect;
    expect(zone.rect).toEqual({ x: left.x, y: left.y + left.height, width: CORNER_HIT, height: GAP });
    const below = laid.leaves.find((item) => item.node.key === 'B').rect.height;
    expect(firstTurn(zone, below / 2 - 1)).toBeNull();
    expect(firstTurn(zone, below / 2 + 1)).toEqual({ key: 'L', turn: 'take' });
  });

  it('gives a corner along the stage gutter through the end of the seam beside the panel', () => {
    const { laid, zones } = zonesOf(LAYOUTS.giveToMain);
    const left = laid.leaves.find((item) => item.node.key === 'L').rect;
    const zone = zones.find((item) => item.pulls.some(isBottomOfLeft));
    expect(zone.axis).toBe('row');
    expect(zone.rect).toEqual({ x: left.x + left.width, y: left.y + left.height - CORNER_HIT, width: GAP, height: CORNER_HIT });
    expect(firstTurn(zone, -(left.width / 2 + 1))).toEqual({ key: 'L', turn: 'give' });
    expect(firstTurn(zone, left.width)).toBeNull();
  });

  it('merges the two handles that share a seam end into one zone', () => {
    const { zones } = zonesOf(LAYOUTS.sideAndStack);
    const shared = zones.filter((item) => item.pulls.length > 1);
    expect(shared.length).toBeGreaterThan(0);
    expect(new Set(zones.map((item) => item.key)).size).toBe(zones.length);
  });
});

describe('corner elements', () => {
  const tree = LAYOUTS.oneCorner;
  const laid = layoutTree(tree, INNER);
  const handle = cornerEnds(laid, tree)[0];
  const zone = cornerZones(laid, tree, [handle])[0];

  it('keeps the keyboard handle a button and a tab stop with no pointer box', () => {
    const html = renderToString(h(DockCornerHandle, { handle, label: 'Players, bottom left corner', hint: 'hint', onTurn: noop }));
    expect(html).toContain('role="button"');
    expect(html).toContain('tabindex="0"');
    expect(html).toContain('aria-label="Players, bottom left corner"');
    expect(html).not.toMatch(/width:|height:/);
    const rule = css.match(/\.dock-corner \{([^}]*)\}/)?.[1] ?? '';
    expect(rule).toContain('inline-size: 0;');
    expect(rule).toContain('block-size: 0;');
    expect(rule).toContain('pointer-events: none;');
  });

  it('draws the seam zone as part of the divider, not as a separate focusable target', () => {
    const divider = laid.dividers[zone.divider];
    const html = renderToString(h(DockCornerZone, { zone, origin: divider.rect, hint: 'hint', onTurn: noop }));
    expect(html).not.toMatch(/role=|tabindex=/);
    expect(html).toMatch(new RegExp(`left:${zone.rect.x - divider.rect.x}(px)?;`));
  });
});
