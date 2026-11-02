/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { choiceGroups } from '../src/composites/ChoiceGrid/behavior/choice-groups';
import { nextChoiceIndex } from '../src/composites/ChoiceGrid/behavior/next-choice-index';
import { paletteAnchor } from '../src/composites/PointerPalette/behavior/palette-anchor';
import { paletteChoices } from '../src/composites/PointerPalette/behavior/palette-choices';
import { paletteItems } from '../src/composites/PointerPalette/behavior/palette-items';

const icon = { name: 'pencil' };

const sections = [
  { id: 'a', label: 'A', items: [{ id: 'a1', icon, label: 'One' }, { id: 'a2', icon, label: 'Two' }, { id: 'a3', icon, label: 'Three' }] },
  { id: 'b', label: 'B', items: [{ id: 'b1', icon, label: 'Four' }, { id: 'b2', icon, label: 'Five', disabled: true }, { id: 'b3', icon, label: 'Six' }] },
];

const groups = choiceGroups(undefined, paletteChoices(sections));

describe('I-62 paletteChoices', { tags: ['critical'] }, () => {
  it('turns sections into choice sections keyed by item id', () => {
    const choices = paletteChoices(sections);
    expect(choices.map((section) => section.id)).toEqual(['a', 'b']);
    expect(choices[1]?.cells.map((cell) => cell.value)).toEqual(['b1', 'b2', 'b3']);
    expect(choices[1]?.cells[1]?.disabled).toBe(true);
  });

  it('finds an item by id across sections', () => {
    expect(paletteItems(sections).get('b3')?.label).toBe('Six');
  });
});

describe('I-62 cell navigation across sections', { tags: ['critical'] }, () => {
  it('moves right from the end of one section into the next', () => {
    expect(nextChoiceIndex('ArrowRight', 2, groups, 3)).toBe(3);
    expect(nextChoiceIndex('ArrowLeft', 3, groups, 3)).toBe(2);
  });

  it('moves down to the same column of the next section and back up', () => {
    expect(nextChoiceIndex('ArrowDown', 0, groups, 3)).toBe(3);
    expect(nextChoiceIndex('ArrowUp', 3, groups, 3)).toBe(0);
  });

  it('skips a disabled cell and wraps past the last section', () => {
    expect(nextChoiceIndex('ArrowDown', 1, groups, 3)).toBe(1);
    expect(nextChoiceIndex('ArrowRight', 3, groups, 3)).toBe(5);
  });
});

describe('I-62 paletteAnchor', { tags: ['critical'] }, () => {
  const view = { width: 1000, height: 800 };

  it('opens just below and after the point when there is room', () => {
    expect(paletteAnchor({ x: 100, y: 100 }, view)).toEqual({ left: 106, top: 106 });
  });

  it('flips to the left and above near the far edges', () => {
    expect(paletteAnchor({ x: 950, y: 780 }, view)).toEqual({ right: 56, bottom: 26 });
  });
});
