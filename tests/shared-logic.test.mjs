/* @layer tooling-scripts @kind test */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readStoredHistory } from '../src/composites/CommandInput/behavior/stored-history';
import { newEntry } from '../src/composites/KeyValueEditor/behavior/new-entry';
import { nameEditKey } from '../src/primitives/field-control/name-edit-key';
import { scrollIntoList } from '../src/primitives/listbox/scroll-into-list';
import { clampValue } from '../src/primitives/Slider/behavior/clamp-value';
import { settleSave } from '../src/primitives/unsaved-guard/settle-save';
import { unsavedAsk } from '../src/primitives/unsaved-guard/unsaved-ask';

const ignore = () => undefined;

const boxAt = (top, bottom) => () => ({ top, bottom, height: bottom - top });

const scrollerWith = ({ rowTop, rowBottom, header = 0, zoom }) => {
  const scroller = {
    scrollTop: 100,
    currentCSSZoom: zoom,
    getBoundingClientRect: boxAt(0, 200),
    querySelector: () => (header ? { getBoundingClientRect: boxAt(0, header) } : null),
  };
  const option = { closest: () => scroller, getBoundingClientRect: boxAt(rowTop, rowBottom) };
  return { root: { querySelector: () => option }, scroller };
};

describe('K1 editing a name in place', { tags: ['critical'] }, () => {
  it('keeps on Enter and undoes on Escape, and leaves keys typed while an input method composes', () => {
    expect(nameEditKey('Enter', false)).toBe('keep');
    expect(nameEditKey('Escape', false)).toBe('undo');
    expect(nameEditKey('a', false)).toBeNull();
    expect(nameEditKey('Enter', true)).toBeNull();
  });
});

describe('K1 asking before unsaved changes are lost', { tags: ['critical'] }, () => {
  it('goes at once when nothing changed, asks when something did, and waits while busy', () => {
    expect(unsavedAsk(false, false)).toBe('go');
    expect(unsavedAsk(true, false)).toBe('ask');
    expect(unsavedAsk(true, true)).toBe('wait');
    expect(unsavedAsk(false, true)).toBe('wait');
  });

  it('counts a save as done unless it returns false, rejects or throws', async () => {
    await expect(settleSave(() => undefined)).resolves.toBe(true);
    await expect(settleSave(() => Promise.resolve(true))).resolves.toBe(true);
    await expect(settleSave(() => false)).resolves.toBe(false);
    await expect(settleSave(() => Promise.reject(new Error('offline')))).resolves.toBe(false);
    await expect(settleSave(() => {
      throw new Error('offline');
    })).resolves.toBe(false);
  });
});

describe('K1 scrolling the active row into view', { tags: ['critical'] }, () => {
  it('scrolls up to a row above the view, below a sticky header', () => {
    const { root, scroller } = scrollerWith({ rowTop: 10, rowBottom: 40, header: 30 });
    scrollIntoList(root, 3);
    expect(scroller.scrollTop).toBe(80);
  });

  it('scrolls down to a row under the view, divided by the CSS zoom', () => {
    const { root, scroller } = scrollerWith({ rowTop: 190, rowBottom: 240, zoom: 2 });
    scrollIntoList(root, 3);
    expect(scroller.scrollTop).toBe(120);
  });

  it('leaves a row in view, and a list with no such row', () => {
    const { root, scroller } = scrollerWith({ rowTop: 50, rowBottom: 80 });
    scrollIntoList(root, 3);
    expect(scroller.scrollTop).toBe(100);
    expect(() => scrollIntoList({ querySelector: () => null }, 9)).not.toThrow();
  });
});

describe('K1 keeping a number in bounds', { tags: ['critical'] }, () => {
  afterEach(() => vi.unstubAllGlobals());

  it('keeps a Slider value on its scale', () => {
    expect(clampValue(140, { min: 0, max: 100, step: 1 })).toBe(100);
    expect(clampValue(-3, { min: 0, max: 100, step: 1 })).toBe(0);
  });

  it('starts a KeyValueEditor count inside its bounds', () => {
    expect(newEntry({ value: {}, onChange: ignore, max: 0 })).toBe(0);
    expect(newEntry({ value: {}, onChange: ignore, min: 2, max: 5 })).toBe(2);
  });

  it('reads the CommandInput history through the shared storage read', () => {
    const items = new Map([['log', '["/save"]'], ['bad', '[1]']]);
    vi.stubGlobal('localStorage', { getItem: (name) => items.get(name) ?? null, setItem: ignore });
    expect(readStoredHistory('log')).toEqual(['/save']);
    expect(readStoredHistory('bad')).toEqual([]);
    expect(readStoredHistory('missing')).toEqual([]);
  });
});
