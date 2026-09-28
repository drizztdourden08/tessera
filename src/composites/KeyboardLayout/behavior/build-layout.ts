/* @layer renderer-components @kind util */
import { keyFace } from '../../../primitives/Shortcut/behavior/key-face';
import type { KeyFace } from '../../../primitives/Shortcut/Shortcut.type';
import type { KeyRow, KeySlot, PlacedKey } from '../KeyboardLayout.type';

const faceOf = (slot: KeySlot): KeyFace => {
  const { id, as, legend, spoken } = slot;
  if (legend) return { name: spoken ?? legend, label: legend, width: 'normal' };
  return keyFace(as ?? id, 'label');
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
    placed.push({ id: slot.id, names: namesOf(slot), face: faceOf(slot), zone, x: x + gap, y, w, h });
    return x + gap + w;
  }, start);
  return placed;
};

const buildLayout = (rows: readonly KeyRow[]): PlacedKey[] => rows.flatMap(placeRow);

export { buildLayout };
