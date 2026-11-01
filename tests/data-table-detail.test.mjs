/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { detailKeyDown } from '../src/composites/DataTable/behavior/detail-key-down';
import { detailRange } from '../src/composites/DataTable/behavior/detail-range';
import { detailShift } from '../src/composites/DataTable/behavior/detail-shift';
import { flatRects } from '../src/composites/DataTable/behavior/flat-rects';

const METRICS = { top: 0, viewport: 400, rowHeight: 40 };
const range = (metrics, detail, overscan = 0) => detailRange({ metrics, overscan, count: 100, detail });

describe('K1 virtual heights with a detail', { tags: ['critical'] }, () => {
  it('keeps the plain window when there is no detail', () => {
    expect(range(METRICS, { at: -1, height: 0 })).toEqual({ start: 0, end: 10 });
    expect(range(METRICS, { at: 3, height: 0 })).toEqual({ start: 0, end: 10 });
  });

  it('shows fewer rows at the top, since the detail takes the room of rows', () => {
    expect(range(METRICS, { at: 5, height: 200 })).toEqual({ start: 0, end: 6 });
  });

  it('starts the window after the rows the detail pushed down', () => {
    expect(range({ ...METRICS, top: 440 }, { at: 5, height: 200 })).toEqual({ start: 6, end: 16 });
    expect(range({ ...METRICS, top: 800 }, { at: 5, height: 200 })).toEqual({ start: 15, end: 25 });
  });

  it('keeps the rows above the detail when scrolled inside it', () => {
    expect(range({ ...METRICS, top: 280 }, { at: 5, height: 200 }).start).toBeLessThanOrEqual(6);
    expect(range({ ...METRICS, top: 280 }, { at: 5, height: 200 }).end).toBeGreaterThanOrEqual(6);
  });

  it('moves only the rows below the detail', () => {
    const detail = { at: 2, height: 90 };
    expect([0, 1, 2, 3, 9].map((index) => detailShift(index, detail))).toEqual([0, 0, 0, 90, 90]);
    expect(detailShift(5, undefined)).toBe(0);
    expect(detailShift(5, { at: -1, height: 90 })).toBe(0);
  });

  it('gives the row rects the shift, so a marquee finds the rows where they are', () => {
    const items = [0, 1, 2, 3].map((index) => ({ kind: 'row', key: `r:${index}`, row: index }));
    const rects = flatRects({ items, rowHeight: 40, origin: { x: 0, y: 10 }, width: 300, detail: { at: 1, height: 100 } });
    expect(rects.map((rect) => rect.y)).toEqual([10, 50, 190, 230]);
    expect(rects.every((rect) => rect.height === 40)).toBe(true);
  });
});

describe('K1 Escape in a detail', { tags: ['critical'] }, () => {
  const press = (key, defaultPrevented = false) => ({
    key, defaultPrevented, preventDefault: vi.fn(), stopPropagation: vi.fn(),
  });

  it('asks the app to close the detail', () => {
    const onClose = vi.fn();
    const event = press('Escape');
    detailKeyDown(onClose)(event);
    expect(onClose).toHaveBeenCalledOnce();
    expect(event.preventDefault).toHaveBeenCalledOnce();
    expect(event.stopPropagation).toHaveBeenCalledOnce();
  });

  it('leaves other keys and an Escape a field already used', () => {
    const onClose = vi.fn();
    detailKeyDown(onClose)(press('Enter'));
    detailKeyDown(onClose)(press('Escape', true));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('adds no handler when the app gave no onDetailClose', () => {
    expect(detailKeyDown(undefined)).toBeUndefined();
  });
});
