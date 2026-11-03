/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { parsePattern } from '../src/composites/DynamicInput';
import { choiceDisplay } from '../src/composites/DynamicInput/behavior/choice-display';
import { freeValue } from '../src/composites/DynamicInput/behavior/free-value';
import { pressChoice } from '../src/composites/DynamicInput/behavior/press-choice';
import { settleSearch } from '../src/composites/DynamicInput/behavior/settle-search';
import { slotFromText } from '../src/composites/DynamicInput/behavior/slot-from-text';
import { splitPasted } from '../src/composites/DynamicInput/behavior/split-pasted';

const ITEMS = [{ value: 'key', label: 'Iron Key' }, { value: 'map', label: 'Old Map' }];
const slotOf = (pattern) => parsePattern(pattern).slots[0];
const SEARCH = slotOf('{item:choice @items search}');
const FREE = slotOf('{item:choice @items free}');
const PLAIN = slotOf('{item:choice @items}');

const fakeField = (focus) => ({ disabled: false, focus, setOpen: vi.fn(), moveTo: vi.fn() });
const press = (button = 0) => ({ button, preventDefault: vi.fn() });

describe('I-97 search and free arguments', { tags: ['critical'] }, () => {
  it('reads search and free on a choice slot', () => {
    expect(SEARCH).toMatchObject({ list: 'items', search: true });
    expect(SEARCH.free).toBeUndefined();
    expect(FREE).toMatchObject({ list: 'items', search: true, free: true });
    expect(PLAIN.search).toBeUndefined();
  });

  it('keeps the other choice arguments next to them', () => {
    expect(slotOf('{item:choice @items free muted "Item"}')).toMatchObject({ free: true, muted: true, label: 'Item' });
  });
});

describe('I-97 free text', { tags: ['critical'] }, () => {
  it('keeps text no option matches only on a free slot', () => {
    expect(slotFromText(FREE, 'Golden Lens', ITEMS)).toBe('Golden Lens');
    expect(slotFromText(SEARCH, 'Golden Lens', ITEMS)).toBeUndefined();
    expect(slotFromText(FREE, 'iron key', ITEMS)).toBe('key');
  });

  it('shows the label of an option and the text of a free value', () => {
    expect(choiceDisplay(FREE, 'map', ITEMS)).toBe('Old Map');
    expect(choiceDisplay(FREE, 'Golden Lens', ITEMS)).toBe('Golden Lens');
    expect(choiceDisplay(SEARCH, 'Golden Lens', ITEMS)).toBe('');
    expect(choiceDisplay(FREE, null, ITEMS)).toBe('');
  });

  it('reads a free value only from a string on a free slot', () => {
    expect(freeValue(FREE, 'Golden Lens')).toBe('Golden Lens');
    expect(freeValue(FREE, 4)).toBe('');
    expect(freeValue(SEARCH, 'Golden Lens')).toBe('');
  });

  it('settles typed text, and an empty text clears the slot', () => {
    expect(settleSearch(SEARCH, 'old map', ITEMS)).toBe('map');
    expect(settleSearch(SEARCH, 'nothing', ITEMS)).toBeUndefined();
    expect(settleSearch(FREE, 'nothing', ITEMS)).toBe('nothing');
    expect(settleSearch(FREE, '   ', ITEMS)).toBeNull();
  });

  it('fills free slots from a pasted value', () => {
    const parsed = parsePattern('{player:choice @players free} {item:choice @items free}');
    const choices = (slot) => (slot.name === 'item' ? ITEMS : []);
    expect(splitPasted(parsed, 'Zed iron key', choices)).toEqual({ player: 'Zed', item: 'key' });
    expect(splitPasted(parsed, 'Zed Golden Lens', choices)).toEqual({ player: 'Zed', item: 'Golden Lens' });
  });
});

describe('I-97 pressing a choice chip', { tags: ['critical'] }, () => {
  it('focuses a slot that is not in focus', () => {
    const field = fakeField({ index: null, open: false });
    const event = press();
    pressChoice({ field, index: 1, open: false }, event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(field.moveTo).toHaveBeenCalledWith(1, 'all');
    expect(field.setOpen).not.toHaveBeenCalled();
  });

  it('toggles the list of the slot in focus', () => {
    const field = fakeField({ index: 1, open: true });
    pressChoice({ field, index: 1, open: true }, press());
    expect(field.setOpen).toHaveBeenCalledWith(false);
    pressChoice({ field, index: 1, open: false }, press());
    expect(field.setOpen).toHaveBeenLastCalledWith(true);
    expect(field.moveTo).not.toHaveBeenCalled();
  });

  it('ignores a button other than the main one and a disabled field', () => {
    const field = fakeField({ index: null, open: false });
    pressChoice({ field, index: 0, open: false }, press(2));
    pressChoice({ field: { ...field, disabled: true }, index: 0, open: false }, press());
    expect(field.moveTo).not.toHaveBeenCalled();
  });
});
