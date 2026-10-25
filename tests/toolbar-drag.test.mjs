/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { FRAME, LAYOUT } from './fixtures/toolbar-dock/toolbar-dock-frame.mjs';
import { toolbarBasket } from '../src/composites/ToolbarDock/behavior/toolbar-basket';
import { toolbarDropAt } from '../src/composites/ToolbarDock/behavior/toolbar-drop-at';
import { toolbarDropLayout } from '../src/composites/ToolbarDock/behavior/toolbar-drop-layout';
import { toolbarIdsOf } from '../src/composites/ToolbarDock';
import { toolbarZones } from '../src/composites/ToolbarDock/behavior/toolbar-zones';

const zoneOf = (zones, side) => zones.find((zone) => zone.side === side);

const drop = (id, point) => toolbarDropAt(FRAME, LAYOUT, id, point);

describe('toolbarZones', () => {
  it('lists the free lane indexes of every side without the dragged toolbar', () => {
    const zones = toolbarZones(FRAME, LAYOUT, 'c');
    expect(zoneOf(zones, 'left').free).toEqual([0]);
    expect(zoneOf(zones, 'right').free).toEqual([0]);
    expect(zoneOf(zones, 'bottom').free).toEqual([0, 1]);
    expect(zoneOf(zones, 'top').free).toEqual([]);
  });

  it('keeps the own side open to reorder or stay', () => {
    const zones = toolbarZones(FRAME, LAYOUT, 'a');
    expect(zoneOf(zones, 'top').others).toBe(1);
    expect(zoneOf(zones, 'top').free).toEqual([0, 1]);
  });

  it('sizes each slot with the thickness of its side', () => {
    const zones = toolbarZones(FRAME, LAYOUT, 'a');
    expect(zoneOf(zones, 'right').slots[0]).toMatchObject({ x: 752, width: 48 });
    expect(zoneOf(zones, 'bottom').slots[1]).toMatchObject({ y: 520, height: 40 });
  });
});

describe('toolbarDropAt', () => {
  it('refuses a side that holds two other toolbars', () => {
    const target = drop('c', { x: 400, y: 10 });
    expect(target).toMatchObject({ kind: 'refused', side: 'top' });
    expect(target.rect).toMatchObject({ y: 0, height: 80 });
    expect(toolbarDropLayout(LAYOUT, 'c', target)).toBe(LAYOUT);
  });

  it('picks the outer or inner lane by depth', () => {
    expect(drop('a', { x: 400, y: 5 })).toMatchObject({ kind: 'lane', side: 'top', index: 0 });
    expect(drop('a', { x: 400, y: 30 })).toMatchObject({ kind: 'lane', side: 'top', index: 1 });
    expect(drop('a', { x: 400, y: 595 })).toMatchObject({ kind: 'lane', side: 'bottom', index: 0 });
    expect(drop('a', { x: 100, y: 565 })).toMatchObject({ kind: 'lane', side: 'bottom', index: 1 });
  });

  it('reorders on the same side', () => {
    const target = drop('a', { x: 400, y: 30 });
    expect(toolbarIdsOf(toolbarDropLayout(LAYOUT, 'a', target), 'top')).toEqual(['b', 'a']);
  });

  it('keeps the sides when the toolbar stays where it is', () => {
    const target = drop('a', { x: 400, y: 5 });
    expect(toolbarDropLayout(LAYOUT, 'a', target).sides).toEqual(LAYOUT.sides);
  });

  it('previews a switch of orientation at the thickness of the new side', () => {
    const target = drop('a', { x: 790, y: 300 });
    expect(target).toMatchObject({ kind: 'lane', side: 'right', index: 0 });
    expect(target.rect).toMatchObject({ x: 752, width: 48 });
    const next = toolbarDropLayout(LAYOUT, 'a', target);
    expect(toolbarIdsOf(next, 'right')).toEqual(['a']);
    expect(toolbarIdsOf(next, 'top')).toEqual(['b']);
  });

  it('lets the corners belong to the nearest edge', () => {
    expect(drop('c', { x: 790, y: 3 })).toMatchObject({ side: 'top' });
    expect(drop('d', { x: 4, y: 300 })).toMatchObject({ kind: 'lane', side: 'left', index: 0 });
  });

  it('never targets the centre', () => {
    expect(drop('a', { x: 400, y: 300 })).toEqual({ kind: 'none' });
  });

  it('hides the toolbar on the basket', () => {
    const basket = toolbarBasket(FRAME);
    const target = drop('a', { x: basket.x + basket.width / 2, y: basket.y + basket.height / 2 });
    expect(target).toEqual({ kind: 'basket' });
    const next = toolbarDropLayout(LAYOUT, 'a', target);
    expect(next.hidden).toEqual(['a']);
    expect(toolbarIdsOf(next, 'top')).toEqual(['b']);
    expect(next.last.a).toEqual({ side: 'top', lane: 0, start: 0, size: 1 });
  });

  it('puts the toolbar back when dropped outside the frame', () => {
    const target = drop('a', { x: -20, y: 100 });
    expect(target).toEqual({ kind: 'none' });
    expect(toolbarDropLayout(LAYOUT, 'a', target)).toBe(LAYOUT);
  });
});
