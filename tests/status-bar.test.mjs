/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { visibleItems } from '../src/composites/StatusBar/behavior/visible-items';

const ITEMS = [
  { id: 'cursor', label: 'Cursor', value: '24, 17', icon: 'move', title: 'Pixel under the pointer' },
  { id: 'zoom', label: 'Zoom', value: '800%', priority: 2 },
  { id: 'colour', label: 'Colour', value: '#e8505b', swatch: '#e8505b' },
  { id: 'size', label: 'Size', value: '64 x 64', priority: 3 },
  { id: 'layer', label: 'Layer', value: 'Outline', align: 'end', priority: 1 },
  { id: 'frame', label: 'Frame', value: '3 / 8', align: 'end', tone: 'warning' },
];

describe('K1 StatusBar priority', { tags: ['critical'] }, () => {
  const idsAt = (width) => visibleItems(ITEMS, width).map((item) => item.id);

  it('shows everything on a wide bar and when the width is not measured', () => {
    expect(idsAt(640)).toEqual(['cursor', 'zoom', 'colour', 'size', 'layer', 'frame']);
    expect(idsAt(Number.POSITIVE_INFINITY)).toHaveLength(6);
  });

  it('drops priority 3 first, then 2, then 1, and never an item with no priority', () => {
    expect(idsAt(500)).toEqual(['cursor', 'zoom', 'colour', 'layer', 'frame']);
    expect(idsAt(320)).toEqual(['cursor', 'colour', 'layer', 'frame']);
    expect(idsAt(100)).toEqual(['cursor', 'colour', 'frame']);
  });

  it('counts a priority above 3 as 3 and one below 1 as 1', () => {
    const items = [{ id: 'high', label: 'A', value: '1', priority: 9 }, { id: 'low', label: 'B', value: '2', priority: 0 }];
    expect(visibleItems(items, 450).map((item) => item.id)).toEqual(['low']);
    expect(visibleItems(items, 300).map((item) => item.id)).toEqual(['low']);
  });
});
