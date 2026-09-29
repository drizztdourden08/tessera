/* @layer renderer-components @kind util */
import type { ShortcutKey } from '../../../primitives';
import type { KeyRow, KeySlot, PlacedKey } from '../KeyboardLayout.type';

const keyOf = (slot: KeySlot): ShortcutKey => {
  if (slot.shows !== undefined) return slot.shows;
  if (slot.as !== undefined) return slot.as;
  return slot.id;
};

const namesOf = (slot: KeySlot): string[] => {
  const { id, as, also = [] } = slot;
  return as ? [id, as, ...also] : [id, ...also];
};

const placeRow = (row: KeyRow): PlacedKey[] => {
  const { zone, x: start, y, slots } = row;
  const placed: PlacedKey[] = [];
  slots.reduce((x, slot) => {
    const { w = 1, h = 1, gap = 0 } = slot;
    placed.push({ id: slot.id, key: keyOf(slot), names: namesOf(slot), zone, x: x + gap, y, w, h });
    return x + gap + w;
  }, start);
  return placed;
};

const buildLayout = (rows: readonly KeyRow[]): PlacedKey[] => rows.flatMap(placeRow);

export { buildLayout };
