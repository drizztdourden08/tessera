/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { choiceGroups } from '../src/composites/ChoiceGrid/behavior/choice-groups';
import { choiceReleasePick } from '../src/composites/ChoiceGrid/behavior/choice-release-pick';
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

class FakeCell {
  constructor(index) {
    this.index = index;
  }

  closest() {
    return this.index === undefined ? null : this;
  }

  getAttribute() {
    return String(this.index);
  }
}

class FakePointerEvent extends Event {
  constructor(type, init) {
    super(type, init);
    this.clientX = init.clientX ?? 0;
    this.clientY = init.clientY ?? 0;
  }
}

const cells = [new FakeCell(0), new FakeCell(1)];
const empty = new FakeCell();

const palette = () => {
  const win = new EventTarget();
  const doc = new EventTarget();
  const send = doc.dispatchEvent.bind(doc);
  doc.dispatchEvent = (event) => {
    win.dispatchEvent(event);
    return send(event);
  };
  vi.stubGlobal('Element', FakeCell);
  vi.stubGlobal('PointerEvent', FakePointerEvent);
  vi.stubGlobal('document', { elementFromPoint: (x) => (x < 100 ? cells[0] : x < 200 ? cells[1] : empty) });
  const picks = [];
  const ends = [];
  const root = { contains: () => true };
  win.addEventListener('pointerup', choiceReleasePick({ current: root }, (index) => picks.push(index)), true);
  const session = holdSession(doc, { x: 500, y: 0 }, () => ends.push(true));
  const at = (type, x) => doc.dispatchEvent(new FakePointerEvent(type, { clientX: x }));
  return { picks, ends, session, at };
};

describe('I-67 palette picks on a held key release', { tags: ['critical'] }, () => {
  afterEach(() => vi.unstubAllGlobals());

  it('picks the cell under the last pointer position once', () => {
    const { picks, ends, session, at } = palette();
    at('pointermove', 150);
    session.release();
    session.release();
    expect(picks).toEqual([1]);
    expect(ends).toHaveLength(1);
  });

  it('picks nothing over empty space and keeps the hold ended', () => {
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

  it('does not pick again after a pointerup already picked', () => {
    const { picks, session, at } = palette();
    at('pointerup', 50);
    session.release();
    expect(picks).toEqual([0]);
  });

  it('stops tracking the pointer after stop', () => {
    const { picks, session, at } = palette();
    session.stop();
    at('pointermove', 50);
    session.release();
    expect(picks).toEqual([]);
  });
});
