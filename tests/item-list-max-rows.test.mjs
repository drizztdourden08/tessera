/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { rowsCap } from '../src/composites/ItemList/behavior/rows-cap';
import { scrollRowInto } from '../src/composites/ItemList/behavior/scroll-row-into';

const box = (top, bottom) => ({ getBoundingClientRect: () => ({ top, bottom }) });
const listOf = (rows, top = 100, scrollTop = 0) => ({ ...box(top, top + 400), scrollTop, querySelectorAll: () => rows });

describe('K1 ItemList maxRows', { tags: ['critical'] }, () => {
  it('caps at the bottom edge of the Nth row, headings and gaps included', () => {
    const rows = [box(100, 160), box(164, 224), box(240, 300), box(304, 364)];
    expect(rowsCap(listOf(rows), 3)).toBe(200);
  });

  it('adds the scroll offset so a scrolled list measures the same', () => {
    const rows = [box(60, 120), box(124, 184), box(188, 248)];
    expect(rowsCap(listOf(rows, 100, 40), 2)).toBe(124);
  });

  it('sets no cap when the rows fit', () => {
    const rows = [box(100, 160), box(164, 224)];
    expect(rowsCap(listOf(rows), 2)).toBeUndefined();
    expect(rowsCap(listOf(rows), 6)).toBeUndefined();
  });

  it('scrolls a row below the list up into view and a row above down', () => {
    const list = { ...box(100, 400), scrollTop: 50 };
    scrollRowInto(list, box(380, 440));
    expect(list.scrollTop).toBe(90);
    scrollRowInto(list, box(70, 130));
    expect(list.scrollTop).toBe(60);
    scrollRowInto(list, box(150, 210));
    expect(list.scrollTop).toBe(60);
  });
});
