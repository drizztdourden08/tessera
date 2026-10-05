/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { readStoredHistory } from '../src/composites/CommandInput/behavior/stored-history';
import { HeaderLabel } from '../src/composites/DataTable/sub-components/HeaderLabel';
import { ItemListRename } from '../src/composites/ItemList/sub-components/ItemListRename';
import { newEntry } from '../src/composites/KeyValueEditor/behavior/new-entry';
import { SplashMeter } from '../src/composites/Splash/sub-components/SplashMeter';
import { nameEditKey } from '../src/primitives/field-control/name-edit-key';
import { scrollIntoList } from '../src/primitives/listbox/scroll-into-list';
import { clampValue } from '../src/primitives/Slider/behavior/clamp-value';
import { TESSERA_STRINGS } from '../src/primitives/strings/tessera-strings.constants';
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

describe('editing a name in place', () => {
  it('keeps on Enter and undoes on Escape, and leaves keys typed while an input method composes', () => {
    expect(nameEditKey('Enter', false)).toBe('keep');
    expect(nameEditKey('Escape', false)).toBe('undo');
    expect(nameEditKey('a', false)).toBeNull();
    expect(nameEditKey('Enter', true)).toBeNull();
  });

  it('draws the ItemList rename with the name, a keep and an undo button', () => {
    const html = renderToString(h(ItemListRename, { id: 'a', name: 'Keysanity', onEnd: ignore }));
    expect(html).toContain('value="Keysanity"');
    expect(html).toContain('aria-label="Keep the name"');
    expect(html).toContain('aria-label="Cancel the rename"');
  });

  it('draws the DataTable column label, or the field that renames it', () => {
    const shown = renderToString(h(HeaderLabel, { label: 'Score', name: 'Score', renaming: false, onKeep: ignore, onUndo: ignore }));
    expect(shown).toContain('>Score<');
    const editing = renderToString(h(HeaderLabel, { label: 'Score', name: '', renaming: true, onKeep: ignore, onUndo: ignore }));
    expect(editing).toContain('aria-label="Rename Score"');
    expect(editing).toContain('value=""');
  });
});

describe('asking before unsaved changes are lost', () => {
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

describe('scrolling the active row into view', () => {
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

describe('keeping a number in bounds', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('keeps a Slider value on its scale', () => {
    expect(clampValue(140, { min: 0, max: 100, step: 1 })).toBe(100);
    expect(clampValue(-3, { min: 0, max: 100, step: 1 })).toBe(0);
  });

  it('starts a KeyValueEditor count inside its bounds', () => {
    expect(newEntry({ value: {}, onChange: ignore, max: 0 })).toBe(0);
    expect(newEntry({ value: {}, onChange: ignore, min: 2, max: 5 })).toBe(2);
  });

  it('keeps the Splash meter between empty and full', () => {
    expect(renderToString(h(SplashMeter, { progress: 1.4, label: 'Loading' }))).toContain('aria-valuenow="100"');
    expect(renderToString(h(SplashMeter, { progress: -1, label: 'Loading' }))).toContain('aria-valuenow="0"');
  });

  it('reads the CommandInput history through the shared storage read', () => {
    const items = new Map([['log', '["/save"]'], ['bad', '[1]']]);
    vi.stubGlobal('localStorage', { getItem: (name) => items.get(name) ?? null, setItem: ignore });
    expect(readStoredHistory('log')).toEqual(['/save']);
    expect(readStoredHistory('bad')).toEqual([]);
    expect(readStoredHistory('missing')).toEqual([]);
  });
});

describe('the same words once', () => {
  const { common, lists, wizard } = TESSERA_STRINGS;

  it('asks about unsaved changes with the same words in ListDetail, Wizard and SaveBar', () => {
    expect(common.unsavedTitle).toBe('Unsaved changes');
    expect(common.keepEditing).toBe('Keep editing');
    expect(common.discard).toBe('Discard');
    expect(lists).not.toHaveProperty('discard');
    expect(wizard).not.toHaveProperty('discard');
  });

  it('writes a named action once', () => {
    expect(common.renameNamed('Score')).toBe('Rename Score');
    expect(common.resetNamed('Volume')).toBe('Reset Volume');
    expect(TESSERA_STRINGS.table).not.toHaveProperty('renameNamed');
    expect(TESSERA_STRINGS.settings).not.toHaveProperty('resetRow');
  });
});
