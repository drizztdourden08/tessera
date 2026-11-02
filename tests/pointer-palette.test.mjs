/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { choiceGroups } from '../src/composites/ChoiceGrid/behavior/choice-groups';
import { nextChoiceIndex } from '../src/composites/ChoiceGrid/behavior/next-choice-index';
import { paletteAnchor } from '../src/composites/PointerPalette/behavior/palette-anchor';
import { holdSession } from '../src/composites/PointerPalette/behavior/hold-session';
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

const fakeEvent = (type, x) => Object.assign(new globalThis.Event(type), { clientX: x, clientY: 0 });

const palette = () => {
  const picks = [];
  const ends = [];
  const cells = [0, 1].map((index) => ({ closest: () => cells[index], click: () => picks.push(index) }));
  const empty = { closest: () => null, click: () => picks.push('empty') };
  const doc = Object.assign(new globalThis.EventTarget(), {
    elementFromPoint: (x) => [cells[0], cells[1], empty][Math.min(Math.floor(x / 100), 2)],
  });
  const outside = [];
  doc.addEventListener('pointerup', () => outside.push(true));
  const surface = { current: { contains: () => true } };
  const session = holdSession(doc, { x: 500, y: 0 }, surface, () => ends.push(true));
  const at = (type, x) => doc.dispatchEvent(fakeEvent(type, x));
  return { picks, ends, outside, session, at };
};

describe('I-67 palette picks on a held key release', { tags: ['critical'] }, () => {
  it('picks the cell under the last pointer position once', () => {
    const { picks, ends, session, at } = palette();
    at('pointermove', 150);
    session.release();
    session.release();
    expect(picks).toEqual([1]);
    expect(ends).toHaveLength(1);
  });

  it('sends no pointerup to the page', () => {
    const { outside, session, at } = palette();
    at('pointermove', 50);
    session.release();
    expect(outside).toEqual([]);
  });

  it('picks nothing over empty space and ends the hold', () => {
    const { picks, ends, session, at } = palette();
    at('pointermove', 300);
    session.release();
    expect(picks).toEqual([]);
    expect(ends).toHaveLength(1);
  });

  it('picks nothing when the pointer never moved off the opening point', () => {
    const { picks, session } = palette();
    session.release();
    expect(picks).toEqual([]);
  });

  it('picks nothing when the point is outside the palette', () => {
    const { picks, session, at } = palette();
    const outsideSurface = holdSession(
      Object.assign(new globalThis.EventTarget(), { elementFromPoint: () => ({ closest: () => ({ click: () => picks.push('out') }) }) }),
      { x: 0, y: 0 },
      { current: { contains: () => false } },
      () => undefined,
    );
    at('pointermove', 50);
    outsideSurface.release();
    session.stop();
    expect(picks).toEqual([]);
  });

  it('does not pick after a pointerup already ended the hold', () => {
    const { picks, ends, session, at } = palette();
    at('pointermove', 50);
    at('pointerup', 50);
    session.release();
    expect(picks).toEqual([]);
    expect(ends).toHaveLength(1);
  });

  it('stops tracking the pointer after stop', () => {
    const { picks, session, at } = palette();
    session.stop();
    at('pointermove', 50);
    session.release();
    expect(picks).toEqual([]);
  });
});
